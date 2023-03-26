import { appConfigDir, join } from '@tauri-apps/api/path'
import { invoke } from '@tauri-apps/api/tauri'
import Button from '..'
import { addNotification, ENotificationType, ENotificationAction } from '@hooks/notifications'

// TODO: Implement a boolean that retuns true if the files are present - use this to disable the button to prevent runtime errors

export const EraseButton = () => {
    const erase = async () => {
        const appConfigPath = await appConfigDir()
        const firmwarePath = await join(appConfigPath, 'merged-firmware.bin')
        const manifestPath = await join(appConfigPath, 'manifest.json')
        //await invoke('remove_archive', { archivePath: firmwarePath })
        //await invoke('remove_archive', { archivePath: manifestPath })
    }

    return (
        <Button
            color="#f44336"
            shadow="0 0 10px #f44336"
            text="Erase Firmware Assets"
            onClick={() => {
                erase().then(() => {
                    console.log('[Erasing Firmware Assets]: Erased')
                    addNotification(
                        {
                            title: 'ETVR Firmware Assets Erased',
                            message: 'The firmware assets have been erased from your system.',
                            type: ENotificationType.SUCCESS,
                        },
                        ENotificationAction.APP,
                    )
                })
            }}
        />
    )
}
