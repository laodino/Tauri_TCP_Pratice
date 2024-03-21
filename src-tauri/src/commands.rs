
use tauri::Window;
use crate::tcp_client;

#[tauri::command()]
pub async fn connect_to_server(window: Window,remote_ip: &str, remote_port: &str) -> Result<(),& 'static str> {
    tcp_client::connect_to_sever(window,remote_ip, remote_port).await
}
