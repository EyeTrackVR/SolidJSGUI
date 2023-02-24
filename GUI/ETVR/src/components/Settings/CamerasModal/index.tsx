import { For } from 'solid-js'
import CameraModalComponent from './CameraModalComponent'

export interface IProps {
    camerasUrl: string[]
}

const CamerasModal = (props: IProps) => {
    return (
        <div class="bg-[#333742] rounded-xl pl-[14px] pr-[14px] pb-[14px] pt-[14px] min-w-[500px]">
            <For each={props.camerasUrl}>
                {(cameraUrl, index) => (
                    <div class={`mb-[${index() === cameraUrl.length ? '0px' : '14px'}]`}>
                        <CameraModalComponent cameraHeight={400} cameraSrc={cameraUrl} />
                    </div>
                )}
            </For>
        </div>
    )
}

export default CamerasModal
