import { useNavigate, useParams } from '@solidjs/router'
import { selectedCamera } from '@src/store/camera/selectors'
import Settings from '@src/views/Settings'
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
            cameraStatus={selectedCamera().status}
        />
    )
}

export default SettingsPage
