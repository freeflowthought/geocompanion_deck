import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronDown, Sparkles, Radar, Bot, BarChart3, Users, Search, DollarSign, Building2, Rocket, Target, Activity, Cpu, Server, CheckCircle2, Linkedin, Mail } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import wilsonImage from './team/wilson_image_optimized.jpg';
import huanImage from './team/huan_image_optimized.jpg';
import amandaImage from './team/amanda_image_optimized.jpg';

/* ------------------------------------------------------------------ *
 *  Design system
 *  One ground (warm paper), one accent (clay). Contrast comes from
 *  scale, rule weight, and solid ink blocks — the same near-black used
 *  for type — rather than from a second competing hue.
 * ------------------------------------------------------------------ */

/**
 * One ground, one accent. The deck sits on warm paper; contrast comes from
 * scale, rule weight, and solid ink blocks — the same near-black used for
 * type — rather than from a second competing hue.
 */
const T = {
  heading: 'text-ink',
  body: 'text-graphite',
  muted: 'text-mist',
  panel: 'bg-hull border border-line',
  hair: 'border-line',
  rule: 'bg-ink/10',
} as const;

/* --- Primitives ---------------------------------------------------- */

const Eyebrow = ({ children, tone = 'muted', className = '' }: { children: React.ReactNode; tone?: 'muted' | 'clay'; className?: string }) => (
  <p className={`deck-mono text-[9px] font-medium uppercase tracking-[0.24em] ${tone === 'clay' ? 'text-clay' : T.muted} ${className}`}>
    {children}
  </p>
);

type PanelProps = {
  children: React.ReactNode;
  className?: string;
  /** clay hairline across the top — marks the one thing that matters on a slide */
  accent?: boolean;
  /** offset shadow, used sparingly for the hero card of a slide */
  raised?: boolean;
  /** flips to the opposite ground for maximum contrast */
  invert?: boolean;
};

const Panel = ({ children, className = '', accent = false, raised = false, invert = false }: PanelProps) => {
  const surface = invert ? 'bg-ink border border-ink' : T.panel;
  const shadow = raised ? 'shadow-lift' : '';

  return (
    <div className={`relative ${surface} ${shadow} ${className}`}>
      {accent ? <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-clay" aria-hidden="true" /> : null}
      {children}
    </div>
  );
};

/** Small stacked label + figure, used for KPI and market rows. */
const Figure = ({ label, value, note, accent = false }: { label: string; value: string; note?: string; accent?: boolean }) => (
  <Panel accent={accent} className="p-5">
    <Eyebrow>{label}</Eyebrow>
    <p className={`deck-heading mt-3 text-[2rem] font-semibold leading-none tabular-nums tracking-tight ${accent ? 'text-clay' : T.heading}`}>
      {value}
    </p>
    {note ? <p className={`mt-2.5 text-xs leading-snug ${T.muted}`}>{note}</p> : null}
  </Panel>
);

/** Corner crop marks — a quiet print-plate cue used on featured panels. */
const CropMarks = () => {
  const c = 'border-ink/20';
  return (
    <>
      <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t ${c}`} aria-hidden="true" />
      <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t ${c}`} aria-hidden="true" />
      <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l ${c}`} aria-hidden="true" />
      <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r ${c}`} aria-hidden="true" />
    </>
  );
};

type SlideShellProps = {
  id: string;
  index: number;
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const TOTAL_SLIDES = 14;

const SlideShell = ({ id, index, kicker, title, subtitle, children }: SlideShellProps) => {
  const t = T;

  return (
    <section
        id={id}
        data-theme="light"
        className="deck-slide relative flex snap-start flex-col justify-center overflow-hidden bg-paper px-6 pb-12 pt-20 md:px-12 lg:px-32"
        style={{ minHeight: '100svh' }}
      >
        <div className="deck-grid pointer-events-none absolute inset-0" aria-hidden="true" />

        {/* Oversized index, bled off the corner */}
        <span
          className="deck-heading pointer-events-none absolute -bottom-[6vw] -right-[2vw] select-none font-bold leading-none text-ink/[0.045]"
          style={{ fontSize: '22vw', letterSpacing: '-0.06em' }}
          aria-hidden="true"
        >
          {String(index).padStart(2, '0')}
        </span>

        <div className="relative z-10 mx-auto w-full max-w-[86rem]">
          {/* Header rail */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="deck-mono text-[10px] font-bold tracking-[0.2em] text-clay">
                {String(index).padStart(2, '0')}
              </span>
              <span className="h-px w-8 bg-clay" aria-hidden="true" />
              <span className={`deck-mono text-[10px] font-medium uppercase tracking-[0.28em] ${t.muted}`}>{kicker}</span>
              <span className={`ml-auto deck-mono text-[10px] tracking-[0.2em] ${t.muted} hidden sm:block`}>
                {String(index).padStart(2, '0')} / {TOTAL_SLIDES}
              </span>
            </div>

            <div className={`mt-4 h-px w-full ${t.rule}`} aria-hidden="true" />

            <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
              <h2
                className={`deck-heading col-span-full text-balance font-semibold uppercase leading-[0.95] tracking-[-0.035em] ${t.heading} ${
                  subtitle ? 'lg:col-span-7' : ''
                }`}
                style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3.4rem)' }}
              >
                {title}
              </h2>
              {subtitle ? (
                <p className={`col-span-full text-pretty text-[15px] leading-relaxed lg:col-span-5 ${t.body}`}>
                  <span className="mr-3 inline-block h-[2px] w-6 translate-y-[-4px] bg-clay align-middle" aria-hidden="true" />
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="deck-slide-body">{children}</div>
      </div>
    </section>
  );
};

type SlideFootnoteLink = {
  label: string;
  href: string;
};

const SlideFootnotes = ({ items }: { items: SlideFootnoteLink[] }) => (
  <div className={`mt-5 flex flex-wrap gap-x-6 gap-y-1.5 border-t pt-3.5 ${T.hair}`}>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
        className={`deck-mono text-[9px] uppercase tracking-[0.12em] transition-colors hover:text-clay ${T.muted}`}
      >
        &#8599; {item.label}
      </a>
    ))}
  </div>
);

const FlorusMark = ({ size = 36 }: { size?: number }) => {
  const base = '#16161A';
  const core = '#F6F3EE';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke={base} strokeWidth="1" strokeDasharray="4 6" opacity="0.55" className="animate-[spin_28s_linear_infinite] origin-center" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#D9542B" strokeWidth="2.5" strokeDasharray="9 9" className="animate-[spin_14s_linear_infinite_reverse] origin-center" />
        <path d="M50 16 L50 84 M16 50 L84 50" stroke={base} strokeWidth="0.75" opacity="0.4" />
        <circle cx="50" cy="50" r="9" fill={base} />
        <circle cx="50" cy="50" r="3.5" fill={core} />
      </svg>
    </div>
  );
};

/* --- Domain components --------------------------------------------- */

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  photoPosition: string;
  linkedin?: string;
  body: string;
};

/** Thin directional connector used between steps in a flow. */
const FlowArrow = ({ className = '' }: { className?: string }) => (
  <svg width="22" height="8" viewBox="0 0 22 8" fill="none" className={className} aria-hidden="true">
    <path d="M0 4h19M19 4l-3.5-3M19 4l-3.5 3" stroke="currentColor" strokeWidth="1" />
  </svg>
);

/**
 * Governance-alpha hypothesis, drawn as two cost curves over repeated cycles.
 * Illustrative only — the ConsenX white paper defines how it must be measured.
 */
const CompoundingChart = () => {
  const w = 600;
  const h = 200;
  const pad = { l: 36, r: 16, t: 14, b: 30 };
  const ungoverned = [58, 60, 66, 70, 76, 80, 86, 90];
  const governed = [58, 56, 49, 42, 36, 31, 27, 24];
  const x = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (ungoverned.length - 1);
  const y = (v: number) => pad.t + ((100 - v) / 100) * (h - pad.t - pad.b);
  const line = (pts: number[]) => pts.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const gap = `${line(ungoverned)} ${governed
    .map((v, i) => [i, v] as const)
    .reverse()
    .map(([i, v]) => `L${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(' ')} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Illustrative chart: cost per accepted asset rises for ungoverned agents and falls for a governed RSI loop over eight cycles.">
      {[25, 50, 75].map((v) => (
        <line key={v} x1={pad.l} x2={w - pad.r} y1={y(v)} y2={y(v)} stroke="#E4DFD6" strokeWidth="1" />
      ))}
      <line x1={pad.l} x2={w - pad.r} y1={h - pad.b} y2={h - pad.b} stroke="#16161A" strokeWidth="1" />
      <path d={gap} fill="#D9542B" opacity="0.08" />
      <path d={line(ungoverned)} fill="none" stroke="#76747C" strokeWidth="1.5" strokeDasharray="4 5" />
      <path d={line(governed)} fill="none" stroke="#D9542B" strokeWidth="2.25" strokeLinejoin="round" />
      <circle cx={x(governed.length - 1)} cy={y(governed[governed.length - 1])} r="3.5" fill="#D9542B" />
      <text x={x(ungoverned.length - 1) - 4} y={y(ungoverned[ungoverned.length - 1]) - 8} textAnchor="end" fontSize="10" fill="#76747C" fontFamily="JetBrains Mono, monospace">UNGOVERNED AGENTS</text>
      <text x={x(governed.length - 1) - 4} y={y(governed[governed.length - 1]) + 18} textAnchor="end" fontSize="10" fill="#D9542B" fontFamily="JetBrains Mono, monospace">GOVERNED RSI LOOP</text>
      {ungoverned.map((_, i) => (
        <text key={i} x={x(i)} y={h - pad.b + 16} textAnchor="middle" fontSize="9" fill="#76747C" fontFamily="JetBrains Mono, monospace">
          C{i + 1}
        </text>
      ))}
      <text x={10} y={pad.t + 4} fontSize="9" fill="#76747C" fontFamily="JetBrains Mono, monospace" transform={`rotate(-90 10 ${pad.t + 4})`} textAnchor="end">
        COST / ACCEPTED ASSET
      </text>
    </svg>
  );
};

const teamMembers: TeamMember[] = [
  {
    name: 'Wilson',
    role: 'Founder & Architect',
    photo: wilsonImage,
    photoAlt: 'Portrait of Wilson',
    photoPosition: 'center 18%',
    linkedin: 'https://www.linkedin.com/in/wilson-wu-6a08893ba/',
    body: 'Serial technical founder with two exits. Raised $1.6M in venture capital and generated $1.3M in product revenue at Honeypot Finance. Previously Co-Founder/CTO at Antslabor (acquired; ranked Top 30 most innovative startups in Canada) and Senior Software Architect at Mastodon. Author of the ConsenX white paper on governed, self-improving multi-agent systems — the design behind the RSI Agent.',
  },
  {
    name: 'Huan',
    role: 'Co-Founder & Product',
    photo: huanImage,
    photoAlt: 'Portrait of Huan',
    photoPosition: 'center 20%',
    linkedin: 'https://www.linkedin.com/in/huan-ying-713736146/',
    body: 'Product leader spanning Web3, AI, and traditional finance. At Florus, owns the loop between visibility signal and content execution — the core conversion mechanic behind the platform thesis. Focuses on turning technical capability into workflows marketing teams can actually adopt, bridging product strategy, customer use cases, and day-to-day execution.',
  },
  {
    name: 'Amanda',
    role: 'Ecosystem Lead',
    photo: amandaImage,
    photoAlt: 'Portrait of Amanda',
    photoPosition: 'center 20%',
    body: 'Proven track record scaling tier-one Web3 DeFi protocols on Solana, leading APAC market expansion and shaping core product UI/UX. Bridges user-centric design with strategic go-to-market execution to drive user adoption and ecosystem growth across international markets. Now applying advanced SEO and GEO strategies to build organic distribution, improve model-layer visibility, and accelerate growth for next-generation AI products.',
  },
];

const TeamAvatar = ({ member }: { member: TeamMember }) => {
  const initials = member.name.slice(0, 1);

  return (
    <div className="group relative h-40 w-32 shrink-0">
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-clay transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" aria-hidden="true" />
      <div className="relative h-full w-full overflow-hidden border border-ink bg-hull">
        <img
          src={member.photo}
          alt={member.photoAlt}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          style={{ objectPosition: member.photoPosition }}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
            const fallback = event.currentTarget.nextElementSibling as HTMLDivElement | null;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div className="deck-heading absolute inset-0 hidden items-center justify-center bg-clay-tint text-4xl font-bold text-ink">
          {initials}
        </div>
      </div>
    </div>
  );
};

/* --- Content data --------------------------------------------------- */

/** Accelerator and startup programs. Status labels only where publicly announced. */
const programs: { name: string; status?: string }[] = [
  { name: 'NVIDIA Inception' },
  { name: 'AltaLab', status: 'Fall 2026 cohort' },
  { name: 'Startup Foundry', status: 'Cohort 1' },
  { name: 'LvlUp Ventures' },
];

/** The RSI loop, as described on florus.ai and in the ConsenX white paper. */
const rsiLoop = [
  { label: 'Run', body: 'Ship campaigns, posts, fixes, and outreach.' },
  { label: 'Measure', body: 'Pull back citations, replies, and edits.' },
  { label: 'Review', body: 'Score results. Find the root cause.' },
  { label: 'Commit', body: 'Turn lessons into assets — with your approval.' },
  { label: 'Compound', body: 'Start the next cycle from what was learned.' },
];

const rsiAssets = [
  { label: 'Memory', title: 'Market memory', body: 'ICP, voice, objections, and what has been tried.' },
  { label: 'Skills', title: 'Playbooks', body: 'Winning hooks and sequences, made reusable.' },
  { label: 'Harness', title: 'Quality checks', body: 'Repeated mistakes become pre-ship checks.' },
  { label: 'Routing', title: 'Routing policy', body: 'The right channel and model for each job.' },
];

const competitorRows = [
  {
    category: 'AI visibility analytics',
    examples: 'Profound, Peec AI, AthenaHQ',
    builtFor: 'Measuring how AI engines cite a brand. Profound raised $180M (Sep 2026) to add execution agents.',
    stops: 'Enterprise-first motion; the move from insight to execution is only now beginning.',
  },
  {
    category: 'AI content & GTM workflows',
    examples: 'Jasper, Copy.ai',
    builtFor: 'On-brand drafts and chained GTM workflows.',
    stops: 'At the draft. Shipping, measurement, and learning stay with the team.',
  },
  {
    category: 'Suite-native agents',
    examples: 'HubSpot Breeze, Salesforce Agentforce',
    builtFor: 'Automation inside one CRM and its data.',
    stops: 'At the suite boundary. What the agent learns stays inside one vendor.',
  },
  {
    category: 'Florus',
    examples: 'GeoCompanion · Launchvibes · RSI Agent',
    builtFor: 'The last mile: signal → shipped → measured → kept, across channels.',
    stops: 'Governed learning with approval, a ledger, and rollback — priced for founder teams and agencies.',
  },
];

const marketRows = [
  {
    market: 'AI Agents (all functions)',
    size: '~$7.8B (2025) → $52.6B (2030)',
    growth: '46% CAGR',
  },
  {
    market: 'AI Search & Answer Optimization',
    size: '~$1B today → $10B+',
    growth: '40%+ CAGR',
  },
  {
    market: 'Marketing AI SaaS',
    size: '~$8B today → $20B+',
    growth: '20% CAGR',
  },
  {
    market: 'Creator Economy + Social Tools',
    size: '$214B–$314B',
    growth: '22% CAGR',
  },
];

const roadmapRows = [
  {
    phase: 'Phase 0',
    round: 'Pre-seed',
    when: 'Now → Q4 2026',
    ships: 'Self-serve + RSI Agent pilots → shippable RSI Agent',
    target: '1.5K users, 10K searches, 50 creator/KOL accounts, 10 paying brand or agency teams, $5K–$10K MRR.',
  },
  {
    phase: 'Phase 1',
    round: 'Seed',
    when: '2027',
    ships: 'FDE at scale + metered API / MCP (Blueprint V5.3)',
    target: '$100K MRR, 25+ brand or agency customers, 500 creator/KOL accounts, <3-month payback, strong retention.',
  },
  {
    phase: 'Phase 2',
    round: 'Series A',
    when: '2028 → Q3 2029',
    ships: 'Governed learning layer for any agent team',
    target: '$50M+ ARR, 120+ enterprise or agency customers, enterprise-grade reporting and controls.',
  },
];

const shippedRows = [
  { when: 'Jul 2026', what: 'Role-model planning', product: 'Launchvibes' },
  { when: 'Jul 2026', what: 'Draft-led GEO campaigns', product: 'GeoCompanion' },
  { when: 'Jul 2026', what: 'Drafts handed straight into native social composers', product: 'Both', lastMile: true },
  { when: 'Sep 2026', what: 'Browser-agent (WebMCP) audit and assessment prep', product: 'Both' },
  { when: 'Oct 2026', what: 'RSI Agent introduced — forward-deployed pilots', product: 'Florus', lastMile: true },
];

const askRows = [
  {
    allocation: '70% Engineering',
    use: 'Reach the first milestone: a shippable RSI Agent — the governed learning ledger, review and rollback, channel and measurement connectors, and the evaluation harness behind the accepted-assets-per-dollar claim',
  },
  {
    allocation: '30% FDE',
    use: 'Forward-deployed engineers who deploy the RSI Agent into client GTM stacks themselves — our primary business model and our first revenue engine',
  },
];

const slideMeta: { id: string; kicker: string }[] = [
  { id: 'slide-1', kicker: 'Cover' },
  { id: 'slide-2', kicker: 'Problem' },
  { id: 'slide-3', kicker: 'Why Now' },
  { id: 'slide-4', kicker: 'Solution' },
  { id: 'slide-5', kicker: 'Product' },
  { id: 'slide-6', kicker: 'API + MCP' },
  { id: 'slide-7', kicker: 'Market' },
  { id: 'slide-8', kicker: 'Competition' },
  { id: 'slide-9', kicker: 'Moat' },
  { id: 'slide-10', kicker: 'Traction' },
  { id: 'slide-11', kicker: 'Model' },
  { id: 'slide-12', kicker: 'Roadmap' },
  { id: 'slide-13', kicker: 'Team' },
  { id: 'slide-14', kicker: 'The Ask' },
];

const PDF_EXPORT_WIDTH = 1440;

/* ------------------------------------------------------------------ */

const PitchDeckPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const scrollRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slideMeta.findIndex((s) => s.id === entry.target.id);
            if (idx >= 0) setActiveSlide(idx);
          }
        });
      },
      { root, threshold: 0.5 }
    );

    slideMeta.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? root.scrollTop / max : 0);
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      root.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToSlide = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const exportStage = document.createElement('div');
    exportStage.className = 'pdf-export-stage';
    document.body.appendChild(exportStage);

    try {
      const slides = Array.from(document.querySelectorAll<HTMLElement>('.deck-slide'));
      if (!slides.length) {
        throw new Error('No slides were found to export.');
      }

      if ('fonts' in document) {
        await document.fonts.ready;
      }

      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const waitForPaint = () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      let pdf: jsPDF | null = null;

      for (let idx = 0; idx < slides.length; idx += 1) {
        const sourceSlide = slides[idx];
        const slideBg = '#F6F3EE';

        const slide = sourceSlide.cloneNode(true) as HTMLElement;
        const sourceRect = sourceSlide.getBoundingClientRect();
        const sourceStyle = window.getComputedStyle(sourceSlide);
        slide.removeAttribute('id');

        const realHeight = Math.max(sourceSlide.scrollHeight, sourceRect.height);
        slide.style.width = `${Math.ceil(sourceRect.width)}px`;
        slide.style.height = `${Math.ceil(realHeight)}px`;
        slide.style.minHeight = '0';
        slide.style.justifyContent = 'flex-start';
        slide.style.backgroundColor = slideBg;
        slide.style.paddingTop = sourceStyle.paddingTop;
        slide.style.paddingRight = sourceStyle.paddingRight;
        slide.style.paddingBottom = sourceStyle.paddingBottom;
        slide.style.paddingLeft = sourceStyle.paddingLeft;

        exportStage.style.background = slideBg;
        exportStage.appendChild(slide);

        slide.querySelectorAll<HTMLElement>('.overflow-x-auto').forEach((node) => {
          node.style.overflow = 'visible';
        });
        slide.querySelectorAll<HTMLElement>('.deck-table').forEach((table) => {
          table.style.width = '100%';
          table.style.tableLayout = 'fixed';
        });
        slide.querySelectorAll<HTMLElement>('th, td').forEach((cell) => {
          cell.style.wordBreak = 'break-word';
        });

        await waitForPaint();

        const canvas = await html2canvas(slide, {
          backgroundColor: slideBg,
          scale,
          useCORS: true,
          logging: false,
          windowWidth: Math.ceil(sourceRect.width),
          windowHeight: Math.ceil(sourceRect.height),
          scrollX: 0,
          scrollY: 0,
        });
        exportStage.removeChild(slide);

        const pageOrientation = canvas.width >= canvas.height ? 'landscape' : 'portrait';
        if (!pdf) {
          pdf = new jsPDF({
            orientation: pageOrientation,
            unit: 'px',
            format: [canvas.width, canvas.height],
            compress: true,
            putOnlyUsedFonts: true,
          });
        } else {
          pdf.addPage([canvas.width, canvas.height], pageOrientation);
        }

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imageData = canvas.toDataURL('image/png');
        pdf.setFillColor(246, 243, 238);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      }

      if (!pdf) {
        throw new Error('Could not initialize PDF export.');
      }
      pdf.save('Florus_Investor_Deck.pdf');
    } catch (error) {
      console.error('Failed to export PDF:', error);
      window.alert('PDF export failed. Please try again after the page fully loads.');
    } finally {
      if (exportStage.parentNode) {
        exportStage.parentNode.removeChild(exportStage);
      }
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body { font-family: 'Inter', system-ui, sans-serif; }

        .deck-heading { font-family: 'Space Grotesk', system-ui, sans-serif; }

        .deck-mono {
          font-family: 'JetBrains Mono', monospace;
          font-variant-numeric: tabular-nums;
        }

        /* 12-column hairline grid — the structural signature of the deck */
        .deck-grid {
          background-image: linear-gradient(to right, rgba(22,22,26,0.05) 1px, transparent 1px);
          background-size: 8.3333% 100%;
          mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
        }

        /* Tables ------------------------------------------------------ */
        .deck-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8125rem;
        }

        .deck-table th {
          text-align: left;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 0.9rem 0.875rem;
          white-space: nowrap;
        }

        .deck-table td {
          padding: 0.85rem 0.875rem;
          vertical-align: top;
          line-height: 1.45;
        }

        .deck-table th {
          color: #76747C;
          background: #FFFFFF;
          border-bottom: 2px solid #16161A;
        }
        .deck-table td {
          color: #3F3F45;
          background: #FFFFFF;
          border-bottom: 1px solid #E4DFD6;
        }
        .deck-table th:last-child,
        .deck-table td:last-child {
          background: #FBEDE6;
        }
        .deck-table th:last-child { color: #A63A17; }

        /* Row-led tables highlight our row instead of the last column */
        .deck-table--rows th:last-child,
        .deck-table--rows td:last-child { background: #FFFFFF; }
        .deck-table--rows th:last-child { color: #76747C; }
        .deck-table--rows tr.row-us td { background: #FBEDE6; border-bottom-color: #F2D5C7; }
        .deck-table--rows tr.row-us td.cell-key { color: #A63A17; font-weight: 600; }

        .deck-table .cell-key { font-weight: 500; }
        .deck-table .cell-key { color: #16161A; }
        .deck-table .cell-win { font-weight: 600; color: #D9542B; }

        /* PDF stage --------------------------------------------------- */
        .pdf-export-stage {
          position: fixed;
          left: -20000px;
          top: 0;
          width: ${PDF_EXPORT_WIDTH}px;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .pdf-export-stage .deck-slide {
          box-sizing: border-box;
          position: relative;
        }

        .pdf-export-stage .overflow-x-auto { overflow: visible !important; }
        .pdf-export-stage .deck-table { width: 100% !important; min-width: 0 !important; }

        @media (prefers-reduced-motion: reduce) {
          .deck-scroll { scroll-behavior: auto !important; }
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        @media print {
          @page { size: landscape; margin: 0; }
          .deck-topbar, .deck-side-nav, .deck-hint { display: none !important; }
          .deck-scroll { height: auto !important; overflow: visible !important; }
          .deck-slide {
            min-height: auto !important;
            break-after: page;
            page-break-after: always;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-clay focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to main content
      </a>

      {/* Top chrome */}
      <header
        className="deck-topbar fixed left-0 right-0 top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[86rem] items-center justify-between px-5 py-3 sm:px-8">
          <h1 className="sr-only">Florus.ai Investor Deck</h1>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-mist transition-colors hover:text-clay focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-clay"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="deck-mono text-[10px] uppercase tracking-[0.18em]">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <FlorusMark size={26} />
            <div className="leading-none">
              <p className="deck-mono text-[11px] font-bold uppercase tracking-[0.24em] text-ink">Florus.ai</p>
              <p className="deck-mono mt-1 text-[8px] uppercase tracking-[0.2em] text-mist">Investor Deck</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 border border-ink px-4 py-2 text-ink transition-colors hover:border-clay hover:bg-clay hover:text-paper disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-clay"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="deck-mono text-[10px] uppercase tracking-[0.12em]">
              {isDownloading ? 'Generating…' : 'Export PDF'}
            </span>
          </button>
        </div>

        {/* scroll progress */}
        <div className="h-[2px] w-full bg-ink/10">
          <div className="h-full bg-clay transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
      </header>

      {/* Side rail */}
      <aside className="deck-side-nav fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
        {slideMeta.map((slide, idx) => {
          const isActive = idx === activeSlide;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => scrollToSlide(slide.id)}
              className="group flex items-center gap-2 focus-visible:outline-none"
              aria-label={`Go to slide ${idx + 1}: ${slide.kicker}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive ? 'w-7 bg-clay' : 'w-3 bg-ink/25 group-hover:w-5 group-hover:bg-ink/50'
                }`}
              />
              <span
                className={`deck-mono text-[8px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  isActive
                    ? 'text-clay opacity-100'
                    : 'text-mist opacity-0 group-hover:opacity-100'
                }`}
              >
                {slide.kicker}
              </span>
            </button>
          );
        })}
      </aside>

      <main ref={scrollRef} id="main-content" className="deck-scroll h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">

        {/* ============================ 01 · COVER ============================ */}
        <section
          id="slide-1"
          data-theme="light"
          className="deck-slide relative flex snap-start flex-col justify-center overflow-hidden bg-paper px-6 pb-12 pt-20 md:px-12 lg:px-32"
          style={{ minHeight: '100svh' }}
        >
          <div className="deck-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-clay/10 blur-[140px]" aria-hidden="true" />

          <span
            className="deck-heading pointer-events-none absolute -bottom-[6vw] -right-[2vw] select-none font-bold leading-none text-ink/[0.045]"
            style={{ fontSize: '22vw', letterSpacing: '-0.06em' }}
            aria-hidden="true"
          >
            01
          </span>

          <div className="relative z-10 mx-auto grid w-full max-w-[86rem] gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <FlorusMark size={30} />
                <span className="deck-mono text-[9px] uppercase tracking-[0.28em] text-clay">RSI for go-to-market</span>
              </div>

              <h2
                className="deck-heading mt-8 text-balance font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-ink"
                style={{ fontSize: 'clamp(2.3rem, 5vw, 4.6rem)' }}
              >
                Go-to-market that <span className="text-clay">improves itself.</span>
              </h2>

              <div className="mt-8 flex max-w-2xl gap-4">
                <span className="w-[2px] shrink-0 bg-clay" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed text-graphite">
                  AI made marketing output cheap. Florus owns the last mile — from output to shipped, measured
                  results — and the RSI Agent keeps what worked, so every cycle starts smarter than the last. You
                  approve what it keeps.
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Signal', value: 'GeoCompanion', Icon: Radar },
                  { label: 'Execution', value: 'Launchvibes', Icon: Sparkles },
                  { label: 'Learning', value: 'RSI Agent', Icon: Bot },
                ].map(({ label, value, Icon }) => (
                  <div key={label} className="flex items-start gap-3 border-t-2 border-ink pt-3">
                    <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" aria-hidden="true" />
                    <div>
                      <p className="deck-mono text-[8px] uppercase tracking-[0.22em] text-mist">{label}</p>
                      <p className="mt-1 text-[13px] font-medium leading-snug text-ink">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 lg:col-span-5">
              <Panel invert accent raised className="p-7">
                <CropMarks />
                <p className="deck-mono text-[9px] font-medium uppercase tracking-[0.24em] text-clay">The thesis</p>
                <p className="deck-heading mt-4 text-[1.35rem] font-medium leading-snug text-paper">
                  Recursive self-improvement will define the AI era. We point it at go-to-market first.
                </p>
                <p className="mt-5 border-t border-paper/15 pt-5 text-[13px] leading-relaxed text-paper/70">
                  GTM is the proving ground: the work recurs, feedback arrives in days, and every output can be
                  accepted or rejected. That is exactly what a self-improving loop needs.
                </p>
              </Panel>

              <Panel className="p-6">
                <Eyebrow>Self-improving, never self-approving</Eyebrow>
                <p className="mt-3 text-[13px] leading-relaxed text-graphite">
                  Every change the agent learns is proposed with evidence, routed by risk, recorded in a ledger, and
                  reversible. Brand, claims, and spend always need a human.
                </p>
              </Panel>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-10 w-full max-w-[86rem] border-t border-line pt-5">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <p className="deck-mono text-[9px] uppercase tracking-[0.24em] text-mist">Backed by programs from</p>
              {programs.map((p) => (
                <p key={p.name} className="flex items-baseline gap-2">
                  <span className="deck-heading text-[15px] font-semibold tracking-tight text-ink">{p.name}</span>
                  {p.status ? <span className="deck-mono text-[8px] uppercase tracking-[0.16em] text-mist">{p.status}</span> : null}
                </p>
              ))}
              <p className="deck-hint ml-auto inline-flex items-center gap-2 deck-mono text-[9px] uppercase tracking-[0.2em] text-mist">
                <ChevronDown className="h-3.5 w-3.5 animate-bounce text-clay" aria-hidden="true" /> Scroll
              </p>
            </div>
          </div>
        </section>

        {/* ============================ 02 · PROBLEM ============================ */}
        <SlideShell
          id="slide-2"
          index={2}
          kicker="Problem"
          title="The Last Mile"
          subtitle="AI made marketing output cheap. Turning it into shipped, measured, compounding results is still manual — and nothing learns."
        >
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Figure label="No business return" value="95%" note="of organizations see no return from GenAI spend (MIT NANDA, 2025)" accent />
            <Figure label="Still hand-edited" value="88%" note="say AI marketing content needs moderate or substantial editing (Knak, 2026)" />
            <Figure label="Fully embedded" value="6%" note="of marketers have AI fully embedded in their workflows (Supermetrics, 2026)" />
            <Figure label="Measure revenue" value="41%" note="track revenue or pipeline influence — vs 69% who track clicks (Knak, 2026)" />
          </div>

          {/* Where value leaks: the generation step is solved; everything after it is not. */}
          <Panel className="mt-4 p-6">
            <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_3.2fr]">
              <div className="flex flex-col justify-between border-l-2 border-line bg-paper p-4">
                <p className="deck-mono text-[8px] uppercase tracking-[0.18em] text-mist">Solved by AI</p>
                <p className="deck-heading mt-3 text-lg font-semibold text-ink">Generate</p>
                <p className="mt-1 text-xs leading-relaxed text-mist">Drafts, ideas, audits — cheap and instant.</p>
              </div>
              <span className="hidden items-center text-mist lg:flex">
                <FlowArrow />
              </span>
              <div className="relative border border-clay/40 bg-clay-tint p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="deck-mono text-[8px] uppercase tracking-[0.18em] text-clay-deep">The last mile · manual, fragmented, forgotten</p>
                  <p className="deck-mono hidden text-[8px] uppercase tracking-[0.18em] text-clay-deep sm:block">Where value leaks</p>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {['Edit', 'Approve', 'Ship', 'Measure', 'Learn'].map((step, idx) => (
                    <div key={step} className={`border-t-2 pt-2 ${idx === 4 ? 'border-clay' : 'border-clay/40'}`}>
                      <p className="deck-heading text-[15px] font-semibold text-ink">{step}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-graphite">
                  Each step lives in a different tool or a different person. Results rarely make it back, so the next
                  campaign starts from zero.
                </p>
              </div>
            </div>
          </Panel>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <div className="grid gap-3 md:grid-cols-3 lg:col-span-8">
              {[
                ['Visibility tools diagnose', 'They stop at the dashboard. Someone still has to fix it.'],
                ['Content tools draft', 'They stop at the draft. Shipping and measuring happen elsewhere.'],
                ['Agents run once and forget', 'Without memory of outcomes, the same mistakes repeat every cycle.'],
              ].map(([head, body]) => (
                <div key={head} className="border-l-2 border-line bg-hull p-4">
                  <p className="text-[13px] font-semibold text-ink">{head}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-graphite">{body}</p>
                </div>
              ))}
            </div>
            <Panel invert className="flex flex-col justify-center p-5 lg:col-span-4">
              <p className="text-[14px] font-medium leading-snug text-paper">
                “Most GenAI systems do not retain feedback, adapt to context, or improve over time.”
              </p>
              <p className="deck-mono mt-3 text-[8px] uppercase tracking-[0.18em] text-paper/55">MIT NANDA · The GenAI Divide, 2025</p>
            </Panel>
          </div>

          <SlideFootnotes
            items={[
              { label: 'MIT NANDA, The GenAI Divide (2025)', href: 'https://virtualizationreview.com/articles/2025/08/19/mit-report-finds-most-ai-business-investments-fail-reveals-genai-divide.aspx' },
              { label: 'Knak / Datalily, Marketing Production in the Age of AI (2026)', href: 'https://martech.org/ai-speeds-marketing-production-but-measurement-lags/' },
              { label: 'Supermetrics, 2026 Marketing Data Report', href: 'https://supermetrics.com/blog/marketing-data-report-2026' },
            ]}
          />
        </SlideShell>

        {/* ============================ 03 · WHY NOW ============================ */}
        <SlideShell
          id="slide-3"
          index={3}
          kicker="Why Now"
          title="Why Now"
          subtitle="Buyers want outcomes, self-improvement works where feedback is measurable, and governance now decides which agents survive."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                tag: 'Shift 1',
                title: 'Buyers move from assistance to outcomes',
                body: 'Gartner expects over half of enterprises to stop paying for assistive AI like copilots by 2028, in favor of platforms that commit to workflow results. The last mile becomes the product.',
              },
              {
                tag: 'Shift 2',
                title: 'Self-improvement leaves the lab',
                body: 'DeepMind’s AlphaEvolve and the Darwin Gödel Machine improve by scoring candidate changes against external evaluators and keeping the winners. GTM produces that feedback every week: citations, replies, edits.',
              },
              {
                tag: 'Shift 3',
                title: 'Governance decides who survives',
                body: 'Gartner sees 40%+ of agentic AI projects cancelled by end-2027 over cost, value, and risk controls — and calls for proportional, risk-tiered governance instead of all-or-nothing trust.',
              },
            ].map((item, idx) => (
              <Panel key={item.tag} className="flex flex-col p-6">
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="deck-heading text-3xl font-bold leading-none text-clay/35">0{idx + 1}</span>
                  <Eyebrow tone="clay">{item.tag}</Eyebrow>
                </div>
                <h3 className="text-[15px] font-semibold leading-snug text-ink">{item.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-graphite">{item.body}</p>
              </Panel>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Panel accent raised className="p-7 lg:col-span-7">
              <CropMarks />
              <Eyebrow tone="clay">The window</Eyebrow>
              <p className="mt-3 text-[17px] font-medium leading-snug text-ink">
                Capital is already flowing — Profound raised <span className="text-clay">$180M at $1.8B</span> in
                September 2026 to move from AI-visibility analytics to agents. But the race is enterprise-first.{' '}
                <span className="text-clay">Founder teams, SMBs, and agencies</span> feel the last-mile cost most and
                still have no governed agent that ships, measures, and compounds at a price they can pay.
              </p>
            </Panel>

            <Panel className="p-6 lg:col-span-5">
              <Eyebrow>Why go-to-market first</Eyebrow>
              <div className="mt-4 space-y-3">
                {[
                  ['Recurring work', 'The same jobs repeat, so lessons get reused.'],
                  ['Fast feedback', 'Results arrive in days, not quarters.'],
                  ['Reviewable output', 'Every asset is accepted or rejected — auditable.'],
                ].map(([head, body]) => (
                  <div key={head} className="flex items-baseline gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                    <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-clay" aria-hidden="true" />
                    <p className="text-[13px] leading-relaxed text-graphite">
                      <span className="font-semibold text-ink">{head}.</span> {body}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <SlideFootnotes
            items={[
              { label: 'Gartner: outcome-focused workflows (Apr 2026)', href: 'https://www.gartner.com/en/newsroom/press-releases/2026-04-02-gartner-expects-most-enterprises-to-abandon-assistive-ai-for-outcome-focused-workflow-by-2028' },
              { label: 'Gartner: 40% of agentic AI projects cancelled (Jun 2025)', href: 'https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027' },
              { label: 'Gartner: proportional agent governance (May 2026)', href: 'https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure' },
              { label: 'DeepMind AlphaEvolve', href: 'https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/' },
              { label: 'Darwin Gödel Machine (arXiv)', href: 'https://arxiv.org/abs/2505.22954' },
              { label: 'Profound Series D', href: 'https://www.tryprofound.com/newsroom/profound-raises-usd180m-series-d-at-usd1-8b-valuation-to-build-the-ai-platform-for-marketing-teams' },
            ]}
          />
        </SlideShell>

        {/* ============================ 04 · SOLUTION ============================ */}
        <SlideShell
          id="slide-4"
          index={4}
          kicker="Solution"
          title="The RSI Agent"
          subtitle="A self-improving agent team for go-to-market. It ships, measures, and keeps what worked — once you approve."
        >
          <Panel className="p-6">
            <div className="flex items-baseline justify-between gap-4">
              <Eyebrow tone="clay">The RSI loop</Eyebrow>
              <p className="deck-mono text-[8px] uppercase tracking-[0.18em] text-mist">Every cycle starts from the last one</p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
              {rsiLoop.map((step, idx) => (
                <React.Fragment key={step.label}>
                  {idx > 0 ? (
                    <span className="hidden items-center text-clay/50 md:flex">
                      <FlowArrow />
                    </span>
                  ) : null}
                  <div className={`p-4 ${step.label === 'Commit' ? 'border border-clay/50 bg-clay-tint' : 'border border-line bg-paper'}`}>
                    <p className="deck-mono text-[9px] tabular-nums text-mist">0{idx + 1}</p>
                    <p className={`deck-heading mt-2 text-lg font-semibold ${step.label === 'Commit' ? 'text-clay-deep' : 'text-ink'}`}>
                      {step.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-graphite">{step.body}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-mist">
              <span className="deck-mono text-clay">↻</span> Compound feeds the next Run — the loop is the product.
            </p>
          </Panel>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Panel invert accent raised className="p-7 lg:col-span-5">
              <CropMarks />
              <p className="deck-mono text-[9px] font-medium uppercase tracking-[0.24em] text-clay">Governed, not autopilot</p>
              <p className="deck-heading mt-3 text-[1.45rem] font-medium leading-tight text-paper">
                Self-improving, never self-approving.
              </p>
              <div className="mt-5 space-y-3 border-t border-paper/15 pt-4">
                {[
                  ['Risk-tiered review', 'Brand, claims, and spend need a human.'],
                  ['Full ledger', 'Every change is recorded with evidence.'],
                  ['Rollback', 'Any asset can be retired when it stops paying.'],
                ].map(([head, body]) => (
                  <p key={head} className="text-[13px] leading-relaxed text-paper/75">
                    <span className="font-semibold text-paper">{head}.</span> {body}
                  </p>
                ))}
              </div>
            </Panel>

            <Panel className="p-6 lg:col-span-7">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-clay" aria-hidden="true" />
                  <p className="text-sm font-semibold text-ink">RSI Agent</p>
                  <span className="deck-mono text-[9px] text-mist">cycle 07</span>
                </div>
                <span className="deck-mono border border-line px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-mist">
                  Sample cycle · illustrative
                </span>
              </div>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {[
                  ['Run', 'LinkedIn series + 3 GEO fixes shipped'],
                  ['Measure', 'Citations and replies pulled in'],
                  ['Review', '2 defects: weak hook, unsourced claim'],
                  ['Commit', 'New playbook + new pre-ship check'],
                ].map(([step, text]) => (
                  <li key={step} className="grid grid-cols-[84px_1fr] items-baseline gap-3 py-2.5">
                    <span className={`deck-mono text-[9px] uppercase tracking-[0.16em] ${step === 'Commit' ? 'text-clay' : 'text-mist'}`}>{step}</span>
                    <span className={`text-[13px] ${step === 'Commit' ? 'font-semibold text-ink' : 'text-graphite'}`}>{text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-mist">
                Built on the NVIDIA DGX Spark champion agent-team solution; governance follows the ConsenX white paper —
                proposals, evidence, review, and rollback for every durable change.
              </p>
            </Panel>
          </div>
        </SlideShell>

        {/* ============================ 05 · PRODUCT ============================ */}
        <SlideShell
          id="slide-5"
          index={5}
          kicker="Product"
          title="The Last Mile, End to End"
          subtitle="Signal, execution, and the loop that learns from both. Signal and execution are live; the RSI Agent runs in forward-deployed pilots."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                role: 'Signal',
                name: 'GeoCompanion',
                mode: 'Live · Self-serve',
                promise: 'See how AI engines read your brand — and what to fix.',
                points: ['AI visibility audits with prioritized fixes', 'Schema, CTA, and article opportunities', 'Browser-agent (WebMCP) audit preparation'],
                Icon: Search,
                hot: false,
              },
              {
                role: 'Execution',
                name: 'Launchvibes',
                mode: 'Live · Self-serve',
                promise: 'Hooks and campaigns for founder-led growth.',
                points: ['Platform-native hooks, posts, and campaigns', 'Drafting workspace and role-model planning', 'Hand-off into native social composers'],
                Icon: Sparkles,
                hot: false,
              },
              {
                role: 'Learning',
                name: 'RSI Agent',
                mode: 'Pilot · Forward-deployed',
                promise: 'Runs recurring GTM work and keeps what worked.',
                points: ['Campaign execution across channels', 'Outcome measurement and review', 'Governed learning ledger, human-approved'],
                Icon: Bot,
                hot: true,
              },
            ].map(({ role, name, mode, promise, points, Icon, hot }) => (
              <Panel key={name} accent={hot} invert={hot} className="flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className={`deck-mono px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] ${hot ? 'bg-paper/10 text-paper' : 'bg-paper text-graphite'}`}>{role}</span>
                  <span className="deck-mono text-[8px] uppercase tracking-[0.16em] text-clay">{mode}</span>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${hot ? 'text-clay' : 'text-clay'}`} aria-hidden="true" />
                  <h3 className={`deck-heading text-xl font-semibold tracking-tight ${hot ? 'text-paper' : 'text-ink'}`}>{name}</h3>
                </div>
                <p className={`mt-2 text-[13px] leading-relaxed ${hot ? 'text-paper/80' : 'text-graphite'}`}>{promise}</p>
                <ul className={`mt-4 space-y-2 border-t pt-4 ${hot ? 'border-paper/15' : 'border-line'}`}>
                  {points.map((pt) => (
                    <li key={pt} className={`flex gap-2 text-xs leading-relaxed ${hot ? 'text-paper/75' : 'text-graphite'}`}>
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-clay" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>

          <Panel className="mt-4 p-6">
            <div className="mb-2 hidden gap-2 md:grid md:grid-cols-5">
              <p className="deck-mono col-span-2 text-[8px] uppercase tracking-[0.18em] text-mist">Where point tools hand off</p>
              <p className="deck-mono col-span-3 text-[8px] uppercase tracking-[0.18em] text-clay">The last mile — where Florus keeps going</p>
            </div>
            <div className="grid items-end gap-2 md:grid-cols-5">
              {[
                { step: 'Diagnose', by: 'GeoCompanion' },
                { step: 'Draft', by: 'Launchvibes' },
                { step: 'Ship', by: 'RSI Agent', last: true },
                { step: 'Measure', by: 'RSI Agent', last: true },
                { step: 'Learn', by: 'RSI Agent', last: true },
              ].map(({ step, by, last }) => (
                <div key={step} className={`border-t-2 pt-2.5 ${last ? 'border-clay' : 'border-ink/20'}`}>
                  <p className="deck-heading text-[15px] font-semibold text-ink">{step}</p>
                  <p className="deck-mono mt-0.5 text-[8px] uppercase tracking-[0.16em] text-mist">{by}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-graphite">
              Point tools stop at the dashboard or the draft. Florus carries the work through shipping and measurement,
              then commits what it learned — voice, ICP, objections, winning hooks — so the next cycle starts ahead.
            </p>
          </Panel>
        </SlideShell>

        {/* ============================ 06 · API + MCP ============================ */}
        <SlideShell
          id="slide-6"
          index={6}
          kicker="API + MCP"
          title="One Core, Every Agent"
          subtitle="Blueprint V5.3 freezes the contract for a metered API and MCP business: one Content Core behind our apps, AI agents, and partner surfaces."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            {/* Service boundary, as drawn in the blueprint (§02) */}
            <Panel className="p-6 lg:col-span-7">
              <Eyebrow>Service boundary</Eyebrow>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {['GeoCompanion', 'Launchvibes', 'AI agents · MCP hosts', 'Partner apps · REST / SDK'].map((surface) => (
                  <div key={surface} className="border border-line bg-paper px-3 py-2.5 text-center">
                    <p className="text-[12px] font-medium leading-snug text-ink">{surface}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-1.5 text-mist" aria-hidden="true">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M4 0v11M4 11l-3-3M4 11l3-3" stroke="currentColor" strokeWidth="1" /></svg>
              </div>
              <div className="border border-ink/25 bg-hull px-4 py-3 text-center">
                <p className="deck-heading text-[15px] font-semibold text-ink">API / MCP Policy Gateway</p>
                <p className="deck-mono mt-1 text-[8px] uppercase tracking-[0.16em] text-mist">Signed quote · idempotency · payment adapter · audit</p>
              </div>
              <div className="flex justify-center py-1.5 text-mist" aria-hidden="true">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M4 0v11M4 11l-3-3M4 11l3-3" stroke="currentColor" strokeWidth="1" /></svg>
              </div>
              <div className="relative bg-ink px-4 py-4">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-clay" aria-hidden="true" />
                <p className="deck-heading text-center text-[15px] font-semibold text-paper">Florus Content Core</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {['Context graph', 'Capability & recipe runtime', 'Durable jobs', 'Artifact store', 'Billing ledger'].map((part) => (
                    <span key={part} className="deck-mono border border-paper/20 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-paper/80">
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel invert accent className="flex flex-col p-6 lg:col-span-5">
              <p className="deck-mono text-[9px] font-medium uppercase tracking-[0.24em] text-clay">Where it stands</p>
              <div className="mt-4 flex-1 space-y-4">
                {[
                  ['Contract frozen', 'Blueprint V5.3 (Aug 2026): candidate contract across Florus, GeoCompanion, Launchvibes, and social-factories, with 34 decisions listed for approval. Not yet built.'],
                  ['Already live', '10 WebMCP browser tools across GeoCompanion, Launchvibes, and Florus (Sep 2026). Agents can discover, prepare, and read; paid work stays human-submitted.'],
                  ['Build plan', 'Eight milestones (M0–M7), sized at 8–14 weeks in the blueprint, scheduled for Phase 1 of the roadmap.'],
                ].map(([head, body]) => (
                  <div key={head} className="border-l-2 border-clay/60 pl-3">
                    <p className="text-[13px] font-semibold text-paper">{head}</p>
                    <p className="mt-1 text-xs leading-relaxed text-paper/70">{body}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ['One source of truth', 'REST, MCP, SDKs, and our own apps hit the same runtime, jobs, artifacts, and ledger. A fix or policy change lands once.'],
              ['Context that can be checked', 'Every call is Actor / Subject / Source / Intent: facts verified, sources snapshotted and rights-checked, voice guarded.'],
              ['Plan before execute', 'campaign.plan → choose briefs → campaign.generate. The expensive step is explicitly authorized — essential when an agent is the caller.'],
              ['Agent-native MCP', '10 tools in Core, Campaign, and Replies packs behind one public URL with OAuth. Targets MCP 2026-07-28 with async Tasks.'],
              ['Recipes, not endpoints', 'Verticals ship as signed, versioned recipes, so a new use case needs no contract change. No raw prompts or models are exposed.'],
              ['Metered on its own ledger', 'SKU per format, priced above a P95 cost floor — e.g. a social post ~$1.00 single, $0.25/unit at 50 (provisional). Never mixed with SaaS credits.'],
            ].map(([head, body], idx) => (
              <div key={head} className="border-l-2 border-line bg-hull p-4">
                <div className="flex items-baseline gap-2">
                  <span className="deck-mono text-[9px] tabular-nums text-clay">{String(idx + 1).padStart(2, '0')}</span>
                  <p className="text-[13px] font-semibold text-ink">{head}</p>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-graphite">{body}</p>
              </div>
            ))}
          </div>
        </SlideShell>

        {/* ============================ 07 · MARKET ============================ */}
        <SlideShell
          id="slide-7"
          index={7}
          kicker="Market"
          title="Market Size"
          subtitle="Self-improving GTM agents sit where four fast-growing markets converge."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <Panel className="overflow-x-auto p-6 lg:col-span-7">
              <Eyebrow className="mb-4">Converging markets</Eyebrow>
              <table className="deck-table min-w-[420px]">
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>Size</th>
                    <th>Growth Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {marketRows.map((row) => (
                    <tr key={row.market}>
                      <td className="cell-key">{row.market}</td>
                      <td>{row.size}</td>
                      <td className="cell-win">{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel invert className="p-7 lg:col-span-5">
              <p className="deck-mono text-[9px] uppercase tracking-[0.24em] text-paper/75">Market focus</p>
              <div className="mt-6 space-y-5">
                {[
                  { label: 'TAM', value: '$87B', width: 100 },
                  { label: 'SAM', value: '$12B', width: 38 },
                  { label: 'Creator / SMB', value: '$6B', width: 24 },
                  { label: 'SOM · Year 3', value: '$150M', width: 8 },
                ].map((bar, idx) => (
                  <div key={bar.label}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="deck-mono text-[9px] uppercase tracking-[0.16em] text-paper/55">{bar.label}</span>
                      <span className={`deck-heading text-sm font-bold tabular-nums ${idx === 3 ? 'text-clay' : 'text-paper'}`}>{bar.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-paper/15">
                      <div className={`h-full ${idx === 3 ? 'bg-clay' : 'bg-paper/45'}`} style={{ width: `${bar.width}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              ['TAM', '$87B', 'Global software market for marketing intelligence, content SaaS, and creator tools.'],
              ['SAM', '$12B', 'AI-first marketing tools for SMB through enterprise.'],
              ['Creator/SMB sub-TAM', '$6B', 'Serviceable market focused on creators and SMBs, excluding enterprise-heavy spend.'],
              ['SOM (Year 3)', '$150M', 'Under 1.5% SAM penetration target.'],
            ].map(([label, value, desc], idx) => (
              <Figure key={label} label={label} value={value} note={desc} accent={idx === 3} />
            ))}
          </div>

          <SlideFootnotes
            items={[
              { label: 'MarketsandMarkets, AI Agents Market (2025–2030)', href: 'https://www.marketsandmarkets.com/Market-Reports/ai-agent-market-15761548.html' },
            ]}
          />
        </SlideShell>

        {/* ============================ 08 · COMPETITION ============================ */}
        <SlideShell
          id="slide-8"
          index={8}
          kicker="Competition"
          title="Why We're Different"
          subtitle="Everyone is racing from dashboards to agents. We are built for the part they leave behind: shipping, measuring, and governed learning."
        >
          <Panel className="overflow-x-auto p-5">
            <table className="deck-table deck-table--rows min-w-[860px]">
              <thead>
                <tr>
                  <th style={{ width: '19%' }}>Category</th>
                  <th style={{ width: '21%' }}>Examples</th>
                  <th style={{ width: '30%' }}>Built for</th>
                  <th style={{ width: '30%' }}>Where it stops</th>
                </tr>
              </thead>
              <tbody>
                {competitorRows.map((row) => {
                  const us = row.category === 'Florus';
                  return (
                    <tr key={row.category} className={us ? 'row-us' : undefined}>
                      <td className="cell-key">{row.category}</td>
                      <td>{row.examples}</td>
                      <td>{row.builtFor}</td>
                      <td className={us ? 'cell-win' : undefined}>{row.stops}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Panel>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ['Owns the last mile', 'Signal, execution, shipping, and measurement in one loop — not a dashboard, not a draft.'],
              ['Self-improving, never self-approving', 'Lessons become governed assets — memory, playbooks, checks, routing — with approval, a ledger, and rollback.'],
              ['A claim we’ll be held to', 'Accepted assets per dollar should rise every cycle. Falsifiable, with the method published in the ConsenX white paper.'],
            ].map(([head, body], idx) => (
              <Panel key={head} accent={idx === 1} className="p-5">
                <div className="flex items-baseline gap-3">
                  <span className="deck-heading text-2xl font-bold leading-none text-clay/35">0{idx + 1}</span>
                  <h3 className="text-sm font-semibold text-ink">{head}</h3>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-graphite">{body}</p>
              </Panel>
            ))}
          </div>

          <SlideFootnotes
            items={[
              { label: 'Profound Series D: from analytics to agents (Sep 2026)', href: 'https://www.tryprofound.com/newsroom/profound-raises-usd180m-series-d-at-usd1-8b-valuation-to-build-the-ai-platform-for-marketing-teams' },
            ]}
          />
        </SlideShell>

        {/* ============================ 09 · MOAT ============================ */}
        <SlideShell
          id="slide-9"
          index={9}
          kicker="Moat"
          title="What Compounds"
          subtitle="Coordination spend should behave like capex: pay once to create an asset that makes every future run cheaper."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <Panel accent raised className="p-6 lg:col-span-7">
              <CropMarks />
              <div className="flex items-baseline justify-between gap-3">
                <Eyebrow tone="clay">Governance-alpha hypothesis</Eyebrow>
                <span className="deck-mono border border-line px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-mist">Illustrative</span>
              </div>
              <div className="mt-4">
                <CompoundingChart />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-mist">
                Ungoverned agents re-reason every run; a governed loop reuses what it committed, so cost per accepted
                asset should fall each cycle. Illustrative until a measurement report is published.
              </p>
            </Panel>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
              {rsiAssets.map((asset) => (
                <Panel key={asset.title} className="p-5">
                  <p className="deck-mono text-[8px] uppercase tracking-[0.2em] text-clay">{asset.label}</p>
                  <h3 className="deck-heading mt-2 text-base font-semibold text-ink">{asset.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-graphite">{asset.body}</p>
                </Panel>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Panel invert className="flex flex-col justify-center p-6 lg:col-span-5">
              <p className="deck-heading text-[1.15rem] font-medium leading-snug text-paper">
                Spend <span className="text-clay">$5</span> of review today on a playbook that cuts the next run from{' '}
                <span className="text-clay">$5 to $0.50</span>. If an asset stops paying, it is retired.
              </p>
              <p className="deck-mono mt-3 text-[8px] uppercase tracking-[0.18em] text-paper/55">Worked example · ConsenX white paper</p>
            </Panel>

            <Panel className="p-6 lg:col-span-7">
              <Eyebrow>What we instrument</Eyebrow>
              <div className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  ['Accepted assets per dollar', 'The headline number.'],
                  ['Repeat-defect rate', 'Does a fixed mistake stay fixed?'],
                  ['Asset reuse', 'Are playbooks actually being used?'],
                  ['Human override rate', 'How often you have to step in.'],
                ].map(([metric, gloss], idx) => (
                  <div key={metric} className="border-l-2 border-clay/40 pl-3">
                    <p className={`text-[13px] font-semibold ${idx === 0 ? 'text-clay-deep' : 'text-ink'}`}>{metric}</p>
                    <p className="mt-0.5 text-xs text-mist">{gloss}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-graphite">
                The moat is each customer’s governed asset library: it belongs to them, and it gets more valuable every
                cycle they run.
              </p>
            </Panel>
          </div>
        </SlideShell>

        {/* ============================ 10 · TRACTION ============================ */}
        <SlideShell
          id="slide-10"
          index={10}
          kicker="Traction"
          title="Early Signal"
          subtitle="Two self-serve products live, a paying customer, and the RSI Agent in forward-deployed pilots."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-4 lg:col-span-9 lg:grid-cols-4">
              {[
                { label: 'Activation Rate', value: '75%', Icon: DollarSign, accent: true },
                { label: 'Active Users', value: '571', Icon: Users, accent: false },
                { label: 'Search Events', value: '5,100+', Icon: BarChart3, accent: false },
                { label: 'Website Visitors', value: '832', Icon: Search, accent: false },
              ].map(({ label, value, Icon, accent }) => (
                <Panel key={label} accent={accent} className="p-5">
                  <Icon className={`h-4 w-4 ${accent ? 'text-clay' : 'text-mist'}`} aria-hidden="true" />
                  <Eyebrow className="mt-3">{label}</Eyebrow>
                  <p className={`deck-heading mt-2 text-[2rem] font-semibold leading-none tabular-nums tracking-tight ${accent ? 'text-clay' : 'text-ink'}`}>
                    {value}
                  </p>
                </Panel>
              ))}
            </div>

            <Panel invert className="flex flex-col justify-center p-5 lg:col-span-3">
              <p className="deck-mono text-[9px] uppercase tracking-[0.22em] text-paper/75">Paid customer</p>
              <p className="deck-heading mt-2 text-3xl font-bold tracking-tight text-paper">VirgoCX</p>
              <p className="mt-2 text-xs leading-relaxed text-paper/70">Chose GeoCompanion and Launchvibes for social marketing, July 2026.</p>
            </Panel>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Panel className="p-6 lg:col-span-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="deck-heading text-base font-semibold text-ink">Shipping the last mile</h3>
                <span className="deck-mono text-[8px] uppercase tracking-[0.16em] text-mist">Jul → Oct 2026</span>
              </div>
              <ol className="mt-4 space-y-0">
                {shippedRows.map((row, idx) => (
                  <li key={row.what} className="relative flex gap-4 pb-3 last:pb-0">
                    {idx < shippedRows.length - 1 ? <span className="absolute left-[3px] top-3 h-full w-px bg-line" aria-hidden="true" /> : null}
                    <span className={`relative z-10 mt-1.5 h-[7px] w-[7px] shrink-0 rounded-full ${row.lastMile ? 'bg-clay' : 'bg-ink/30'}`} aria-hidden="true" />
                    <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
                      <p className={`text-[13px] leading-snug ${row.lastMile ? 'font-semibold text-ink' : 'text-graphite'}`}>{row.what}</p>
                      <p className="deck-mono text-[8px] uppercase tracking-[0.14em] text-mist">
                        {row.when} · {row.product}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>

            <div className="space-y-4 lg:col-span-5">
              <Panel accent className="p-5">
                <Eyebrow tone="clay">Accelerator & startup programs</Eyebrow>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                  {programs.map((p) => (
                    <div key={p.name}>
                      <p className="deck-heading text-[15px] font-semibold leading-tight tracking-tight text-ink">{p.name}</p>
                      <p className="deck-mono mt-0.5 text-[8px] uppercase tracking-[0.14em] text-mist">{p.status ?? 'Program member'}</p>
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel className="p-5">
                <Eyebrow>Client proof · GTM, messaging, and content work</Eyebrow>
                <p className="mt-2.5 text-[13px] font-medium leading-relaxed text-ink">Honeypot Finance · Splatter Protocol · Toro · 1DAO</p>
              </Panel>
            </div>
          </div>

          <p className="mt-4 border-l-2 border-clay pl-5 text-[13px] leading-relaxed text-graphite">
            <span className="font-semibold text-clay">75% activation</span>, 7 searches per active user, 68% active-user
            growth, and nearly 2× search events since the prior window — all with zero paid acquisition.
          </p>
        </SlideShell>

        {/* ============================ 11 · MODEL ============================ */}
        <SlideShell
          id="slide-11"
          index={11}
          kicker="Model"
          title="Business Model"
          subtitle="Forward-deployed engineering is the core business: we deploy the RSI Agent into each client ourselves. Self-serve feeds it; metered API + MCP follows."
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <Panel invert accent raised className="p-7 lg:col-span-6">
              <CropMarks />
              <div className="flex items-baseline justify-between">
                <span className="deck-heading text-3xl font-bold leading-none text-clay">01</span>
                <span className="deck-mono bg-clay px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-paper">Primary · Now</span>
              </div>
              <h3 className="deck-heading mt-4 text-xl font-semibold text-paper">Forward-deployed RSI Agent</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-paper/80">
                Our engineers deploy the RSI Agent into a client’s GTM stack — channels, data, and review workflow — and
                run it with them. Priced per deployment by the workflows it runs.
              </p>
              <ul className="mt-4 space-y-2 border-t border-paper/15 pt-4">
                {[
                  'Revenue from day one of a deployment, not after self-serve adoption',
                  'Hands-on deployments are where we learn what to productize next',
                  'Each client keeps its governed asset library — memory, playbooks, checks',
                ].map((pt) => (
                  <li key={pt} className="flex gap-2 text-xs leading-relaxed text-paper/75">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-clay" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Panel>

            <div className="grid gap-4 lg:col-span-6">
              {[
                {
                  step: '02',
                  title: 'Self-serve SaaS',
                  when: 'Now · Funnel',
                  body: 'GeoCompanion and Launchvibes — free trial, then $15/month (Starter) and $35/month (Pro). Surfaces the teams that need a deployment.',
                },
                {
                  step: '03',
                  title: 'Metered API + MCP',
                  when: 'Phase 1',
                  body: 'An independent metered business on its own ledger: SKU per format, prepaid packs, API balance, or invoice. Never converts with SaaS credits.',
                },
              ].map((item) => (
                <Panel key={item.title} className="p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="deck-heading text-2xl font-bold leading-none text-clay/25">{item.step}</span>
                    <span className="deck-mono border border-line px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-mist">{item.when}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-graphite">{item.body}</p>
                </Panel>
              ))}
            </div>
          </div>

          <Panel className="mt-4 p-6">
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow tone="clay">The FDE trap — and how we avoid it</Eyebrow>
                <p className="mt-3 text-[13px] leading-relaxed text-graphite">
                  Gartner expects <span className="font-semibold text-ink">70% of enterprises</span> to abandon agentic AI
                  built by vendor FDE by 2028, trapped by cost and unable to evolve it — and{' '}
                  <span className="font-semibold text-ink">fewer than 20%</span> of FDE engagements to turn recurring
                  needs into core product.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:col-span-7">
                {[
                  ['One product, deployed', 'We deploy the same RSI Agent to every client — not a bespoke build per engagement.'],
                  ['Client owns the assets', 'Memory, playbooks, and checks belong to the client, with a clean exit.'],
                  ['Recurring needs ship to core', 'What repeats across deployments becomes product, not one-off code.'],
                ].map(([head, body]) => (
                  <div key={head} className="border-l-2 border-clay/40 pl-3">
                    <p className="text-[13px] font-semibold text-ink">{head}</p>
                    <p className="mt-1 text-xs leading-relaxed text-graphite">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <SlideFootnotes
            items={[
              { label: 'Gartner: vendor FDE and agentic AI (Sep 2026)', href: 'https://www.gartner.com/en/newsroom/press-releases/2026-09-29-gartner-predicts-70-percent-of-enterprises-will-abandon-agentic-ai-built-by-vendor-forward-deployed-engineering-by-2028' },
            ]}
          />
        </SlideShell>

        {/* ============================ 12 · ROADMAP ============================ */}
        <SlideShell
          id="slide-12"
          index={12}
          kicker="Roadmap"
          title="Roadmap"
          subtitle="Go-to-market first. Then the governed learning layer for any team that runs agents."
        >
          <Panel className="p-6">
            <div className="grid gap-0 md:grid-cols-3">
              {roadmapRows.map((item, idx) => {
                const Icon = [Rocket, Server, Activity][idx];
                return (
                  <article
                    key={item.phase}
                    className="relative border-t-2 border-clay/25 pt-5 md:border-l md:border-t-0 md:border-l-line md:pl-6 md:pt-0 md:first:border-l-0 md:first:pl-0"
                  >
                    <div className="flex items-center justify-between gap-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
                        <Eyebrow tone="clay">{item.phase}</Eyebrow>
                      </div>
                      <span className={`deck-mono px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] ${idx === 0 ? 'bg-clay text-paper' : 'border border-line text-mist'}`}>
                        {item.round}
                      </span>
                    </div>
                    <p className="deck-mono mt-3 text-[9px] uppercase tracking-[0.14em] text-mist">{item.when}</p>
                    <p className="deck-heading mt-2 text-base font-semibold leading-snug text-ink">{item.ships}</p>
                    <p className="mt-2 pr-4 text-[13px] leading-relaxed text-graphite">{item.target}</p>
                  </article>
                );
              })}
            </div>
          </Panel>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Panel accent raised className="p-6 lg:col-span-7">
              <CropMarks />
              <Eyebrow tone="clay">Why this sequence</Eyebrow>
              <p className="mt-3 text-[15px] font-medium leading-snug text-ink">
                GTM is the proving ground. The governance underneath — proposals, evidence, review, ledger, rollback —
                is runtime-agnostic, so the asset that compounds in marketing extends to any recurring agent work.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['SelfAgent', 'LangGraph', 'AutoGen / AG2', 'CrewAI', 'Temporal / Restate'].map((rt) => (
                  <span key={rt} className="deck-mono border border-line bg-paper px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-graphite">
                    {rt}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel invert className="flex flex-col justify-center p-6 lg:col-span-5">
              <p className="text-[13px] leading-relaxed text-paper/80">
                Phase 0 is intentional. Every GTM cycle produces governed outcome data — the asset the API and the
                learning layer are built on. We widen the surface around the same core; we do not pivot away from it.
              </p>
            </Panel>
          </div>
        </SlideShell>

        {/* ============================ 13 · TEAM ============================ */}
        <SlideShell
          id="slide-13"
          index={13}
          kicker="Team"
          title="Team"
          subtitle="Agent architecture, product execution, and ecosystem growth at the core."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Panel key={member.name} className="flex h-full flex-col p-7">
                <div className="flex items-start gap-5">
                  <TeamAvatar member={member} />
                  <div className="pt-1">
                    <h3 className="deck-heading text-2xl font-bold leading-none tracking-tight text-ink">{member.name}</h3>
                    <span className="mt-3 block h-[2px] w-8 bg-clay" aria-hidden="true" />
                    <p className="deck-mono mt-3 text-[9px] uppercase leading-relaxed tracking-[0.18em] text-mist">
                      {member.role}
                    </p>
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-graphite transition-colors hover:text-clay"
                      >
                        <Linkedin className="h-3 w-3" aria-hidden="true" />
                        LinkedIn
                      </a>
                    ) : null}
                  </div>
                </div>

                <p className="mt-6 border-t border-line pt-5 text-[12.5px] leading-relaxed text-graphite">{member.body}</p>
              </Panel>
            ))}
          </div>

          <p className="mt-5 border-l-2 border-clay pl-5 text-[13px] leading-relaxed text-graphite">
            Most marketing AI startups are either engineering-led or distribution-led. Florus combines deep
            engineering, founder-level product execution, and content science built into the product itself.
          </p>
        </SlideShell>

        {/* ============================ 14 · THE ASK ============================ */}
        <SlideShell
          id="slide-14"
          index={14}
          kicker="The Ask"
          title="The Ask"
          subtitle="Raising a focused pre-seed to ship the RSI Agent and deploy it to clients ourselves."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <Panel className="p-7 lg:col-span-5">
              <Eyebrow>Use of funds</Eyebrow>

              <div className="mt-5 flex h-2 w-full overflow-hidden">
                {[
                  { pct: 70, tone: 'bg-clay' },
                  { pct: 30, tone: 'bg-ink' },
                ].map((seg, idx) => (
                  <span key={`${seg.pct}-${idx}`} className={`block h-full ${seg.tone}`} style={{ width: `${seg.pct}%` }} />
                ))}
              </div>

              <div className="mt-5 space-y-3.5">
                {askRows.map((row, idx) => {
                  const pct = Number.parseInt(row.allocation, 10) || 0;
                  const Icon = [Cpu, Target][idx] ?? Activity;
                  const tone = ['bg-clay', 'bg-ink'][idx];
                  return (
                    <div key={row.allocation} className="border-b border-line pb-3.5 last:border-0 last:pb-0">
                      <div className="mb-1.5 flex items-center gap-2.5">
                        <span className={`h-2 w-2 shrink-0 ${tone}`} aria-hidden="true" />
                        <Icon className="h-3.5 w-3.5 shrink-0 text-mist" aria-hidden="true" />
                        <p className="text-sm font-semibold text-ink">{row.allocation.replace(/^\d+% /, '')}</p>
                        <span className="deck-mono ml-auto text-[10px] font-bold tabular-nums text-clay">{pct}%</span>
                      </div>
                      <p className="pl-[18px] text-xs leading-relaxed text-graphite">{row.use}</p>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <div className="space-y-4 lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Raise', value: '$800K', detail: 'Pre-seed: 70% engineering, 30% forward-deployed engineering', Icon: Rocket, hot: true },
                  { title: 'First milestone', value: 'Shippable RSI Agent', detail: 'Governed learning, review and rollback, and measurement — ready to deploy', Icon: CheckCircle2, hot: false },
                  { title: 'Business model', value: 'FDE', detail: 'We deploy the RSI Agent into each client ourselves and grow toward $100K MRR', Icon: Building2, hot: false },
                ].map(({ title, value, detail, Icon, hot }) => (
                  <Panel key={title} accent={hot} className="p-5">
                    <Icon className={`h-4 w-4 ${hot ? 'text-clay' : 'text-mist'}`} aria-hidden="true" />
                    <Eyebrow className="mt-4">{title}</Eyebrow>
                    <p className={`deck-heading mt-2 text-xl font-bold leading-tight tracking-tight ${hot ? 'text-clay' : 'text-ink'}`}>{value}</p>
                    <p className="mt-2 text-[11px] leading-relaxed text-graphite">{detail}</p>
                  </Panel>
                ))}
              </div>

              <Panel accent raised className="p-7">
                <CropMarks />
                <p className="text-[15px] leading-relaxed text-ink">
                  We are raising <span className="font-semibold text-clay">$800K</span>. Seventy percent goes to
                  engineering for the first milestone — a shippable RSI Agent. Thirty percent funds the forward-deployed
                  engineers who put it to work inside client GTM stacks: our primary business model, and the fastest
                  path from a shipped agent to revenue.
                </p>
                <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-graphite">
                  We are building alongside {programs.map((p) => p.name).join(', ').replace(/, ([^,]*)$/, ', and $1')}.
                </p>
              </Panel>

              <div className="flex flex-wrap items-center gap-3">
                <span className="deck-mono inline-flex border border-line px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-graphite">
                  Raise: $800K
                </span>
                <span className="deck-mono inline-flex border border-line px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-graphite">
                  RSI for go-to-market
                </span>
                <a
                  href="mailto:hello@florus.ai"
                  className="deck-mono inline-flex items-center gap-2 bg-clay px-4 py-1.5 text-[9px] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-clay-deep"
                >
                  <Mail className="h-3 w-3" aria-hidden="true" />
                  hello@florus.ai
                </a>
              </div>
            </div>
          </div>

          <SlideFootnotes
            items={[
              { label: 'NVIDIA Inception (program reference)', href: 'https://www.nvidia.com/en-us/startups/' },
              { label: 'AltaLab announcement', href: 'https://www.linkedin.com/posts/florus-labs-inc_florus-altalab-aistartups-activity-7503163369735020545-wNY4' },
              { label: 'Startup Foundry announcement', href: 'https://www.linkedin.com/posts/florus-labs-inc_startupfoundry-startups-ai-activity-7498976703935885312-z0yd' },
              { label: 'LvlUp Ventures (program reference)', href: 'https://www.lvlup.vc/' },
            ]}
          />
        </SlideShell>
      </main>
    </div>
  );
};

export default PitchDeckPage;
