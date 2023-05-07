import { useNavigate, useParams } from '@solidjs/router'
import { debug } from 'tauri-plugin-log-api'
import { useAppUIContext } from '@src/store/context/ui'
import Settings from '@src/views/Settings'
import { useAppCameraContext } from '@store/context/camera'

const SettingsPage = () => {
    const navigate = useNavigate()
    const params = useParams()

    const { getSelectedCamera } = useAppCameraContext()

    const { setHideHeaderButtons } = useAppUIContext()

    return (
        <Settings
            createNewCamera={params.flag === 'true'}
            camerasUrl={['.', '.', '.']}
            onChange={(value) => debug(value)}
            onClickBack={() => {
                setHideHeaderButtons(false)
                navigate('/')
            }}
            onClickCircleCrop={() => {
                debug('on click circle crop')
            }}
            onChangeCameraAddress={() => {
                debug('change camera address')
            }}
            onClickCalibrate={() => {
                debug('onClickCalibrate')
            }}
            onClickRecenter={() => {
                debug('onClickRecenter')
            }}
            onClickCroppingMode={() => {
                navigate('/cropSettings')
            }}
            onClick={(selected) => {
                debug(selected)
            }}
            cameraStatus={getSelectedCamera().status}
        />
    )
}

export default SettingsPage
