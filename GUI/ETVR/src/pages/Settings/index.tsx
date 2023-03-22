import { useNavigate } from '@solidjs/router'
import Settings from '@components/Settings'
import { CameraStatus } from '@src/store/camera/camera'
import './styles.css'
import { setHideHeaderButtons } from '@src/store/ui/ui'

const SettingsPage = () => {
    const navigate = useNavigate()

    return (
        <Settings
            camerasUrl={['.', '.', '.']}
            onChange={(value) => console.log(value)}
            onClickBack={() => {
                setHideHeaderButtons(false)
                navigate('/')
            }}
            onClickCalibrate={() => {
                console.log('onClickCalibrate')
            }}
            onClickRecenter={() => {
                console.log('onClickRecenter')
            }}
            onClickCroppingMode={() => {
                console.log('onClickCroppingMode')
            }}
            onClick={(selected) => {
                console.log(selected)
            }}
            cameraStatus={CameraStatus.ACTIVE}
        />
    )
}

export default SettingsPage
