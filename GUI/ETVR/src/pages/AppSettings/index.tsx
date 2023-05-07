import { debug } from 'tauri-plugin-log-api'
import { EraseButton } from '@components/Button/EraseButton'
import { OpenDocs } from '@components/Button/OpenDocs'
import { WebSerial } from '@components/Button/WebSerial'
import Form from '@components/Form'
import FirmwareList from '@components/Selection/FirmwareList'
import { useAppAPIContext } from '@src/store/context/api'
import { useAppNotificationsContext } from '@src/store/context/notifications'
import AppSettings from '@src/views/AppSettings'

const AppSettingsPage = () => {
    let download: (firmware: string) => Promise<void> = () => Promise.resolve()

    const { downloadAsset } = useAppAPIContext()

    if (downloadAsset) download = downloadAsset

    const { handleSound } = useAppNotificationsContext()

    return (
        <div class="flex justify-center items-center content-center flex-col pt-[100px] text-white">
            <AppSettings
                onClickFlipLeftXAxis={() => debug('[AppSettings]: onClickFlipLeftXAxis')}
                onClickFlipRightXAxis={() => {
                    debug('[AppSettings]: onClickFlipRightXAxis')
                }}
                onClickFlipYAxis={() => {
                    debug('[AppSettings]: onClickFlipYAxis')
                }}
                onClickDualEyeFalloff={() => {
                    debug('[AppSettings]: onClickDualEyeFalloff')
                }}
                onClickSyncBlinks={() => {
                    debug('[AppSettings]: onClickSyncBlinks')
                }}
                onClickBlobFallback={() => {
                    debug('[AppSettings]: onClickBlobFallback')
                }}
                onChange={(format, value) => {
                    debug(`[AppSettings]: ${format} ${value}`)
                }}
                onChangeAddress={() => {
                    debug('[AppSettings]: onChangeAddress')
                }}
                onChangeOSCPort={() => {
                    debug('[AppSettings]: onChangeOSCPort')
                }}
                onChangeOSCReceiverPort={() => {
                    debug('[AppSettings]: onChangeOSCReceiverPort')
                }}
                onChangeOSCRecenterPort={() => {
                    debug('[AppSettings]: onChangeOSCRecenterPort')
                }}
                onChangeOSCRecalibrateAddress={() => {
                    debug('[AppSettings]: onChangeOSCRecalibrateAddress')
                }}
            />
            <button
                class="rounded-[8px] bg-blue-700 p-2 text-white mt-1 hover:bg-blue-600 focus:bg-blue-500"
                onClick={() => {
                    download('esp32AIThinker')
                    debug('[Download Asset]: Downloading...')
                }}>
                Download Release Asset
            </button>
            <button
                class="rounded-[8px] bg-blue-700 p-2 text-white mt-1 hover:bg-blue-600 focus:bg-blue-500"
                onClick={() => {
                    handleSound('EyeTrackApp_Audio_start.wav')
                    debug('[Audio Handler]: Sound Played')
                }}>
                Play Sound
            </button>
            <EraseButton />
            <WebSerial />
            <OpenDocs />
            <FirmwareList />
            <Form />
        </div>
    )
}

export default AppSettingsPage
