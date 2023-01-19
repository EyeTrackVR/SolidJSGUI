import { ICamera } from '@src/store/mdns/mdns'

export const Camera = (props: ICamera) => {
    return (
        <div class="pr-[28px] pl-[28px] py-[28px] pb-[28px] rounded-[14px] bg-[#333742] flex">
            <div class="pr-[10px]">
                <div>
                    <div class=" text-[#FFFF]">{props.address}</div>
                </div>
                <div>
                    <div class=" text-[#FFFF]">{props.address}</div>
                </div>
            </div>
            <div class="pl-[10px]">
                <div>
                    <div class=" text-[#FFFF]">{props.address}</div>
                </div>
                <div>
                    <div class=" text-[#FFFF]">{props.address}</div>
                </div>
            </div>
        </div>
    )
}
// soon i will add rest
