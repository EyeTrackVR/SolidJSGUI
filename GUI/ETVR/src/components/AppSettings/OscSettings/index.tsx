import { Input } from '@components/Input'

export interface IProps {
    onChangeAddress: (value: string) => void
    onChangeOSCPort: (value: string) => void
    onChangeOSCReceiverPort: (value: string) => void
    onChangeOSCRecenterPort: (value: string) => void
    onChangeOSCRecalibrateAddress: (value: string) => void
}

const OscSettings = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-4 pr-4 pb-4 pt-4 bg-[#333742]">
            <div>
                <div class="pb-6 pl-3 pr-3">
                    <p class="text-start text-2xl">OSC settings</p>
                </div>
            </div>
            <div>
                <Input
                    onChange={(value) => {
                        props.onChangeAddress(value)
                    }}
                    placeholder="127.0.0.1"
                    header="OSC address"
                    type="text"
                />
            </div>
            <div>
                <Input
                    onChange={(value) => {
                        props.onChangeOSCPort(value)
                    }}
                    placeholder="900"
                    header="OSC port"
                    type="text"
                />
            </div>
            <div>
                <Input
                    onChange={(value) => {
                        props.onChangeOSCReceiverPort(value)
                    }}
                    placeholder="9001"
                    header="OSC receiver port"
                    type="text"
                />
            </div>
            <div>
                <Input
                    onChange={(value) => {
                        props.onChangeOSCRecenterPort(value)
                    }}
                    placeholder="/avatar/libraries/etvr_recenter"
                    header="OSC recenter address"
                    type="text"
                />
            </div>
            <div>
                <Input
                    onChange={(value) => {
                        props.onChangeOSCRecalibrateAddress(value)
                    }}
                    placeholder="/avatar/libraries/etvr_recenter"
                    header="OSC recalibrate address"
                    type="text"
                />
            </div>
        </div>
    )
}
export default OscSettings
