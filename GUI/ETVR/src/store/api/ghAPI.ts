import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { RESTStatus } from './restAPI'

export interface IGHRest {
    status: RESTStatus
    assets: string[]
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
export const setFirmwareAssets = (assets: string[]) => {
    setState(
        produce((s) => {
            s.assets = assets
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
