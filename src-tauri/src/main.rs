// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod tcp_client;
mod config;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::connect_to_server,
            commands::save_config,
        // commands::send_message
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
