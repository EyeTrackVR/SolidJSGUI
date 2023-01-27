import { HStack, Modal, Center } from '@hope-ui/core'
import { children, createEffect } from 'solid-js'
import { openModalStatus } from '@src/store/ui/selectors'
import { setOpenModal, type IModalMenu } from '@src/store/ui/ui'
import './styles.css'

const ModalMenu = (props: IModalMenu) => {
    const Children = children(() => props.children)
    createEffect(() => {
        console.log('openModalStatus:', openModalStatus())
    })
    return (
        <Modal
            isCentered
            size="xl"
            isOpen={openModalStatus() ?? false}
            onClose={() => setOpenModal(false)}
            initialFocusSelector={props.initialFocus}
            contentTransitionOptions={{
                transition: 'pop',
                duration: 400,
                exitDuration: 250,
                easing: 'ease-out',
                exitEasing: 'ease-in',
            }}>
            <Modal.Overlay />
            <Modal.Content p={4}>
                <HStack justifyContent="space-between" mb={4}>
                    <Modal.Heading fontWeight="semibold"> {props.title} </Modal.Heading>
                    <Modal.CloseButton />
                </HStack>
                {Children()}
            </Modal.Content>
        </Modal>
    )
}

export default ModalMenu
