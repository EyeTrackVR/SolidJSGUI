import type { JSXElement } from 'solid-js'

export interface IRoutes {
    path: string
    element: () => JSXElement
}

export interface Iinternal {
    errorMsg?: string
    error?: boolean
}

export interface Iinputs {
    input: (props?: Iinternal) => JSXElement
}

export interface ISkeletonHandlerProps {
    render?: boolean
    items?: ISkeletonProps[]
    children?: JSXElement
}

export interface ISkeletonProps {
    class: string
}

export interface ICardProps {
    children?: JSXElement
    src?: string
    title?: string
    subTitle?: string
    imageAlt?: string
    buttonElement?: JSXElement
    background?: string
    backgroundColor?: string
}
