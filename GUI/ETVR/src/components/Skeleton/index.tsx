import { Component, For, Match, Switch } from 'solid-js'
import { ISkeletonHandlerProps, ISkeletonProps } from '@static/types/interfaces'

const Skeleton: Component<ISkeletonProps> = (props: ISkeletonProps) => {
    return (
        <div class="animate-pulse">
            <div class={`bg-gray-800 ${props.class}`} />
        </div>
    )
}

const SkeletonHandler: Component<ISkeletonHandlerProps> = (props: ISkeletonHandlerProps) => {
    return (
        <Switch fallback={<div>Loading ...</div>}>
            <Match when={props.render}>
                <div class="w-full wrapper-container mt-8">
                    <For each={props.items}>
                        {(item, index) => {
                            return <Skeleton data-index={index()} class={item.class} />
                        }}
                    </For>
                </div>
            </Match>
            <Match when={!props.render}>{props.children}</Match>
        </Switch>
    )
}

export default SkeletonHandler
