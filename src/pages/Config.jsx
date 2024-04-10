import {useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";

export  default function Config(){

    const [configInfo,setConfigInfo] = useState({
        configName:'',
        rowNum:'',
        colNum:'',
        bias:'',
        rowRadianRangeLow:'',
        rowRadianRangeHigh:'',
        colRadianRangeLow:'',
        colRadianRangeHigh:'',
    });

    function handleChanges(event){

        setConfigInfo(ci=>({
            ...ci,
            [event.target.name]:event.target.value
            // configName :event.target.configName,
            // rowNum:event.target.rowNum,
            // colNum:event.target.colNum,
            // bias:event.target.bias,
            // rowRadianRangeLow:event.target.rowRadianRangeLow,
            // rowRadianRangeHigh:event.target.rowRadianRangeHigh,
            // colRadianRangeLow:event.target.colRadianRangeLow,
            // colRadianRangeHigh:event.target.colRadianRangeHigh
        }))
        event.preventDefault();
    }
    function save_config(event){
        event.preventDefault();
        let data = JSON.stringify(configInfo);
        invoke("save_config", {configData: data});
    }

    return (
        <div>
            <form
                onSubmit={save_config}
            >
                <div className="horizon">
                    <table>
                        <tbody>
                        <tr>
                            <td>配置名</td>
                            <td colSpan={2}><input
                                type="text"
                                name="configName"
                                value={configInfo.configName}
                                onChange={handleChanges}
                            ></input>
                            </td>
                        </tr>
                        <tr>
                            <td>行数</td>
                            <td colSpan={2}><input
                                type="number"
                                name="rowNum"
                                value={configInfo.rowNum}
                                onChange={handleChanges}
                            ></input></td>
                        </tr>
                        <tr>
                            <td>列数</td>
                            <td colSpan={2}><input
                                type="number"
                                name="colNum"
                                value={configInfo.colNum}
                                onChange={handleChanges}
                            ></input></td>
                        </tr>
                        <tr>
                            <td>偏差</td>
                            <td colSpan={2}><input
                                type="number"
                                name="bias"
                                value={configInfo.bias}
                                onChange={handleChanges}
                            ></input></td>
                        </tr>
                        <tr>
                            <td>长边曲率范围</td>
                            <td><input
                                type="number"
                                name="rowRadianRangeLow"
                                value={configInfo.rowRadianRangeLow}
                                onChange={handleChanges}
                            ></input></td>
                            <td><input
                                type="number"
                                name="rowRadianRangeHigh"
                                value={configInfo.rowRadianRangeHigh}
                                onChange={handleChanges}
                            ></input></td>
                        </tr>
                        <tr>
                            <td>短边曲率范围</td>
                            <td><input
                                type="number"
                                name="colRadianRangeLow"
                                value={configInfo.colRadianRangeLow}
                                onChange={handleChanges}
                            ></input></td>
                            <td><input
                                type="number"
                                name="colRadianRangeHigh"
                                value={configInfo.colRadianRangeHigh}
                                onChange={handleChanges}
                            ></input></td>
                        </tr>
                        <tr>
                            <td>
                                <button>偏移矩阵</button>
                            </td>
                            <td>
                                <button type="submit">保存</button>
                            </td>
                            <td>
                                <button>取消</button>
                            </td>

                        </tr>

                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <th>1</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>

            </form>

        </div>
    );
}

