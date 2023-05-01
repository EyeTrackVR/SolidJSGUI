import WebSocketHandler from '@components/WebSocket'
import { ActiveStatus } from '@src/utils'
import { Camera } from '@static/types/interfaces'
import './index.css'
export interface IProps extends Camera {
    onClick: () => void
    firmwareVersion: string
}

const CameraComponent = (props: IProps) => {
    return (
        <div
            class="responsive-container m-auto justify-between items-center pr-3 pl-3 py-3 h-full min-h-[222px] pb-3 rounded-xl bg-[#333742] flex border-2 border-[#333742] hover:border-[#817DF7] hover:cursor-pointer"
            onClick={() => props.onClick()}>
            <div class="responsive-flex-container w-full h-full flex items-center flex-row">
                <div class="responsive-iframe-container flex items-center h-full w-full ">
                    <div class="h-full w-full ">
                        <WebSocketHandler status={props.status} />
                    </div>
                </div>
                <div class="flex flex-col justify-between responsive-spacer-container bg-[#292D36] rounded-b-xl min-[1749px]:rounded-xl max-w-[209px] h-full w-full p-3">
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
                                    <div class="text-[#A9B6BF] pr-2">
                                        <p>Address</p>
                                    </div>
                                </div>
                                <div class="overflow-hidden pl-2">
                                    <div class="text-white text-ellipsis overflow-hidden">
                                        <p class="overflow-hidden text-ellipsis">{props.address}</p>
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
                            <p>{props.firmwareVersion || 'v0.0.0'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraComponent
