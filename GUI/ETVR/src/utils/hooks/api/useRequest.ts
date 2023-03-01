import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, createEffect, createResource } from 'solid-js'
import { setRestStatus, RESTStatus } from '@src/store/api/restAPI'
import { endpoints } from '@src/store/api/selectors'
import { cameras } from '@src/store/camera/selectors'

interface IProps {
    endpointName: string
    deviceName: string
    args?: string
}

export const useRequestHook = async () => {
    const [data, setData] = createSignal({})
    const _endpoints = endpoints()
    const doRequest = (props: IProps) => {
        createEffect(() => {
            let endpoint: string = _endpoints.get(props.endpointName)?.url ?? ''
            const camera = cameras().find((camera) => camera.address === props.deviceName)
            if (!camera) {
                setRestStatus(RESTStatus.NO_CAMERA)
                console.log('No camera found at that address')
                return
            }

            if (props.args) {
                endpoint += props.args
            }
            setRestStatus(RESTStatus.LOADING)
            invoke('do_rest_request', {
                endpoint: endpoint,
                deviceName: camera?.address,
                method: _endpoints.get(props.endpointName)?.type,
            })
                .then((response) => {
                    if (typeof response === 'string') {
                        setRestStatus(RESTStatus.ACTIVE)
                        const parsedResponse = JSON.parse(response)
                        setData((prevData) => ({
                            ...prevData,
                            ...parsedResponse,
                        }))
                    }
                })
                .catch((err) => {
                    setRestStatus(RESTStatus.FAILED)
                    console.log(err)
                })
                .finally(() => {
                    setRestStatus(RESTStatus.COMPLETE)
                })
        })
    }
    return { data, doRequest }
}
