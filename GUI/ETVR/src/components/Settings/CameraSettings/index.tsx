import RangeInput from '@components/RangeInput'

export interface IProps {
    header: string
}

const CameraSettings = (props: IProps) => {
    return (
        <div>
            <RangeInput />
            <RangeInput />
        </div>
    )
}

export default CameraSettings
