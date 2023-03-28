import { type WebviewWindow } from '@tauri-apps/api/window'
import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

interface IWindow {
    label: string
    window: WebviewWindow
}

export interface IWindowsStore {
    activeWindows: IWindow[]
}

const windowsStoreDefaultState: IWindowsStore = {
    activeWindows: [],
}

const [state, setState] = createStore<IWindowsStore>(windowsStoreDefaultState)

export const addWindow = (label: string, window: WebviewWindow) => {
    setState(
        produce((s) => {
            s.activeWindows.push({ label, window })
        }),
    )
}

export const removeWindow = (window: WebviewWindow) => {
    setState(
        produce((s) => {
            const index = s.activeWindows.findIndex((w) => w.label === window.label)
            if (index > -1) {
                s.activeWindows[index].window.close()
                s.activeWindows.splice(index, 1)
            }
        }),
    )
}

export const windowsState = createMemo(() => state)
