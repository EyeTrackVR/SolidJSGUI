import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { RTCMessageType, RTCState } from '@src/static/types/enums'

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
    ws: [],
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
            s.ws.push(ws)
        }),
    )
}

export const setRemoveRTCWebSocket = (ws: WebSocket) => {
    setState(
        produce((s) => {
            s.ws = s.ws.filter((w) => w !== ws)
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
export const setWebsocketClients = (clients: WebSocket[]) => {
    setState(
        produce((s) => {
            s.ws = clients
        }),
    )
}

export const rtcState = createMemo(() => state)
