import { AiOutlineCheckCircle } from 'solid-icons/ai'
import { FaSolidArrowDown, FaSolidXmark } from 'solid-icons/fa'
import { FiAlertOctagon } from 'solid-icons/fi'
import { Show } from 'solid-js'
import { ACTIVE_COLOR, LOADING_COLOR, FAILED_COLOR, DISABLED_COLOR } from '@src/utils/utils'
import { CameraStatus } from '@store/camera/camera'

export const CameraStatusIcon = (status: CameraStatus) => {
    return (
        <div>
            <Show when={status === CameraStatus.ACTIVE}>
                <AiOutlineCheckCircle size={25} color={ACTIVE_COLOR} />
            </Show>
            <Show when={status === CameraStatus.DISABLED}>
                <FiAlertOctagon size={25} color={DISABLED_COLOR} />
            </Show>
            <Show when={status === CameraStatus.FAILED}>
                <FaSolidXmark size={25} color={FAILED_COLOR} />
            </Show>
            <Show when={status === CameraStatus.LOADING}>
                <FaSolidArrowDown size={25} color={LOADING_COLOR} />
            </Show>
        </div>
    )
}

export const CheckDisabled = (status: CameraStatus) => {
    if (status === CameraStatus.DISABLED) {
        return DISABLED_COLOR
    }
    return 'white'
}
