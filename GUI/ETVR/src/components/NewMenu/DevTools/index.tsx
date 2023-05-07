//import { Button, Switch } from '@kobalte/core'
import { debug } from 'tauri-plugin-log-api'
import CustomButton from '@components/CustomButton'
import DebugMode from '@components/Selection/Debug'

const ExampleMenu = () => {
    return (
        <div>
            <h1 class="text-lg">Dev Menu</h1>
            <hr class="divider" />
            <label class="context-menu-labels" for="test-button">
                Debug Mode
            </label>
            <DebugMode />
            <hr class="divider" />

            <label class="context-menu-labels" for="test-button">
                Test Button
            </label>
            <CustomButton
                name="test-button"
                img="Test Button"
                onClick={() => {
                    debug('Test Button Clicked')
                }}
            />
            <hr class="divider" />
        </div>
    )
}

export default ExampleMenu
