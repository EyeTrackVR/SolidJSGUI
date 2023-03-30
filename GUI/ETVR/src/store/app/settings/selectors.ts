import { createMemo } from 'solid-js'
import { appSettingsState } from './settings'

export const enableNotificationsSounds = createMemo(
    () => appSettingsState().enableNotificationsSounds,
)
export const getGlobalNotificationsType = createMemo(
    () => appSettingsState().globalNotificationsType,
)
export const enableMDNS = createMemo(() => appSettingsState().enableMDNS)
export const scanForCamerasOnStartup = createMemo(() => appSettingsState().scanForCamerasOnStartup)
export const stopAlgoBackend = createMemo(() => appSettingsState().stopAlgoBackend)
