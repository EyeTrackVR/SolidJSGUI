import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { RESTStatus } from './restAPI'

export interface IGHAsset {
    name: string
    url: string
}

export interface IGHRest {
    status: RESTStatus
    assets: IGHAsset[]
    version: string
}

export const ghEndpoint = 'https://api.github.com/repos/lorow/OpenIris/releases/latest'

export const defaultState: IGHRest = {
    status: RESTStatus.COMPLETE,
    assets: [],
    version: '',
}

const [state, setState] = createStore<IGHRest>(defaultState)

export const setGHRestStatus = (status: RESTStatus) => {
    setState(
        produce((s) => {
            s.status = status
        }),
    )
}
export const setFirmwareAssets = (assets: IGHAsset) => {
    setState(
        produce((s) => {
            s.assets.push(assets)
        }),
    )
}
export const setFirmwareVersion = (version: string) => {
    setState(
        produce((s) => {
            s.version = version
        }),
    )
}
export const ghRestState = createMemo(() => state)
