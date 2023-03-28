import { createMemo } from 'solid-js'
import { windowsState } from './windows'

export const getActiveWindows = createMemo(() => windowsState().activeWindows)
