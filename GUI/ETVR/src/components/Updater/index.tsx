import { relaunch } from '@tauri-apps/api/process'
import { checkUpdate, installUpdate, type UpdateResult } from '@tauri-apps/api/updater'
import { createSignal, createEffect, Show } from 'solid-js'

const Updater = () => {
    const [updating, setUpdating] = createSignal(false)
    const [updateAvailable, setUpdateAvailable] = createSignal<UpdateResult>()

    createEffect(() => {
        checkUpdate().then((updateResult) => setUpdateAvailable(updateResult))
    })

    const handleUpdate = () => {
        setUpdating(true)
        installUpdate().then(() => {
            relaunch()
        })
    }

    return (
        <div>
            <Show when={updating()}>
                <div>Updating...</div>
            </Show>
            <Show when={updateAvailable()}>
                <button onClick={handleUpdate}>Update</button>
            </Show>
        </div>
    )
}

export default Updater
