#![allow(dead_code, unused_imports, unused_variables)]
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[cfg(target_os = "linux")]
use std::fs::metadata;
#[cfg(target_os = "linux")]
use std::path::PathBuf;

//use tauri::*;
use tauri::{
  self, api::dialog::ask, CustomMenuItem, Manager, RunEvent, State, SystemTray, SystemTrayEvent,
  SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu, WindowEvent,
};

// use various crates
use log::{debug, error, info, warn};
use serde::{Deserialize, Serialize};
//use tauri_plugin_store;
//use tauri_plugin_window_state;
use whoami::username;
use zip_extract::ZipExtractError;

// use std
use std::collections::hash_map::HashMap;
use std::{
  ops::Deref,
  process::Command,
  sync::{Arc, Mutex},
  thread,
  time::Duration,
};

// use custom modules
mod modules;
use modules::{m_dnsquery, rest_client};

#[derive(Clone, Serialize)]
struct SingleInstancePayload {
  args: Vec<String>,
  cwd: String,
}

#[derive(Clone, Serialize)]
struct SystemTrayPayload {
  message: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Config {
  names: Vec<String>,
  urls: Vec<String>,
}

enum TrayIcon {
  Filled,
  Unfilled,
}

enum TrayState {
  Visible,
  Hidden,
}

/// A function to show the main window
#[tauri::command]
fn show_main_window(window: tauri::Window) {
  window
    .get_window("main")
    .expect("Failed to get main window")
    .show()
    .unwrap();
}

/// A command to get the user name from the system
/// ## Returns
/// - `user_name`: String - The user name of the current user
#[tauri::command]
async fn get_user() -> Result<String, String> {
  let user_name: String = username();
  info!("User name: {}", user_name);
  Ok(user_name)
}

/// A function to run a mDNS query and write the results to a config file
/// ## Arguments
/// - `service_type` The service type to query for
/// - `scan_time` The number of seconds to query for
#[tauri::command]
async fn run_mdns_query(service_type: String, scan_time: u64) -> Result<String, String> {
  println!("Starting MDNS query to find devices");
  let base_url = Arc::new(Mutex::new(HashMap::new()));
  let thread_arc = base_url.clone();
  let mut mdns: m_dnsquery::Mdns = m_dnsquery::Mdns {
    base_url: thread_arc,
    names: Vec::new(),
    ip: Vec::new(),
  };
  let ref_mdns = &mut mdns;
  println!("MDNS Service Thread acquired lock");
  m_dnsquery::run_query(ref_mdns, service_type, scan_time)
    .await
    .expect("Error in mDNS query");
  println!("MDNS query complete");
  println!(
    "MDNS query results: {:#?}",
    m_dnsquery::get_urls(&*ref_mdns)
  ); // get's an array of the base urls found
  let json = m_dnsquery::generate_json(&*ref_mdns)
    .await
    .expect("Failed to generate JSON object"); // generates a json file with the base urls found
                                               //tokio::fs::write("config/config.json", json)
                                               //    .await
                                               //    .expect("Failed to write JSON file");
  Ok(json)
}

#[tauri::command]
async fn do_rest_request(
  endpoint: String,
  device_name: String,
  method: String,
) -> Result<String, String> {
  info!("Starting REST request");
  let response = rest_client::run_rest_client(endpoint, device_name, method)
    .await
    .expect("Error in REST request");
  Ok(response)
}

///! This command must be async so that it doesn't run on the main thread.
#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().expect("Failed to close splashscreen");
  }
  // Show main window
  window
    .get_window("main")
    .expect("Failed to get main window")
    .show()
    .unwrap();
}

#[tauri::command]
async fn unzip_archive(archive_path: String, target_dir: String) -> Result<String, String> {
  // The third parameter allows you to strip away toplevel directories.
  // If `archive` contained a single directory, its contents would be extracted instead.
  let _target_dir = std::path::PathBuf::from(target_dir); // Doesn't need to exist

  let archive = std::fs::read(&archive_path).expect("Failed to read archive");
  zip_extract::extract(std::io::Cursor::new(archive), &_target_dir, true)
    .expect("Failed to extract archive");

  // erase the archive
  std::fs::remove_file(archive_path).expect("Failed to remove archive");
  Ok("Archive extracted".to_string())
}

#[tauri::command]
async fn remove_archive(archive_path: String) -> Result<String, String> {
  // erase the archive
  std::fs::remove_file(archive_path).expect("Failed to remove archive");
  Ok("Archive removed".to_string())
}

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let show = CustomMenuItem::new("show".to_string(), "Show");

  let tray_menu = SystemTrayMenu::new()
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(show);

  let tray = SystemTray::new().with_menu(tray_menu);

  tauri::Builder::default()
    //Note: This is a workaround for a bug in tauri that causes the window to not resize properly inducing a noticable lag
    // ! https://github.com/tauri-apps/tauri/issues/6322#issuecomment-1448141495
    .on_window_event(|e| {
      if let WindowEvent::Resized(_) = e.event() {
        std::thread::sleep(std::time::Duration::from_nanos(1));
      }
    })
    .invoke_handler(tauri::generate_handler![
      close_splashscreen,
      run_mdns_query,
      get_user,
      do_rest_request,
      unzip_archive,
      remove_archive
    ])
    // allow only one instance and propgate args and cwd to existing instance
    .plugin(tauri_plugin_single_instance::init(|app, args, cwd| {
      app
        .emit_all("new-instance", Some(SingleInstancePayload { args, cwd }))
        .unwrap_or_else(|e| {
          eprintln!("Failed to emit new-instance event: {}", e);
        });
    }))
    // persistent storage with file system
    .plugin(tauri_plugin_store::PluginBuilder::default().build())
    .plugin(tauri_plugin_upload::init())
    // save window position and size between sessions
    .plugin(tauri_plugin_window_state::Builder::default().build())
    .setup(|app| {
      let window = app
        .get_window("main")
        .unwrap_or_else(|| panic!("Failed to get window {}", "main"));
      //set_shadow(&window, true).expect("Unsupported platform!");
      window.hide().unwrap();
      Ok(())
    })
    .system_tray(tray)
    .on_system_tray_event(move |app, event| match event {
      SystemTrayEvent::LeftClick {
        position: _,
        size: _,
        ..
      } => {
        dbg!("system tray received a left click");
        let window = app.get_window("main").expect("failed to get window");
        window.show().unwrap();
      }
      SystemTrayEvent::RightClick {
        position: _,
        size: _,
        ..
      } => {
        dbg!("system tray received a right click");
      }
      SystemTrayEvent::DoubleClick {
        position: _,
        size: _,
        ..
      } => {
        dbg!("system tray received a double click");
      }
      SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        "quit" => {
          let app = app.clone();
          let window = app.get_window("main").expect("failed to get window");
          // ask the user if they want to quit
          ask(
            Some(&window),
            "EyeTrackVR",
            "Are you sure that you want to close this window?",
            move |answer| {
              if answer {
                // .close() cannot be called on the main thread
                app.get_window("main").unwrap().close().unwrap();
              }
            },
          );
        }
        "hide" => {
          let window = app.get_window("main").expect("failed to get window");
          window.hide().unwrap();
        }
        "show" => {
          let window = app.get_window("main").expect("failed to get window");
          window.show().unwrap();
        }
        _ => {}
      },
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
