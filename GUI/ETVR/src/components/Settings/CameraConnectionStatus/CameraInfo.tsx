import { CameraStatus } from '@src/store/camera/camera'
import { ActiveStatus } from '@src/utils/utils'

export interface IProps {
    cameraStatus: CameraStatus
}

const CameraConnectionStatus = (props: IProps) => {
    return (
        <div>
            <div class="flex-col pl-4 pr-4 rounded-xl pb-4 pt-4 bg-[#333742] text-white">
                <div>
                    <div class="text-base flex justify-between">
                        <div>
                            <p class="font-[700]">Camera status</p>
                        </div>
                        <div>
                            <div style={{ color: ActiveStatus(props.cameraStatus) }}>
                                <p>{props.cameraStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraConnectionStatus
