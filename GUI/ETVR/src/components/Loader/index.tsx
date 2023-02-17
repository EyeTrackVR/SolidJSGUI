import './styles.css'

interface LoaderProps {
    gradient?: string
    gradientMid?: string
    gradientBot?: string
    width?: string
    height?: string
}

const Loader = (props: LoaderProps) => {
    return (
        <div class="spinner">
            <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                class="shape"
                preserveAspectRatio="none"
                style={{
                    width: props.width || '100%',
                    height: props.height || '100%',
                }}>
                <defs>
                    <linearGradient id="shape-gradient" x2="0.35" y2="1">
                        <stop offset="0%" stop-color={props.gradient || 'var(--color-stop)'} />
                        <stop
                            offset="30%"
                            stop-color={props.gradientMid || 'var(--color-middle-bot)'}
                        />
                        <stop offset="100%" stop-color={props.gradientBot || 'var(--color-bot)'} />
                    </linearGradient>
                </defs>
                <g>
                    <circle class="gradient-bg" cx="50" cy="50" r="20" />
                </g>
            </svg>
        </div>
    )
}

export default Loader
