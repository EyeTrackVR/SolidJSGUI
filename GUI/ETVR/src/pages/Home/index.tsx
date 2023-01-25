import { Text } from '@hope-ui/core'
import { createSignal, Show, For, onCleanup, createEffect } from 'solid-js'
import icons from '@assets/images/index'
import { Camera } from '@components/Camera'
import { CustomPopover } from '@components/header/CustomPopover'
import { ICamera } from '@src/store/mdns/mdns'
import { cameras } from '@src/store/mdns/selectors'
import { CAMERA_VIEW_MODE } from '@src/utils/enums'

const CameraHandler = () => {
    const _cameras = cameras()
    return (
        <>
            <Show
                when={_cameras.size > 0}
                fallback={
                    <div class="flex flex-col items-center justify-center w-full h-full">
                        <Text size="2xl" class="font-bold tracking-[0.10rem] text-[white]">
                            No cameras found
                        </Text>
                    </div>
                }>
                <For each={Array.from({ length: _cameras.size })}>
                    {() => {
                        createEffect(() =>
                            console.log('increment:', _cameras.values().next().value)
                        )
                        return <Camera {...(_cameras.values().next().value as ICamera)} />
                    }}
                </For>
            </Show>
        </>
    )
}

const Main = () => {
    const [selectMode, setSelectMode] = createSignal(CAMERA_VIEW_MODE.GRIP)
    return (
        <div class="py-[40px]">
            <div>
                <Text size="4xl" class="font-bold tracking-[0.10rem] text-[#FFFFFF]">
                    CAMERAS
                </Text>
            </div>
            <div class="ml-[auto] mt-[20px] flex flex-grow content-center justify-between h-[100%] leading-5 font-sans font-medium rounded-[14px] p-[5px] bg-[#0e0e0e] w-[145px]">
                <div class="flex pr-[5px]">
                    <CustomPopover path="" icon={icons.grip} disablePopover={true} />
                </div>
                <div class="flex pl-[5px]">
                    <CustomPopover path="" icon={icons.list} disablePopover={true} />
                </div>
            </div>
            <div class="py-[40px] flex flex-wrap overflow-auto">
                <CameraHandler />
            </div>
        </div>
    )
}

export default Main
