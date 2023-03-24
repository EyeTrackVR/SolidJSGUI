import { Progress } from '@kobalte/core'
import { Show } from 'solid-js'
import './style.css'

interface IProgressBarProps {
    progress: number
    msg: string
    show: boolean
}

export const ProgressBar = (props: IProgressBarProps) => {
    return (
        <Show when={props.show}>
            <div class="fixed bottom-0 right-0">
                <Progress.Root value={props.progress} class="progress">
                    <div class="progress__label-container">
                        <Progress.Label class="progress__label">{props.msg}</Progress.Label>
                        <Progress.ValueLabel class="progress__value-label" />
                    </div>
                    <Progress.Track class="progress__track">
                        <Progress.Fill class="progress__fill" />
                    </Progress.Track>
                </Progress.Root>
            </div>
        </Show>
    )
}
