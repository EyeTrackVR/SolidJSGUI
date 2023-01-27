// TODO: Implement a settings page that allows the user to change the settings of the application
import { useRoutes } from '@solidjs/router'
import { lazy, onMount } from 'solid-js'
import { routes } from '.'
import { connectedUserName } from '@src/store/ui/selectors'
import { setConnectedUser } from '@src/store/ui/ui'

const Header = lazy(() => import('@components/Header'))

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
