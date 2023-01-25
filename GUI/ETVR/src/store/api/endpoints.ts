export enum RESTType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface IEndpoint {
    name: string
    url: string
    type: RESTType
}

export const endpoints: IEndpoint[] = [
    {
        name: 'heartbeat',
        url: '/ping',
        type: RESTType.GET,
    },
    {
        name: 'getCamera',
        url: '/camera',
        type: RESTType.GET,
    }
]