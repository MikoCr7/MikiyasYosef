import React from 'react';
import Newsletter from './Newsletter';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/MikoCr7', icon: 'fab fa-github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mikiyas-yosaph-b580b7301/', icon: 'fab fa-linkedin' },
    { name: 'Behance', url: 'https://www.behance.net/mikiyasyosafe', icon: 'fab fa-behance' },
    { name: 'Telegram', url: 'https://t.me/Miko_Cr7', icon: 'fab fa-telegram' }
  ];

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-gradient-orb orb-1"></div>
        <div className="footer-gradient-orb orb-2"></div>
        <div className="footer-gradient-orb orb-3"></div>
      </div>
      <div className="container">
        <div className="footer-content">
          {/* Logo and Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo-wrapper">
              <div className="footer-logo-glow"></div>
              <img src="/img/Mikiyas Yosef Logo.svg" alt="Mikiyas Yosef - Creative Designer & Video Editor Logo" className="footer-logo-img" loading="lazy" decoding="async" />
            </div>
            <h3 className="footer-name">Mikiyas Yosef</h3>
            <p className="footer-tagline">Creative Designer & Video Editor</p>
            <p className="footer-description">Crafting digital experiences through innovative design, smooth animations, and clean code</p>
          </div>

          {/* Newsletter Section */}
          <Newsletter placement="footer" />

          {/* Social Links Section */}
          <div className="footer-social-section">
            <h4 className="footer-social-title">Connect With Me</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow me on ${social.name}`}
                >
                  <span className="glow-ring"></span>
                  <span className="ripple"></span>
                  <i className={social.icon}></i>
                  <span className="social-tooltip">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} <span className="copyright-name">Mikiyas Yosef</span>. All rights reserved.</p>
            <p className="footer-message">Designed & Developed with <span className="heart-icon">❤️</span> by Mikiyas Yosef</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;