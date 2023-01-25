import { HStack, Modal } from '@hope-ui/core'
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
        <>
            <Modal
                isOpen={openModalStatus() ?? false}
                onClose={() => setOpenModal(false)}
                initialFocusSelector={props.initialFocus}>
                <Modal.Overlay />
                <Modal.Content p={4}>
                    <HStack justifyContent="space-between" mb={4}>
                        <Modal.Heading fontWeight="semibold">Title</Modal.Heading>
                        <Modal.CloseButton />
                    </HStack>
                    {Children()}
                </Modal.Content>
            </Modal>
        </>
    )
}

export default ModalMenu
