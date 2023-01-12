import { routes } from '@src/routes'

// do not use it , that's not the correct way xd
const usePathFilter = () => {
    return routes.filter((route) => route.path !== '/*404')
}

export default usePathFilter
