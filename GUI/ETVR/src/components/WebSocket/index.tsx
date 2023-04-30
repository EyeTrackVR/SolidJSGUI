import { Switch, Match, Show } from 'solid-js'
import { OrangeLoader, MagentaLoader } from '@components/Loader'
import { classNames } from '@src/utils'
import { CameraStatus } from '@store/camera/camera'
import { showCameraView } from '@store/ui/selectors'

// TODO: Grab selected camera from store, connect if not connected, and display video stream on component mounted
type IWsProps = {
    status: CameraStatus
    styles?: string
}

// TODO: Make other loader components for other statuses
export const LoaderHandler = (props: IWsProps) => {
    return (
        <Switch>
            <Match when={props.status == CameraStatus.LOADING}>
                <OrangeLoader width={100} height={100} unit={'%'} />
            </Match>
            <Match when={props.status == CameraStatus.ACTIVE}>
                <OrangeLoader width={100} height={100} unit={'%'} />
            </Match>
            <Match
                when={props.status == CameraStatus.DISABLED || props.status == CameraStatus.FAILED}>
                <MagentaLoader width={100} height={100} unit={'%'} id="magenta" />
            </Match>
            <Match when={props.status == CameraStatus.NONE}>
                <OrangeLoader width={100} height={100} unit={'%'} />
            </Match>
        </Switch>
    )
}

const WebSocketHandler = (props: IWsProps) => {
    return (
        <div class="w-full h-full">
            <Show
                when={showCameraView()}
                fallback={
                    <div
                        class={classNames(
                            props.styles,
                            'text-[#FFFF] flex justify-center items-center bg-[#2b2f38] rounded-t-xl min-[1750px]:rounded-xl w-full h-full',
                        )}>
                        <LoaderHandler status={props.status} />
                    </div>
                }>
                <video class="bg-black rounded-t-xl w-full h-full" autoplay>
                    <source src="" type="video/mp4" />
                </video>
            </Show>
        </div>
    )
}

export default WebSocketHandler
