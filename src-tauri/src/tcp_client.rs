use std::io::ErrorKind;
use std::net::{SocketAddr};
use std::sync::Arc;
use tauri::{Window};
use tokio::io::{ AsyncWriteExt};
use tokio::net::{ TcpStream};
use std::sync::Mutex;

    pub async fn connect_to_sever(window: Window, ip: &str, port: &str) -> Result<(), &'static str> {
        let addr_str = format!("{}:{}", ip, port);
        let addr: SocketAddr = addr_str.parse().expect("IP地址和端口错误");

        let stream_result = TcpStream::connect(addr).await;

        match stream_result {
            Ok(mut stream) => {
                window.emit("net-connect", "连接成功").unwrap();
                stream.write_all(b"Hello Connection").await.expect("写入错误");

                let (reader, writer) = stream.into_split();
                let writer = Arc::new(Mutex::new(writer));

                let writer_clone = Arc::clone(&writer);
             let win_handle =    window.listen("send-message", move |event| {
                    let mut writer = writer_clone.lock().unwrap();
                    // goddamn
                    tokio::task::block_in_place(move || {
                        tauri::async_runtime::handle().block_on(async {
                            if let Some(content) = event.payload() {
                                println!("send_message_received:{}",content);
                               match writer.write_all(&content.as_bytes()).await{
                                   Ok(_)=>{
                                       writer.flush().await.expect("缓冲区刷新错误");
                                   },
                                   Err(_)=>{
                                       println!("close writer");
                                   }
                               }
                            }
                        });
                    });
                });

                loop {
                    reader.readable().await.expect("可读取错误");
                    let mut data = vec![0; 1024];
                    match reader.try_read(&mut data) {
                        Ok(n) => {
                            if n!=0{
                                data.truncate(n);
                                window.emit("receive-message", String::from_utf8_lossy(&data)).unwrap();
                            }
                        }
                        Err(ref e) if e.kind() == ErrorKind::WouldBlock => {
                            continue;
                        }
                        Err(_) => {
                            window.unlisten(win_handle);
                            break;
                        }
                    }
                }
            },
            _ => {
                window.emit("net-connect", "连接失败").unwrap();
            }
        }
        Ok(())
    }


