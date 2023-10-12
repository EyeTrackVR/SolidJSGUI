use command_group::{CommandGroup, GroupChild};
use log::{debug, info};
use std::process::{Command as StdCommand, Stdio};
use tauri::api::process::Command;

#[derive(Default)]
pub struct Backend(pub Option<GroupChild>);

pub fn start_backend() -> Result<GroupChild, String> {
  debug!("[Python Backend]: Starting backend...");

  let mut command = StdCommand::from(
    Command::new_sidecar("ETVR").expect("[Python Backend]: Failed to create `ETVR` binary command"),
  );
  debug!("[Python Backend]: Successfully started backend");

  let child = command
    .stdout(Stdio::piped())
    .group_spawn()
    .expect("Failed to spawn backend sidecar");

  Ok(child)
}

pub fn stop_backend(mut child: GroupChild) -> Result<(), String> {
  child
    .kill()
    .expect("[App Exit]: Failed to shutdown backend.");

  info!("[App Exit]: Backend gracefully shutdown.");
  Ok(())
}
