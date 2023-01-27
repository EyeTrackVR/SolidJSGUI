import { Image, Popover } from '@hope-ui/core'
import { Link /* , useLocation */ } from '@solidjs/router'
import { Show } from 'solid-js'

export interface ICusomPopover {
    icon: string
    path: string
    popoverContent?: string
    disablePopover?: boolean
    onClick?: () => void
}

export const CustomPopover = (props: ICusomPopover) => {
    return (
        <div class="group relative inline-flex" onClick={() => props.onClick?.()}>
            <Popover triggerMode="hover">
                <Link href={props.path} class="no-underline">
                    <Popover.Trigger class="icon rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
                        <Image
                            src={props.icon}
                            objectFit={'contain'}
                            alt="logo"
                            width="20px"
                            height="35px"
                        />
                    </Popover.Trigger>
                </Link>
                <Show when={!props.disablePopover}>
                    <Popover.Content
                        w="max-content"
                        p={2}
                        class="icon rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
                        <p>{props.popoverContent ?? ''}</p>
                    </Popover.Content>
                </Show>
            </Popover>
        </div>
    )
}
