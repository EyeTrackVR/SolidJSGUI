import { invoke } from '@tauri-apps/api/tauri'
import { createSignal } from 'solid-js'

export const useMDNSScanner = (serviceType: string, scanTime: number) => {
    const [res, setRes] = createSignal(null)
    const [loading, setLoading] = createSignal(false)
    const [error, setError] = createSignal(null)

    const scan = () => {
        setLoading(true)
        invoke('run_mdns_query', {
            serviceType,
            scanTime,
        })
            .then((response) => {
                if (typeof response === 'string') {
                    const parsedResponse = JSON.parse(response)
                    setRes(parsedResponse)
                }
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return { res, loading, error, scan }
}
