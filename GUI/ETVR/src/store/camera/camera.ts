import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { mdnsData } from '@store/mdns/selectors'

export enum CameraStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
    NONE = 'NONE',
}

export enum CameraType {
    WIRELESS = 'WIRELESS',
    NONE = 'NONE',
}

export interface ICamera {
    status: CameraStatus
    type: CameraType
    address: string
    activeCameraSection: string
    ws: object
}

const tempCameraComponents: ICamera[] = [
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.204',
        activeCameraSection: 'Left Eye',
        ws: {},
    },
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.232',
        activeCameraSection: 'Right Eye',
        ws: {},
    },
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.234',
        activeCameraSection: 'Right Eye',
        ws: {},
    },
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.204',
        activeCameraSection: 'Left Eye',
        ws: {},
    },
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.232',
        activeCameraSection: 'Right Eye',
        ws: {},
    },
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.234',
        activeCameraSection: 'Right Eye',
        ws: {},
    },
]

interface ICameraStore {
    cameras: ICamera[]
    selectedCamera: ICamera
}

export const defaultState: ICameraStore = {
    cameras: [],
    selectedCamera: {
        status: CameraStatus.NONE,
        type: CameraType.NONE,
        address: ' ',
        activeCameraSection: ' ',
        ws: {},
    },
}

const [state, setState] = createStore<ICameraStore>(defaultState)

export const setAddCamera = (camera: ICamera) => {
    setState(
        produce((s) => {
            s.cameras.push(camera)
        }),
    )
}
export const setAddCameraMDNS = (address: string) => {
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
export const setRemoveCamera = (camera: ICamera) => {
    setState(
        produce((s) => {
            s.cameras = s.cameras.filter((c: { address: string }) => c.address !== camera.address)
        }),
    )
}
export const setCameraStatus = (camera: ICamera, status: CameraStatus) => {
    setState(
        produce((s) => {
            s.cameras = s.cameras.filter((c: { address: string }) => c.address !== camera.address)
            s.cameras.push({ ...camera, status })
        }),
    )
}

export const setCameraWS = (camera: ICamera, ws: object) => {
    setState(
        produce((s) => {
            s.cameras = s.cameras.filter((c: { address: string }) => c.address !== camera.address)
            s.cameras.push({ ...camera, ws })
        }),
    )
}

export const setSelectedCamera = (camera: ICamera) => {
    setState(
        produce((s) => {
            s.selectedCamera = camera
        }),
    )
}

export const resetSelectedCamera = () => {
    setState(
        produce((s) => {
            s.selectedCamera = defaultState.selectedCamera
        }),
    )
}

export const cameraState = createMemo(() => state)
