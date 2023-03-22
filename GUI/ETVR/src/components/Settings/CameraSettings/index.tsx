import { For } from 'solid-js'
import RangeInput from '@components/RangeInput'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'

export interface IProps {
    header: string
    onChange: (format: RANGE_INPUT_FORMAT, value: number) => void
    formats: string[]
}

const CameraSettings = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-4 pr-4 pb-4 pt-4 bg-[#333742]">
            <div>
                <div>
                    <div class="flex justify-between">
                        <div>
                            <p class="font-[700] text-white text-lg">{props.header}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class=" pl-4 pr-5 pb-4 pt-4">
                        <For each={props.formats}>
                            {(format) => (
                                <div>
                                    <div class="pb-6">
                                        <div>
                                            <p class="relative right-4 text-left font-[700] text-white text-lg">
                                                {RANGE_INPUT_FORMAT[format]}
                                            </p>
                                        </div>
                                        <div>
                                            <RangeInput
                                                onChange={(format, value) =>
                                                    props.onChange(format, value)
                                                }
                                                format={RANGE_INPUT_FORMAT[format]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </For>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CameraSettings
