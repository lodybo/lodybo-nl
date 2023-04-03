import type { MutableRefObject } from 'react';
import { useState, useEffect } from 'react';

// Note, I asked ChatGPT to generate this code for me.
export function useIsColliding<F extends Element, M extends Element>(
  fixedElementRef: MutableRefObject<F>,
  movingElementRef: MutableRefObject<M>,
) {
  const [isColliding, setIsColliding] = useState(false);

  useEffect(() => {
    const checkCollisions = () => {
      const fixedRect = fixedElementRef.current.getBoundingClientRect();
      const movingRect = movingElementRef.current.getBoundingClientRect();

      if (
        fixedRect.left < movingRect.right &&
        fixedRect.right > movingRect.left &&
        fixedRect.top < movingRect.bottom &&
        fixedRect.bottom > movingRect.top
      ) {
        // The elements are colliding
        setIsColliding(true);
      } else {
        setIsColliding(false);
      }

      requestAnimationFrame(checkCollisions);
    };

    checkCollisions();

    return () => {
      cancelAnimationFrame(requestAnimationFrame(checkCollisions));
    };
  }, [fixedElementRef, movingElementRef]);

  return isColliding;
}
