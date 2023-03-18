import icons from '@assets/images'
import Camera from '@components/Camera'
import CustomPopover from '@components/Header/CustomPopover'
import List from '@components/List/List'
import ListHeader from '@components/List/ListHeader/ListHeader'
import { ANIMATION_MODE, POPOVER_ID } from '@src/static/types/enums'
import { setRestDevice } from '@src/store/api/restAPI'
import { cameras } from '@src/store/camera/selectors'
import { displayMode } from '@src/store/ui/selectors'
import { setDisplayMode, setOpenModal } from '@src/store/ui/ui'
import { createSignal, For, Show } from 'solid-js'

const Home = () => {
    const [hoverMode, setHoverMode] = createSignal(ANIMATION_MODE.GRIP)

    return (
        <div>
            <div class="py-[60px]">
                <div>
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="flex items-center ">
                                <h1 class=" text-3xl   font-bold tracking-[0.02em] text-white">
                                    CAMERAS
                                </h1>
                            </div>
                        </div>
                        <div>
                            <div class="relative mt-auto mb-auto h-[45px] ml-auto flex leading-5 font-sans font-medium rounded-xl p-1 bg-[#0e0e0e]">
                                <div class="relative flex height-[20px]">
                                    <div
                                        class={`absolute bg-[#252536] w-1/2 h-full rounded-lg pointer-events-none ease-in duration-150  ${
                                            hoverMode().match(ANIMATION_MODE.LIST)
                                                ? 'right-[0%]'
                                                : 'right-[50%]'
                                        }`}
                                    />
                                    <div
                                        class="flex pr-1 "
                                        onClick={() => {
                                            setDisplayMode(POPOVER_ID.GRIP)
                                        }}
                                        onMouseLeave={() => {
                                            setHoverMode(
                                                displayMode().match(hoverMode())
                                                    ? ANIMATION_MODE.GRIP
                                                    : ANIMATION_MODE.LIST,
                                            )
                                        }}
                                        onMouseEnter={() => setHoverMode(ANIMATION_MODE.GRIP)}>
                                        <CustomPopover
                                            styles="h-[100%]"
                                            popoverContent={POPOVER_ID.GRIP}
                                            icon={icons.grip}
                                            disablePopover={true}
                                        />
                                    </div>
                                    <div
                                        class="flex pl-1 "
                                        onMouseLeave={() => {
                                            setHoverMode(
                                                displayMode().match(hoverMode())
                                                    ? ANIMATION_MODE.LIST
                                                    : ANIMATION_MODE.GRIP,
                                            )
                                        }}
                                        onMouseEnter={() => setHoverMode(ANIMATION_MODE.LIST)}
                                        onClick={() => setDisplayMode(POPOVER_ID.LIST)}>
                                        <CustomPopover
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
                            <div>
                                <ListHeader />
                            </div>
                            <div>
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
                        </div>
                    )}
                </Show>
            </div>
        </div>
    )
}

export default Home
