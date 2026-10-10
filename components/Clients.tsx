'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { hub, regions } from '@/lib/data';
import { Quote } from './icons';
import type { MapPoint } from './WorldMap';

const WorldMap = dynamic(() => import('./WorldMap'), {
  ssr: false,
  loading: () => <div style={{ aspectRatio: '2 / 1' }} />,
});

export default function Clients() {
  const [id, setId] = useState(regions[0].id);
  const reg = regions.find((r) => r.id === id) ?? regions[0];
  const initials = reg.person.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const points = useMemo<MapPoint[]>(
    () => [
      { id: hub.id, type: 'hub', label: hub.label, pos: hub.pos, lon: hub.lon, lat: hub.lat },
      ...regions.map((r) => ({ id: r.id, type: 'client' as const, label: r.name, pos: r.pos, lon: r.lon, lat: r.lat })),
    ],
    [],
  );

  return (
    <div className="clients-row">
      <div className="card map-card">
        <div className="legend">
          <span><i style={{ background: 'var(--mint)' }} />Engineering team</span>
          <span><i style={{ background: 'var(--cream)' }} />Clients</span>
        </div>
        <WorldMap points={points} selected={id} onSelect={setId} />
      </div>
      <div className="cream quote-card" aria-live="polite">
        <div className="quote-top">
          <span className="where">{reg.name}</span>
          <span className="proj">{reg.project}</span>
        </div>
        <Quote />
        <p className="quote" key={reg.id}>{reg.quote}</p>
        <div className="who">
          <span className="av">{initials}</span>
          <div>
            <b>{reg.person}</b>
            <span>{reg.role}</span>
          </div>
        </div>
        <div className="regions">
          {regions.map((r) => (
            <button key={r.id} className={`region-btn${r.id === id ? ' on' : ''}`} aria-pressed={r.id === id} onClick={() => setId(r.id)}>
              {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
