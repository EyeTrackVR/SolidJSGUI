import { exit } from '@tauri-apps/api/process'
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
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
        document
            .getElementById('titlebar-minimize')
            ?.addEventListener('click', () => appWindow.minimize())
        document
            .getElementById('titlebar-maximize')
            ?.addEventListener('click', () => appWindow.toggleMaximize())
        document
            .getElementById('titlebar-close')
            ?.addEventListener('click', () => (main ? handleAppExit() : appWindow.close()))
    }
}

export const handleAppBoot = () => {
    document.addEventListener('DOMContentLoaded', () => {
        invoke('get_user')
            .then((config) => {
                console.log(config)
                localStorage.setItem('settings', JSON.stringify(config))
            })
            .catch((e) => console.error(e))
        setTimeout(() => invoke('close_splashscreen'), 25000)
    })

    // TODO: call generateWebSocketClients() after the MDNS service is up and running and discoveres the camera's
    useMDNSScanner('_openiristracker._tcp', 5)
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
