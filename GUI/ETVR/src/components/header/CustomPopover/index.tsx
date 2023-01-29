import { Image, Popover } from '@kobalte/core'
import { createSignal, createEffect, Show, onMount } from 'solid-js'

export interface ICustomPopover {
    icon: string
    id: string
    popoverContent?: string
    disablePopover?: boolean
    onClick?: () => void
}

export const CustomPopover = (props: ICustomPopover) => {
    const [open, setOpen] = createSignal(false)
    onMount(() => {
        document.querySelectorAll(`#${props.id}`).forEach((el) => {
            el.addEventListener('mouseenter', () => {
                setOpen(true)
                console.log('hovered')
            })
            el.addEventListener('mouseleave', () => {
                setOpen(false)
                console.log('not hovered')
            })
        })
    })
    createEffect(() => {
        if (!open()) {
            document.removeEventListener('mouseleave', (e) => {
                e.stopPropagation()
                console.log('not hovered')
                setOpen(false)
            })
            document.removeEventListener('mouseenter', (e) => {
                e.stopPropagation()
                console.log('not hovered')
                setOpen(false)
            })
        }
    })
    return (
        <div class="group relative inline-flex" onClick={() => props.onClick?.()}>
            <Popover.Root isOpen={open()}>
                <Popover.Trigger class="rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
                    <Image.Root>
                        <Image.Img
                            src={props.icon}
                            alt="logo"
                            width="20px"
                            height="35px"
                            class="pt-1 pb-1"
                        />
                    </Image.Root>
                </Popover.Trigger>
                <Show when={!props.disablePopover}>
                    <Popover.Portal>
                        <Popover.Content class="popover__content">
                            <Popover.Arrow class="" />
                            <Popover.Description class="popover__description">
                                {props.popoverContent ?? ''}
                            </Popover.Description>
                        </Popover.Content>
                    </Popover.Portal>
                </Show>
            </Popover.Root>
        </div>
    )
}
