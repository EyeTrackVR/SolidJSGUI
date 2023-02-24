import { createMemo } from 'solid-js'
import { restState, endpointsMap } from './restAPI'
import { rtcState } from './websocket'

/********************************* rest *************************************/
export const restStatus = createMemo(() => restState().status)
export const restDevice = createMemo(() => restState().device)
export const restResponse = createMemo(() => restState().response)
export const endpoints = createMemo(() => endpointsMap)
/********************************* websockets *************************************/
export const rtcStatus = createMemo(() => rtcState().status)
export const rtcMessageType = createMemo(() => rtcState().messageType)
export const rtcWebSocket = createMemo(() => rtcState().ws)
export const rtcConnectedPeers = createMemo(() => rtcState().connectedPeers)
export const rtcConnectInterval = createMemo(() => rtcState().connectInterval)
export const rtcTimeout = createMemo(() => rtcState().timeout)
