// TODO: Implement a settings page that allows the user to change the settings of the application
import { useRoutes } from '@solidjs/router'
import { lazy, onMount } from 'solid-js'
import { routes } from '.'
import { setConnectedUser } from '@src/store/mdns/mdns'
import { connectedUserName } from '@src/store/mdns/selectors'

const Header = lazy(() => import('@components/header/index'))

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
            <Path />
        </main>
    )
}

export default AppRoutes
