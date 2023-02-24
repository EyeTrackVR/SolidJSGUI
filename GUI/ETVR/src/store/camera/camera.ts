import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum CameraStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
}

export enum CameraType {
    WIRELESS = 'WIRELESS',
}

export interface ICamera {
    status: CameraStatus
    type: CameraType
    address: string
    activeCameraSection: string
}

const tempCameraComponents: ICamera[] = [
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.204',
        activeCameraSection: 'Left Eye',
    },
    {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.232',
        activeCameraSection: 'Right Eye',
    },
    {
        status: CameraStatus.FAILED,
        type: CameraType.WIRELESS,
        address: '192.168.0.234',
        activeCameraSection: 'Right Eye',
    },
]

interface ICameraStore {
    cameras: ICamera[]
}

export const defaultState: ICameraStore = {
    cameras: tempCameraComponents,
}

const [state, setState] = createStore<ICameraStore>(defaultState)

export const setAddCamera = (camera: ICamera) => {
    setState(
        produce((s) => {
            s.cameras.push(camera)
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

export const cameraState = createMemo(() => state)
