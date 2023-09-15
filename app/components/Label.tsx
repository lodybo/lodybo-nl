import type { ReactNode } from 'react';

type LabelProps = {
  children: ReactNode;
  className?: string;
};

export default function Label({ children, className = '' }: LabelProps) {
  return (
    <label className={`flex-1 flex flex-col gap-2 ${className}`}>
      {children}
    </label>
  );
}
