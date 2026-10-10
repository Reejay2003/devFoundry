'use client';

import { RefObject, useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const f = () => setReduced(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return reduced;
}

export function useInView(ref: RefObject<Element | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

/** A counter that loops 0..period-1 every `ms`. Returns a large value when motion is reduced (everything shown). */
export function useLoop(period: number, ms = 320) {
  const reduced = useReducedMotion();
  const [g, setG] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (!document.hidden) setG((x) => (x + 1) % period);
    }, ms);
    return () => clearInterval(id);
  }, [period, ms, reduced]);
  return reduced ? 99 : g;
}
