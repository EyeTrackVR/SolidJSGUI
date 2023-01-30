import { Toaster, ToasterStore, Transition, useToaster } from 'solid-headless'
import { createEffect, createSignal, For, onCleanup } from 'solid-js'
import CustomToast from './CustomToast'
import { notifications } from '@src/store/ui/selectors'

const ToastNotificationWindow = () => {
    const notifs = useToaster(notifications() as ToasterStore<string>)

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
                <div class="flex-1 flex flex-col-reverse space-y-reverse space-y-1 overflow-y-hidden overflow-x-hidden rounded-lg">
                    <For each={notifs().slice(0).reverse()}>
                        {(item) => <CustomToast id={item.id} message={item.data} />}
                    </For>
                </div>
            </Transition>
        </Toaster>
    )
}

export default ToastNotificationWindow
