//import { Header } from '@components/Header'
import { /* createEffect, */ For } from 'solid-js'
import { Routes, Route, FileRoutes } from 'solid-start'
import { routes } from '.'

// TODO: Implement a settings page that allows the user to change the settings of the application

const AppRoutes = () => {
    return (
        <Routes>
            <FileRoutes />
            <For each={routes}>
                {({ path, element }) => <Route path={path} element={element()} />}
            </For>
        </Routes>
    )
}

export default AppRoutes
