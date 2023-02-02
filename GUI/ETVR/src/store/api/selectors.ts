import { createMemo } from 'solid-js'
import { restState, endpointsMap } from './restAPI'
import { rtcState } from './websocket'

export const restStatus = createMemo(() => restState().status)
export const restDevice = createMemo(() => restState().device)
export const restResponse = createMemo(() => restState().response)
export const endpoints = createMemo(() => endpointsMap)

/**
 * @description
 * @returns {RTCState}
 * @example
 * const status = rtcStatus()
 * if (status === RTCState.CONNECTED) {
 *    // do something
 * }
 */
export const rtcStatus = createMemo(() => rtcState().status)

export const rtcMessageType = createMemo(() => rtcState().messageType)

/**
 * @description get the current websocket instance
 * @returns {WebSocket} the current websocket instance
 * @example
 * const ws = rtcWebSocket()
 * ws.send(JSON.stringify({ msg: 'hello' }))
 *
 * Note: must use a try catch block to catch any errors that may occur do to possible null values
 * 
 * try {
 *   const ws = rtcWebSocket()
 *   ws.send(JSON.stringify({ msg: 'hello' }))
 * } catch (e) {
 *   console.error(e)
 * }
 */
export const rtcWebSocket = createMemo(() => rtcState().ws)

export const rtcConnectedPeers = createMemo(() => rtcState().connectedPeers)
export const rtcConnectInterval = createMemo(() => rtcState().connectInterval)
export const rtcTimeout = createMemo(() => rtcState().timeout)
