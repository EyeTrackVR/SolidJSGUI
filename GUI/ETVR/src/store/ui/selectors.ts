import { createMemo } from 'solid-js'
import { uiState } from './ui'

export const connectingStatus = createMemo(() => {
    return uiState().connecting
})

export const openModalStatus = createMemo(() => {
    return uiState().openModal
})
