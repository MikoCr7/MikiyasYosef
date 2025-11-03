import React, { useState, useEffect, useRef } from 'react';
import { trackContactSubmit } from '../utils/analytics';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formEl = e.currentTarget;
      const payload = new FormData(formEl);
      // If honeypot is filled, abort silently
      if ((payload.get('_gotcha') || '').toString().trim() !== '') {
        if (statusRef.current) {
          statusRef.current.textContent = 'Message could not be sent.';
        }
        setIsSubmitting(false);
        return;
      }
      const response = await fetch('https://formspree.io/f/mpwolkv', {
        method: 'POST',
        body: payload,
        headers: { 'Accept': 'application/json' }
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || 'Form submission failed');
      }
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      if (statusRef.current) {
        statusRef.current.textContent = 'Message sent successfully! I will get back to you soon.';
      }
      // Track successful form submission
      trackContactSubmit(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (statusRef.current) {
        statusRef.current.textContent = 'Error sending message. Please try again or email me directly.';
      }
      // Track failed form submission
      trackContactSubmit(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: 'fab fa-telegram', label: 'Telegram', value: '@Miko_Cr7', href: 'https://t.me/Miko_Cr7', external: true },
    { icon: 'fas fa-phone', label: 'Phone', value: '+251-985-535-022', href: 'tel:+251985535022' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'Mikiyascr7@gmail.com', href: 'mailto:Mikiyascr7@gmail.com' },
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Addis Ababa, Ethiopia', href: 'https://www.google.com/maps/search/?api=1&query=Addis+Ababa%2C+Ethiopia', external: true }
  ];

  return (
    <section id="contact" className="contact" ref={contactRef} aria-labelledby="contact-title">
      <div className="container">
        <div className="section-header">
          <h2 id="contact-title" className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-describedby="form-status">
              <div id="form-status" ref={statusRef} aria-live="polite" className="sr-only"></div>
              {/* Honeypot field for spam protection */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="_gotcha" tabIndex="-1" autoComplete="off" />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                  placeholder="Your Name"
                  required 
                />
                {errors.name && <span id="error-name" role="alert" className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  placeholder="Your Email"
                  required 
                />
                {errors.email && <span id="error-email" role="alert" className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  placeholder="Your Message"
                  required
                ></textarea>
                {errors.message && <span id="error-message" role="alert" className="error-message">{errors.message}</span>}
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <div className="spinner"></div>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-details">
              {contactInfo.map((info, index) => {
                const copyValue = info.label === 'Telegram' ? info.value.replace(/^@/, 'https://t.me/') : info.value;
                const onCopy = (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigator.clipboard?.writeText(copyValue).then(() => {
                    if (statusRef.current) statusRef.current.textContent = `${info.label} copied to clipboard`;
                  }).catch(() => {
                    if (statusRef.current) statusRef.current.textContent = `Unable to copy ${info.label}`;
                  });
                };
                const commonProps = {
                  className: `contact-detail ${isVisible ? 'animate' : ''}`,
                  style: { animationDelay: `${index * 0.1}s` },
                  'aria-label': `${info.label}: ${info.value}`
                };

                const content = (
                  <>
                    <div className="detail-icon">
                      <i className={info.icon} aria-hidden="true"></i>
                    </div>
                    <div className="detail-content">
                      <span className="detail-label">{info.label}</span>
                      <span className="detail-value">{info.value}</span>
                    </div>
                    <span 
                      className="copy-chip" 
                      role="button" 
                      tabIndex={0}
                      aria-label={`Copy ${info.label}`}
                      onClick={onCopy}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { onCopy(e); } }}
                    >
                      <i className="fas fa-copy" aria-hidden="true"></i>
                      <span className="sr-only">Copy</span>
                    </span>
                  </>
                );

                return info.external ? (
                  <a key={index} href={info.href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                    {content}
                  </a>
                ) : (
                  <a key={index} href={info.href} {...commonProps}>
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
