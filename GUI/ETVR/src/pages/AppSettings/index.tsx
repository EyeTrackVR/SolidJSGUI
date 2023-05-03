import { EraseButton } from '@components/Button/EraseButton'
import { OpenDocs } from '@components/Button/OpenDocs'
import { WebSerial } from '@components/Button/WebSerial'
import FirmwareList from '@components/FirmwareList'
import Form from '@components/Form'
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
                onClickFlipLeftXAxis={() => console.log('onClickFlipLeftXAxis')}
                onClickFlipRightXAxis={() => {
                    console.log('onClickFlipRightXAxis')
                }}
                onClickFlipYAxis={() => {
                    console.log('onClickFlipYAxis')
                }}
                onClickDualEyeFalloff={() => {
                    console.log('onClickDualEyeFalloff')
                }}
                onClickSyncBlinks={() => {
                    console.log('onClickSyncBlinks')
                }}
                onClickBlobFallback={() => {
                    console.log('onClickBlobFallback')
                }}
                onChange={(format, value) => {
                    console.log(format, value)
                }}
                onChangeAddress={() => {
                    console.log('onChangeAddress')
                }}
                onChangeOSCPort={() => {
                    console.log('onChangeOSCPort')
                }}
                onChangeOSCReceiverPort={() => {
                    console.log('onChangeOSCReceiverPort')
                }}
                onChangeOSCRecenterPort={() => {
                    console.log('onChangeOSCRecenterPort')
                }}
                onChangeOSCRecalibrateAddress={() => {
                    console.log('onChangeOSCRecalibrateAddress')
                }}
            />
            <button
                class="rounded-[8px] bg-blue-700 p-2 text-white mt-1 hover:bg-blue-600 focus:bg-blue-500"
                onClick={() => {
                    download('esp32AIThinker')
                    console.log('[Download Asset]: Downloading...')
                }}>
                Download Release Asset
            </button>
            <button
                class="rounded-[8px] bg-blue-700 p-2 text-white mt-1 hover:bg-blue-600 focus:bg-blue-500"
                onClick={() => {
                    handleSound('EyeTrackApp_Audio_start.wav')
                    console.log('[Audio Handler]: Sound Played')
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
