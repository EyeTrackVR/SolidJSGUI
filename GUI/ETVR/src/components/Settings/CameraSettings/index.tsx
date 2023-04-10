import { For } from 'solid-js'
import RangeInput from '@components/RangeInput'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'

export interface IProps {
    onChange: (format: string, value: number) => void
    onClickCircleCrop: () => void
    formats: string[]
}

const CameraSettings = (props: IProps) => {
    return (
        <div
            class="flex grow rounded-xl
            flex-col pl-4 pr-4 pb-4 pt-4 bg-[#333742]">
            <div>
                <div class="flex justify-between">
                    <div>
                        <p class="font-[700] text-white text-lg">Camera settings</p>
                    </div>
                </div>
            </div>
            <div>
                <div class="pt-3">
                    <div>
                        <div class="flex">
                            <div style={{ display: 'flex', 'align-items': 'center' }}>
                                <div>
                                    <p class="text-base text-white pr-2">Tracking mode:</p>
                                </div>
                            </div>
                            <div>
                                <div class="pt-2 pb-2 pr-3 pl-3 bg-[#20202D] rounded-lg text-white hover:bg-[#0071FE] cursor-pointer">
                                    <div>
                                        <button>Circle crop</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="pt-3">
                    <For each={props.formats}>
                        {(format) => (
                            <div>
                                <div class="pb-6">
                                    <div>
                                        <p class="text-left font-[700] text-white text-lg">
                                            {RANGE_INPUT_FORMAT[format]}
                                        </p>
                                    </div>
                                    <div class="pl-4 pr-4">
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
    )
}

export default CameraSettings
