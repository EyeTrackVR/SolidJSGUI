import { createMemo } from 'solid-js'
import { cameraState } from './camera'

export const cameras = createMemo(() => cameraState().cameras)
export const cameraAddresses = createMemo(() => cameraState().cameras.map(({ address }) => address))
export const cameraStatus = createMemo(() => cameraState().cameras.map(({ status }) => status))
