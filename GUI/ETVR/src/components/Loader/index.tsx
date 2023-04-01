import './styles.css'

interface LoaderProps {
    gradient: string
    gradientMid: string
    gradientBot: string
    width: string
}

interface CustomLoaderProps {
    width: number
    unit?: string
}

const CircularLoader = (props: LoaderProps) => {
    return (
        <div class="spinner">
            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                class="shape"
                preserveAspectRatio="none"
                style={{ width: props.width }}>
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
            />
        </div>
    )
}

export default CircularLoader
