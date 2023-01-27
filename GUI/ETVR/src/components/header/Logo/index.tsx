import { Image } from '@kobalte/core'
import { Link } from '@solidjs/router'
import icons from '@assets/images/index'

export const Logo = () => {
    return (
        <Link href="/" class="no-underline">
            <Image.Root>
                <Image.Img src={icons.logo} alt="logo" width="80px" class="rounded-full" />
            </Image.Root>
        </Link>
    )
}
