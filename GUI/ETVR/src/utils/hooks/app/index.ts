import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window'
import { setWebsocketClients } from '@store/api/websocket'
import { doGHRequest } from '@utils/hooks/api/useGHReleases'
import { generateWebsocketClients } from '@utils/hooks/websocket'

export const handleTitlebar = () => {
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

export const handleAppBoot = () => {
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

export const handleAppExit = () => {
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault()
        invoke('exit')
    })
}

export const handleSound = async (
    soundfile_mp: string,
    soundfile_ogg?: string,
    soundfile_ma?: string,
) => {
    if (!soundfile_ogg) soundfile_ogg = soundfile_mp
    if (!soundfile_ma) soundfile_ma = soundfile_mp
    if ('Audio' in window) {
        const a = new Audio()
        if (a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''))
            a.src = ('assets/audio/' + soundfile_ogg) as string
        else if (a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))
            a.src = ('assets/audio/' + soundfile_mp) as string
        else if (a.canPlayType && a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''))
            a.src = ('assets/audio/' + soundfile_ma) as string
        else a.src = ('assets/audio/' + soundfile_mp) as string

        a.play()
        return
    }
}

//! Not supported in Edge yet - but will be eventually (https://developer.microsoft.com/en-us/microsoft-edge/platform/status/selectaudiooutput/)
/* export const handleAudioDevices = async () => {
    if (!navigator.mediaDevices.selectAudioOutput) {
        console.log('selectAudioOutput() not supported.')
        return
    }
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioDevices = devices.filter((device) => device.kind === 'audioinput')

    navigator.mediaDevices
        .selectAudioOutput()
        .then((device) => {
            console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`)
        })
        .catch((err) => {
            console.error(`${err.name}: ${err.message}`)
        })
} */
