import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scrolls the window to the very top left corner
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every single time the URL path changes

  return null; // This component doesn't render any visual UI elements
};

export default ScrollToTop;
