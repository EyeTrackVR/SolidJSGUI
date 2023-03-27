import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { RTCMessageType, RTCState } from '@src/static/types/enums'

export interface IWebSocket {
    pc?: RTCPeerConnection
    dc?: RTCDataChannel
    status: RTCState
    messageType: RTCMessageType
    camStream?: any
    connectInterval?: NodeJS.Timeout
    timeout?: number
    ws?: WebSocket
    abortController?: AbortController
}

export const defaultState: IWebSocket = {
    status: RTCState.DISCONNECTED,
    messageType: RTCMessageType.VIDEO_OFFER,
    camStream: null,
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
