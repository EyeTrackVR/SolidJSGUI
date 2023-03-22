export interface IProps {
    onChange: (value: string) => void
    placeholder: string
    header: string
}

const CameraAddress = (props: IProps) => {
    return (
        <div class="flex grow rounded-xl flex-col pl-3 pr-3 pb-3 pt-3 bg-[#333742] text-white">
            <div class="flex  justify-between  pb-3">
                <div>
                    <p class="font-[700] text-lg">{props.header}</p>
                </div>
            </div>
            <div class="flex justify-between pb-3">
                <input
                    class="text-lg w-full text-md bg-[#20202D] rounded-xl pt-3 pb-3 pl-3 pr-3 font-[700] "
                    onChange={(e) => props.onChange((e.target as HTMLInputElement).value)}
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    )
}

export default CameraAddress
