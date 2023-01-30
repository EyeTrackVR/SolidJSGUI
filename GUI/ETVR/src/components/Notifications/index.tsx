import { Transition, useToaster, Toaster, Alert } from 'solid-headless'
import { IoAlertCircleSharp } from 'solid-icons/io'
import { createEffect, createSignal, JSX, onCleanup, For } from 'solid-js'
import CustomToast from './CustomToast'
import CloseIcon from '@src/components/CloseIcon'
import { notifications } from '@src/store/ui/selectors'

const ToastNotificationWindow: JSX.Element = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const notifs = useToaster(notifications()!)

    const [isOpen, setIsOpen] = createSignal(false)
    const closeNotifs = () => {
        setIsOpen(false)
    }

    const clearNotifs = () => {
        notifications()?.clear()
    }

    createEffect(() => {
        if (notifs().length > 0) {
            setIsOpen(true)
        }
        const timeout = setTimeout(() => {
            closeNotifs()
            console.log('[Notifications] Closed - Cleaned up')
        }, 5000)
        onCleanup(() => {
            clearTimeout(timeout)
        })
    })

    return (
        <Toaster class="absolute p-2 fixed-0 right-0 bottom-0 z-10">
            <Transition
                show={isOpen()}
                class="relative transition"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-50 translate-y-full"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-50  translate-y-full"
                afterLeave={clearNotifs}>
                <div class="flex-1 flex flex-col-reverse space-y-reverse space-y-1 overflow-y-auto overflow-x-hidden rounded-lg">
                    <For
                        each={notifs().slice(0).reverse()}
                        fallback={
                            <Alert class="bg-slate-600 flex grow flex-row items-center justify-center text-xl text-bold text-gray-50 p-4">
                                <IoAlertCircleSharp size={25} color="#90CDF4" />
                                <p class="pl-1 pr-1">no notifications</p>
                                <button
                                    type="button"
                                    class="bg-rose-600 hover:bg-rose-700 focus:bg-rose-900 flex-none w-6 h-6 p-1 text-gray-50 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    onClick={closeNotifs}>
                                    <CloseIcon />
                                </button>
                            </Alert>
                        }>
                        {(item) => <CustomToast id={item.id} message={item.data} />}
                    </For>
                </div>
            </Transition>
        </Toaster>
    )
}

export default ToastNotificationWindow
