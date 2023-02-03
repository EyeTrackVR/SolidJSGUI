import { sendNotification } from '@tauri-apps/api/notification'
import { ENotificationAction } from '@static/types/enums'
import { INotifictionMessage } from '@static/types/interfaces'
import { notifications } from '@store/ui/selectors'
import { NotificationsType } from '@utils/utils'

/**
 * Send notification to the WebView Window using the browser API
 * @param {string} title Title of the notification
 * @param {string | undefined} body Body of the notification
 */
const notify = (title: string, body: string | undefined) => {
    new Notification(title, { body: body || '' })
}

/**
 * Send notification to the OS or to the WebView Window using a custom API
 * @param {INotifictionMessage} notification Notification message
 * @param {ENotificationAction} actionType Notification action type
 */
const addNotification = (notification: INotifictionMessage, actionType: ENotificationAction) => {
    const { title, message } = notification
    const notificationAction = NotificationsType(actionType, {
        callbackOS: () => {
            sendNotification({
                title,
                body: message,
            })
        },
        callbackApp: () => {
            notifications()?.create(message)
        },
    })
    return notificationAction
}

export { addNotification, notify }
