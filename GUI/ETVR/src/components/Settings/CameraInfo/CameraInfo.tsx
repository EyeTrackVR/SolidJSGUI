import { CameraStatus } from '@src/store/camera/camera'
import { ActiveStatus } from '@src/utils/utils'

const CameraInfo = () => {
    return (
        <div class="flex grow   rounded-xl	flex-col pl-[14px] pr-[14px] pb-[14px] pt-[14px] bg-[#333742] text-[#FFFFFF]">
            <div class="flex  justify-between  pb-[14px]  ">
                <div>
                    <p class="font-[700]">camera Ip</p>
                </div>
                <div>
                    <p class="font-[700]">000_000_0</p>
                </div>
            </div>
            <div class="flex  justify-between  pb-[14px]">
                <div>
                    <p class="font-[700]    ">Camera Status</p>
                </div>
                <div style={{ color: ActiveStatus(CameraStatus.ACTIVE) }}>
                    <p>success</p>
                </div>
            </div>
            <div class="flex justify-between">
                <div>
                    <p class="font-[700]">Camera Type</p>
                </div>
                <div>
                    <p>wireless</p>
                </div>
            </div>
        </div>
    )
}

export default CameraInfo
