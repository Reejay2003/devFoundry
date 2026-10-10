'use client';

import { useEffect } from 'react';

function countUp(el: HTMLElement) {
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE) return;
  const orig = node.nodeValue || '';
  const nums = orig.match(/\d+(\.\d+)?/g);
  if (!nums) return;
  const t0 = performance.now();
  const dur = 1400;
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    let k = 0;
    node.nodeValue = orig.replace(/\d+(\.\d+)?/g, (m) => {
      const dec = (m.split('.')[1] || '').length;
      return (parseFloat(nums[k++]) * e).toFixed(dec);
    });
    if (p < 1) requestAnimationFrame(step);
    else node.nodeValue = orig;
  };
  requestAnimationFrame(step);
}

/** Scroll reveals, count-up numbers and the cursor spotlight on `.spot` cards. Mount once per page. */
export default function RevealController() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | null = null;

    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
    } else {
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const t = e.target as HTMLElement;
            t.classList.add('in');
            t.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
            obs.unobserve(t);
          }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
      );
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in');
        else obs.observe(el);
      });
      io = obs;
    }

    const onMove = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.('.spot') as HTMLElement | null;
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty('--mx', `${e.clientX - r.left}px`);
      t.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove);

    return () => {
      document.removeEventListener('pointermove', onMove);
      io?.disconnect();
    };
  }, []);

  return null;
}
