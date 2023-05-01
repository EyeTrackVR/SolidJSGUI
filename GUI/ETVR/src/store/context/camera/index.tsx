import { createContext, useContext, createMemo, type Component, Accessor } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import type { Context } from '@static/types'
import type { Camera, AppStoreCamera } from '@static/types/interfaces'
import { CameraStatus, CameraType } from '@static/types/enums'

interface AppCameraContext {
    getCameras: Accessor<Camera[]>
    getCameraAddresses: Accessor<string[]>
    getCameraStatus: Accessor<CameraStatus[]>
    getSelectedCamera: Accessor<Camera>
    getSelectedCameraAddress: Accessor<string>
    getSelectedCameraStatus: Accessor<CameraStatus>
    getSelectedCameraType: Accessor<CameraType>
    getSelectedCameraSection: Accessor<string>
    getSelectedCameraSocket: Accessor<object>
    setAddCamera: (camera: Camera) => void
    setAddCameraMDNS: (address: string) => void
    setRemoveCamera: (camera: Camera) => void
    setCameraStatus: (camera: Camera, status: CameraStatus) => void
    setCameraWS: (camera: Camera, ws: object) => void
    setSelectedCamera: (camera: Camera) => void
    resetSelectedCamera: () => void
}

const AppCameraContext = createContext<AppCameraContext>()
export const AppCameraProvider: Component<Context> = (props) => {
    const defaultState: AppStoreCamera = {
        cameras: [],
        selectedCamera: {
            status: CameraStatus.NONE,
            type: CameraType.NONE,
            address: ' ',
            activeCameraSection: ' ',
            ws: {},
        },
    }

    const [state, setState] = createStore<AppStoreCamera>(defaultState)

    const setAddCamera = (camera: Camera) => {
        setState(
            produce((s) => {
                s.cameras.push(camera)
            }),
        )
    }
    const setAddCameraMDNS = (address: string) => {
        setState(
            produce((s) => {
                s.cameras.push({
                    status: CameraStatus.LOADING,
                    type: CameraType.WIRELESS,
                    address,
                    activeCameraSection: '',
                    ws: {},
                })
            }),
        )
    }
    const setRemoveCamera = (camera: Camera) => {
        setState(
            produce((s) => {
                s.cameras = s.cameras.filter(
                    (c: { address: string }) => c.address !== camera.address,
                )
            }),
        )
    }
    const setCameraStatus = (camera: Camera, status: CameraStatus) => {
        setState(
            produce((s) => {
                s.cameras = s.cameras.filter(
                    (c: { address: string }) => c.address !== camera.address,
                )
                s.cameras.push({ ...camera, status })
            }),
        )
    }

    const setCameraWS = (camera: Camera, ws: object) => {
        setState(
            produce((s) => {
                s.cameras = s.cameras.filter(
                    (c: { address: string }) => c.address !== camera.address,
                )
                s.cameras.push({ ...camera, ws })
            }),
        )
    }

    const setSelectedCamera = (camera: Camera) => {
        setState(
            produce((s) => {
                s.selectedCamera = camera
            }),
        )
    }

    const resetSelectedCamera = () => {
        setState(
            produce((s) => {
                s.selectedCamera = defaultState.selectedCamera
            }),
        )
    }

    const cameraState = createMemo(() => state)

    const getCameras = createMemo(() => cameraState().cameras)
    const getCameraAddresses = createMemo(() => cameraState().cameras.map(({ address }) => address))
    const getCameraStatus = createMemo(() => cameraState().cameras.map(({ status }) => status))
    const getSelectedCamera = createMemo(() => cameraState().selectedCamera)
    const getSelectedCameraAddress = createMemo(() => cameraState().selectedCamera.address)
    const getSelectedCameraStatus = createMemo(() => cameraState().selectedCamera.status)
    const getSelectedCameraType = createMemo(() => cameraState().selectedCamera.type)
    const getSelectedCameraSection = createMemo(
        () => cameraState().selectedCamera.activeCameraSection,
    )
    const getSelectedCameraSocket = createMemo(() => cameraState().selectedCamera.ws)

    return (
        <AppCameraContext.Provider
            value={{
                getCameras,
                getCameraAddresses,
                getCameraStatus,
                getSelectedCamera,
                getSelectedCameraAddress,
                getSelectedCameraStatus,
                getSelectedCameraType,
                getSelectedCameraSection,
                getSelectedCameraSocket,
                setAddCamera,
                setAddCameraMDNS,
                setRemoveCamera,
                setCameraStatus,
                setCameraWS,
                setSelectedCamera,
                resetSelectedCamera,
            }}>
            {props.children}
        </AppCameraContext.Provider>
    )
}

export const useAppCameraContext = () => {
    const context = useContext(AppCameraContext)
    if (context === undefined) {
        throw new Error('useAppCameraContext must be used within an AppNotificationProvider')
    }
    return context
}
