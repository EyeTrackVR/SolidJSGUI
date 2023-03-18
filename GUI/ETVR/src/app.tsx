import { MdnsProvider } from '@utils/context/mdns'
import { handleAppBoot, handleTitlebar } from '@utils/hooks/app'
import { lazy, onMount, Suspense } from 'solid-js'

const AppRoutes = lazy(() => import('@routes/Routes'))
const CameraSettingsModal = lazy(() => import('@components/Camera/CameraSettingsModal'))
const ModalMenu = lazy(() => import('@components/Modal'))
const NewWindow = lazy(() => import('@components/NewWindow'))
const ExampleMenu = lazy(() => import('@components/NewWindow/Example'))
const ToastNotificationWindow = lazy(() => import('@components/Notifications'))

const App = () => {
    const ref = document.getElementById('titlebar') // TODO: this is a hack, need to figure out how to get the ref to the bound element
    onMount(() => {
        handleTitlebar()
        handleAppBoot()
    })
    return (
        <div class="App overflow-y-auto items-center">
            <Suspense>
                <MdnsProvider>
                    <AppRoutes />
                    <NewWindow ref={ref} name="test">
                        <ExampleMenu />
                    </NewWindow>
                    <ModalMenu>
                        <CameraSettingsModal />
                    </ModalMenu>
                    <ToastNotificationWindow />
                </MdnsProvider>
            </Suspense>
        </div>
    )
}

export default App
