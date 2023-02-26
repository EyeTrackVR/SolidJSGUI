import { RANGE_INPUT_FORMAT } from '@src/static/types/enums'
import { BULLET_POSITION_ADJUSTMENT, getBulletPosition } from '@src/utils/utils'
import { createEffect, createSignal } from 'solid-js'
import './styles.css'

export interface IProps {
    onChange: (format: RANGE_INPUT_FORMAT, value: number) => void
    format: RANGE_INPUT_FORMAT
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

            range.addEventListener('input', () => {
                setRangeValue(+range.value)
                const bulletPosition = getBulletPosition(range)
                const sliderWidth = rangeSliderWidth() || range.clientWidth

                range.style.backgroundSize =
                    ((+range.value - +range.min) * 100) / (+range.max - +range.min) + '% 100%'

                bullet.style.left =
                    bulletPosition * (sliderWidth - BULLET_POSITION_ADJUSTMENT) + 'px'
            })
        })
    })

    createEffect(() => {
        window.addEventListener('resize', () => {
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
    })

    return (
        <div>
            <span ref={rangeBulletRef} class="rs-label">
                {rangeValue()}%
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
