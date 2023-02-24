import { createMemo } from 'solid-js'
import Settings from '@components/Settings'
import { rtcState } from '@src/store/api/websocket'
import { CameraStatus, CameraType } from '@src/store/camera/camera'
import './styles.css'

const SettingsPage = () => {
    const camerasUrl = createMemo(() => rtcState().ws.map(({ url }) => url))

    return (
        <Settings
            camerasUrl={camerasUrl()}
            onChange={(value) => console.log(value)}
            onClick={(selected) => console.log(selected)}
            cameraIP={'000_000_000'}
            cameraStatus={CameraStatus.ACTIVE}
            cameraType={CameraType.WIRELESS}
            placeholder="Camera name"
            header="Camera name"
        />
    )
}

export default SettingsPage
