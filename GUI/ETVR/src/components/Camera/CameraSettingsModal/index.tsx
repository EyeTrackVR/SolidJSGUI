import { setOpenModal } from '@src/store/ui/ui'
import { BUTTON } from '@static/custom/button'

const CameraSettingsModal = () => {
    return (
        <div>
            <div class="mt-2">
                <div class="text-sm text-100 dark:text-gray-50">
                    This is a modal window. You can do the following things with it:
                    <br />
                    <ul class="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        <li>Read more information about a context</li>
                        <li>Find similar contexts</li>
                        <li>
                            Close this modal by clicking the background overlay or pressing the
                            button below
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mt-4">
                <button type="button" class={BUTTON} onClick={() => setOpenModal(false)}>
                    Got it, thanks!
                </button>
            </div>
        </div>
    )
}

export default CameraSettingsModal
