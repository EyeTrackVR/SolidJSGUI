import { createContext, useContext, createMemo, type Component, Accessor } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { AppAPIProvider } from '../api'
import { AppCameraProvider } from '../camera'
import { AppMdnsProvider } from '../mdns'
import { AppNotificationProvider } from '../notifications'
import { AppUIProvider } from '../ui'
import type { Context, DebugMode } from '@static/types'
import type { AppStore } from '@static/types/interfaces'

interface AppContext {
    getDebugMode: Accessor<DebugMode>
    getEnableMDNS: Accessor<boolean>
    getScanForCamerasOnStartup: Accessor<boolean>
    getStopAlgoBackend: Accessor<boolean>
    setEnableMDNS: (flag: boolean | undefined) => void
    setDebugMode: (mode: DebugMode) => void
    setScanForCamerasOnStartup: (flag: boolean | undefined) => void
    setStopAlgoBackend: (flag: boolean) => void
}

const AppContext = createContext<AppContext>()
export const AppProvider: Component<Context> = (props) => {
    const defaultState: AppStore = {
        debugMode: 'off',
        enableMDNS: true,
        scanForCamerasOnStartup: true,
        stopAlgoBackend: false,
    }

    const [state, setState] = createStore<AppStore>(defaultState)

    const setDebugMode = (mode: DebugMode) => {
        setState(
            produce((s) => {
                s.debugMode = mode
            }),
        )
    }

    const setEnableMDNS = (flag: boolean | undefined) => {
        setState(
            produce((s) => {
                s.enableMDNS = flag || false
            }),
        )
    }

    const setScanForCamerasOnStartup = (flag: boolean | undefined) => {
        setState(
            produce((s) => {
                s.scanForCamerasOnStartup = flag || false
            }),
        )
    }

    const setStopAlgoBackend = (flag: boolean) => {
        setState(
            produce((s) => {
                s.stopAlgoBackend = flag
            }),
        )
    }

    const appState = createMemo(() => state)
    const getDebugMode = createMemo(() => appState().debugMode)
    const getEnableMDNS = createMemo(() => appState().enableMDNS)
    const getScanForCamerasOnStartup = createMemo(() => appState().scanForCamerasOnStartup)
    const getStopAlgoBackend = createMemo(() => appState().stopAlgoBackend)

    return (
        <AppContext.Provider
            value={{
                getEnableMDNS,
                getDebugMode,
                getScanForCamerasOnStartup,
                getStopAlgoBackend,
                setEnableMDNS,
                setDebugMode,
                setScanForCamerasOnStartup,
                setStopAlgoBackend,
            }}>
            <AppUIProvider>
                <AppNotificationProvider>
                    <AppCameraProvider>
                        <AppAPIProvider>
                            <AppMdnsProvider>{props.children}</AppMdnsProvider>
                        </AppAPIProvider>
                    </AppCameraProvider>
                </AppNotificationProvider>
            </AppUIProvider>
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}
