import { createMemo } from 'solid-js'
import { mdnsState } from './mdns'

export const mdnsStatus = createMemo(() => mdnsState().mdnsStatus)
