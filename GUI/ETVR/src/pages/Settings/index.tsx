import { useNavigate, useParams } from '@solidjs/router'
import Settings from '@components/Settings'
import { CameraStatus } from '@store/camera/camera'
import './styles.css'
import { setHideHeaderButtons } from '@store/ui/ui'

const SettingsPage = () => {
    const navigate = useNavigate()
    const params = useParams()

    return (
        <Settings
            createNewCamera={params.flag === 'true'}
            camerasUrl={['.', '.', '.']}
            onChange={(value) => console.log(value)}
            onClickBack={() => {
                setHideHeaderButtons(false)
                navigate('/')
            }}
            onClickCircleCrop={() => {
                console.log('on click circle crop')
            }}
            onChangeCameraAddress={() => {
                console.log('change camera address')
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
