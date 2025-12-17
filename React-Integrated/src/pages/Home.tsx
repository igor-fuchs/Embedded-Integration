import { StyleHome } from './styles/Home';
import Hero from '../components/Hero';
import Technologies from '../components/Technologies';
import About from '../components/About';
import LiveDemo from '../components/LiveDemo';
import Contact from '../components/Contact';

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