import React from 'react';
import { useParallaxEffect } from '~/hooks/useParallaxEffect';
import type { ImageProps } from '~/components/Image';
import { Image } from '~/components/Image';
import { useAnimationMode } from '~/hooks/useAnimationMode';

type Props = Pick<ImageProps, 'srcSet' | 'sizes'> & {
  /**
   * The image's source.
   */
  src: string;

  /**
   * The image's alt text.
   */
  alt: string;
};

export default function ParallaxImage({ src, alt, srcSet, sizes }: Props) {
  const [animationIsEnabled] = useAnimationMode();
  const { ref: parallaxRef } = useParallaxEffect({
    threshold: 0.5,
    speed: 0.5,
  });
  let ref: any;

  if (animationIsEnabled) {
    ref = parallaxRef;
  }

  return (
    <Image
      className="object-cover w-full h-full"
      alt={alt}
      ref={ref}
      loading="lazy"
      src={src}
      srcSet={srcSet}
      sizes={sizes}
    />
  );
}
