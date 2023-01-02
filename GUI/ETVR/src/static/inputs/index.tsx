import Inputs from '@components/Inputs'
import { Iinputs, Iinternal } from '@static/types/interfaces'

export const inputs: Iinputs[] = [
    {
        input: (props?: Iinternal) => (
            <Inputs label="Email" type="password" name="password" id="password" {...props} />
        ),
    },
]
