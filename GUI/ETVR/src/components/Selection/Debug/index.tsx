import { type Component } from 'solid-js'
import type { DebugMode } from '@src/static/types'
import Selection from '@components/Selection'
import { useAppContext } from '@src/store/context/app'

const DebugModeMenu: Component = () => {
    const { getDebugMode, setDebugMode } = useAppContext()
    let defaultValue = ''
    const modes: string[] = ['off', 'error', 'warn', 'info', 'debug', 'trace']
    defaultValue = getDebugMode() || ''

    return (
        <Selection
            name="Debug Mode"
            options={modes}
            placeholder="Select a debug mode"
            defaultValue={defaultValue}
            description={`Current Debug Mode: ${getDebugMode()}`}
            onValueChange={(value) => {
                console.log(value)
                setDebugMode(value as DebugMode)
            }}
        />
    )
}

export default DebugModeMenu
