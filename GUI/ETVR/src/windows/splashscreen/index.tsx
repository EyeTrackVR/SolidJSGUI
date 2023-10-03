/* @refresh reload */
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import './styles.css'

const SplashScreen = () => {
    return (
        <div class="container">
            <div class="fade-in">
                <div class="parent logo_container">
                    <img class="logo responsive center" src="./transparent_logo.gif" alt="logo" />
                </div>
                <div text-align="center">
                    <p>EyeTrackVR</p>
                </div>
            </div>
        </div>
    )
}

render(
    () => (
        <Router>
            <SplashScreen />
        </Router>
    ),
    document.getElementById('root') as HTMLElement,
)
