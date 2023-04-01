import { useWebSocket } from 'solidjs-use'
import { addNotification, ENotificationType } from '@hooks/notifications'
import { getGlobalNotificationsType } from '@store/app/settings/selectors'
import { cameras } from '@store/camera/selectors'
import { isEmpty } from '@utils/index'
const PORT = 7856
const LOCAL_HOST = 'wss://127.0.0.1'

export const generateWebsocketClients = () => {
    cameras().map((camera, i) => {
        if (isEmpty(camera.ws)) {
            const { status, data, send, open, close } = useWebSocket(`${LOCAL_HOST}:${PORT + i}`, {
                autoReconnect: {
                    retries: 3,
                    delay: 1000,
                    onFailed() {
                        addNotification({
                            type: ENotificationType.ERROR,
                            action: getGlobalNotificationsType(),
                            title: 'Websocket Connection Failed',
                            message: `[WebSocket Handler]: Failed to connect to ${camera.address}`,
                        })
                    },
                },
                heartbeat: {
                    message: 'ping',
                    interval: 1000,
                    pongTimeout: 1000,
                },
            })
            camera.ws = { status, data, send, open, close }
        }
    })
}
