import icons from '@assets/images'
import Button from '../Button'
import '../index.css'

export interface IProps {
    onClickFlipLeftXAxis: () => void
    onClickFlipRightXAxis: () => void
    onClickFlipYAxis: () => void
    onClickDualEyeFalloff: () => void
    onClickSyncBlinks: () => void
}

const GeneralSettings = (props: IProps) => {
    return (
        <div class="flex flex-col justify-end w-full m-auto">
            <div>
                <div class="pb-6">
                    <p class="text-start text-2xl">General Settings</p>
                </div>
            </div>
            <div>
                <div class="grid_app_settings">
                    <div>
                        <Button
                            name="Flip left X axis"
                            enableChangeImage={true}
                            img={icons.flipIconInactive}
                            secondImg={icons.flipIconActive}
                            onClick={() => {
                                props.onClickFlipLeftXAxis()
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            name="Flip right X axis"
                            enableChangeImage={true}
                            img={icons.flipIconInactive}
                            secondImg={icons.flipIconActive}
                            onClick={() => {
                                props.onClickFlipRightXAxis()
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            name="Flip Y axis"
                            img={icons.flipIconInactive}
                            secondImg={icons.flipIconActive}
                            onClick={() => {
                                props.onClickFlipYAxis()
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            styles="scale-[1.2]"
                            name="Dual eye falloff"
                            img={icons.eye}
                            onClick={() => {
                                props.onClickDualEyeFalloff()
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            name="Sync blinks"
                            img={icons.synchronize}
                            onClick={() => {
                                props.onClickSyncBlinks()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralSettings
