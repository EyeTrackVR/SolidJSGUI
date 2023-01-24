import { lazy } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'

import Home from '@pages/Home'
const Settings = lazy(() => import('@pages/Settings'))
const page404 = lazy(() => import('@pages/errors/index'))

export const routes: RouteDefinition[] = [
    { path: '/', component: Home },
    { path: '/settings', component: Settings },
    { path: '**', component: page404 },
]
