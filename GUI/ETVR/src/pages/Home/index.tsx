import { For, Show } from 'solid-js'
import icons from '@assets/images/index'
import Camera from '@components/Camera'
import List from '@components/List/List'
import CustomPopover from '@components/header/CustomPopover/index'
import { setRestDevice } from '@src/store/api/restAPI'
import { cameras } from '@src/store/camera/selectors'
import { displayMode } from '@src/store/ui/selectors'
import { setDisplayMode, setOpenModal } from '@src/store/ui/ui'
import { POPOVER_ID } from '@src/utils/enums'

const Main = () => {
    return (
        <div class="py-[40px]">
            <div>
                <h1 class="text-4xl font-bold tracking-[0.10rem] text-[#FFFFFF]">TRACKERS</h1>
            </div>
            <div class="ml-[auto] mt-[20px] flex flex-grow content-center justify-between h-[100%] leading-5 font-sans font-medium rounded-[14px] p-[5px] bg-[#0e0e0e] w-[145px]">
                <div class="flex pr-[5px]">
                    <CustomPopover
                        active={displayMode()}
                        styles="h-[100%]"
                        id={POPOVER_ID.GRIP}
                        path=""
                        icon={icons.grip}
                        disablePopover={true}
                        onClick={() => setDisplayMode(POPOVER_ID.GRIP)}
                    />
                </div>
                <div class="flex pl-[5px]">
                    <CustomPopover
                        active={displayMode()}
                        onClick={() => setDisplayMode(POPOVER_ID.LIST)}
                        styles="h-[100%]"
                        id={POPOVER_ID.LIST}
                        path=""
                        icon={icons.list}
                        disablePopover={true}
                    />
                </div>
            </div>
            <div class="py-[40px]">
                <Show
                    when={cameras().length > 0}
                    fallback={
                        <div class="flex flex-col items-center justify-center w-full h-full">
                            <p class="text-2xl font-bold tracking-[0.10rem] text-[white]">
                                No cameras found
                            </p>
                        </div>
                    }>
                    {displayMode() === POPOVER_ID.GRIP ? (
                        <div class=" flex flex-wrap overflow-auto">
                            <For each={cameras()}>
                                {(camera) => (
                                    <Camera
                                        {...camera}
                                        onClick={() => {
                                            setRestDevice(camera.address)
                                            setOpenModal(true)
                                        }}
                                    />
                                )}
                            </For>
                        </div>
                    ) : (
                        <For each={cameras()}>
                            {(camera) => (
                                <List
                                    {...camera}
                                    onClick={() => {
                                        setRestDevice(camera.address)
                                        setOpenModal(true)
                                    }}
                                />
                            )}
                        </For>
                    )}
                </Show>
            </div>
        </div>
    )
}

export default Main
