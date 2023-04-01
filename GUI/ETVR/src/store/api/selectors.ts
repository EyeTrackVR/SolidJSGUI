import { createMemo } from 'solid-js'
import { ghRestState, ghEndpoint } from './ghAPI'
import { restState, endpointsMap } from './restAPI'

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
