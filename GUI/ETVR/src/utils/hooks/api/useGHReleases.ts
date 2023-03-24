import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { getClient, ResponseType } from '@tauri-apps/api/http'
import { appConfigDir, join } from '@tauri-apps/api/path'
import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
import { download } from 'tauri-plugin-upload-api'
import { addNotification, ENotificationType, ENotificationAction } from '@hooks/notifications'
import { setFirmwareAssets, setGHRestStatus, setFirmwareVersion } from '@store/api/ghAPI'
import { RESTStatus } from '@store/api/restAPI'
import { ghRESTEndpoint, firmwareAssets, firmwareVersion } from '@store/api/selectors'
import { setProgressBar } from '@store/ui/ui'

interface IGHRelease {
    data: object
    headers: object
    rawHeaders: object
    ok: boolean
    status: number
    url: string
}

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
                // UI store set prgoress bar to true and set progress
                const download_percent = Math.round((progress / total) * 100)
                setProgressBar(download_percent, `Downloading Firmware ${firmware}`, true)
                console.log(`[Github Release]: Downloaded ${progress} of ${total} bytes`)
            },
        )
        setProgressBar(0, '', false)
        console.log('[Github Release]: Download Response: ', response)

        addNotification(
            {
                title: 'ETVR Firmware Downloaded',
                message: `Downloaded Firmware ${firmware}`,
                type: ENotificationType.INFO,
            },
            ENotificationAction.OS,
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
export const useGHRelease = () => {
    const downloadAsset = async (firmware: string) => {
        const response = await getRelease(firmware)
        console.log('[Github Release]: Download Response: ', response)
    }
    return downloadAsset
}

const setGHData = (data: IGHRelease, update: boolean) => {
    setFirmwareVersion(data['name'])
    const assets = data['assets']
    const download_urls = assets.map((asset) => asset.browser_download_url)

    const firmware_assets = assets.map((asset) => asset.name)

    // split the firmware_assets array of strings on the first dash and return the first element of the array
    const boardName = firmware_assets.map((asset) => asset.split('-')[0])

    // set the board name in the store
    for (let i = 0; i < boardName.length; i++) {
        //console.log('[Github Release]: Board Name: ', boardName[i])
        //console.log('[Github Release]: URLs: ', download_urls[i])
        setFirmwareAssets({ name: boardName[i], browser_download_url: download_urls[i] })
    }

    if (update) {
        writeTextFile(
            'config.json',
            JSON.stringify({
                version: firmwareVersion(),
                assets: firmwareAssets(),
            }),
            {
                dir: BaseDirectory.AppConfig,
            },
        )
            .then(() => {
                console.log(
                    update
                        ? '[Config Updated]: Config Updated Successfully'
                        : '[Config Created]: Config Created Successfully',
                )
            })
            .catch((err) => {
                console.error('[Config Creation Error]:', err)
            })
    }
}

/**
 * @description Invoke the do_gh_request command
 * @function doGHRequest
 * @async
 * @export
 * @note This function will call the github repo REST API release endpoint and update/create a config.json file with the latest release data
 * @note This function will write the file to the app config directory C:\Users\<User>\AppData\Roaming\com.eyetrackvr.dev\config.json
 * @note Should be called on app start
 * @example
 * import { doGHRequest } from './github'
 * doGHRequest()
 * .then(() => console.log('Request sent'))
 * .catch((err) => console.error(err))
 */
export const doGHRequest = () => {
    getClient()
        .then((client) => {
            setGHRestStatus(RESTStatus.ACTIVE)
            setGHRestStatus(RESTStatus.LOADING)
            client
                .get<IGHRelease>(ghRESTEndpoint(), {
                    timeout: 30,
                    // the expected response type
                    responseType: ResponseType.JSON,
                })
                .then((response) => {
                    if (response.ok) console.log('[OpenIris Version]: ', response.data['name'])
                    readTextFile('config.json', { dir: BaseDirectory.AppConfig })
                        .then((config) => {
                            const config_json = JSON.parse(config)
                            console.log(config_json)
                            if (response instanceof Object) {
                                if (response.ok) {
                                    if (config !== '') {
                                        if (response.data['name'] !== config_json.version) {
                                            // update config
                                            setGHData(response.data, true)
                                            console.log(
                                                '[Config Exists]: Config Exists and is out of date - Updating',
                                            )
                                            setGHRestStatus(RESTStatus.COMPLETE)
                                            return
                                        }
                                    }
                                    console.log('[Config Exists]: Config Exists and is up to date')
                                    setGHData(response.data, false)
                                    return
                                }
                            }
                            console.warn('[Config Exists]: Most likely rate limited')
                            setGHData(config_json, false)
                            setGHRestStatus(RESTStatus.COMPLETE)
                        })
                        .catch((err) => {
                            setGHRestStatus(RESTStatus.NO_CONFIG)
                            if (response.ok) {
                                console.error('[Config Read Error]:', err, 'Creating config.json')
                                setGHData(response.data, true)
                                setGHRestStatus(RESTStatus.COMPLETE)
                            }
                        })
                })
                .catch((err) => {
                    setGHRestStatus(RESTStatus.FAILED)
                    console.error('[Github Release Error]:', err)
                    readTextFile('config.json', { dir: BaseDirectory.AppConfig })
                        .then((config) => {
                            const config_json = JSON.parse(config)
                            console.log('[OpenIris Version]: ', config_json.version)
                            console.log(config_json)
                            if (config !== '') {
                                console.log('[Config Exists]: Config Exists and is up to date')
                                setGHData(config_json, false)
                                return
                            }
                            setGHRestStatus(RESTStatus.NO_CONFIG)
                        })
                        .catch((err) => {
                            setGHRestStatus(RESTStatus.NO_CONFIG)
                            console.error('[Config Read Error]:', err)
                        })
                    // check if the error is a rate limit error
                    /* if (err instanceof Object) {
                        if (err.response instanceof Object) {
                            if (err.response.status === 403) {
                                // rate limit error
                                // check if the rate limit reset time is in the future
                                // if it is, set the rate limit reset time
                                // if it isn't, set the rate limit reset time to 0
                                const rate_limit_reset = err.response.headers['x-ratelimit-reset']
                                const rate_limit_reset_time = new Date(rate_limit_reset * 1000)
                                const now = new Date()
                                if (rate_limit_reset_time > now) {
                                    setRateLimitReset(rate_limit_reset_time)
                                    return
                                }
                                setRateLimitReset(new Date(0))
                            }
                        }
                    } */
                })
        })
        .catch((err) => {
            setGHRestStatus(RESTStatus.FAILED)
            console.error('[Tauri Runtime Error - http client]:', err)
        })
}
