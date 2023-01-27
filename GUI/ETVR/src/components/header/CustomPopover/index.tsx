import { Image, Popover } from '@kobalte/core'
import { Link /* , useLocation */ } from '@solidjs/router'
import { createSignal, Show } from 'solid-js'

export interface ICustomPopover {
    icon: string
    path: string
    popoverContent?: string
    disablePopover?: boolean
    onClick?: () => void
}

export const CustomPopover = (props: ICustomPopover) => {
    const [open, setOpen] = createSignal(false)
    return (
        <div class="group relative inline-flex" onClick={() => props.onClick?.()}>
            <Popover.Root isOpen={open()} onOpenChange={setOpen}>
                <Link href={props.path} class="no-underline">
                    <Popover.Trigger class="popover__trigger rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
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
                            <Popover.Arrow class="popover__arrow" />
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
