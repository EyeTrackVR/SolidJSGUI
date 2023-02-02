import { Image } from '@kobalte/core'
import { onMount, Show } from 'solid-js'
import icons from '@assets/images/index'
import { showCameraView } from '@store/ui/selectors'
import { initWebSocket } from '@utils/hooks/websocket'

interface IProps {
    borderRadius: string
}

// TODO: Handle camera loaders here
const LoaderHandler = (props: IProps) => {
    return (
        <Image.Root>
            <Image.Img
                src={icons.logo}
                alt="logo"
                width="100%"
                height="100%"
                class={`${props.borderRadius}`}
            />
        </Image.Root>
    )
}

const WebSocketHandler = (props: IProps) => {
    onMount(async () => {
        initWebSocket()
    })

    return (
        <div>
            <Show
                when={showCameraView()}
                fallback={() => <LoaderHandler borderRadius={props.borderRadius} />}>
                <video
                    id="camera__view"
                    /* mousedown="mouseDown($event)"
                    mouseup="mouseUp($event)"
                    mousemove="mouseMove($event)"
                    wheel="wheel($event)" */
                    class="camera__view"
                    autoplay
                />
            </Show>
        </div>
    )
}

export default WebSocketHandler
