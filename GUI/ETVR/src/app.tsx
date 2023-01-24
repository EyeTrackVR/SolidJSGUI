import { ColorModeScript, HopeProvider, injectCriticalStyle } from '@hope-ui/core'
import { Suspense } from 'solid-js'
import AppRoutes from './routes/Routes'

const app = () => {
    injectCriticalStyle()
    return (
        <>
            <ColorModeScript />
            <HopeProvider>
                <Suspense>
                    <AppRoutes />
                </Suspense>
            </HopeProvider>
        </>
    )
}

export default app
