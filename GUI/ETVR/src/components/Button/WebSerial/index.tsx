import { WebviewWindow, getCurrent } from '@tauri-apps/api/window'
import Button from '..'
import { addWindow } from '@store/app/windows/windows'

export const WebSerial = () => {
    const openWebSerial = () => {
        const currentMainWindow = getCurrent()
        currentMainWindow.innerPosition().then((position) => {
            console.log(position)
            const webview = new WebviewWindow('eyetrack-webserial', {
                url: 'src/windows/webserial/index.html',
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
                addWindow(webview.label, webview)
                webview.show()
            })
        })
    }
    return (
        <Button
            color="#800080"
            shadow="0 0 10px #800080"
            text="Open Web Serial Flasher"
            onClick={openWebSerial}
        />
    )
}
