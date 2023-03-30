import { createMemo } from 'solid-js'
import { mdnsState } from './mdns'

export const mdnsStatus = createMemo(() => mdnsState().mdnsStatus)
// TODO: use this selector for adding cameras
export const mdnsData = createMemo(() => mdnsState().mdnsData)
