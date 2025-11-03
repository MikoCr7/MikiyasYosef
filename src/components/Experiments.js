import React from 'react';

const Experiments = () => {
  const items = [
    { title: 'Particle Playground', desc: 'Canvas particles with reduced-motion fallback', url: '#' },
    { title: 'Scroll-linked Animations', desc: 'Intersection-based micro-interactions', url: '#' },
    { title: '3D Card Tilt', desc: 'Perspective transform and parallax hover', url: '#' }
  ];

  return (
    <section id="experiments" className="experiments" aria-labelledby="experiments-title">
      <div className="container">
        <div className="section-header">
          <h2 id="experiments-title" className="section-title">Experiments</h2>
          <p className="section-subtitle">Playground for motion and creative code</p>
        </div>

        <div className="experiments-grid">
          {items.map((e, i) => (
            <a key={i} className="experiment-card" href={e.url}>
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
              <span className="experiment-link">Open<i className="fas fa-arrow-right" aria-hidden="true"></i></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiments;


