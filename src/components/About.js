import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState('creative');
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const developmentSkills = [
    { icon: 'fab fa-html5', name: 'HTML5', level: 95, color: '#e34f26' },
    { icon: 'fab fa-css3-alt', name: 'CSS3', level: 90, color: '#1572b6' },
    { icon: 'fab fa-js', name: 'JavaScript', level: 88, color: '#f7df1e' },
    { icon: 'fab fa-react', name: 'React', level: 92, color: '#61dafb' },
    { icon: 'fab fa-node-js', name: 'Node.js', level: 85, color: '#339933' },
    { icon: 'fab fa-php', name: 'PHP', level: 85, color: '#777bb4' },
    { icon: 'fab fa-python', name: 'Python', level: 80, color: '#3776ab' },
    { icon: 'fas fa-database', name: 'Firebase', level: 80, color: '#ffca28' }
  ];

  const creativeSkills = [
    { icon: 'fas fa-paint-brush', name: 'Graphics Design', level: 90, color: '#ff6b6b' },
    { icon: 'fas fa-video', name: 'Video Editing', level: 85, color: '#4ecdc4' },
    { icon: 'fas fa-play-circle', name: 'Motion Graphics', level: 88, color: '#45b7d1' },
    { icon: 'fas fa-palette', name: 'UI/UX Design', level: 92, color: '#96ceb4' }
  ];


  return (
    <section id="about" className="about" ref={aboutRef} aria-labelledby="about-title">
      <div className="container">
        <div className="section-header">
          <h2 id="about-title" className="section-title">About Me</h2>
          <p className="section-subtitle">Passionate about creating digital experiences</p>
        </div>
        
        <div className="about-content">
          <div className="about-image">
            <div className="image-container">
              <img 
                src="/img/Miko.webp" 
                alt="Mikiyas Yosef - Creative Designer and Video Editor professional portrait photo" 
                className="profile-img"
                loading="lazy"
                decoding="async"
                width="400"
                height="500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="image-glow"></div>
              <div className="floating-elements">
                <div className="floating-element element-1">
                  <i className="fab fa-react" aria-hidden="true"></i>
                </div>
                <div className="floating-element element-2">
                  <i className="fas fa-paint-brush" aria-hidden="true"></i>
                </div>
                <div className="floating-element element-3">
                  <i className="fas fa-code" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-text">
            <div className="about-description">
              <p>
                I'm a multi-disciplinary creative professional specializing in development, design, and visual storytelling. 
                With expertise spanning from web development to motion graphics, I bring ideas to life through clean code, 
                innovative design, and compelling visual narratives that engage and inspire audiences.
              </p>
            </div>


            <div className="skills-container">
              <div className="skills-tabs">
                <button 
                  className={`skill-tab ${activeSkillCategory === 'creative' ? 'active' : ''}`}
                  onClick={() => setActiveSkillCategory('creative')}
                >
                  <i className="fas fa-paint-brush"></i>
                  <span>Design & Creative</span>
                </button>
                <button 
                  className={`skill-tab ${activeSkillCategory === 'development' ? 'active' : ''}`}
                  onClick={() => setActiveSkillCategory('development')}
                >
                  <i className="fas fa-code"></i>
                  <span>Development</span>
                </button>
              </div>

              <div className="skills-content">
                {activeSkillCategory === 'creative' && (
                  <div className="skills-grid">
                    {creativeSkills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-icon">
                          <i className={skill.icon} style={{ color: skill.color }} aria-hidden="true"></i>
                        </div>
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{ 
                                width: isVisible ? `${skill.level}%` : '0%',
                                backgroundColor: skill.color,
                                animationDelay: `${index * 0.1}s`
                              }}
                            ></div>
                          </div>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSkillCategory === 'development' && (
                  <div className="skills-grid">
                    {developmentSkills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        <div className="skill-icon">
                          <i className={skill.icon} style={{ color: skill.color }} aria-hidden="true"></i>
                        </div>
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <div className="skill-bar">
                            <div 
                              className="skill-progress" 
                              style={{ 
                                width: isVisible ? `${skill.level}%` : '0%',
                                backgroundColor: skill.color,
                                animationDelay: `${index * 0.1}s`
                              }}
                            ></div>
                          </div>
                          <span className="skill-level">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
