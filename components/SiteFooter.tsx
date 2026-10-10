import Link from 'next/link';
import { EMAIL } from '@/lib/data';

export default function SiteFooter() {
  return (
    <footer className="container footer">
      <span>
        <b>Dev Foundry</b> · AI engineering for funded startups
      </span>
      <nav aria-label="Footer">
        <Link href="/work">Work</Link>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <span>© {new Date().getFullYear()} Dev Foundry</span>
      </nav>
    </footer>
  );
}
