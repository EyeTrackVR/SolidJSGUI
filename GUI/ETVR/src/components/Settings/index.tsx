import CameraAddress from './CameraAddress/CameraAddress'
import CameraConfigOptions from './CameraConfigOptions'
import CameraInfo from './CameraInfo/CameraInfo'
import CameraSettings from './CameraSettings'
import CamerasModal from './CamerasModal'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import { CameraStatus, CameraType } from '@store/camera/camera'

// TODO: stuff todo requested by lorow
// honestly it looks good, I like that preview window. The camera ID I'd rename to camera IP though I'm not really sure if that's gonna be necessary,
//maybe a better idea would be to display the camera name and underneath it the IP?
// The status seems kinda redundant now that there is a status icon, we could make it so its text form is displayed on hover,
//like an alt. I'd also maybe make the status a whole <color> dot, instead of that skew-morphism-like dot, tho it has a charm to it xD
// The battery, like zanzy said, we don't really have that feature so that icon may not be needed just yet.
// The settings thing, I'd stick with them being in the top right corner, everyone is pretty much used to them being there,
// so there's no need to reinvent the wheel + way less work for you guys to get that going in vite

export interface IProps {
    onChange: (value: string) => void
    onClick: (selected: string) => void
    cameraIP: string
    cameraStatus: CameraStatus
    cameraType: CameraType
    placeholder: string
    CameraAddressHeader: string
    CameraConfigOptionsHeader: string
    CameraSettingsHeader: string
    camerasUrl: string[]
}

const Settings = (props: IProps) => {
    return (
        <div class="pt-[50px] grid grid-flow-col gap-[22px]">
            <div class="mt-[22px]">
                <CameraInfo
                    cameraIP={props.cameraIP}
                    cameraStatus={props.cameraStatus}
                    cameraType={props.cameraType}
                />
            </div>
            <div class="mt-[22px]">
                <div class="mb-[22px]">
                    <CameraAddress
                        onChange={(value) => props.onChange(value)}
                        placeholder={props.placeholder}
                        header={props.CameraAddressHeader}
                    />
                </div>
                <div class="mb-[22px]">
                    <CameraConfigOptions
                        header={props.CameraConfigOptionsHeader}
                        onClick={(selected) => props.onClick(selected)}
                    />
                </div>
                <div>
                    <CameraSettings
                        header={props.CameraSettingsHeader}
                        formats={Object.keys(RANGE_INPUT_FORMAT)}
                        onChange={(format, value) => {
                            console.log(format, value)
                        }}
                    />
                </div>
            </div>
            <div class="mt-[22px]">
                <CamerasModal camerasUrl={props.camerasUrl} />
            </div>
        </div>
    )
}
export default Settings
