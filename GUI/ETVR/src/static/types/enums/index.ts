/**
 * @description Enum for the different types of camera views
 */
export enum CAMERA_VIEW_MODE {
    LIST = 'LIST',
    GRIP = 'GRIP',
}

/**
 * @description Enum for the different types of popovers
 */
export enum POPOVER_ID {
    GRIP = 'grip-popover',
    LIST = 'list-popover',
    TRACKER_MANAGER = 'tracker-manager-popover',
    SETTINGS_POPOVER = 'settings-popover',
}

/**
 * @description Enum for the different types of loaders
 */
export enum loaderType {
    MDNS_CONNECTING = 'MDNS_CONNECTING',
    REST_CLIENT = 'REST_CLIENT',
}

/**
 * @description Enum for the different types of notifications
 * @enum {string} ENotificationType
 * @property {string} ERROR - An Error notification
 * @property {string} SUCCESS - A Success notification
 * @property {string} INFO - An Info notification
 * @property {string} WARNING - A Warning notification
 * @property {string} DEFAULT - A Default notification
 */
export enum ENotificationType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    WARNING = 'WARNING',
    DEFAULT = 'DEFAULT',
}

/**
 * @description Enum for the different types of notifications actions
 * @enum {string}
 * @property {string} OS - The notification will be handled by the OS
 * @property {string} APP - The notification will be handled by the APP
 */
export enum ENotificationAction {
    OS = 'OS',
    APP = 'APP',
}

/**
 * @description Enum for the different types of RTC message types
 * @enum {string}
 * @property {string} VIDEO_OFFER - The connection is not yet open.
 * @property {string} VIDEO_ANSWER - The connection is open and ready to communicate.
 * @property {string} NEW_ICE_CANDIDATE - A new camera is wanting to connect.
 * @property {string} CAMERA_ERROR - The connection is closed or couldn't be opened.
 * @property {string} CLOSE_CAMERA_STREAM - The connection is requesting to close.
 */
export enum RTCMessageType {
    VIDEO_OFFER = 'VIDEO_OFFER',
    VIDEO_ANSWER = 'VIDEO_ANSWER',
    NEW_ICE_CANDIDATE = 'NEW_ICE_CANDIDATE',
    CAMERA_ERROR = 'CAMERA_ERROR',
    CLOSE_CAMERA_STREAM = 'CLOSE_CAMERA_STREAM',
}

/**
 * @description Enum for the different States of the RTC connection
 * @enum {string}
 * @property {string} CONNECTING - The connection is not yet open.
 * @property {string} OPEN - The connection is open and ready to communicate.
 * @property {string} CLOSING - The connection is in the process of closing.
 * @property {string} CLOSED - The connection is closed or couldn't be opened.
 * @property {string} ERROR - The connection is in an error state.
 * @property {string} DISCONNECTED - The connection is disconnected.
 * @property {string} CONNECTED - The connection is connected.
 */
export enum RTCState {
    CONNECTING = 'CONNECTING',
    OPEN = 'OPEN',
    CLOSING = 'CLOSING',
    CLOSED = 'CLOSED',
    ERROR = 'ERROR',
    DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED',
}
