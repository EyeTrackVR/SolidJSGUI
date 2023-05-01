import { useNavigate } from '@solidjs/router'
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
            onClickSaveCrop={() => {
                navigate('/settings/true')
            }}
            cameraConnectingStatus={getSelectedCamera().status}
        />
    )
}

export default CropSettingsPage
