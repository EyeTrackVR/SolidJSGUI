import { children, createSignal, createEffect, Show, onMount, onCleanup } from 'solid-js'
import { Portal } from 'solid-js/web'
import { onClickOutside, useEventListener } from 'solidjs-use'
import type { NewMenu } from '@static/types/interfaces'
import { useAppUIContext } from '@src/store/context/ui'
import './styles.css'

const NewMenu = (props: NewMenu) => {
    const [ref, setRef] = createSignal<HTMLElement>()
    const Children = children(() => props.children)

    const { menuOpenStatus, setMenu } = useAppUIContext()

    onMount(() => {
        if (props.ref) {
            useEventListener(props.ref, 'contextmenu', (e) => {
                e.preventDefault()
                setMenu({ x: e['x'], y: e['y'] })
                console.log('[Context Window]: opening menu')
                //console.log('[Context Window]: ', e)
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
            console.log('[Context Window]: cleaning up')
            cleanup()
        })
    })
    return (
        <div>
            <Show when={menuOpenStatus() ?? false}>
                <Portal mount={props?.ref as HTMLElement}>
                    <div
                        ref={setRef}
                        id={props.name}
                        class="context-menu"
                        style={{
                            top: `${menuOpenStatus()?.y ?? 0}px`,
                            left: `${menuOpenStatus()?.x ?? 0}px`,
                        }}>
                        <Children />
                    </div>
                </Portal>
            </Show>
        </div>
    )
}

export default NewMenu
