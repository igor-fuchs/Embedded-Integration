import { StyleHome } from './styles/Home';
import Hero from '../components/sections/Hero';
import Technologies from '../components/sections/Technologies';
import About from '../components/sections/About';
import LiveDemo from '../components/sections/LiveDemo';
import Contact from '../components/sections/Contact';

export default function Home() {
    return (
        <StyleHome>
            <Hero />
            <About />
            <Technologies />
            <LiveDemo />
            <Contact />
        </StyleHome>
    )
}