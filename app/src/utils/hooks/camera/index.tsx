import { AiOutlineCheckCircle } from 'solid-icons/ai'
import { FaSolidArrowDown, FaSolidXmark } from 'solid-icons/fa'
import { FiAlertOctagon } from 'solid-icons/fi'
import { Switch, Match } from 'solid-js'
import { ACTIVE_COLOR, LOADING_COLOR, FAILED_COLOR, DISABLED_COLOR } from '@src/utils'
import { CameraStatus } from '@static/types/enums'

export const CameraStatusIcon = (status: CameraStatus) => {
    return (
        <Switch>
            <Match when={status === CameraStatus.ACTIVE}>
                <AiOutlineCheckCircle size={25} color={ACTIVE_COLOR} />
            </Match>
            <Match when={status === CameraStatus.DISABLED}>
                <FiAlertOctagon size={25} color={DISABLED_COLOR} />
            </Match>
            <Match when={status === CameraStatus.FAILED}>
                <FaSolidXmark size={25} color={FAILED_COLOR} />
            </Match>
            <Match when={status === CameraStatus.LOADING}>
                <FaSolidArrowDown size={25} color={LOADING_COLOR} />
            </Match>
        </Switch>
    )
}

export const CheckDisabled = (status: CameraStatus) => {
    if (status === CameraStatus.DISABLED) {
        return DISABLED_COLOR
    }
    return 'white'
}
