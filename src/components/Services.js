import React from 'react';

const Services = () => {
  const categories = [
    {
      emoji: '🎨',
      title: 'Graphic Design & Branding',
      blurb: 'Bringing ideas to life through stunning visuals and powerful brand identities.',
      items: [
        'Logo Design & Brand Identity',
        'Flyers, Posters & Brochures',
        'Business Cards & Stationery',
        'Social Media Graphics',
        'Brand Guidelines & Templates'
      ]
    },
    {
      emoji: '🎬',
      title: 'Video Editing & Motion Graphics',
      blurb: 'Creating dynamic videos that tell stories and grab attention.',
      items: [
        'Promotional & Ad Videos',
        'Reels / TikTok Edits',
        'Animated Social Media Posts',
        'Intros, Outros & Transitions',
        'Infographic Animations'
      ]
    },
    {
      emoji: '📱',
      title: 'Social Media Management & Ad Boosting',
      blurb: 'Helping brands grow, engage, and convert audiences online.',
      items: [
        'Content Planning & Strategy',
        'Page Setup & Optimization',
        'Post Scheduling & Engagement',
        'Facebook, Instagram & TikTok Ad Boosting',
        'Analytics & Growth Reports'
      ]
    },
    {
      emoji: '💻',
      title: 'Website Design & Development',
      blurb: 'Designing and developing fast, modern, and responsive websites.',
      items: [
        'UI/UX Web Design',
        'Front-End & Back-End Development',
        'Landing Pages & Portfolios',
        'Website Maintenance & Optimization',
        'Domain, Hosting & SEO Setup'
      ]
    },
    {
      emoji: '📲',
      title: 'App Design & Development',
      blurb: 'Turning ideas into functional and user-friendly mobile experiences.',
      items: [
        'Android & iOS App Development',
        'UI/UX for Mobile Apps',
        'App Prototyping & Wireframing',
        'Cross-Platform Development',
        'App Testing & Support'
      ]
    },
    {
      emoji: '🧠',
      title: 'UI/UX Design & Prototyping',
      blurb: 'Designing intuitive digital experiences that users love.',
      items: [
        'User Interface Design (Web & App)',
        'User Experience Research',
        'Interactive Prototypes',
        'Wireframing & Design Systems'
      ]
    },
    {
      emoji: '🤖',
      title: 'Bot & Game Development',
      blurb: 'Building smart, interactive digital products that engage and entertain.',
      items: [
        'Chatbot Development (Telegram, Messenger, etc.)',
        'Simple Mobile & Web Games',
        'Interactive Experiences for Brands',
        'AI-Powered Automations'
      ]
    },
    {
      emoji: '✍️',
      title: 'Prompt Engineering',
      blurb: 'Crafting effective prompts to optimize AI interactions and outcomes.',
      items: [
        'AI Prompt Design & Optimization',
        'LLM Prompt Development',
        'Chatbot Conversation Design',
        'AI Model Fine-tuning Prompts',
        'Custom AI Workflow Automation'
      ]
    }
  ];

  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-header">
          <h2 id="services-title" className="section-title">Services</h2>
          <p className="section-subtitle">Design, development, and growth services tailored to your project</p>
        </div>

        <div className="services-categories-grid">
          {categories.map((cat, i) => (
            <article key={i} className="service-category">
              <header className="service-header">
                <span className="service-emoji" aria-hidden="true">{cat.emoji}</span>
                <h3 className="service-title">{cat.title}</h3>
              </header>
              <p className="service-blurb">{cat.blurb}</p>
              <ul className="service-items">
                {cat.items.map((it, idx) => (
                  <li key={idx} className="service-item">
                    <i className="fas fa-check" aria-hidden="true"></i>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;


