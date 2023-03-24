//import { Image } from '@kobalte/core'
import { onMount, Show } from 'solid-js'
//import icons from '@assets/images/index'
import { OrangeLoader } from '@components/Loader'
import { showCameraView } from '@store/ui/selectors'
import { initWebSocket } from '@utils/hooks/websocket'

interface IProps {
    borderRadius: string
    width: number
    height: number
    unit?: string
}

const WebSocketHandler = (props: IProps) => {
    onMount(async () => {
        initWebSocket()
    })

    return (
        <div class={`${props.borderRadius}`}>
            <Show
                when={showCameraView()}
                fallback={() => (
                    <div
                        class={`text-[#FFFF] bg-[#2b2f38] w-[${props.width}${props.unit}] h-[${props.height}${props.unit}] rounded-[5px]`}>
                        <OrangeLoader width={props.width} height={props.height} unit={props.unit} />
                    </div>
                )}>
                <video class="bg-black rounded-t-xl w-full h-full" autoplay>
                    <source src="" type="video/mp4" />
                </video>
            </Show>
        </div>
    )
}

export default WebSocketHandler
