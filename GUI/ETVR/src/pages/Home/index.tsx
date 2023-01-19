import { Text } from '@hope-ui/core'
import { For } from 'solid-js'
import { Camera } from '@components/Camera'
import { cameras } from '@src/store/mdns/selectors'

const Main = () => {
    return (
        <div class="py-[40px]">
            <div>
                <Text size="4xl" class="font-bold tracking-[0.10rem] text-[#FFFFFF]">
                    CAMERAS
                </Text>
            </div>
            <div class="py-[40px] flex flex-wrap">
                <For each={cameras()}>
                    {(camera) => (
                        <div>
                            <Camera {...camera} />
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default Main
