import { createMemo } from 'solid-js'
import { appSettingsState } from './settings'

export const enableNotificationsSounds = createMemo(
    () => appSettingsState().enableNotificationsSounds,
)
export const enableNotifications = createMemo(() => appSettingsState().enableNotifications)
export const getGlobalNotificationsType = createMemo(
    () => appSettingsState().globalNotificationsType,
)
