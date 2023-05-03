import { Button, Switch } from '@kobalte/core'


const ExampleMenu = () => {
    return (
        <div>
            <h1 class="text-lg">Dev Menu</h1>
            <hr class="divider" />
            <label class="context-menu-labels" for="test-button">
                Enable Dev Tools
            </label>
            <Button.Root
                id="test-button"
                onClick={() => {
                    console.log('clicked')
                }}>
                Test
            </Button.Root>
            <hr class="divider" />
        </div>
    )
}

export default ExampleMenu
