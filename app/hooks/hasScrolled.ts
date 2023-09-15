import { useEffect, useState } from 'react';

// Create a hook that returns a boolean value indicating whether the user has scrolled more than 100px
export const useHasScrolled = (threshold = 200) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setHasScrolled(offset > threshold);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return [hasScrolled];
};
