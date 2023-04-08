import { useNavigate } from '@solidjs/router'
import { firmwareVersion } from '@src/store/api/selectors'
import Home from '@src/views/Home'
import { setRestDevice } from '@store/api/restAPI'
import { resetSelectedCamera, setSelectedCamera } from '@store/camera/camera'
import { cameras } from '@store/camera/selectors'
import { setHideHeaderButtons } from '@store/ui/ui'

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <Home
            firmwareVersion={firmwareVersion()}
            cameras={cameras()}
            onClickNavigateCamera={(camera) => {
                navigate('/settings/false', { replace: true })
                setSelectedCamera(camera)
                setRestDevice(camera.address)
                setHideHeaderButtons(true)
            }}
            onClickNavigateCreateCamera={() => {
                navigate('/settings/true', { replace: true })
                setHideHeaderButtons(true)
                resetSelectedCamera()
            }}
        />
    )
}

export default HomePage
