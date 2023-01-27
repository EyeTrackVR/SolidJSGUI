import { createMemo } from 'solid-js'
import { cameraState } from './camera'

export const cameras = createMemo(() => cameraState().cameras)
export const cameraAddresses = createMemo(() =>
    cameraState().cameras.map((c: { address: string }) => c.address),
)
export const cameraStatus = createMemo(() =>
    cameraState().cameras.map((c: { status: string }) => c.status),
)
