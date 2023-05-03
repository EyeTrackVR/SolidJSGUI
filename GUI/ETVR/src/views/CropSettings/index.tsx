import icons from '@assets/images'
import WebSocketHandler from '@components/WebSocket'
import { CameraStatus } from '@src/static/types/enums'
import { DEFAULT_CANVAS_BOX_POSITION } from '@src/utils'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { useEventListener } from 'solidjs-use'

export interface IProps {
    onClickBack: () => void
    onClickSaveCrop: (boxPosition: { x: number; y: number; width: number; height: number }) => void
    cameraConnectingStatus: CameraStatus
}

const CropSettings = (props: IProps) => {
    const [boxPosition, setBoxPosition] = createSignal(DEFAULT_CANVAS_BOX_POSITION)
    const [isMouseDown, setIsMouseDown] = createSignal(false)
    const [canvasSize, setCanvasSize] = createSignal({
        width: 480,
        height: 480,
    })

    let canvasRef: HTMLCanvasElement | undefined
    let videoSize: HTMLDivElement | undefined

    onMount(() => {
        const context = canvasRef?.getContext('2d')
        let mousePosition = { x: 0, y: 0 }

        function getMousePosition(canvas: HTMLCanvasElement, evt) {
            const rect = canvas.getBoundingClientRect()
            const scaleX = canvas.width / rect.width
            const scaleY = canvas.height / rect.height

            return {
                x: (evt.clientX - rect.left) * scaleX,
                y: (evt.clientY - rect.top) * scaleY,
            }
        }

        const onMouseUp = (e: MouseEvent) => {
            const target = e.target as HTMLInputElement
            if (target.nodeName !== 'CANVAS') return
            setIsMouseDown(false)
        }

        const onMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLInputElement
            if (target.nodeName !== 'CANVAS' || !canvasRef) return

            setIsMouseDown(true)
            mousePosition = getMousePosition(canvasRef, e)
        }

        const onMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLInputElement
            if (!isMouseDown() || target.nodeName !== 'CANVAS' || !context || !canvasRef) {
                return
            }

            const { x, y } = getMousePosition(canvasRef, e)

            const width = x - mousePosition.x
            const height = y - mousePosition.y

            if (height === 0) return

            context.clearRect(0, 0, canvasRef.width, canvasRef.height)
            context.fillStyle = 'rgba(0, 1, 0, 0.35)'
            context.fillRect(mousePosition.x, mousePosition.y, width, height)

            setBoxPosition({
                x: mousePosition.x,
                y: mousePosition.y,
                width,
                height,
            })
        }

        useEventListener('mouseup', onMouseUp)
        useEventListener('mousedown', onMouseDown)
        useEventListener('mousemove', onMouseMove)
    })

    createEffect(() => {
        const updateState = () => {
            setTimeout(() => {
                if (!videoSize) return
                if (!isMouseDown()) setIsMouseDown(false)
                const size = videoSize.getBoundingClientRect()

                if (canvasSize().width !== size.width || canvasSize().height !== size.height) {
                    setCanvasSize({ width: size.width, height: size.height })
                }
            })
        }
        setTimeout(() => updateState())
    })

    return (
        <div>
            <div class="pt-12">
                <div>
                    <div class="flex cursor-pointer pb-5" onClick={() => props.onClickBack()}>
                        <div class="mr-3">
                            <img src={icons.arrow} alt="img" class="w-full h-full m-auto" />
                        </div>
                        <div>
                            <p class="text-left text-white text-lg text-upper uppercase max-lg:text-sm ">
                                go back to home
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class=" flex justify-center flex-col gap-5">
                        <div class="m-auto h-[480px] w-[480px]">
                            <div class="m-auto relative  h-full w-full bg-[#333742] rounded-xl p-4">
                                <canvas
                                    class="absolute z-10"
                                    ref={canvasRef}
                                    width={canvasSize().width}
                                    height={canvasSize().height}
                                />
                                <div class="w-full h-full" ref={videoSize}>
                                    <WebSocketHandler
                                        status={CameraStatus.ACTIVE}
                                        styles="rounded-xl"
                                    />
                                </div>
                            </div>
                            <div>
                                <div class="pt-4 flex justify-end">
                                    <div>
                                        <button
                                            onClick={() => props.onClickSaveCrop(boxPosition())}
                                            class="bg-[#0071FE] text-base pt-3 pb-3 pl-[64px] pr-[64px] rounded-xl text-white ">
                                            Save crop
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CropSettings
