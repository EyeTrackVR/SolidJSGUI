import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { setWebsocketClients } from '@store/api/websocket'
import { doGHRequest } from '@utils/hooks/api/useGHReleases'
import { generateWebsocketClients } from '@utils/hooks/websocket'

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
    // TODO: Implement a websocket client that can be used to connect to the camera'susing the `tauri-plugin-websocket` rust crate
    //const clients = generateWebsocketClients()
    //setWebsocketClients(clients)
    doGHRequest()
}

export { handleTitlebar, handleAppBoot }
