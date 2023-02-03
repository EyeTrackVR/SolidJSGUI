import { Button } from '@kobalte/core'

const ExampleMenu = () => {
    return (
        <div>
            <h1 class="text-lg">Sub Menu</h1>
            <hr class="divider" />
            <label class="context-menu-labels" for="test-button">
                Test Button
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
