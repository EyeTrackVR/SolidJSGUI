import { useNavigate, useParams } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { debug } from 'tauri-plugin-log-api'
import { CameraCalibrationButtonType } from '@src/static/types/enums'
import { IBoxPosition } from '@src/static/types/interfaces'
import { useAppUIContext } from '@src/store/context/ui'
import Settings from '@src/views/Settings'
import { useAppCameraContext } from '@store/context/camera'

const SettingsPage = () => {
    const [isButtonActive, setIsButtonActive] = createSignal({
        [CameraCalibrationButtonType.CALIBRATE]: false,
        [CameraCalibrationButtonType.RECENTER]: false,
        [CameraCalibrationButtonType.CROPPING_MODE]: false,
    })

    const navigate = useNavigate()
    const params = useParams()

    const { getSelectedCamera } = useAppCameraContext()
    const { setHideHeaderButtons } = useAppUIContext()

    const onClickCroppingMode = (isActive: boolean) => {
        setIsButtonActive({
            ...isButtonActive(),
            [CameraCalibrationButtonType.CROPPING_MODE]: isActive,
        })
    }

    const onClickSaveCrop = (boxPosition: IBoxPosition) => {
        setIsButtonActive({
            ...isButtonActive(),
            [CameraCalibrationButtonType.CROPPING_MODE]: false,
        })
        debug(`[Crop Settings]: ${JSON.stringify(boxPosition)}`)
    }

    return (
        <Settings
            isButtonActive={isButtonActive()}
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
            onClickCroppingMode={onClickCroppingMode}
            onClickSaveCrop={onClickSaveCrop}
            onClick={(selected) => {
                debug(selected)
            }}
            cameraStatus={getSelectedCamera().status}
        />
    )
}

export default SettingsPage
