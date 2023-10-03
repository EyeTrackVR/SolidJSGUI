use std::sync::Mutex;
use tauri::{
  plugin::{Builder, TauriPlugin},
  AppHandle, Manager, Runtime,
};

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

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("splashscreen")
    .setup(|app| {
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
    .invoke_handler(tauri::generate_handler![
      close_splashscreen,
      set_frontend_ready
    ])
    .build()
}
