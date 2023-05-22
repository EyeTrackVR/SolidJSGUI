import { useLocation, useNavigate, useRoutes } from '@solidjs/router'
import { createEffect, onMount, type Component, createSignal } from 'solid-js'
import { useEventListener } from 'solidjs-use'
import { debug } from 'tauri-plugin-log-api'
import { routes } from '.'
import type { PersistentSettings } from '@src/static/types'
import Header from '@components/Header'
import { ENotificationAction } from '@src/static/types/enums'
import { useAppAPIContext } from '@src/store/context/api'
import { useAppContext } from '@src/store/context/app'
import { useAppCameraContext } from '@src/store/context/camera'
import { useAppMDNSContext } from '@src/store/context/mdns'
import { useAppNotificationsContext } from '@src/store/context/notifications'
import { useAppUIContext } from '@src/store/context/ui'
import { usePersistentStore } from '@src/store/tauriStore'
import { generateWebsocketClients } from '@src/utils/hooks/websocket'

const AppRoutes: Component = () => {
    const [userIsInSettings, setUserIsInSettings] = createSignal(false)
    const params = useLocation()

    const Path = useRoutes(routes)
    const { get, set } = usePersistentStore()
    const { doGHRequest } = useAppAPIContext()
    const { useMDNSScanner } = useAppMDNSContext()
    const { setCameraWS, setCameraStatus, getCameras } = useAppCameraContext()
    const navigate = useNavigate()

    const {
        setEnableMDNS,
        setDebugMode,
        setScanForCamerasOnStartup,
        getEnableMDNS,
        getScanForCamerasOnStartup,
        getDebugMode,
    } = useAppContext()
    const {
        setEnableNotifications,
        setEnableNotificationsSounds,
        setGlobalNotificationsType,
        getEnableNotificationsSounds,
        getEnableNotifications,
        getGlobalNotificationsType,
        checkPermission,
        addNotification,
    } = useAppNotificationsContext()
    const { connectedUserName, setConnectedUser } = useAppUIContext()

    onMount(() => {
        // load the app settings from the persistent store and assign to the global state
        get('settings').then((settings) => {
            if (settings) {
                debug('loading settings')
                const activeUserName =
                    typeof settings.user === 'string' ? settings.user : 'stranger'

                setConnectedUser(activeUserName)
                setEnableNotifications(settings.enableNotifications)
                setEnableNotificationsSounds(settings.enableNotificationsSounds)
                setGlobalNotificationsType(
                    settings.globalNotificationsType ?? ENotificationAction.APP,
                )

                setEnableMDNS(settings.enableMDNS)
                setDebugMode(settings.debugMode)
                setScanForCamerasOnStartup(settings.scanForCamerasOnStartup)
            }
        })
        useMDNSScanner('_openiristracker._tcp', 5).then(() => {
            // TODO: pass the mdns res object to the Python backend - then start the websocket clients after the backend is ready
            // passMdnsResToPythonBackend().then(() => {
            generateWebsocketClients(getCameras, addNotification, setCameraWS, setCameraStatus)
            //})
        })
        checkPermission()
        doGHRequest()
    })

    createEffect(() => {
        useEventListener(window, 'blur', () => {
            // save the app settings to the persistent store
            const settings: PersistentSettings = {
                user: connectedUserName(),
                enableNotifications: getEnableNotifications(),
                enableNotificationsSounds: getEnableNotificationsSounds(),
                globalNotificationsType: getGlobalNotificationsType(),
                enableMDNS: getEnableMDNS(),
                debugMode: getDebugMode(),
                scanForCamerasOnStartup: getScanForCamerasOnStartup(),
            }
            debug(`[Routes]: Saving Settings - ${JSON.stringify(settings)}`)
            set('settings', settings)
        })
    })

    createEffect(() => {
        setUserIsInSettings(params.pathname.match('settings') !== null)
    })

    return (
        <main class="pb-[5rem] w-[100%] px-8 max-w-[1920px]">
            <div class="header-wrapper">
                <Header
                    hideButtons={userIsInSettings()}
                    name={connectedUserName() ? `Welcome ${connectedUserName()}` : 'Welcome!'}
                    onClick={() => navigate('/')}
                />
            </div>
            <div class="pt-[70px]">
                <Path />
            </div>
        </main>
    )
}

export default AppRoutes
