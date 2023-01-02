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
            </Head>
            <Body>
                <ColorModeScript />
                <HopeProvider>
                    <Suspense>
                        <ErrorBoundary>
                            <AppRoutes />
                            <div class="main-div">
                                <div
                                    data-tauri-drag-region
                                    class="titlebar"
                                    style={{
                                        position: 'relative',
                                        'z-index': 10,
                                    }}>
                                    <div class="titlebar-button" id="titlebar-minimize">
                                        <img
                                            src="https://api.iconify.design/mdi:window-minimize.svg"
                                            alt="minimize"
                                        />
                                    </div>
                                    <div class="titlebar-button" id="titlebar-maximize">
                                        <img
                                            src="https://api.iconify.design/mdi:window-maximize.svg"
                                            alt="maximize"
                                        />
                                    </div>
                                    <div class="titlebar-button" id="titlebar-close">
                                        <img
                                            src="https://api.iconify.design/mdi:close.svg"
                                            alt="close"
                                        />
                                    </div>
                                </div>
                                <div id="root" />
                            </div>
                        </ErrorBoundary>
                    </Suspense>
                </HopeProvider>
                <script type="text/partytown" src="./scripts/custom.js" />
                <Scripts />
            </Body>
        </Html>
    )
}
