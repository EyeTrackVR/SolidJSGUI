import { Image } from '@kobalte/core'
import { Link } from '@solidjs/router'
import CustomPopover from './CustomPopover'
import icons from '@assets/images/index'
import './styles.css'

interface Iprops {
    name: string
}

const Header = (props: Iprops) => {
    return (
        <header class="pr-4 pl-4 grow content-center ">
            <div class="flex grow justify-between items-center mt-[1rem]">
                <Link href="/" class="no-underline">
                    <Image.Root>
                        <Image.Img src={icons.logo} alt="logo" width="80px" class="rounded-full" />
                    </Image.Root>
                </Link>
                <div class="flex  content-center h-[45px] mt-[5px]">
                    <div class="flex grow justify-center border-none shadow-lg items-center content-center leading-5 font-sans font-medium text-[.75rem] rounded-[15px] h-[100%] w-[100%] bg-[#0e0e0e] text-[#5f5f5f]">
                        <div class="ml-auto flex grow content-center justify-between h-full leading-5 font-sans font-medium rounded-xl p-1 bg-[#0e0e0e] w-[145px]">
                            <Link href="/" class="no-underline flex mr-[5px]">
                                <CustomPopover
                                    styles="h-[100%]"
                                    popoverContent="Tracker manager"
                                    icon={icons.cameraSolid}
                                />
                            </Link>
                            <Link href="/settings" class="no-underline flex pl-1">
                                <CustomPopover
                                    styles="h-[100%]"
                                    popoverContent="Settings"
                                    icon={icons.gearSolid}
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

export default Header
