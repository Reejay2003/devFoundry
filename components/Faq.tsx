'use client';

import { useState } from 'react';
import { faqs } from '@/lib/data';

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`faq-item${isOpen ? ' open' : ''}`}>
            <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              {f.q}
              <span className="faq-plus" aria-hidden="true">+</span>
            </button>
            <div className="faq-a">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
