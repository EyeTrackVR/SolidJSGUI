import Button from '../Button'

export interface IProps {
    onClick: () => void
}

const TrackingAlgorithmSettings = (props: IProps) => {
    return (
        <div class="flex flex-col justify-end w-full m-auto">
            <div>
                <div class="pb-6">
                    <p class="text-start text-2xl">Tracking algorithm settings</p>
                </div>
            </div>
            <div>
                <div class="grid_app_settings">
                    <div>
                        <Button
                            name="Blob fallback"
                            enableChangeImage={true}
                            onClick={() => {
                                props.onClick()
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackingAlgorithmSettings
