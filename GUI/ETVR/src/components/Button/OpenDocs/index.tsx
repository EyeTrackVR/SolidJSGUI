import { WebviewWindow, getCurrent } from '@tauri-apps/api/window'
import Button from '..'

export const OpenDocs = () => {
    const openDocs = () => {
        const currentMainWindow = getCurrent()
        currentMainWindow.innerPosition().then((position) => {
            console.log(position)
            const webview = new WebviewWindow('eyetrack-docs', {
                url: 'src/windows/docs/index.html',
                resizable: true,
                decorations: false,
                titleBarStyle: 'transparent',
                hiddenTitle: true,
                width: 800,
                height: 600,
                x: position.x,
                y: position.y,
                transparent: true,
            })
            webview.once('tauri://created', () => {
                console.log('WebView Window Created')
                webview.show()
                /* webview.setFocus() */
            })
        })
    }
    return (
        <Button
            color="#800080"
            shadow="0 0 10px #800080"
            text="Open Documentation"
            onClick={openDocs}
        />
    )
}

// q: what kind of app  can i make with tauri and sell on the app store?
// a: any kind of app you want, as long as you follow the app store guidelines
// give me an idea of an app that i can make that will be profitable

