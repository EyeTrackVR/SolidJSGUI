import { For } from 'solid-js'

export interface IProps {
    camerasUrl: string[]
}

const CamerasModal = (props: IProps) => {
    return (
        <div class="flex flex-row justify-center bg-[#333742] rounded-xl pl-4 pr-4 pb-4 pt-4  max-h-[876px] h-[876px] ">
            <div>
                <For each={props.camerasUrl}>
                    {(cameraUrl, index) => (
                        <div class={` mb-[${index() > cameraUrl.length ? '0px' : '22px'}]`}>
                            {/* < cameraHeight={400} cameraSrc={cameraUrl} /> */}
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default CamerasModal
