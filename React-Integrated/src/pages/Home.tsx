import { StyleHome } from '@styles/Home';
import Hero from '@sections/Hero';
import Technologies from '@sections/Technologies';
import About from '@sections/About';
import LiveDemo from '@sections/LiveDemo';
import Contact from '@sections/Contact';

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