import { createSignal, createEffect, Show, onMount, onCleanup, type Component } from 'solid-js'
import { Portal } from 'solid-js/web'
import { onClickOutside, useEventListener } from 'solidjs-use'
import { debug } from 'tauri-plugin-log-api'
import type { NewMenu } from '@static/types/interfaces'
import { useAppUIContext } from '@src/store/context/ui'
import './styles.css'

const NewContextMenu: Component<NewMenu> = (props) => {
    const [ref, setRef] = createSignal<HTMLElement>()
    const { menuOpenStatus, setMenu } = useAppUIContext()

    onMount(() => {
        if (props.ref) {
            useEventListener(props.ref, 'contextmenu', (e) => {
                e.preventDefault()
                setMenu({ x: e['x'], y: e['y'] })
                debug('[Context Window]: opening menu')
                //debug('[Context Window]: ', e)
            })
        }
    })
    createEffect(() => {
        if (!menuOpenStatus()) return

        const cleanup = useEventListener('click', () => {
            onClickOutside(ref, () => {
                setMenu(null)
            })
        })

        onCleanup(() => {
            debug('[Context Window]: cleaning up')
            cleanup()
        })
    })
    return (
        <Show when={menuOpenStatus() ?? false}>
            <Portal mount={props?.ref as HTMLElement}>
                <div
                    ref={setRef}
                    id={props.name}
                    class="context-menu shadow-lg bg-[#21232d] dark:bg-gray-800 dark:text-white dark:border-gray-700 border border-gray-200 z-50 absolute"
                    style={{
                        top: `${menuOpenStatus()?.y ?? 0}px`,
                        left: `${menuOpenStatus()?.x ?? 0}px`,
                    }}>
                    {props.children}
                </div>
            </Portal>
        </Show>
    )
}

export default NewContextMenu
