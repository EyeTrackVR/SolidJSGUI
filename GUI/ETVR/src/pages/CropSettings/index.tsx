import { useNavigate } from '@solidjs/router'
import { selectedCamera } from '@src/store/camera/selectors'
import CropSettings from '@src/views/CropSettings'

const CropSettingsPage = () => {
    const navigate = useNavigate()

    return (
        <CropSettings
            onClickBack={() => {
                navigate('/settings/true')
            }}
            onClickSaveCrop={() => {
                navigate('/settings/true')
            }}
            cameraConnectingStatus={selectedCamera().status}
        />
    )
}

export default CropSettingsPage
