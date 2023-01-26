import { createMemo } from 'solid-js'
import { restState, endpointsMap } from './restAPI'

export const restStatus = createMemo(() => restState().status)
export const restDevice = createMemo(() => restState().device)
export const restResponse = createMemo(() => restState().response)
export const endpoints = createMemo(() => endpointsMap)
