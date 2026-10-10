'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { steps } from '@/lib/data';
import { useInView, useReducedMotion } from '@/lib/hooks';

const T = 16;
const pad = (n: number) => String(n).padStart(2, '0');
const mono: CSSProperties = { fontFamily: 'var(--font-mono), monospace' };
const checkSvg = (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Process() {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, 0.2);
  const reduced = useReducedMotion();
  const [s, setS] = useState({ st: 0, tk: 0 });

  useEffect(() => {
    if (reduced || !visible) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setS((p) => (p.tk + 1 >= T ? { st: (p.st + 1) % 4, tk: 0 } : { st: p.st, tk: p.tk + 1 }));
    }, 320);
    return () => clearInterval(id);
  }, [reduced, visible]);

  const st = s.st;
  const tk = reduced ? T : s.tk;
  const on = (i: number, k: number) => st === i && tk >= k;
  const scene = (i: number): CSSProperties => ({ opacity: st === i ? 1 : 0, transform: `translateY(${st === i ? 0 : 14}px)` });
  const item = (i: number, k: number): CSSProperties => ({ opacity: on(i, k) ? 1 : 0, transform: `translateY(${on(i, k) ? 0 : 8}px)`, transition: 'opacity .4s, transform .4s' });

  const secs = 4 + tk * 37;
  const wave = Array.from({ length: 14 }, (_, i) =>
    st === 0 && !reduced ? 6 + Math.round(Math.abs(Math.sin(tk * 1.3 + i * 0.8) * Math.cos(i * 0.5 + tk * 0.45)) * 34) : 6 + (i % 3) * 6,
  );
  const notes = ['Product goals', 'What you’ve promised investors', 'Current AI costs and quality', 'Existing code and data'];
  const miles = [
    { id: 'M1', name: 'Eval set & baseline', wk: 'Week 1' },
    { id: 'M2', name: 'Harness & cost controls', wk: 'Week 4' },
    { id: 'M3', name: 'Launch & handover', wk: 'Week 8' },
  ];
  const barH = [22, 30, 38, 47, 58, 66, 78, 92];
  const barOn = barH.map((_, i) => on(2, 1 + Math.round(i * 1.7)));
  const shown = barOn.lastIndexOf(true) + 1;
  const p2 = st === 2 ? Math.min(1, tk / (T - 3)) : 1;
  const term = [
    { p: '$', t: 'git push origin main' },
    { p: '✓', t: 'tests passed (214)' },
    { p: '✓', t: 'eval gate: groundedness 0.91' },
    { p: '✓', t: 'deployed to your-cloud/prod' },
    { p: '✓', t: 'docs + walkthrough shared' },
  ];
  const liveOn = on(3, 12);

  return (
    <div className="proc-grid" ref={root}>
      <div className="steps" role="tablist" aria-label="Delivery steps">
        {steps.map((step, i) => {
          const active = st === i;
          const pct = active ? Math.round(Math.min(1, tk / (T - 1)) * 100) : i < st ? 100 : 0;
          return (
            <button key={step.title} role="tab" aria-selected={active} className={`step${active ? ' on' : ''}`} onClick={() => setS({ st: i, tk: 0 })}>
              <div className="step-row">
                <span className="step-num">{pad(i + 1)}</span>
                <span className="step-title">{step.title}</span>
                <span className="step-when">{step.when}</span>
              </div>
              <span className="step-text">{step.text}</span>
              <div className="step-bar">
                <i style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="card stage" aria-hidden="true">
        <div className="stage-dots" />

        <div className="scene" style={scene(0)}>
          <div style={{ ...mono, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--dim)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f07167' }} />
            Scoping call
            <span style={{ marginLeft: 'auto', color: 'var(--cream)' }}>{`${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 10 }}>
            <div style={{ height: 118, borderRadius: 14, background: 'var(--panel)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--cream)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>You</span>
              <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>Founder</span>
            </div>
            <div style={{ height: 118, borderRadius: 14, background: 'var(--panel)', border: '1px solid var(--line3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 46 }}>
                {wave.map((h, i) => (
                  <span key={i} style={{ width: 3, height: h, borderRadius: 2, background: 'var(--mint)', transition: 'height .28s ease' }} />
                ))}
              </div>
              <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>Dev Foundry engineers</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, borderRadius: 14, background: 'rgba(4,14,10,.6)', border: '1px solid var(--line)' }}>
            <span style={{ ...mono, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>Notes</span>
            {notes.map((n, i) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text)', ...item(0, 3 + i * 3) }}>
                <span style={{ width: 16, height: 16, flex: 'none', borderRadius: '50%', background: 'var(--mint)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{checkSvg}</span>
                {n}
              </div>
            ))}
          </div>
        </div>

        <div className="scene" style={scene(1)}>
          <div className="cream" style={{ borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 14, boxShadow: '0 30px 60px -30px rgba(0,0,0,.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em' }}>Proposal · v1</span>
              <span style={{ ...mono, fontSize: 11, padding: '4px 9px', borderRadius: 999, background: 'var(--ink2)', color: 'var(--mint)', opacity: on(1, 13) ? 1 : 0, transition: 'opacity .4s' }}>sent 41h after call</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[88, 72, 94, 56].map((w, i) => (
                <div key={i} style={{ height: 7, borderRadius: 4, background: '#d9d0b8' }}>
                  <div style={{ height: '100%', width: `${on(1, 1 + i) ? w : 0}%`, borderRadius: 4, background: '#8a7f68', transition: 'width .6s ease' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 6 }}>
              {miles.map((m, i) => {
                const o = on(1, 6 + i * 2);
                return (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: '#f8f4ea', opacity: o ? 1 : 0, transform: `translateX(${o ? 0 : 16}px)`, transition: 'opacity .4s, transform .4s' }}>
                    <span style={{ ...mono, fontSize: 12, color: 'var(--green-ink)' }}>{m.id}</span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</span>
                    <span style={{ ...mono, marginLeft: 'auto', fontSize: 12, color: '#5b6a61' }}>{m.wk}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="scene" style={scene(2)}>
          <div style={{ ...mono, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--dim)' }}>
            <span style={{ color: 'var(--cream)' }}>week {Math.max(1, shown)} demo</span>
            <span style={{ marginLeft: 'auto' }}>staging.yourapp.dev</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 190, padding: 16, borderRadius: 14, background: 'rgba(4,14,10,.6)', border: '1px solid var(--line)' }}>
            {barH.map((h, i) => (
              <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', height: `${barOn[i] ? h : 4}%`, borderRadius: 5, background: i === shown - 1 ? 'linear-gradient(180deg,#c8f3d6,#5fbf8a)' : barOn[i] ? '#2f6b4f' : 'var(--line)', transition: 'height .5s cubic-bezier(.2,.8,.2,1), background .3s' }} />
                <span style={{ ...mono, fontSize: 10.5, color: 'var(--dim)' }}>W{i + 1}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 10 }}>
            <div style={{ padding: 16, borderRadius: 14, background: 'var(--panel)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>Groundedness</span>
              <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--mint)' }}>{(0.62 + 0.29 * p2).toFixed(2)}</span>
            </div>
            <div style={{ padding: 16, borderRadius: 14, background: 'var(--panel)', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12.5, color: 'var(--dim)' }}>Cost per task</span>
              <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--cream)' }}>${(0.041 - 0.025 * p2).toFixed(3)}</span>
            </div>
          </div>
        </div>

        <div className="scene" style={scene(3)}>
          <div style={{ borderRadius: 14, background: '#040d09', border: '1px solid var(--line)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 14px', borderBottom: '1px solid #12261c' }}>
              {[0, 1, 2].map((d) => (
                <span key={d} style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--line2)' }} />
              ))}
              <span style={{ ...mono, marginLeft: 8, fontSize: 11.5, color: 'var(--dim)' }}>deploy · production</span>
            </div>
            <div style={{ ...mono, padding: 18, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, minHeight: 200 }}>
              {term.map((l, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, ...item(3, 1 + i * 2), transition: 'opacity .35s, transform .35s' }}>
                  <span style={{ color: l.p === '$' ? 'var(--dim)' : 'var(--mint)' }}>{l.p}</span>
                  <span style={{ color: '#d6e2da' }}>{l.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 14, background: 'var(--cream)', color: 'var(--ink)', opacity: liveOn ? 1 : 0, transform: `scale(${liveOn ? 1 : 0.94})`, transition: 'opacity .4s, transform .4s cubic-bezier(.2,.8,.2,1.2)' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--green-ink)' }} />
            <span style={{ fontWeight: 800, fontSize: 15.5 }}>Live in production</span>
            <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: 'var(--cream-text)' }}>Repo, cloud and docs are yours</span>
          </div>
        </div>
      </div>
    </div>
  );
}
