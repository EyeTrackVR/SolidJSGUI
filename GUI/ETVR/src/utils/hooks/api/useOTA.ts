import { appConfigDir, join } from '@tauri-apps/api/path'
import { upload } from 'tauri-plugin-upload-api'
import { endpoints } from '@src/store/api/selectors'
import { cameras } from '@src/store/camera/selectors'

/**
 * @description Uploads a firmware to a device
 * @returns doOTA - function that takes a firmware name and a device address and uploads the firmware to the device
 */
export const useOTA = async () => {
    const _endpoints = endpoints()
    const doOTA = async (firmwareName: string, device: string) => {
        const ota: string = _endpoints.get('ota')?.url ?? ''
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
