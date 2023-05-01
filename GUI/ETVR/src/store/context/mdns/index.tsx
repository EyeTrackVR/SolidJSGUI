import { invoke } from '@tauri-apps/api/tauri'
import { createContext, useContext, createMemo, type Component, Accessor } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useAppContext } from '../app'
import { useAppCameraContext } from '../camera'

import type { Context } from '@static/types'
import type { AppStoreMdns, MdnsResponse } from '@static/types/interfaces'
import { MdnsStatus } from '@static/types/enums'

interface AppMDNSContext {
    getMdnsStatus: Accessor<MdnsStatus>
    getMdnsData: Accessor<MdnsResponse>
    setMdnsStatus: (status: MdnsStatus) => void
    setMdnsData: (data: MdnsResponse) => void
    useMDNSScanner: (serviceType: string, scanTime: number) => Promise<never[] | undefined>
}

const AppMDNSContext = createContext<AppMDNSContext>()
export const AppMdnsProvider: Component<Context> = (props) => {
    const { getEnableMDNS } = useAppContext()

    const { setAddCameraMDNS } = useAppCameraContext()

    const defaultState: AppStoreMdns = {
        mdnsStatus: MdnsStatus.DISABLED,
        mdnsData: {
            ips: [],
            names: [],
        },
    }

    const [state, setState] = createStore<AppStoreMdns>(defaultState)

    const setMdnsStatus = (status: MdnsStatus) => {
        setState(
            produce((s) => {
                s.mdnsStatus = status
            }),
        )
    }

    const setMdnsData = (data: MdnsResponse) => {
        setState(
            produce((s) => {
                s.mdnsData = data
            }),
        )
    }

    const useMDNSScanner = async (serviceType: string, scanTime: number) => {
        if (!getEnableMDNS()) return
        if (serviceType === '' || scanTime === 0) {
            return []
        }
        console.log('[MDNS Scanner]: scanning for', serviceType, scanTime)

        setMdnsStatus(MdnsStatus.LOADING)

        try {
            const res = await invoke('run_mdns_query', {
                serviceType,
                scanTime,
            })

            console.log('[MDNS Scanner]: res', res)
            const response = res as MdnsResponse
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
        } catch (error) {
            console.error('[MDNS Scanner]: error', error)
            setMdnsStatus(MdnsStatus.FAILED)
        }
    }

    const mdnsState = createMemo(() => state)

    const getMdnsStatus = createMemo(() => mdnsState().mdnsStatus)
    // TODO: use this selector for adding cameras
    const getMdnsData = createMemo(() => mdnsState().mdnsData)

    return (
        <AppMDNSContext.Provider
            value={{
                getMdnsStatus,
                getMdnsData,
                setMdnsStatus,
                setMdnsData,
                useMDNSScanner,
            }}>
            {props.children}
        </AppMDNSContext.Provider>
    )
}

export const useAppMDNSContext = () => {
    const context = useContext(AppMDNSContext)
    if (context === undefined) {
        throw new Error('useAppMDNSContext must be used within an AppMDNSProvider')
    }
    return context
}
