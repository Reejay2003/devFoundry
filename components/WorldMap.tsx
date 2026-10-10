'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import atlas from 'world-atlas/countries-110m.json';
import type { Pos } from '@/lib/data';

export type MapPoint = { id: string; type: 'hub' | 'client'; label: string; pos?: Pos; lon: number; lat: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const land = feature(atlas as any, (atlas as any).objects.land) as any;
const EXTENT = {
  type: 'MultiPoint',
  coordinates: [[-180, -56], [180, -56], [-180, 80], [180, 80], [0, 80], [0, -56], [-90, -56], [90, -56], [-90, 80], [90, 80]],
};
const C = {
  dot: '#1d3a2d', arcOn: '#9fe6b8', arcOff: '#3f7a5c', dash: '#9fe6b8', mover: '#efe8d6',
  hub: '#9fe6b8', client: '#efe8d6', sel: '#9fe6b8', pinStroke: '#0d2018', labelOn: '#efe8d6', labelOff: '#8ea597', halo: '#0d2018',
};

/** Dotted world map with animated arcs from the hub to each client. */
export default function WorldMap({ points, selected, onSelect }: { points: MapPoint[]; selected: string; onSelect: (id: string) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = wrap.current!;
    const measure = () => setW(Math.round(el.clientWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  const h = Math.round(w * 0.5);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proj = useMemo(() => (w ? geoNaturalEarth1().fitExtent([[6, 6], [w - 6, h - 6]], EXTENT as any) : null), [w, h]);

  useEffect(() => {
    if (!proj || !cv.current) return;
    const dpr = window.devicePixelRatio || 1;
    const oc = document.createElement('canvas');
    oc.width = w;
    oc.height = h;
    const ox = oc.getContext('2d')!;
    ox.beginPath();
    geoPath(proj, ox)(land);
    ox.fill();
    const data = ox.getImageData(0, 0, w, h).data;
    const s = Math.max(5, Math.round(w / 130));
    const c = cv.current;
    c.width = w * dpr;
    c.height = h * dpr;
    const x = c.getContext('2d')!;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.clearRect(0, 0, w, h);
    x.fillStyle = C.dot;
    const r = s * 0.3;
    let row = 0;
    for (let y = s / 2; y < h; y += s, row++) {
      for (let px = row % 2 ? s : s / 2; px < w; px += s) {
        if (data[(Math.floor(y) * w + Math.floor(px)) * 4 + 3] > 0) {
          x.beginPath();
          x.arc(px, y, r, 0, Math.PI * 2);
          x.fill();
        }
      }
    }
  }, [proj, w, h]);

  const hub = points.find((p) => p.type === 'hub');
  const hp = proj && hub ? (proj([hub.lon, hub.lat]) as [number, number]) : null;
  const fs = Math.max(11, Math.min(14, w / 70));

  return (
    <div ref={wrap} style={{ position: 'relative', width: '100%', height: w ? h : undefined, aspectRatio: w ? undefined : '2 / 1' }}>
      <canvas ref={cv} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {proj && hp && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }} role="img" aria-label="Map of client locations">
          {points
            .filter((p) => p.type !== 'hub')
            .map((p, i) => {
              const pp = proj([p.lon, p.lat]) as [number, number];
              const d = Math.hypot(pp[0] - hp[0], pp[1] - hp[1]);
              const cx = (hp[0] + pp[0]) / 2;
              const cy = (hp[1] + pp[1]) / 2 - Math.max(30, d * 0.32);
              const path = `M${hp[0]},${hp[1]} Q${cx},${cy} ${pp[0]},${pp[1]}`;
              const on = p.id === selected;
              return (
                <g key={`arc-${p.id}-${w}`}>
                  <path d={path} fill="none" stroke={on ? C.arcOn : C.arcOff} strokeWidth={on ? 1.8 : 1.2} strokeOpacity={on ? 0.95 : 0.6} />
                  <path d={path} fill="none" stroke={C.dash} strokeWidth={2} strokeDasharray="2 14" strokeLinecap="round" strokeOpacity={on ? 1 : 0.45}>
                    <animate attributeName="stroke-dashoffset" from="64" to="0" dur="2.4s" repeatCount="indefinite" />
                  </path>
                  <circle r={on ? 3.5 : 2.5} fill={C.mover} opacity={0}>
                    <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={path} begin={`${i * 0.5}s`} />
                    <set attributeName="opacity" to="1" begin={`${i * 0.5 + 0.05}s`} />
                  </circle>
                </g>
              );
            })}
          {points.map((p) => {
            const [x, y] = proj([p.lon, p.lat]) as [number, number];
            const isHub = p.type === 'hub';
            const on = p.id === selected;
            const pos = p.pos || 'right';
            let lx = x + 13, ly = y + 4;
            let anchor: 'start' | 'end' | 'middle' = 'start';
            if (pos === 'left') { lx = x - 13; anchor = 'end'; }
            else if (pos === 'top') { lx = x; ly = y - 14; anchor = 'middle'; }
            else if (pos === 'bottom') { lx = x; ly = y + 24; anchor = 'middle'; }
            const fill = isHub ? C.hub : on ? C.sel : C.client;
            return (
              <g
                key={`pin-${p.id}`}
                style={{ cursor: isHub ? 'default' : 'pointer', outline: 'none' }}
                role={isHub ? undefined : 'button'}
                tabIndex={isHub ? undefined : 0}
                aria-label={isHub ? undefined : `Show ${p.label}`}
                onClick={isHub ? undefined : () => onSelect(p.id)}
                onKeyDown={isHub ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(p.id); } }}
              >
                <circle cx={x} cy={y} r={6} fill="none" stroke={fill} strokeWidth={1.4}>
                  <animate attributeName="r" from="5" to={isHub ? '26' : '18'} dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={isHub || on ? 7 : 5} fill={fill} stroke={C.pinStroke} strokeWidth={2.5} />
                <circle cx={x} cy={y} r={18} fill="transparent" />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  fill={isHub || on ? C.labelOn : C.labelOff}
                  fontSize={fs}
                  fontWeight={isHub || on ? 700 : 500}
                  stroke={C.halo}
                  strokeWidth={5}
                  strokeLinejoin="round"
                  style={{ paintOrder: 'stroke', fontFamily: 'var(--font-sans), sans-serif' }}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
