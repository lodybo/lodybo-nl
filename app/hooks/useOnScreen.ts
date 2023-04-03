import type { MutableRefObject } from 'react';
import { useEffect, useState } from 'react';

export function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = '0px',
  root: MutableRefObject<Element> | null = null,
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  const rootEl = root?.current || null;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
        console.log({ entry, observer });
      },
      {
        rootMargin,
        root: rootEl,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
