import { Image, Popover } from '@kobalte/core'
import { Link } from '@solidjs/router'
import { createSignal, createEffect, Show, onMount } from 'solid-js'
import { POPOVER_ID } from '@src/utils/enums'
import { classNames } from '@src/utils/utils'

export interface ICustomPopover {
    icon: string
    id: POPOVER_ID
    path: string
    popoverContent?: string
    disablePopover?: boolean
    onClick?: () => void
    styles?: string
    active?: string
}

const CustomPopover = (props: ICustomPopover) => {
    const [open, setOpen] = createSignal(false)

    onMount(() => {
        document.querySelectorAll(`#${props.id}`).forEach((el) => {
            el.addEventListener('mouseenter', () => {
                setOpen(true)
            })
            el.addEventListener('mouseleave', () => {
                setOpen(false)
            })
        })
    })
    createEffect(() => {
        if (!open()) {
            document.removeEventListener('mouseleave', (e) => {
                e.stopPropagation()
                setOpen(false)
            })
            document.removeEventListener('mouseenter', (e) => {
                e.stopPropagation()
                setOpen(false)
            })
        }
    })

    return (
        <div class="group relative inline-flex">
            <Popover.Root isOpen={open()}>
                <Link href={props.path} id={props.id} class="no-underline">
                    <Popover.Trigger
                        onPress={() => props.onClick?.()}
                        class={classNames(
                            'rounded-[8px] pl-[1.5rem]  pr-[1.5rem] hover:bg-[#252536] outline-none',
                            props.styles,
                        )}
                        style={{ background: props.active === props.id ? '#252536' : '' }}>
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
                </Link>
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

export default CustomPopover
