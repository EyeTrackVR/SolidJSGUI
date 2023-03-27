/* eslint-disable */

import { sendNotification } from '@tauri-apps/api/notification'
import { handleSound } from '../app'
import { ENotificationAction, ENotificationType } from '@static/types/enums'
import { INotifications, INotificationAction } from '@static/types/interfaces'
import { notifications } from '@store/ui/selectors'

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
 * @param {INotifications} notification Notification message
 */
export const addNotification = (notification: INotifications) => {
    const { title, message, action } = notification
    NotificationType(action, {
        callbackOS: () => {
            sendNotification({
                title,
                body: message,
            })
        },
        callbackApp: () => {
            handleSound('EyeTrackApp_Audio_notif.mp3')
            notifications()?.create(notification)
        },
    })
}

const NotificationType = (
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
