import icons from '@assets/images'
import WebSocketHandler from '@components/WebSocket'
import { CameraStatus } from '@src/store/camera/camera'
import './index.css'

export interface IProps {
    onClickBack: () => void
    onClickSaveCrop: () => void
    cameraConnectingStatus: CameraStatus
}

const CropSettings = (props: IProps) => {
    return (
        <div>
            <div class="pt-12">
                <div>
                    <div class="flex cursor-pointer pb-5" onClick={() => props.onClickBack()}>
                        <div class="mr-3">
                            <img src={icons.arrow} alt="img" class=" w-full h-full m-auto" />
                        </div>
                        <div>
                            <p class="text-left text-white text-lg text-upper uppercase max-lg:text-sm ">
                                go back to home
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-center flex-col gap-5">
                        <div>
                            <div class="h-[750px] w-full bg-[#333742] rounded-xl p-4">
                                <WebSocketHandler
                                    status={props.cameraConnectingStatus}
                                    styles="rounded-xl"
                                />
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-end">
                                <div>
                                    <button
                                        onClick={() => props.onClickSaveCrop()}
                                        class="bg-[#0071FE] text-base pt-[13px] pb-[13px] pl-[64px] pr-[64px] rounded-xl text-white ">
                                        Save crop
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CropSettings
