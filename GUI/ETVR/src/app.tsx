import { Button } from '@kobalte/core'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { onMount, Suspense } from 'solid-js'
import AppRoutes from './routes/Routes'
import ModalMenu from '@components/Modal'
import NewWindow from '@components/NewWindow'
import { setOpenModal } from '@src/store/ui/ui'
import { BUTTON } from '@static/custom/button'

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
}

const Menu = () => {
    return (
        <>
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
        </>
    )
}

const ModalContent = () => {
    return (
        <>
            <div class="mt-2">
                <p class="text-sm text-gray-900 dark:text-gray-50">
                    Your payment has been successfully submitted. We've sent your an email with all
                    of the details of your order.
                </p>
            </div>
            <div class="mt-4">
                <button type="button" class={BUTTON} onClick={() => setOpenModal(false)}>
                    Got it, thanks!
                </button>
            </div>
        </>
    )
}

const App = () => {
    const ref = document.getElementById('titlebar')

    onMount(() => {
        handleTitlebar()
        handleAppBoot()
    })
    return (
        <div class="App overflow-y-auto">
            <Suspense>
                <AppRoutes />
                <NewWindow ref={ref} name="test">
                    <Menu />
                </NewWindow>
                <ModalMenu>
                    <ModalContent />
                </ModalMenu>
            </Suspense>
        </div>
    )
}

export default App
