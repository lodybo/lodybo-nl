import { forwardRef, Ref } from 'react';
import type { ComponentPropsWithRef } from 'react';
import type { FitEnum } from 'sharp';

// Inspired by https://github.com/remix-run/examples/blob/main/image-resize/app/components/image.tsx

export type ImageSizes = Record<string, MediaQueryMatcher>;
type MediaQueryMatcher = Record<string, number>;

interface BaseImageProps extends ComponentPropsWithRef<'img'> {
  /**
   * A path within the assets/images directory, can be a nested path.
   */
  src: string;

  /**
   * The alt text for the image.
   */
  alt: string;
}

interface SingleSrcImageProps extends BaseImageProps {
  /**
   * The width of the image.
   * At least width or height should be passed.
   */
  width?: number;
  /**
   * The height of the image.
   * At least width or height should be passed.
   */
  height?: number;

  /**
   * The unit of the width and height.
   * Defaults to pixels.
   */
  unit?: 'px' | 'rem';

  /**
   * The fit of the image.
   * Defaults to 'contain'.
   */
  fit?: keyof FitEnum;

  imageSizes?: never;
}

interface SrcSetImageProps extends BaseImageProps {
  /**
   * The sizes of the image.
   */
  imageSizes: ImageSizes;
}

export type ImageProps = SingleSrcImageProps | SrcSetImageProps;

export const Image = forwardRef<
  HTMLImageElement | HTMLSourceElement,
  ImageProps
>(({ src, alt, imageSizes, ...props }, forwardedRef) => {
  if (imageSizes) {
    return (
      <picture>
        {Object.entries(imageSizes).map(([mediaQuery, matchers]) => (
          <ImageSources
            ref={forwardedRef as Ref<HTMLSourceElement>}
            key={`${src}@${mediaQuery}}`}
            src={src}
            mediaQuery={mediaQuery}
            matchers={matchers}
          />
        ))}

        <img alt={alt} src={src} {...props} />
      </picture>
    );
  }

  const { width, height, unit = 'px', fit } = props as SingleSrcImageProps;
  const query = new URLSearchParams();

  let unitMultiplier = 1;
  if (unit === 'rem') {
    unitMultiplier = parseFloat(
      typeof document === 'undefined'
        ? '16'
        : getComputedStyle(document.documentElement).fontSize,
    );
  }

  if (width) {
    const w = width * unitMultiplier;
    query.set('w', w.toString());
  }
  if (height) {
    const h = height * unitMultiplier;
    query.set('h', h.toString());
  }
  if (fit) {
    query.set('fit', fit);
  }
  return (
    <img
      ref={forwardedRef as Ref<HTMLImageElement>}
      alt={alt}
      src={`/image/${src}?${query.toString()}`}
      {...{ width, height, ...props }}
    />
  );
});

Image.displayName = 'Image';

function ImageSources({
  ref,
  src,
  mediaQuery,
  matchers,
}: {
  ref: Ref<HTMLSourceElement>;
  src: string;
  mediaQuery: string;
  matchers: MediaQueryMatcher;
}) {
  const set: string = Object.keys(matchers)
    .map((dpi) => {
      const width = matchers[dpi];
      return `${src}?w=${width} ${dpi}`;
    })
    .join(', ');

  return (
    <source
      ref={ref}
      key={mediaQuery}
      srcSet={set}
      media={mediaQuery || undefined}
    />
  );
}
