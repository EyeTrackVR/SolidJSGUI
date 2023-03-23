import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { getClient, ResponseType } from '@tauri-apps/api/http'
import { appConfigDir, join } from '@tauri-apps/api/path'
import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
import { createSignal } from 'solid-js'
import { download } from 'tauri-plugin-upload-api'
import { RESTStatus } from '@src/store/api/restAPI'
import { setFirmwareAssets, setGHRestStatus, setFirmwareVersion } from '@store/api/ghAPI'
import { ghRESTEndpoint, firmwareAssets, firmwareVersion } from '@store/api/selectors'

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

        // parse out the file name from the firmwareAsset.url and append it to the appConfigDirPath
        const fileName = firmwareAsset.url.split('/')[firmwareAsset.url.split('/').length - 1]
        //console.log('[Github Release]: File Name: ', fileName)
        // ${appConfigDirPath}${fileName}
        const path = await join(appConfigDirPath, fileName)
        console.log('[Github Release]: Path: ', path)
        // get the latest release
        const response = await download(
            firmwareAsset.url,
            path,
            (progress, total) =>
                console.log(`[Github Release]: Downloaded ${progress} of ${total} bytes`), // a callback that will be called with the upload progress
        )

        const res = await invoke('unzip_archive', {
            archivePath: path,
            targetDir: appConfigDirPath,
        })

        console.log('[Github Release]: Unzip Response: ', res)

        const manifest = await readTextFile('manifest.json', { dir: BaseDirectory.AppConfig })

        const config_json = JSON.parse(manifest)
        console.log('[Github Release]: Manifest: ', config_json)

        if (manifest !== '') {
            const builds = config_json['builds'].map((build) => {
                const parts = build['parts'].map(async (part) => {
                    const firmwarePath = await join(appConfigDirPath, part['path'])
                    console.log('[Github Release]: Firmware Path: ', firmwarePath)
                    const firmwareSrc = convertFileSrc(firmwarePath)
                    console.log('[Github Release]: Firmware Src: ', firmwareSrc)
                    return { ...part, path: firmwareSrc }
                })
                return { ...build, parts }
            })

            const build = await builds
            console.log('[Github Release]: Firmware Version: ', firmwareVersion())
            const newConfig = { version: firmwareVersion(), ...config_json, builds: build }

            // write the config file
            writeTextFile('manifest.json', JSON.stringify(newConfig), {
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

            return
        }
        return response
    }
}

/**
 * @description A hook that will return the data from the github release endpoint and a function that will download the asset from the github release endpoint
 * @returns  {object} data - The data returned from the github release endpoint
 * @returns  {function} downloadAsset - The function that will download the asset from the github release endpoint
 */
export const useGHRelease = () => {
    const [data, setData] = createSignal({})
    const downloadAsset = async (firmware: string) => {
        const response = await getRelease(firmware)

        if (typeof response === 'string') {
            setGHRestStatus(RESTStatus.ACTIVE)
            const parsedResponse = JSON.parse(response)
            setData((prevData) => ({
                ...prevData,
                ...parsedResponse,
            }))
        }
    }

    return { data, downloadAsset }
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
        setFirmwareAssets({ name: boardName[i], url: download_urls[i] })
    }

    if (update) {
        // parse out the assets and the version from the ghRestState
        // write the config file
        const config = {
            version: firmwareVersion(),
            assets: firmwareAssets(),
        }
        writeTextFile('config.json', JSON.stringify(config), {
            dir: BaseDirectory.AppConfig,
        })
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
