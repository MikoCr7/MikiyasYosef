import { useEffect } from 'react';

const ContentProtection = () => {
  useEffect(() => {
    // Disable right-click context menu
    const disableRightClick = (e) => {
      if (e.button === 2 || e.button === 3) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Disable keyboard shortcuts
    const disableShortcuts = (e) => {
      // Disable Ctrl+S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
      // Disable F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      // Disable Ctrl+Shift+U (Unicode)
      if (e.ctrlKey && e.shiftKey && e.key === 'U') {
        e.preventDefault();
        return false;
      }
      // Disable Print Screen
      if (e.key === 'PrintScreen' || (e.shiftKey && e.key === 'F13')) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text and image selection
    const disableSelection = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // Disable image dragging
    const disableDrag = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // Disable copy
    const disableCopy = (e) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        return false;
      }
    };

    // Disable context menu
    const disableContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('dragstart', disableDrag);
    document.addEventListener('copy', disableCopy);
    document.addEventListener('keydown', disableShortcuts);
    document.addEventListener('mousedown', disableRightClick);

    // Disable print dialog
    const disablePrint = (e) => {
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.addEventListener('beforeprint', (e) => e.preventDefault());
        return false;
      }
    };
    window.addEventListener('beforeprint', (e) => e.preventDefault());

    // Prevent opening DevTools - less aggressive approach
    let devtools = { open: false };
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      if (widthThreshold || heightThreshold) {
        if (!devtools.open) {
          devtools.open = true;
          // Show warning instead of breaking the site
          console.clear();
          console.log('%c⚠️ Access Denied', 'color: #ff6b6b; font-size: 24px; font-weight: bold;');
          console.log('%cDeveloper tools are not allowed on this site.', 'color: #fff; font-size: 14px;');
        }
      } else {
        devtools.open = false;
      }
    };
    const devToolsInterval = setInterval(detectDevTools, 500);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('dragstart', disableDrag);
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('keydown', disableShortcuts);
      document.removeEventListener('mousedown', disableRightClick);
      if (devToolsInterval) clearInterval(devToolsInterval);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ContentProtection;

