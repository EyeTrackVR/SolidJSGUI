import { createMemo } from 'solid-js'
import { restState, endpointsMap } from './restAPI'

export const restStatus = createMemo(() => restState().status)
export const endpoints = createMemo(() => endpointsMap)
