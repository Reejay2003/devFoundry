'use client';

import { harnessLog } from '@/lib/data';
import { useLoop } from '@/lib/hooks';

export default function HarnessLog() {
  const g = useLoop(28);
  return (
    <div className="hlog" aria-hidden="true">
      {harnessLog.map((h, i) => {
        const on = g >= 2 + i * 3;
        return (
          <div key={i} style={{ opacity: on ? 1 : 0.15, transform: `translateY(${on ? 0 : 4}px)` }}>
            <span style={{ color: h.c }}>{h.k}</span>
            <span className="t">{h.t}</span>
          </div>
        );
      })}
    </div>
  );
}
