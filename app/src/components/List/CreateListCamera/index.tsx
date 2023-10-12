import icons from '@assets/images'

export interface IProps {
    onClick: () => void
}

const CreateListCamera = (props: IProps) => {
    return (
        <div
            class="m-auto justify-center items-center pr-3 pl-3 py-3 h-full pb-3 rounded-xl bg-[#333742] flex border-2 border-[#333742] hover:border-[#817DF7] cursor-pointer"
            onClick={() => props.onClick()}>
            <div>
                <img src={icons.addIcon} alt="addIcon" class="max-h-[60px] aspect-square" />
            </div>
        </div>
    )
}

export default CreateListCamera
