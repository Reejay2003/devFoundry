'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CALENDLY } from '@/lib/data';

export default function SiteHeader({ page }: { page: 'home' | 'work' }) {
  const [open, setOpen] = useState(false);
  const p = page === 'home' ? '' : '/';
  const links = [
    { label: 'Capabilities', href: `${p}#capabilities` },
    { label: 'Engagements', href: `${p}#engagements` },
    { label: 'Clients', href: `${p}#clients` },
    { label: 'Work', href: '/work' },
  ];

  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Main">
        <Link href={page === 'home' ? '#top' : '/'} className="brand">
          <span className="brand-mark">DF</span>
          <span className="brand-name">Dev Foundry</span>
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.label} href={l.href} aria-current={page === 'work' && l.href === '/work' ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
        </div>
        <a className="btn btn-cream btn-sm nav-cta" href={CALENDLY} target="_blank" rel="noopener noreferrer">
          Book a call
        </a>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
            <path d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="container mobile-menu">
          {links.map((l) => (
            <Link key={l.label} className="m-link" href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a className="btn btn-cream" href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
        </div>
      )}
    </header>
  );
}
