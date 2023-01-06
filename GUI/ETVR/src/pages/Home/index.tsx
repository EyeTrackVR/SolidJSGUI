import CameraContainer from '@components/camera'

//! temporary just for debugging and testing
const CameraStatus = Object.freeze({
    active: 'active',
    loading: 'loading',
    inactive: 'inactive',
})

const Main = () => {
    return (
        <div class="flex justify-start">
            <CameraContainer
                class="pb-[5rem] h-[100%] xl:pb-[1rem] pt-6 py-6 px-8 max-w-md"
                activeStatus={CameraStatus.active}
                cameraType={true}
                cameraAddress="192.168.0.204"
                cameraLabel="Left Eye"
            />
        </div>
    )
}

export default Main
