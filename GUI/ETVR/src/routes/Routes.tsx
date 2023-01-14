// TODO: Implement a settings page that allows the user to change the settings of the application
import { setConnectedUser } from '@src/store/mdns/mdns'
import { connectedUserName } from '@src/store/mdns/selectors'
import { For, lazy, onMount } from 'solid-js'
import { FileRoutes, Route, Routes } from 'solid-start'
import { routes } from '.'

const Header = lazy(() => import('@components/header/index'))

const AppRoutes = () => {
    onMount(() => {
        const userName = localStorage.getItem('settings')
        const activeUserName = typeof userName === 'string' ? JSON.parse(userName) : 'stranger'
        setConnectedUser(activeUserName)
    })

    return (
        <div>
            <Header name={connectedUserName() ? `Welcome ${connectedUserName()}` : 'Welcome!'} />
            <Routes>
                <FileRoutes />
                <For each={routes}>
                    {({ path, element }) => <Route path={path} element={element()} />}
                </For>
            </Routes>
        </div>
    )
}

export default AppRoutes
