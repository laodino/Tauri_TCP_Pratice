import {useState} from "react";
import "./LabTab.css"
import NetworkClientUI from "../pages/NetWorkClient.jsx";

export default function
    LabTabs() {

    const tabs=[
        {text:'数据显示',type:'data-preview'},
        {text:'网络设置',type:'network-setting'},
        {text:'串口设置',type:'serialPort'},
    ]

    const [type,setType] = useState('data-preview')
    const handleTabChange=(type)=>{
        setType(type)
        console.log(type)
    }
    return (
        <li>
            <ul>
                <li>
                    {tabs.map(item =>
                        <span
                            key={item.type}
                            onClick={() => handleTabChange(item.type)}
                            className={`tab-item-${type === item.type && 'true'}`}>
                        {item.text}
                    </span>)}
                </li>
            </ul>
            <NetworkClientUI></NetworkClientUI>
        </li>

    );
}