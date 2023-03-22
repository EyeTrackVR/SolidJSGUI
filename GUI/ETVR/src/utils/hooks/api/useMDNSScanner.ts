import { invoke } from '@tauri-apps/api/tauri'
import { createMemo, createResource, createSignal } from 'solid-js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const scan = async (source, { value, refetching }) => {
    const { serviceType, scanTime } = source

    if (serviceType === '' || scanTime === 0) {
        return []
    }

    console.log('scanning for', serviceType, scanTime)

    const res = await invoke('run_mdns_query', {
        serviceType,
        scanTime,
    })

    if (typeof res === 'string') {
        const parsedResponse = JSON.parse(res)
        console.log('parsedResponse', parsedResponse)
        return parsedResponse
    }
    return []
}

export const useMDNSScanner = () => {
    const [service, setService] = createSignal<string>('')
    const [scanTime, setScanTime] = createSignal<number>(0)

    const mdnsInitState = createMemo(() => ({
        serviceType: service(),
        scanTime: scanTime(),
    }))
    const [data, { mutate, refetch }] = createResource(mdnsInitState, scan)
    return { data, mutate, refetch, setService, setScanTime }
}
