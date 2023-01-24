/* @refresh reload */
import { Router } from '@solidjs/router'
import { invoke } from '@tauri-apps/api/tauri'
import { isServer, render } from 'solid-js/web'
import App from './app'
import '@styles/imports.css'

!isServer &&
    document.addEventListener('DOMContentLoaded', () => {
        invoke('get_user')
            .then((config) => {
                console.log(config)
                localStorage.setItem('settings', JSON.stringify(config))
            })
            .catch((e) => console.error(e))
        setTimeout(() => invoke('close_splashscreen'), 500)
    })

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('root') as HTMLElement
)
