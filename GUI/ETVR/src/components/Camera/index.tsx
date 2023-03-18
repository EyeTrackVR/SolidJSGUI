import WebSocketHandler from '@components/WebSocket'
import { ActiveStatus } from '@src/utils/utils'
import { ICamera } from '@store/camera/camera'

export interface IProps extends ICamera {
    onClick: () => void
}

const Camera = (props: IProps) => {
    return (
        <div
            class="m-[10px] pr-[14px] pl-[14px] py-[14px] h-full min-h-[222px] pb-[14px] rounded-[14px] bg-[#333742] flex border-2 border-[#333742] hover:border-[#817DF7]  hover:cursor-pointer ease-in duration-150"
            onClick={() => props.onClick()}>
            <div class="flex items-center">
                <div class="flex items-center h-[100%]">
                    <div>
                        <div class="text-white bg-[#2b2f38] w-[180px] h-[180px] rounded-[14px] flex justify-center content-center items-center">
                            <WebSocketHandler
                                borderRadius="rounded-[14px]"
                                width={180}
                                height={180}
                            />
                        </div>
                    </div>
                </div>
                <div class="bg-[#292D36] ml-[8px] rounded-[14px] h-[100%] p-[14px] flex justify-between flex-col">
                    <div>
                        <div>
                            <div class="text-center pb-[22px]">
                                <div>
                                    <div class="text-white text-lg">
                                        <p>{props.activeCameraSection}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-base">
                                <div>
                                    <div class="text-[#A9B6BF]  pr-[25px] pb-[8px]">
                                        <p>Address</p>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-white">
                                        <p>{props.address}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex text-white justify-between text-base ">
                                <div>
                                    <div class="text-[#A9B6BF] pr-[25px] pb-[14px]">
                                        <p>Status</p>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: ActiveStatus(props.status) }}>
                                        <p>{props.status.toLocaleLowerCase()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-end text-white text-xs">
                            <p>v0.0.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Camera
