import CameraCalibrationSettings from './CameraCalibrationSettings'
import CameraConnectionStatus from './CameraConnectionStatus/CameraInfo'
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
        <div>
            <div class="pt-12 grid grid-flow-col gap-5">
                <div>
                    <div class="mt-5">
                        <div>
                            <div class="mb-5">
                                <CameraConnectionStatus cameraStatus={props.cameraStatus} />
                            </div>
                        </div>
                        <div>
                            <div class="mb-5">
                                <CameraCalibrationSettings
                                    onClickCalibrate={() => {
                                        console.log('onClickCalibrate')
                                    }}
                                    onClickRecenter={() => {
                                        console.log('onClickRecenter')
                                    }}
                                    onClickCroppingMode={() => {
                                        console.log('onClickCroppingMode')
                                    }}
                                />
                            </div>
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
                </div>
                <div>
                    <div class="mt-5">
                        <CamerasModal camerasUrl={props.camerasUrl} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings
