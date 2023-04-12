import { invoke } from '@tauri-apps/api/tauri'
import { setAddCameraMDNS } from '@src/store/camera/camera'
import { enableMDNS } from '@store/app/settings/selectors'
import { setMdnsStatus, setMdnsData, MdnsStatus, type IMdnsResponse } from '@store/mdns/mdns'

export const useMDNSScanner = async (serviceType: string, scanTime: number) => {
    if (!enableMDNS()) return
    if (serviceType === '' || scanTime === 0) {
        return []
    }
    console.log('[MDNS Scanner]: scanning for', serviceType, scanTime)

    setMdnsStatus(MdnsStatus.LOADING)
    const res = await invoke('run_mdns_query', {
        serviceType,
        scanTime,
    })

    if (!res) {
        console.error('[MDNS Scanner]: error', res)
        setMdnsStatus(MdnsStatus.FAILED)
        return
    }

    console.log('[MDNS Scanner]: res', res)
    const response = res as IMdnsResponse
    setMdnsStatus(MdnsStatus.ACTIVE)
    setMdnsData(response)
    // loop through the res and add the cameras to the store
    const size = Object.keys(response.names).length
    for (let i = 0; i < size; i++) {
        // grab the unknown key and use it to access the res.urls object
        const key = Object.keys(response.names)[i]
        console.log('[MDNS Scanner]: adding camera', response.names[key])
        const address = `http://${response.names[key]}.local`
        setAddCameraMDNS(address)
    }
}
