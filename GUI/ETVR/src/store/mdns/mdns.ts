import { ReactiveMap } from '@solid-primitives/map'
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
    camerasMap: ReactiveMap<string, ICamera>
}

const staticCamerasGenerator = new Array(5).fill(0).map(() => ({
    status: CameraStatus.LOADING,
    type: CameraType.WIRELESS,
    address: `${Math.floor(Math.random() * 255)}`,
    activeCameraSection: 'Left Eye',
}))

export const defaultState = {
    connectedUser: '',
    restClient: '',
    camerasMap: new ReactiveMap<string, ICamera>(
        staticCamerasGenerator.map((c) => [c.address, c])
    ),
}

const [state, setState] = createStore<IMdnsStore>(defaultState)

export const setConnectedUser = (userName: string) => {
    setState(
        produce((s) => {
            s.connectedUser = userName
        })
    )
}

export const addCamera = (camera: ICamera) => {
    setState(
        produce((s) => {
            s.camerasMap.set(camera.address, camera)
        })
    )
}

export const mdnsState = createMemo(() => state)
