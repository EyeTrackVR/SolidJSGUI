import { createMemo } from 'solid-js'
import { uiState } from './ui'

export const connectingStatus = createMemo(() => uiState().connecting)
export const openModalStatus = createMemo(() => uiState().openModal)
export const menuOpenStatus = createMemo(() => uiState().menuOpen)
export const connectedUserName = createMemo(() => uiState().connectedUser)
