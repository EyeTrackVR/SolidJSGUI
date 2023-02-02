import { onMount } from 'solid-js'
import { sendToRTCServer } from '@utils/hooks/websocket'

const PORT = 7856

interface IWebSocket {
    ws: WebSocket
    pc: RTCPeerConnection
    dc: RTCDataChannel
    camStream: any
}

const webSocketHandler = () => {
    onMount(async () => {
        initwebSocket()
    })
}

/********************************* connect *************************************/

/**
 * @description initialize connection to the server
 * we use websocket heartbeat to the server
 * every 10 seconds
 */
const initwebSocket = () => {
    const socket: IWebSocket['ws'] = new WebSocket(`ws://127.0.0.1:${PORT}/camera/`)

    socket.onopen = () => {
        setInterval(() => {
            sendToRTCServer(
                {
                    msg: {
                        msg_type: 'heartbeat',
                        receiver: '',
                        sender: '',
                        msg: '',
                    },
                },
                socket,
            )
        }, 1000 * 10)
    }

    //* TODO: Add notification to the user
    socket.onerror = (error) => {
        console.log('WebSocket error: ' + error)
    }
}

export default webSocketHandler
