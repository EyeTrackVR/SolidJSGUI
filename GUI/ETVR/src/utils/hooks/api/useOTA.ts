import { appConfigDir, join } from '@tauri-apps/api/path'
import { upload } from 'tauri-plugin-upload-api'
import type { IEndpoint } from '@src/static/types/interfaces'
import { cameras } from '@src/store/camera/selectors'
import { useAppAPIContext } from '@src/store/context/api'

/**
 * @description Uploads a firmware to a device
 * @returns doOTA - function that takes a firmware name and a device address and uploads the firmware to the device
 */
export const useOTA = async () => {
    const { getEndpoints } = useAppAPIContext()

    let endpoints: Map<string, IEndpoint> = new Map()

    if (getEndpoints) {
        endpoints = getEndpoints()
    }

    const doOTA = async (firmwareName: string, device: string) => {
        const ota: string = endpoints.get('ota')?.url ?? ''
        const camera = cameras().find((camera) => camera.address === device)
        if (!camera) {
            console.log('No camera found at that address')
            return
        }
        const server = camera.address + ota
        const path = await join(await appConfigDir(), firmwareName + '.bin')
        await upload(server, path)
    }
    return { doOTA }
}
