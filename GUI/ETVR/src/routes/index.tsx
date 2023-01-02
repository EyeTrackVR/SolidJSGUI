/* Icons */

/* Interfaces and components */
import { lazy } from 'solid-js'
import { IRoutes } from '@static/types/interfaces'

const SIZE = 24
//onst NotFound = lazy(() => import('@pages/notFound'))
//onst About = lazy(() => import('@pages/about'))
//onst Home = lazy(() => import('@pages/Home'))

export const routes: IRoutes[] = [
    {
        path: '/',
        element: Home,
        name: 'Home',
        index: 'home',
        icon: () => <AiOutlineHome size={SIZE} />,
    },
]
