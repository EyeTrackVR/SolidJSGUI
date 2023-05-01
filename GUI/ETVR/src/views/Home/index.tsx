import { createSignal, For, Switch, Match } from 'solid-js'
import icons from '@assets/images'
import CameraComponent from '@components/Camera'
import CreateCamera from '@components/Camera/CreateCamera'
import CustomSlideAnimation from '@components/CustomSlideAnimation'
import CustomPopover from '@components/Header/CustomPopover'
import CreateListCamera from '@components/List/CreateListCamera'
import List from '@components/List/List'
import ListHeader from '@components/List/ListHeader/ListHeader'
import { POPOVER_ID } from '@static/types/enums'
import { Camera } from '@static/types/interfaces'
import './index.css'

export interface IProps {
    onClickNavigateCamera: (camera: Camera) => void
    onClickNavigateCreateCamera: () => void
    cameras: Camera[]
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
                    <Switch>
                        <Match when={displayMode() === POPOVER_ID.GRIP}>
                            <div>
                                <div class="camera_grid">
                                    <For each={props.cameras}>
                                        {(camera) => (
                                            <CameraComponent
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
                        </Match>
                        <Match when={displayMode() === POPOVER_ID.LIST}>
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
                                                    onClick={() =>
                                                        props.onClickNavigateCamera(camera)
                                                    }
                                                />
                                            </div>
                                        )}
                                    </For>
                                    <div>
                                        <CreateListCamera
                                            onClick={() => props.onClickNavigateCreateCamera()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Match>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Home
