import { invoke } from '@tauri-apps/api/tauri'
import { identity, pipe } from 'fp-ts/lib/function'
import { createContext, useContext, createMemo, type Component, Accessor } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { debug, error } from 'tauri-plugin-log-api'
import { useAppContext } from '../app'
import { useAppCameraContext } from '../camera'
import type { Context } from '@static/types'
import type { AppStoreMdns, MdnsResponse } from '@static/types/interfaces'
import { O } from '@static/types'
import { MdnsStatus } from '@static/types/enums'

interface AppMDNSContext {
    getMdnsStatus: Accessor<MdnsStatus>
    getMdnsData: Accessor<MdnsResponse>
    setMdnsStatus: (status: MdnsStatus) => void
    setMdnsData: (data: MdnsResponse) => void
    useMDNSScanner: (serviceType: string, scanTime: number) => Promise<MdnsResponse>
    //useMDNSScanner: (serviceType: string, scanTime: number) => Promise<O.Option<MdnsResponse>>
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

    const MDNSScanner = async (
        serviceType: string,
        scanTime: number,
    ): Promise<O.Option<MdnsResponse>> => {
        try {
            if (!getEnableMDNS()) {
                error('[MDNS Scanner]: MDNS is disabled')
                return O.none
            }
            if (serviceType === '' || scanTime === 0) {
                error('[MDNS Scanner]: serviceType or scanTime is empty')
                return O.none
            }
            debug(`[MDNS Scanner]: scanning for ${serviceType} for ${scanTime} seconds`)
            setMdnsStatus(MdnsStatus.LOADING)

            const res = await invoke('run_mdns_query', {
                serviceType,
                scanTime,
            })

            debug(`[MDNS Scanner]: response - ${res}`)
            const response = res as MdnsResponse
            setMdnsStatus(MdnsStatus.ACTIVE)
            setMdnsData(response)
            // loop through the res and add the cameras to the store
            const size = Object.keys(response.names).length
            for (let i = 0; i < size; i++) {
                // grab the unknown key and use it to access the res.urls object
                const key = Object.keys(response.names)[i]
                debug('[MDNS Scanner]: adding camera', response.names[key])
                const address = `http://${response.names[key]}.local`
                setAddCameraMDNS(address)
            }
            return O.some(response)
        } catch (err) {
            error(`[MDNS Scanner]: error ${err}`)
            setMdnsStatus(MdnsStatus.FAILED)
            return O.none
        }
    }

    const useMDNSScanner = async (serviceType: string, scanTime: number) => {
        const res = await MDNSScanner(serviceType, scanTime)
        return pipe(
            res,
            O.match(() => {
                error('[MDNS Scanner]: no cameras found')
                return {
                    ips: [],
                    names: [],
                }
            }, identity),
        )
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
