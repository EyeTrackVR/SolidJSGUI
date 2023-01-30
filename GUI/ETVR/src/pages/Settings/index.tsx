import Button from '@components/Button'
import { addNotification } from '@src/store/ui/ui'

const SettingsPage = () => {
    return (
        <div class="pb-[5rem] h-[95%] xl:h-[100%] xl:pb-[1rem] grow flex-col pt-6 py-6 px-8">
            <Button
                color="blue"
                onClick={() =>
                    addNotification(`This toast is created on ${new Date().toTimeString()}`)
                }
                text="Add Notification"
            />
        </div>
    )
}

export default SettingsPage
