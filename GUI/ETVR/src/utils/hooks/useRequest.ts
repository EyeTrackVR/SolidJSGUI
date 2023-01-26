import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, createEffect } from 'solid-js'
import { endpoints } from '@src/store/api/selectors'
import { cameras } from '@src/store/mdns/selectors'

interface IProps {
    endpointName: string
    deviceName: string
    args?: string
}

export const useRequestHook = () => {
    const [data, setData] = createSignal({})
    const [loading, setLoading] = createSignal(false)
    const [error, setError] = createSignal<Error>()
    const _cameras = cameras()
    const _endpoints = endpoints()
    const doRequest = (props: IProps) => {
        createEffect(() => {
            let endpoint: string = _endpoints.get(props.endpointName)?.url ?? ''
            if (!_cameras.get(props.deviceName)) {
                setError(Error('No camera found'))
                return
            }

            if (props.args) {
                endpoint += props.args
            }
            setLoading(true)
            invoke('do_rest_request', {
                endpoint: endpoint,
                deviceName: _cameras.get(props.deviceName)?.address,
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
