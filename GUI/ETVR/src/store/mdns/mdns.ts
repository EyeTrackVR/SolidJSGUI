import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

interface IMdnsStore {
    connectedUser: string
    restClient: string
}

export const defaultState = {
    connectedUser: '',
    restClient: '',
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
