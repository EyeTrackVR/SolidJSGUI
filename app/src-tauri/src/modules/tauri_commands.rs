use log::debug;
use log::{error, info};
use tauri::{self, Manager};

use tauri_plugin_store::with_store;

//use specta::collect_types;
//use tauri_specta::ts;
use tauri_plugin_window_state::{AppHandleExt, StateFlags, WindowExt};
use whoami::username;

use crate::modules::mdns_query;

/// A command to get the user name from the system
/// ## Returns
/// - `user_name`: String - The user name of the current user
#[tauri::command]
#[specta::specta]
pub async fn get_user() -> Result<String, String> {
  let user_name: String = username();
  info!("User name: {}", user_name);
  Ok(user_name)
}

/// A function to run a mDNS query and write the results to a config file
/// ## Arguments
/// - `service_type` The service type to query for
/// - `scan_time` The number of seconds to query for
#[tauri::command]
#[specta::specta]
pub async fn run_mdns_query(
  service_type: String,
  scan_time: u64,
) -> Result<mdns_query::MdnsData, String> {
  info!("Starting MDNS query to find devices");
  let mut mdns: mdns_query::Mdns = mdns_query::Mdns::new();
  let mut mdns_data = mdns_query::MdnsData::new();
  let ref_mdns = &mut mdns;
  info!("MDNS Service Thread acquired lock");
  mdns_query::run_query(ref_mdns, service_type, &mut mdns_data, scan_time)
    .await
    .expect("Error in mDNS query");
  info!("MDNS query complete");
  info!(
    "MDNS query results: {:#?}",
    mdns_query::get_urls(&*ref_mdns)
  ); // get's an array of the base urls found
  Ok(mdns_data)
}

/// TODO: refactor to use tauri::fs and tauri::path
#[tauri::command(async)]
#[specta::specta]
pub async fn unzip_archive(archive_path: String, target_dir: String) -> Result<String, String> {
  // The third parameter allows you to strip away toplevel directories.
  // If `archive` contained a single directory, its contents would be extracted instead.
  let _target_dir = std::path::PathBuf::from(target_dir); // Doesn't need to exist

  let archive = std::fs::read(&archive_path).expect("Failed to read archive");
  zip_extract::extract(std::io::Cursor::new(archive), &_target_dir, true)
    .expect("Failed to extract archive");

  // erase the archive
  //TODO: remove JS api for remove file and add rust api for remove file here when it is available through tauri

  // ! Using std:: is BAD practice, but it is the only way to get this to work for now
  //std::fs::remove_file(archive_path).expect("Failed to remove archive");
  Ok(archive_path)
}

/// TODO: implement a way to open the logs dir from the UI
//#[tauri::command(async)]
//#[specta::specta]
//async fn open_logs_dir(node: tauri::State<'_, Arc<Node>>) -> Result<(), ()> {
//	let logs_path = node.data_dir.join("logs");
//
//	#[cfg(target_os = "linux")]
//	let open_result = sd_desktop_linux::open_file_path(&logs_path);
//
//	#[cfg(not(target_os = "linux"))]
//	let open_result = opener::open(logs_path);
//
//	open_result.map_err(|err| {
//		error!("Failed to open logs dir: {err}");
//	})
//}

#[tauri::command]
#[specta::specta]
pub async fn handle_save_window_state<R: tauri::Runtime>(
  app: tauri::AppHandle<R>,
) -> Result<(), String> {
  app
    .save_window_state(StateFlags::all())
    .expect("[Window State]: Failed to save window state");

  Ok(())
}

#[tauri::command]
#[specta::specta]
pub async fn handle_load_window_state<R: tauri::Runtime>(
  window: tauri::Window<R>,
) -> Result<(), String> {
  window
    .restore_state(StateFlags::all())
    .expect("[Window State]: Failed to restore window state");

  Ok(())
}

pub fn handle_debug<R: tauri::Runtime>(
  app: tauri::AppHandle<R>,
) -> Result<log::LevelFilter, String> {
  // read the Store file
  let stores = app.state::<tauri_plugin_store::StoreCollection<R>>();
  let path = std::path::PathBuf::from(".app-settings.bin");
  // match the store value to a LogFilter
  let mut debug_state: String = String::new();
  with_store(app.clone(), stores, path, |store| {
    let settings = store.get("settings");
    debug!("Settings: {:?}", settings);
    if let Some(json) = settings {
      let _serde_json = serde_json::from_value::<serde_json::Value>(json.clone());
      debug!("Serde JSON: {:?}", _serde_json);
      let serde_json_result = match _serde_json {
        Ok(serde_json) => serde_json,
        Err(err) => {
          error!("Error configuring JSON config file: {}", err);
          return Err(tauri_plugin_store::Error::Json(err));
        }
      };
      let temp = &serde_json_result["debugMode"];
      debug!("Debug: {:?}", temp);
      debug_state = serde_json::from_value::<String>(temp.clone()).unwrap();
    } else {
      debug_state = serde_json::json!({}).to_string();
    }
    info!("Debug state: {}", debug_state);
    Ok(())
  })
  .expect("Failed to get store");
  // set the log level
  let log_level = match debug_state.as_str() {
    "off" => log::LevelFilter::Off,
    "error" => log::LevelFilter::Error,
    "warn" => log::LevelFilter::Warn,
    "info" => log::LevelFilter::Info,
    "debug" => log::LevelFilter::Debug,
    "trace" => log::LevelFilter::Trace,
    _ => log::LevelFilter::Info,
  };
  // return the result
  Ok(log_level)
}
