import { invoke } from '@tauri-apps/api/tauri'
import { createSignal } from 'solid-js'
import { endpoints } from '@src/store/api/selectors'
import { cameras } from '@src/store/mdns/selectors'

export function useChartRequestHook() {
    const [data, setData] = createSignal({})
    const [loading, setLoading] = createSignal(false)
    const [error, setError] = createSignal(null)
    function doRequest() {
        cameras().forEach((data) => {
            setLoading(true)
            invoke('do_rest_request', {
                endpoint: data.address + data['endpoint'],
                //deviceName: chartData['deviceName'],
                method: 'GET',
            })
                .then((response) => {
                    if (typeof response === 'string') {
                        const parsedResponse = JSON.parse(response)
                        setData((prevData) => ({
                            ...prevData,
                            [data['msg']]: parsedResponse,
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
