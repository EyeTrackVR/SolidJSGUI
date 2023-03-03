import { For } from 'solid-js'
import CameraModalComponent from './CameraModalComponent'

export interface IProps {
    camerasUrl: string[]
}

const CamerasModal = (props: IProps) => {
    return (
        <div class="flex flex-row justify-center bg-[#333742] rounded-xl pl-[14px] pr-[14px] pb-[14px] pt-[14px] min-w-[500px]">
            <div>
                <For each={props.camerasUrl}>
                    {(cameraUrl, index) => (
                        <div class={` mb-[${index() > cameraUrl.length ? '0px' : '22px'}]`}>
                            <CameraModalComponent cameraHeight={400} cameraSrc={cameraUrl} />
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default CamerasModal
