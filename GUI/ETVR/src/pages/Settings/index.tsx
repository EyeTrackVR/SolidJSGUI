import Settings from '@components/Settings'
import { CameraStatus, CameraType } from '@src/store/camera/camera'
import './styles.css'

const SettingsPage = () => {
    return (
        <Settings
            camerasUrl={['.', '.', '.']}
            onChange={(value) => console.log(value)}
            onClick={(selected) => console.log(selected)}
            cameraIP={'000_000_000'}
            cameraStatus={CameraStatus.ACTIVE}
            cameraType={CameraType.WIRELESS}
            placeholder="Camera name"
            CameraAddressHeader="Camera name"
            CameraConfigOptionsHeader="Eye Config options"
        />
    )
}

export default SettingsPage
