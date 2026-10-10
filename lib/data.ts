export const CALENDLY = 'https://calendly.com/devfoundry10/30min';
export const EMAIL = 'hello@devfoundry.shop';

export const employers: { t: string; p?: string }[] = [
  { t: 'KPMG AI' },
  { t: 'HCLSoftware' },
  { t: 'Oracle' },
  { t: 'SLB' },
  { t: 'Ciena', p: 'previously' },
  { t: 'IEEE', p: 'published research' },
];

export const heroTrace = [
  { k: 'router', t: 'billing question → small model', v: '38 ms' },
  { k: 'cache', t: 'system prompt prefix cached', v: '−6.1k tok' },
  { k: 'retrieve', t: '4 passages, reranked', v: '210 ms' },
  { k: 'model', t: 'answer drafted with citations', v: '1.2k tok' },
  { k: 'guardrail', t: 'PII and policy checks passed', v: 'ok' },
  { k: 'eval', t: 'groundedness scored', v: '0.94' },
];

export const results = [
  { v: '18% → 7%', l: 'hallucination rate after adding evals and tracing' },
  { v: '−35%', l: 'cost per request after moving to self-hosted inference' },
  { v: '200K+', l: 'documents in a retrieval system where every answer cites its source' },
  { v: '2.3s → 0.8s', l: 'median latency on an AI service with 50K monthly users' },
];

export type Capability = { title: string; group: string; text: string; tags: string; feat?: boolean };
export const capabilities: Capability[] = [
  { title: 'Agent harnesses', group: 'Core', feat: true, text: 'The runtime around your agents: tool and MCP integrations, context and memory management, sandboxed execution, retries, human approval steps and full tracing. Agents that finish long tasks and can be audited afterwards.', tags: 'LangGraph · MCP servers · Tool calling · Memory · Approval gates' },
  { title: 'Token & inference cost optimisation', group: 'Cost', text: 'Cost per task tracked by feature and customer, then reduced with prompt caching, model routing, context compression and semantic caching.', tags: 'Prompt caching · Model routing · Semantic cache' },
  { title: 'Evals & regression testing', group: 'Quality', text: 'Golden datasets from your real traffic, automated scoring and a CI gate, so every prompt or model change is measured before release.', tags: 'Golden sets · LLM-as-judge · RAGAS · CI gates' },
  { title: 'Cloud & GPU efficiency', group: 'Cost', text: 'Right-sized inference: quantised models on vLLM, autoscaling and spot capacity, so your credits and runway last longer.', tags: 'vLLM · Quantisation · AWS · GCP · Azure' },
  { title: 'Context engineering & RAG', group: 'Core', text: 'Hybrid search, reranking and layout-aware parsing, with answers that cite the exact passage they came from.', tags: 'Hybrid search · Reranking · Citations' },
  { title: 'Guardrails & AI security', group: 'Quality', text: 'Prompt-injection and jailbreak defence, PII redaction and policy guardrails, informed by our own published research.', tags: 'NeMo Guardrails · Red teaming · PII' },
  { title: 'Fine-tuning & small models', group: 'Cost', text: 'Move high-volume tasks to smaller models you own with LoRA, QLoRA, distillation and speculative decoding.', tags: 'LoRA · QLoRA · Distillation' },
  { title: 'AI observability', group: 'Quality', text: 'Traces, cost and latency dashboards and drift alerts for every model call: what the model saw, did and cost.', tags: 'LangSmith · OpenTelemetry · Grafana' },
];

export const harnessLog = [
  { k: 'plan', t: 'refund request → 4 steps', c: '#9fe6b8' },
  { k: 'tool', t: 'billing.lookup(order_8812)', c: '#efe8d6' },
  { k: 'tool', t: 'policy.search("refund window")', c: '#efe8d6' },
  { k: 'gate', t: 'refund > $200 · approval requested', c: '#f2c879' },
  { k: 'trace', t: 'run saved · 6 steps · $0.019', c: '#9fe6b8' },
];

export const engagements = [
  { dur: '2 weeks', title: 'AI cost audit', text: 'We trace your LLM and cloud spend, find where it goes, and implement the fixes you approve.', gets: ['Spend broken down by feature, model and customer', 'Caching, routing and prompt changes merged', 'A before-and-after cost report'] },
  { dur: '3 weeks', title: 'Eval & reliability sprint', text: 'A measurable definition of "good" for your AI features, enforced on every change.', gets: ['A golden dataset from your real traffic', 'Automated scoring with LLM-as-judge', 'A CI gate that blocks regressions'] },
  { dur: '6–10 weeks', title: 'Agent harness build', text: 'From prototype to a production agent your team can extend and trust.', gets: ['Tool and MCP integrations', 'Memory, retries and approval gates', 'Tracing, guardrails and evals built in'] },
  { dur: 'Monthly', title: 'Embedded AI team', text: 'Our engineers work as your AI team until you hire one, then hand over.', gets: ['Engineers in your repo and standups', 'Weekly demos and written updates', 'A documented handover to your hires'] },
];

export type Pos = 'left' | 'right' | 'top' | 'bottom';
export const hub = { id: 'hub', label: 'Engineering team', lon: 77.59, lat: 12.97, pos: 'bottom' as Pos };

const placeholderQuote = 'Add this client’s quote here: two or three sentences on what you built together and what changed for them.';
export const regions = [
  { id: 'us', name: 'United States', pos: 'left' as Pos, lon: -74.0, lat: 40.7, project: 'Real-time platform backend', person: 'Client name', role: 'Product company, New York', quote: placeholderQuote },
  { id: 'uk', name: 'United Kingdom', pos: 'top' as Pos, lon: -0.12, lat: 51.5, project: 'Project name', person: 'Client name', role: 'Founder, Company', quote: placeholderQuote },
  { id: 'dxb', name: 'Dubai', pos: 'left' as Pos, lon: 55.27, lat: 25.2, project: 'Edito AI', person: 'Client name', role: 'Expelee', quote: placeholderQuote },
  { id: 'au', name: 'Australia', pos: 'bottom' as Pos, lon: 151.2, lat: -33.9, project: 'Campus Mesh', person: 'Client name', role: 'Campus Mesh', quote: placeholderQuote },
];

export const faqs = [
  { q: 'We already use OpenAI or Anthropic APIs. What do you add?', a: 'The engineering around the model: harnesses, evals, guardrails, observability and cost controls. Most of the reliability and cost of an AI feature is decided by that layer rather than by the choice of model.' },
  { q: 'How much can you reduce our AI costs?', a: 'It depends on your traffic and architecture, so we measure before we promise. The cost audit gives you a per-feature breakdown and a list of changes with expected savings, and we implement the ones you approve.' },
  { q: 'Who owns the code and IP?', a: 'You do. We work in your repositories and cloud accounts from the first commit, and IP assignment is written into the contract.' },
  { q: 'Can you work alongside our existing engineers?', a: 'Yes. We work in your repositories, follow your review process and document everything, so your team can own it after handover.' },
  { q: 'What time zones do you cover?', a: 'We work with clients in the US, UK, Dubai and Australia, keep a few hours of overlap each day for calls, and reply in a shared channel.' },
  { q: 'How quickly can you start?', a: 'You get a written proposal within 48 hours of the scoping call. Once it’s approved, work usually starts the following week.' },
  { q: 'Do you also build apps and websites?', a: 'Yes, when your AI needs a product around it. Our work page shows the web, mobile and CRM projects we have shipped.' },
];

export const steps = [
  { title: 'Scoping call', when: 'Day 1', text: '30 minutes on what you’re building, what’s already promised to investors or customers, and your timeline.' },
  { title: 'Written proposal', when: '48 hours', text: 'Scope, architecture, milestones and a fixed date for the first working demo.' },
  { title: 'Weekly demos', when: 'Every week', text: 'A live build you can click through, eval and cost numbers, and a written summary.' },
  { title: 'Launch & handover', when: 'Launch', text: 'Deployed to your cloud, documented, with a recorded walkthrough for your first in-house hire.' },
];

/* ---------- Work page ---------- */

export type Project = {
  id: string;
  title: string;
  client: string;
  kind: string;
  place?: string;
  summary: string;
  brief: string;
  built: string;
  img?: string;
  ratio?: string;
  tint?: string;
  metrics?: { v: string; l: string }[];
  stack?: string[];
  links?: { label: string; href: string }[];
};

export const enterpriseProjects: Project[] = [
  { id: 'docsearch', title: 'Contract and policy search with cited answers', client: 'Enterprise', kind: 'RAG & document AI',
    summary: 'Hybrid retrieval over 200K+ documents where every generated statement links back to its source passage.',
    brief: 'Teams needed answers from a large contract and policy library that they could check against the original document.',
    built: 'Hybrid keyword and embedding retrieval with layout-aware parsing and reranking, citation-level grounding, and an offline eval harness that runs in CI on every change.',
    metrics: [{ v: '200K+', l: 'documents' }, { v: '+22%', l: 'answer accuracy' }, { v: '4s → 1.2s', l: 'query time' }],
    stack: ['Azure AI Search', 'LangGraph', 'FastAPI', 'GitHub Actions'] },
  { id: 'agents', title: 'Multi-agent automation for 8–12 step business processes', client: 'Enterprise', kind: 'Agent harness',
    summary: 'Agents that plan, retrieve and act across thousands of internal documents, with approval gates and per-step tracing.',
    brief: 'Long, document-heavy workflows were handled manually by analysts and needed to be automated without losing auditability.',
    built: 'A multi-agent system with structured outputs, human approval gates and per-step tracing, so long runs can be audited and resumed. Evaluated with RAGAS and monitored in LangSmith.',
    metrics: [{ v: '~30%', l: 'less analyst effort' }, { v: '18% → 7%', l: 'hallucination rate' }, { v: '10K+', l: 'documents indexed' }],
    stack: ['LangGraph', 'OpenAI', 'Gemini', 'Pinecone', 'RAGAS', 'LangSmith'] },
];

export const appProjects: Project[] = [
  { id: 'tower', title: 'Tower Patrolling App', client: 'India’s largest steel maker', kind: 'Enterprise field app',
    img: '/assets/tower-patrol.png', ratio: '317 / 633', tint: 'linear-gradient(165deg,#22406a,#0f2238)',
    summary: 'Inspection and compliance tracking for the engineers who patrol power transmission towers.',
    brief: 'Engineers patrolling transmission towers needed one place to log inspections and keep every asset on every route compliant.',
    built: 'A mobile app for ground, tower-top and emergency patrols and aviation-light checks, with route-level dashboards of completed, active and overdue patrols, and cross-patrolling to re-verify inspections.' },
  { id: 'edito', title: 'Edito AI', client: 'Expelee', place: 'Dubai', kind: 'AI mobile app',
    img: 'https://devfoundry.shop/assets/images/edito.png', ratio: '460 / 996', tint: 'linear-gradient(165deg,#33255a,#130f24)',
    summary: 'An AI photo-editing app with 40+ creative effects, including portraits, cinematic styles and 3D figures.',
    brief: 'Expelee wanted a consumer AI photo-editing app that people can try instantly, without signing up.',
    built: 'Over 40 AI effects. Three free generations with no account and no watermarks; premium adds faster processing, more effects, cloud storage and HD exports.',
    stack: ['Flutter', 'Dart', 'AI'], links: [{ label: 'App Store', href: 'https://apps.apple.com/in/app/edito-ai/id6754602967' }] },
  { id: 'campus', title: 'Campus Mesh', client: 'Campus Mesh', place: 'Australia', kind: 'Mobile app',
    img: 'https://devfoundry.shop/assets/images/campusmesh.png', ratio: '590 / 1280', tint: 'linear-gradient(165deg,#1b4652,#0b1f26)',
    summary: 'A campus super-app connecting students, clubs and faculty: events, messaging, study groups and alerts in one feed.',
    brief: 'Bring students, clubs and faculty into a single campus app.',
    built: 'Event discovery, peer messaging, study-group matching and real-time campus alerts in one unified feed, on iOS and Android.',
    stack: ['Flutter', 'Firebase', 'Dart'], links: [{ label: 'App Store', href: 'https://apps.apple.com/in/app/campusmesh/id6757100985' }, { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.campusmesh.android' }] },
  { id: 'irrikart', title: 'Irrikart', client: 'MyIrrigacio World', kind: 'E-commerce app',
    img: '/assets/irrikart.png', ratio: '1080 / 1920', tint: 'linear-gradient(165deg,#22603d,#0f2e1e)',
    summary: 'An e-commerce app for water-irrigation products: pumps, drip kits, sprinklers, valves and tools.',
    brief: 'MyIrrigacio World needed an app where farmers can browse and buy irrigation products from trusted brands.',
    built: 'Category browsing for sprinklers, filters, valves, pipes, misters and home irrigation, ready-to-install drip kits, search, wishlist, cart and orders.' },
  { id: 'bondbridge', title: 'BondBridge', client: 'Our product', kind: 'Social app · AI',
    img: 'https://devfoundry.shop/assets/images/bondbridge.png', ratio: '459 / 998', tint: 'linear-gradient(165deg,#2a1f45,#0c0a14)',
    summary: 'A social app with encrypted chat, voice and video calling and ML friend suggestions. 1,100+ users.',
    brief: 'Build and launch a social app for anonymous interaction, from first commit to both app stores.',
    built: 'End-to-end encrypted chat, real-time voice and video calling over WebRTC, ML-based friend suggestions and an AI chatbot for location-based recommendations, on a Node.js and MongoDB backend.',
    metrics: [{ v: '1,100+', l: 'users' }, { v: '2', l: 'app stores, one codebase' }], stack: ['Flutter', 'Node.js', 'MongoDB', 'WebRTC'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/in/app/bondbridge-ai/id6745119162' }, { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.bondbridge.bondbridgeonline' }] },
];

export const webProjects: Project[] = [
  { id: 'roomie', title: 'Roomie CRM', client: 'E-rickshaw vendor company', kind: 'CRM',
    summary: 'A custom CRM built for an e-rickshaw vendor company.',
    brief: 'An e-rickshaw vendor company needed a CRM built around how its team works.',
    built: 'A custom CRM for the vendor’s customer records and sales workflow.' },
  { id: 'outreach', title: 'Outreach CRM', client: 'CRM with automated agents', kind: 'Web app', img: 'https://devfoundry.shop/assets/web_screenshots/crm.png',
    summary: 'A CRM that uses automated agents to manage leads, follow-ups and communication workflows.',
    brief: 'Help a sales team keep up with outreach without losing track of leads.',
    built: 'Automated agents for leads, follow-ups and communication workflows, with interaction tracking and customer data in one place.',
    links: [{ label: 'Live', href: 'https://bbook-crm-frontend-final.vercel.app/' }] },
  { id: 'cv', title: 'CV Compare', client: 'AI agents', kind: 'Web app', img: 'https://devfoundry.shop/assets/web_screenshots/aiagents.png',
    summary: 'Resume optimisation that scores a CV against a job description and recommends improvements.',
    brief: 'Show job seekers how well their resume matches a role, and what to change.',
    built: 'AI analysis of resumes against job descriptions, ATS scoring and personalised improvement recommendations.',
    links: [{ label: 'Live', href: 'https://cv-compare.vercel.app' }] },
  { id: 'store', title: 'Digital products store', client: 'E-commerce', kind: 'Web app', img: 'https://devfoundry.shop/assets/web_screenshots/ecommerce.png',
    summary: 'A full-stack store for courses, assets and subscriptions, with secure payments and instant delivery.',
    brief: 'Sell digital products such as courses, assets and subscriptions with a clean checkout.',
    built: 'Secure payment integration, instant delivery, and dashboards for both buyers and admins.',
    links: [{ label: 'Live', href: 'https://ecommerce-sage-kappa-20.vercel.app/' }] },
  { id: 'atelier', title: 'Interior design studio', client: 'Website · UI/UX', kind: 'Website', img: 'https://devfoundry.shop/assets/web_screenshots/interiordesigner.png',
    summary: 'Portfolio, services and design philosophy for an interior design studio.',
    brief: 'Represent an interior design studio’s work and brand online.',
    built: 'A responsive site built around visual storytelling: portfolio, services and design philosophy, with elegant layouts and smooth navigation.',
    links: [{ label: 'Live', href: 'https://essajeesatelier.com/' }] },
  { id: 'bbweb', title: 'BondBridge for web', client: 'Our product', kind: 'Web app', img: 'https://devfoundry.shop/assets/web_screenshots/bondbridge.png',
    summary: 'The web version of BondBridge: posts, messaging and community, with real-time updates.',
    brief: 'Bring BondBridge to the browser alongside the iOS and Android apps.',
    built: 'Content sharing, posts and messaging on a scalable backend with real-time updates.',
    links: [{ label: 'Live', href: 'https://bondbridge-wheat.vercel.app/login' }] },
];
