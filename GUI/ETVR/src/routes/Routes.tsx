import { useRoutes } from '@solidjs/router'
import { onMount } from 'solid-js'
import { routes } from '.'
import Header from '@components/Header'
import { connectedUserName } from '@src/store/ui/selectors'
import { setConnectedUser } from '@src/store/ui/ui'

const AppRoutes = () => {
    const Path = useRoutes(routes)

    onMount(() => {
        const userName = localStorage.getItem('settings')
        const activeUserName = typeof userName === 'string' ? JSON.parse(userName) : 'stranger'
        setConnectedUser(activeUserName)
    })

    return (
        <main class="pb-[5rem] w-[100%] px-8 max-w-[1920px]">
            <div class="header-wrapper">
                <Header
                    name={connectedUserName() ? `Welcome ${connectedUserName()}` : 'Welcome!'}
                />
            </div>
            <div class="pt-[70px]">
                <Path />
            </div>
        </main>
    )
}

export default AppRoutes
