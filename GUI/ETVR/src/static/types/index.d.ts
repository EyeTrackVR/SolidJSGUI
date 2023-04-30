import type { ENotificationAction } from './enums'
import type { JSXElement } from 'solid-js'

type Context = {
    [key: string]: JSXElement
}

type CameraSettings = {
    cameraId: string
    flipLeftX: boolean
    flipRightX: boolean
    dualEyeFallOff: boolean
    syncBlinks: boolean
    circleCrop: boolean
}

type AlgorithmSettings = {
    blob: {
        enabled: boolean
        minArea: number
        maxArea: number
    }
}

type FilterParams = {
    minFreqCutOff: number
    speedCoeff: number
}

type OSCSettings = {
    address: string
    recenterAddress: string
    recalibrateAddress: string
    port: number
    recPort: number
}

/**
 * @description This is the type that is passed to the localForage instance to handle persistent data within the app.
 * @typedef {Object} PersistentSettings
 * @property {boolean} enableNotificationsSounds
 * @property {boolean} enableNotifications
 * @property {ENotificationAction} globalNotificationsType
 * @property {boolean} enableMDNS
 * @property {boolean} scanForCamerasOnStartup
 * @property {CameraSettings} cameraSettings
 * @property {AlgorithmSettings} algorithmSettings
 * @property {FilterParams} filterParams
 * @property {OSCSettings} oscSettings
 */
type PersistentSettings = {
    user?: string
    enableNotificationsSounds?: boolean
    enableNotifications?: boolean
    globalNotificationsType?: ENotificationAction
    enableMDNS?: boolean
    debugMode?: 'off' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
    scanForCamerasOnStartup?: boolean
    cameraSettings?: CameraSettings
    algorithmSettings?: AlgorithmSettings
    filterParams?: FilterParams
    oscSettings?: OSCSettings
}
