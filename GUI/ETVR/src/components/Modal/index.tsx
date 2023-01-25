import { Button, HStack, Modal, Text } from '@hope-ui/core'
import { children, createSignal, createEffect, Show, onMount } from 'solid-js'
import { openModalStatus } from '@src/store/ui/selectors'
import { setOpenModal, type IModalMenu } from '@src/store/ui/ui'
import './styles.css'

const ModalMenu = (props: IModalMenu) => {
    const [ref, setRef] = createSignal<HTMLElement>()
    const Children = children(() => props.children)
    const clickOutside = (e: MouseEvent) => {
        if (e.target instanceof HTMLElement) {
            if (ref() && (ref()?.contains(e.target) || ref()?.isSameNode(e.target))) return
            console.log('clicked outside')
            setOpenModal(false)
        }
    }
    createEffect(() => {
        if (openModalStatus()) {
            document.addEventListener('click', clickOutside)
            return
        }
        document.removeEventListener('click', clickOutside)
    })
    return (
        <>
            <Modal
                isOpen={openModalStatus() ?? false}
                onClose={() => setOpenModal(false)}
                initialFocusSelector="#initial-focus">
                <Modal.Overlay />
                <Modal.Content p={4}>
                    <HStack justifyContent="space-between" mb={4}>
                        <Modal.Heading fontWeight="semibold">Title</Modal.Heading>
                        <Modal.CloseButton />
                    </HStack>
                    <Text mb={4}>The content of the Modal.</Text>
                    <HStack justifyContent="flex-end" spacing={4}>
                        <Button id="initial-focus" _focus={{ color: 'red' }}>
                            Action
                        </Button>
                    </HStack>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ModalMenu
