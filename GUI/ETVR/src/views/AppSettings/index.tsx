import FilterParameters from '@components/AppSettings/FilterParameters'
import GeneralSettings from '@components/AppSettings/GeneralSettings'
import OscSettings from '@components/AppSettings/OscSettings'
import TrackingAlghoritmSettings from '@components/AppSettings/TrackingAlghoritmSettings'
import { RANGE_INPUT_FORMAT_APP_SETTINGS } from '@src/static/types/enums'

export interface IProps {
    onClickFlipLeftXAxis: () => void
    onClickFlipRightXAxis: () => void
    onClickFlipYAxis: () => void
    onClickDualEyeFalloff: () => void
    onClickSyncBlinks: () => void
    onClickBlobFallback: () => void
    onChange: (format: string, value: number) => void
    onChangeAddress: (value: string) => void
    onChangeOSCPort: (value: string) => void
    onChangeOSCReciverPort: (value: string) => void
    onChangeOSCRecenterPort: (value: string) => void
    onChangeOSCRecalibrateAddress: (value: string) => void
}

const AppSettings = (props: IProps) => {
    return (
        <div class="w-full flex justify-center align-center flex-col items-center max-w-[1200px]">
            <div class="w-full flex justify-center align-center flex-col pb-12">
                <GeneralSettings
                    onClickFlipLeftXAxis={() => {
                        props.onClickFlipLeftXAxis()
                    }}
                    onClickFlipRightXAxis={() => {
                        props.onClickFlipRightXAxis()
                    }}
                    onClickFlipYAxis={() => {
                        props.onClickFlipYAxis()
                    }}
                    onClickDualEyeFalloff={() => {
                        props.onClickDualEyeFalloff()
                    }}
                    onClickSyncBlinks={() => {
                        props.onClickSyncBlinks()
                    }}
                />
            </div>
            <div class="w-full flex justify-center align-center flex-col pb-12">
                <TrackingAlghoritmSettings onClick={() => props.onClickBlobFallback()} />
            </div>
            <div class="w-full pb-12">
                <FilterParameters
                    disablePercent={true}
                    onChange={(format, value) => props.onChange(format, value)}
                    formats={Object.keys(RANGE_INPUT_FORMAT_APP_SETTINGS)}
                />
            </div>
            <div class="w-full pb-12">
                <OscSettings
                    onChangeAddress={(value) => {
                        props.onChangeAddress(value)
                    }}
                    onChangeOSCPort={(value) => {
                        props.onChangeOSCPort(value)
                    }}
                    onChangeOSCReciverPort={(value) => {
                        props.onChangeOSCReciverPort(value)
                    }}
                    onChangeOSCRecenterPort={(value) => {
                        props.onChangeOSCRecenterPort(value)
                    }}
                    onChangeOSCRecalibrateAddress={(value) => {
                        props.onChangeOSCRecalibrateAddress(value)
                    }}
                />
            </div>
        </div>
    )
}

export default AppSettings
