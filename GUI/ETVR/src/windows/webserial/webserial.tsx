/* @refresh reload */
import { Router } from '@solidjs/router'
import { onMount, Suspense } from 'solid-js'
import { render } from 'solid-js/web'
import WebSerial from '@components/WebSerial'
import { handleTitlebar } from '@src/utils/hooks/app'
import '@styles/docs-imports.css'

const App = () => {
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
            <App />
        </Router>
    ),
    document.getElementById('root') as HTMLElement,
)
