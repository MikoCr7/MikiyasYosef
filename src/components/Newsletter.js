import React, { useState } from 'react';
import { trackNewsletterSignup } from '../utils/analytics';

const Newsletter = ({ placement = 'footer' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      // Replace with your Mailchimp/ConvertKit/Buttondown endpoint
      // Example for Mailchimp:
      // const response = await fetch('YOUR_MAILCHIMP_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email_address: email })
      // });

      // For now, using a placeholder that you can replace
      // You can integrate with:
      // - Mailchimp: https://mailchimp.com/developer/
      // - ConvertKit: https://developers.convertkit.com/
      // - Buttondown: https://buttondown.email/api
      // - Formspree (same as contact form)
      
      // Simulated API call - Replace with actual integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For Formspree integration (same as contact form):
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     email,
      //     _subject: 'Newsletter Subscription',
      //     _format: 'plain'
      //   })
      // });

      setStatus('success');
      setEmail('');
      
      // Track newsletter signup
      trackNewsletterSignup(placement);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`newsletter ${placement === 'hero' ? 'newsletter-hero' : 'newsletter-footer'}`}>
      <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
        <div className="newsletter-header">
          {placement === 'hero' ? (
            <>
              <h3>Stay Updated</h3>
              <p>Get the latest design tips and project updates</p>
            </>
          ) : (
            <>
              <h4 className="newsletter-title">Newsletter</h4>
              <p className="newsletter-subtitle">Subscribe for design insights & updates</p>
            </>
          )}
        </div>
        <div className="newsletter-input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email address for newsletter subscription"
            className={status === 'error' ? 'error' : ''}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="newsletter-submit"
            disabled={loading}
            aria-label="Subscribe to newsletter"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
            ) : (
              <>
                <span>Subscribe</span>
                <i className="fas fa-paper-plane" aria-hidden="true"></i>
              </>
            )}
          </button>
        </div>
        {status === 'success' && (
          <p className="newsletter-message success" role="alert">
            <i className="fas fa-check-circle" aria-hidden="true"></i>
            Thanks for subscribing! Check your inbox for confirmation.
          </p>
        )}
        {status === 'error' && (
          <p className="newsletter-message error" role="alert">
            <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
            Please enter a valid email address.
          </p>
        )}
        <p className="newsletter-privacy">
          <small>
            <i className="fas fa-lock" aria-hidden="true"></i>
            We respect your privacy. Unsubscribe at any time.
          </small>
        </p>
      </form>
    </div>
  );
};

export default Newsletter;

