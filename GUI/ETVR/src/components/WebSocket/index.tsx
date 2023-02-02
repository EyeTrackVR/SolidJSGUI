import { onMount } from 'solid-js'
import { initWebSocket } from '@utils/hooks/websocket'

const webSocketHandler = () => {
    onMount(async () => {
        initWebSocket()
    })
}

export default webSocketHandler
