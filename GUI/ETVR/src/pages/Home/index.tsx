import icons from '@assets/images'
import Camera from '@components/Camera'
import CustomPopover from '@components/Header/CustomPopover'
import List from '@components/List/List'
import ListHeader from '@components/List/ListHeader/ListHeader'
import { POPOVER_ID } from '@src/static/types/enums'
import { setRestDevice } from '@src/store/api/restAPI'
import { cameras } from '@src/store/camera/selectors'
import { displayMode } from '@src/store/ui/selectors'
import { setDisplayMode, setOpenModal } from '@src/store/ui/ui'
import { For, Show } from 'solid-js'

const Main = () => {
    return (
        <div>
            <div class="py-[60px]">
                <div>
                    <div class="flex  items-center justify-between">
                        <div>
                            <div class="flex items-center ">
                                <h1 class=" text-[30px] font-bold tracking-[0.02em] text-white">
                                    CAMERAS
                                </h1>
                            </div>
                        </div>
                        <div>
                            <div class="mt-auto mb-auto ml-auto flex h-[45px] leading-5 font-sans font-medium rounded-xl p-1 bg-[#0e0e0e]">
                                <div class="flex pr-1">
                                    <CustomPopover
                                        active={displayMode()}
                                        styles="h-[100%]"
                                        popoverContent={POPOVER_ID.GRIP}
                                        icon={icons.grip}
                                        disablePopover={true}
                                        onClick={() => setDisplayMode(POPOVER_ID.GRIP)}
                                    />
                                </div>
                                <div class="flex pl-1">
                                    <CustomPopover
                                        active={displayMode()}
                                        onClick={() => setDisplayMode(POPOVER_ID.LIST)}
                                        styles="h-[100%]"
                                        popoverContent={POPOVER_ID.LIST}
                                        icon={icons.list}
                                        disablePopover={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Show
                    when={cameras().length > 0}
                    fallback={
                        <div>
                            <div class="flex flex-col items-center justify-center w-full h-full">
                                <p class="text-2xl font-bold tracking-[0.10rem] text-[white]">
                                    No cameras found
                                </p>
                            </div>
                        </div>
                    }>
                    {displayMode() === POPOVER_ID.GRIP ? (
                        <div>
                            <div class="py-[40px] items-center justify-center flex flex-wrap overflow-auto">
                                <For each={cameras()}>
                                    {(camera) => (
                                        <div>
                                            <Camera
                                                {...camera}
                                                onClick={() => {
                                                    setRestDevice(camera.address)
                                                    setOpenModal(true)
                                                }}
                                            />
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <ListHeader />
                            <For each={cameras()}>
                                {(camera) => (
                                    <div>
                                        <List
                                            {...camera}
                                            onClick={() => {
                                                setRestDevice(camera.address)
                                                setOpenModal(true)
                                            }}
                                        />
                                    </div>
                                )}
                            </For>
                        </div>
                    )}
                </Show>
            </div>
        </div>
    )
}

export default Main
