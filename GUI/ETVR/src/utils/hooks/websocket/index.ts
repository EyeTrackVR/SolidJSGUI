// TODO: Switch to tauri websocket plugin - https://github.com/tauri-apps/tauri-plugin-websocket
import { RTCState } from '@src/static/types/enums'
import { rtcTimeout, rtcConnectInterval } from '@store/api/selectors'
import { setRTCStatus, setConnectInterval, setRTCTimeout } from '@store/api/websocket'
import { cameras } from '@store/camera/selectors'

const PORT = 7856
const LOCAL_HOST = 'wss://127.0.0.1'

interface IWebRTCMessage {
    msg: string | object | null | undefined
}

export const sendToRTCServer = (msg: IWebRTCMessage) => {
    if (!msg) {
        console.error('[sendToRTCServer]: Message is null or undefined')
        return
    }
    cameras().forEach((camera) => {
        if (camera.ws) camera.ws.send(JSON.stringify(msg))
    })
}

export const check = () => {
    cameras().forEach((camera) => {
        if (!camera.ws || camera.ws.readyState == WebSocket.CLOSED) {
            //check if websocket instance is closed, if so call `init` function.
            setRTCStatus(RTCState.DISCONNECTED)
            initWebSocket()
        }
    })
}

export const generateWebsocketClients = () => {
    const clients = cameras().map((camera, i) => {
        if (!camera.ws) {
            camera.ws = new WebSocket(`${LOCAL_HOST}:${PORT + i}`)
            return camera.ws
        }
    })
    //console.log('[WebSocket Handler]: Websocket Clients - ', clients)
}

/********************************* connect *************************************/
/**
 * @description initialize connection to the server
 * we use websocket heartbeat to the server
 * every 10 seconds
 */
export const initWebSocket = () => {
    setRTCStatus(RTCState.CONNECTING)
    cameras().forEach((camera) => {
        if (camera.ws) {
            camera.ws.onopen = () => {
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
        }
    })
    //* TODO: Add notification to the user
    cameras().forEach((camera) => {
        if (camera.ws) {
            camera.ws.onerror = (e) => {
                setRTCStatus(RTCState.ERROR)
                console.error('[WebSocket Client]: Socket encountered error: ', e, 'Closing socket')
                cameras().forEach((camera) => {
                    if (camera.ws) {
                        if (camera.ws.readyState != WebSocket.CONNECTING) {
                            if (camera.ws.bufferedAmount <= 0) camera.ws.close()
                        }
                    }
                })
            }
        }
    })
    //* TODO: Add notification to the user
    cameras().forEach((camera) => {
        if (camera.ws) {
            camera.ws.onclose = (e) => {
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
        }
    })
}
