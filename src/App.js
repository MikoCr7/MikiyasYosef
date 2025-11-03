import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import LoadingScreen from './components/LoadingScreen';
import ContentProtection from './components/ContentProtection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <ContentProtection />
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />
          <main id="main-content" role="main">
            <Hero />
            <About />
            <Experience />
            <Services />
            <Portfolio />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <ScrollIndicator />
        </>
      )}
    </div>
  );
}

export default App;
