// Analytics utility functions for tracking events

// Initialize analytics (call once when app loads)
export const initAnalytics = () => {
  // Analytics is initialized in index.html via Google Tag Manager
  // This function can be used for additional setup if needed
  // Silently fails if GA is not configured
  // Analytics will work automatically once GA_MEASUREMENT_ID is set in index.html
};

// Get GA Measurement ID from window or use fallback
const getGAId = () => {
  // Check if GA ID is configured in window (set via index.html)
  if (window.GA_MEASUREMENT_ID) {
    return window.GA_MEASUREMENT_ID;
  }
  // Return null if not configured (will skip tracking)
  return null;
};

// Track page views
export const trackPageView = (path, title) => {
  const gaId = getGAId();
  if (typeof window.gtag !== 'undefined' && gaId) {
    window.gtag('config', gaId, {
      page_path: path,
      page_title: title
    });
  }
};

// Track events
export const trackEvent = (action, category, label, value) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Track contact form submission
export const trackContactSubmit = (success) => {
  trackEvent('contact_form_submit', 'engagement', success ? 'success' : 'error');
};

// Track portfolio project view
export const trackProjectView = (projectTitle, projectCategory) => {
  trackEvent('project_view', 'portfolio', `${projectTitle} - ${projectCategory}`);
};

// Track newsletter signup
export const trackNewsletterSignup = (placement) => {
  trackEvent('newsletter_signup', 'engagement', placement);
};

// Track social link click
export const trackSocialClick = (platform) => {
  trackEvent('social_click', 'engagement', platform);
};

// Track download
export const trackDownload = (fileName, fileType) => {
  trackEvent('file_download', 'engagement', `${fileName} - ${fileType}`);
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent('scroll_depth', 'engagement', `${depth}%`);
};

// Track time on page
export const trackTimeOnPage = (seconds) => {
  trackEvent('time_on_page', 'engagement', Math.floor(seconds / 60) + ' minutes');
};

// Track custom conversions
export const trackConversion = (conversionType, value) => {
  trackEvent('conversion', 'conversion', conversionType, value);
};

