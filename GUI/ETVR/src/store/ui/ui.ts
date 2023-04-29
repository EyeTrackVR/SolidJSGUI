import { createMemo, JSXElement } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { loaderType } from '@static/types/enums'

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
    showCameraView?: boolean
    connectedUser: string
    showNotifications?: boolean
    hideHeaderButtons: boolean
}

export const defaultState = {
    loader: { [loaderType.MDNS_CONNECTING]: false, [loaderType.REST_CLIENT]: false },
    connecting: false,
    openModal: false,
    menuOpen: null,
    connectedUser: '',
    showCameraView: false,
    showNotifications: true,
    hideHeaderButtons: false,
}

const [state, setState] = createStore<IUiStore>(defaultState)

export const setMenu = (menuOpen: IMenuOpen | null) => {
    setState(
        produce((s) => {
            s.menuOpen = menuOpen || null
        }),
    )
}

export const setHideHeaderButtons = (flag: boolean) => {
    setState(
        produce((s) => {
            s.hideHeaderButtons = flag
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

export const setLoader = (type: loaderType, value: boolean) => {
    setState(
        produce((s) => {
            if (s.loader) s.loader[type] = value
        }),
    )
}

export const setShowCameraView = (showCameraView: boolean) => {
    setState(
        produce((s) => {
            s.showCameraView = showCameraView
        }),
    )
}

export const uiState = createMemo(() => state)
