import { Link } from '@solidjs/router'
import { CustomPopover } from './CustomPopover'
import { Logo } from './Logo'
import icons from '@assets/images'
import './styles.css'

interface Iprops {
    name: string
}

export default function Header(props: Iprops) {
    return (
        <header class="pr-4 pl-4 grow content-center">
            <div class="flex grow justify-between items-center mt-[1rem]">
                <div>
                    <Logo />
                </div>
                <div class="flex h-[55%] content-center mt-[5px]">
                    <div class="flex grow justify-center border-none shadow-lg items-center content-center leading-5 font-sans font-medium text-[.75rem] rounded-[15px] h-[100%] w-[100%] bg-[#0e0e0e] text-[#5f5f5f]">
                        <div class="flex grow content-center justify-between h-[100%] leading-5 font-sans font-medium rounded-[14px] pl-[5px] pr-[5px] pt-[5px] bg-[#0e0e0e] w-[145px]">
                            <Link href="/" class="no-underline">
                                <CustomPopover
                                    icon={icons.cameraSolid}
                                    popoverContent="Tracker manager"
                                />
                            </Link>
                            <Link href="/settings" class="no-underline">
                                <CustomPopover
                                    icon={icons.gearSolid}
                                    popoverContent="Settings"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="inline-flex mt-[5px] justify-center rounded-[14px] bg-[#0e0e0e] bg-opacity-100 font-medium">
                    <div class="flex rounded-[14px] h-[100%] flex-row basis-[100%] justify-center content-stretch pt-[11.3px] pb-[11.3px] pr-[1.5rem] pl-[1.5rem]">
                        <span class="quick-menu-text-gradient text-[#FFFFFF]">{props.name}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
