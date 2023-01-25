import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum RESTStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
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
    type: RESTType
    data: object
}

export const defaultState = {
    status: RESTStatus.DISABLED,
    type: RESTType.GET,
    data: {},
}

export const endpointsMap = new Map<string, IEndpoint>(
    [
        ['ping', { url: '/ping', type: RESTType.GET }],
        ['save', { url: '/save', type: RESTType.GET }],
        ['resetConfig', { url: '/resetConfig', type: RESTType.GET }],
        ['rebootDevice', { url: '/rebootDevice', type: RESTType.GET }],
        ['restartCamera', { url: '/restartCamera', type: RESTType.GET }]
    ]
)

const [state, setState] = createStore<IRest>(defaultState)

export const setRestStatus = (status: RESTStatus) => {
    setState(
        produce((s) => {
            s.status = status
        })
    )
}

export const restState = createMemo(() => state)
