import { children, createSignal, createEffect, Show, Component, onMount } from 'solid-js'
import { Portal } from 'solid-js/web'
import { menuOpenStatus } from '@src/store/ui/selectors'
import { setMenu, type INewMenu } from '@src/store/ui/ui'
import './styles.css'

const NewMenu = (props: INewMenu) => {
    const [ref, setRef] = createSignal<HTMLElement>()
    const Children = children(() => props.children)
    const clickOutside = (e: MouseEvent) => {
        if (e.target instanceof HTMLElement) {
            if (ref() && (ref()?.contains(e.target) || ref()?.isSameNode(e.target))) return
            console.log('clicked outside')
            document.documentElement.style.setProperty('--menu-visibility', 'hidden')
            setMenu(null)
        }
    }
    onMount(() => {
        setMenu(null)
        document.documentElement.style.setProperty('--menu-visibility', 'hidden')
        if (props.ref) {
            props.ref.addEventListener('contextmenu', (e) => {
                e.preventDefault()
                setMenu({ x: e.clientX, y: e.clientY })
                document.documentElement.style.setProperty('--menu-visibility', 'visible')
                //console.log(menuOpenStatus)
            })
        }
    })
    createEffect(() => {
        if (menuOpenStatus()) {
            document.addEventListener('click', clickOutside)
        } else {
            document.removeEventListener('click', clickOutside)
        }
    })
    return (
        <div>
            <Show when={menuOpenStatus}>
                <Portal mount={props?.ref as HTMLElement}>
                    <div
                        ref={setRef}
                        id="menu"
                        class="context-menu"
                        style={{
                            top: `${menuOpenStatus()?.y ?? 0}px`,
                            left: `${menuOpenStatus()?.x ?? 0}px`,
                        }}>
                        {Children()}
                    </div>
                </Portal>
            </Show>
        </div>
    )
}

export default NewMenu
