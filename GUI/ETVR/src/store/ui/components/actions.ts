import { sendNotification } from '@tauri-apps/api/notification'
import { ENotificationAction } from '@static/types/enums'
import { notifications } from '@store/ui/selectors'
import { INotifictionMessage } from '@store/ui/ui'
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
 * @param {string} title Title of the notification
 * @param {string | undefined} body Body of the notification
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
