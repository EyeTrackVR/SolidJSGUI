import { For, Show } from 'solid-js'
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

const Main = () => {
    return (
        <div class="py-[60px]">
            <div>
                <h1 class="pr-14 text-4xl font-bold tracking-[0.10rem] text-[#FFFFFF]">TRACKERS</h1>
            </div>
            <div class="  ml-auto mt-5 flex grow content-center justify-between h-[45px] leading-5 font-sans font-medium rounded-xl p-1 bg-[#0e0e0e] w-[145px]">
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
                    <div class="py-[40px] items-center justify-center flex flex-wrap overflow-auto">
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
                    <div>
                        <ListHeader />
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
                    </div>
                )}
            </Show>
        </div>
    )
}

export default Main
