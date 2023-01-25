import { createMemo } from 'solid-js'
import { restState } from './restAPI'

export const restStatus = createMemo(() => restState().status)
export const cameras = createMemo(() => restState().cameras)