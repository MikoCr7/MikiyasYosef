import React, { useState, useEffect, useRef } from 'react';
import projects from '../data/projects';
import { trackProjectView } from '../utils/analytics';
import NigusEcommerce from './NigusEcommerce';
import TeleBOT from './TeleBOT';

const Portfolio = () => {
  // Detect mobile device for default filter
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  // Default to 'all' (All Projects) on both mobile and desktop
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isVisible, setIsVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loadedIds, setLoadedIds] = useState(new Set());
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoProject, setDemoProject] = useState(null);
  const portfolioRef = useRef(null);

  // projects now imported from ../data/projects

  const filters = [
    { id: 'all', label: 'All Projects', icon: 'fas fa-th' },
    { id: 'branding', label: 'Graphics Design', icon: 'fas fa-palette' },
    { id: 'ui-ux', label: 'UI/UX Design', icon: 'fas fa-mobile-alt' },
    { id: 'motion', label: 'Motion Graphics', icon: 'fas fa-video' },
    { id: 'print', label: 'Video Editing', icon: 'fas fa-video' },
    { id: 'web', label: 'Website Development', icon: 'fas fa-globe' }
  ];

  useEffect(() => {
    // Detect mobile on mount and resize
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize filter from URL (e.g., ?filter=web)
    const validFilterIds = ['all', 'branding', 'ui-ux', 'motion', 'print', 'web'];
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get('filter');
    if (urlFilter && validFilterIds.includes(urlFilter)) {
      setActiveFilter(urlFilter);
    }

    // Handle back/forward navigation
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const f = p.get('filter');
      if (f && validFilterIds.includes(f)) {
        setActiveFilter(f);
      } else {
        // Default to 'all'
        setActiveFilter('all');
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    // Reduced motion preference
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefersReducedMotion(!!mql.matches);
    onChange();
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    // Simulate initial loading for skeleton effect
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let filtered = [];
    if (activeFilter === 'all') {
      filtered = projects;
    } else {
      filtered = projects.filter(project => project.category === activeFilter);
    }
    setFilteredProjects(filtered);
    
    // Animate filter transition
    if (!prefersReducedMotion) {
      setIsFiltering(true);
      const t = setTimeout(() => setIsFiltering(false), 200);
      return () => clearTimeout(t);
    }
    // Update URL to reflect current filter (pushState for back/forward)
    const params = new URLSearchParams(window.location.search);
    if (activeFilter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', activeFilter);
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}${window.location.hash}`;
    window.history.pushState({}, '', newUrl);
  }, [activeFilter, prefersReducedMotion]);
  const handleFilterClick = (id) => {
    setActiveFilter(id);
  };

  const handleImageLoad = (id) => {
    setLoadedIds(prev => new Set(prev).add(id));
  };

  const openModal = (project) => {
    // For branding projects with gallery, show gallery modal instead
    if (project.category === 'branding' && project.gallery && project.gallery.length > 0) {
      setSelectedProject(project);
      setSelectedGalleryImage(null); // Reset selected image
    } else {
      setSelectedProject(project);
      setModalImageLoaded(false);
    }
    // Track project view
    trackProjectView(project.title, project.category);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedGalleryImage(null);
  };

  const openImagePopout = (imageItem, project, currentIndex) => {
    // For Havana, open the Havana UIUX.png image
    if (imageItem.title === 'Havana') {
      const fullscreenOverlay = document.createElement('div');
      fullscreenOverlay.className = 'gallery-fullscreen-overlay';
      fullscreenOverlay.innerHTML = `
        <button class="gallery-fullscreen-close" aria-label="Close fullscreen" title="Close (ESC)">
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
        <div class="gallery-fullscreen-container">
          <img src="/img/UIUX/Havana uiux.png" alt="Havana UI/UX Design" class="gallery-fullscreen-img" />
        </div>
      `;
      
      document.body.appendChild(fullscreenOverlay);
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        fullscreenOverlay.classList.add('active');
      }, 10);

      const closeFullscreen = () => {
        fullscreenOverlay.classList.remove('active');
        setTimeout(() => {
          if (fullscreenOverlay.parentNode) {
            document.body.removeChild(fullscreenOverlay);
          }
          document.body.style.overflow = '';
        }, 300);
      };

      const closeBtn = fullscreenOverlay.querySelector('.gallery-fullscreen-close');
      closeBtn.addEventListener('click', closeFullscreen);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape' && fullscreenOverlay.parentNode) {
          closeFullscreen();
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      fullscreenOverlay.addEventListener('click', (e) => {
        if (e.target === fullscreenOverlay) {
          closeFullscreen();
        }
      });
      
      return;
    }

    // For gallery images, open in simple fullscreen view with navigation
    const gallery = project.gallery || [];
    let currentImgIndex = currentIndex !== undefined ? currentIndex : gallery.findIndex(img => img.id === imageItem.id);
    if (currentImgIndex === -1) currentImgIndex = 0;

    const updateFullscreenImage = (index) => {
      if (index < 0 || index >= gallery.length) return;
      
      const currentImage = gallery[index];
      const imgElement = fullscreenOverlay.querySelector('.gallery-fullscreen-img');
      const container = fullscreenOverlay.querySelector('.gallery-fullscreen-container');
      
      if (imgElement && container) {
        // Fade out
        imgElement.style.opacity = '0';
        
        setTimeout(() => {
          imgElement.src = currentImage.image;
          imgElement.alt = currentImage.title;
          // Fade in
          imgElement.style.opacity = '1';
        }, 150);
      }
      
      // Update navigation buttons visibility
      const prevBtn = fullscreenOverlay.querySelector('.gallery-nav-prev');
      const nextBtn = fullscreenOverlay.querySelector('.gallery-nav-next');
      if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'flex';
      if (nextBtn) nextBtn.style.display = index === gallery.length - 1 ? 'none' : 'flex';
    };

    // Create fullscreen overlay
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'gallery-fullscreen-overlay';
    const currentImage = gallery[currentImgIndex];
    fullscreenOverlay.innerHTML = `
      <button class="gallery-fullscreen-close" aria-label="Close fullscreen" title="Close (ESC)">
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
      <button class="gallery-nav-prev ${currentImgIndex === 0 ? 'hidden' : ''}" aria-label="Previous image" title="Previous (←)">
        <i class="fas fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button class="gallery-nav-next ${currentImgIndex === gallery.length - 1 ? 'hidden' : ''}" aria-label="Next image" title="Next (→)">
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
      </button>
      <div class="gallery-fullscreen-container">
        <img src="${currentImage.image}" alt="${currentImage.title}" class="gallery-fullscreen-img" />
      </div>
    `;
    
    document.body.appendChild(fullscreenOverlay);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Fade in animation
    setTimeout(() => {
      fullscreenOverlay.classList.add('active');
    }, 10);

    // Close function
    const closeFullscreen = () => {
      fullscreenOverlay.classList.remove('active');
      setTimeout(() => {
        if (fullscreenOverlay.parentNode) {
          document.body.removeChild(fullscreenOverlay);
        }
        document.body.style.overflow = ''; // Restore scrolling
      }, 300);
    };

    // Navigation function
    const navigateImage = (direction) => {
      let newIndex = currentImgIndex;
      if (direction === 'next' && currentImgIndex < gallery.length - 1) {
        newIndex = currentImgIndex + 1;
      } else if (direction === 'prev' && currentImgIndex > 0) {
        newIndex = currentImgIndex - 1;
      }
      
      if (newIndex !== currentImgIndex) {
        currentImgIndex = newIndex;
        updateFullscreenImage(currentImgIndex);
      }
    };

    // Close button handler
    const closeBtn = fullscreenOverlay.querySelector('.gallery-fullscreen-close');
    closeBtn.addEventListener('click', closeFullscreen);

    // Navigation buttons handlers
    const prevBtn = fullscreenOverlay.querySelector('.gallery-nav-prev');
    const nextBtn = fullscreenOverlay.querySelector('.gallery-nav-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage('prev');
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateImage('next');
      });
    }

    // Keyboard navigation handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && fullscreenOverlay.parentNode) {
        closeFullscreen();
        document.removeEventListener('keydown', handleKeyDown);
      } else if (e.key === 'ArrowLeft' && currentImgIndex > 0) {
        e.preventDefault();
        navigateImage('prev');
      } else if (e.key === 'ArrowRight' && currentImgIndex < gallery.length - 1) {
        e.preventDefault();
        navigateImage('next');
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Click outside to close
    fullscreenOverlay.addEventListener('click', (e) => {
      if (e.target === fullscreenOverlay) {
        closeFullscreen();
      }
    });
  };

  const closeImagePopout = () => {
    setSelectedGalleryImage(null);
  };

  const openFullscreen = (imageSrc = null, imageAlt = null) => {
    // Use provided image or try to get from modal
    let imgSrc = imageSrc;
    let imgAlt = imageAlt;
    
    if (!imgSrc) {
      const imgElement = document.querySelector('.modal-image-img');
      if (imgElement) {
        imgSrc = imgElement.src;
        imgAlt = imgElement.alt;
      } else {
        return;
      }
    }

    // Create fullscreen overlay
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.className = 'fullscreen-overlay';
    fullscreenOverlay.innerHTML = `
      <div class="fullscreen-container">
        <img src="${imgSrc}" alt="${imgAlt || 'Fullscreen image'}" class="fullscreen-image" />
        <button class="fullscreen-close" aria-label="Exit fullscreen" title="Exit Fullscreen (ESC)">
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(fullscreenOverlay);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Fade in animation
    setTimeout(() => {
      fullscreenOverlay.classList.add('active');
    }, 10);

    // Close button handler
    const closeBtn = fullscreenOverlay.querySelector('.fullscreen-close');
    const closeFullscreen = () => {
      fullscreenOverlay.classList.remove('active');
      setTimeout(() => {
        if (fullscreenOverlay.parentNode) {
          document.body.removeChild(fullscreenOverlay);
        }
        document.body.style.overflow = ''; // Restore scrolling
      }, 300);
    };

    closeBtn.addEventListener('click', closeFullscreen);
    fullscreenOverlay.addEventListener('click', (e) => {
      if (e.target === fullscreenOverlay) {
        closeFullscreen();
      }
    });

    // ESC key handler
    const handleEsc = (e) => {
      if (e.key === 'Escape' && fullscreenOverlay.parentNode) {
        closeFullscreen();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  };

  // Share functionality
  const handleShare = async (project, platform) => {
    const url = window.location.href;
    const text = `Check out this ${project.title} project by Mikiyas Yosef - ${project.description}`;
    const shareUrl = `${url}#portfolio?project=${project.id}`;

    try {
      if (platform === 'native' && navigator.share) {
        await navigator.share({
          title: project.title,
          text: text,
          url: shareUrl
        });
      } else if (platform === 'copy') {
        await navigator.clipboard.writeText(shareUrl);
        // Could use a toast notification here instead
        const btn = document.querySelector(`button[aria-label="Copy link to clipboard"]`);
        if (btn) {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        }
      } else {
        const shareLinks = {
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`,
          telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`
        };
        if (shareLinks[platform]) {
          window.open(shareLinks[platform], '_blank', 'width=600,height=400');
        }
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC to close demo modal first, then image popout, then gallery/project modal
      if (e.key === 'Escape') {
        if (showDemoModal) {
          setShowDemoModal(false);
          setDemoProject(null);
          document.body.style.overflow = '';
          return;
        }
        if (selectedGalleryImage) {
          closeImagePopout();
          return;
        }
        if (selectedProject) {
          closeModal();
          return;
        }
      }

      // Arrow keys for portfolio navigation (when modal is open, but not when image popout is open)
      if (selectedProject && !selectedGalleryImage && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
        if (currentIndex !== -1 && filteredProjects.length > 0) {
          if (e.key === 'ArrowLeft') {
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
            openModal(filteredProjects[prevIndex]);
          } else if (e.key === 'ArrowRight') {
            const nextIndex = currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
            openModal(filteredProjects[nextIndex]);
          }
        }
      }
    };

    if (selectedProject || selectedGalleryImage || showDemoModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, selectedGalleryImage, filteredProjects, showDemoModal]);

  // For local images, we don't need srcSet generation
  // The browser will handle WebP images efficiently
  const sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw";

  const getIntrinsicSize = (url) => {
    // Default aspect ratio for portfolio images
    // Can be customized per project if needed
    return { width: 800, height: 600 };
  };

  const formatCategory = (category) => {
    const categoryMap = {
      'branding': 'Graphics Design',
      'ui-ux': 'UI/UX Design',
      'motion': 'Motion Graphics',
      'print': 'Video Editing',
      'web': 'Website Development'
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  };

  const getYouTubeThumbnail = (videoUrl) => {
    // Extract video ID from YouTube URL
    // Supports: youtube.com/embed/VIDEO_ID, youtube.com/watch?v=VIDEO_ID, youtu.be/VIDEO_ID
    let videoId = '';
    if (videoUrl.includes('embed/')) {
      videoId = videoUrl.split('embed/')[1].split('?')[0];
    } else if (videoUrl.includes('watch?v=')) {
      videoId = videoUrl.split('watch?v=')[1].split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
    }
    
    if (videoId) {
      // Return high-quality thumbnail
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  };

  return (
    <>
      <section id="portfolio" className="portfolio" ref={portfolioRef} aria-labelledby="portfolio-title">
        <div className="container">
          <div className="section-header">
            <h2 id="portfolio-title" className="section-title">Portfolio</h2>
            <p className="section-subtitle">Selected projects that showcase my work</p>
          </div>

          <div className="portfolio-filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => handleFilterClick(filter.id)}
                aria-pressed={activeFilter === filter.id}
                aria-label={`Filter by ${filter.label}`}
              >
                <i className={filter.icon} aria-hidden="true"></i>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          <div className={`portfolio-grid ${isFiltering ? 'animating' : ''}`}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`portfolio-item ${project.featured ? 'featured' : ''} ${isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-category={project.category}
                onClick={() => openModal(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(project);
                  }
                }}
                aria-label={`View ${project.title} project details`}
              >
                <div className={`project-image ${project.category === 'ui-ux' ? 'project-image-square' : ''} ${project.id === 8 ? 'project-image-banner' : ''} ${project.id === 1 ? 'project-image-brand' : ''}`}>
                  {project.video ? (
                    <div style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
                      <img
                        src={getYouTubeThumbnail(project.video) || project.image}
                        alt={`${project.title} video thumbnail`}
                        loading="lazy"
                        decoding="async"
                        style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer' }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        zIndex: 2
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 212, 255, 0.9)';
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                      }}
                      >
                        <i className="fas fa-play" style={{ color: 'white', fontSize: '2rem', marginLeft: '5px' }}></i>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={project.image} 
                      sizes={sizes}
                      loading="lazy"
                      decoding="async"
                      width={getIntrinsicSize(project.image).width}
                      height={getIntrinsicSize(project.image).height}
                      alt={`${project.title} portfolio project - ${project.description}. ${project.category === 'ui-ux' ? 'UI/UX' : project.category === 'print' ? 'Video Editing' : project.category.charAt(0).toUpperCase() + project.category.slice(1).replace(/-/g, ' ')} design work by Mikiyas Yosef`}
                      onLoad={() => handleImageLoad(project.id)}
                      className={loadedIds.has(project.id) ? '' : 'lqip'} 
                    />
                  )}
                  {!project.video && (
                    <div className="project-overlay">
                      <div className="project-badge">
                        {project.featured && <span className="featured-badge">Featured</span>}
                        <span className="category-badge">{formatCategory(project.category)}</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.tech.split(' • ').map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              {project.video ? (
                <div className="project-info" style={{ padding: '1rem', textAlign: 'left' }}>
                  <div className="project-badge" style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.featured && <span className="featured-badge">Featured</span>}
                    <span className="category-badge">{formatCategory(project.category)}</span>
                  </div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ marginBottom: '0.75rem', color: '#666' }}>{project.description}</p>
                  <div className="project-tech" style={{ marginBottom: '0.75rem' }}>
                    {project.tech.split(' • ').map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links" style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    {project.demo && project.demo !== '#' && (
                      <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer" aria-label={`Open live demo of ${project.title}`}>
                        <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                      </a>
                    )}
                    {(project.behance && project.behance !== '#') || (project.github && project.github !== '#') ? (
                      <a href={(project.behance && project.behance !== '#') ? project.behance : project.github} className="project-link" target="_blank" rel="noopener noreferrer" aria-label={`${(project.behance && project.behance !== '#') ? 'Open Behance' : 'Open GitHub'} for ${project.title}`}>
                        <i className={(project.behance && project.behance !== '#') ? "fab fa-behance" : "fab fa-github"} aria-hidden="true"></i>
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.tech}</p>
                  <div className="project-links">
                  {project.demo && project.demo !== '#' && (
                    <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer" aria-label={`Open live demo of ${project.title}`}>
                      <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                    </a>
                  )}
                  {(project.behance && project.behance !== '#') || (project.github && project.github !== '#') ? (
                    <a href={(project.behance && project.behance !== '#') ? project.behance : project.github} className="project-link" target="_blank" rel="noopener noreferrer" aria-label={`${(project.behance && project.behance !== '#') ? 'Open Behance' : 'Open GitHub'} for ${project.title}`}>
                      <i className={(project.behance && project.behance !== '#') ? "fab fa-behance" : "fab fa-github"} aria-hidden="true"></i>
                    </a>
                  ) : null}
                  </div>
                </div>
              )}
              </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>No projects found in this category.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Project Modal - Gallery View for Branding Projects */}
      {selectedProject && selectedProject.category === 'branding' && selectedProject.gallery && selectedProject.gallery.length > 0 && !selectedGalleryImage && (
        <div id="galleryModal" className="modal" onClick={closeModal}>
          <div className="modal-content gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal} aria-label="Close gallery" role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && closeModal()}>&times;</span>
            <div className="modal-body gallery-modal-body">
              <div className="gallery-header">
                <h2>{selectedProject.title}</h2>
                <p className="gallery-description">{selectedProject.description}</p>
                <div className="modal-badge" style={{ marginBottom: '2rem' }}>
                  {selectedProject.featured && <span className="featured-badge">Featured</span>}
                  <span className="category-badge">{formatCategory(selectedProject.category)}</span>
                </div>
              </div>
              <div className="gallery-grid">
                {selectedProject.gallery.map((imageItem) => (
                  <div
                    key={imageItem.id}
                    className="gallery-item"
                    onClick={() => openImagePopout(imageItem, selectedProject, selectedProject.gallery.findIndex(img => img.id === imageItem.id))}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImagePopout(imageItem, selectedProject, selectedProject.gallery.findIndex(img => img.id === imageItem.id));
                      }
                    }}
                    aria-label={`View ${imageItem.title}`}
                  >
                    <div className="gallery-image-wrapper">
                      <img
                        src={imageItem.image}
                        alt={imageItem.title}
                        loading="lazy"
                        decoding="async"
                        className={`gallery-image ${imageItem.title === 'Havana' ? 'havana-image' : ''}`}
                      />
                      <div className="gallery-overlay">
                        <i className="fas fa-expand" aria-hidden="true"></i>
                      </div>
                    </div>
                    <h4 className="gallery-item-title">{imageItem.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal - Regular View for Non-Branding Projects */}
      {selectedProject && !(selectedProject.category === 'branding' && selectedProject.gallery && selectedProject.gallery.length > 0) && (
        <div id="projectModal" className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal} aria-label="Close modal" role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && closeModal()}>&times;</span>
            <div className="modal-body">
              <div className="modal-image">
                {selectedProject.video ? (
                  <>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', width: '100%', maxWidth: '100%', maxHeight: '450px' }}>
                      <iframe
                        src={`${selectedProject.video}${selectedProject.video.includes('?') ? '&' : '?'}autoplay=1`}
                        title={`${selectedProject.title} video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      ></iframe>
                    </div>
                    <div className="modal-badge" style={{ marginTop: '1rem' }}>
                      {selectedProject.featured && <span className="featured-badge">Featured</span>}
                      <span className="category-badge">{formatCategory(selectedProject.category)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <img 
                      src={selectedProject.image}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="eager"
                      decoding="async"
                      width={getIntrinsicSize(selectedProject.image).width}
                      height={getIntrinsicSize(selectedProject.image).height}
                        alt={`${selectedProject.title} detailed view - ${selectedProject.description}. ${selectedProject.category === 'ui-ux' ? 'UI/UX' : selectedProject.category === 'print' ? 'Video Editing' : selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1).replace(/-/g, ' ')} portfolio project by Mikiyas Yosef, Creative Designer & Video Editor`}
                      onLoad={() => setModalImageLoaded(true)} 
                      className={modalImageLoaded ? '' : 'lqip'} 
                    />
                    <div className="modal-badge">
                      {selectedProject.featured && <span className="featured-badge">Featured</span>}
                      <span className="category-badge">{formatCategory(selectedProject.category)}</span>
                    </div>
                    {selectedProject.category === 'ui-ux' && (
                      <button 
                        className="view-full-design-btn"
                        onClick={() => {
                          // Check if it's FINIX Bet project (id: 2 or title contains "Finix")
                          if (selectedProject.id === 2 || selectedProject.title.toLowerCase().includes('finix')) {
                            // Open UIUXFINIX.jpg in fullscreen
                            openFullscreen('/img/UIUX/UIUXFINIX.jpg', `${selectedProject.title} - Full Design`);
                          } else if (selectedProject.demo && selectedProject.demo !== '#') {
                            window.open(selectedProject.demo, '_blank', 'noopener,noreferrer');
                          } else if (selectedProject.behance && selectedProject.behance !== '#') {
                            window.open(selectedProject.behance, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        aria-label="View full design"
                        style={{
                          marginTop: '1rem',
                          padding: '0.75rem 1.5rem',
                          background: 'var(--gradient-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.3s ease',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <i className="fas fa-expand" aria-hidden="true"></i>
                        <span>View Full Design</span>
                      </button>
                    )}
                    {selectedProject.category === 'web' && (
                      <button 
                        className="view-demo-site-btn"
                        onClick={() => {
                          // For Nigus E-commerce and TeleBOT, open in iframe modal
                          if (selectedProject.title === 'Nigus E-commerce' || selectedProject.id === 9) {
                            setDemoProject(selectedProject);
                            setShowDemoModal(true);
                            document.body.style.overflow = 'hidden';
                          } else if (selectedProject.title === 'TeleBOT' || selectedProject.id === 13) {
                            setDemoProject(selectedProject);
                            setShowDemoModal(true);
                            document.body.style.overflow = 'hidden';
                          } else if (selectedProject.demo && selectedProject.demo !== '#') {
                            window.open(selectedProject.demo, '_blank', 'noopener,noreferrer');
                          } else if (selectedProject.github && selectedProject.github !== '#') {
                            window.open(selectedProject.github, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        aria-label="View demo site"
                        style={{
                          marginTop: '1rem',
                          padding: '0.75rem 1.5rem',
                          background: 'var(--gradient-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.3s ease',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                        <span>View Demo Site</span>
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="modal-info">
                <h2>{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.description}</p>
                
                {/* Project Details */}
                <div className="modal-details">
                  {selectedProject.duration && (
                    <div className="detail-item">
                      <i className="fas fa-clock" aria-hidden="true"></i>
                      <div>
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{selectedProject.duration}</span>
                      </div>
                    </div>
                  )}
                  {selectedProject.client && (
                    <div className="detail-item">
                      <i className="fas fa-user-tie" aria-hidden="true"></i>
                      <div>
                        <span className="detail-label">Client</span>
                        <span className="detail-value">{selectedProject.client}</span>
                      </div>
                    </div>
                  )}
                  {selectedProject.teamSize && (
                    <div className="detail-item">
                      <i className="fas fa-users" aria-hidden="true"></i>
                      <div>
                        <span className="detail-label">Team Size</span>
                        <span className="detail-value">{selectedProject.teamSize}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Deliverables */}
                {selectedProject.deliverables && (
                  <div className="modal-deliverables">
                    <h4 className="deliverables-title">
                      <i className="fas fa-box" aria-hidden="true"></i>
                      Deliverables
                    </h4>
                    <div className="deliverables-list">
                      {selectedProject.deliverables.split(' • ').map((deliverable, i) => (
                        <span key={i} className="deliverable-tag">
                          <i className="fas fa-check" aria-hidden="true"></i>
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process Workflow */}
                {selectedProject.process && selectedProject.process.length > 0 && (
                  <div className="modal-process-workflow">
                    <h4 className="workflow-title">
                      <i className="fas fa-sitemap" aria-hidden="true"></i>
                      Process Workflow
                    </h4>
                    <div className="workflow-steps">
                      {selectedProject.process.map((step, index) => (
                        <div key={index} className="workflow-step">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-content">
                            <span className="step-name">{step}</span>
                          </div>
                          {index < selectedProject.process.length - 1 && (
                            <div className="step-connector"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenge & Solution */}
                {(selectedProject.challenge || selectedProject.solution) && (
                  <div className="modal-process">
                    {selectedProject.challenge && (
                      <div className="process-item">
                        <h4 className="process-title">
                          <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                          Challenge
                        </h4>
                        <p>{selectedProject.challenge}</p>
                      </div>
                    )}
                    {selectedProject.solution && (
                      <div className="process-item">
                        <h4 className="process-title">
                          <i className="fas fa-check-circle" aria-hidden="true"></i>
                          Solution
                        </h4>
                        <p>{selectedProject.solution}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics/Results */}
                {selectedProject.metrics && (
                  <div className="modal-metrics">
                    <i className="fas fa-chart-line" aria-hidden="true"></i>
                    <p><strong>Results:</strong> {selectedProject.metrics}</p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="modal-tech">
                  <h4 className="tech-title">Technologies Used</h4>
                  <div className="tech-tags">
                    {selectedProject.tech.split(' • ').map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="modal-links">
                  {selectedProject.demo && selectedProject.demo !== '#' && (
                    <a href={selectedProject.demo} className="modal-link" target="_blank" rel="noopener noreferrer" aria-label={`Open live demo of ${selectedProject.title}`}>
                      <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                      <span>Live Demo</span>
                    </a>
                  )}
                  {(selectedProject.behance && selectedProject.behance !== '#') || (selectedProject.github && selectedProject.github !== '#') ? (
                    <a href={(selectedProject.behance && selectedProject.behance !== '#') ? selectedProject.behance : selectedProject.github} className="modal-link" target="_blank" rel="noopener noreferrer" aria-label={`${(selectedProject.behance && selectedProject.behance !== '#') ? 'Open Behance' : 'Open GitHub'} for ${selectedProject.title}`}>
                      <i className={(selectedProject.behance && selectedProject.behance !== '#') ? "fab fa-behance" : "fab fa-github"} aria-hidden="true"></i>
                      <span>{(selectedProject.behance && selectedProject.behance !== '#') ? "Behance" : "GitHub"}</span>
                    </a>
                  ) : null}
                </div>

                {/* Share Buttons */}
                <div className="modal-share">
                  <h4 className="share-title">Share Project</h4>
                  <div className="share-buttons">
                    {navigator.share && (
                      <button 
                        className="share-btn"
                        onClick={() => handleShare(selectedProject, 'native')}
                        aria-label="Share using native share"
                        title="Native Share"
                      >
                        <i className="fas fa-share-alt" aria-hidden="true"></i>
                      </button>
                    )}
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'copy')}
                      aria-label="Copy link to clipboard"
                      title="Copy Link"
                    >
                      <i className="fas fa-link" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'twitter')}
                      aria-label="Share on Twitter"
                      title="Twitter"
                    >
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'facebook')}
                      aria-label="Share on Facebook"
                      title="Facebook"
                    >
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'linkedin')}
                      aria-label="Share on LinkedIn"
                      title="LinkedIn"
                    >
                      <i className="fab fa-linkedin" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'whatsapp')}
                      aria-label="Share on WhatsApp"
                      title="WhatsApp"
                    >
                      <i className="fab fa-whatsapp" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'telegram')}
                      aria-label="Share on Telegram"
                      title="Telegram"
                    >
                      <i className="fab fa-telegram" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>

                {/* Navigation Hint */}
                <div className="modal-navigation-hint">
                  <p><i className="fas fa-info-circle" aria-hidden="true"></i> Use <kbd>←</kbd> <kbd>→</kbd> arrow keys to navigate • <kbd>ESC</kbd> to close</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Popout Modal */}
      {selectedGalleryImage && selectedProject && (
        <div id="imagePopout" className="modal image-popout-modal" onClick={closeImagePopout}>
          <div className="modal-content image-popout-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeImagePopout} aria-label="Close image" role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && closeImagePopout()}>&times;</span>
            <div className="modal-body">
              <div className="modal-image">
                <img
                  src={selectedGalleryImage.image}
                  alt={selectedGalleryImage.title}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  decoding="async"
                  width={getIntrinsicSize(selectedGalleryImage.image).width}
                  height={getIntrinsicSize(selectedGalleryImage.image).height}
                  className="modal-image-img"
                />
                <div className="modal-badge">
                  {selectedProject.featured && <span className="featured-badge">Featured</span>}
                  <span className="category-badge">{formatCategory(selectedProject.category)}</span>
                </div>
                <button
                  className="fullscreen-btn"
                  onClick={openFullscreen}
                  aria-label="Open image in fullscreen"
                  title="Fullscreen"
                >
                  <i className="fas fa-expand" aria-hidden="true"></i>
                </button>
              </div>
              <div className="modal-info">
                <h2>{selectedGalleryImage.title}</h2>
                <p className="modal-description">{selectedProject.description}</p>
                
                {/* Project Details */}
                <div className="modal-details">
                  {selectedProject.duration && (
                    <div className="detail-item">
                      <i className="fas fa-clock" aria-hidden="true"></i>
                      <div>
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{selectedProject.duration}</span>
                      </div>
                    </div>
                  )}
                  {selectedProject.client && (
                    <div className="detail-item">
                      <i className="fas fa-user-tie" aria-hidden="true"></i>
                      <div>
                        <span className="detail-label">Client</span>
                        <span className="detail-value">{selectedProject.client}</span>
                      </div>
                    </div>
                  )}
                  {selectedProject.teamSize && (
                    <div className="detail-item">
                      <i className="fas fa-users" aria-hidden="true"></i>
                      <div>
                        <span className="detail-label">Team Size</span>
                        <span className="detail-value">{selectedProject.teamSize}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Deliverables */}
                {selectedProject.deliverables && (
                  <div className="modal-deliverables">
                    <h4 className="deliverables-title">
                      <i className="fas fa-box" aria-hidden="true"></i>
                      Deliverables
                    </h4>
                    <div className="deliverables-list">
                      {selectedProject.deliverables.split(' • ').map((deliverable, i) => (
                        <span key={i} className="deliverable-tag">
                          <i className="fas fa-check" aria-hidden="true"></i>
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process Workflow */}
                {selectedProject.process && selectedProject.process.length > 0 && (
                  <div className="modal-process-workflow">
                    <h4 className="workflow-title">
                      <i className="fas fa-sitemap" aria-hidden="true"></i>
                      Process Workflow
                    </h4>
                    <div className="workflow-steps">
                      {selectedProject.process.map((step, index) => (
                        <div key={index} className="workflow-step">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-content">
                            <span className="step-name">{step}</span>
                          </div>
                          {index < selectedProject.process.length - 1 && (
                            <div className="step-connector"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenge & Solution */}
                {(selectedProject.challenge || selectedProject.solution) && (
                  <div className="modal-process">
                    {selectedProject.challenge && (
                      <div className="process-item">
                        <h4 className="process-title">
                          <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                          Challenge
                        </h4>
                        <p>{selectedProject.challenge}</p>
                      </div>
                    )}
                    {selectedProject.solution && (
                      <div className="process-item">
                        <h4 className="process-title">
                          <i className="fas fa-check-circle" aria-hidden="true"></i>
                          Solution
                        </h4>
                        <p>{selectedProject.solution}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics/Results */}
                {selectedProject.metrics && (
                  <div className="modal-metrics">
                    <i className="fas fa-chart-line" aria-hidden="true"></i>
                    <p><strong>Results:</strong> {selectedProject.metrics}</p>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="modal-tech">
                  <h4 className="tech-title">Technologies Used</h4>
                  <div className="tech-tags">
                    {selectedProject.tech.split(' • ').map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="modal-links">
                  {selectedProject.demo && selectedProject.demo !== '#' && (
                    <a href={selectedProject.demo} className="modal-link" target="_blank" rel="noopener noreferrer" aria-label={`Open live demo of ${selectedProject.title}`}>
                      <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                      <span>Live Demo</span>
                    </a>
                  )}
                  {(selectedProject.behance && selectedProject.behance !== '#') || (selectedProject.github && selectedProject.github !== '#') ? (
                    <a href={(selectedProject.behance && selectedProject.behance !== '#') ? selectedProject.behance : selectedProject.github} className="modal-link" target="_blank" rel="noopener noreferrer" aria-label={`${(selectedProject.behance && selectedProject.behance !== '#') ? 'Open Behance' : 'Open GitHub'} for ${selectedProject.title}`}>
                      <i className={(selectedProject.behance && selectedProject.behance !== '#') ? "fab fa-behance" : "fab fa-github"} aria-hidden="true"></i>
                      <span>{(selectedProject.behance && selectedProject.behance !== '#') ? "Behance" : "GitHub"}</span>
                    </a>
                  ) : null}
                </div>

                {/* Share Buttons */}
                <div className="modal-share">
                  <h4 className="share-title">Share Project</h4>
                  <div className="share-buttons">
                    {navigator.share && (
                      <button 
                        className="share-btn"
                        onClick={() => handleShare(selectedProject, 'native')}
                        aria-label="Share using native share"
                        title="Native Share"
                      >
                        <i className="fas fa-share-alt" aria-hidden="true"></i>
                      </button>
                    )}
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'copy')}
                      aria-label="Copy link to clipboard"
                      title="Copy Link"
                    >
                      <i className="fas fa-link" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'twitter')}
                      aria-label="Share on Twitter"
                      title="Twitter"
                    >
                      <i className="fab fa-twitter" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'facebook')}
                      aria-label="Share on Facebook"
                      title="Facebook"
                    >
                      <i className="fab fa-facebook" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'linkedin')}
                      aria-label="Share on LinkedIn"
                      title="LinkedIn"
                    >
                      <i className="fab fa-linkedin" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'whatsapp')}
                      aria-label="Share on WhatsApp"
                      title="WhatsApp"
                    >
                      <i className="fab fa-whatsapp" aria-hidden="true"></i>
                    </button>
                    <button 
                      className="share-btn"
                      onClick={() => handleShare(selectedProject, 'telegram')}
                      aria-label="Share on Telegram"
                      title="Telegram"
                    >
                      <i className="fab fa-telegram" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>

                {/* Navigation Hint */}
                <div className="modal-navigation-hint">
                  <p><i className="fas fa-info-circle" aria-hidden="true"></i> Use <kbd>←</kbd> <kbd>→</kbd> arrow keys to navigate • <kbd>ESC</kbd> to close</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal for Nigus E-commerce */}
      {showDemoModal && demoProject && (
        <div className={`demo-modal-overlay ${showDemoModal ? 'active' : ''}`} onClick={() => {
          setShowDemoModal(false);
          setDemoProject(null);
          document.body.style.overflow = '';
        }}>
          <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="demo-modal-header">
              <h2>{demoProject.title}</h2>
              <button 
                className="demo-modal-close" 
                onClick={() => {
                  setShowDemoModal(false);
                  setDemoProject(null);
                  document.body.style.overflow = '';
                }}
                aria-label="Close demo"
                title="Close (ESC)"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div className="demo-modal-iframe-container">
              {demoProject.title === 'Nigus E-commerce' || demoProject.id === 9 ? (
                <NigusEcommerce />
              ) : demoProject.title === 'TeleBOT' || demoProject.id === 13 ? (
                <TeleBOT />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
