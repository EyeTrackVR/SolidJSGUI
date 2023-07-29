import { debug } from 'tauri-plugin-log-api'
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
                onNetworkSettingsChange={(format) => {
                    debug(`[AppSettings]: ${format}`)
                }}
                onClickDownload={() => {
                    download('esp32AIThinker')
                    debug('[Download Asset]: Downloading...')
                }}
                onClickPlaySound={() => {
                    handleSound('EyeTrackApp_Audio_start.wav')
                    debug('[Audio Handler]: Sound Played')
                }}
            />
        </div>
    )
}

export default AppSettingsPage
