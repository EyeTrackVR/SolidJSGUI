import WebSocketHandler from '@components/WebSocket'

export interface IProps {
    cameraHeight: number
    cameraWidth?: number
    cameraSrc: string
}

const CameraModalComponent = (props: IProps) => {
    return (
        <div>
            <WebSocketHandler borderRadius="rounded-[14px]" />
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
