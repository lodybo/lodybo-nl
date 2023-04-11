import { useState, useRef, useEffect } from 'react';

type Options = {
  /**
   * The threshold at which the element should be considered visible.
   */
  threshold?: number;

  /**
   * The speed at which the element should move.
   */
  speed?: number;
};

export const useParallaxEffect = ({ threshold = 0, speed = 1 }: Options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const [maxYPos, setMaxYPos] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          const rect = entry.target.getBoundingClientRect();
          const imageHeight = rect.height;
          const viewportHeight = window.innerHeight;
          const max = imageHeight - viewportHeight;
          setMaxYPos(max);
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && isVisible) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const yPos =
          ((rect.top + rect.height) / viewportHeight - 1) * maxYPos * speed;
        ref.current.style.objectPosition = `50% -${yPos}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, maxYPos, speed]);

  return { ref };
};
