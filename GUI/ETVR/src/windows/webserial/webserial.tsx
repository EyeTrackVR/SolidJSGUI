/* @refresh reload */
import { Router } from '@solidjs/router'
import { onMount, Suspense } from 'solid-js'
import { render } from 'solid-js/web'
import WebSerial from '@components/WebSerial'
import { useAppContextMain, AppContextMainProvider } from '@src/store/context/main'
import '@styles/docs-imports.css'

const App = () => {
    const { handleTitlebar } = useAppContextMain()

    onMount(() => {
        handleTitlebar()
    })

    return (
        <div class="w-[100%] h-[100%]">
            <Suspense>
                <WebSerial />
            </Suspense>
        </div>
    )
}

render(
    () => (
        <Router>
            <AppContextMainProvider>
                <App />
            </AppContextMainProvider>
        </Router>
    ),
    document.getElementById('root') as HTMLElement,
)
