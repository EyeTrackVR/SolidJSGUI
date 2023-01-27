/* @refresh reload */
import { ColorModeScript, HopeProvider } from '@hope-ui/core'
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import '@styles/imports.css'
import App from './app'
import theme from '@static/theme/theme'

render(
    () => (
        <>
            <ColorModeScript />
            <HopeProvider theme={theme}>
                <Router>
                    <App />
                </Router>
            </HopeProvider>
        </>
    ),
    document.getElementById('root') as HTMLElement,
)
