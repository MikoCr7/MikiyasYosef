import React, { useState, useEffect, useRef } from 'react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const experienceRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      year: '2023 - 2025',
      title: 'Website Designer And Developer',
      company: 'Digital Agency',
      icon: 'fas fa-mobile-alt',
      color: 'secondary'
    },
    {
      year: '2022',
      title: 'Senior UI/UX Designer',
      company: 'Marketing Firm',
      icon: 'fas fa-palette',
      color: 'accent'
    },
    {
      year: '2021',
      title: 'Senior Full Stack Designer',
      company: 'Design Studio',
      icon: 'fas fa-pencil-alt',
      color: 'primary'
    },
    {
      year: '2020',
      title: 'Premium Certification',
      company: 'Udemy',
      icon: 'fas fa-graduation-cap',
      color: 'accent'
    }
  ];

  return (
    <section id="experience" className="experience" ref={experienceRef} aria-labelledby="experience-title">
      <div className="container">
        <div className="section-header">
          <h2 id="experience-title" className="section-title">Experience</h2>
          <p className="section-subtitle">Professional journey & creative milestones</p>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`timeline-item timeline-item-${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="timeline-connector"></div>
              <div className={`experience-card experience-card-${exp.color}`}>
                <div className="experience-card-header">
                  <div className="experience-icon-wrapper">
                    <i className={exp.icon} aria-hidden="true"></i>
                  </div>
                  <div className="experience-year-badge">{exp.year}</div>
                </div>
                <div className="experience-card-content">
                  <h3 className="experience-title">{exp.title}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                <div className="experience-card-footer">
                  <div className="experience-progress-bar">
                    <div className="experience-progress-fill" style={{ width: `${((experiences.length - index) / experiences.length) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="timeline-node">
                <div className="timeline-node-inner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
