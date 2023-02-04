import './styles.css'
import Settings from '@components/Settings'

const SettingsPage = () => {
    return <Settings />
}

export default SettingsPage

// <div class="pb-[5rem] h-[95%] xl:h-[100%] xl:pb-[1rem] grow flex-col pt-6 py-6 px-8">
//     <DropdownMenu.Root isOpen={open()} onOpenChange={setOpen}>
//         <DropdownMenu.Trigger class="dropdown-menu__trigger">
//             <span>Notification Type</span>
//         </DropdownMenu.Trigger>
//         <DropdownMenu.Portal>
//             <DropdownMenu.Content class="dropdown-menu__content">
//                 <DropdownMenu.Group>
//                     <DropdownMenu.GroupLabel class="dropdown-menu__group-label">
//                         Type
//                     </DropdownMenu.GroupLabel>
//                     <DropdownMenu.Item
//                         class="dropdown-menu__item"
//                         onClick={() => setType(ENotificationAction.APP)}>
//                         App Level Notification
//                     </DropdownMenu.Item>
//                     <DropdownMenu.Item
//                         class="dropdown-menu__item"
//                         onClick={() => setType(ENotificationAction.OS)}>
//                         OS Level Notification
//                     </DropdownMenu.Item>
//                 </DropdownMenu.Group>
//                 <DropdownMenu.Separator class="dropdown-menu__separator" />
//                 <DropdownMenu.Group>
//                     <DropdownMenu.GroupLabel class="dropdown-menu__group-label">
//                         Alert Type
//                     </DropdownMenu.GroupLabel>
//                     <DropdownMenu.Item
//                         class="dropdown-menu__item"
//                         onClick={() => setAlertType(ENotificationType.SUCCESS)}>
//                         SUCCESS
//                     </DropdownMenu.Item>
//                     <DropdownMenu.Item
//                         class="dropdown-menu__item"
//                         onClick={() => setAlertType(ENotificationType.ERROR)}>
//                         ERROR
//                     </DropdownMenu.Item>
//                 </DropdownMenu.Group>
//                 <DropdownMenu.Arrow />
//             </DropdownMenu.Content>
//         </DropdownMenu.Portal>
//     </DropdownMenu.Root>
//     <Button
//         color="blue"
//         onClick={() =>
//             addNotification(
//                 {
//                     title: 'Test',
//                     message: `This toast is created on ${new Date().toTimeString()}`,
//                     type: alertType(),
//                 },
//                 type(),
//             )
//         }
//         text="Add Notification"
//     />
// </div>

// import { DropdownMenu } from '@kobalte/core'
// import { createSignal } from 'solid-js'
// import Button from '@components/Button'
// import { addNotification } from '@src/store/ui/components/actions'
// import { ENotificationAction, ENotificationType } from '@static/types/enums'
// const [open, setOpen] = createSignal(false)
// const [type, setType] = createSignal<ENotificationAction>(ENotificationAction.APP)
// const [alertType, setAlertType] = createSignal<ENotificationType>(ENotificationType.INFO)
