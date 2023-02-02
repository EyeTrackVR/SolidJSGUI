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
 */
export enum ENotificationType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    WARNING = 'WARNING',
}

/**
 * @description Enum for the different types of notifications actions
 */
export enum ENotificationAction {
    OS = 'OS',
    APP = 'APP',
}

/**
 * @description Enum for the different types of RTC message types
 */
export enum RTCMessageType {
    VIDEO_OFFER = 'video-offer',
    VIDEO_ANSWER = 'video-answer',
    NEW_ICE_CANDIDATE = 'new-ice-candidate',
    REMOTE_DESKTOP = 'remote-desktop',
    CLOSE_REMOTE_DESKTOP = 'close-remote-desktop',
}
