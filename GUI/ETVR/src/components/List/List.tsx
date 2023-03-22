import { Button } from '@kobalte/core'
import { FaSolidGear } from 'solid-icons/fa'
import WebSocketHandler from '@components/WebSocket'
import { ICamera } from '@src/store/camera/camera'
import { ActiveStatus, CapitalizeFirstLetter } from '@src/utils'
export interface IList extends ICamera {
    onClick: () => void
}

const List = (props: IList) => {
    return (
        <div class="grid grid-flow-col auto-cols-fr pl-[12px] pt-[12px] pb-[12px] rounded-[10px] mb-[20px] bg-[#333742] text-white">
            <div class="flex items-center w-[500px]">
                <div>
                    <div class="text-[#FFFF] bg-[#2b2f38] w-[60px] h-[60px] rounded-[5px] flex justify-center content-center items-center">
                        <WebSocketHandler borderRadius="rounded-[5px]" width={75} height={75} />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-center text-left pl-[10px] sm:pr-[100px] md:max-2xl:pb-[40px] 2xl:pb-[40px]">
                        <div class="sm:hidden md:hidden lg:hidden xl:hidden mr-[8px] sm:mr-[100px]">
                            <p>{props.address}</p>
                        </div>
                        <Button.Root class="" aria-label="Settings" onClick={() => props.onClick()}>
                            <FaSolidGear size={15} />
                        </Button.Root>
                    </div>
                    <div class="md:hidden lg:hidden xl:hidden flex items-center">
                        <div
                            class="ml-[6px] w-[10px] h-[10px] rounded-[100%]"
                            style={{ background: ActiveStatus(props.status) }}
                        />
                        <div class="text-left pl-[10px] pr-[10px]">
                            <p>{CapitalizeFirstLetter(props.status.toLocaleLowerCase())}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="max-sm:hidden flex items-center justify-center ">
                <p class="text-left w-[150px] m-auto  max-md:text-right">{props.address}</p>
            </div>
            <div class="flex items-center text-left w-[150px] m-auto max-md:hidden">
                <div
                    class="ml-[6px] w-[10px] h-[10px] rounded-[100%]"
                    style={{ background: ActiveStatus(props.status) }}
                />
                <p class="pl-2">{CapitalizeFirstLetter(props.status.toLocaleLowerCase())}</p>
            </div>
            <div class="flex items-center justify-center max-sm:hidden">
                <p class="text-left w-[150px] m-auto  max-md:text-right">
                    {CapitalizeFirstLetter(props.type.toLocaleLowerCase())}
                </p>
            </div>
        </div>
    )
}

export default List
