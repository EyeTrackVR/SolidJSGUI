import icons from '@assets/images/index'
import { Image, Popover } from '@hope-ui/core'
import './styles.css'
interface Iprops {
    name: string
}

export default function Header(props: Iprops) {
    return (
        <header>
            <div class="flex flex-grow justify-around items-center mt-[1rem]">
                <div>
                    <Image
                        src={icons.logo}
                        alt="logo"
                        objectFit="cover"
                        width="80px"
                        rounded={100}
                    />
                </div>
                <div class="flex h-[55%] content-center items-center mt-[5px]">
                    <div class="flex flex-grow justify-center border-none shadow-lg content-center leading-5 font-sans font-medium text-[.75rem] rounded-[15px] h-[100%] w-[100%] bg-[#0e0e0e] text-[#5f5f5f]">
                        <div class="flex flex-grow content-center justify-evenly h-[100%] leading-5 font-sans font-medium rounded-[14px] p-[5px] bg-[#0e0e0e]">
                            <div class="group relative inline-flex  pr-[0.25rem]">
                                <Popover triggerMode="hover">
                                    <Popover.Trigger class="icon rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
                                        <Image
                                            src={icons.cameraSolid}
                                            objectFit={'contain'}
                                            alt="logo"
                                            width="20px"
                                            height="35px"
                                        />
                                    </Popover.Trigger>
                                    <Popover.Content
                                        w="max-content"
                                        p={2}
                                        class="icon rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
                                        <p>Tracker manager </p>
                                    </Popover.Content>
                                </Popover>
                            </div>
                            <div class="group relative inline-flex pl-[0.25rem]">
                                <Popover triggerMode="hover">
                                    <Popover.Trigger class="icon rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
                                        <Image
                                            src={icons.gearSolid}
                                            objectFit={'contain'}
                                            alt="logo"
                                            width="20px"
                                            height="35px"
                                        />
                                    </Popover.Trigger>
                                    <Popover.Content
                                        w="max-content"
                                        p={2}
                                        class="icon rounded-[8px] pl-[1.5rem] pr-[1.5rem] focus:bg-[#252536] hover:bg-[#252536]">
                                        <p>settings</p>
                                    </Popover.Content>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inline-flex mt-[5px]  justify-center rounded-[14px] bg-[#0e0e0e] bg-opacity-100   font-medium    focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-100">
                    <div class="flex rounded-[14px] h-[100%]  flex-row basis-[100%] justify-center content-stretch pt-[11.3px] pb-[11.3px] pr-[1.5rem] pl-[1.5rem]">
                        <span class="quick-menu-text-gradient text-[#FFFFFF]">{props.name}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
