import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ isLoading }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show message after a short delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 300);

    // Animate progress over 3 seconds
    let progressInterval;
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (progressInterval) {
            clearInterval(progressInterval);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearTimeout(messageTimer);
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setFadeOut(false);
        }, 500);
      }, 200);
    }
  }, [isLoading]);

  if (!isLoading && !fadeOut) return null;

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-background">
        <div className="loading-particle"></div>
        <div className="loading-particle"></div>
        <div className="loading-particle"></div>
        <div className="loading-particle"></div>
      </div>
      <div className="loading-content">
        <div className="loading-logo">
          <div className="logo-spinner">
            <div className="logo-inner"></div>
          </div>
        </div>
        <div className="loading-text">
          <h2 className="loading-title">Mikiyas Yosef</h2>
          <p className="loading-subtitle">Creative Designer & Video Editor</p>
        </div>
        <div className={`loading-message ${showMessage ? 'visible' : ''}`}>
          <i className="fas fa-desktop" aria-hidden="true"></i>
          <span>For Best Experience, View on Desktop</span>
        </div>
        <div className="loading-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

