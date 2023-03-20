import { CameraStatus, CameraType } from '@src/store/camera/camera'
import { ActiveStatus } from '@src/utils/utils'

export interface IProps {
    cameraIP: string
    cameraStatus: CameraStatus
    cameraType: CameraType
}

const CameraInfo = (props: IProps) => {
    return (
        <div class="flex-col pl-[14px] pr-[14px] rounded-xl pb-[14px] pt-[14px] bg-[#333742] text-[#FFFFFF]">
            <div class="text-base flex justify-between ">
                <div>
                    <p class=" font-[700] ">Camera status</p>
                </div>
                <div>
                    <div style={{ color: ActiveStatus(props.cameraStatus) }}>
                        <p>{props.cameraStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraInfo
