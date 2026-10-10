'use client';

import { useEffect, useState } from 'react';
import { CALENDLY, appProjects, enterpriseProjects, webProjects, type Project } from '@/lib/data';
import Rv from './Rv';
import { Close } from './icons';

const pad = (n: number) => String(n).padStart(2, '0');
const meta = (p: Project) => (p.place ? `${p.client} · ${p.place}` : p.client);

function ExtLinks({ p }: { p: Project }) {
  return (
    <>
      {(p.links || []).map((l) => (
        <a key={l.href} className="ext" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label} ↗
        </a>
      ))}
    </>
  );
}

function Drawer({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <div className="drawer-root">
      <div className="drawer-bg" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={p.title}>
        <div className="drawer-top">
          <span className="meta">{meta(p)}</span>
          <button className="close" aria-label="Close" onClick={onClose} autoFocus>
            <Close />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="kind">{p.kind}</span>
          <h3>{p.title}</h3>
          <p className="sum">{p.summary}</p>
        </div>
        {p.img && (
          <div className="drawer-img" style={{ background: p.tint || 'var(--panel)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.title} />
          </div>
        )}
        {p.metrics && p.metrics.length > 0 && (
          <div className="drawer-metrics">
            {p.metrics.map((m) => (
              <div key={m.l}>
                <b>{m.v}</b>
                <span>{m.l}</span>
              </div>
            ))}
          </div>
        )}
        <div className="blk">
          <span className="lbl">The brief</span>
          <p>{p.brief}</p>
        </div>
        <div className="blk">
          <span className="lbl">What we built</span>
          <p>{p.built}</p>
        </div>
        {p.stack && p.stack.length > 0 && (
          <div className="blk">
            <span className="lbl">Stack</span>
            <div className="stack">
              {p.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        )}
        <div className="links" style={{ marginTop: 0 }}>
          <a className="btn btn-cream btn-sm" href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Discuss a similar project
          </a>
          <ExtLinks p={p} />
        </div>
      </aside>
    </div>
  );
}

export default function WorkGrid() {
  const [sel, setSel] = useState<Project | null>(null);

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSel(null); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [sel]);

  return (
    <>
      <section id="enterprise" className="container group">
        <div className="group-head" data-reveal="">
          <h2>Enterprise AI</h2>
          <span className="count">{pad(enterpriseProjects.length)}</span>
        </div>
        <div className="ent-grid">
          {enterpriseProjects.map((p, i) => (
            <Rv key={p.id} delay={i * 100}>
              <button className="ent spot" onClick={() => setSel(p)}>
                <span className="meta">{p.client} · {p.kind}</span>
                <span className="title">{p.title}</span>
                <span className="sum">{p.summary}</span>
                <div className="metrics">
                  {(p.metrics || []).map((m) => (
                    <div className="metric" key={m.l}>
                      <b>{m.v}</b>
                      <span>{m.l}</span>
                    </div>
                  ))}
                </div>
              </button>
            </Rv>
          ))}
        </div>
      </section>

      <section id="apps" className="container group">
        <div className="group-head" data-reveal="">
          <h2>Mobile apps</h2>
          <span className="count">{pad(appProjects.length)}</span>
        </div>
        <div className="app-grid">
          {appProjects.map((p, i) => (
            <Rv key={p.id} delay={(i % 3) * 100}>
              <div className="app">
                <button className="app-shot" style={{ background: p.tint }} onClick={() => setSel(p)} aria-label={`Open ${p.title}`}>
                  <div className="phone" style={{ aspectRatio: p.ratio, backgroundImage: `url('${p.img}')` }} />
                </button>
                <div className="app-body">
                  <span className="meta">{meta(p)}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="links">
                    <button className="link-btn" onClick={() => setSel(p)}>Case study →</button>
                    <ExtLinks p={p} />
                  </div>
                </div>
              </div>
            </Rv>
          ))}
        </div>
      </section>

      <section id="web" className="container group">
        <div className="group-head" data-reveal="">
          <h2>Web platforms & CRMs</h2>
          <span className="count">{pad(webProjects.length)}</span>
        </div>
        <div className="web-grid">
          {webProjects.map((p, i) => (
            <Rv key={p.id} delay={(i % 3) * 100}>
              <div className="web">
                <button className="browser" onClick={() => setSel(p)} aria-label={`Open ${p.title}`}>
                  <div className="browser-win">
                    <div className="browser-bar"><i /><i /><i /></div>
                    {p.img ? (
                      <div className="shot" style={{ backgroundImage: `url('${p.img}')` }} />
                    ) : (
                      <div className="shot empty">Screenshot coming soon</div>
                    )}
                  </div>
                </button>
                <div className="web-body">
                  <span className="meta">{meta(p)}</span>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="links">
                    <button className="link-btn" onClick={() => setSel(p)}>Details →</button>
                    <ExtLinks p={p} />
                  </div>
                </div>
              </div>
            </Rv>
          ))}
        </div>
      </section>

      {sel && <Drawer p={sel} onClose={() => setSel(null)} />}
    </>
  );
}
