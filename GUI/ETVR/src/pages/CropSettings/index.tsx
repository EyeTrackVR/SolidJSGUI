import { useNavigate } from '@solidjs/router'
import { debug } from 'tauri-plugin-log-api'
import CropSettings from '@src/views/CropSettings'
import { useAppCameraContext } from '@store/context/camera'

const CropSettingsPage = () => {
    const navigate = useNavigate()

    const { getSelectedCamera } = useAppCameraContext()

    return (
        <CropSettings
            onClickBack={() => {
                navigate('/settings/true')
            }}
            onClickSaveCrop={(boxPosition) => {
                debug(`[Crop Settings]: ${JSON.stringify(boxPosition)}`)
                // TODO: do the rest with boxPosition , need to divide by 2
                navigate('/settings/true')
            }}
            cameraConnectingStatus={getSelectedCamera().status}
        />
    )
}

export default CropSettingsPage
