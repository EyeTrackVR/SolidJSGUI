import { useRoutes } from '@solidjs/router'
import { createEffect, onMount } from 'solid-js'
import { useEventListener } from 'solidjs-use'
import { routes } from '.'
import type { PersistentSettings } from '@src/static/types'
import Header from '@components/Header'
import { ENotificationAction } from '@src/static/types/enums'
import { useAppAPIContext } from '@src/store/context/api'
import { useAppContext } from '@src/store/context/app'
import { useAppNotificationsContext } from '@src/store/context/notifications'
import { usePersistentStore } from '@src/store/tauriStore'
import { connectedUserName, hideHeaderButtons } from '@src/store/ui/selectors'
import { setConnectedUser, setHideHeaderButtons } from '@src/store/ui/ui'
import { useMDNSScanner } from '@src/utils/hooks/api/useMDNSScanner'
import { generateWebsocketClients } from '@src/utils/hooks/websocket'

const AppRoutes = () => {
    const Path = useRoutes(routes)
    const { get, set } = usePersistentStore()

    const { doGHRequest } = useAppAPIContext()

    const { setEnableMDNS, setScanForCamerasOnStartup, getEnableMDNS, getScanForCamerasOnStartup } =
        useAppContext()

    const {
        setEnableNotifications,
        setEnableNotificationsSounds,
        setGlobalNotificationsType,
        getEnableNotificationsSounds,
        getEnableNotifications,
        getGlobalNotificationsType,
        checkPermission,
    } = useAppNotificationsContext()

    onMount(() => {
        // load the app settings from the persistent store and assign to the global state

        get('settings').then((settings) => {
            if (settings) {
                console.log('loading settings')
                const activeUserName =
                    typeof settings.user === 'string' ? settings.user : 'stranger'

                setConnectedUser(activeUserName)
                setEnableNotifications(settings.enableNotifications)
                setEnableNotificationsSounds(settings.enableNotificationsSounds)
                setGlobalNotificationsType(
                    settings.globalNotificationsType ?? ENotificationAction.APP,
                )

                setEnableMDNS(settings.enableMDNS)
                setScanForCamerasOnStartup(settings.scanForCamerasOnStartup)
            }
        })

        useMDNSScanner('_openiristracker._tcp', 5).then(() => {
            // TODO: pass the mdns res object to the Python backend - then start the websocket clients after the backend is ready
            // passMdnsResToPythonBackend().then(() => {
            generateWebsocketClients()
            //})
        })

        // TODO: check notif perms and request GH data
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
                debugMode: 'info',
                scanForCamerasOnStartup: getScanForCamerasOnStartup(),
            }
            console.log('saving settings', settings)
            set('settings', settings)
        })
    })

    return (
        <main class="pb-[5rem] w-[100%] px-8 max-w-[1920px]">
            <div class="header-wrapper">
                <Header
                    name={connectedUserName() ? `Welcome ${connectedUserName()}` : 'Welcome!'}
                    hideButtons={hideHeaderButtons()}
                    onClick={() => {
                        setHideHeaderButtons(false)
                    }}
                />
            </div>
            <div class="pt-[70px]">
                <Path />
            </div>
        </main>
    )
}

export default AppRoutes
