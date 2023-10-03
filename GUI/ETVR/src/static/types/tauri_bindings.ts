declare global {
    interface Window {
        __TAURI_INVOKE__<T>(cmd: string, args?: Record<string, unknown>): Promise<T>
        __TAURI_IPC__(event: string, payload?: unknown): Promise<void>
        __TAURI_METADATA__: {
            __windows: unknown
            __currentWindow: unknown
        }
    }
}

export async function setFrontendReady(): Promise<void> {
    return invoke<void>('plugin:splashscreen|set_frontend_ready')
}

// check if we are in a tauri context if we are in ssr wait for tauri to be ready
export function tauriAvailable(): boolean {
    return !(typeof window !== 'undefined' && !window.__TAURI_METADATA__)
}

export function invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
    if (!tauriAvailable()) {
        console.log('tauri invoked `%s` but we are in SSR', cmd)
        return Promise.reject('SSR')
    }
    return window.__TAURI_INVOKE__(cmd, args)
}

export function emit(event: string, payload?: unknown): Promise<void> {
    if (!tauriAvailable()) {
        console.log('emitted `%s` event but we are in SSR', event)
        return Promise.reject('SSR')
    }
    return window.__TAURI_IPC__(event, payload)
}
