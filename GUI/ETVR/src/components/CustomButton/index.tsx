export interface IProps {
    onClick: () => void
    name: string
    img: string
}

const CustomButton = (props: IProps) => {
    return (
        <div class="flex w-full h-full flex-col">
            <div class="h-full w-full">
                <img src={props.img} alt="img" class=" max-w-[57px] h-full m-auto" />
            </div>
            <div class="h-[auto] w-full text-white text-xl">
                <p>{props.name}</p>
            </div>
        </div>
    )
}
export default CustomButton
