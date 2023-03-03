import { createContext, JSX } from 'solid-js'
import { useMDNSScanner } from '@utils/hooks/api/useMDNSScanner'

export const MdnsContext = createContext()

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
}) => {
    const { data, mutate, refetch, resData, setResData } = useMDNSScanner('openiristracker', 30)
    return (
        <MdnsContext.Provider value={{ data, mutate, refetch, resData, setResData }}>
            {props.children}
        </MdnsContext.Provider>
    )
}
