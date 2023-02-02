import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { RTCMessageType, RTCState } from '@utils/enums'
import { sendToRTCServer } from '@utils/hooks/websocket'

const PORT = 7856

export interface IWebSocket {
    ws: WebSocket[]
    pc?: RTCPeerConnection
    dc?: RTCDataChannel
    status: RTCState
    messageType: RTCMessageType
    camStream?: any
    connectedPeers?: string[]
    connectInterval?: NodeJS.Timeout
    timeout?: number
}

export const defaultState: IWebSocket = {
    ws: [new WebSocket(`ws://127.0.0.1:${PORT}/camera/`)],
    status: RTCState.DISCONNECTED,
    messageType: RTCMessageType.VIDEO_OFFER,
    camStream: null,
    connectedPeers: [],
    connectInterval: undefined,
    timeout: 250,
}

const [state, setState] = createStore<IWebSocket>(defaultState)

export const setRTCStatus = (status: RTCState) => {
    setState(
        produce((s) => {
            s.status = status
        }),
    )
}

export const setRTCMessageType = (messageType: RTCMessageType) => {
    setState(
        produce((s) => {
            s.messageType = messageType
        }),
    )
}

export const setRTCWebSocket = (ws: WebSocket) => {
    setState(
        produce((s) => {
            s.ws = ws
        }),
    )
}

export const setConnectInterval = (interval: NodeJS.Timeout) => {
    setState(
        produce((s) => {
            s.connectInterval = interval
        }),
    )
}

export const setRTCTimeout = (time: number) => {
    setState(
        produce((s) => {
            s.timeout = time
        }),
    )
}

export const rtcState = createMemo(() => state)
