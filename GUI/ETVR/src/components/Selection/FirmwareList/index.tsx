import { type Component, createSignal } from 'solid-js'
import Selection from '@components/Selection'
import { useAppAPIContext } from '@src/store/context/api'

const FirmwareList: Component = () => {
    const [firmwareVersion, setFirmwareVersion] = createSignal('')

    const { getFirmwareAssets, getFirmwareVersion } = useAppAPIContext()

    let defaultValue = ''
    let boardNames: string[] = []

    if (getFirmwareAssets) {
        defaultValue =
            getFirmwareAssets().find((item) => item.name === 'esp32AIThinker')?.name || ''
        boardNames = getFirmwareAssets().map((item) => item.name)
    }

    if (getFirmwareVersion) setFirmwareVersion(getFirmwareVersion())

    return (
        <Selection
            name="firmware"
            options={boardNames}
            placeholder="Select a board"
            defaultValue={defaultValue}
            description={`Firmware version: ${firmwareVersion()}`}
        />
    )
}

export default FirmwareList
