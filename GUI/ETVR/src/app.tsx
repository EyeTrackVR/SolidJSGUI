import { Button } from '@kobalte/core'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { onMount, Suspense, lazy } from 'solid-js'
import { generateWebsocketClients } from '@store/api/components/actions'
import { setWebsocketClients } from '@store/api/websocket'

const AppRoutes = lazy(() => import('@routes/Routes'))
const CameraSettingsModal = lazy(() => import('@components/Camera/CameraSettingsModal'))
const ModalMenu = lazy(() => import('@components/Modal'))
const NewWindow = lazy(() => import('@components/NewWindow'))
const ToastNotificationWindow = lazy(() => import('@components/Notifications'))

const handleTitlebar = () => {
    const titlebar = document.getElementsByClassName('titlebar')
    if (titlebar) {
        document
            .getElementById('titlebar-minimize')
            ?.addEventListener('click', () => appWindow.minimize())
        document
            .getElementById('titlebar-maximize')
            ?.addEventListener('click', () => appWindow.toggleMaximize())
        document
            .getElementById('titlebar-close')
            ?.addEventListener('click', () => appWindow.close())
    }
}

const handleAppBoot = () => {
    document.addEventListener('DOMContentLoaded', () => {
        invoke('get_user')
            .then((config) => {
                console.log(config)
                localStorage.setItem('settings', JSON.stringify(config))
            })
            .catch((e) => console.error(e))
        setTimeout(() => invoke('close_splashscreen'), 500)
    })

    // TODO: call these after the MDNS service is up and running and discoveres the camera's
    const clients = generateWebsocketClients()
    setWebsocketClients(clients)
}

const Menu = () => {
    return (
        <div>
            <h1 class="text-lg">Sub Menu</h1>
            <hr class="divider" />
            <label class="context-menu-labels" for="test-button">
                Test Button
            </label>
            <Button.Root
                id="test-button"
                onClick={() => {
                    console.log('clicked')
                }}>
                Test
            </Button.Root>
            <hr class="divider" />
        </div>
    )
}

const App = () => {
    const ref = document.getElementById('titlebar')
    onMount(() => {
        handleTitlebar()
        handleAppBoot()
    })
    return (
        <div class="App overflow-y-auto items-center">
            <Suspense>
                <AppRoutes />
                <NewWindow ref={ref} name="test">
                    <Menu />
                </NewWindow>
                <ModalMenu>
                    <CameraSettingsModal />
                </ModalMenu>
                <ToastNotificationWindow />
            </Suspense>
        </div>
    )
}

export default App
