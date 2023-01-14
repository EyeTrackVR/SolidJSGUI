import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum loaderType {
    MDNS_CONNECTING = 'MDNS_CONNECTING',
    REST_CLIENT = 'REST_CLIENT',
}

interface IUiStore {
    loader: { [key in loaderType]: boolean }
    connecting: boolean
    openModal: boolean
}

export const defaultState = {
    loader: { [loaderType.MDNS_CONNECTING]: false, [loaderType.REST_CLIENT]: false },
    connecting: false,
    openModal: false,
}

const [state, setState] = createStore<IUiStore>(defaultState)

export const setConnecting = (connecting: boolean) => {
    setState(
        produce((s) => {
            s.connecting = connecting
        })
    )
}

export const setOpenModal = (openModal: boolean) => {
    setState(
        produce((s) => {
            s.openModal = openModal
        })
    )
}

export const uiState = createMemo(() => state)
