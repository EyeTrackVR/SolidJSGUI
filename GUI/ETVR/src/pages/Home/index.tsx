import { createSignal, For, Show } from 'solid-js'
import icons from '@assets/images'
import Camera from '@components/Camera'
import CustomSlideAnimation from '@components/CustomSlideAnimation'
import CustomPopover from '@components/Header/CustomPopover'
import List from '@components/List/List'
import ListHeader from '@components/List/ListHeader/ListHeader'
import { POPOVER_ID } from '@src/static/types/enums'
import { setRestDevice } from '@src/store/api/restAPI'
import { cameras } from '@src/store/camera/selectors'
import { setOpenModal } from '@src/store/ui/ui'
import './index.css'
const Home = () => {
    const [displayMode, setDisplayMode] = createSignal(POPOVER_ID.GRIP)

    return (
        <div>
            <div class="py-[60px]">
                <div>
                    <div class="flex items-center justify-between pb-8">
                        <div>
                            <div class="flex items-center ">
                                <h1 class=" text-3xl font-bold tracking-[0.02em] text-white">
                                    CAMERAS
                                </h1>
                            </div>
                        </div>
                        <div>
                            <CustomSlideAnimation
                                firstChild={
                                    <div
                                        class="flex"
                                        onClick={() => setDisplayMode(POPOVER_ID.GRIP)}>
                                        <CustomPopover
                                            styles="h-full"
                                            popoverContent={POPOVER_ID.GRIP}
                                            icon={icons.grip}
                                            disablePopover={true}
                                        />
                                    </div>
                                }
                                secondChild={
                                    <div
                                        class="flex"
                                        onClick={() => setDisplayMode(POPOVER_ID.LIST)}>
                                        <CustomPopover
                                            styles="h-full"
                                            popoverContent={POPOVER_ID.GRIP}
                                            icon={icons.list}
                                            disablePopover={true}
                                        />
                                    </div>
                                }
                            />
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
                            <div class="camera_grid">
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
