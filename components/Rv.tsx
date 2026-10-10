import type { CSSProperties, ReactNode } from 'react';

/** Scroll-reveal wrapper. RevealController adds `.in` when it enters the viewport. */
export default function Rv({ delay = 0, className = '', children }: { delay?: number; className?: string; children: ReactNode }) {
  return (
    <div data-reveal="" className={`rv ${className}`} style={{ '--d': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
