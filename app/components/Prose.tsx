import type { ReactNode } from 'react';

type Props = {
  /**
   * Whether the component is used to "prose" a Post.
   */
  isPost?: boolean;

  /**
   * The content to be "prosed".
   */
  children: ReactNode;
};

export default function Prose({ isPost, children }: Props) {
  return (
    <div
      className={`
        prose
        prose-sm
        sm:prose-base
        md:prose-lg
        xl:prose-2xl
        prose-nord
        dark:prose-invert
        prose-a:no-underline
        prose-a:border-b-2
        prose-a:pb-1
        prose-a:border-b-nord-frost-1-400
        prose-a:transition-all
        hover:prose-a:border-b-nord-frost-1-600
        ${
          isPost ? 'leading-loose max-w-5xl w-full mx-auto px-4 sm:px-10' : ''
        }`}
    >
      {children}
    </div>
  );
}
