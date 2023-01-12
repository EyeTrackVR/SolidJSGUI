import { Component } from 'solid-js'

interface InputsProps {
    label: string
    type: string
    name: string
    id: string
    errorMsg?: string
    error?: boolean
}

// we need to refactor this
const Inputs: Component<InputsProps> = (props) => {
    return (
        <div>
            {/* <div class="flex-it py-2">
                <label class="block text-sm font-medium text-gray-700">{props.label}</label>
                <input
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    class={
                        props.error
                            ? 'mt-1 block w-full rounded-md border-red-400 focus:border-red-500 focus:ring-red-500 sm:text-sm'
                            : 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    }
                />
            </div>
            <div
                class={
                    props.error
                        ? 'flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md'
                        : 'hidden'
                }>
                {props.errorMsg}
            </div> */}
        </div>
    )
}

export default Inputs
