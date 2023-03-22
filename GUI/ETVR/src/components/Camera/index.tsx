import { ActiveStatus } from '@src/utils'
import { ICamera } from '@store/camera/camera'
import './index.css'
export interface IProps extends ICamera {
    onClick: () => void
}

const Camera = (props: IProps) => {
    return (
        <div
            class="responsive-container m-auto justify-between items-center pr-[14px] pl-[14px] py-[14px] h-full min-h-[222px] pb-[14px] rounded-[14px] bg-[#333742] flex border-2 border-[#333742] hover:border-[#817DF7]  hover:cursor-pointer"
            onClick={() => props.onClick()}>
            <div class=" responsive-flex-container w-full h-full flex items-center flex-row">
                <div class="responsive-iframe-container flex items-center h-full w-full ">
                    <div class="h-full w-full">
                        <video class="bg-black rounded-t-[14px] w-full h-full" autoplay>
                            <source src={props.address} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div class="responsive-spacer-container bg-[#292D36] rounded-b-[14px] min-[1749px]:rounded-[14px]  h-[100%] w-full p-[14px] flex justify-between flex-col">
                    <div>
                        <div>
                            <div class="text-center pb-3">
                                <div>
                                    <div class="text-white text-lg">
                                        <p>{props.activeCameraSection}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-base 2xl:pb-3">
                                <div>
                                    <div class="text-[#A9B6BF]">
                                        <p>Address</p>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-white">
                                        <p>{props.address}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex text-white justify-between text-base pb-2 2xl:pb-3">
                                <div>
                                    <div class="text-[#A9B6BF]">
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
