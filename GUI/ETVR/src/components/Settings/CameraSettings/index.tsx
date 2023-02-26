import RangeInput from '@components/RangeInput'

export interface IProps {
    header: string
}

const CameraSettings = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-[14px] pr-[14px] pb-[14px] pt-[14px] bg-[#333742] ">
            <div class="flex  justify-between">
                <div>
                    <p class="font-[700] text-[#FFFFFF] text-lg">{props.header}</p>
                </div>
            </div>
            <div>
                <RangeInput />
            </div>
            <div>
                <RangeInput />
            </div>
            <div>
                <RangeInput />
            </div>
        </div>
    )
}

export default CameraSettings
