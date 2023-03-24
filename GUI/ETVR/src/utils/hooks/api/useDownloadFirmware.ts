import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { appConfigDir, join } from '@tauri-apps/api/path'
import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
import { download } from 'tauri-plugin-upload-api'
import { addNotification, ENotificationType, ENotificationAction } from '@hooks/notifications'
import { firmwareAssets, firmwareVersion } from '@store/api/selectors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRelease = async (firmware: string) => {
    const appConfigDirPath = await appConfigDir()
    if (firmware === '') {
        // TODO: notify user to select a firmware
        console.log('[Github Release]: No firmware selected')
        return
    }

    console.log('[Github Release]: App Config Dir: ', appConfigDirPath)

    // check if the firmware chosen matches the one names in the firmwareAssets array of objects
    const firmwareAsset = firmwareAssets().find((asset) => asset.name === firmware)

    console.log('[Github Release]: Firmware Asset: ', firmwareAsset)

    if (firmwareAsset) {
        console.log('[Github Release]: Downloading firmware: ', firmware)
        console.log('[Github Release]: Firmware URL: ', firmwareAsset)

        // parse out the file name from the firmwareAsset.url and append it to the appConfigDirPath
        const fileName =
            firmwareAsset.browser_download_url.split('/')[
                firmwareAsset.browser_download_url.split('/').length - 1
            ]
        //console.log('[Github Release]: File Name: ', fileName)
        // ${appConfigDirPath}${fileName}
        const path = await join(appConfigDirPath, fileName)
        console.log('[Github Release]: Path: ', path)
        // get the latest release
        const response = await download(
            firmwareAsset.browser_download_url,
            path,
            (progress, total) => {
                console.log(`[Github Release]: Downloaded ${progress} of ${total} bytes`)
            },
        )
        console.log('[Github Release]: Download Response: ', response)

        addNotification(
            {
                title: 'ETVR Firmware Downloaded',
                message: `Downloaded Firmware ${firmware}`,
                type: ENotificationType.INFO,
            },
            ENotificationAction.APP,
        )

        const res = await invoke('unzip_archive', {
            archivePath: path,
            targetDir: appConfigDirPath,
        })

        console.log('[Github Release]: Unzip Response: ', res)

        const manifest = await readTextFile('manifest.json', { dir: BaseDirectory.AppConfig })

        const config_json = JSON.parse(manifest)

        if (manifest !== '') {
            // modify the version property
            config_json['version'] = firmwareVersion()
            // loop through the builds array and the parts array and update the path property
            for (let i = 0; i < config_json['builds'].length; i++) {
                for (let j = 0; j < config_json['builds'][i]['parts'].length; j++) {
                    const firmwarePath = await join(
                        appConfigDirPath,
                        config_json['builds'][i]['parts'][j]['path'],
                    )
                    console.log('[Github Release]: Firmware Path: ', firmwarePath)
                    const firmwareSrc = convertFileSrc(firmwarePath)
                    console.log('[Github Release]: Firmware Src: ', firmwareSrc)
                    config_json['builds'][i]['parts'][j]['path'] = firmwareSrc
                }
            }

            // write the config file
            writeTextFile('manifest.json', JSON.stringify(config_json), {
                dir: BaseDirectory.AppConfig,
            })
                .then(() => {
                    console.log('[Manifest Updated]: Manifest Updated Successfully')
                })
                .finally(() => {
                    console.log('[Manifest Updated]: Finished')
                })
                .catch((err) => {
                    console.error('[Manifest Update Error]: ', err)
                })

            console.log('[Github Release]: Manifest: ', config_json)
            return
        }
    }
}

/**
 * @description A hook that will return the data from the github release endpoint and a function that will download the asset from the github release endpoint
 * @returns  {object} data - The data returned from the github release endpoint
 * @returns  {function} downloadAsset - The function that will download the asset from the github release endpoint
 */
export const useDownloadFirmware = () => {
    const downloadAsset = async (firmware: string) => {
        const response = await getRelease(firmware)
        console.log('[Github Release]: Download Response: ', response)
    }
    return downloadAsset
}
