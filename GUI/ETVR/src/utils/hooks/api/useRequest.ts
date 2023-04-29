import { invoke } from '@tauri-apps/api/tauri'
import { createSignal, createEffect } from 'solid-js'
import type { IEndpoint } from '@src/static/types/interfaces'
import { RESTStatus } from '@src/static/types/enums'
import { cameras } from '@src/store/camera/selectors'
import { useAppAPIContext } from '@src/store/context/api'

interface IProps {
    endpointName: string
    deviceName: string
    args?: string
}

export const useRequestHook = async () => {
    const { getEndpoints, setRESTStatus } = useAppAPIContext()

    let endpoints: Map<string, IEndpoint> = new Map()
    let setRestStatus: (status: RESTStatus) => void = () => {
        return
    }

    if (getEndpoints) {
        endpoints = getEndpoints()
    }

    if (setRESTStatus) {
        setRestStatus = setRESTStatus
    }

    const [data, setData] = createSignal({})
    const doRequest = (props: IProps) => {
        createEffect(() => {
            let endpoint: string = endpoints.get(props.endpointName)?.url ?? ''
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
                method: endpoints.get(props.endpointName)?.type,
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
