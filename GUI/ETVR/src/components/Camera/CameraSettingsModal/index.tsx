import { setOpenModal } from '@src/store/ui/ui'
import { classNames } from '@src/utils/utils'

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
                <button
                    type="button"
                    class={classNames(
                        'rounded-md px-4 py-2 text-sm font-medium transition duration-150',
                        'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
                        'focus-visible:ring-gray-900',
                        'dark:focus-visible:ring-gray-50',
                        'border-2 border-gray-900 dark:border-gray-50',
                        // Background
                        'bg-gray-900 hover:bg-gray-700 active:bg-gray-800',
                        // Foreground
                        'text-gray-50 hover:text-gray-200 active:text-gray-100',
                    )}
                    onClick={() => setOpenModal(false)}>
                    Got it, thanks!
                </button>
            </div>
        </div>
    )
}

export default CameraSettingsModal
