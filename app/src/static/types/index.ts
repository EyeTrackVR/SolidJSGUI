export * as O from 'fp-ts/Option'
import type { ENotificationAction, OSCEndpoint, DevicePosition } from './enums'
import type { JSXElement } from 'solid-js'

//********************************* Utility *************************************/
export type Context = {
    [key: string]: JSXElement
}

//********************************* Settings *************************************/

export type BackendDevice = {
    enabled?: boolean
    position: DevicePosition
    capture_source?: string
    threshold?: number
    focal_length?: number
    rotation_angle?: number
    flip_x_axis?: boolean
    flip_y_axis?: boolean
    roi_x?: number
    roi_y?: number
    roi_w?: number
    roi_h?: number
}

export type AlgorithmOrder = 'BLOB' | 'HSRAC' | 'RANSAC' | 'HSF'

export type CameraSettings = {
    cameraId: string
    flipLeftX: boolean
    flipRightX: boolean
    dualEyeFallOff: boolean
    syncBlinks: boolean
    circleCrop: boolean
}

export type AlgorithmSettings = {
    algorithm_order: AlgorithmOrder[]
    blob: {
        enabled: boolean
        threshold: number
        minArea: number
        maxArea: number
    }
}

export type FilterParams = {
    minFreqCutOff: number
    speedCoeff: number
}

export type OSCSettings = {
    address: string
    mirrorEyes: boolean
    syncBlink: boolean
    enableSending: boolean
    sendingPort: number
    enableReceiving: boolean
    receiverPort: number
    vrchatNativeTracking: boolean
    endpoints: OSCEndpoint[]
}

//********************************* Config *************************************/

/**
 * @description Debug mode levels
 * @export typedef {string} DebugMode
 * @property {'off'} off
 * @property {'error'} error
 * @property {'warn'} warn
 * @property {'info'} info
 * @property {'debug'} debug
 * @property {'trace'} trace
 */
export type DebugMode = 'off' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

/**
 * @description This is the export type that is passed to the Tauri Store instance to handle persistent data within the app.
 * @export typedef {Object} PersistentSettings
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
export type PersistentSettings = {
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
 * @description Backend Config
 */
export type BackendConfig = {
    version?: number | string
    debug?: DebugMode
    osc?: OSCSettings
    devices?: BackendDevice[]
    algorithm?: AlgorithmSettings
}
