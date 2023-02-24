export interface IProps {
    cameraHeight: number
    cameraWidth?: number
    cameraSrc: string
}

const CameraModalComponent = (props: IProps) => {
    return (
        <div>
            <iframe
                name="TV"
                class="rounded-xl"
                height={props.cameraHeight}
                width={props.cameraWidth || '100%'}
                src={props.cameraSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
            />
        </div>
    )
}

export default CameraModalComponent
