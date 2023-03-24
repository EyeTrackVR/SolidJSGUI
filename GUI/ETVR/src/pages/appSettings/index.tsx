//import { ProgressBar } from '@components/ProgessBar'
import WebSerial from '@components/WebSerial'
//import { progressBar } from '@src/store/ui/selectors'
import { useGHRelease } from '@utils/hooks/api/useGHReleases'

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
            <WebSerial />
            {/* <ProgressBar
                progress={progressBar()?.progress as number}
                msg={progressBar()?.msg as string}
                show={progressBar()?.show as boolean}
            /> */}
        </div>
    )
}

export default AppSettings
