import icons from '@assets/images'
import '../index.css'
export interface IProps {
    onClick: () => void
}

const CreateCamera = (props: IProps) => {
    return (
        <div
            class=" m-auto justify-center items-center pr-3 pl-3 py-3 h-full min-h-[222px] pb-3 rounded-xl bg-[#333742] flex border-2 border-[#333742] hover:border-[#817DF7]  hover:cursor-pointer"
            onClick={() => props.onClick()}>
            <div class="responsive-create-camera-img mt-[70px] mb-[70px]">
                <img src={icons.addIcon} alt="addIcon" class="p-[25%] aspect-square" />
            </div>
        </div>
    )
}

export default CreateCamera
