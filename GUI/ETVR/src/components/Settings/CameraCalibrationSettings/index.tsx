import icons from '@assets/images'
import CustomButton from '@components/CustomButton/index'
import { CameraCalibrationButtonType } from '@src/static/types/enums'

export interface IProps {
    onClickCalibrate: (isButtonActive: boolean) => void
    onClickRecenter: (isButtonActive: boolean) => void
    onClickCroppingMode: (isButtonActive: boolean) => void
    isButtonActive: { [key in CameraCalibrationButtonType]: boolean }
}

const CameraCalibrationSettings = (props: IProps) => {
    return (
        <div class="flex justify-evenly">
            <CustomButton
                isButtonActive={props.isButtonActive[CameraCalibrationButtonType.CALIBRATE]}
                name={CameraCalibrationButtonType.CALIBRATE}
                img={icons.calibrateIcon}
                onClick={props.onClickCalibrate}
            />
            <CustomButton
                isButtonActive={props.isButtonActive[CameraCalibrationButtonType.RECENTER]}
                name={CameraCalibrationButtonType.RECENTER}
                img={icons.recenterIcon}
                onClick={props.onClickRecenter}
            />
            <CustomButton
                isButtonActive={props.isButtonActive[CameraCalibrationButtonType.CROPPING_MODE]}
                name={CameraCalibrationButtonType.CROPPING_MODE}
                enableActiveMode={true}
                img={icons.croppingIcon}
                onClick={props.onClickCroppingMode}
            />
        </div>
    )
}

export default CameraCalibrationSettings
