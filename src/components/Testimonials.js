import React from 'react';

const Testimonials = () => {
  const quotes = [
    { 
      name: 'Amara Tekle', 
      role: 'Brand Manager at TechVibe', 
      text: 'Mikiyas transformed our brand identity completely! His creative vision and attention to detail brought our company to life. The video campaigns he created increased our engagement by 300%. Truly exceptional work!', 
      rating: 5, 
      avatar: '',
      category: 'branding'
    },
    { 
      name: 'Daniel Mekonnen', 
      role: 'CEO, Creative Studio', 
      text: 'Working with Mikiyas is a game-changer. His ability to combine stunning visuals with powerful storytelling in his video edits is unmatched. Every project exceeds expectations and delivers measurable results.', 
      rating: 5, 
      avatar: '',
      category: 'video'
    },
    { 
      name: 'Sofia Teshome', 
      role: 'Marketing Director', 
      text: 'Mikiyas brought our vision to reality with incredible design work. His motion graphics and social media content helped us stand out in a crowded market. The attention to detail and creative approach is outstanding!', 
      rating: 5, 
      avatar: '',
      category: 'design'
    },
    {
      name: 'Elias Tadesse',
      role: 'Startup Founder',
      text: 'The website and branding package Mikiyas delivered was beyond my wildest expectations. His designs are modern, functional, and beautiful. Our conversion rates doubled after the launch. Simply brilliant!',
      rating: 5,
      avatar: '',
      category: 'web'
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


