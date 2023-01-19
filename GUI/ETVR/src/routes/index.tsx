import { lazy } from 'solid-js'
import { IRoutes } from '@static/types/interfaces'

const Home = lazy(() => import('@pages/Home'))
const page404 = lazy(() => import('@pages/404/index'))

export const routes: IRoutes[] = [
    { path: '/', element: Home },
    { path: '**', element: page404 },
]
