import { Fragment } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealController from '@/components/RevealController';
import Rv from '@/components/Rv';
import HeroTrace from '@/components/HeroTrace';
import HarnessLog from '@/components/HarnessLog';
import Process from '@/components/Process';
import Clients from '@/components/Clients';
import Faq from '@/components/Faq';
import { ArrowRight, Check } from '@/components/icons';
import { CALENDLY, capabilities, employers, engagements, results } from '@/lib/data';

const pad = (n: number) => String(n).padStart(2, '0');
const words = ['The', 'AI', 'engineering', 'team', 'your', 'startup', 'hasn’t', 'hired', 'yet.'];

export default function HomePage() {
  const marquee = [...employers, ...employers, ...employers, ...employers];

  return (
    <>
      <SiteHeader page="home" />
      <RevealController />
      <main id="top">
        {/* Hero */}
        <section className="hero">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="hero-grid" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="pill split" style={{ animationDelay: '0ms' }}>
                <span className="pill-dot" />
                AI engineering for funded startups
              </span>
              <h1 className="h1">
                {words.map((w, i) => (
                  <Fragment key={i}>
                    <span className={`split${i >= 4 ? ' hl' : ''}`} style={{ animationDelay: `${80 + i * 70}ms` }}>{w}</span>
                    {i < words.length - 1 ? ' ' : ''}
                  </Fragment>
                ))}
              </h1>
              <p className="hero-lead split" style={{ animationDelay: '720ms' }}>
                We build agent harnesses, evaluation pipelines and cost-efficient inference for newly funded startups: the infrastructure that keeps AI features reliable in production and affordable as usage grows.
              </p>
              <div className="hero-ctas split" style={{ animationDelay: '830ms' }}>
                <a className="btn btn-cream" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  Book a 30-minute call <ArrowRight />
                </a>
                <a className="btn btn-ghost" href="#capabilities">See capabilities</a>
              </div>
              <span className="hero-note split" style={{ animationDelay: '940ms' }}>
                NDA on request · Written proposal within 48 hours · Code in your repository from day one
              </span>
            </div>
            <div className="split" style={{ animationDelay: '1050ms' }}>
              <HeroTrace />
            </div>
          </div>

          <div className="strip">
            <div className="container strip-inner">
              <span className="strip-label">Engineers from</span>
              <div className="marquee">
                <div className="marquee-track">
                  {marquee.map((m, i) => (
                    <span className="marquee-item" key={i} aria-hidden={i >= employers.length}>
                      <b>{m.t}</b>
                      {m.p && <span>{m.p}</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="container results">
          <div className="rule-head" data-reveal="">
            <span className="eyebrow">Results</span>
            <span className="line" />
            <span className="note">From production systems our engineers built</span>
          </div>
          <div className="results-grid" data-reveal="" style={{ ['--d' as string]: '80ms' }}>
            {results.map((r) => (
              <div className="result" key={r.l}>
                <span className="num" data-count="">{r.v}</span>
                <p>{r.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="container caps-sec">
          <div className="sec-head" data-reveal="">
            <div>
              <span className="eyebrow">Capabilities</span>
              <h2 className="h2">Infrastructure for AI that has to work in production.</h2>
            </div>
            <p className="lead">Most AI prototypes work in a demo. The hard part is making them reliable, observable and cheap enough to run for every customer. That is the work we focus on.</p>
          </div>
          <div className="caps">
            {capabilities.map((c, i) => (
              <Rv key={c.title} delay={(i % 3) * 90} className={`cap-cell${c.feat ? ' feat' : ''}`}>
                <div className="cap spot">
                  <div className="cap-top">
                    <span className="cap-n">{pad(i + 1)}</span>
                    <span className="chip">{c.group}</span>
                  </div>
                  {c.feat && <HarnessLog />}
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <span className="tags">{c.tags}</span>
                </div>
              </Rv>
            ))}
          </div>
          <div className="also" data-reveal="">
            <span className="lbl">Also</span>
            <span className="txt">Product engineering. When your AI needs a product around it, we build the web, mobile and backend too.</span>
            <Link href="/work">See our work <ArrowRight size={15} /></Link>
          </div>
        </section>

        {/* Engagements */}
        <section id="engagements" className="divider glow-l">
          <div className="container sec-pad">
            <div className="sec-head" data-reveal="">
              <div>
                <span className="eyebrow">Engagements</span>
                <h2 className="h2">Built for the months after a raise.</h2>
              </div>
              <p className="lead">Each engagement has a fixed scope and a written proposal within 48 hours. Start with the one closest to your problem; most teams combine two.</p>
            </div>
            <div className="eng-grid">
              {engagements.map((e, i) => (
                <Rv key={e.title} delay={i * 90}>
                  <div className="cream eng">
                    <div className="eng-top">
                      <span className="dur">{e.dur}</span>
                      <span className="n">{pad(i + 1)}</span>
                    </div>
                    <h3>{e.title}</h3>
                    <p>{e.text}</p>
                    <div className="gets">
                      <span className="lbl">You get</span>
                      {e.gets.map((g) => (
                        <span className="get" key={g}>
                          <Check color="#2f6b4f" />
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="approach" className="container sec-pad-sm">
          <div className="sec-head" data-reveal="" style={{ gridTemplateColumns: '1fr', maxWidth: 760 }}>
            <div>
              <span className="eyebrow">How we work</span>
              <h2 className="h2">You’ll always know where your build stands.</h2>
            </div>
          </div>
          <Process />
        </section>

        {/* Clients */}
        <section id="clients" className="container sec-pad-sm">
          <div className="sec-head" data-reveal="" style={{ marginBottom: 44 }}>
            <div>
              <span className="eyebrow">Clients</span>
              <h2 className="h2">Founders in the US, UK, Dubai and Australia.</h2>
            </div>
            <p className="lead">One engineering team, with a few hours of overlap every day in each time zone. Select a location to read what the client said.</p>
          </div>
          <div data-reveal="" style={{ ['--d' as string]: '80ms' }}>
            <Clients />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="divider">
          <div className="container sec-pad-sm faq-grid">
            <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span className="eyebrow">Questions</span>
              <h2 className="h2 h2-sm">What founders ask us first.</h2>
            </div>
            <div data-reveal="" style={{ ['--d' as string]: '80ms' }}>
              <Faq />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-wrap">
          <div className="cta" data-reveal="">
            <h2>Tell us what your AI needs to do next.</h2>
            <div className="cta-body">
              <p>A 30-minute call with the engineers who would build it. You’ll leave with a clear read on scope, cost and timeline, whether or not we work together.</p>
              <a className="btn btn-dark" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                Book a call <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
