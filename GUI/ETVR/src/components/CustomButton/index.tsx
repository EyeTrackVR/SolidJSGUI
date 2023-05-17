import { createEffect, createSignal } from 'solid-js'

export interface IProps {
    onClick: (isButtonActive: boolean) => void
    name: string
    img: string
    enableActiveMode?: boolean
    isButtonActive?: boolean
}

const CustomButton = (props: IProps) => {
    const [isActive, setIsActivce] = createSignal(false)

    createEffect(() => {
        if (typeof props.isButtonActive !== 'undefined') {
            setIsActivce(props.isButtonActive)
        }
    })

    return (
        <div
            class={`flex w-full h-[auto] flex-col ${
                isActive() ? 'bg-[#0071FE]' : 'bg-[#333742]'
            }   ${
                isActive() ? 'hover:bg-[#0065E2]' : 'hover:bg-[#0071FE]'
            } rounded-lg p-2 cursor-pointer m-2`}
            onClick={() => {
                if (props.enableActiveMode) {
                    setIsActivce(!isActive())
                }
                props.onClick(isActive())
            }}>
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
