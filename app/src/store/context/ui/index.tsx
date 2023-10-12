import { Accessor, createContext, createMemo, useContext, type Component } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import type { Context } from '@static/types'
import { MenuOpen, UiStore } from '@src/static/types/interfaces'
import { loaderType } from '@static/types/enums'

interface AppUIContext {
    connectingStatus: Accessor<boolean | undefined>
    loaderStatus: Accessor<Record<loaderType, boolean> | undefined>
    openModalStatus: Accessor<boolean | undefined>
    menuOpenStatus: Accessor<MenuOpen | null | undefined>
    connectedUserName: Accessor<string>
    showCameraView: Accessor<boolean | undefined>
    showNotifications: Accessor<boolean | undefined>
    setMenu: (menuOpen: MenuOpen | null) => void
    setConnecting: (connecting: boolean) => void
    setOpenModal: (openModal: boolean) => void
    setConnectedUser: (userName: string) => void
    setLoader: (type: loaderType, value: boolean) => void
    setShowCameraView: (showCameraView: boolean) => void
}

const AppUIContext = createContext<AppUIContext>()
export const AppUIProvider: Component<Context> = (props) => {
    const defaultState: UiStore = {
        loader: { [loaderType.MDNS_CONNECTING]: false, [loaderType.REST_CLIENT]: false },
        connecting: false,
        openModal: false,
        menuOpen: null,
        connectedUser: '',
        showCameraView: false,
        showNotifications: true,
    }

    const [state, setState] = createStore<UiStore>(defaultState)

    const setMenu = (menuOpen: MenuOpen | null) => {
        setState(
            produce((s) => {
                s.menuOpen = menuOpen || null
            }),
        )
    }

    const setConnecting = (connecting: boolean) => {
        setState(
            produce((s) => {
                s.connecting = connecting
            }),
        )
    }

    const setOpenModal = (openModal: boolean) => {
        setState(
            produce((s) => {
                s.openModal = openModal
            }),
        )
    }

    const setConnectedUser = (userName: string) => {
        setState(
            produce((s) => {
                s.connectedUser = userName
            }),
        )
    }

    const setLoader = (type: loaderType, value: boolean) => {
        setState(
            produce((s) => {
                if (s.loader) s.loader[type] = value
            }),
        )
    }

    const setShowCameraView = (showCameraView: boolean) => {
        setState(
            produce((s) => {
                s.showCameraView = showCameraView
            }),
        )
    }

    const uiState = createMemo(() => state)

    const connectingStatus = createMemo(() => uiState().connecting)
    const loaderStatus = createMemo(() => uiState().loader)
    const openModalStatus = createMemo(() => uiState().openModal)
    const menuOpenStatus = createMemo(() => uiState().menuOpen)
    const connectedUserName = createMemo(() => uiState().connectedUser)
    const showCameraView = createMemo(() => uiState().showCameraView)
    const showNotifications = createMemo(() => uiState().showNotifications)

    return (
        <AppUIContext.Provider
            value={{
                connectingStatus,
                loaderStatus,
                openModalStatus,
                menuOpenStatus,
                connectedUserName,
                showCameraView,
                showNotifications,
                setMenu,
                setConnecting,
                setOpenModal,
                setConnectedUser,
                setLoader,
                setShowCameraView,
            }}>
            {props.children}
        </AppUIContext.Provider>
    )
}

export const useAppUIContext = () => {
    const context = useContext(AppUIContext)
    if (context === undefined) {
        throw new Error('useAppUIContext must be used within an AppUIProvider')
    }
    return context
}
