
use log::{debug, error, info, warn};
use reqwest::Client;
use serde_json::{Map, Value};
use std::io::Read;

/// A struct to hold the REST client
/// ## Fields
/// - `client`: a reqwest client
/// - `base_url`: the base url of the api to query
/// - `name`: the name of the url to query
/// - `data`: a hashmap of the data returned from the api
pub struct RESTClient {
  http_client: Client,
  base_url: String,
  method: String,
}

/// A function to create a new RESTClient instance
/// ## Arguments
/// - `base_url` The base url of the api to query
impl RESTClient {
  pub fn new(base_url: String, method: String) -> Self {
    Self {
      http_client: Client::new(),
      base_url,
      method,
    }
  }
}

pub async fn request(rest_client: &RESTClient) -> Result<String, String> {
  info!("Making REST request");

  let response: String;
  let response = match rest_client.method.as_str() {
    "GET" => {
      response = rest_client
        .http_client
        .get(&rest_client.base_url)
        .header("User-Agent", "EyeTrackVR")
        .send()
        .await
        .map_err(|e| e.to_string())?
        .text()
        .await
        .map_err(|e| e.to_string())?;
      response
    }
    "POST" => {
      response = rest_client
        .http_client
        .post(&rest_client.base_url)
        .send()
        .await
        .map_err(|e| e.to_string())?
        .text()
        .await
        .map_err(|e| e.to_string())?;
      response
    }
    _ => {
      error!("Invalid method");
      return Err("Invalid method".to_string());
    }
  };

  Ok(response)
}

/// A function to run a REST Client and create a new RESTClient instance for each device found
/// ## Arguments
/// - `endpoint` The endpoint to query for
/// - `device_name` The name of the device to query
pub async fn run_rest_client(
  endpoint: String,
  device_name: String,
  method: String,
) -> Result<String, String> {
  info!("Starting REST client");
  let full_url = format!("{}{}", device_name, endpoint);
  let mut request_response: String = String::new();
  //info!("Full url: {}", full_url);
  let rest_client = RESTClient::new(full_url, method);
  let request_result = request(&rest_client).await;
  match request_result {
    Ok(response) => {
      request_response = response;
      println!("[REST Client]: Request response: {:?}", request_response);
    }
    Err(e) => println!("[REST Client]: Request failed: {}", e),
  }
  Ok(request_response)
}

async fn run_gh_release_latest() -> Result<String, String> {
  info!("Starting GitHub release client");
  let endpoint = "/releases/latest";
  let device_name = "https://api.github.com/repos/lorow/OpenIris";
  let method = "GET".to_string();
  let mut request_response: String = String::new();
  let request_result = run_rest_client(endpoint.to_string(), device_name.to_string(), method).await;

  match request_result {
    Ok(response) => {
      request_response = response;
      /* println!(
        "[Github Release Latest]:  Request response: {:?}",
        request_response
      ); */
    }
    Err(e) => println!("[Github Release Latest]: Request failed: {}", e),
  }
  Ok(request_response)
}

/*
release_id: 0,
new_release: false,
assets: [],
*/
///! DEPRECATED - but it works ....
pub async fn run_gh_release_assets() -> Result<String, String> {
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
}
