import { Image } from '@hope-ui/core'
import { Link } from '@solidjs/router'
import icons from '@assets/images/index'

export const Logo = () => {
    return (
        <Link href="/" class="no-underline">
            <Image src={icons.logo} alt="logo" objectFit="cover" width="80px" rounded={100} />
        </Link>
    )
}
