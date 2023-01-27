/* eslint-disable */

import { CameraStatus } from '@src/store/camera/camera'

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

export const classNames = (...classes: (string | boolean | undefined)[]): string => {
    return classes.filter(Boolean).join(' ')
}
