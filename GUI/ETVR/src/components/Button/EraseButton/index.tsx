import { ask } from '@tauri-apps/api/dialog'
import { removeFile } from '@tauri-apps/api/fs'
import { appConfigDir, join } from '@tauri-apps/api/path'
import Button from '..'
import { addNotification, ENotificationType } from '@hooks/notifications'
import { getGlobalNotificationsType } from '@store/app/settings/selectors'

export const EraseButton = () => {
    const erase = async () => {
        const appConfigPath = await appConfigDir()
        const firmwarePath = await join(appConfigPath, 'merged-firmware.bin')
        const manifestPath = await join(appConfigPath, 'manifest.json')
        await removeFile(firmwarePath)
        await removeFile(manifestPath)
    }

    return (
        <Button
            color="#f44336"
            shadow="0 0 10px #f44336"
            text="Erase Firmware Assets"
            onClick={() => {
                ask('This action cannot be reverted. Are you sure?', {
                    title: 'EyeTrackVR Erase Firmware Assets',
                    type: 'warning',
                }).then((res) => {
                    if (res) {
                        erase()
                            .then(() => {
                                console.log('[Erasing Firmware Assets]: Erased')
                                addNotification({
                                    title: 'ETVR Firmware Assets Erased',
                                    message:
                                        'The firmware assets have been erased from your system.',
                                    action: getGlobalNotificationsType(),
                                    type: ENotificationType.SUCCESS,
                                })
                            })
                            .catch((err) => {
                                console.error(err)
                                addNotification({
                                    title: 'ETVR Firmware Assets Erase Failed',
                                    message:
                                        'The firmware assets could not be erased from your system.',
                                    action: getGlobalNotificationsType(),
                                    type: ENotificationType.ERROR,
                                })
                            })
                    }
                })
            }}
        />
    )
}
