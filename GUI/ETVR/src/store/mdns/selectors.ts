import { createMemo } from 'solid-js'
import { mdnsState } from './mdns'

export const connectedUserName = createMemo(() => mdnsState().connectedUser)
export const cameras = createMemo(() => mdnsState().camerasMap)
export const cameraAddresses = createMemo(() => [...cameras().keys()])
