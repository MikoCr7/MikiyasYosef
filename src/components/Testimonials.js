import React from 'react';

const Testimonials = () => {
  const quotes = [
    // Web Development Testimonials (4)
    {
      name: 'Portfolio Client',
      role: 'Creative Professional',
      text: 'Mikiyas developed my portfolio website with custom React animations. The page load time is under 2 seconds, and we achieved a 98% mobile usability score. His web development skills combined with his design expertise created a unique, responsive website that perfectly showcases my work. Simply brilliant!',
      rating: 5,
      avatar: '',
      category: 'web'
    },
    {
      name: 'E-Commerce Startup Owner',
      role: 'CEO, E-Commerce Startup',
      text: 'Mikiyas built our complete e-commerce platform from scratch. The React frontend with Node.js backend and Stripe payment integration works flawlessly. We achieved a 95% conversion rate and 1.5s page load time. His full-stack development skills are exceptional, and the platform handles thousands of transactions daily without issues.',
      rating: 5,
      avatar: '',
      category: 'web'
    },
    {
      name: 'Corporate Company Director',
      role: 'Marketing Director, Corporate Company',
      text: 'Mikiyas created our corporate website with Next.js and Contentful CMS integration. The website is professional, easy to manage, and SEO optimized. We saw a 40% increase in organic traffic and a 96% mobile usability score. His ability to create a user-friendly CMS for non-technical users made content management effortless.',
      rating: 5,
      avatar: '',
      category: 'web'
    },
    {
      name: 'Data Analytics Manager',
      role: 'Product Manager, Data Analytics Company',
      text: 'Mikiyas developed our analytics dashboard with real-time data visualization using React, D3.js, and Chart.js. The dashboard is intuitive and displays complex data beautifully. We improved data analysis time by 70% and achieved 98% user satisfaction. The real-time API integration works seamlessly.',
      rating: 5,
      avatar: '',
      category: 'web'
    },
    // Video Editing Testimonials (4)
    { 
      name: 'Video Production Client', 
      role: 'Marketing Agency', 
      text: 'Mikiyas edited our marketing video and handled all post-production work. His video editing skills transformed raw footage into a compelling story. The video exceeded 100K views in the first week. His color grading and motion graphics integration created a professional, polished result that exceeded our expectations.', 
      rating: 5, 
      avatar: '',
      category: 'video'
    },
    {
      name: 'Corporate Video Producer',
      role: 'Marketing Director, Corporate Company',
      text: 'Mikiyas produced our corporate promotional video with professional editing and color grading. The video effectively communicates our company values and services. It was featured on our homepage and achieved a 95% completion rate. His attention to detail in color grading and sound design is outstanding.',
      rating: 5,
      avatar: '',
      category: 'video'
    },
    {
      name: 'YouTube Creator',
      role: 'Content Creator',
      text: 'Mikiyas edits all my YouTube videos with engaging transitions and effects. His dynamic editing style keeps viewers engaged throughout. Since working with him, I\'ve seen a 40% increase in average watch time and a 60% increase in subscriber growth. His motion graphics and consistent branding make my content stand out.',
      rating: 5,
      avatar: '',
      category: 'video'
    },
    {
      name: 'Event Organizer',
      role: 'Event Manager',
      text: 'Mikiyas created our event highlight reel with fast-paced editing and music synchronization. He perfectly captured the energy and excitement of our live event. The video received 500K+ views on social media with 95% positive feedback. His ability to tell a story through editing is remarkable.',
      rating: 5,
      avatar: '',
      category: 'video'
    },
    // Motion Graphics Testimonials (4)
    { 
      name: 'Product Company Owner', 
      role: 'Product Company', 
      text: 'Mikiyas created our animated explainer video with motion graphics. The video engagement rate reached 85% on social platforms. His ability to explain complex product features through engaging animations is remarkable. The 3D elements and smooth transitions perfectly captured our brand message.', 
      rating: 5, 
      avatar: '',
      category: 'motion'
    },
    {
      name: 'Branding Agency Director',
      role: 'Creative Director, Branding Agency',
      text: 'Mikiyas created our logo animation with particle effects and smooth transitions. The animation perfectly captures our brand essence in just 5 seconds. It has a 92% completion rate and has been used in 50+ brand presentations. The particle effects and transitions are stunning!',
      rating: 5,
      avatar: '',
      category: 'motion'
    },
    {
      name: 'Social Media Agency Manager',
      role: 'Social Media Manager',
      text: 'Mikiyas created animated social media posts and stories for our campaigns. The motion graphics library he developed performs exceptionally well across all platforms. We saw a 150% increase in engagement rate and a 200% increase in shares. His animated content always stands out in crowded feeds.',
      rating: 5,
      avatar: '',
      category: 'motion'
    },
    {
      name: 'Product Manufacturer',
      role: 'Product Marketing Manager',
      text: 'Mikiyas created our 3D product animation with cinematic camera movements. The photorealistic rendering showcases our product features beautifully. The animation achieved an 88% engagement rate and was featured in our product launch campaign. His 3D skills and attention to lighting details are exceptional.',
      rating: 5,
      avatar: '',
      category: 'motion'
    }
  ];

  // Removed sample client logo placeholders for simplicity

  return (
    <section id="testimonials" className="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="section-header">
          <h2 id="testimonials-title" className="section-title">Client Stories</h2>
          <p className="section-subtitle">Real results from real collaborations</p>
        </div>

        <div className="testimonials-scroll-wrapper">
          <div className="testimonials-scroll">
            {/* First set of cards */}
            {quotes.map((q, i) => {
              const initials = q.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              const fullStars = Math.max(0, Math.min(5, q.rating || 0));
              const emptyStars = 5 - fullStars;
              return (
                <blockquote key={`first-${i}`} className="testimonial" cite={q.name}>
                  <div className="testimonial-header">
                    <div className="avatar avatar-anim" aria-hidden="true">
                      {q.avatar ? (
                        <img src={q.avatar} alt={`${q.name}, ${q.role} - Client testimonial photo`} loading="lazy" decoding="async" />
                      ) : (
                        <span className="avatar-initials">{initials}</span>
                      )}
                    </div>
                    <div className="testimonial-meta">
                      <cite>{q.name}</cite>
                      <span className="testimonial-role">{q.role}</span>
                      <div className="stars" aria-label={`Rated ${fullStars} out of 5`}>
                        {Array.from({ length: fullStars }).map((_, idx) => (
                          <i key={`f-${idx}`} className="fas fa-star" aria-hidden="true"></i>
                        ))}
                        {Array.from({ length: emptyStars }).map((_, idx) => (
                          <i key={`e-${idx}`} className="far fa-star" aria-hidden="true"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>"{q.text}"</p>
                </blockquote>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {quotes.map((q, i) => {
              const initials = q.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              const fullStars = Math.max(0, Math.min(5, q.rating || 0));
              const emptyStars = 5 - fullStars;
              return (
                <blockquote key={`second-${i}`} className="testimonial" cite={q.name}>
                  <div className="testimonial-header">
                    <div className="avatar avatar-anim" aria-hidden="true">
                      {q.avatar ? (
                        <img src={q.avatar} alt={`${q.name}, ${q.role} - Client testimonial photo`} loading="lazy" decoding="async" />
                      ) : (
                        <span className="avatar-initials">{initials}</span>
                      )}
                    </div>
                    <div className="testimonial-meta">
                      <cite>{q.name}</cite>
                      <span className="testimonial-role">{q.role}</span>
                      <div className="stars" aria-label={`Rated ${fullStars} out of 5`}>
                        {Array.from({ length: fullStars }).map((_, idx) => (
                          <i key={`f-${idx}`} className="fas fa-star" aria-hidden="true"></i>
                        ))}
                        {Array.from({ length: emptyStars }).map((_, idx) => (
                          <i key={`e-${idx}`} className="far fa-star" aria-hidden="true"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>"{q.text}"</p>
                </blockquote>
              );
            })}
            {/* Third set for more seamless effect */}
            {quotes.map((q, i) => {
              const initials = q.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              const fullStars = Math.max(0, Math.min(5, q.rating || 0));
              const emptyStars = 5 - fullStars;
              return (
                <blockquote key={`third-${i}`} className="testimonial" cite={q.name}>
                  <div className="testimonial-header">
                    <div className="avatar avatar-anim" aria-hidden="true">
                      {q.avatar ? (
                        <img src={q.avatar} alt={`${q.name}, ${q.role} - Client testimonial photo`} loading="lazy" decoding="async" />
                      ) : (
                        <span className="avatar-initials">{initials}</span>
                      )}
                    </div>
                    <div className="testimonial-meta">
                      <cite>{q.name}</cite>
                      <span className="testimonial-role">{q.role}</span>
                      <div className="stars" aria-label={`Rated ${fullStars} out of 5`}>
                        {Array.from({ length: fullStars }).map((_, idx) => (
                          <i key={`f-${idx}`} className="fas fa-star" aria-hidden="true"></i>
                        ))}
                        {Array.from({ length: emptyStars }).map((_, idx) => (
                          <i key={`e-${idx}`} className="far fa-star" aria-hidden="true"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p>"{q.text}"</p>
                </blockquote>
              );
            })}
          </div>
        </div>

        {/* Client logos removed */}
      </div>
    </section>
  );
};

export default Testimonials;


