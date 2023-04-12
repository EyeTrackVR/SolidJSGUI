import { createSignal, For } from 'solid-js'
import icons from '@assets/images'
import Camera from '@components/Camera'
import CreateCamera from '@components/Camera/CreateCamera'
import CustomSlideAnimation from '@components/CustomSlideAnimation'
import CustomPopover from '@components/Header/CustomPopover'
import List from '@components/List/List'
import ListHeader from '@components/List/ListHeader/ListHeader'
import { POPOVER_ID } from '@static/types/enums'
import { ICamera } from '@store/camera/camera'
import './index.css'

export interface IProps {
    onClickNavigateCamera: (camera: ICamera) => void
    onClickNavigateCreateCamera: () => void
    cameras: ICamera[]
    firmwareVersion: string
}

const Home = (props: IProps) => {
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
                <div>
                    {displayMode() === POPOVER_ID.GRIP ? (
                        <div>
                            <div class="camera_grid">
                                <For each={props.cameras}>
                                    {(camera) => (
                                        <Camera
                                            firmwareVersion={props.firmwareVersion}
                                            {...camera}
                                            onClick={() => props.onClickNavigateCamera(camera)}
                                        />
                                    )}
                                </For>
                                <div>
                                    <CreateCamera
                                        onClick={() => props.onClickNavigateCreateCamera()}
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
                                <For each={props.cameras}>
                                    {(camera) => (
                                        <div>
                                            <List
                                                {...camera}
                                                onClick={() => props.onClickNavigateCamera(camera)}
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
