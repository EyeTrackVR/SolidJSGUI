use tauri::{
  command,
  plugin::{Builder, TauriPlugin},
  AppHandle, Manager, Runtime, State,
};

use std::{
  ops::{Deref, DerefMut},
  sync::Mutex,
};

use log::{error, info};
use reqwest::Client;
use serde::{ser::Serializer, Serialize};
use tauri_specta::*;

type Result<T> = std::result::Result<T, Error>;

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
  pub http_client: Mutex<Client>,
  pub base_url: Mutex<String>,
  pub method: Mutex<String>,
}

impl Deref for RESTClient {
  type Target = RESTClient;

  fn deref(&self) -> &Self::Target {
    self
  }
}

impl DerefMut for RESTClient {
  fn deref_mut(&mut self) -> &mut Self::Target {
    self
  }
}

/// A function to create a new RESTClient instance
/// ## Arguments
/// - `base_url` The base url of the api to query
impl RESTClient {
  pub fn new(base_url: Option<String>, method: Option<String>) -> Self {
    Self {
      http_client: Mutex::new(Client::new()),
      base_url: Mutex::new(base_url.unwrap_or(String::new())),
      method: Mutex::new(method.unwrap_or(String::new())),
    }
  }
}

#[derive(Debug)]
pub struct APIPlugin<R: Runtime> {
  pub app_handle: Mutex<AppHandle<R>>,
  pub rest_client: Mutex<RESTClient>,
}

impl<R: Runtime> Deref for APIPlugin<R> {
  type Target = APIPlugin<R>;

  fn deref(&self) -> &Self::Target {
    self
  }
}

impl<R: Runtime> DerefMut for APIPlugin<R> {
  fn deref_mut(&mut self) -> &mut Self::Target {
    self
  }
}

impl<R: Runtime> APIPlugin<R> {
  fn new(app_handle: Mutex<AppHandle<R>>) -> Self {
    let rest_client = Mutex::new(RESTClient::new(None, None));
    Self {
      app_handle,
      rest_client,
    }
  }

  fn set_base_url(&mut self, base_url: String) -> &mut Self {
    self.rest_client.lock().unwrap().base_url = Mutex::new(base_url);

    self
  }

  fn set_method(&mut self, method: String) -> &mut Self {
    self.rest_client.lock().unwrap().method = Mutex::new(method);
    self
  }

  async fn request(&self) -> Result<()> {
    info!("Making REST request");

    let shared_rest_client = *self.rest_client.lock().unwrap();
    let shared_app_handle = *self.app_handle.lock().unwrap();

    let base_url = shared_rest_client.base_url.lock().unwrap().clone();

    let response: String;

    let method = shared_rest_client.method.lock().unwrap().clone();

    let method = method.as_str();

    let response = match method {
      "GET" => {
        response = shared_rest_client
          .http_client
          .lock()
          .unwrap()
          .get(&base_url)
          .header("User-Agent", "EyeTrackVR")
          .send()
          .await?
          .text()
          .await?;
        response
      }
      "POST" => {
        response = shared_rest_client
          .http_client
          .lock()
          .unwrap()
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
      .lock()
      .unwrap()
      .trigger_global("request-response", Some(response));
    Ok(())
    // send a global event when the API is closed
  }

  /// A function to run a REST Client and create a new RESTClient instance for each device found
  /// ## Arguments
  /// - `endpoint` The endpoint to query for
  /// - `device_name` The name of the device to query
  async fn run_rest_client(
    &mut self,
    endpoint: String,
    device_name: String,
    method: String,
  ) -> Result<()> {
    info!("Starting REST client");
    let full_url = format!("{}{}", device_name, endpoint);

    //info!("Full url: {}", full_url);

    let request_result = self.request().await;
    match request_result {
      Ok(()) => {
        println!("[REST Client]: Request response: Ok");
      }
      Err(e) => println!("[REST Client]: Request failed: {}", e),
    }
    Ok(())
  }
}

#[command(async)]
#[specta::specta]
async fn make_request<R: Runtime>(
  endpoint: String,
  device_name: String,
  method: String,
  state: State<'_, APIPlugin<R>>,
) -> Result<String> {
  info!("Starting REST request");
  let full_url = format!("{}{}", device_name, endpoint);

  state
    .lock()
    .unwrap()
    .as_ref()
    .set_base_url(full_url)
    .set_method(method);

  Ok("Ok".to_string())
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("tauri_plugin_request_client")
    .setup(|app| {
      let plugin = APIPlugin::new(Mutex::new(app.app_handle()));
      app.manage(plugin);
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![make_request])
    .build()
}
