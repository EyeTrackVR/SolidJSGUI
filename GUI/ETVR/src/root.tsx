// @refresh reload
import { ColorModeScript, HopeProvider, injectCriticalStyle } from '@hope-ui/core'
import { Suspense } from 'solid-js'
import { Body, ErrorBoundary, Head, Html, Meta, Scripts, Title } from 'solid-start'
import AppRoutes from './routes/Routes'
import '@styles/imports.css'

export default function Root() {
    injectCriticalStyle()
    return (
        <Html lang="en">
            <Head>
                <Title>ETVR</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <script type="text/partytown" src="./scripts/typetura.min.js" />
                <script type="text/partytown" src="./scripts/custom.js" />
            </Head>
            <Body>
                <ColorModeScript />
                <HopeProvider>
                    <Suspense>
                        <ErrorBoundary>
                            <AppRoutes />
                        </ErrorBoundary>
                    </Suspense>
                </HopeProvider>
                <Scripts />
            </Body>
        </Html>
    )
}
