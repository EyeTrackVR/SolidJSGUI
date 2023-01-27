import { Text } from '@hope-ui/core'
import { createSignal, Show, For } from 'solid-js'
import icons from '@assets/images/index'
import { Camera } from '@components/Camera'
import { CustomPopover } from '@components/header/CustomPopover'
import { cameras } from '@src/store/camera/selectors'
import { CAMERA_VIEW_MODE } from '@src/utils/enums'

const CameraHandler = () => {
    return (
        <Show
            when={cameras().length > 0}
            fallback={
                <div class="flex flex-col items-center justify-center w-full h-full">
                    <Text size="2xl" class="font-bold tracking-[0.10rem] text-[white]">
                        No cameras found
                    </Text>
                </div>
            }>
            <For each={cameras()}>
                {(camera) => {
                    return <Camera {...camera} />
                }}
            </For>
        </Show>
    )
}

const Main = () => {
    const [selectMode, setSelectMode] = createSignal(CAMERA_VIEW_MODE.GRIP)
    return (
        <div class="py-[40px]">
            <div>
                <Text size="4xl" class="font-bold tracking-[0.10rem] text-[#FFFFFF]">
                    TRACKERS
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
