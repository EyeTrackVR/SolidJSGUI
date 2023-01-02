import { Component, Switch, Match, For } from 'solid-js'
import { ISkeletonHandlerProps, ISkeletonProps } from '@static/types/interfaces'

/**
 * @description Skeleton Component that renders during loading
 * @param {string} props.class - class to be applied to the skeleton
 * @param {boolean} props.render - boolean to render the skeleton
 * @param {JSXElement} props.children - children to be rendered
 * @example
 * <div class="w-full wrapper-container mt-8">
 *  <Skeleton class="h-8 w-full mt-2" />
 * </div>
 * @returns JSXElement Component
 */
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
