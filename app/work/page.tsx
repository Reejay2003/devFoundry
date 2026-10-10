import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealController from '@/components/RevealController';
import WorkGrid from '@/components/WorkGrid';
import { CALENDLY, appProjects, enterpriseProjects, webProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Enterprise AI systems, and the field apps, consumer AI, e-commerce and CRMs we build around AI for clients.',
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function WorkPage() {
  const jump = [
    { label: 'Enterprise AI', n: enterpriseProjects.length, href: '#enterprise' },
    { label: 'Mobile apps', n: appProjects.length, href: '#apps' },
    { label: 'Web & CRMs', n: webProjects.length, href: '#web' },
  ];

  return (
    <>
      <SiteHeader page="work" />
      <RevealController />
      <main>
        <section className="container work-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span className="eyebrow split">Work</span>
            <h1 className="split" style={{ animationDelay: '80ms' }}>Selected work.</h1>
          </div>
          <div className="split" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start', animationDelay: '200ms' }}>
            <p className="lead" style={{ maxWidth: '32em' }}>
              Enterprise AI systems, and the products we build around AI for clients: field apps, consumer AI, e-commerce and CRMs. Some client names are withheld under NDA.
            </p>
            <div className="jump">
              {jump.map((j) => (
                <a key={j.href} href={j.href}>
                  {j.label} <span>{pad(j.n)}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <WorkGrid />

        <section className="cta-wrap">
          <div className="cta" data-reveal="">
            <h2>Have something similar in mind?</h2>
            <div className="cta-body">
              <p>We’ll walk through the relevant project on a call and tell you how we’d approach yours.</p>
              <a className="btn btn-dark" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                Book a call
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
