import { ToasterStore } from 'solid-headless'
import { createMemo, JSXElement } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { loaderType, POPOVER_ID } from '@src/utils/enums'

interface IMenuOpen {
    x: number
    y: number
}

export interface INewMenu {
    children: JSXElement
    ref: HTMLElement | null
    name: string
}

export interface IModalMenu {
    children: JSXElement
    title?: string
    initialFocus?: string
}

export interface IUiStore {
    loader?: { [key in loaderType]: boolean }
    connecting?: boolean
    openModal?: boolean
    menuOpen?: IMenuOpen | null
    connectedUser: string
    notifications?: ToasterStore<string>
    displayMode: POPOVER_ID
}

export const defaultState = {
    loader: { [loaderType.MDNS_CONNECTING]: false, [loaderType.REST_CLIENT]: false },
    connecting: false,
    openModal: false,
    menuOpen: null,
    connectedUser: '',
    notifications: new ToasterStore<string>(),
    displayMode: POPOVER_ID.GRIP,
}

const [state, setState] = createStore<IUiStore>(defaultState)

export const setMenu = (menuOpen: IMenuOpen | null) => {
    setState(
        produce((s) => {
            s.menuOpen = menuOpen || null
        }),
    )
}

export const setConnecting = (connecting: boolean) => {
    setState(
        produce((s) => {
            s.connecting = connecting
        }),
    )
}
export const setDisplayMode = (view: POPOVER_ID) => {
    setState(
        produce((s) => {
            s.displayMode = view
        }),
    )
}

export const setOpenModal = (openModal: boolean) => {
    setState(
        produce((s) => {
            s.openModal = openModal
        }),
    )
}

export const setConnectedUser = (userName: string) => {
    setState(
        produce((s) => {
            s.connectedUser = userName
        }),
    )
}

export const notify = (title: string, body: string | undefined) => {
    new Notification(title, { body: body || '' })
}

export const addNotification = (message: string) => {
    setState(
        produce((s) => {
            s.notifications?.create(message)
        }),
    )
}

export const uiState = createMemo(() => state)
