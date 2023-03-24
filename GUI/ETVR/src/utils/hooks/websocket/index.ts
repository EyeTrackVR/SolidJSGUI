// TODO: Switch to tauri websocket plugin - https://github.com/tauri-apps/tauri-plugin-websocket
import { RTCState } from '@src/static/types/enums'
import { rtcWebSocket, rtcTimeout, rtcConnectInterval } from '@store/api/selectors'
import { setRTCStatus, setConnectInterval, setRTCTimeout } from '@store/api/websocket'
//import { WebSocket } from 'tauri-plugin-websocket-api'


import { cameras } from '@store/camera/selectors'

const PORT = 7856
const LOCAL_HOST = 'wss://127.0.0.1'

interface IWebRTCMessage {
    msg: string | object | null | undefined
}

const sendToRTCServer = (msg: IWebRTCMessage) => {
    if (!msg) {
        console.error('[sendToRTCServer]: Message is null or undefined')
        return
    }
    rtcWebSocket().forEach((element) => {
        element.send(JSON.stringify(msg))
    })
}

export const check = () => {
    const ws = rtcWebSocket()
    ws.forEach((element) => {
        if (!element || element.readyState == WebSocket.CLOSED) {
            //check if websocket instance is closed, if so call `init` function.
            setRTCStatus(RTCState.DISCONNECTED)
            initWebSocket()
        }
    })
}

const generateWebsocketClients = () => {
    const clients = cameras().map((_, i) => {
        return new WebSocket(`${LOCAL_HOST}:${PORT}/camera_${i + 1}`)
    })
    console.log('[WebSocket Handler]: websocket clients', clients)
    return clients
}

/********************************* connect *************************************/
/**
 * @description initialize connection to the server
 * we use websocket heartbeat to the server
 * every 10 seconds
 */
const initWebSocket = () => {
    setRTCStatus(RTCState.CONNECTING)
    rtcWebSocket().forEach((element) => {
        element.onopen = () => {
            setRTCTimeout(250) // reset timer to 250 on open of websocket connection
            clearTimeout(rtcConnectInterval()) // clear Interval on open of websocket connection

            setRTCStatus(RTCState.CONNECTED)
            setInterval(() => {
                sendToRTCServer({
                    msg: {
                        msg_type: 'heartbeat',
                        receiver: '',
                        sender: '',
                        msg: '',
                    },
                })
            }, 1000 * 10)

            console.log('[WebSocket Client]: Connection Opened')
        }
    })
    //* TODO: Add notification to the user
    rtcWebSocket().forEach((element) => {
        element.onerror = (e) => {
            setRTCStatus(RTCState.ERROR)
            console.error('[WebSocket Client]: Socket encountered error: ', e, 'Closing socket')
            rtcWebSocket().forEach((element) => {
                if (!element || element.readyState != WebSocket.CONNECTING) {
                    if (element.bufferedAmount <= 0) element.close()
                }
            })
        }
    })
    //* TODO: Add notification to the user
    rtcWebSocket().forEach((element) => {
        element.onclose = (e) => {
            console.log(
                `[WebSocket Client]: Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    ((rtcTimeout() as number) + (rtcTimeout() as number)) / 1000,
                )} second.`,
                e.reason,
            )
            //increment retry interval
            setRTCTimeout((rtcTimeout() as number) + (rtcTimeout() as number))
            //call check function after timeout
            setConnectInterval(setTimeout(check, Math.min(10000, rtcTimeout() as number)))
        }
    })
}

export { sendToRTCServer, initWebSocket, generateWebsocketClients }
