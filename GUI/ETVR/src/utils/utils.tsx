/* eslint-disable */

import { CameraStatus } from '@store/camera/camera'
import { INotificationAction } from '@static/types/interfaces'
import { ENotificationAction, ENotificationType } from '@static/types/enums'
import { IoAlertCircleSharp } from 'solid-icons/io'
import { FiAlertTriangle, FiAlertOctagon } from 'solid-icons/fi'
import { AiOutlineCheckCircle } from 'solid-icons/ai'

/**
 * @description - Utility variables to generate camera states
 */
export const ACTIVE_SHADOW = '0 0 0 0 0.121333  0 0 0 0 0.866667  0 0 0 0 0  0 0 0 1 0'
export const LOADING_SHADOW = '0 0 0 0 1  0 0 0 0 0.20166699999999999  0 0 0 0 -1.878667  0 0 0 1 0'
export const DEFAULT_SHADOW = '0 0 0 0 1.966667  0 0 0 0 0  0 0 0 0 -0.04366700000000001  0 0 0 1 0'
export const ACTIVE_COLOR = '#1FDD00'
export const LOADING_COLOR = '#F9AA33'
export const DEFAULT_COLOR = '#DD0000'
export const FAILED_COLOR = '#DD0000'

export const GenerateMatrixShadow = (activeStatus: CameraStatus) => {
    switch (activeStatus) {
        case CameraStatus.ACTIVE:
            return ACTIVE_SHADOW
        case CameraStatus.LOADING:
            return LOADING_SHADOW
        default:
            return DEFAULT_SHADOW
    }
}

export const ActiveStatus = (activeStatus: CameraStatus) => {
    switch (activeStatus) {
        case CameraStatus.ACTIVE:
            return ACTIVE_COLOR
        case CameraStatus.LOADING:
            return LOADING_COLOR
        case CameraStatus.FAILED:
            return FAILED_COLOR
        default:
            return DEFAULT_COLOR
    }
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

export const NotificationsTypeRender = (notificationAction: ENotificationType) => {
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

export const CapitalizeFirstLetter = (letter: string) => {
    return letter.charAt(0).toUpperCase() + letter.slice(1)
}

export const classNames = (...classes: (string | boolean | undefined)[]): string => {
    return classes.filter(Boolean).join(' ')
}
