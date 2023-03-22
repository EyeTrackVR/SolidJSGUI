import CameraAddress from './CameraAddress/CameraAddress'
import CameraInfo from './CameraInfo/CameraInfo'
import CameraSettings from './CameraSettings'
import CamerasModal from './CamerasModal'
import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import { CameraStatus, CameraType } from '@store/camera/camera'
import { useGHRelease, doGHRequest } from '@utils/hooks/api/useGHReleases'

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
    //const { data, setFirmware } = useGHRelease()
    //setFirmware('esp32Cam')
    return (
        <div class="pt-[50px] grid grid-flow-col gap-[22px]">
            <div class="mt-[22px]  hidden  2xl:block  ">
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
                <div class="mb-[22px] block 2xl:hidden">
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
            <div class="mt-[22px]">
                <button
                    class="bg-[#2f80ed] text-white rounded-md px-[22px] py-[10px] font-bold"
                    onClick={doGHRequest}>
                    Get Release
                </button>
            </div>
        </div>
    )
}
export default Settings
