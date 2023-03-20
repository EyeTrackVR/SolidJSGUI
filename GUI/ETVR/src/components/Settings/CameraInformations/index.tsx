import { CameraStatus } from '@src/store/camera/camera'
import { ActiveStatus } from '@src/utils/utils'

export interface IProps {
    cameraStatus: CameraStatus
}

const CameraInformations = (props: IProps) => {
    return (
        <div class="rounded-x flex-col mb-6 pl-[14px] pr-[14px] rounded-xl pb-[14px] pt-[14px] bg-[#333742] text-[#FFFFFF]">
            <div>
                <div class="flex justify-between ">
                    <div>
                        <div>
                            <p class="text-lg font-[700]">Camera status</p>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{ color: ActiveStatus(props.cameraStatus) }}
                            class="flex  items-center">
                            <p>{props.cameraStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraInformations
