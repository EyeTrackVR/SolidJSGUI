const ListHeader = () => {
    return (
        <div class="grid grid-flow-col auto-cols-fr pr-[12px] pl-[12px] pt-[12px] pb-[12px] rounded-[10px] mb-[20px] text-white s">
            <div>
                <p class="text-ellipsis overflow-hidden whitespace-nowrap text-left text-base">
                    Camera
                </p>
            </div>
            <div>
                <p class="text-ellipsis overflow-hidden whitespace-nowrap max-md:text-right text-left m-auto text-base">
                    Camera Address
                </p>
            </div>
            <div class="max-sm:hidden">
                <div>
                    <p class="text-ellipsis overflow-hidden whitespace-nowrap max-md:text-right text-left m-auto text-base">
                        Camera Type
                    </p>
                </div>
            </div>
            <div class="max-md:hidden">
                <div>
                    <p class="text-right text-ellipsis overflow-hidden whitespace-nowrap m-auto text-base">
                        Status
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ListHeader
