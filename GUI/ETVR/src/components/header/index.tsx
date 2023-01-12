import icons from '@assets/images/index'

interface Iprops {
    name: string
}

export default function Header(props: Iprops) {
    return (
        <header>
            <div class="flex flex-grow justify-around items-center mt-[1rem]">
                <div>
                    <img
                        src={icons.logo}
                        alt="eytrackvrlogo"
                        class="bg-gray-800 hover:bg-black rounded-full focus:bg-black transition duration-200 ease-in focus:shadow-inner w-[90px] mr-[42.13px] shadow-lg"
                    />
                </div>
                <div>{props.name}</div>
            </div>
        </header>
    )
}
