//********************************* Camera *************************************/
export enum CAMERA_VIEW_MODE {
    LIST = 'LIST',
    GRIP = 'GRIP',
}

export enum CameraStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
    NONE = 'NONE',
}

export enum CameraType {
    WIRELESS = 'WIRELESS',
    NONE = 'NONE',
}
export enum CameraCalibrationButtonType {
    CALIBRATE = 'Calibrate',
    RECENTER = 'Recenter',
    CROPPING_MODE = 'Cropping mode',
}

//********************************* UI *************************************/

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
    NULL = 'null',
}

export enum RANGE_INPUT_FORMAT {
    EYE_POSITION_SCALAR = 'Eye position scalar',
    THRESHOLD = 'Threshold',
    ROTATION = 'Rotation',
}

export enum RANGE_INPUT_FORMAT_APP_SETTINGS {
    MIN_FREQUENCY_CUTOFF = 'Min frequency cutoff',
    SPEED_COEFFICIENT = 'Speed coefficient',
}

//********************************* Network and App *************************************/

// TODO = add more exit codes related to potential areas of failure in the app
export enum ExitCodes {
    USER_EXIT = 0,
    ERROR = 1,
    ERROR_UNKNOWN = 2,
}

export enum RESTStatus {
    ACTIVE = 'ACTIVE',
    COMPLETE = 'COMPLETE',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
    NO_CAMERA = 'NO_CAMERA',
    NO_CONFIG = 'NO_CONFIG',
}

export enum RESTType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum MdnsStatus {
    ACTIVE = 'ACTIVE',
    DISABLED = 'DISABLED',
    LOADING = 'LOADING',
    FAILED = 'FAILED',
}

//********************************* Settings *************************************/
export enum OSCEndpoint {
    Eyes_Y = '/avatar/parameters/EyesY',
    Left_Eye_X = '/avatar/parameters/LeftEyeX',
    Right_Eye_X = '/avatar/parameters/RightEyeX',
    Recenter = '/avatar/parameters/etvr_recenter',
    Sync_Blink = '/avatar/parameters/etvr_sync_blink',
    Recalibrate = '/avatar/parameters/etvr_recalibrate',
    Left_Eye_Blink = '/avatar/parameters/LeftEyeLidExpandedSqueeze',
    Right_Eye_Blink = '/avatar/parameters/RightEyeLidExpandedSqueeze',
}

export enum DevicePosition {
    LEFT_EYE = 'left_eye',
    RIGHT_EYE = 'right_eye',
    MOUTH = 'mouth',
}
