import { invoke } from '@tauri-apps/api/tauri'
import { setMdnsStatus, setMdnsData, MdnsStatus } from '@store/mdns/mdns'

export const useMDNSScanner = (serviceType: string, scanTime: number) => {
    if (serviceType === '' || scanTime === 0) {
        return []
    }

    console.log('[MDNS Scanner]: scanning for', serviceType, scanTime)

    setMdnsStatus(MdnsStatus.LOADING)
    invoke('run_mdns_query', {
        serviceType,
        scanTime,
    })
        .then((res) => {
            if (typeof res === 'string') {
                const parsedResponse = JSON.parse(res)
                console.log('[MDNS Scanner]: parsedResponse', parsedResponse)
                setMdnsStatus(MdnsStatus.ACTIVE)
                setMdnsData(parsedResponse)
            }
        })
        .catch((e) => {
            console.error('[MDNS Scanner]: error', e)
            setMdnsStatus(MdnsStatus.FAILED)
        })
}
