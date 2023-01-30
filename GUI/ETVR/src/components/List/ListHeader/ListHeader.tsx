const ListHeader = () => {
    return (
        <div class="grid grid-flow-col auto-cols-fr  pl-[12px] pt-[12px] pb-[12px] rounded-[10px] mb-[20px] text-white">
            <div>
                <p class="text-left">Camera</p>
            </div>
            <div class="max-sm:hidden">
                <p class="max-md:text-right text-left w-[150px] m-auto ">Camera Address</p>
            </div>
            <div class="max-md:hidden">
                <p class="text-left w-[150px] m-auto ">Status</p>
            </div>
            <div>
                <p class="max-md:text-right text-left w-[150px] m-auto ">Camera Type</p>
            </div>
        </div>
    )
}

export default ListHeader
