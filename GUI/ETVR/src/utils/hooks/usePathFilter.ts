import { routes } from '@src/routes'

const usePathFilter = () => {
    return routes.filter((route) => route.path !== '/*404')
}

export default usePathFilter