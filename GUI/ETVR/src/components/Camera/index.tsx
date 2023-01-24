import { Image } from '@hope-ui/core'
import CameraStatusIndicator from './CameraIndicator/CameraIndicator'
import icons from '@assets/images'
import { ICamera } from '@src/store/mdns/mdns'
import { ActiveStatus } from '@src/utils/utils'

// TODO: switch camera based on status
// TODO: add modal for settings
// TODO: create grid to make it flexible

export const Camera = (props: ICamera) => {
    return (
        <div class=" m-[10px] pr-[14px] pl-[14px] py-[14px] pb-[14px] rounded-[14px] bg-[#333742] flex">
            <div class="flex">
                <div>
                    <CameraStatusIndicator activeStatus={props.status} />
                </div>
            </div>
            <div class="flex items-center">
                <div class="flex items-center h-[100%]">
                    <div class=" text-[#FFFF] bg-[#FFFF] w-[155px] h-[155px] background-[black] rounded-[14px]" />
                </div>
                <div class="bg-[#292D36] ml-[14px] rounded-[14px] h-[100%] p-[14px] ">
                    <div class="text-center  pb-[14px]">
                        <div class=" text-[#FFFF]">camera 1</div>
                    </div>
                    <div>
                        <div class="flex text-[#FFFF] justify-between">
                            <div class="pr-[25px] pb-[14px]">Camera IP</div>
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
                            <Image
                                src={icons.gearSolid}
                                objectFit={'contain'}
                                alt="logo"
                                width="20px"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
