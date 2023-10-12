use std::io::{self, Write};
use std::process::Command;

// TODO: use a macro to avoid repeating this code
// TODO: add a check to see if the binary is already downloaded and skip the download if it is the same version as the current release

fn etvr_backend() {
  let output = Command::new("gh")
    .arg("release")
    .arg("-R")
    .arg("EyeTrackVR/ETVR-Backend")
    .arg("download")
    .arg("--clobber")
    .arg("--dir")
    .arg("bin")
    .arg("-p")
    .arg("*.bin")
    .arg("-p")
    .arg("*.exe")
    .output()
    .expect("failed to execute process");

  println!("status: {}", output.status);
  io::stdout().write_all(&output.stdout).unwrap();
  io::stderr().write_all(&output.stderr).unwrap();
  assert!(output.status.success());

  let extension = if cfg!(target_os = "windows") {
    ".exe"
  } else {
    ".bin"
  };

  let rust_info = Command::new("rustc")
    .arg("-Vv")
    .output()
    .expect("failed to execute process");
  let rust_info_string = String::from_utf8_lossy(&rust_info.stdout);

  let target_triple = rust_info_string
    .lines()
    .find(|line| line.starts_with("host:"))
    .unwrap()
    .split_whitespace()
    .nth(1)
    .unwrap();

  if target_triple.is_empty() || target_triple == "unknown" {
    panic!("invalid target triple");
  }

  // rename the binary to the correct name
  let binary_name = format!("bin/ETVR{}", extension);
  let target_binary_name = format!("bin/ETVR-{}{}", target_triple, extension);
  std::fs::rename(binary_name, target_binary_name).unwrap();
}

fn main() {
  //etvr_backend();
  tauri_build::build()
}
