import { useNavigate } from '@solidjs/router'
import { createSignal, For } from 'solid-js'
import icons from '@assets/images'
import Camera from '@components/Camera'
import CreateCamera from '@components/Camera/CreateCamera'
import CustomSlideAnimation from '@components/CustomSlideAnimation'
import CustomPopover from '@components/Header/CustomPopover'
import List from '@components/List/List'
import ListHeader from '@components/List/ListHeader/ListHeader'
import { POPOVER_ID } from '@src/static/types/enums'
import { setRestDevice } from '@src/store/api/restAPI'
import { setSelectedCamera } from '@src/store/camera/camera'
import { cameras } from '@src/store/camera/selectors'
import './index.css'

const Home = () => {
    const [displayMode, setDisplayMode] = createSignal(POPOVER_ID.GRIP)

    const navigate = useNavigate()

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
                <div>
                    {displayMode() === POPOVER_ID.GRIP ? (
                        <div>
                            <div class="camera_grid">
                                <For each={cameras()}>
                                    {(camera) => (
                                        <Camera
                                            {...camera}
                                            onClick={() => {
                                                setSelectedCamera(camera)
                                                setRestDevice(camera.address)
                                                navigate('/settings', { replace: true })
                                            }}
                                        />
                                    )}
                                </For>
                                <div>
                                    <CreateCamera
                                        onClick={() => {
                                            navigate('/settings', { replace: true })
                                        }}
                                    />
                                </div>
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
                                                    setSelectedCamera(camera)
                                                    setRestDevice(camera.address)
                                                    navigate('/settings', { replace: true })
                                                }}
                                            />
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
