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
}

const WebSocketHandler = (props: IProps) => {
    onMount(async () => {
        initWebSocket()
    })

    return (
        <div class={`${props.borderRadius}`}>
            <Show
                when={showCameraView()}
                fallback={() => <OrangeLoader width={props.width} height={props.height} />}>
                <video
                    id="camera__view"
                    /* controls="" */
                    /* mousedown="mouseDown($event)"
                    mouseup="mouseUp($event)"
                    mousemove="mouseMove($event)"
                    wheel="wheel($event)" */
                    class="camera__view"
                    autoplay>
                    <source src="" type="video/mp4" />
                </video>
            </Show>
        </div>
    )
}

export default WebSocketHandler
