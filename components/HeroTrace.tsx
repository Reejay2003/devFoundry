'use client';

import { heroTrace } from '@/lib/data';
import { useLoop } from '@/lib/hooks';

export default function HeroTrace() {
  const g = useLoop(28);
  return (
    <div className="trace-wrap">
      <div className="trace-ring" />
      <div className="trace" aria-label="Example trace of an AI request">
        <div className="trace-head">
          <span className="live-dot" />
          <span style={{ color: 'var(--cream)' }}>trace · support-agent</span>
          <span className="tag-out">example</span>
        </div>
        <div className="trace-rows">
          {heroTrace.map((r, i) => {
            const on = g >= 1 + i * 2.2;
            return (
              <div key={r.k} className="trace-row" style={{ opacity: on ? 1 : 0.18, transform: `translateX(${on ? 0 : -6}px)` }}>
                <span className="k">{r.k}</span>
                <span className="t">{r.t}</span>
                <span className="v">{r.v}</span>
              </div>
            );
          })}
        </div>
        <div className="trace-foot">
          <div>
            <span className="lbl">cost per task</span>
            <span className="num">
              <span className="strike">$0.041</span> $0.016
            </span>
          </div>
          <div>
            <span className="lbl">eval gate</span>
            <span className="num" style={{ color: 'var(--mint)' }}>{g >= 14 ? 'passed' : 'running'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
