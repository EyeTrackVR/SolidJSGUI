import CameraAddress from './CameraAddress/CameraAddress'
import CameraInfo from './CameraInfo/CameraInfo'
import CameraSettings from './CameraSettings'
import CamerasModal from './CamerasModal'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import { CameraStatus, CameraType } from '@store/camera/camera'

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
                <div class="mb-[22px]">
                    <CameraInfo
                        cameraIP={props.cameraIP}
                        cameraStatus={props.cameraStatus}
                        cameraType={props.cameraType}
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
