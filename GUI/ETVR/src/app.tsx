import { lazy, onMount, Suspense } from 'solid-js'
import { handleAppBoot, handleTitlebar } from '@utils/hooks/app'

const AppRoutes = lazy(() => import('@routes/Routes'))
//const CameraSettingsModal = lazy(() => import('@components/Camera/CameraSettingsModal'))
//const ModalMenu = lazy(() => import('@components/Modal'))
const NewWindow = lazy(() => import('@components/NewWindow'))
const ExampleMenu = lazy(() => import('@components/NewWindow/Example'))
const ToastNotificationWindow = lazy(() => import('@components/Notifications'))

const App = () => {
    const ref = document.getElementById('titlebar')
    onMount(() => {
        handleTitlebar(true)
        handleAppBoot()
    })

    return (
        <div class="App overflow-y-auto items-center">
            <Suspense>
                <AppRoutes />
                <NewWindow ref={ref} name="test">
                    <ExampleMenu />
                </NewWindow>
                {/* <ModalMenu>
                    <CameraSettingsModal />
                </ModalMenu> */}
                {/* disabled it's not working */}
                <ToastNotificationWindow />
            </Suspense>
        </div>
    )
}

export default App
