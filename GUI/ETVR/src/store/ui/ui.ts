import { sendNotification } from '@tauri-apps/api/notification'
import { ToasterStore } from 'solid-headless'
import { createMemo, JSXElement } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { loaderType, POPOVER_ID, ENotificationAction } from '@src/utils/enums'
import { NotificationsType } from '@src/utils/utils'

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
    notifications?: ToasterStore<string>
    displayMode: POPOVER_ID
}

export interface INotificationAction {
    callbackOS(): void
    callbackApp(): void
}

export interface INotifictionMessage {
    title: string
    message: string
}

export const defaultState = {
    loader: { [loaderType.MDNS_CONNECTING]: false, [loaderType.REST_CLIENT]: false },
    connecting: false,
    openModal: false,
    menuOpen: null,
    connectedUser: '',
    showCameraView: false,
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

export const notify = (title: string, body: string | undefined) => {
    new Notification(title, { body: body || '' })
}

export const addNotification = (
    notification: INotifictionMessage,
    actionType: ENotificationAction,
) => {
    setState(
        produce((s) => {
            const { title, message } = notification
            const notificationAction = NotificationsType(actionType, {
                callbackOS: () => {
                    sendNotification({
                        title,
                        body: message,
                    })
                },
                callbackApp: () => {
                    s.notifications?.create(message)
                },
            })
            return notificationAction
        }),
    )
}

export const uiState = createMemo(() => state)
