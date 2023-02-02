interface IWebRTCMessage {
    msg: string | object | null | undefined
}

const sendToRTCServer = (msg: IWebRTCMessage, ws: WebSocket) => {
    if (!msg) {
        console.error('[sendToRTCServer]: Message is null or undefined')
        return
    }
    ws.send(JSON.stringify(msg))
}

export { sendToRTCServer }
