//#![recursion_limit = "512"]

use tauri::{
  command,
  plugin::{Builder, TauriPlugin},
  AppHandle, Manager, Runtime, State,
};

use std::sync::{Arc, Mutex};

use log::{error, info};
use reqwest::Client;
use serde::{ser::Serializer, Serialize};
use tauri_specta::*;

type APIResult<T> = std::result::Result<T, Error>;

#[derive(Debug, thiserror::Error)]
pub enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error),
}

impl Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
  where
    S: Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

impl From<reqwest::Error> for Error {
  fn from(e: reqwest::Error) -> Self {
    Error::Io(std::io::Error::new(std::io::ErrorKind::Other, e))
  }
}

#[derive(Debug)]
pub struct RESTClient {
  pub http_client: Arc<tauri::async_runtime::Mutex<Client>>,
  pub base_url: Arc<Mutex<String>>,
  pub method: Arc<Mutex<String>>,
}

/// A function to create a new RESTClient instance
/// ## Arguments
/// - `base_url` The base url of the api to query
impl RESTClient {
  pub fn new(base_url: Option<String>, method: Option<String>) -> Self {
    Self {
      http_client: Arc::new(tauri::async_runtime::Mutex::new(Client::new())),
      base_url: Arc::new(Mutex::new(base_url.unwrap_or(String::new()))),
      method: Arc::new(Mutex::new(method.unwrap_or(String::new()))),
    }
  }
}

#[derive(Debug)]
pub struct APIPlugin {
  pub app_handle: AppHandle<tauri::Wry>,
  pub rest_client: RESTClient,
}

impl APIPlugin {
  fn new(app_handle: AppHandle) -> Self {
    let rest_client = RESTClient::new(None, None);
    Self {
      app_handle,
      rest_client,
    }
  }

  fn set_base_url(&self, base_url: String) -> &Self {
    *self.rest_client.base_url.lock().unwrap() = base_url;
    self
  }

  fn set_method(&self, method: String) -> &Self {
    *self.rest_client.method.lock().unwrap() = method;
    self
  }

  fn get_base_url(&self) -> String {
    self.rest_client.base_url.lock().unwrap().clone()
  }

  fn get_method(&self) -> String {
    self.rest_client.method.lock().unwrap().clone()
  }

  async fn request(&self) -> APIResult<()> {
    info!("Making REST request");

    let base_url = self.get_base_url();

    let response: String;

    let method = self.get_method();

    let method = method.as_str();

    let response = match method {
      "GET" => {
        response = self
          .rest_client
          .http_client
          .lock()
          .await
          .get(&base_url)
          .header("User-Agent", "EyeTrackVR")
          .send()
          .await?
          .text()
          .await?;
        response
      }
      "POST" => {
        response = self
          .rest_client
          .http_client
          .lock()
          .await
          .post(&base_url)
          .send()
          .await?
          .text()
          .await?;
        response
      }
      _ => {
        error!("Invalid method");
        return Err(Error::Io(std::io::Error::new(
          std::io::ErrorKind::Other,
          "Invalid method",
        )));
      }
    };
    self
      .app_handle
      .trigger_global("request-response", Some(response));
    Ok(())
    // send a global event when the API is closed
  }

  /// A function to run a REST Client and create a new RESTClient instance for each device found
  /// ## Arguments
  /// - `endpoint` The endpoint to query for
  /// - `device_name` The name of the device to query
  async fn run_rest_client(
    &self,
    endpoint: String,
    device_name: String,
    method: String,
  ) -> APIResult<()> {
    info!("Starting REST client");

    let full_url = format!("{}{}", device_name, endpoint);
    info!("[APIPlugin]: Full url: {}", full_url);
    self.set_base_url(full_url).set_method(method);

    let request_result = self.request().await;
    match request_result {
      Ok(()) => {
        println!("[APIPlugin]: Request response: Ok");
      }
      Err(e) => println!("[APIPlugin]: Request failed: {}", e),
    }
    Ok(())
  }
}

#[command(async)]
#[specta::specta]
async fn make_request(
  endpoint: String,
  device_name: String,
  method: String,
  state: State<'_, APIPlugin>,
) -> Result<String, String> {
  info!("Starting REST request");

  let result = state.run_rest_client(endpoint, device_name, method).await;

  match result {
    Ok(()) => {
      println!("[APIPlugin]: Request response: Ok");
    }
    Err(e) => println!("[APIPlugin]: Request failed: {}", e),
  }

  Ok("Ok".to_string())
}

pub fn init<R: Runtime>() -> TauriPlugin<tauri::Wry> {
  Builder::new("tauri_plugin_request_client")
    .setup(|app| {
      let plugin = APIPlugin::new(app.app_handle());
      app.manage(plugin);
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![make_request])
    .build()
}
