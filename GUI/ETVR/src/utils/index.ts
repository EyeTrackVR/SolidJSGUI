/* eslint-disable */
import { CameraStatus } from '@static/types/enums'
export const DEFAULT_CANVAS_BOX_POSITION = { x: 0, y: 0, width: 0, height: 0 }
export const ACTIVE_SHADOW = '0 0 0 0 0.121333  0 0 0 0 0.866667  0 0 0 0 0  0 0 0 1 0'
export const LOADING_SHADOW = '0 0 0 0 1  0 0 0 0 0.20166699999999999  0 0 0 0 -1.878667  0 0 0 1 0'
export const DEFAULT_SHADOW = '0 0 0 0 1.966667  0 0 0 0 0  0 0 0 0 -0.04366700000000001  0 0 0 1 0'
export const ACTIVE_COLOR = '#1FDD00'
export const LOADING_COLOR = '#F9AA33'
export const DEFAULT_COLOR = '#DD0000'
export const DISABLED_COLOR = '#505668'
export const FAILED_COLOR = '#DD0000'
export const BULLET_POSITION_ADJUSTMENT = 18

export const getBulletPosition = (range: HTMLInputElement) => {
    return +range.value / +range.max
}

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
        case CameraStatus.DISABLED:
            return DISABLED_COLOR
        default:
            return DEFAULT_COLOR
    }
}

export const CapitalizeFirstLetter = (letter: string) => {
    return letter.charAt(0).toUpperCase() + letter.slice(1)
}

export const classNames = (...classes: (string | boolean | undefined)[]): string => {
    return classes.filter(Boolean).join(' ')
}

export const isEmpty = <T>(obj: object | Array<T>) => {
    if (!Array.isArray(obj)) {
        // ⇒ do not attempt to process array
        return Object.keys(obj).length === 0
    }
    return !obj.length
}
