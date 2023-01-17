import icons from '@assets/images/index'
import { Image } from '@hope-ui/core'

export const Logo = () => {
    return <Image src={icons.logo} alt="logo" objectFit="cover" width="80px" rounded={100} />
}
