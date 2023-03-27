import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { ENotificationAction } from '@static/types/enums'

export interface IAppSettingsStore {
    enableNotificationsSounds: boolean
    globalNotificationsType: ENotificationAction
    enableMDNS: boolean
    scanForCamerasOnStartup: boolean
    stopAlgoBackend: boolean
}

export const defaultState = {
    enableNotificationsSounds: true,
    enableNotifications: true,
    globalNotificationsType: ENotificationAction.APP,
    enableMDNS: true,
    scanForCamerasOnStartup: true,
    stopAlgoBackend: false,
}

const [state, setState] = createStore<IAppSettingsStore>(defaultState)

export const setEnableNotificationsSounds = (flag: boolean) => {
    setState(
        produce((s) => {
            s.enableNotificationsSounds = flag
        }),
    )
}

export const setGlobalNotificationsType = (type: ENotificationAction) => {
    setState(
        produce((s) => {
            s.globalNotificationsType = type
        }),
    )
}

export const appSettingsState = createMemo(() => state)
