import { createEffect, createSignal, onCleanup } from 'solid-js'
import { useEventListener } from 'solidjs-use'
import { debug } from 'tauri-plugin-log-api'
import { BULLET_POSITION_ADJUSTMENT, getBulletPosition } from '@src/utils'
import './styles.css'

export interface IProps {
    onChange: (format: string, value: number) => void
    format: string
    disablePercent?: boolean
}

const RangeInput = (props: IProps) => {
    const [uiHasMoved, setUiHasMoved] = createSignal<number>(window.innerWidth)
    const [rangeSliderWidth, setRangeSliderWidth] = createSignal<number | undefined>(undefined)
    const [rangeValue, setRangeValue] = createSignal(0)

    let rangeSliderRef: HTMLInputElement | undefined
    let rangeBulletRef: HTMLSpanElement | undefined

    createEffect(() => {
        setTimeout(() => {
            if (!rangeSliderRef || !rangeBulletRef) return

            const range = rangeSliderRef as HTMLInputElement
            const bullet = rangeBulletRef as HTMLSpanElement

            const cleanup = useEventListener(range, 'input', () => {
                setRangeValue(+range.value)
                const bulletPosition = getBulletPosition(range)
                const sliderWidth = rangeSliderWidth() || range.clientWidth

                range.style.backgroundSize =
                    ((+range.value - +range.min) * 100) / (+range.max - +range.min) + '% 100%'

                bullet.style.left =
                    bulletPosition * (sliderWidth - BULLET_POSITION_ADJUSTMENT) + 'px'
            })

            return () => {
                debug('[RangeInput - range input]: cleaning up')
                cleanup()
            }
        })
    })
    createEffect(() => {
        const cleanup = useEventListener(window, 'resize', () => {
            setTimeout(() => {
                if (uiHasMoved() === window.innerWidth) return
                if (!rangeSliderRef || !rangeBulletRef) return

                const range = rangeSliderRef as HTMLInputElement
                const bullet = rangeBulletRef as HTMLSpanElement
                const bulletPosition = getBulletPosition(range)
                const sliderWidth = range.clientWidth

                range.style.backgroundSize =
                    ((+range.value - +range.min) * 100) / (+range.max - +range.min) + '% 100%'

                bullet.style.left =
                    bulletPosition * (sliderWidth - BULLET_POSITION_ADJUSTMENT) + 'px'

                setUiHasMoved(window.innerWidth)
                setRangeSliderWidth(sliderWidth)
            })
        })
        onCleanup(() => {
            debug('[RangeInput - window resize]: cleaning up')
            cleanup()
        })
    })

    return (
        <div>
            <span ref={rangeBulletRef} class="rs-label">
                {rangeValue()}
                {!props.disablePercent ? '%' : ' '}
            </span>
            <div>
                <input
                    onMouseEnter={() => rangeBulletRef?.classList.add('rs-background')}
                    onMouseLeave={() => rangeBulletRef?.classList.remove('rs-background')}
                    ref={rangeSliderRef}
                    onChange={() => props.onChange(props.format, rangeValue())}
                    class="rs-range"
                    type="range"
                    value={rangeValue()}
                    min="0"
                    max="100"
                />
            </div>
        </div>
    )
}

export default RangeInput
