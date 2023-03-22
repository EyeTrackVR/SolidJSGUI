import { readTextFile, BaseDirectory, writeTextFile } from '@tauri-apps/api/fs'
import { getClient, ResponseType } from '@tauri-apps/api/http'
import { Command } from '@tauri-apps/api/shell'
import { createSignal, createMemo, createResource } from 'solid-js'
import { RESTStatus } from '@src/store/api/restAPI'
import {
    setFirmwareAssets,
    setGHRestStatus,
    setFirmwareVersion,
    ghRestState,
} from '@store/api/ghAPI'
import { ghRESTEndpoint } from '@store/api/selectors'

interface IGHRelease {
    data: object
    headers: object
    rawHeaders: object
    ok: boolean
    status: number
    url: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRelease = async (source, { value, refetching }) => {
    const { firmware, debug } = source
    if (firmware === '') {
        // TODO: notify user to select a firmware
        console.log('[Github Release]: No firmware selected')
        return
    }
    console.log('[Github Release]: Downloading firmware: ', firmware)

    const command = Command.sidecar('binaries/dra', [
        'download',
        '--select',
        'esp32AIThinker-v1.0.9-master.zip',
        'lorow/OpenIris',
    ])
    const output = await command.execute()
    return output
}

export const useGHRelease = () => {
    const [firmware, setFirmware] = createSignal<string>('')
    const [debug, setDebug] = createSignal<boolean>(false)

    const githubInitState = createMemo(() => ({
        firmware: firmware(),
        debug: debug(),
    }))
    const [data, { mutate, refetch }] = createResource(githubInitState, getRelease)
    return { data, mutate, refetch, setFirmware, setDebug }
}

const setGHData = (data: IGHRelease, exists: boolean) => {
    setFirmwareVersion(data['name'])
    const assets = data['assets']
    const firmware_assets = assets.map((asset) => asset.name)
    setFirmwareAssets(firmware_assets)
    //console.log('[Firmware Assets]: ', firmware_assets)
    writeTextFile('config.json', JSON.stringify(ghRestState()), {
        dir: BaseDirectory.AppConfig,
    })
        .then(() => {
            console.log(
                exists
                    ? '[Config Updated]: Config Updated Successfully'
                    : '[Config Created]: Config Created Successfully',
            )
        })
        .catch((err) => {
            console.error('[Config Creation Error]:', err)
        })
}

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
                    //console.log(response)
                    console.log('[OpenIris Version]: ', response.data['name'])

                    // parse the response for the name of the release, the id, and the download urls of the assets

                    readTextFile('config.json', { dir: BaseDirectory.AppConfig })
                        .then((config) => {
                            const config_json = JSON.parse(config)
                            console.log(config_json)

                            if (config !== '') {
                                // parse config
                                // check if release is newer
                                // if it is, update config
                                // if it isn't, do nothing

                                if (response instanceof Object) {
                                    if (response.data['name'] !== config_json.version) {
                                        // update config
                                        setGHData(response.data, true)
                                    }
                                }
                                console.log('[Config Exists]: Config Exists and is up to date')
                                setGHRestStatus(RESTStatus.COMPLETE)
                                return
                            }
                            // if config is empty
                            // create config
                            // write config
                            setGHData(response.data, true)
                            setGHRestStatus(RESTStatus.COMPLETE)
                        })
                        .catch((err) => {
                            // config file doesn't exist
                            // create config
                            // write config
                            setGHRestStatus(RESTStatus.NO_CONFIG)
                            console.error('[Config Read Error]:', err, 'Creating config.json')
                            setGHData(response.data, false)
                            setGHRestStatus(RESTStatus.COMPLETE)
                        })
                })
                .catch((err) => {
                    setGHRestStatus(RESTStatus.FAILED)
                    console.error('[Github Release Error]:', err)
                })
        })
        .catch((err) => {
            setGHRestStatus(RESTStatus.FAILED)
            console.error('[Tauri Runtime Error - http client]:', err)
        })
}

/* 
{
  "url": "https://api.github.com/repos/lorow/OpenIris/releases/95310451",
  "assets_url": "https://api.github.com/repos/lorow/OpenIris/releases/95310451/assets",
  "upload_url": "https://uploads.github.com/repos/lorow/OpenIris/releases/95310451/assets{?name,label}",
  "html_url": "https://github.com/lorow/OpenIris/releases/tag/v1.10.6",
  "id": 95310451,
  "author": {
    "login": "github-actions[bot]",
    "id": 41898282,
    "node_id": "MDM6Qm90NDE4OTgyODI=",
    "avatar_url": "https://avatars.githubusercontent.com/in/15368?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/github-actions%5Bbot%5D",
    "html_url": "https://github.com/apps/github-actions",
    "followers_url": "https://api.github.com/users/github-actions%5Bbot%5D/followers",
    "following_url": "https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}",
    "gists_url": "https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/github-actions%5Bbot%5D/subscriptions",
    "organizations_url": "https://api.github.com/users/github-actions%5Bbot%5D/orgs",
    "repos_url": "https://api.github.com/users/github-actions%5Bbot%5D/repos",
    "events_url": "https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}",
    "received_events_url": "https://api.github.com/users/github-actions%5Bbot%5D/received_events",
    "type": "Bot",
    "site_admin": false
  },
  "node_id": "RE_kwDOG4NWRc4FrlJz",
  "tag_name": "v1.10.6",
  "target_commitish": "master",
  "name": "v1.10.6",
  "draft": false,
  "prerelease": false,
  "created_at": "2023-03-12T09:55:48Z",
  "published_at": "2023-03-12T09:56:29Z",
  "assets": [
    {
      "url": "https://api.github.com/repos/lorow/OpenIris/releases/assets/99051952",
      "id": 99051952,
      "node_id": "RA_kwDOG4NWRc4F52mw",
      "name": "workspace-v1.10.5-esp32AIThinker-fafd35d-master.zip",
      "label": "",
      "uploader": {
        "login": "github-actions[bot]",
        "id": 41898282,
        "node_id": "MDM6Qm90NDE4OTgyODI=",
        "avatar_url": "https://avatars.githubusercontent.com/in/15368?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/github-actions%5Bbot%5D",
        "html_url": "https://github.com/apps/github-actions",
        "followers_url": "https://api.github.com/users/github-actions%5Bbot%5D/followers",
        "following_url": "https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}",
        "gists_url": "https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/github-actions%5Bbot%5D/subscriptions",
        "organizations_url": "https://api.github.com/users/github-actions%5Bbot%5D/orgs",
        "repos_url": "https://api.github.com/users/github-actions%5Bbot%5D/repos",
        "events_url": "https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}",
        "received_events_url": "https://api.github.com/users/github-actions%5Bbot%5D/received_events",
        "type": "Bot",
        "site_admin": false
      },
      "content_type": "application/zip",
      "state": "uploaded",
      "size": 1407528,
      "download_count": 0,
      "created_at": "2023-03-12T09:56:14Z",
      "updated_at": "2023-03-12T09:56:15Z",
      "browser_download_url": "https://github.com/lorow/OpenIris/releases/download/v1.10.6/workspace-v1.10.5-esp32AIThinker-fafd35d-master.zip"
    }
  ],
  "tarball_url": "https://api.github.com/repos/lorow/OpenIris/tarball/v1.10.6",
  "zipball_url": "https://api.github.com/repos/lorow/OpenIris/zipball/v1.10.6",
  "body": "## [1.10.6](https://github.com/lorow/OpenIris/compare/v1.10.5...v1.10.6) (2023-03-12)\n\n\n### 🐛 Bug Fixes\n\n* remove ota env from cleanup step ([fafd35d](https://github.com/lorow/OpenIris/commit/fafd35d19e8b7e9028ca3f09bdb9689c4ab1a165))\n\n\n---\nThis release is also available on:\n- `v1.10.6`"
}
*/
