import type { ReactNode } from 'react';

type Props = {
  /**
   * The contents of the section.
   */
  children: ReactNode;

  /**
   * Additional class names to apply to the section.
   */
  className?: string;
};

export default function MainSection({ children, className = '' }: Props) {
  return (
    <section
      className={`px-5 md:px-10 xl:px-40 mx-auto flex flex-col ${className}`}
    >
      {children}
    </section>
  );
}
