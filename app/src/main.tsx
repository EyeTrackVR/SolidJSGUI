/* @refresh reload */
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import '@styles/imports.css'
import App from './app'
import { AppContextMainProvider } from '@store/context/main'

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
