import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
    DialogOverlay,
} from 'solid-headless'
import { children, Show } from 'solid-js'
import { openModalStatus } from '@src/store/ui/selectors'
import { setOpenModal, type IModalMenu } from '@src/store/ui/ui'
import './styles.css'

const DialogPreview = (props: IModalMenu) => {
    const Children = children(() => props.children)
    return (
        <>
            <Transition appear show={openModalStatus() as boolean}>
                <Dialog
                    isOpen
                    class="fixed inset-0 z-10 overflow-y-auto "
                    onClose={() => setOpenModal(false)}>
                    <div class="min-h-screen px-4 flex items-center justify-center ">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0">
                            <DialogOverlay class="fixed inset-0 bg-100 bg-opacity-50" />
                        </TransitionChild>
                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span class="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <DialogPanel class="bg-100 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-50 dark:bg-gray-900 shadow-xl rounded-2xl  text-white">
                                <Show when={props.title}>
                                    <DialogTitle
                                        as="h3"
                                        class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-50">
                                        {props.title}
                                    </DialogTitle>
                                </Show>
                                {Children()}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default DialogPreview
