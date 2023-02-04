/* eslint-disable indent */
import { Transition, Toast, Alert } from 'solid-headless'
import { AiOutlineCheckCircle } from 'solid-icons/ai'
import { FiAlertTriangle, FiAlertOctagon } from 'solid-icons/fi'
import { IoAlertCircleSharp } from 'solid-icons/io'
import { createSignal, Component, Show } from 'solid-js'
import CloseIcon from '@components/CloseIcon'
import { ENotificationType } from '@static/types/enums'
import { notifications, notificationsType } from '@store/ui/selectors'

interface ToastProps {
    id: string
    message: string
}

const NotificationIcon = () => {
    return (
        <div>
            <Show when={notificationsType() === ENotificationType.SUCCESS}>
                <AiOutlineCheckCircle size={25} color="#68D391" />
            </Show>
            <Show when={notificationsType() === ENotificationType.ERROR}>
                <FiAlertOctagon size={25} color="#F56565" />
            </Show>
            <Show when={notificationsType() === ENotificationType.WARNING}>
                <FiAlertTriangle size={25} color="#F6E05E" />
            </Show>
            <Show when={notificationsType() === ENotificationType.INFO}>
                <IoAlertCircleSharp size={25} color="#90CDF4" />
            </Show>
        </div>
    )
}

const CustomToast: Component<ToastProps> = (props) => {
    const [isOpen, setIsOpen] = createSignal(true)

    const dismiss = () => {
        setIsOpen(false)
    }

    return (
        <Transition
            show={isOpen()}
            class="relative transition rounded-lg bg-slate-600"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-50"
            afterLeave={() => {
                notifications()?.remove(props.id)
            }}>
            <Toast class="flex justify-between items-center">
                <Alert class="bg-slate-600 flex grow flex-row items-center justify-center text-xl text-bold text-gray-50 p-4">
                    <NotificationIcon />
                    <span class="flex-1 text-sm font-semibold pl-1 pr-1 text-gray-50">
                        {props.message}
                    </span>
                    <button
                        type="button"
                        class="bg-slate-600 hover:bg-slate-700 focus:bg-slate-900 flex-none w-6 h-6 p-1 text-gray-50 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        onClick={dismiss}>
                        <CloseIcon />
                    </button>
                </Alert>
            </Toast>
        </Transition>
    )
}

export default CustomToast
