import Settings from '@components/Settings'
import { CameraStatus, CameraType } from '@src/store/camera/camera'
import './styles.css'

const SettingsPage = () => {
    return (
        <Settings
            onChange={(value) => console.log(value)}
            cameraIP={'000_000_000'}
            cameraStatus={CameraStatus.ACTIVE}
            cameraType={CameraType.WIRELESS}
        />
    )
}

export default SettingsPage
