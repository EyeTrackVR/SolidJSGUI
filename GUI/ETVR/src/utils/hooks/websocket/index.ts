import { rtcWebSocket, rtcTimeout } from '@store/api/selectors'
import { setRTCStatus, setConnectInterval, setRTCTimeout } from '@store/api/websocket'
import { RTCState } from '@utils/enums'

interface IWebRTCMessage {
    msg: string | object | null | undefined
}

const sendToRTCServer = (msg: IWebRTCMessage) => {
    if (!msg) {
        console.error('[sendToRTCServer]: Message is null or undefined')
        return
    }
    rtcWebSocket().send(JSON.stringify(msg))
}

export const check = () => {
    const ws = rtcWebSocket()
    if (!ws || ws.readyState == WebSocket.CLOSED) {
        //check if websocket instance is closed, if so call `init` function.
        setRTCStatus(RTCState.DISCONNECTED)
        initWebSocket()
    }
}

/********************************* connect *************************************/
/**
 * @description initialize connection to the server
 * we use websocket heartbeat to the server
 * every 10 seconds
 */
const initWebSocket = () => {
    setRTCStatus(RTCState.CONNECTING)
    rtcWebSocket().onopen = () => {
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
    }
    //* TODO: Add notification to the user
    rtcWebSocket().onerror = (e) => {
        setRTCStatus(RTCState.ERROR)
        console.error('Socket encountered error: ', e, 'Closing socket')
        rtcWebSocket().close()
    }
    //* TODO: Add notification to the user
    rtcWebSocket().onclose = (e) => {
        //increment retry interval
        setRTCTimeout((rtcTimeout() as number) + (rtcTimeout() as number))
        //call check function after timeout
        setConnectInterval(setTimeout(check, Math.min(10000, rtcTimeout() as number)))
        console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
                10000 / 1000,
                ((rtcTimeout() as number) + (rtcTimeout() as number)) / 1000,
            )} second.`,
            e.reason,
        )
    }
}

export { sendToRTCServer, initWebSocket }
