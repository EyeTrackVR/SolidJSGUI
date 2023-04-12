import { exit } from '@tauri-apps/api/process'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { useEventListener } from 'solidjs-use'
import { ExitCodes } from '@static/types/enums'
import { enableNotificationsSounds } from '@store/app/settings/selectors'
import { getActiveWindows } from '@store/app/windows/selectors'
import { removeWindow } from '@store/app/windows/windows'
import { doGHRequest } from '@utils/hooks/api/useGHReleases'
import { useMDNSScanner } from '@utils/hooks/api/useMDNSScanner'
import { checkPermission } from '@utils/hooks/notifications'
import { generateWebsocketClients } from '@utils/hooks/websocket'

export const handleTitlebar = (main = false) => {
    const titlebar = document.getElementsByClassName('titlebar')
    if (titlebar) {
        useEventListener(document.getElementById('titlebar-minimize'), 'click', () => {
            appWindow.minimize()
        })
        useEventListener(document.getElementById('titlebar-maximize'), 'click', () => {
            appWindow.toggleMaximize()
        })
        useEventListener(document.getElementById('titlebar-close'), 'click', () => {
            main ? handleAppExit() : appWindow.close()
        })
    }
}

export const handleAppBoot = () => {
    useEventListener(document, 'DOMContentLoaded', () => {
        invoke('get_user')
            .then((config) => {
                console.log(config)
                localStorage.setItem('settings', JSON.stringify(config))
            })
            .catch((e) => console.error(e))

        // check if the window state is saved and restore it if it is

        invoke('handle_save_window_state').then(() => {
            console.log('[App Boot]: saved window state')
        })

        setTimeout(() => invoke('close_splashscreen'), 15000)
    })

    // TODO: call generateWebSocketClients() after the MDNS service is up and running and discovers the camera's
    useMDNSScanner('_openiristracker._tcp', 5)
    // addCameras()
    generateWebsocketClients()

    // TODO: check notif perms and request GH data
    checkPermission()
    doGHRequest()
}

export const handleAppExit = async () => {
    // TODO: call these before the app exits to shutdown gracefully
    // stopMDNS()
    // stopWebsocketClients()
    // saveSettings()
    // stopPythonBackend()
    invoke('handle_save_window_state').then(() => {
        console.log('[App Close]: saved window state')
    })
    getActiveWindows().forEach((w) => removeWindow(w.window))
    appWindow.close()
    await exit(ExitCodes.USER_EXIT)
}

export const handleSound = async (
    soundfile_mp: string,
    soundfile_ogg?: string,
    soundfile_ma?: string,
) => {
    if (!enableNotificationsSounds()) return
    if (!soundfile_ogg) soundfile_ogg = soundfile_mp
    if (!soundfile_ma) soundfile_ma = soundfile_mp
    if ('Audio' in window) {
        const a = new Audio()
        if (a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''))
            a.src = ('audio/' + soundfile_ogg) as string
        else if (a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))
            a.src = ('audio/' + soundfile_mp) as string
        else if (a.canPlayType && a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''))
            a.src = ('audio/' + soundfile_ma) as string
        else a.src = ('audio/' + soundfile_mp) as string

        a.play()
        return
    }
}
