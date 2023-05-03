import icons from '@assets/images'
import Input from '@components/Input'
import CameraCalibrationSettings from '@components/Settings/CameraCalibrationSettings'
import CameraConnectionStatus from '@components/Settings/CameraConnectionStatus/CameraInfo'
import CameraSettings from '@components/Settings/CameraSettings'
import CamerasModal from '@components/Settings/CamerasModal'
import { CameraStatus, RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import './styles.css'

export interface IProps {
    onChange: (format: string, value: number) => void
    onClickCircleCrop: () => void
    onClick: (selected: string) => void
    onClickBack: () => void
    onClickCalibrate: () => void
    onClickRecenter: () => void
    onClickCroppingMode: () => void
    onChangeCameraAddress: (value: string) => void
    cameraStatus: CameraStatus
    camerasUrl: string[]
    createNewCamera: boolean
}

const Settings = (props: IProps) => {
    return (
        <div>
            <div class="pt-12">
                <div>
                    <div class="flex cursor-pointer" onClick={() => props.onClickBack()}>
                        <div class="mr-3">
                            <img src={icons.arrow} alt="img" class=" w-full h-full m-auto" />
                        </div>
                        <div>
                            <p class="text-left text-white text-lg text-upper uppercase max-lg:text-sm ">
                                go back to home
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center gap-5">
                    <div class="mt-5 max-w-[700px] w-full ">
                        {!props.createNewCamera ? (
                            <div>
                                <div class="mb-5">
                                    <CameraConnectionStatus cameraStatus={props.cameraStatus} />
                                </div>
                            </div>
                        ) : null}
                        {props.createNewCamera ? (
                            <div>
                                <div class="mb-5">
                                    <Input
                                        header="Camera address"
                                        placeholder="Setup camera address"
                                        id="camera-address"
                                        required={true}
                                        type="text"
                                        onChange={(value) => {
                                            props.onChangeCameraAddress(value)
                                        }}
                                    />
                                </div>
                            </div>
                        ) : null}
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
                                onClickCircleCrop={() => {
                                    props.onClickCircleCrop()
                                }}
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
