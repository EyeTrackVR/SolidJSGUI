import './styles.css'

interface LoaderProps {
    gradient: string
    gradientMid: string
    gradientBot: string
    width: string
    height: string
    id?: string
}

interface CustomLoaderProps {
    width: number
    height: number
    unit?: string
    id?: string
}

export const XLoader = (props: LoaderProps) => {
    return (
        <div class="spinner" id={props.id}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                width={props.width}
                height={props.height}>
                <defs>
                    <linearGradient id="x-shape-gradient" x2="0.35" y2="1">
                        <stop offset="0%" stop-color={props.gradient} />
                        <stop offset="30%" stop-color={props.gradientMid} />
                        <stop offset="100%" stop-color={props.gradientBot} />
                    </linearGradient>
                </defs>
                <path
                    d="M76.4969 11.3291C78.7942 8.54415 78.4233 4.40773 75.6653 2.08829C74.4498 1.06618 72.9739 0.566208 71.5073 0.566208C69.6443 0.566208 67.7962 1.37052 66.5125 2.9287L39 36.4307L11.4969 3.10548C10.2115 1.54812 8.36469 0.742981 6.50204 0.742981C5.03568 0.742981 3.56079 1.24297 2.34407 2.26508C-0.414369 4.5845 -0.786088 8.72093 1.51247 11.5059L30.539 46.6768L1.5076 81.6709C-0.790353 84.4559 -0.419041 88.5923 2.34001 90.9117C5.09438 93.2373 9.19141 92.8633 11.4928 90.0721L39 56.7539L66.5031 90.0791C68.7984 92.8641 72.8975 93.2414 75.6559 90.9187C78.4144 88.5993 78.7861 84.4628 76.4875 81.6779L47.461 46.507L76.4969 11.3291Z"
                    fill="url(#x-shape-gradient)"
                />
            </svg>
        </div>
    )
}

export const CircularLoader = (props: LoaderProps) => {
    return (
        <div class="spinner">
            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                class="shape"
                width={props.width}
                height={props.height}
                preserveAspectRatio="none">
                <defs>
                    <linearGradient id="shape-gradient" x2="0.35" y2="1">
                        <stop offset="0%" stop-color={props.gradient} />
                        <stop offset="30%" stop-color={props.gradientMid} />
                        <stop offset="100%" stop-color={props.gradientBot} />
                    </linearGradient>
                </defs>
                <g>
                    <circle class="gradient-bg" cx="50" cy="50" r="20" />
                </g>
            </svg>
        </div>
    )
}

export const OrangeLoader = (props: CustomLoaderProps) => {
    return (
        <div class="flex justify-center items-center">
            <CircularLoader
                gradient="orange"
                gradientMid="rgba(255, 153, 0, 0.594)"
                gradientBot="rgba(255, 153, 0, 0.144)"
                width={`${props.width}${props.unit || 'px'}`}
                height={`${props.height}${props.unit || 'px'}`}
            />
        </div>
    )
}

export const MagentaLoader = (props: CustomLoaderProps) => {
    return (
        <div class="flex justify-center items-center">
            <XLoader
                id={props.id}
                gradient="magenta"
                gradientMid="rgba(255, 0, 255, 0.594)"
                gradientBot="rgba(255, 0, 255, 0.144)"
                width={`${props.width}${props.unit || 'px'}`}
                height={`${props.height}${props.unit || 'px'}`}
            />
        </div>
    )
}
