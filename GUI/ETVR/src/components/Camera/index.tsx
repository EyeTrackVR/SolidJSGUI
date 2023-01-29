import { Button } from '@kobalte/core'
import { FaSolidGear } from 'solid-icons/fa'
import CameraStatusIndicator from './CameraIndicator/CameraIndicator'
import { ICamera } from '@src/store/camera/camera'
import { ActiveStatus } from '@src/utils/utils'

export interface IProps extends ICamera {
    onClick: () => void
}

const Camera = (props: IProps) => {
    return (
        <div class="m-[10px] pr-[14px] pl-[14px] py-[14px] pb-[14px] rounded-[14px] bg-[#333742] flex">
            <div class="flex">
                <div>
                    <CameraStatusIndicator activeStatus={props.status} />
                </div>
            </div>
            <div class="flex items-center">
                <div class="flex items-center h-[100%]">
                    <div class=" text-[#FFFF] bg-[#FFFF] w-[155px] h-[155px] rounded-[14px]" />
                </div>
                <div class="bg-[#292D36] ml-[14px] rounded-[14px] h-[100%] p-[14px] ">
                    <div class="text-center  pb-[14px]">
                        <div class=" text-[#FFFF]"> {props.activeCameraSection} </div>
                    </div>
                    <div>
                        <div class="flex text-[#FFFF] justify-between">
                            <div class="pr-[25px] pb-[14px]">Camera Address</div>
                            <div>{props.address}</div>
                        </div>
                        <div class="flex text-[#FFFF] justify-between">
                            <div class="pr-[25px] pb-[14px]">Status</div>
                            <div style={{ color: ActiveStatus(props.status) }}>
                                {props.status.toLocaleLowerCase()}
                            </div>
                        </div>
                        <div class="flex text-[#FFFF] justify-between">
                            <div class="pr-[25px] pb-[14px]">Camera type</div>
                            <div>{props.type.toLocaleLowerCase()}</div>
                        </div>
                        <div class="flex text-[#FFFF] justify-end ">
                            <Button.Root aria-label="Settings" onPress={() => props.onClick()}>
                                <FaSolidGear size={15} />
                            </Button.Root>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Camera
