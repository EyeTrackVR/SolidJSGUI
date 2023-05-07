import { exit } from '@tauri-apps/api/process'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { createContext, useContext, createMemo, type Component, Accessor } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useEventListener } from 'solidjs-use'
import { attachConsole } from 'tauri-plugin-log-api'
import { AppAPIProvider } from '../api'
import { AppCameraProvider } from '../camera'
import { AppMdnsProvider } from '../mdns'
import { AppNotificationProvider } from '../notifications'
import { AppUIProvider } from '../ui'
import type { Context, DebugMode } from '@static/types'
import type { AppStore } from '@static/types/interfaces'
import type { UnlistenFn } from '@tauri-apps/api/event'
import { usePersistentStore } from '@src/store/tauriStore'
import { ExitCodes } from '@static/types/enums'

interface AppContext {
    getDetachConsole: Accessor<Promise<UnlistenFn>>
    getDebugMode: Accessor<DebugMode>
    getEnableMDNS: Accessor<boolean>
    getScanForCamerasOnStartup: Accessor<boolean>
    getStopAlgoBackend: Accessor<boolean>
    setEnableMDNS: (flag: boolean | undefined) => void
    setDebugMode: (mode: DebugMode | undefined) => void
    setScanForCamerasOnStartup: (flag: boolean | undefined) => void
    setStopAlgoBackend: (flag: boolean) => void
}

const AppContext = createContext<AppContext>()
export const AppProvider: Component<Context> = (props) => {
    const detachConsole = attachConsole()

    //#region Store
    const defaultState: AppStore = {
        debugMode: 'off',
        enableMDNS: true,
        scanForCamerasOnStartup: true,
        stopAlgoBackend: false,
    }

    const [state, setState] = createStore<AppStore>(defaultState)

    const setDebugMode = (mode: DebugMode | undefined) => {
        setState(
            produce((s) => {
                s.debugMode = mode || 'info'
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
    const getDetachConsole = createMemo(() => detachConsole)
    //#endregion

    const handleAppBoot = () => {
        const { set, get } = usePersistentStore()

        useEventListener(document, 'DOMContentLoaded', () => {
            invoke('get_user')
                .then((config) => {
                    const userName = config as string
                    console.log('[App Boot]: Welcome ', userName)
                    get('settings').then((settings) => {
                        if (userName) {
                            set('settings', { user: userName, ...settings })
                        }
                    })
                })
                .catch((e) => console.error(e))

            // check if the window state is saved and restore it if it is

            invoke('handle_save_window_state').then(() => {
                console.log('[App Boot]: saved window state')
            })

            setTimeout(() => invoke('close_splashscreen'), 15000)
        })
    }

    const handleAppExit = async (main = false) => {
        // TODO: call these before the app exits to shutdown gracefully

        await invoke('handle_save_window_state')
        console.log('[App Close]: saved window state')

        if (main) {
            const { save } = usePersistentStore()
            await save()
            // stopMDNS()
            // stopWebsocketClients()
            // saveSettings()
            // stopPythonBackend()
            await exit(ExitCodes.USER_EXIT)
        }

        await appWindow.close()
    }

    const handleTitlebar = (main = false) => {
        const titlebar = document.getElementsByClassName('titlebar')
        if (titlebar) {
            useEventListener(document.getElementById('titlebar-minimize'), 'click', () => {
                appWindow.minimize()
            })
            useEventListener(document.getElementById('titlebar-maximize'), 'click', () => {
                appWindow.toggleMaximize()
            })
            useEventListener(document.getElementById('titlebar-close'), 'click', async () => {
                await handleAppExit(main)
            })
        }
    }

    return (
        <AppContext.Provider
            value={{
                getDetachConsole,
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
