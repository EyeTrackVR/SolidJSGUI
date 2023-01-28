import { ToasterStore } from 'solid-headless'
import { createMemo, JSXElement } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export enum loaderType {
    MDNS_CONNECTING = 'MDNS_CONNECTING',
    REST_CLIENT = 'REST_CLIENT',
}

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

interface IUiStore {
    loader?: { [key in loaderType]: boolean }
    connecting?: boolean
    openModal?: boolean
    menuOpen?: IMenuOpen | null
    connectedUser: string
    notifications?: ToasterStore<string>
}

export const defaultState = {
    loader: { [loaderType.MDNS_CONNECTING]: false, [loaderType.REST_CLIENT]: false },
    connecting: false,
    openModal: false,
    menuOpen: null,
    connectedUser: '',
    notifications: new ToasterStore<string>(),
}

const [state, setState] = createStore<IUiStore>(defaultState)

/* New Window State Handler */
export const setMenu = (menuOpen: IMenuOpen | null) => {
    setState(
        produce((s) => {
            s.menuOpen = menuOpen || null
        }),
    )
}

/* Loader State Handler */
export const setConnecting = (connecting: boolean) => {
    setState(
        produce((s) => {
            s.connecting = connecting
        }),
    )
}

/* Modal State Handler */
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

// notification simple - using the browser notification API
export const notify = (title: string, body: string | undefined) => {
    new Notification(title, { body: body || '' })
}

// notification using the custom notification component
export const addNotification = (message: string) => {
    setState(
        produce((s) => {
            s.notifications?.create(message)
        }),
    )
}

export const uiState = createMemo(() => state)
