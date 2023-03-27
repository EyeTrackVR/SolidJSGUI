import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { getClient, ResponseType } from '@tauri-apps/api/http'
import { addNotification, ENotificationType } from '@hooks/notifications'
import { setFirmwareAssets, setGHRestStatus, setFirmwareVersion } from '@store/api/ghAPI'
import { RESTStatus } from '@store/api/restAPI'
import { ghRESTEndpoint, firmwareAssets, firmwareVersion } from '@store/api/selectors'
import { getGlobalNotificationsType } from '@store/app/settings/selectors'

// TODO: Implement a way to read if the merged-firmware.bin file and manifest.json file exists in the app config directory and if it does, then use that instead of downloading the firmware from github
// Note: If both files are present, we should early return and set a UI store value that will be used to display a message to the user that they can use the firmware that is already downloadedand show an optional button to erase the firmware

//TODO: Add notifications to all the console.log statements

interface IGHRelease {
    data: object
    headers: object
    rawHeaders: object
    ok: boolean
    status: number
    url: string
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
