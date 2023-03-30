import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum MdnsStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
}

interface IMdnsResponse {
    ips: string[]
    urls: string[]
}

interface IMdnsStore {
    mdnsStatus: MdnsStatus
    mdnsData: IMdnsResponse
}

export const defaultState: IMdnsStore = {
    mdnsStatus: MdnsStatus.DISABLED,
    mdnsData: {
        ips: [],
        urls: [],
    },
}

const [state, setState] = createStore<IMdnsStore>(defaultState)

export const setMdnsStatus = (status: MdnsStatus) => {
    setState(
        produce((s) => {
            s.mdnsStatus = status
        }),
    )
}

export const setMdnsData = (data: IMdnsResponse) => {
    setState(
        produce((s) => {
            s.mdnsData = data
        }),
    )
}

export const mdnsState = createMemo(() => state)
