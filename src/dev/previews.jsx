import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import NetworkClientUI from "../pages/NetWorkClient.jsx";
import {Config} from "../pages/Config.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NetworkClientUI">
                <NetworkClientUI/>
            </ComponentPreview>
            <ComponentPreview path="/Config">
                <Config/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews