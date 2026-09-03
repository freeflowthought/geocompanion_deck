import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronDown, Sparkles, Radar, Bot, ShieldCheck, BarChart3, Users, Search, DollarSign, Building2, Handshake, Rocket, Target, Activity, Wallet, Cpu, Server, CheckCircle2, Linkedin, Mail } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import wilsonImage from './team/wilson_image_optimized.jpg';
import huanImage from './team/huan_image.jpg';
import amandaImage from './team/amanda_image.jpg';

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

const TOTAL_SLIDES = 13;

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

type HookWeight = {
  label: string;
  weight: number;
};

type PublicAgentCardProps = {
  name: string;
  cloud: string;
  context: string;
  hooks: HookWeight[];
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  photoPosition: string;
  linkedin?: string;
  body: string;
};

const HookWeightBar = ({ label, weight }: HookWeight) => (
  <div>
    <div className="mb-1 flex items-baseline justify-between">
      <span className={`deck-mono text-[9px] uppercase tracking-[0.16em] ${T.body}`}>{label}</span>
      <span className="deck-mono text-[9px] font-bold tabular-nums text-clay">{Math.round(weight * 100)}</span>
    </div>
    <div className="h-1.5 w-full overflow-hidden bg-ink/10">
      <div className="h-full bg-clay" style={{ width: `${weight * 100}%` }} />
    </div>
  </div>
);

const PublicAgentCard = ({ name, cloud, context, hooks }: PublicAgentCardProps) => (
  <Panel className="h-full p-4">
      <div className="mb-3.5 flex items-start justify-between gap-3">
        <div>
        <p className={`deck-heading text-xl font-semibold uppercase tracking-tight ${T.heading}`}>{name}</p>
        <p className={`mt-1.5 text-xs leading-relaxed ${T.muted}`}>{context}</p>
        </div>
        <span className="deck-mono shrink-0 border border-clay/40 px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] text-clay">
          {cloud}
        </span>
      </div>
    <div className="space-y-2">
      {hooks.map((hook) => (
        <HookWeightBar key={hook.label} {...hook} />
      ))}
    </div>
  </Panel>
);

const teamMembers: TeamMember[] = [
  {
    name: 'Wilson',
    role: 'Founder & Architect',
    photo: wilsonImage,
    photoAlt: 'Portrait of Wilson',
    photoPosition: 'center 18%',
    linkedin: 'https://www.linkedin.com/in/wilson-wu-6a08893ba/',
    body: 'Serial technical founder with two exits. Raised $1.6M in venture capital and generated $1.3M in product revenue at Honeypot Finance. Previously Co-Founder/CTO at Antslabor (acquired; ranked Top 30 most innovative startups in Canada) and Senior Software Architect at Mastodon, one of the largest decentralized social infrastructure projects in production. Brings a rare combination of product engineering depth, agent architecture experience, and prior fundraising across Web2 and Web3.',
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

const competitorRows = [
  {
    category: 'AI citation visibility & scoring',
    BrightEdge: 'Partial',
    hootsuite: 'No',
    semrush: 'Partial',
    jasper: 'No',
    Florus: 'Yes',
  },
  {
    category: 'Deployable code fixes',
    BrightEdge: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    Florus: 'Yes',
  },
  {
    category: 'Platform-native content',
    BrightEdge: 'No',
    hootsuite: 'Scheduling only',
    semrush: 'No',
    jasper: 'Generic',
    Florus: 'Yes (hook-based)',
  },
  {
    category: 'Agent API (machine-to-machine)',
    BrightEdge: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    Florus: 'Yes (Phase 1)',
  },
  {
    category: 'Open infra / ecosystem model',
    BrightEdge: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    Florus: 'Yes',
  },
  {
    category: 'Entry price',
    BrightEdge: '$12K+/yr',
    hootsuite: '$99/mo',
    semrush: '$130/mo',
    jasper: '$39/mo',
    Florus: 'Beta free → <$15/mo starter',
  },
];

const marketRows = [
  {
    market: 'AI Search & Answer Optimization',
    size: '~$1B today → $10B+',
    growth: '40%+ CAGR',
  },
  {
    market: 'Creator Economy + Social Tools',
    size: '$214B–$314B',
    growth: '22% CAGR',
  },
  {
    market: 'Marketing AI SaaS',
    size: '~$8B today → $20B+',
    growth: '20% CAGR',
  },
];

const buildPathRows = [
  {
    phase: 'Phase 0',
    when: 'Now → Q2 2026',
    ships: 'Hook Intelligence + Content Execution',
    target: '1,500+ users, 10K+ search events, 50 creator accounts, and first 10 paying teams.',
  },
  {
    phase: 'Phase 1–2',
    when: 'Q3 2026 → Q4 2027',
    ships: 'API + MCP + Custom Agents',
    target: '$100K MRR, 25+ agency customers, 500 creator accounts, and upmarket expansion.',
  },
  {
    phase: 'Phase 3–4',
    when: '2028+',
    ships: 'Open Marketplace + Fee Sharing',
    target: '$50M+ ARR, 120+ enterprise customers, 5,000 creator accounts, and verified infrastructure.',
  },
];

const flywheelRows = [
  {
    title: 'Diagnose',
    body: 'Run a visibility audit to surface where AI assistants ignore your brand, why, and what to fix first.',
    Icon: Radar,
  },
  {
    title: 'Create',
    body: 'Turn those gaps into platform-native hooks, campaigns, and content systems.',
    Icon: Sparkles,
  },
  {
    title: 'Deploy',
    body: 'Ship through SaaS workflows today, then expand into API, desktop, and CLI workflows as usage matures.',
    Icon: Rocket,
  },
  {
    title: 'Learn',
    body: 'Outcome data improves recommendations, routing, and the future plugin and agent ecosystem.',
    Icon: Activity,
  },
];

const askRows = [
  {
    allocation: '40% Engineering',
    use: 'Backend API, provider-agnostic model runtime, agent orchestration, and the Phase 2 intelligence pipeline',
  },
  {
    allocation: '30% GTM',
    use: 'Enterprise pilot acquisition, creator onboarding, agency partnerships',
  },
  {
    allocation: '20% Infrastructure',
    use: 'Multi-model API costs, cloud, data pipeline, and analytics infrastructure',
  },
  {
    allocation: '10% Product Ops',
    use: 'Customer feedback loops, analytics instrumentation, onboarding, and the operational systems needed to turn beta usage into repeatable retention',
  },
];

const slideMeta: { id: string; kicker: string }[] = [
  { id: 'slide-1', kicker: 'Cover' },
  { id: 'slide-2', kicker: 'Problem' },
  { id: 'slide-3', kicker: 'Why Now' },
  { id: 'slide-4', kicker: 'Product' },
  { id: 'slide-5', kicker: 'Market' },
  { id: 'slide-6', kicker: 'Competition' },
  { id: 'slide-7', kicker: 'Vision' },
  { id: 'slide-8', kicker: 'Ecosystem' },
  { id: 'slide-9', kicker: 'Traction' },
  { id: 'slide-10', kicker: 'Model' },
  { id: 'slide-11', kicker: 'Flywheel' },
  { id: 'slide-12', kicker: 'Team' },
  { id: 'slide-13', kicker: 'The Ask' },
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
          {/* a single warm wash so the paper ground is not dead flat */}
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
                <span className="deck-mono text-[9px] uppercase tracking-[0.28em] text-clay">
                  Content Execution Infrastructure
                </span>
              </div>

              <h2
                className="deck-heading mt-8 text-balance font-semibold uppercase leading-[0.94] tracking-[-0.04em] text-ink"
                style={{ fontSize: 'clamp(2.1rem, 4.4vw, 4.15rem)' }}
              >
                AI decides who gets found.{' '}
                <span className="text-clay">Most businesses have no system</span> in place to change that.
              </h2>

              <div className="mt-8 flex max-w-2xl gap-4">
                <span className="w-[2px] shrink-0 bg-clay" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed text-graphite">
                  SaaS now, open ecosystem later. Signal to content to distribution to verified outcomes — one
                  compounding loop.
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Today', value: 'Hook Intelligence + Content Engines', Icon: Sparkles },
                  { label: 'Phase 1–2', value: 'API + MCP + Custom Agents', Icon: BarChart3 },
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
                <p className="deck-mono text-[9px] font-medium uppercase tracking-[0.24em] text-clay">Core Mission</p>
                <p className="mt-4 text-lg font-medium leading-snug text-paper">
                  The infrastructure layer connecting AI visibility signal, hook-based content execution, and a future
                  open ecosystem of agents, plugins, and local workflows.
                </p>
                <p className="mt-5 border-t border-paper/15 pt-5 text-[13px] leading-relaxed text-paper/70">
                  Built because the founder had to run 90% of marketing himself. Now rebuilt as the system that runs
                  whether or not humans show up.
                </p>
              </Panel>

              <Panel className="p-7">
                <Eyebrow>The Destination</Eyebrow>
                <div className="mt-5 space-y-5">
                  {[
                    { Icon: Radar, title: 'GTM Intelligence', desc: 'Positioning, audience, content, and growth direction' },
                    { Icon: Bot, title: 'Open Ecosystem', desc: 'Agents, plugins, and builders ranked by outcomes' },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-paper">
                        <Icon className="h-4 w-4 text-clay" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-graphite">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[86rem] items-center justify-between border-t border-line pt-5">
            <p className="deck-mono text-[9px] uppercase tracking-[0.24em] text-mist">Pre-seed · 13 slides · 2026</p>
            <p className="deck-hint inline-flex items-center gap-2 deck-mono text-[9px] uppercase tracking-[0.2em] text-mist">
              <ChevronDown className="h-3.5 w-3.5 animate-bounce text-clay" aria-hidden="true" /> Scroll
            </p>
          </div>
        </section>

        {/* ============================ 02 · PROBLEM ============================ */}
        <SlideShell
          id="slide-2"
          index={2}
          kicker="Problem"
          title="The Problem"
          subtitle="Discovery got harder. Content execution stayed expensive and fragmented."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-4">
              {[
                { label: 'AI Search Shift', value: '58%', note: 'GenAI vs traditional search' },
                { label: 'AI Shopping', value: '39%', note: 'Used AI for shopping' },
                { label: 'Creator Market', value: '$214B', note: 'Native content leads' },
                { label: 'Execution Cost', value: '$1M+', note: 'Annual ops overhead' },
              ].map((item, idx) => (
                <Figure key={item.label} {...item} accent={idx === 3} />
              ))}
            </div>
            <Panel invert className="flex items-center p-6 lg:col-span-4">
              <p className="text-[15px] font-medium leading-relaxed text-paper">
                The gap between diagnosis and execution is the single biggest leak in marketing ROI today.
              </p>
            </Panel>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {[
              {
                Icon: Search,
                head: 'Discovery changed',
                old: 'SEO rankings on Google blue links.',
                now: 'AI answer engines decide visibility. Ranking pages no longer guarantees citation in answers.',
              },
              {
                Icon: Sparkles,
                head: 'Content changed',
                old: 'Polished campaigns produced by large teams/agencies.',
                now: 'Platform-native creator execution wins attention, but requires a repeatable multi-platform system.',
              },
            ].map(({ Icon, head, old, now }) => (
              <Panel key={head} className="p-6">
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
                  <Eyebrow>{head}</Eyebrow>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="border-l-2 border-line bg-paper p-4">
                    <p className="deck-mono text-[8px] uppercase tracking-[0.18em] text-mist">Old playbook</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist line-through decoration-mist/40">{old}</p>
                  </div>
                  <div className="border-l-2 border-clay bg-clay-tint p-4">
                    <p className="deck-mono text-[8px] uppercase tracking-[0.18em] text-clay-deep">New reality</p>
                    <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink">{now}</p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>

          <Panel className="mt-4 p-6">
            <Eyebrow>The structural gap</Eyebrow>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="border-l-2 border-line bg-paper p-4 text-[13px] leading-relaxed text-graphite">
                Visibility tools tell you what's broken. They don't fix it or create the content to replace it.
              </div>
              <div className="border-l-2 border-line bg-paper p-4 text-[13px] leading-relaxed text-graphite">
                Content tools write posts. They don't know if AI assistants will ever cite that content.
              </div>
              <div className="relative border-l-2 border-clay bg-ink p-4 text-[13px] font-medium leading-relaxed text-paper">
                Florus is the only system that diagnoses, executes, and learns from every outcome — closing the loop
                that every other tool leaves open.
              </div>
            </div>
          </Panel>

          <SlideFootnotes
            items={[
              { label: 'Source: Capgemini Research Institute (AI search shift)', href: 'https://www.capgemini.com/insights/research-library/what-matters-to-todays-consumer-2025/' },
              { label: 'Source: Adobe survey (AI shopping usage)', href: 'https://www.adobe.com/express/business/blog/online-shopping-trends' },
              { label: 'Source: APC salary guide + internal team-cost model', href: 'https://www.apc.org.au/resources/annual-salary-guide/' },
            ]}
          />
        </SlideShell>

        {/* ============================ 03 · WHY NOW ============================ */}
        <SlideShell
          id="slide-3"
          index={3}
          kicker="Why Now"
          title="Why Now"
          subtitle="The category is opening before the stack is settled."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                tag: 'Shift 1',
                title: 'Behavior shifts faster than tooling',
                body: 'Buyers are moving toward AI answers, while content consumption keeps shifting toward creator-native, platform-specific formats. Most teams still use stacks built for the old web.',
              },
              {
                tag: 'Shift 2',
                title: 'Platform beats point solution',
                body: 'Hundreds of AI tools are shipping, but specific point solutions get commoditized. Open ecosystems compound faster than closed SaaS.',
              },
              {
                tag: 'Shift 3',
                title: 'A2A infrastructure is forming',
                body: 'Google’s A2A protocol, backed by 50+ enterprise partners, is a concrete sign that agent-to-agent commerce infrastructure is taking shape now.',
              },
            ].map((item, idx) => (
              <Panel key={item.tag} className="flex flex-col p-7">
                <div className="mb-5 flex items-baseline gap-3">
                  <span className="deck-heading text-3xl font-bold leading-none text-clay/35">0{idx + 1}</span>
                  <Eyebrow tone="clay">{item.tag}</Eyebrow>
                </div>
                <h3 className="text-lg font-semibold leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-graphite">{item.body}</p>
              </Panel>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <Panel accent raised className="p-8 lg:col-span-7">
              <CropMarks />
              <Eyebrow tone="clay">The Window</Eyebrow>
              <p className="mt-4 text-xl font-medium leading-snug text-ink">
                Incumbents still focus on reporting and dashboard software. But with{' '}
                <span className="text-clay">agent-to-agent infrastructure</span> now emerging, the{' '}
                <span className="text-clay">SMB, creator, developer, and agent-native layer</span> is still wide open
                for a category-defining platform.
              </p>
            </Panel>

            <Panel className="flex flex-col justify-center p-8 lg:col-span-5">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
                <p className="text-sm font-semibold text-ink">Early Advantage</p>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-graphite">
                We are not just building a workflow. We are positioning the product to become infrastructure for
                AI-native marketing before incumbents move beyond dashboards and point solutions.
              </p>
            </Panel>
          </div>
        </SlideShell>

        {/* ============================ 04 · PRODUCT ============================ */}
        <SlideShell
          id="slide-4"
          index={4}
          kicker="Product"
          title="The Execution Stack"
          subtitle="Two live products, one shared Florus layer: diagnosis through GeoCompanion and execution through Launchvibes."
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel accent className="p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
                <Eyebrow tone="clay">Live Now</Eyebrow>
              </div>
              <div className="space-y-3">
                {[
                  {
                    Icon: Search,
                    name: 'GeoCompanion: From Invisible To Actionable',
                    desc: 'For SMBs that need to move fast: audit a site, find the gaps, and get prioritized fixes, schema, CTAs, and article opportunities.',
                  },
                  {
                    Icon: Sparkles,
                    name: 'Launchvibes: Creator OS Across Channels',
                    desc: 'The creator OS in Florus: turns positioning, audience signals, and goals into platform-native ideas and campaigns.',
                  },
                  {
                    Icon: Radar,
                    name: 'Florus: Context That Compounds',
                    desc: 'The shared layer compounds context around voice, audience, goals, and winning patterns.',
                  },
                ].map(({ Icon, name, desc }) => (
                  <div key={name} className="flex items-start gap-3 border-l-2 border-clay/30 bg-paper p-4">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-clay" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-graphite">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel invert className="p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-paper/60" aria-hidden="true" />
                <p className="deck-mono text-[9px] font-medium uppercase tracking-[0.24em] text-paper/75">Coming</p>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: 'API + MCP', phase: 'Phase 1', desc: 'One shared gateway for GeoCompanion, Launchvibes, AI clients, and builder apps.' },
                  { name: 'Custom Agents', phase: 'Phase 2', desc: 'Reusable agents for research, content planning, platform-native creation, and campaign execution.' },
                  { name: 'Local App + CLI', phase: 'Phase 2', desc: 'A private local workflow with optional sync and automation for power users.' },
                  { name: 'Creator + Agent Marketplace', phase: 'Phase 3', desc: 'Creators and builders publish workflows, earn a share of fees, and improve the network through measured outcomes.' },
                ].map((mod) => (
                  <div key={mod.name} className="flex items-start justify-between gap-3 border-b border-paper/15 pb-2.5 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-paper">{mod.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-paper/75">{mod.desc}</p>
                    </div>
                    <span className="deck-mono shrink-0 border border-paper/15 px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-paper/75">
                      {mod.phase}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <Panel className="mt-5 p-7">
            <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
              <div className="text-center md:text-left">
                <p className="deck-mono text-[9px] uppercase tracking-[0.22em] text-clay">GeoCompanion</p>
                <p className="mt-1 text-[13px] text-graphite">Move from AI visibility gaps to concrete fixes</p>
              </div>
              <div className="mx-4 hidden flex-1 items-center gap-3 md:flex">
                <span className="h-px flex-1 bg-gradient-to-r from-clay/50 to-line" aria-hidden="true" />
                <span className="deck-mono whitespace-nowrap bg-ink px-3 py-1 text-[8px] uppercase tracking-[0.2em] text-paper">
                  Florus shared core
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-clay/50 to-line" aria-hidden="true" />
              </div>
              <div className="text-center md:text-right">
                <p className="deck-mono text-[9px] uppercase tracking-[0.22em] text-clay">Launchvibes</p>
                <p className="mt-1 text-[13px] text-graphite">Move from blank page to channel-native execution</p>
              </div>
            </div>
            <p className="mt-5 border-t border-line pt-5 text-center text-[13px] leading-relaxed text-graphite">
              Florus is the ecosystem behind both products, not another closed social network. It helps users win across
              TikTok, YouTube, X, LinkedIn, Instagram, newsletters, and future channels; long term, its shared context
              can route work to specialist agents and rank their outcomes.
            </p>
          </Panel>
        </SlideShell>

        {/* ============================ 05 · MARKET ============================ */}
        <SlideShell
          id="slide-5"
          index={5}
          kicker="Market"
          title="Market Size"
          subtitle="At the intersection of three fast-growing markets."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <Panel className="overflow-x-auto p-6 lg:col-span-7">
              <Eyebrow className="mb-4">Three converging markets</Eyebrow>
              <table className="deck-table min-w-[420px]">
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>2026 Size</th>
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
              <p className="deck-mono text-[9px] uppercase tracking-[0.24em] text-paper/75">Market Focus</p>
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
                      <span className={`deck-heading text-sm font-bold tabular-nums ${idx === 3 ? 'text-clay' : 'text-paper'}`}>
                        {bar.value}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-paper/15">
                      <div
                        className={`h-full ${idx === 3 ? 'bg-clay' : 'bg-paper/45'}`}
                        style={{ width: `${bar.width}%` }}
                      />
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
        </SlideShell>

        {/* ============================ 06 · COMPETITION ============================ */}
        <SlideShell
          id="slide-6"
          index={6}
          kicker="Competition"
          title="Why We're Different"
          subtitle="Others are point tools or high-priced enterprise products. We’re building the workflow layer that connects visibility, execution, and feedback for the next market down."
        >
          <Panel className="overflow-x-auto p-5">
            <table className="deck-table min-w-[860px]">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>BrightEdge</th>
                  <th>Hootsuite</th>
                  <th>Semrush</th>
                  <th>Jasper / Copy.ai</th>
                  <th>Florus</th>
                </tr>
              </thead>
              <tbody>
                {competitorRows.map((row) => (
                  <tr key={row.category}>
                    <td className="cell-key">{row.category}</td>
                    <td>{row.BrightEdge}</td>
                    <td>{row.hootsuite}</td>
                    <td>{row.semrush}</td>
                    <td>{row.jasper}</td>
                    <td className="cell-win">{row.Florus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <div className="grid gap-4 md:grid-cols-3 lg:col-span-7">
              {[
                'AI citation signal + content execution in one infra layer.',
                'Stable API foundation for SaaS, local app, and third-party builders.',
                'Open ecosystem + verifiable performance create platform defensibility.',
              ].map((gap, idx) => (
                <Panel key={gap} className="p-5">
                  <Eyebrow tone="clay">Gap {idx + 1}</Eyebrow>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink">{gap}</p>
                </Panel>
              ))}
            </div>

            <Panel accent raised className="flex items-center p-7 lg:col-span-5">
              <CropMarks />
              <p className="text-[15px] leading-relaxed text-ink">
                Others are point tools built for human workflows. We are building the infrastructure layer for the agent
                era — one system connecting visibility signal, content execution, local-first workflows, and verified
                outcomes.
              </p>
            </Panel>
          </div>
        </SlideShell>

        {/* ============================ 07 · VISION ============================ */}
        <SlideShell
          id="slide-7"
          index={7}
          kicker="Vision"
          title="Platform Vision"
          subtitle="From workflow to local-first platform to an open GTM ecosystem."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <Panel accent raised className="p-6 lg:col-span-7">
              <CropMarks />
              <Eyebrow tone="clay">The Moat</Eyebrow>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">
                Every audit and creator workflow can deepen the context Florus has around voice, audience, goals,
                channels, and winning hooks. That makes recommendations more useful over time and raises switching costs
                without trapping users in one platform.
              </p>
            </Panel>
            <Panel invert className="flex flex-col justify-center p-6 lg:col-span-5">
              <p className="deck-mono text-[9px] uppercase tracking-[0.24em] text-paper/75">GTM Intelligence</p>
              <p className="mt-3 text-[13px] leading-relaxed text-paper">
                We connect positioning, audience insight, content, and distribution in one workflow.
              </p>
            </Panel>
          </div>

          <Panel className="mt-4 p-6">
            <Eyebrow>Step-by-step build path</Eyebrow>
            <div className="mt-4 grid gap-0 md:grid-cols-3">
              {buildPathRows.map((item, idx) => {
                const Icon = [Rocket, Server, Activity][idx];
                return (
                  <article
                    key={item.phase}
                    className="relative border-t-2 border-clay/25 pt-5 md:border-l md:border-t-0 md:border-l-line md:pl-6 md:pt-0 md:first:border-l-0 md:first:pl-0"
                  >
                    <span className="absolute -top-[2px] left-0 h-[2px] w-10 bg-clay md:hidden" aria-hidden="true" />
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
                      <Eyebrow tone="clay">{item.phase}</Eyebrow>
                    </div>
                    <p className="deck-mono mt-3 text-[9px] uppercase tracking-[0.14em] text-mist">{item.when}</p>
                    <p className="deck-heading mt-2 text-base font-semibold leading-snug text-ink">{item.ships}</p>
                    <p className="mt-2 pr-4 text-[13px] leading-relaxed text-graphite">{item.target}</p>
                  </article>
                );
              })}
            </div>
          </Panel>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Context moat', 'Repeat use compounds voice, audience, goals, channels, and winning hooks.'],
              ['Local-first adoption', 'Private knowledge can stay local, with cloud sync and collaboration optional.'],
              ['API-first platform', 'Developers can build publishing flows, media tools, and GTM workflows on top of Florus.'],
              ['Fee-sharing ecosystem', 'Creators and builders earn from the workflows and agents they publish.'],
            ].map(([title, body]) => (
              <Panel key={title} className="p-5">
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-graphite">{body}</p>
              </Panel>
            ))}
          </div>

          <p className="mt-4 border-l-2 border-clay pl-5 text-[13px] leading-relaxed text-graphite">
            Phase 0 is intentional. SaaS generates the proprietary training signal that makes the future API, local app,
            CLI, and ecosystem defensible. We are not pivoting away from execution; we are widening the distribution
            surface around the same core.
          </p>
        </SlideShell>

        {/* ============================ 08 · ECOSYSTEM ============================ */}
        <SlideShell
          id="slide-8"
          index={8}
          kicker="Ecosystem"
          title="Open Ecosystem"
          subtitle="Private context in, best-fit GTM execution out through API, MCP, and custom agents."
        >
          {/* Band 1 — the three-step contract, read left to right */}
          <Panel className="p-4">
            <div className="grid gap-0 md:grid-cols-3">
              {[
                ['Private Context', 'Creators and brands bring voice, audience, platform, and objective context.'],
                ['Smart Routing', 'Florus selects agents by verified hook performance and outcome history.'],
                ['Native Execution', 'Agents execute and feed outcomes back into the ranking loop.'],
              ].map(([step, body], idx) => (
                <div key={step} className="flex gap-4 md:border-l md:border-line md:pl-5 md:first:border-l-0 md:first:pl-0">
                  <span className="deck-heading text-2xl font-bold leading-none text-clay/35">0{idx + 1}</span>
                  <div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.18em] text-clay">{step}</p>
                    <p className="mt-2 pr-4 text-xs leading-relaxed text-graphite">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Band 2 — how a request actually moves, and what it lands on */}
          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Panel className="p-5 lg:col-span-5">
              <Eyebrow>Request flow</Eyebrow>
              <div className="mt-4 space-y-2.5">
                {[
                  { Icon: Bot, label: 'Personal agent', title: 'Private context', body: 'TikTok, skincare launch, beauty / DTC.', hot: false },
                  { Icon: Server, label: 'Florus', title: 'Routing layer', body: 'Scores hook fit, availability, and performance.', hot: true },
                  { Icon: ShieldCheck, label: 'Custom agents', title: 'Reusable workflows', body: 'Cloud agents, plugins, and extensions with different hook mixes.', hot: false },
                ].map(({ Icon, label, title, body, hot }, idx) => (
                  <React.Fragment key={label}>
                    {idx > 0 ? (
                      <div className="flex justify-center py-0.5" aria-hidden="true">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="text-clay/50">
                          <path d="M4 0v11M4 11l-3-3M4 11l3-3" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    ) : null}
                    <div className={`flex items-start gap-3 p-3 ${hot ? 'border border-clay/45 bg-clay/10' : 'border border-line bg-paper'}`}>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center border ${hot ? 'border-clay/40 bg-clay/15' : 'border-line bg-paper'}`}>
                        <Icon className={`h-3.5 w-3.5 ${hot ? 'text-clay' : 'text-graphite'}`} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="deck-mono text-[8px] uppercase tracking-[0.16em] text-mist">{label}</p>
                        <p className="text-xs font-semibold text-ink">{title}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-graphite">{body}</p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </Panel>

            <Panel className="p-5 lg:col-span-7">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <Eyebrow>Public agent examples</Eyebrow>
                  <p className="mt-1.5 text-xs text-graphite">
                    Each agent blends hook patterns at different weights — a recipe for tone and structure.
                  </p>
                </div>
                <p className="deck-mono shrink-0 text-[8px] uppercase tracking-[0.16em] text-mist">Cloud-deployed</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <PublicAgentCard
                  name="Alice"
                  cloud="AWS"
                  context="Weighted for contrast-led product storytelling."
                  hooks={[
                    { label: 'Contrast hook', weight: 0.3 },
                    { label: 'Humble flex', weight: 0.35 },
                    { label: 'Curiosity gap', weight: 0.2 },
                    { label: 'Soft CTA', weight: 0.15 },
                  ]}
                />
                <PublicAgentCard
                  name="Bob"
                  cloud="GCP"
                  context="Weighted for sharper opinion-led campaign framing."
                  hooks={[
                    { label: 'Humble flex', weight: 0.2 },
                    { label: 'Hot take', weight: 0.4 },
                    { label: 'Proof stack', weight: 0.25 },
                    { label: 'Authority cue', weight: 0.15 },
                  ]}
                />
              </div>
              <p className="mt-3 border-t border-line pt-3 text-[11.5px] leading-relaxed text-graphite">
                API and MCP open a third-party builder ecosystem — custom agents, lightweight frontends, and
                automations on Florus's core engine. Billing stays on fiat; creators and agent builders earn a share of
                fees as the marketplace expands.
              </p>
            </Panel>
          </div>

          {/* Band 3 — why the loop holds */}
          <div className="mt-4 grid gap-0 md:grid-cols-3">
            {[
              ['Weighted agents', 'Each public agent is a weighted basket of hooks, not a single-hook identity — several messaging patterns blended in different proportions.'],
              ['Local-first core', 'Private knowledge can stay local by default while cloud agents, sync, and collaboration remain optional layers on top.'],
              ['Compounding loop', 'Measured outcomes improve routing quality, ranking history, future hook weights, and future plugin recommendations.'],
            ].map(([title, body]) => (
              <article key={title} className="border-t-2 border-clay/25 pt-3 md:border-l md:border-t-0 md:border-l-line md:pl-5 md:pt-0 md:first:border-l-0 md:first:pl-0">
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 pr-4 text-[11.5px] leading-relaxed text-graphite">{body}</p>
              </article>
            ))}
          </div>
        </SlideShell>

        {/* ============================ 09 · TRACTION ============================ */}
        <SlideShell
          id="slide-9"
          index={9}
          kicker="Traction"
          title="Early Signal"
          subtitle="Free beta — conversion to paid starts Q2 2026. Here is what the signal already looks like."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-4 lg:col-span-9 lg:grid-cols-4">
              {[
                { label: 'Activation Rate', value: '75%', Icon: DollarSign, accent: true },
                { label: 'Active Users', value: '571', Icon: Users, accent: false },
                { label: 'Search Events', value: '5,100+', Icon: BarChart3, accent: false },
                { label: 'Website Visitors', value: '832', Icon: Search, accent: false },
              ].map(({ label, value, Icon, accent }) => (
                <Panel key={label} accent={accent} className="p-6">
                  <Icon className={`h-4 w-4 ${accent ? 'text-clay' : 'text-mist'}`} aria-hidden="true" />
                  <Eyebrow className="mt-4">{label}</Eyebrow>
                  <p className={`deck-heading mt-2 text-4xl font-semibold tabular-nums tracking-tight ${accent ? 'text-clay' : 'text-ink'}`}>
                    {value}
                  </p>
                </Panel>
              ))}
            </div>

            <Panel invert className="flex flex-col justify-center p-6 lg:col-span-3">
              <p className="deck-mono text-[9px] uppercase tracking-[0.22em] text-paper/75">Paid customer</p>
              <p className="deck-heading mt-3 text-3xl font-bold tracking-tight text-paper">VirgoCX</p>
              <span className="mt-4 h-[2px] w-10 bg-clay" aria-hidden="true" />
            </Panel>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <Panel accent raised className="p-7 lg:col-span-5">
              <CropMarks />
              <h3 className="deck-heading text-lg font-semibold text-ink">The Beta Thesis</h3>
              <p className="mt-4 text-[13px] leading-relaxed text-graphite">
                We are seeing <span className="font-semibold text-clay">75% activation</span> and 7 searches per active
                user, 68% active-user growth, and nearly 2x search events since our last measurement window, all with
                zero paid acquisition. This depth of engagement suggests users are treating Florus as a core operating
                surface, not a one-time demo.
              </p>
              <p className="mt-5 border-l-2 border-clay bg-clay-tint p-4 text-[13px] font-medium leading-relaxed text-ink">
                This round builds our upmarket intelligence layer and scales conversion to durable revenue.
              </p>
            </Panel>

            <Panel className="p-7 lg:col-span-7">
              <h3 className="deck-heading text-lg font-semibold text-ink">Milestones from beta to scale</h3>
              <div className="mt-5 space-y-0">
                {[
                  {
                    title: 'Pre-seed',
                    desc: 'Convert free beta usage into repeat product usage, first paying teams, and early revenue.',
                    target: 'Goal by Q4 2026: 1.5K users, 10K searches, 50 creator/KOL customer accounts, 10 paying brand or agency teams, $5K–$10K MRR',
                    Icon: Building2,
                  },
                  {
                    title: 'Seed',
                    desc: 'Turn early paid usage into a repeatable go-to-market motion across SMB, agency, and enterprise customers.',
                    target: 'Goal by Q4 2027: 25+ brand or agency customers, 500 creator/KOL customer accounts, $100K MRR, <3 month payback, strong retention',
                    Icon: Users,
                  },
                  {
                    title: 'Series A',
                    desc: 'Build the system of record for AI-native marketing performance through infrastructure, APIs, and network effects.',
                    target: 'Goal by Q3 2029: $50M+ ARR, 120+ enterprise or agency customers, 5,000 creator/KOL customer accounts, enterprise-grade reporting and controls',
                    Icon: Handshake,
                  },
                ].map(({ title, desc, target, Icon }, idx) => (
                  <div key={title} className="relative flex gap-4 pb-5 last:pb-0">
                    {idx < 2 ? <span className="absolute left-[13px] top-7 h-full w-px bg-line" aria-hidden="true" /> : null}
                    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center border border-line bg-hull">
                      <Icon className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-graphite">{desc}</p>
                      <p className="deck-mono mt-2 text-[9px] uppercase leading-relaxed tracking-[0.08em] text-mist">{target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </SlideShell>

        {/* ============================ 10 · MODEL ============================ */}
        <SlideShell
          id="slide-10"
          index={10}
          kicker="Model"
          title="Business Model"
          subtitle="SaaS first, then API, local app, and ecosystem revenue."
        >
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'SaaS subscriptions',
                when: 'Now',
                body: 'Start with a free trial, then convert into paid self-serve plans at $15/month (Starter) and $35/month (Pro).',
              },
              {
                step: '02',
                title: 'API + MCP access',
                when: 'Phase 1+',
                body: 'A usage-based gateway for apps, AI clients, and custom agents built on Florus.',
              },
              {
                step: '03',
                title: 'Local app + ecosystem',
                when: 'Phase 2+',
                body: 'Freemium desktop app, premium plugins, and marketplace take-rate as the builder ecosystem matures around the core workflow.',
              },
            ].map((item, idx) => (
              <Panel key={item.title} accent={idx === 0} className="p-7">
                <div className="flex items-baseline justify-between">
                  <span className="deck-heading text-3xl font-bold leading-none text-clay/25">{item.step}</span>
                  <span className="deck-mono border border-line px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-mist">
                    {item.when}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-graphite">{item.body}</p>
              </Panel>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <Panel className="p-7 lg:col-span-7">
              <h3 className="deck-heading text-base font-semibold text-ink">Flywheel Defensibility</h3>
              <ul className="mt-4 space-y-3">
                {[
                  ['Data Moat', 'Every campaign refined our ranking model.'],
                  ['Outcome Lifts', 'Better rankings drive better results, attracting demand.'],
                  ['Ecosystem Lock-in', 'Local workflows, plugins, and fee-sharing create switching costs.'],
                ].map(([head, body]) => (
                  <li key={head} className="flex items-baseline gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                    <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-clay" aria-hidden="true" />
                    <p className="text-[13px] leading-relaxed text-graphite">
                      <span className="font-semibold text-ink">{head}:</span> {body}
                    </p>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel invert className="flex items-center p-8 lg:col-span-5">
              <p className="deck-heading text-lg font-medium leading-snug text-paper">
                Florus doesn't just manage workflows; it owns the{' '}
                <span className="text-clay">outcome data</span> that makes autonomous execution reliable.
              </p>
            </Panel>
          </div>

          <div className="mt-5 grid gap-6 border-t border-line pt-5 md:grid-cols-2">
            <p className="text-[13px] leading-relaxed text-graphite">
              Florus starts with subscription revenue, expands into API and cloud usage, and later adds local app,
              plugin, and marketplace revenue once the ecosystem matures.
            </p>
            <p className="text-[13px] leading-relaxed text-graphite">
              Marketplace revenue comes from a share of fees paid to creators and agent builders.
            </p>
          </div>
        </SlideShell>

        {/* ============================ 11 · FLYWHEEL ============================ */}
        <SlideShell
          id="slide-11"
          index={11}
          kicker="Flywheel"
          title="Flywheel"
          subtitle="Every workflow improves the next one."
        >
          <div className="grid gap-0 md:grid-cols-4">
            {flywheelRows.map((item, idx) => (
              <article
                key={item.title}
                className="relative border-t-2 border-clay/25 p-5 md:border-l md:border-t-0 md:border-l-line md:first:border-l-0"
              >
                <span className="absolute -top-[2px] left-0 h-[2px] w-10 bg-clay md:hidden" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <item.Icon className="h-4 w-4 text-clay" aria-hidden="true" />
                  <span className="deck-mono text-[9px] tabular-nums text-mist">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="deck-heading mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 pr-3 text-[13px] leading-relaxed text-graphite">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-12">
            <Panel accent raised className="p-7 lg:col-span-7">
              <CropMarks />
              <Eyebrow tone="clay">Compounding loop</Eyebrow>
              <p className="mt-4 text-lg font-medium leading-snug text-ink">
                Better audits drive better content. Better content creates better outcome data. That feedback improves
                the next GTM decision and the next execution cycle.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ['Phase 0', 'Own the diagnosis → execution workflow'],
                  ['Phase 1', 'Open the platform through API and MCP'],
                  ['Phase 2', 'Creator and agent marketplace with fee sharing on top of the core engine'],
                ].map(([phase, detail]) => (
                  <div key={phase} className="border-t border-line pt-3">
                    <p className="deck-mono text-[8px] uppercase tracking-[0.2em] text-clay">{phase}</p>
                    <p className="mt-2 text-xs leading-relaxed text-graphite">{detail}</p>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-7 lg:col-span-5">
              <Eyebrow>Longer-term upside</Eyebrow>
              <div className="mt-4 space-y-4">
                {[
                  ['GTM intelligence', 'As more teams use the system, Florus gets better at connecting positioning, content, distribution, and outcomes.'],
                  ['Marketplace routing', 'As more creators and builders publish workflows, the marketplace becomes a monetizable execution layer.'],
                ].map(([head, body]) => (
                  <div key={head} className="border-l-2 border-clay/40 pl-4">
                    <p className="text-sm font-semibold text-ink">{head}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-graphite">{body}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </SlideShell>

        {/* ============================ 12 · TEAM ============================ */}
        <SlideShell
          id="slide-12"
          index={12}
          kicker="Team"
          title="Team"
          subtitle="Technical execution, product insight, and ecosystem growth at the core."
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
            Florus combines technical product execution with the product judgment needed to make AI visibility and
            content workflows usable for real marketing teams.
          </p>
        </SlideShell>

        {/* ============================ 13 · THE ASK ============================ */}
        <SlideShell
          id="slide-13"
          index={13}
          kicker="The Ask"
          title="The Ask"
          subtitle="Raising a focused pre-seed now to convert product signal into revenue and seed readiness."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <Panel className="p-7 lg:col-span-5">
              <Eyebrow>Use of funds</Eyebrow>

              <div className="mt-5 flex h-2 w-full overflow-hidden">
                {[
                  { pct: 40, tone: 'bg-clay' },
                  { pct: 30, tone: 'bg-clay/65' },
                  { pct: 20, tone: 'bg-clay/45' },
                  { pct: 10, tone: 'bg-clay/20' },
                ].map((seg, idx) => (
                  <span key={`${seg.pct}-${idx}`} className={`block h-full ${seg.tone}`} style={{ width: `${seg.pct}%` }} />
                ))}
              </div>

              <div className="mt-5 space-y-3.5">
                {askRows.map((row, idx) => {
                  const pct = Number.parseInt(row.allocation, 10) || 0;
                  const Icon = [Cpu, Target, Server, Wallet][idx] ?? Activity;
                  const tone = ['bg-clay', 'bg-clay/65', 'bg-clay/45', 'bg-clay/20'][idx];
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
                  { title: 'Raise', value: '$800K', detail: 'Capital required to reach the next stage of product, revenue, and fundraising readiness', Icon: Rocket, hot: true },
                  { title: 'Near-term focus', value: 'API/MCP + Agents', detail: 'Onboard API/MCP customers, grow Florus through our own GTM, and monetize custom agents', Icon: Building2, hot: false },
                  { title: 'Next milestone', value: '$100K MRR', detail: 'Build toward durable revenue, stronger retention, and the next institutional round', Icon: CheckCircle2, hot: false },
                ].map(({ title, value, detail, Icon, hot }) => (
                  <Panel key={title} accent={hot} className="p-5">
                    <Icon className={`h-4 w-4 ${hot ? 'text-clay' : 'text-mist'}`} aria-hidden="true" />
                    <Eyebrow className="mt-4">{title}</Eyebrow>
                    <p className={`deck-heading mt-2 text-xl font-bold leading-tight tracking-tight ${hot ? 'text-clay' : 'text-ink'}`}>
                      {value}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-graphite">{detail}</p>
                  </Panel>
                ))}
              </div>

              <Panel accent raised className="p-7">
                <CropMarks />
                <p className="text-[15px] leading-relaxed text-ink">
                  We are raising <span className="font-semibold text-clay">$800K</span> to reach the next stage: paid
                  SaaS revenue, stronger customer evidence, and a clear path to institutional financing. Accelerator
                  participation can add strategic capital, distribution, and follow-on access to the same plan.
                </p>
                <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-graphite">
                  Near term, this capital funds SaaS traction and revenue. Long term, the same core can expand into a
                  local-first app, CLI, and plugin ecosystem without changing the product thesis.
                </p>
              </Panel>

              <div className="flex flex-wrap items-center gap-3">
                <span className="deck-mono inline-flex border border-line px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-graphite">
                  Raise: $800K
                </span>
                <span className="deck-mono inline-flex border border-line px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-graphite">
                  Focused on revenue, customer evidence, and next-stage readiness
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
              { label: 'YC standard deal', href: 'https://www.ycombinator.com/deal/' },
              { label: 'Antler terms', href: 'https://www.antler.co/residency/singapore' },
              { label: 'Protocol Labs interest form', href: 'https://docs.google.com/forms/d/e/1FAIpQLSfPkuHoM2a6XkZYvtoZnWJD7lXRNHCWNkOh8Ki9otJncd0mug/viewform' },
            ]}
          />
        </SlideShell>
      </main>
    </div>
  );
};

export default PitchDeckPage;
