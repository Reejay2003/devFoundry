export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function Check({ size = 15, color = 'currentColor', weight = 3 }: { size?: number; color?: string; weight?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={weight} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Close({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function Quote() {
  return (
    <svg width={30} height={23} viewBox="0 0 34 26" fill="#2f6b4f" aria-hidden="true">
      <path d="M0 26V15.6C0 6.9 4.6 1.7 13.2 0l1.6 3.6C9.9 5 7.6 7.8 7.3 12H14v14H0Zm19 0V15.6C19 6.9 23.6 1.7 32.2 0l1.6 3.6C28.9 5 26.6 7.8 26.3 12H33v14H19Z" />
    </svg>
  );
}
