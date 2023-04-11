import React from 'react';
import { useParallaxEffect } from '~/hooks/useParallaxEffect';
import type { ImageProps } from '~/components/Image';
import { Image } from '~/components/Image';

type Props = Pick<ImageProps, 'imageSizes'> & {
  /**
   * The image's source.
   */
  src: string;

  /**
   * The image's alt text.
   */
  alt: string;
};

export default function ParallaxImage({ src, alt, imageSizes }: Props) {
  const { ref } = useParallaxEffect({ threshold: 0.5, speed: 0.5 });

  return (
    <Image
      className="object-cover w-full h-full"
      alt={alt}
      ref={ref}
      loading="lazy"
      src={src}
      imageSizes={imageSizes}
    />
  );
}
