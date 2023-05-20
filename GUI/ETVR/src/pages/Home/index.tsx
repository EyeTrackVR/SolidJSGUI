import { useNavigate } from '@solidjs/router'
import { useAppAPIContext } from '@src/store/context/api'
import { useAppUIContext } from '@src/store/context/ui'
import Home from '@src/views/Home'
import { useAppCameraContext } from '@store/context/camera'

const HomePage = () => {
    const { getFirmwareVersion, setRESTDevice } = useAppAPIContext()
    const { getCameras, setSelectedCamera, resetSelectedCamera } = useAppCameraContext()

    let firmwareVersion = '0.0.0'
    let setRestDevice: (device: string) => void = () => {
        return
    }

    if (getFirmwareVersion) {
        firmwareVersion = getFirmwareVersion()
    }

    if (setRESTDevice) {
        setRestDevice = setRESTDevice
    }

    const navigate = useNavigate()

    return (
        <Home
            firmwareVersion={firmwareVersion}
            cameras={getCameras()}
            onClickNavigateCamera={(camera) => {
                navigate('/settings/false', { replace: true })
                setSelectedCamera(camera)
                setRestDevice(camera.address)
            }}
            onClickNavigateCreateCamera={() => {
                navigate('/settings/true', { replace: true })
                resetSelectedCamera()
            }}
        />
    )
}

export default HomePage
