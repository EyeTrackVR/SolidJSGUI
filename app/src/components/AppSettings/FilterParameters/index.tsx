import { For } from 'solid-js'
import RangeInput from '@components/RangeInput'
import { RANGE_INPUT_FORMAT_APP_SETTINGS } from '@src/static/types/enums'

export interface IProps {
    onChange: (format: string, value: number) => void
    formats: string[]

    disablePercent?: boolean
}

const FilterParameters = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-4 pr-4 pb-4 pt-4 bg-[#333742]">
            <div>
                <div class="pb-6">
                    <p class="text-start text-2xl">Filter parameters</p>
                </div>
            </div>
            <div>
                <For each={props.formats}>
                    {(format) => (
                        <div>
                            <div class="pb-6">
                                <div>
                                    <p class="text-left font-[700] text-white text-lg">
                                        {RANGE_INPUT_FORMAT_APP_SETTINGS[format]}
                                    </p>
                                </div>
                                <div class="pl-4 pr-4">
                                    <RangeInput
                                        disablePercent={props.disablePercent}
                                        onChange={(format, value) => props.onChange(format, value)}
                                        format={RANGE_INPUT_FORMAT_APP_SETTINGS[format]}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
}

export default FilterParameters
