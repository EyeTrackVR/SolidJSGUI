import { EraseButton } from '@components/Button/EraseButton'
import WebSerial from '@components/WebSerial'
import { useGHRelease } from '@hooks/api/useGHReleases'
import { handleSound } from '@hooks/app'

const AppSettings = () => {
    const downloadAsset = useGHRelease()
    return (
        <div class="flex justify-center items-center content-center flex-col pt-[100px] text-white">
            Coming Soon
            <button
                class="rounded-[8px] bg-blue-700 p-2 text-white mt-1 hover:bg-blue-600 focus:bg-blue-500"
                onClick={() => downloadAsset('esp32AIThinker')}>
                Download Release Asset
            </button>
            <button
                class="rounded-[8px] bg-blue-700 p-2 text-white mt-1 hover:bg-blue-600 focus:bg-blue-500"
                onClick={() =>
                    handleSound('EyeTrackApp_Audio_start.wav').then(() =>
                        console.log('[Audio Handler]: Sound Played'),
                    )
                }>
                Play Sound
            </button>
            <WebSerial />
            <EraseButton />
        </div>
    )
}

export default AppSettings
