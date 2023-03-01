import { CameraStatus, CameraType } from '@src/store/camera/camera'
import { ActiveStatus } from '@src/utils/utils'

export interface IProps {
    cameraIP: string
    cameraStatus: CameraStatus
    cameraType: CameraType
}

const CameraInfo = (props: IProps) => {
    return (
        <div class="flex grow rounded-x flex-col pl-[14px] pr-[14px] rounded-xl pb-[14px] pt-[14px] bg-[#333742] text-[#FFFFFF]">
            <div class="flex justify-between pb-[14px]">
                <div class="flex  items-center">
                    <p class="text-lg font-[700]">Camera ip</p>
                </div>
                <div>
                    <p class="font-[700]">{props.cameraIP}</p>
                </div>
            </div>
            <div class="flex justify-between pb-[14px]">
                <div>
                    <p class="text-lg font-[700]">Camera status</p>
                </div>
                <div style={{ color: ActiveStatus(props.cameraStatus) }} class="flex  items-center">
                    <p>{props.cameraStatus}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <p class="text-lg font-[700]">Camera type</p>
                </div>
                <div class="flex  items-center">
                    <p>{props.cameraType}</p>
                </div>
            </div>
        </div>
    )
}

export default CameraInfo
