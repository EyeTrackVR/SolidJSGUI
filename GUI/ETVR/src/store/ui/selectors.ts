import { createMemo } from 'solid-js'
import { uiState } from './ui'

export const connectingStatus = createMemo(() => uiState().connecting)
export const loaderStatus = createMemo(() => uiState().loader)
export const openModalStatus = createMemo(() => uiState().openModal)
export const menuOpenStatus = createMemo(() => uiState().menuOpen)
export const connectedUserName = createMemo(() => uiState().connectedUser)
export const showCameraView = createMemo(() => uiState().showCameraView)
export const notifications = createMemo(() => uiState().notifications)
export const notificationsType = createMemo(() => uiState().notificationsType)
export const hideHeaderButtons = createMemo(() => uiState().hideHeaderButtons)
