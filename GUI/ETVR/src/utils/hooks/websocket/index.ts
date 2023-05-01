import { Accessor } from 'solid-js'
import { useWebSocket } from 'solidjs-use'
import type { Notifications, Camera } from '@src/static/types/interfaces'
import { CameraStatus, ENotificationType } from '@src/static/types/enums'
import { isEmpty } from '@utils/index'

const PORT = 7856
const LOCAL_HOST = 'wss://127.0.0.1'

export const generateWebsocketClients = (
    getCameras: Accessor<Camera[]>,
    addNotification: (notification: Notifications) => void,
    setCameraWS: (camera: Camera, ws: object) => void,
    setCameraStatus: (camera: Camera, status: CameraStatus) => void,
) => {
    getCameras().map((camera, i) => {
        setCameraStatus(camera, CameraStatus.LOADING)
        if (isEmpty(camera.ws)) {
            setCameraStatus(camera, CameraStatus.NONE)
            // FIXME: Fix this - use routes instead of diff ports
            const { status, data, send, open, close } = useWebSocket(`${LOCAL_HOST}:${PORT + i}`, {
                autoReconnect: {
                    retries: 3,
                    delay: 1000,
                    onFailed() {
                        setCameraStatus(camera, CameraStatus.FAILED)
                        addNotification({
                            type: ENotificationType.ERROR,
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
            setCameraWS(camera, { status, data, send, open, close })
            return
        }
    })
}
