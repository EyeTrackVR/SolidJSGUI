import {
    createPalette,
    extendTheme,
    type DividerTheme,
    type ModalTheme,
    useTheme,
} from '@hope-ui/core'

/**
 * @description Hope UI Theme Config
 */
const theme = extendTheme({
    colors: {
        light: {
            primary: createPalette({
                50: '#eff6ff',
                100: '#dbeafe',
                200: '#bfdbfe',
                300: '#93c5fd',
                400: '#60a5fa',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
                800: '#1e40af',
                900: '#1e3a8a',
            }),
        },
    },
    components: {
        Divider: {
            styleConfigOverride: {
                // styles for the Divider "root" part
                root: {
                    baseStyle: {
                        // base style override
                        //borderColor: 'red',
                    },
                    variants: {
                        size: {
                            sm: {
                                // style override to apply when the `size="sm"` prop is passed
                            },
                        },
                    },
                },
                // ...style of other parts of the component, if any
            },
        } as DividerTheme,
        Modal: {
            defaultProps: {
                // default props override
            },
            styleConfigOverride: {
                // styles for the Button "root" part
                content: {
                    baseStyle: {
                        style: {
                            backgroundColor: useTheme().colors.light.primary[50],
                        },
                    },
                    variants: {
                        size: {
                            xl: {
                                // style override to apply when the `size="sm"` prop is passed
                                backgroundColor: useTheme().colors.light.primary[50],
                            },
                        },
                    },
                },
                // ...style of other parts of the component, if any
            },
        } as ModalTheme,
    },
})

export default theme
