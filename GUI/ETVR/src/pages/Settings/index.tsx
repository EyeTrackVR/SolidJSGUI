import { useNavigate, useParams } from '@solidjs/router'
import Settings from '@src/views/Settings'
import { useAppCameraContext } from '@store/context/camera'
import { setHideHeaderButtons } from '@store/ui/ui'

const SettingsPage = () => {
    const navigate = useNavigate()
    const params = useParams()

    const { getSelectedCamera } = useAppCameraContext()

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
                navigate('/cropSettings')
            }}
            onClick={(selected) => {
                console.log(selected)
            }}
            cameraStatus={getSelectedCamera().status}
        />
    )
}

export default SettingsPage
