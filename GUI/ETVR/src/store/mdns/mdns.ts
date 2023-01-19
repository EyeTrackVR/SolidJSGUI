import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum CameraStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
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
    cameras: ICamera[]
}

const staticCamerasGenerator = new Array(10).fill(0).map(() => ({
    status: CameraStatus.ACTIVE,
    type: CameraType.WIRELESS,
    address: '192.168.0.204',
    activeCameraSection: 'left eye',
}))

export const defaultState = {
    connectedUser: '',
    restClient: '',
    cameras: staticCamerasGenerator,
}

const [state, setState] = createStore<IMdnsStore>(defaultState)

export const setConnectedUser = (userName: string) => {
    setState(
        produce((s) => {
            s.connectedUser = userName
        })
    )
}

export const mdnsState = createMemo(() => state)
