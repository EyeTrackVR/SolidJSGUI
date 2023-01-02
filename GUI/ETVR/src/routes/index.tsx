/* Icons */

/* Interfaces and components */
import { lazy } from 'solid-js'
import { IRoutes } from '@static/types/interfaces'

const SIZE = 24
const NotFound = lazy(() => import('@pages/notFound'))
const About = lazy(() => import('@pages/about'))
const Home = lazy(() => import('@pages/Home'))

export const routes: IRoutes[] = [
    {
        path: '/',
        element: Home,
        name: 'Home',
        index: 'home',
        icon: () => <AiOutlineHome size={SIZE} />,
    },
]
