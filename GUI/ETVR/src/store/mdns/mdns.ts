import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum MdnsStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
}

interface IMdnsStore {
    mdnsStatus: MdnsStatus
}

export const defaultState: IMdnsStore = {
    mdnsStatus: MdnsStatus.DISABLED,
}

const [state, setState] = createStore<IMdnsStore>(defaultState)

export const setMdnsStatus = (status: MdnsStatus) => {
    setState(
        produce((s) => {
            s.mdnsStatus = status
        }),
    )
}

export const mdnsState = createMemo(() => state)
