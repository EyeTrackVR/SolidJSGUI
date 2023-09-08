import { useLocation, useNavigate, useRoutes } from '@solidjs/router'
import { getClient, Body, ResponseType } from '@tauri-apps/api/http'
import { isEqual } from 'lodash'
import { createEffect, onMount, type Component, createSignal } from 'solid-js'
import { useEventListener, useInterval } from 'solidjs-use'
import { debug } from 'tauri-plugin-log-api'
import { routes } from '.'
import type { BackendConfig, PersistentSettings } from '@src/static/types'
import Header from '@components/Header'
import { ENotificationAction, ENotificationType } from '@src/static/types/enums'
import { useAppAPIContext } from '@src/store/context/api'
import { useAppContext } from '@src/store/context/app'
import { useAppCameraContext } from '@src/store/context/camera'
import { useAppMDNSContext } from '@src/store/context/mdns'
import { useAppNotificationsContext } from '@src/store/context/notifications'
import { useAppUIContext } from '@src/store/context/ui'
import { usePersistentStore } from '@src/store/tauriStore'
import { generateWebsocketClients } from '@src/utils/hooks/websocket'
import { MdnsResponse } from '@static/types/interfaces'

const AppRoutes: Component = () => {
    const [userIsInSettings, setUserIsInSettings] = createSignal(false)
    const params = useLocation()

    const Path = useRoutes(routes)
    const { get, set } = usePersistentStore()
    const { doGHRequest, useRequestHook, getEndpoint } = useAppAPIContext()
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
        //* load the app settings from the persistent store and assign to the global state
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
        //* Check notification permissions
        checkPermission()
        //* Grab the github release info for OpenIris
        doGHRequest()
        //* Scan for cameras on startup and run backend server
        useMDNSScanner('_openiristracker._tcp', 5).then(async (mdnsRes) => {
            // TODO: pass the mdns res object to the Python backend - then start the websocket clients after the backend is ready
            const backEndRes = await useRequestHook('start')
            debug(`[Routes]: REST Response - ${JSON.stringify(backEndRes)}`)
            if (mdnsRes) {
                if (mdnsRes['error']) {
                    addNotification({
                        title: 'Camera Not Found',
                        message: `No Cameras found: ${mdnsRes['error']}`,
                        type: ENotificationType.ERROR,
                    })
                    return
                }

                const mdnsResponse = mdnsRes as MdnsResponse
                mdnsResponse.ips.forEach((ip) => {
                    addNotification({
                        title: 'Camera Found',
                        message: `Camera found at ${ip}`,
                        type: ENotificationType.SUCCESS,
                    })
                })
            }

            //* pass the mdns res object to the Python backend - then start the websocket clients
            const client = await getClient()

            if (getEndpoint) {
                const backend_body: BackendConfig = {
                    left_eye: {
                        capture_source: 'http://localhost:8080',
                    },
                    right_eye: {
                        capture_source: 'http://localhost:8081',
                    },
                }

                const endpoint: string = 'http://localhost' + getEndpoint('configEdit')?.url ?? ''
                const response = await client.post(endpoint, Body.json(backend_body), {
                    responseType: ResponseType.JSON,
                })

                debug(`[Routes]: Backend Config Response - ${JSON.stringify(response)}`)

                if (response?.status === 200) {
                    debug('[Routes]: Update Camera Capture Source Success')
                    debug('[Routes]: Starting Websocket Clients')
                    generateWebsocketClients(
                        getCameras,
                        addNotification,
                        setCameraWS,
                        setCameraStatus,
                    )
                }
            }
        })
    })

    const createSettingsObject = () => {
        const settings: PersistentSettings = {
            user: connectedUserName(),
            enableNotifications: getEnableNotifications(),
            enableNotificationsSounds: getEnableNotificationsSounds(),
            globalNotificationsType: getGlobalNotificationsType(),
            enableMDNS: getEnableMDNS(),
            debugMode: getDebugMode(),
            scanForCamerasOnStartup: getScanForCamerasOnStartup(),
        }
        return settings
    }

    const handleSaveSettings = async () => {
        // check if the settings have changed and save to the store if they have
        get('settings').then((storedSettings) => {
            if (!isEqual(storedSettings, createSettingsObject())) {
                debug(`[Routes]: Saving Settings - ${JSON.stringify(createSettingsObject())}`)
                set('settings', createSettingsObject())
            }
        })
    }

    createEffect(() => {
        const { resume, pause } = useInterval(30000, {
            controls: true,
            callback: handleSaveSettings,
        })

        useEventListener(window, 'blur', () => {
            pause()
            debug(`[Routes]: Saving Settings - ${JSON.stringify(createSettingsObject())}`)
            set('settings', createSettingsObject())
            resume()
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
