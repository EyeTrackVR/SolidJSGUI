import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, createEffect } from 'solid-js'
import { endpoints } from '@src/store/api/selectors'
import { cameras } from '@src/store/mdns/selectors'

interface IProps {
    endpointName: string
    deviceName: string
}

export const useRequestHook = () => {
    const [data, setData] = createSignal({})
    const [loading, setLoading] = createSignal(false)
    const [error, setError] = createSignal(null)
    const _cameras = cameras()
    const _endpoints = endpoints()
    const doRequest = (props: IProps) => {
        createEffect(() => {
            setLoading(true)
            invoke('do_rest_request', {
                endpoint: _endpoints.get(props.endpointName)?.url,
                deviceName: _cameras[props.deviceName].address,
                method: _endpoints.get(props.endpointName)?.type,
            })
                .then((response) => {
                    if (typeof response === 'string') {
                        const parsedResponse = JSON.parse(response)
                        setData((prevData) => ({
                            ...prevData,
                            ...parsedResponse,
                        }))
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setError(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        })
    }
    return { data, loading, error, doRequest }
}
