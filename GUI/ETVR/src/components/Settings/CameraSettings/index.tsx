import RangeInput from '@components/RangeInput'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import { For } from 'solid-js'

export interface IProps {
    header: string
    onChange: (format: RANGE_INPUT_FORMAT, value: number) => void
    formats: string[]
}

const CameraSettings = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-[14px] pr-[14px] pb-[14px] pt-[14px] bg-[#333742]">
            <div class="flex  justify-between">
                <div>
                    <p class="font-[700] text-[#FFFFFF] text-lg">{props.header}</p>
                </div>
            </div>
            <div class=" pl-[14px] pr-[18px] pb-[14px] pt-[14px] ">
                <For each={props.formats}>
                    {(format) => (
                        <RangeInput
                            onChange={(format, value) => props.onChange(format, value)}
                            format={RANGE_INPUT_FORMAT[format]}
                        />
                    )}
                </For>
            </div>
        </div>
    )
}

export default CameraSettings
