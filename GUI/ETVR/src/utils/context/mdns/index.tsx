/**
 * @file index.tsx
 * @description Mdns context provider.
 * @note This is an example of how to use the context api.
 * @example <MdnsProvider scan={true}>{children}</MdnsProvider>
 */
import { createEffect, createContext, JSX, useContext } from 'solid-js'
import { useMDNSScanner } from '@utils/hooks/api/useMDNSScanner'

interface IMdnsContext {
    local_data: string
    local_mutate: any
    local_refetch: any
    local_resData: any
    local_setResData: any
}

export const MdnsContext = createContext<IMdnsContext>()

export const MdnsProvider = (props: {
    children:
        | number
        | boolean
        | Node
        | JSX.ArrayElement
        | JSX.FunctionElement
        | (string & object)
        | null
        | undefined
    scan: boolean
}) => {
    let local_data, local_mutate, local_refetch, local_resData, local_setResData

    createEffect(() => {
        if (!props.children) {
            return null
        }

        if (props.scan) {
            const { data, mutate, refetch, setService, setScanTime } = useMDNSScanner()
            setService('_openiristracker._tcp')
            setScanTime(30)

            local_data = data
            local_mutate = mutate
            local_refetch = refetch

            return () => {
                local_data = null
                local_mutate = null
                local_refetch = null
                local_resData = null
                local_setResData = null
            }
        }
    })
    return (
        <MdnsContext.Provider
            value={{ local_data, local_mutate, local_refetch, local_resData, local_setResData }}>
            {props.children}
        </MdnsContext.Provider>
    )
}

export const useMdns = () => {
    return useContext(MdnsContext)
}
