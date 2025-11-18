import { AppContainer } from './App';
import Header from './components/Header';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import About from './components/About';
import LiveDemo from './components/LiveDemo';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';

function App() {

  return (
    <AppContainer>
      <Header />
      <Hero />
      <About />
      <Technologies />
      <LiveDemo />
      <GetStarted />
      <Footer />
    </AppContainer>
  );
}

export default App;
