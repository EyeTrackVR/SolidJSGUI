/* eslint-disable */

import { sendNotification } from '@tauri-apps/api/notification'
import { handleSound } from '../app'
import { ENotificationAction, ENotificationType } from '@static/types/enums'
import { INotifictionMessage, INotificationAction } from '@static/types/interfaces'
import { notifications } from '@store/ui/selectors'
import { setNotificationsType } from '@store/ui/ui'

/**
 * Send notification to the WebView Window using the browser API
 * @param {string} title Title of the notification
 * @param {string | undefined} body Body of the notification
 */
export const notify = (title: string, body: string | undefined) => {
    new Notification(title, { body: body || '' })
}

/**
 * Send notification to the OS or to the WebView Window using a custom API
 * @param {INotifictionMessage} notification Notification message
 * @param {ENotificationAction} actionType Notification action type
 */
export const addNotification = (
    notification: INotifictionMessage,
    actionType: ENotificationAction,
) => {
    const { title, message, type } = notification
    const notificationAction = NotificationsType(actionType, {
        callbackOS: () => {
            sendNotification({
                title,
                body: message,
            })
        },
        callbackApp: () => {
            handleSound('EyeTrackApp_Audio_notif.mp3')
            setNotificationsType(type as ENotificationType)
            notifications()?.create(message)
        },
    })
    return notificationAction
}

export const NotificationsType = (
    notificationAction: ENotificationAction,
    { callbackOS, callbackApp }: INotificationAction,
) => {
    switch (notificationAction) {
        case ENotificationAction.OS:
            return callbackOS()
        case ENotificationAction.APP:
            return callbackApp()
    }
}

// export imported enum
export { ENotificationType, ENotificationAction }
