import { createMemo } from 'solid-js'
import { cameraState } from './camera'

export const cameras = createMemo(() => cameraState().cameras)
export const cameraAddresses = createMemo(() => cameraState().cameras.map(({ address }) => address))
export const cameraStatus = createMemo(() => cameraState().cameras.map(({ status }) => status))
export const selectedCamera = createMemo(() => cameraState().selectedCamera)
export const selectedCameraAddress = createMemo(() => cameraState().selectedCamera.address)
export const selectedCameraStatus = createMemo(() => cameraState().selectedCamera.status)
export const selectedCameraType = createMemo(() => cameraState().selectedCamera.type)
export const selectedCameraSection = createMemo(
    () => cameraState().selectedCamera.activeCameraSection,
)
export const selectedCameraSocket = createMemo(() => cameraState().selectedCamera.ws)
