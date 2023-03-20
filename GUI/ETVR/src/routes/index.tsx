import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'

const Home = lazy(() => import('@pages/Home'))
const Settings = lazy(() => import('@pages/Settings'))
const AppSettings = lazy(() => import('@pages/AppSettings'))
const page404 = lazy(() => import('@pages/errors/index'))

export const routes: RouteDefinition[] = [
    { path: '/', component: Settings },
    { path: '/appSettings', component: AppSettings },
    { path: '/settings', component: Settings },
    { path: '**', component: page404 },
]
