import { createMemo } from 'solid-js'
import { ghRestState, ghEndpoint } from './ghAPI'
import { restState, endpointsMap } from './restAPI'
import { rtcState } from './websocket'

/********************************* rest *************************************/
export const restStatus = createMemo(() => restState().status)
export const restDevice = createMemo(() => restState().device)
export const restResponse = createMemo(() => restState().response)
export const endpoints = createMemo(() => endpointsMap)
/********************************* gh rest *************************************/
export const ghRestStatus = createMemo(() => ghRestState().status)
export const firmwareAssets = createMemo(() => ghRestState().assets)
export const firmwareVersion = createMemo(() => ghRestState().version)
export const ghRESTEndpoint = createMemo(() => ghEndpoint)
/********************************* websockets *************************************/
export const rtcStatus = createMemo(() => rtcState().status)
export const rtcMessageType = createMemo(() => rtcState().messageType)
export const rtcWebSocket = createMemo(() => rtcState().ws)
export const rtcConnectedPeers = createMemo(() => rtcState().connectedPeers)
export const rtcConnectInterval = createMemo(() => rtcState().connectInterval)
export const rtcTimeout = createMemo(() => rtcState().timeout)
