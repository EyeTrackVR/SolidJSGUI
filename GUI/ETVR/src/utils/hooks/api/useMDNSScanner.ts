import { invoke } from '@tauri-apps/api/tauri'
import { setAddCameraMDNS } from '@src/store/camera/camera'
import { enableMDNS } from '@store/app/settings/selectors'
import { setMdnsStatus, setMdnsData, MdnsStatus } from '@store/mdns/mdns'

export const useMDNSScanner = (serviceType: string, scanTime: number) => {
    if (!enableMDNS()) return
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
                // loop through the parsedResponse and add the cameras to the store
                const size = Object.keys(parsedResponse.urls).length
                for (let i = 0; i < size; i++) {
                    // grab the unknown key and use it to access the parsedResponse.urls object
                    const key = Object.keys(parsedResponse.urls)[i]
                    console.log('[MDNS Scanner]: adding camera', key)
                    setAddCameraMDNS(parsedResponse.urls[key])
                }
            }
        })
        .catch((e) => {
            console.error('[MDNS Scanner]: error', e)
            setMdnsStatus(MdnsStatus.FAILED)
        })
}
