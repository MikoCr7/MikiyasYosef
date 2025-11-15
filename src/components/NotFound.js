import React from 'react';

const NotFound = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-illustration">
            <div className="error-number">404</div>
            <div className="error-orb orb-1"></div>
            <div className="error-orb orb-2"></div>
            <div className="error-orb orb-3"></div>
          </div>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-description">
            Oops! The page you're looking for seems to have wandered off into the digital void.
            <br />
            Let's get you back on track.
          </p>
          <div className="not-found-actions">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="btn-primary">
              <i className="fas fa-home" aria-hidden="true"></i>
              <span>Back to Home</span>
            </a>
            <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }} className="btn-secondary">
              <i className="fas fa-briefcase" aria-hidden="true"></i>
              <span>View Portfolio</span>
            </a>
          </div>
          <div className="not-found-suggestions">
            <p>You might be looking for:</p>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Me</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Portfolio</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

