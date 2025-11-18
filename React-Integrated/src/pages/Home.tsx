import { HomeContainer } from './styles/Home';
import Hero from '../components/Hero';
import Technologies from '../components/Technologies';
import About from '../components/About';
import LiveDemo from '../components/LiveDemo';
import GetStarted from '../components/GetStarted';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <HomeContainer>
            <Hero />
            <About />
            <Technologies />
            <LiveDemo />
            <GetStarted />
            <Footer />
        </HomeContainer>
    )
}