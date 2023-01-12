import { IRoutes } from '@static/types/interfaces'
import { lazy } from 'solid-js'

const Home = lazy(() => import('@pages/Home'))
const page404 = lazy(() => import('@pages/404/index'))

export const routes: IRoutes[] = [
    { path: '/', element: Home },
    { path: '**', element: page404 },
]
