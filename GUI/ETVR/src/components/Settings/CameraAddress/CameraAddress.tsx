export interface IProps {
    onChange: (value: string) => void
}

const CameraAddress = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-[14px] pr-[14px] pb-[14px] pt-[14px] bg-[#333742] text-[#FFFFFF]">
            <div class="flex  justify-between  pb-[14px]  ">
                <div>
                    <p class="font-[700] text-xl">Camera address</p>
                </div>
            </div>
            <div class="flex  justify-between  pb-[14px]">
                <input
                    class="w-[100%] text-md bg-[#20202D] rounded-xl pt-[14px] pb-[14px] pl-[14px] pr-[14px] font-[700] "
                    onChange={(e) => props.onChange((e.target as HTMLInputElement).value)}
                    placeholder="CAMERA NAME"
                />
            </div>
        </div>
    )
}

export default CameraAddress
