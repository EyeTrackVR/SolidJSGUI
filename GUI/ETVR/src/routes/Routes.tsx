// TODO: Implement a settings page that allows the user to change the settings of the application
import { For, lazy } from 'solid-js'
import { FileRoutes, Route, Routes } from 'solid-start'
import { routes } from '.'

const Header = lazy(() => import('@components/header/index'))

const AppRoutes = () => {
    const getUserName = () => {
        const userName = localStorage.getItem('settings')
        if (typeof userName === 'string') return JSON.parse(userName)
        return ''
    }

    return (
        <div>
            <Header
                name={getUserName()['name'] ? `Welcome ${getUserName()['name']}` : 'Welcome!'}
            />
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
