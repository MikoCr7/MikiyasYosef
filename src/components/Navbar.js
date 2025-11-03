import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'portfolio', 'experience', 'testimonials', 'contact'];
        const scrollPosition = window.scrollY + 100;
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAboutMenu = () => {
    setIsAboutOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    setIsAboutOpen(false);
  };

  return (
    <header>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Primary">
        <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('home')} role="button" tabIndex={0} aria-label="Go to home" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToSection('home'); } }}>
          <img src="/img/Mikiyas Yosef Logo.svg" alt="Mikiyas Yosef - Creative Designer & Video Editor Logo" className="logo-img" decoding="async" fetchpriority="high" />
        </div>
        
        <ul id="primary-menu" className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <button 
              onClick={() => scrollToSection('home')} 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              aria-current={activeSection === 'home' ? 'page' : undefined}
            >
              <span>Home</span>
            </button>
          </li>
          <li className={`nav-item has-submenu ${isAboutOpen ? 'open' : ''}`}>
            <button 
              onClick={toggleAboutMenu}
              className={`nav-link ${['about','portfolio','experience'].includes(activeSection) ? 'active' : ''}`}
              aria-haspopup="true"
              aria-expanded={isAboutOpen}
              aria-controls="about-submenu"
            >
              <span>About</span>
            </button>
            <ul id="about-submenu" className="submenu" role="menu">
              <li>
                <button 
                  className="nav-link" 
                  role="menuitem"
                  onClick={() => scrollToSection('about')}
                >
                  <span>About</span>
                </button>
              </li>
              <li>
                <button 
                  className="nav-link" 
                  role="menuitem"
                  onClick={() => scrollToSection('experience')}
                >
                  <span>Experience</span>
                </button>
              </li>
              <li>
                <button 
                  className="nav-link" 
                  role="menuitem"
                  onClick={() => scrollToSection('portfolio')}
                >
                  <span>Portfolio</span>
                </button>
              </li>
            </ul>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('services')} 
              className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
              aria-current={activeSection === 'services' ? 'page' : undefined}
            >
              <span>Services</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}
              aria-current={activeSection === 'testimonials' ? 'page' : undefined}
            >
              <span>Testimonials</span>
            </button>
          </li>
          
          <li>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              aria-current={activeSection === 'contact' ? 'page' : undefined}
            >
              <span>Contact</span>
            </button>
          </li>
        </ul>
        
        <div className="nav-actions">
          <button
            type="button"
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            aria-controls="primary-menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
          </button>
        </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
