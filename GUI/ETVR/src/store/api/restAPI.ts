import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum RESTStatus {
    ACTIVE = 'ACTIVE',
    COMPLETE = 'COMPLETE',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
    NO_CAMERA = 'NO_CAMERA',
    NO_CONFIG = 'NO_CONFIG',
}

export enum RESTType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IEndpoint {
    url: string
    type: RESTType
}

export interface IRest {
    status: RESTStatus
    device: string
    response: object
}

export const defaultState: IRest = {
    status: RESTStatus.COMPLETE,
    device: '',
    response: {},
}

export const endpointsMap: Map<string, IEndpoint> = new Map<string, IEndpoint>([
    ['ping', { url: ':81/control/command/ping', type: RESTType.GET }],
    ['save', { url: ':81/control/command/save', type: RESTType.GET }],
    ['resetConfig', { url: ':81/control/command/resetConfig', type: RESTType.GET }],
    ['rebootDevice', { url: ':81/control/command/rebootDevice', type: RESTType.GET }],
    ['restartCamera', { url: ':81/control/command/restartCamera', type: RESTType.GET }],
    ['getStoredConfig', { url: ':81/control/command/getStoredConfig', type: RESTType.GET }],
    ['setTxPower', { url: ':81/control/command/setTxPower', type: RESTType.POST }],
    ['setDevice', { url: ':81/control/command/setDevice', type: RESTType.POST }],
    ['wifi', { url: ':81/control/command/wifi', type: RESTType.POST }],
    ['wifiStrength', { url: ':81/control/command/wifiStrength', type: RESTType.POST }],
    ['ota', { url: ':81/update', type: RESTType.POST }],
])

const [state, setState] = createStore<IRest>(defaultState)

export const setRestStatus = (status: RESTStatus) => {
    setState(
        produce((s) => {
            s.status = status
        }),
    )
}
export const setRestDevice = (device: string) => {
    setState(
        produce((s) => {
            s.device = device
        }),
    )
}
export const setRestResponse = (response: object) => {
    setState(
        produce((s) => {
            s.response = response
        }),
    )
}
export const restState = createMemo(() => state)
