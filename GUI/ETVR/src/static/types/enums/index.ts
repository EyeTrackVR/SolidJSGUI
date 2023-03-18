export enum CAMERA_VIEW_MODE {
    LIST = 'LIST',
    GRIP = 'GRIP',
}

export enum POPOVER_ID {
    GRIP = 'grip-popover',
    LIST = 'list-popover',
    TRACKER_MANAGER = 'tracker-manager-popover',
    SETTINGS_POPOVER = 'settings-popover',
}

export enum ANIMATION_MODE {
    GRIP = 'grip-popover',
    LIST = 'list-popover',
    NONE = 'NONE',
}

export enum loaderType {
    MDNS_CONNECTING = 'MDNS_CONNECTING',
    REST_CLIENT = 'REST_CLIENT',
}

export enum ENotificationType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
    WARNING = 'WARNING',
    DEFAULT = 'DEFAULT',
}

export enum ENotificationAction {
    OS = 'OS',
    APP = 'APP',
}

export enum RTCMessageType {
    VIDEO_OFFER = 'VIDEO_OFFER',
    VIDEO_ANSWER = 'VIDEO_ANSWER',
    NEW_ICE_CANDIDATE = 'NEW_ICE_CANDIDATE',
    CAMERA_ERROR = 'CAMERA_ERROR',
    CLOSE_CAMERA_STREAM = 'CLOSE_CAMERA_STREAM',
}

export enum RTCState {
    CONNECTING = 'CONNECTING',
    OPEN = 'OPEN',
    CLOSING = 'CLOSING',
    CLOSED = 'CLOSED',
    ERROR = 'ERROR',
    DISCONNECTED = 'DISCONNECTED',
    CONNECTED = 'CONNECTED',
}

export enum RANGE_INPUT_FORMAT {
    EYE_POSITION_SCALAR = 'Eye position scalar',
    THRESHOLD = 'Thresshold',
    ROTATION = 'Rotation',
}
