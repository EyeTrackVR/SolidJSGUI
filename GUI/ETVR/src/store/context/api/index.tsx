import { removeFile, readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { getClient, ResponseType } from '@tauri-apps/api/http'
import { appConfigDir, join } from '@tauri-apps/api/path'
import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
import { createContext, useContext, createMemo, type Component, Accessor } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { download } from 'tauri-plugin-upload-api'
import { useAppNotificationsContext } from '../notifications'
import type { Context } from '@static/types'
import { AppStoreAPI, IEndpoint, IGHAsset, IGHRelease } from '@src/static/types/interfaces'
import { ENotificationType, RESTStatus, RESTType } from '@static/types/enums'

interface AppAPIContext {
    /********************************* gh rest *************************************/
    getGHRestStatus?: Accessor<RESTStatus>
    getFirmwareAssets?: Accessor<IGHAsset[]>
    getFirmwareVersion?: Accessor<string>
    getGHEndpoint?: Accessor<string>
    setGHRestStatus?: (status: RESTStatus) => void
    setFirmwareAssets?: (assets: IGHAsset) => void
    setFirmwareVersion?: (version: string) => void
    /********************************* rest *************************************/
    getRESTStatus?: Accessor<RESTStatus>
    getRESTDevice?: Accessor<string>
    getRESTResponse?: Accessor<object>
    setRESTStatus?: (status: RESTStatus) => void
    setRESTDevice?: (device: string) => void
    setRESTResponse?: (response: object) => void
    /********************************* endpoints *************************************/
    getEndpoints?: Accessor<Map<string, IEndpoint>>
    getEndpoint?: (key: string) => IEndpoint | undefined
    /********************************* hooks *************************************/
    downloadAsset?: (firmware: string) => Promise<void>
    doGHRequest: () => void
}

const AppAPIContext = createContext<AppAPIContext>()
export const AppAPIProvider: Component<Context> = (props) => {
    const { addNotification } = useAppNotificationsContext()
    const ghEndpoint = 'https://api.github.com/repos/lorow/OpenIris/releases/latest'
    const endpointsMap: Map<string, IEndpoint> = new Map<string, IEndpoint>([
        ['ping', { url: ':81/control/command/ping', type: RESTType.GET }],
        ['save', { url: ':81/control/command/save', type: RESTType.GET }],
        ['resetConfig', { url: ':81/control/command/resetConfig', type: RESTType.GET }],
        ['rebootDevice', { url: ':81/control/command/rebootDevice', type: RESTType.GET }],
        ['restartCamera', { url: ':81/control/command/restartCamera', type: RESTType.GET }],
        ['getStoredConfig', { url: ':81/control/command/getStoredConfig', type: RESTType.GET }],
        ['setTxPower', { url: ':81/control/command/setTxPower', type: RESTType.POST }],
        ['setDevice', { url: ':81/control/command/setDevice', type: RESTType.POST }],
        ['wifi', { url: ':81/control/command/wifi', type: RESTType.POST }],
        ['wifiStrength', { url: ':81/control/command/wifiStrength', type: RESTType.POST }],
        ['ota', { url: ':81/update', type: RESTType.POST }],
    ])

    const defaultState: AppStoreAPI = {
        restAPI: {
            status: RESTStatus.COMPLETE,
            device: '',
            response: {},
        },
        ghAPI: {
            status: RESTStatus.COMPLETE,
            assets: [],
            version: '',
        },
    }

    const [state, setState] = createStore<AppStoreAPI>(defaultState)
    const apiState = createMemo(() => state)

    /********************************* gh rest *************************************/
    //#region gh rest
    const setGHRestStatus = (status: RESTStatus) => {
        setState(
            produce((s) => {
                s.ghAPI.status = status
            }),
        )
    }
    const setFirmwareAssets = (assets: IGHAsset) => {
        setState(
            produce((s) => {
                s.ghAPI.assets.push(assets)
            }),
        )
    }
    const setFirmwareVersion = (version: string) => {
        setState(
            produce((s) => {
                s.ghAPI.version = version
            }),
        )
    }
    const getGHRestStatus = createMemo(() => apiState().ghAPI.status)
    const getFirmwareAssets = createMemo(() => apiState().ghAPI.assets)
    const getFirmwareVersion = createMemo(() => apiState().ghAPI.version)
    const getGHEndpoint = createMemo(() => ghEndpoint)
    //#endregion
    /********************************* rest *************************************/
    //#region rest
    const setRESTStatus = (status: RESTStatus) => {
        setState(
            produce((s) => {
                s.restAPI.status = status
            }),
        )
    }
    const setRESTDevice = (device: string) => {
        setState(
            produce((s) => {
                s.restAPI.device = device
            }),
        )
    }
    const setRESTResponse = (response: object) => {
        setState(
            produce((s) => {
                s.restAPI.response = response
            }),
        )
    }
    const getRESTStatus = createMemo(() => apiState().restAPI.status)
    const getRESTDevice = createMemo(() => apiState().restAPI.device)
    const getRESTResponse = createMemo(() => apiState().restAPI.response)
    const getEndpoints = createMemo(() => endpointsMap)
    const getEndpoint = (key: string) => endpointsMap.get(key)
    //#endregion

    //#region hooks
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getRelease = async (firmware: string) => {
        const appConfigDirPath = await appConfigDir()
        if (firmware === '') {
            addNotification({
                title: 'Please Select a Firmware',
                message: 'A firmware must be selected before downloading',
                type: ENotificationType.WARNING,
            })
            console.log('[Github Release]: No firmware selected')
            return
        }

        console.log('[Github Release]: App Config Dir: ', appConfigDirPath)

        // check if the firmware chosen matches the one names in the firmwareAssets array of objects
        const firmwareAsset = getFirmwareAssets().find((asset) => asset.name === firmware)

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

            addNotification({
                title: 'ETVR Firmware Downloaded',
                message: `Downloaded Firmware ${firmware}`,
                type: ENotificationType.INFO,
            })

            const res = await invoke('unzip_archive', {
                archivePath: path,
                targetDir: appConfigDirPath,
            })
            await removeFile(path)

            console.log('[Github Release]: Unzip Response: ', res)

            const manifest = await readTextFile('manifest.json', { dir: BaseDirectory.AppConfig })

            const config_json = JSON.parse(manifest)

            if (manifest !== '') {
                // modify the version property
                config_json['version'] = getFirmwareVersion()
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
     * @returns  {(firmware: string) => Promise<void>} data - The data returned from the github release endpoint
     * @returns  {function} downloadAsset - The function that will download the asset from the github release endpoint
     */
    const downloadAsset = async (firmware: string) => {
        const response = await getRelease(firmware)
        console.log('[Github Release]: Download Response: ', response)
    }

    // TODO: Implement a way to read if the merged-firmware.bin file and manifest.json file exists in the app config directory and if it does, then use that instead of downloading the firmware from github
    // Note: If both files are present, we should early return and set a UI store value that will be used to display a message to the user that they can use the firmware that is already downloadedand show an optional button to erase the firmware

    //TODO: Add notifications to all the console.log statements

    const setGHData = (data: IGHRelease, update: boolean) => {
        if (data['name'] === undefined) {
            setFirmwareVersion(data['version'])
        } else {
            setFirmwareVersion(data['name'])
        }
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
                    version: getFirmwareVersion(),
                    assets: getFirmwareAssets(),
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
    const doGHRequest = () => {
        getClient()
            .then((client) => {
                setGHRestStatus(RESTStatus.ACTIVE)
                setGHRestStatus(RESTStatus.LOADING)
                client
                    .get<IGHRelease>(getGHEndpoint(), {
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
                                        console.log(
                                            '[Config Exists]: Config Exists and is up to date',
                                        )
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
                                    console.error(
                                        '[Config Read Error]:',
                                        err,
                                        'Creating config.json',
                                    )
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
    //#endregion

    return (
        <AppAPIContext.Provider
            value={{
                getGHRestStatus,
                getFirmwareAssets,
                getFirmwareVersion,
                getGHEndpoint,
                setGHRestStatus,
                setFirmwareAssets,
                setFirmwareVersion,
                getRESTStatus,
                getRESTDevice,
                getRESTResponse,
                setRESTStatus,
                setRESTDevice,
                setRESTResponse,
                getEndpoints,
                getEndpoint,
                downloadAsset,
                doGHRequest,
            }}>
            {props.children}
        </AppAPIContext.Provider>
    )
}

export const useAppAPIContext = () => {
    const context = useContext(AppAPIContext)
    if (context === undefined) {
        throw new Error('useAppAPIContext must be used within an AppAPIProvider')
    }
    return context
}
