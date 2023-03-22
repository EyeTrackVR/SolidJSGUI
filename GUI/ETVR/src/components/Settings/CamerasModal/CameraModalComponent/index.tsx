import WebSocketHandler from '@components/WebSocket'

export interface IProps {
    cameraHeight: number
    cameraWidth?: number
    cameraSrc: string
}

const CameraModalComponent = (props: IProps) => {
    return (
        <div class="text-[#FFFF] bg-[#2b2f38] w-[155px] h-[155px] rounded-[14px] flex justify-center content-center items-center">
            {/* <WebSocketHandler borderRadius="rounded-[14px]" width={110} height={110} /> */}
            {/* <iframe
                name="TV"
                class="rounded-xl"
                height={props.cameraHeight}
                width={props.cameraWidth || '100%'}
                src={props.cameraSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture full"
            /> */}
        </div>
    )
}

export default CameraModalComponent
