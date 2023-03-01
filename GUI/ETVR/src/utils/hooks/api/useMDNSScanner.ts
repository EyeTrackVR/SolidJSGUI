import { invoke } from '@tauri-apps/api/tauri'
import { createEffect, createResource, createSignal } from 'solid-js'

interface IProps {
    serviceType: string
    scanTime: number
}

const scan = async (source, { value, refetching }) => {
    const { serviceType, scanTime } = source

    const res = await invoke('run_mdns_query', {
        serviceType,
        scanTime,
    })

    if (typeof res === 'string') {
        const parsedResponse = JSON.parse(res)
        return parsedResponse
    }
    return []
}

export const useMDNSScanner = (serviceType: string, scanTime: number) => {
    // create an object with the serviceType and scanTime as the key
    // this will allow us to create a new resource if the serviceType or scanTime changes

    const [resData, setResData] = createSignal<IProps>({
        serviceType: serviceType,
        scanTime: scanTime,
    })

    createEffect(() => {
        if (serviceType !== resData().serviceType || scanTime !== resData().scanTime) {
            setResData({
                serviceType: serviceType,
                scanTime: scanTime,
            })
        }
    })

    const [data, { mutate, refetch }] = createResource(resData, scan)
    return { data, mutate, refetch, resData, setResData }
}
