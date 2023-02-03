import { cameras } from '@store/camera/selectors'

const PORT = 7856
const LOCAL_HOST = 'wss://127.0.0.1'

const generateWebsocketClients = () => {
    const clients = cameras().map((_, i) => {
        return new WebSocket(`${LOCAL_HOST}:${PORT}/camera_${i + 1}`)
    })
    return clients
}

export { generateWebsocketClients }
