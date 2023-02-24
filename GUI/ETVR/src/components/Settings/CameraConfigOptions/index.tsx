export interface IProps {
    header: string
    onClick: (selected: string) => void
}

const CameraConfigOptions = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-[14px] pr-[14px] pb-[14px] pt-[14px] bg-[#333742] ">
            <div class="flex  justify-between">
                <div>
                    <p class="font-[700] text-[#FFFFFF] text-lg">{props.header}</p>
                </div>
            </div>
        </div>
    )
}

export default CameraConfigOptions
