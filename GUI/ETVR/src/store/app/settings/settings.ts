import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { ENotificationAction } from '@static/types/enums'

export interface IAppSettingsStore {
    enableNotificationsSounds: boolean
    globalNotificationsType: ENotificationAction
}

export const defaultState = {
    enableNotificationsSounds: true,
    enableNotifications: true,
    globalNotificationsType: ENotificationAction.APP,
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
