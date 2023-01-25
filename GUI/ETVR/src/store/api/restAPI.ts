import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum RESTStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
}

export interface IRest {
    status: RESTStatus
    type: RESTType
    endpoints: IEndpoint[]
    data: object
}

export const defaultState = {
    status: RESTStatus.DISABLED,
    type: RESTType.GET,
    endpoints: [],
    data: {},
}

const [state, setState] = createStore<IRest>(defaultState)

export const setRestStatus = (status: RESTStatus) => {
    setState(
        produce((s) => {
            s.status = status
        })
    )
}

export const restState = createMemo(() => state)