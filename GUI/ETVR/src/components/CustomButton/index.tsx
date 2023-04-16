export interface IProps {
    onClick: () => void
    name: string
    img: string
}

const CustomButton = (props: IProps) => {
    return (
        <div class="flex w-full h-full flex-col" onClick={() => props.onClick()}>
            <div class="h-full w-full">
                <img
                    src={props.img}
                    alt="img"
                    class="h-full m-auto max-w-[57px] max-md:max-w-[40px] max-xl:max-w-[50px]"
                />
            </div>
            <div class="flex justify-center items-end pt-2 h-full w-full text-white text-xl max-md:text-xs max-lg:text-sm max-xl:text-base">
                <p>{props.name}</p>
            </div>
        </div>
    )
}
export default CustomButton
