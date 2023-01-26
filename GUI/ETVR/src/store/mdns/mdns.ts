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

interface IMdnsStore {
    connectedUser: string
    restClient: string
    camerasMap: ICameraComponents
}

interface ICameraComponents {
    [key: string]: ICamera
}

/* TEMPORARY - REMOVE WHEN NOT NEEDED */
/* const staticCamerasGenerator = new Array(5).fill(0).map(() => ({
    status: CameraStatus.LOADING,
    type: CameraType.WIRELESS,
    address: `${Math.floor(Math.random() * 255)}`,
    activeCameraSection: 'Left Eye',
})) */

const tempCameraComponents: ICameraComponents = {
    '192.168.0.204': {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.204',
        activeCameraSection: 'Left Eye',
    },
    '192.168.0.232': {
        status: CameraStatus.LOADING,
        type: CameraType.WIRELESS,
        address: '192.168.0.232',
        activeCameraSection: 'Left Eye',
    },

}

export const defaultState: IMdnsStore = {
    connectedUser: '',
    restClient: '',
    camerasMap: tempCameraComponents
}

const [state, setState] = createStore<IMdnsStore>(defaultState)

export const setConnectedUser = (userName: string) => {
    setState(
        produce((s) => {
            s.connectedUser = userName
        })
    )
}

export const setAddCamera = (camera: ICamera) => {
    setState(
        produce((s) => {
            s.camerasMap[camera.address] = camera
        })
    )
}

export const setRemoveCamera = (cameraAddress: string) => {
    setState(
        produce((s) => {
            delete s.camerasMap[cameraAddress]
        })
    )
}

export const mdnsState = createMemo(() => state)
