import { Transition, useToaster, Toaster, Toast } from 'solid-headless'
import { createEffect, createSignal, JSX, onCleanup, For } from 'solid-js'
import { notifications } from '@src/store/ui/selectors'

interface ToastProps {
    id: string
    message: string
}

const CloseIcon = (props: JSX.IntrinsicElements['svg']) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            {...props}>
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    )
}

const CustomToast = (props: ToastProps) => {
    const [isOpen, setIsOpen] = createSignal(true)

    const dismiss = () => {
        setIsOpen(false)
    }

    return (
        <Transition
            show={isOpen()}
            class="relative transition rounded-lg p-4 bg-gray-900 border-2 border-gray-900 dark:border-gray-50"
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
                <span class="flex-1 text-sm font-semibold text-gray-50">{props.message}</span>
                <button
                    type="button"
                    class="flex-none w-6 h-6 p-1 text-gray-50 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    onClick={dismiss}>
                    <CloseIcon />
                </button>
            </Toast>
        </Transition>
    )
}

const ToastNotificationWindow = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const notifs = useToaster(notifications()!)

    const [isOpen, setIsOpen] = createSignal(false)
    let persist = true

    const closeNotifs = () => {
        persist = false
        setIsOpen(false)
    }

    const clearNotifs = () => {
        notifications()?.clear()
    }

    createEffect(() => {
        if (notifs().length > 0) {
            setIsOpen(true)
        }
        if (persist) {
            return
        }
        const timeout = setTimeout(() => {
            closeNotifs()
        }, 10000)
        onCleanup(() => {
            clearTimeout(timeout)
        })
    })

    return (
        <Toaster class="absolute fixed-0 right-0 bottom-0 z-10">
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
                <div class="flex flex-col m-4 max-w-full max-h-[50vh] overflow-hidden rounded-xl shadow-xl bg-gray-50 dark:bg-gray-900 border border-gray-900 dark:border-gray-50 p-4 space-y-2">
                    <div class="flex-none flex items-center justify-between">
                        <span class="text-xl font-bold text-gray-900 dark:text-gray-50">
                            Notifications
                        </span>
                        <button
                            type="button"
                            onClick={closeNotifs}
                            class="w-6 h-6 p-1 text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-900 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <CloseIcon />
                        </button>
                    </div>
                    <div class="flex-1 flex flex-col-reverse space-y-reverse space-y-1 overflow-y-auto overflow-x-hidden rounded-lg">
                        <For
                            each={notifs().slice(0).reverse()}
                            fallback={
                                <div class="bg-gray-900 dark:bg-gray-50 flex items-center justify-center text-bold text-gray-50 dark:text-gray-900 p-4">
                                    You have no notifications.
                                </div>
                            }>
                            {(item) => <CustomToast id={item.id} message={item.data} />}
                        </For>
                    </div>
                </div>
            </Transition>
        </Toaster>
    )
}

export default ToastNotificationWindow
