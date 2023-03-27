import { createMemo } from 'solid-js'
import { appSettingsState } from './settings'

export const enableNotificationsSounds = createMemo(
    () => appSettingsState().enableNotificationsSounds,
)
export const getGlobalNotificationsType = createMemo(
    () => appSettingsState().globalNotificationsType,
)
