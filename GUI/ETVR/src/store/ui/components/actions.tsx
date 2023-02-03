/* eslint-disable */

import { sendNotification } from '@tauri-apps/api/notification'
import { AiOutlineCheckCircle } from 'solid-icons/ai'
import { FiAlertTriangle, FiAlertOctagon } from 'solid-icons/fi'
import { IoAlertCircleSharp } from 'solid-icons/io'
import { ENotificationAction, ENotificationType } from '@static/types/enums'
import { INotifictionMessage, INotificationAction } from '@static/types/interfaces'
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
 * @param {INotifictionMessage} notification Notification message
 * @param {ENotificationAction} actionType Notification action type
 */
export const addNotification = (
    notification: INotifictionMessage,
    actionType: ENotificationAction,
) => {
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

export const NotificationIcon = (notificationAction: ENotificationType) => {
    switch (notificationAction) {
        case ENotificationType.SUCCESS:
            return <AiOutlineCheckCircle size={25} color="#68D391" />
        case ENotificationType.ERROR:
            return <FiAlertOctagon size={25} color="#F56565" />
        case ENotificationType.WARNING:
            return <FiAlertTriangle size={25} color="#F6E05E" />
        case ENotificationType.INFO:
            return <IoAlertCircleSharp size={25} color="#90CDF4" />
    }
}
