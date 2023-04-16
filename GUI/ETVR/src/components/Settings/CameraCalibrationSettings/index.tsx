import icons from '@assets/images'
import CustomButton from '@components/CustomButton/index'

export interface IProps {
    onClickCalibrate: () => void
    onClickRecenter: () => void
    onClickCroppingMode: () => void
}

const CameraCalibrationSettings = (props: IProps) => {
    return (
        <div class="flex justify-evenly">
            <div class="w-full bg-[#333742] hover:bg-[#0071FE] rounded-lg p-2 cursor-pointer m-2">
                <CustomButton
                    name="Calibrate"
                    img={icons.calibrateIcon}
                    onClick={() => {
                        props.onClickCalibrate()
                    }}
                />
            </div>
            <div class="w-full bg-[#333742] hover:bg-[#0071FE] rounded-lg p-2 cursor-pointer m-2">
                <CustomButton
                    name="Recenter"
                    img={icons.recenterIcon}
                    onClick={() => {
                        props.onClickRecenter()
                    }}
                />
            </div>
            <div class="w-full bg-[#333742] hover:bg-[#0071FE] rounded-lg p-2 cursor-pointer m-2">
                <CustomButton
                    name="Cropping mode"
                    img={icons.croppingIcon}
                    onClick={() => {
                        props.onClickCroppingMode()
                    }}
                />
            </div>
        </div>
    )
}

export default CameraCalibrationSettings
