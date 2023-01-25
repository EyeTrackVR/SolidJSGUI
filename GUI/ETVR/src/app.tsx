import { ColorModeScript, HopeProvider, injectCriticalStyle } from '@hope-ui/core'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { onMount, Suspense } from 'solid-js'
import AppRoutes from './routes/Routes'
import NewWindow from '@components/NewWindow'

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
    document.documentElement.style.setProperty('--window-opacity', '0')
    document.addEventListener('DOMContentLoaded', () => {
        invoke('get_user')
            .then((config) => {
                console.log(config)
                localStorage.setItem('settings', JSON.stringify(config))
            })
            .catch((e) => console.error(e))
        setTimeout(() => invoke('close_splashscreen'), 500)
    })
}

const Button = () => {
    return (
        <button
            onClick={() => {
                console.log('clicked')
            }}>
            Test
        </button>
    )
}

const app = () => {
    const ref = document.getElementById('titlebar')
    injectCriticalStyle()
    onMount(() => {
        handleTitlebar()
        handleAppBoot()
    })
    return (
        <div class="App overflow-y-auto">
            <ColorModeScript />
            <HopeProvider>
                <Suspense>
                    <AppRoutes />
                    <NewWindow ref={ref} children={Button()} />
                </Suspense>
            </HopeProvider>
        </div>
    )
}

export default app
