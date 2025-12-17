import { useEffect } from 'react';
import i18n from './util/translation';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import "./App.css";

function App() {

  // Detect browser language and set initial language
  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    const detectedLang = browserLang.startsWith("pt") ? "pt" : "en";
    if (typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(detectedLang);
    }
  }, []);

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
