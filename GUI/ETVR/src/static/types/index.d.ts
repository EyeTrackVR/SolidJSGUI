import type { ENotificationAction } from './enums'
import type { JSXElement } from 'solid-js'

type Context = {
    [key: string]: JSXElement
}

//********************************* Settings *************************************/
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

//********************************* Config *************************************/

/**
 * @description Debug mode levels
 * @typedef {string} DebugMode
 * @property {'off'} off
 * @property {'error'} error
 * @property {'warn'} warn
 * @property {'info'} info
 * @property {'debug'} debug
 * @property {'trace'} trace
 */
type DebugMode = 'off' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

/**
 * @description This is the type that is passed to the Tauri Store instance to handle persistent data within the app.
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
    debugMode?: DebugMode
    scanForCamerasOnStartup?: boolean
    cameraSettings?: CameraSettings
    algorithmSettings?: AlgorithmSettings
    filterParams?: FilterParams
    oscSettings?: OSCSettings
}

/**
 * @description Backend Config POST body
 */
type BackendConfigPOSTBody = {
    version: number
    debug: boolean
    left_eye: {
        enabled: boolean
        capture_source: string
    }
    right_eye: {
        enabled: boolean
        capture_source: string
        threshold: number
        focal_length: number
        rotation_angle: number
        flip_x_axis: boolean
        flip_y_axis: boolean
    }
}
