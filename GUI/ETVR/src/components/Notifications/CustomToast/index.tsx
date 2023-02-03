/* eslint-disable indent */
import { Transition, Toast, Alert } from 'solid-headless'
import { AiOutlineCheckCircle } from 'solid-icons/ai'
import { FiAlertTriangle, FiAlertOctagon } from 'solid-icons/fi'
import { IoAlertCircleSharp } from 'solid-icons/io'
import { createSignal, Component } from 'solid-js'
import CloseIcon from '@components/CloseIcon'
import { ENotificationType } from '@static/types/enums'
import { notifications, notificationsType } from '@store/ui/selectors'

interface ToastProps {
    id: string
    message: string
}

const NotificationIcon = () => {
    switch (notificationsType()) {
        case ENotificationType.SUCCESS:
            return <AiOutlineCheckCircle size={25} color="#68D391" />
        case ENotificationType.ERROR:
            return <FiAlertOctagon size={25} color="#F56565" />
        case ENotificationType.WARNING:
            return <FiAlertTriangle size={25} color="#F6E05E" />
        case ENotificationType.INFO:
            return <IoAlertCircleSharp size={25} color="#90CDF4" />
    }
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
                    {NotificationIcon()}
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
