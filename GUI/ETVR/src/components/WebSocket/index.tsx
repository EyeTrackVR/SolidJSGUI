import { onMount, Show } from 'solid-js'
import { OrangeLoader } from '@components/Loader'
import { showCameraView } from '@store/ui/selectors'
import { initWebSocket } from '@utils/hooks/websocket'

const WebSocketHandler = () => {
    onMount(async () => {
        initWebSocket()
    })

    return (
        <div class={'w-full h-full'}>
            <Show
                when={showCameraView()}
                fallback={() => (
                    <div
                        class={
                            'text-[#FFFF] flex justify-center bg-[#2b2f38]   rounded-t-xl min-[1750px]:rounded-xl w-full h-full'
                        }>
                        <OrangeLoader width={100} unit={'%'} />
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
