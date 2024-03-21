import  "./NetWorkClient.css";
import { invoke } from "@tauri-apps/api/tauri";
import {useEffect, useState} from "react";
import {appWindow} from "@tauri-apps/api/window";



export default function NetworkClientUI() {

    const [remote_ip,setRemoteIP] = useState("127.0.0.1");
    const [remote_port,setRemotePort] = useState("6000");
    const [connectState,setConnectState] = useState("");
    const [postContent,setPostContent] = useState("");
    const [sendMessage,setSendMessage] = useState("");

    useEffect(() => {
        const listen1 = appWindow.listen("net-connect",(event)=> {
            console.log("收到事件", event.event, event.payload);
            setConnectState(event.payload);
        });
        const listen2 = appWindow.listen("receive-message",(event)=>{
            console.log("收到事件", event.event, event.payload);
            setPostContent(postContent=>postContent+"\r\n"+event.payload);
        })
            return ()=>{
                listen1.then((f)=>f());
                listen2.then((f)=>f());
            }
        }, []);

    async function connect_to_server(){
        await invoke("connect_to_server",{remoteIp:remote_ip,remotePort:remote_port});
    }

    async function send_message(){
        // await invoke("send_message",{message:sendMessage});
        await appWindow.emit("send-message", sendMessage);
    }

    function clear_receive_textarea(){
         setPostContent("");
    }



    return (
        <div className={"horizon"}>
            <div className={"serverSetting"}>
                <table>
                    <tbody>
                    <tr>
                        <td>客户端</td>
                    </tr>
                    <tr>
                        <td>服务器IP:</td>
                        <td><input
                            value={remote_ip}
                            onChange={(e)=>setRemoteIP(e.currentTarget.value)}
                        /></td>
                    </tr>
                    <tr>
                        <td>服务器Port:</td>
                        <td><input
                            value={remote_port}
                            onChange={(e)=>setRemotePort(e.currentTarget.value)}
                        /></td>
                    </tr>
                    <tr>
                        <td>通讯状态:</td>
                        <td><label className={"clientConnectState"}>{connectState}</label></td>
                    </tr>
                    <tr>
                        <td>
                            <button
                                className={"connectToServer"}
                                 onClick={()=>connect_to_server()
                                 }>
                                建立连接</button>
                        </td>
                        <td>
                            <button className={"disconnectFromServer"}
                           // onClick={()=>disconnect_from_server()}
                            >断开连接</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={"dataSend"}>
                <div className={"vertical"}>
                    <label>数据发送窗口</label>
                    <textarea className={"textSend"}
                    value={sendMessage}
                              onChange={(e)=>setSendMessage(e.currentTarget.value)}
                    ></textarea>
                    <div className={"horizon"}>
                        <button className={"buttonSend"}
                        onClick={()=>send_message()
                        }
                        >发送</button>
                        <button className={"buttonClear"}
                        onClick={()=>clear_receive_textarea()}
                        >清空</button>
                    </div>
                </div>
            </div>
            <div className={"dataReceived"}>
                <div className={"vertical"}>
                    <label>数据接收窗口</label>
                    <textarea
                        className={"textReceived"}
                        value={postContent}
                        readOnly={true}
                        onChange={e => setPostContent(e.target.value)}
                    ></textarea>
                </div>
            </div>

        </div>

    );
}