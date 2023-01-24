import { Image } from '@hope-ui/core'
import icons from '@assets/images/index'

export const Logo = () => {
    return <Image src={icons.logo} alt="logo" objectFit="cover" width="80px" rounded={100} />
}
