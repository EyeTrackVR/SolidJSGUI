import CameraCalibrationSettings from './CameraCalibrationSettings'
import CameraConnectionStatus from './CameraConnectionStatus/CameraInfo'
import CameraSettings from './CameraSettings'
import CamerasModal from './CamerasModal'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import { CameraStatus } from '@store/camera/camera'

export interface IProps {
    onChange: (format: string, value: number) => void
    onClick: (selected: string) => void
    onClickBack: () => void
    onClickCalibrate: () => void
    onClickRecenter: () => void
    onClickCroppingMode: () => void
    cameraStatus: CameraStatus
    camerasUrl: string[]
}

const Settings = (props: IProps) => {
    return (
        <div>
            <div class="pt-12">
                <div onClick={() => props.onClickBack()}>
                    <p class="text-left text-white text-lg text-upper uppercase cursor-pointer">
                        go back to home
                    </p>
                </div>
                <div class="flex justify-center gap-5">
                    <div class="mt-5 max-w-[700px] w-full ">
                        <div>
                            <div class="mb-5">
                                <CameraConnectionStatus cameraStatus={props.cameraStatus} />
                            </div>
                        </div>
                        <div>
                            <div class="mb-5">
                                <CameraCalibrationSettings
                                    onClickCalibrate={() => {
                                        props.onClickCalibrate()
                                    }}
                                    onClickRecenter={() => {
                                        props.onClickRecenter()
                                    }}
                                    onClickCroppingMode={() => {
                                        props.onClickCroppingMode()
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <CameraSettings
                                formats={Object.keys(RANGE_INPUT_FORMAT)}
                                onChange={(format, value) => {
                                    props.onChange(format, value)
                                }}
                            />
                        </div>
                    </div>
                    <div class="mt-5 max-w-[500px] w-full">
                        <CamerasModal camerasUrl={props.camerasUrl} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings
