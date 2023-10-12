use std::sync::Mutex;
use tauri::{
  plugin::{Builder, TauriPlugin},
  AppHandle, Manager, Runtime,
};

use etvr_utils::{errors::ETVResult, prelude::*};

const PLUGIN_NAME: &str = "tauri-plugin-splashscreen";

#[derive(Debug)]
struct SplashScreenPlugin<R: Runtime> {
  app_handle: AppHandle<R>,
  backend_ready: Mutex<bool>,
  frontend_ready: Mutex<bool>,
}

impl<R: Runtime> SplashScreenPlugin<R> {
  fn new(app: AppHandle<R>) -> Self {
    Self {
      app_handle: app,
      backend_ready: Mutex::new(false),
      frontend_ready: Mutex::new(false),
    }
  }

  fn close_spashscreen(&self) {
    if let Some(window) = self.app_handle.get_window("main") {
      window.show().unwrap();
    }
    if let Some(window) = self.app_handle.get_window("splashscreen") {
      window.close().unwrap();
    }
    // send a global event when the splashscreen is closed
    self.app_handle.trigger_global("splashscreen-closed", None);
  }

  fn is_ready(&self) -> bool {
    return *self.frontend_ready.lock().unwrap() && *self.backend_ready.lock().unwrap();
  }

  fn set_backend_ready(&self) {
    *self.backend_ready.lock().unwrap() = true;
  }

  fn set_frontend_ready(&self) {
    *self.frontend_ready.lock().unwrap() = true;
  }
}

#[tauri::command]
#[specta::specta]
async fn close_splashscreen<R: Runtime>(app: AppHandle<R>) {
  let plugin = app.state::<SplashScreenPlugin<R>>();
  plugin.close_spashscreen();
}

#[tauri::command]
#[specta::specta]
async fn set_frontend_ready<R: Runtime>(app: AppHandle<R>) {
  let plugin = app.state::<SplashScreenPlugin<R>>();
  plugin.set_frontend_ready();
  if plugin.is_ready() {
    plugin.close_spashscreen();
  }
}

macro_rules! specta_builder {
  ($e:expr, Runtime) => {
    ts::builder()
      .commands(collect_commands![
        close_splashscreen::<$e>,
        set_frontend_ready::<$e>
      ])
      .path(generate_plugin_path(PLUGIN_NAME))
      .config(specta::ts::ExportConfig::default().formatter(specta::ts::prettier))
    //.events(collect_events![RandomNumber])
  };
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  //let plugin_utils = specta_builder!(R, Runtime).into_plugin_utils(PLUGIN_NAME);

  Builder::new(PLUGIN_NAME)
    .setup(move |app| {
      let app = app.clone();

      //(plugin_utils.setup)(&app);

      let plugin = SplashScreenPlugin::new(app.app_handle());
      app.manage(plugin);

      let app_handle = app.app_handle();
      app.listen_global("set-backend-ready", move |_| {
        let plugin = app_handle.state::<SplashScreenPlugin<R>>();
        plugin.set_backend_ready();
        if plugin.is_ready() {
          plugin.close_spashscreen();
        }
      });

      let app_handle = app.app_handle();
      app.listen_global("set-frontend-ready", move |_| {
        let plugin = app_handle.state::<SplashScreenPlugin<R>>();
        plugin.set_frontend_ready();
        if plugin.is_ready() {
          plugin.close_spashscreen();
        }
      });
      Ok(())
    })
    //.invoke_handler(plugin_utils.invoke_handler)
    .invoke_handler(tauri::generate_handler![
      close_splashscreen,
      set_frontend_ready
    ])
    .build()
}

#[cfg(test)]
mod test {
  use super::*;

  #[test]
  fn export_types() {
    println!("Exporting types for plugin: {}", PLUGIN_NAME);
    println!("Export path: {}", generate_plugin_path(PLUGIN_NAME));

    assert_eq!(
      specta_builder!(tauri::Wry, Runtime)
        .export_for_plugin(PLUGIN_NAME)
        .ok(),
      Some(())
    );
  }
}

/*
release_id: 0,
new_release: false,
assets: [],
*/
// ! DEPRECATED - but it works ....
/*pub async fn run_gh_release_assets() -> Result<String, String> {
  info!("Starting GitHub release client");
  let gh_response = run_gh_release_latest().await;
  let mut request_response: String = String::new();
  match gh_response {
    Ok(response) => {
      request_response = response;
      /* println!(
        "[Github Release Asset]: Request Response: {:?}",
        request_response
      ); */
    }
    Err(e) => println!("[Github Release Asset]: Request failed: {}", e),
  }

  let json_response = serde_json::from_str::<Map<String, Value>>(&request_response);

  match json_response {
    Ok(response) => {
      println!("[Github Release]: JSON response: {:?}", response);
      // check if the json object is empty
      if response.is_empty() {
        warn!("[Github Release]: JSON object is empty");
        return Err("[Github Release]: JSON object is empty".into());
      }

      // check if the json object has the key "id" - and if it does check if the value is the same as the current value saved to the file
      if response.contains_key("id") {
        let id = response["id"].to_string();
        // read the json config file and create it if it doesn't exist
        let mut data = String::new();
        let mut file = std::fs::OpenOptions::new()
          .read(true)
          .write(true)
          .create(true)
          .open("config/config.json");

        match file {
          Ok(ref mut file) => {
            file.read_to_string(&mut data).unwrap();
          }
          Err(e) => {
            error!("[Github Release]: Unable to open config file: {}", e);
            return Err("[Github Release]: Unable to open config file".into());
          }
        }

        // if the file is empty, create a new file with the id, and assets array
        if data.is_empty() {
          println!("[Github Release]: File is empty  - creating new file");
          let mut config = Map::new();
          let mut assets = Map::new();
          let mut asset = Map::new();
          asset.insert("id".to_string(), Value::String(id));
          asset.insert("new_release".to_string(), Value::Bool(true));

          let mut assets_array = Vec::new();
          // get the assets array from the json response and add it to the assets_array
          let assets_array_json = response["assets"].as_array();
          let assets_array_json_result = match assets_array_json {
            Some(assets_array_json) => assets_array_json,
            None => {
              error!("[Github Release]: Unable to get assets array");
              return Err("[Github Release]: Unable to get assets array".into());
            }
          };
          for asset in assets_array_json_result {
            assets_array.push(asset.clone());
          }
          asset.insert("assets".to_string(), Value::Array(assets_array));
          assets.insert("OpenIris".to_string(), Value::Object(asset));
          config.insert("assets".to_string(), Value::Object(assets));
          let config_json = serde_json::to_string_pretty(&config).unwrap();
          std::fs::write("config/config.json", config_json).expect("Unable to write file");
          return Ok("[Github Release]: Grabbed Newest Github Asset Config - Created new config file".to_string());
        }

        // we got hre because the file is not empty - so parse the json config file

        // check if the id is the same as the one in the config file

        // if the id is the same, return and do nothing

        // if the id is different, update the config file with the new id and assets array
        // parse the json config file
        let config: serde_json::Value = serde_json::from_str(&data).map_err(|e| e.to_string())?;
        debug!("[Github Release]: Current Config: {:?}", config);

        if id == config["assets"]["OpenIris"]["id"] {
          println!("[Github Release]: No new release - using cached config");
          return Ok("[Github Release]: Grabbed Newest Github Asset Config".to_string());
        }

        let mut config = Map::new();
        let mut assets = Map::new();
        let mut asset = Map::new();
        asset.insert("id".to_string(), Value::String(id));
        asset.insert("new_release".to_string(), Value::Bool(true));

        let mut assets_array = Vec::new();
        // get the assets array from the json response and add it to the assets_array
        let assets_array_json = response["assets"].as_array();
        let assets_array_json_result = match assets_array_json {
          Some(assets_array_json) => assets_array_json,
          None => {
            error!("Unable to get assets array");
            return Err("Unable to get assets array".into());
          }
        };
        for asset in assets_array_json_result {
          assets_array.push(asset.clone());
        }
        asset.insert("assets".to_string(), Value::Array(assets_array));
        assets.insert("OpenIris".to_string(), Value::Object(asset));
        config.insert("assets".to_string(), Value::Object(assets));
        let config_json = serde_json::to_string_pretty(&config).unwrap();
        std::fs::write("config/config.json", config_json).expect("Unable to write file");
        return Ok("[Github Release]: Grabbed Newest Github Asset Config".to_string());
      }
    }
    Err(e) => println!("JSON parse failed: {}", e),
  }
  Ok("[Github Release]: Grabbed Newest Github Asset Config".to_string())
} */