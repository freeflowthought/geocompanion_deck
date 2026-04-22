import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronDown, Sparkles, Radar, Bot, ShieldCheck, BarChart3, Coins, Users, Search, DollarSign, Building2, Handshake, Rocket, Target, Activity, Wallet, Cpu, Server, CheckCircle2, Linkedin, Mail } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import wilsonImage from './team/wilson_image_optimized.jpg';
import huanImage from './team/huan_image.jpg';
import austinImage from './team/Austin_image_optimized.jpg';

type SlideShellProps = {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

type SlideFootnoteLink = {
  label: string;
  href: string;
};

const SlideShell = ({ id, index, title, subtitle, children }: SlideShellProps) => (
  <section
    id={id}
    className="deck-slide flex flex-col justify-center snap-start min-h-[100svh] px-6 pb-16 pt-24 md:px-12 lg:px-20 relative"
  >
    <div className="mx-auto w-full max-w-7xl relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="flex-1">
          <p className="deck-mono text-[10px] tracking-[0.3em] uppercase text-clay mb-4" aria-hidden="true">
            Page {String(index).padStart(2, '0')} / 13
          </p>
          <h2 className="deck-heading text-4xl font-light leading-[1.1] text-ink sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter uppercase italic text-balance">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-8 max-w-xl text-xl font-medium leading-relaxed text-ink/90 font-medium italic border-l-2 border-clay pl-6 italic text-balance">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="deck-slide-body mt-16">{children}</div>
      
      {/* Decorative brutalist elements */}
      <div className="absolute top-0 right-10 w-px h-full bg-ink/5 hidden lg:block" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-ink/5 hidden lg:block" />
    </div>
    
    {/* Large background index - Brutalist style */}
    <span
      className="pointer-events-none select-none absolute -bottom-10 -left-10 font-bold leading-none opacity-[0.03] text-ink mix-blend-multiply"
      style={{ fontSize: '25vw', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.05em' }}
      aria-hidden="true"
    >
      {String(index).padStart(2, '0')}
    </span>
  </section>
);

const SlideFootnotes = ({ items }: { items: SlideFootnoteLink[] }) => (
  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1.5">
    {items.map((item) => (
      <a
        key={item.href}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="deck-mono text-[10px] text-sage/95 font-medium italic hover:text-sage/95 font-medium italic transition-colors"
      >
        &#8599; {item.label}
      </a>
    ))}
  </div>
);

const GeoCompanionMark = ({ size = 36 }: { size?: number }) => (
  <div
    className="relative group transition-transform duration-500 hover:scale-110"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#121212" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#B35C37" strokeWidth="2" strokeDasharray="8 8" className="animate-[spin_10s_linear_infinite_reverse]" />
      <path d="M50 20 L50 80 M20 50 L80 50" stroke="#121212" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="8" fill="#121212" />
      <circle cx="50" cy="50" r="4" fill="#FBFBFB" />
    </svg>
  </div>
);

type HookWeight = {
  label: string;
  weight: number;
  tone: string;
};

type PublicAgentCardProps = {
  name: string;
  cloud: string;
  context: string;
  accent: string;
  hooks: HookWeight[];
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  photoPosition: string;
  linkedin: string;
  body: string;
};

const HookWeightBar = ({ label, weight, tone }: HookWeight) => (
  <div className="relative">
    <div className="flex items-center justify-between mb-1.5 px-1">
      <span className="deck-mono text-[9px] font-bold tracking-[0.2em] uppercase text-ink">{label}</span>
      <span className="deck-mono text-[9px] text-clay font-bold">{Math.round(weight * 100)}</span>
    </div>
    <div className="h-2 bg-void border border-ink/10 overflow-hidden relative">
      <div 
        className="h-full bg-clay transition-all duration-1000 ease-out" 
        style={{ width: `${weight * 100}%` }} 
      />
      {/* Texture overlay on bar */}
      <div className="absolute inset-0 opacity-20 bg-noise pointer-events-none" />
    </div>
  </div>
);

const PublicAgentCard = ({ name, cloud, context, accent, hooks }: PublicAgentCardProps) => (
  <article className="h-full bg-hull border-2 border-ink shadow-brutalist p-6 relative overflow-hidden group">
    <div className="absolute top-0 right-0 py-1 px-3 bg-ink text-void deck-mono text-[8px] tracking-widest uppercase rotate-90 origin-top-right transition-transform group-hover:translate-x-1">
      {cloud}
    </div>
    
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <p className="deck-heading text-2xl font-bold text-ink uppercase tracking-tighter leading-none">{name}</p>
        <div className="mt-3 label-stamp">{accent.split('-').pop()} // MODEL_ID</div>
        <p className="mt-4 text-sm leading-relaxed text-ink/80 font-medium italic italic font-medium">{context}</p>
      </div>
    </div>

    <div className="space-y-5">
      {hooks.map((hook) => (
        <HookWeightBar key={hook.label} {...hook} />
      ))}
    </div>
  </article>
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
    name: 'Austin',
    role: 'Co-Founder & GTM',
    photo: austinImage,
    photoAlt: 'Portrait of Austin',
    photoPosition: 'center 16%',
    linkedin: 'https://www.linkedin.com/in/austinchan910/',
    body: 'Enterprise distribution leader with relationship-driven access into networks around LayerZero, Sei, and Xiaomi. Built and scaled a media project to 100M+ organic streams, demonstrating platform-native distribution at scale, the same playbook Florus sells to brands. Understands creator economics from both the operator side and the platform side.',
  },
];

const TeamAvatar = ({ member }: { member: TeamMember }) => {
  const initials = member.name.slice(0, 1);

  return (
    <div className="relative h-56 w-44 shrink-0 group">
      {/* Shadow Layer */}
      <div className="absolute inset-0 bg-ink translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
      
      {/* Image Container */}
      <div className="relative h-full w-full overflow-hidden border-2 border-ink bg-hull">
        <img
          src={member.photo}
          alt={member.photoAlt}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
          style={{ objectPosition: member.photoPosition }}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
            const fallback = event.currentTarget.nextElementSibling as HTMLDivElement | null;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 hidden items-center justify-center bg-clay/20 text-4xl font-bold text-ink deck-heading">
          {initials}
        </div>
        
        {/* Grain Overlay on Image */}
        <div className="absolute inset-0 opacity-20 bg-noise pointer-events-none" />
      </div>
      
      {/* Industrial Label */}
      <div className="absolute -bottom-4 -right-4 bg-clay text-void px-3 py-1 deck-mono text-[9px] font-bold uppercase tracking-widest border border-ink">
        {member.role.split(' & ')[0]}
      </div>
    </div>
  );
};

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
    category: 'Chain-agnostic on-chain verification',
    BrightEdge: 'No',
    hootsuite: 'No',
    semrush: 'No',
    jasper: 'No',
    Florus: 'Yes (Phase 3)',
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
    Florus: 'Beta free \u2192 <$15/mo starter',
  },
];

const marketRows = [
  {
    market: 'AI Search & Answer Optimization',
    size: '~$1B today \u2192 $10B+',
    growth: '40%+ CAGR',
  },
  {
    market: 'Creator Economy + Social Tools',
    size: '$214B\u2013$314B',
    growth: '22% CAGR',
  },
  {
    market: 'Marketing AI SaaS',
    size: '~$8B today \u2192 $20B+',
    growth: '20% CAGR',
  },
];

const buildPathRows = [
  {
    phase: 'Phase 0',
    when: 'Now \u2192 Q2 2026',
    ships: 'Hook Intelligence + Content Execution',
    target: '1,500+ users, 10K+ search events, 50 creator accounts, and first 10 paying teams.',
  },
  {
    phase: 'Phase 1\u20132',
    when: 'Q3 2026 \u2192 Q4 2027',
    ships: 'Stable API + Local App + CLI',
    target: '$100K MRR, 25+ agency customers, 500 creator accounts, and upmarket expansion.',
  },
  {
    phase: 'Phase 3\u20134',
    when: '2028+',
    ships: 'Plugin Ecosystem + Verified Marketplace',
    target: '$50M+ ARR, 120+ enterprise customers, 5,000 creator accounts, and verified infrastructure.',
  },
];

const flywheelRows = [
  {
    title: 'Diagnose',
    body: 'Run a visibility audit to surface where AI assistants ignore your brand, why, and what to fix first.',
    icon: <Radar className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
  },
  {
    title: 'Create',
    body: 'Turn those gaps into platform-native hooks, campaigns, and content systems.',
    icon: <Sparkles className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
  },
  {
    title: 'Deploy',
    body: 'Ship through SaaS workflows today, then expand into API, desktop, and CLI workflows as usage matures.',
    icon: <Rocket className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
  },
  {
    title: 'Learn',
    body: 'Outcome data improves recommendations, routing, and the future plugin and agent ecosystem.',
    icon: <Activity className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
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

const slideIds = Array.from({ length: 13 }, (_, idx) => `slide-${idx + 1}`);
const PDF_EXPORT_WIDTH = 1366;
const PDF_EXPORT_BG = '#FAFBFC';

const PitchDeckPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const scrollToSlide = (id: string) => {
    const slide = document.getElementById(id);
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      const pageBg: [number, number, number] = [250, 251, 252];
      const waitForPaint = () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      let pdf: jsPDF | null = null;

      for (let idx = 0; idx < slides.length; idx += 1) {
        const sourceSlide = slides[idx];
        const slide = sourceSlide.cloneNode(true) as HTMLElement;
        const sourceRect = sourceSlide.getBoundingClientRect();
        const sourceStyle = window.getComputedStyle(sourceSlide);
        slide.removeAttribute('id');
         const realHeight = Math.max(sourceSlide.scrollHeight, sourceRect.height);
         slide.style.width = `${Math.ceil(sourceRect.width)}px`;
         slide.style.height = `${Math.ceil(realHeight)}px`;
         slide.style.minHeight = '0';
         slide.style.justifyContent = 'flex-start';
         slide.style.paddingTop = sourceStyle.paddingTop;
         slide.style.paddingRight = sourceStyle.paddingRight;
         slide.style.paddingBottom = sourceStyle.paddingBottom;
         slide.style.paddingLeft = sourceStyle.paddingLeft;
        
        // Ensure ink children keep their dark background in PDF
        slide.querySelectorAll<HTMLElement>('.bg-ink, .bg-onyx').forEach(el => {
          el.style.backgroundColor = '#121212';
          el.style.color = '#FBFBFB';
        });

        // Ensure background numbers are visible but subtle
        slide.querySelectorAll<HTMLElement>('span').forEach(el => {
          if (el.style.fontSize.includes('vw')) {
            el.style.opacity = '0.03';
            el.style.color = '#121212';
          }
        });

        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'deck-grid pointer-events-none absolute inset-0';
        slide.appendChild(gridOverlay);

        exportStage.appendChild(slide);

        const layoutRoot = slide.firstElementChild as HTMLElement | null;
        if (layoutRoot) {
          layoutRoot.style.maxWidth = sourceStyle.maxWidth;
          layoutRoot.style.width = '100%';
          layoutRoot.style.marginLeft = 'auto';
          layoutRoot.style.marginRight = 'auto';
        }

        slide.querySelectorAll<HTMLElement>('.overflow-x-auto').forEach(node => {
          node.style.overflow = 'visible';
        });
        slide.querySelectorAll<HTMLElement>('.deck-table').forEach(table => {
          table.style.width = '100%';
          table.style.tableLayout = 'fixed';
        });
        slide.querySelectorAll<HTMLElement>('th, td').forEach(cell => {
          cell.style.wordBreak = 'break-word';
        });

        await waitForPaint();

        const canvas = await html2canvas(slide, {
          backgroundColor: PDF_EXPORT_BG,
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
        pdf.setFillColor(pageBg[0], pageBg[1], pageBg[2]);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST');
      }

      if (!pdf) {
        throw new Error('Could not initialize PDF export.');
      }
      pdf.save('GeoCompanion_Pitch_Deck.pdf');
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
    <div className="relative min-h-screen overflow-hidden bg-void text-onyx">
      <style>{`
        *, *::before, *::after {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .deck-heading {
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }

        .deck-mono {
          font-family: 'JetBrains Mono', monospace;
          font-variant-numeric: tabular-nums;
        }

        .bg-noise {
          background-image: var(--noise);
        }

        .deck-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
          border: 2px solid #121212;
        }

        .deck-table th {
          text-align: left;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FBFBFB;
          font-weight: 700;
          background: #121212;
          padding: 1rem 0.875rem;
        }

        .deck-table th,
        .deck-table td {
          border: 1px solid #121212;
          padding: 1rem 0.875rem;
          vertical-align: top;
        }

        .deck-table td {
          color: #121212;
          line-height: 1.5;
          background: #FFFFFF;
        }

        .deck-table tr:nth-child(even) td {
          background: #F8F8F8;
        }

        .deck-topbar {
          border-bottom: 2px solid #121212;
          background: #FFFFFF;
        }

        .label-stamp {
          padding: 0.25rem 0.6rem;
          background: #121212;
          color: #FBFBFB;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: inline-block;
        }

        .deck-card p,
        .deck-card li {
          text-wrap: pretty;
        }

        .deck-card .text-sm {
          font-size: 0.91rem;
          line-height: 1.65;
        }

        .deck-card .text-xs {
          line-height: 1.6;
        }

        .pdf-export-stage {
          position: fixed;
          left: -20000px;
          top: 0;
          width: ${PDF_EXPORT_WIDTH}px;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          background: ${PDF_EXPORT_BG};
          font-family: 'Inter', system-ui, sans-serif;
          color: #0F1115;
        }

        .pdf-export-stage .deck-slide {
          box-sizing: border-box;
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .pdf-export-stage .deck-slide > div {
          max-width: 80rem !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
          position: relative;
          z-index: 10;
        }

        .pdf-export-stage .deck-slide-title {
          margin-bottom: 0 !important;
          line-height: 1.08 !important;
        }

        .pdf-export-stage .deck-slide-subtitle {
          margin-top: 2.4rem !important;
          max-width: 68ch !important;
          color: #6B7280 !important;
        }

        .pdf-export-stage .deck-slide-body {
          margin-top: 3.2rem !important;
          color: #0F1115 !important;
        }

        .pdf-export-stage .overflow-x-auto {
          overflow: visible !important;
        }

        .pdf-export-stage .deck-table {
          width: 100% !important;
          min-width: 0 !important;
        }

        .pdf-export-stage .deck-card {
          backdrop-filter: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .deck-scroll {
            scroll-behavior: auto !important;
          }
          .deck-bg-blur {
            display: none !important;
          }
          * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }

        @media print {
          @page {
            size: landscape;
            margin: 0.4in;
          }

          html,
          body {
            background: #ffffff !important;
          }

          .deck-topbar,
          .deck-side-nav,
          .deck-hint,
          .deck-grid,
          .deck-bg-blur {
            display: none !important;
          }

          .deck-scroll {
            height: auto !important;
            overflow: visible !important;
          }

          .deck-slide {
            min-height: auto !important;
            break-after: page;
            page-break-after: always;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 0.2in 0 !important;
          }

          .deck-slide h2,
          .deck-slide p,
          .deck-slide li,
          .deck-slide span,
          .deck-slide h3,
          .deck-slide h4,
          .deck-slide td,
          .deck-slide th,
          .deck-slide strong {
            color: #0f172a !important;
            text-shadow: none !important;
          }

          .deck-card {
            border: 1px solid #cbd5e1 !important;
            background: #ffffff !important;
            box-shadow: none !important;
          }

          .deck-table th,
          .deck-table td {
            border: 1px solid #cbd5e1 !important;
          }
        }
      `}</style>

      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-emerald-400 focus:px-4 focus:py-2 focus:text-slate-950 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <div className="deck-grid pointer-events-none fixed inset-0" />
      <div className="deck-bg-blur pointer-events-none fixed -left-32 top-20 h-96 w-96 rounded-full bg-accent-cyan/10 blur-[120px]" />
      <div className="deck-bg-blur pointer-events-none fixed -right-28 bottom-16 h-[500px] w-[500px] rounded-full bg-accent-violet/5 blur-[150px]" />

      <header className="deck-topbar fixed left-0 right-0 top-0 z-40 border-b border-slate-200/50 bg-void/88 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <h1 className="sr-only">GeoCompanion Investor Pitch Deck</h1>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sage/95 font-medium italic hover:text-onyx transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="deck-mono text-[10px] tracking-[0.15em] uppercase">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <GeoCompanionMark size={28} />
            <div>
              <p className="deck-mono text-[10px] tracking-[0.22em] text-onyx uppercase">GeoCompanion.ai</p>
              <p className="deck-mono text-[9px] tracking-[0.14em] text-sage/95 font-medium italic">Investor Deck &middot; 2026</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/8 px-4 py-2 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 transition hover:bg-accent-cyan/15 hover:border-accent-cyan/35 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="deck-mono text-[10px] tracking-[0.1em] uppercase">{isDownloading ? 'Generating\u2026' : 'Export PDF'}</span>
          </button>
        </div>
      </header>

      <aside className="deck-side-nav fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-slate-200/50 bg-white/50 p-2.5 pb-3 pt-3 shadow-elevation backdrop-blur-md lg:flex">
        {slideIds.map((id, idx) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSlide(id)}
            className="group relative flex h-6 w-6 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap bg-onyx text-onyx px-2 py-0.5 rounded-md"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px' }}
              aria-hidden="true"
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="block h-px bg-stardust transition-all duration-200 w-3 group-hover:w-5 group-hover:bg-accent-cyan" />
          </button>
        ))}
      </aside>

      <main id="main-content" className="deck-scroll h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">

        {/* Slide 1 */}
        <SlideShell
          id="slide-1"
          index={1}
          title="AI decides who gets found. Most businesses have no system in place to change that. We build the infrastructure they run on."
          subtitle="SaaS now, open ecosystem later. Signal to content to distribution to verified outcomes — one compounding loop."
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="bg-hull border-2 border-ink shadow-brutalist p-10 transform -rotate-1 lg:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <GeoCompanionMark size={28} />
                <span className="deck-mono text-[10px] tracking-[0.2em] uppercase text-sage/95 font-medium italic">Content Execution Infrastructure</span>
              </div>
              <p className="deck-mono text-[9px] uppercase tracking-[0.2em] text-sage/95 font-medium italic mb-3">Core Mission</p>
              <p className="text-2xl font-semibold leading-relaxed text-ink sm:text-3xl">
                The infrastructure layer connecting AI visibility signal, hook-based content execution, and a future open ecosystem of agents, plugins, and local workflows.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-sage/95 font-medium italic">
                Built because the founder had to run 90% of marketing himself. Now rebuilt as the system that runs whether or not humans show up.
              </p>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
                <p className="deck-mono text-[9px] uppercase tracking-[0.18em] text-sage/95 font-medium italic mb-4">The Destination</p>
                <div className="space-y-5">
                  {[
                    { icon: <Radar className="h-5 w-5 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, title: 'Strategic Intelligence', desc: 'Vision, market positioning, predictive analytics' },
                    { icon: <Bot className="h-5 w-5 text-clay font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, title: 'Open Ecosystem', desc: 'Agents, plugins, and builders ranked by outcomes' },
                    { icon: <ShieldCheck className="h-5 w-5 text-indigo-400" aria-hidden="true" />, title: 'On-Chain Trust', desc: 'Chain-agnostic agent attestation' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-ink/10 bg-void shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-base font-bold text-ink">{item.title}</p>
                        <p className="mt-0.5 text-sm text-sage/95 font-medium italic">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <Sparkles className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, label: 'Today', value: 'Hook Intelligence + Content Engines' },
                  { icon: <BarChart3 className="h-4 w-4 text-clay font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />, label: 'Phase 1\u20132', value: 'API + Local App + Ecosystem' },
                ].map((item) => (
                  <div key={item.label} className="bg-hull border-2 border-ink shadow-brutalist p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50">{item.icon}</div>
                    <div>
                      <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{item.label}</p>
                      <p className="text-sm font-bold text-ink">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="deck-hint mt-6 inline-flex items-center gap-2 deck-mono text-[10px] uppercase tracking-[0.18em] text-slate-700">
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> Scroll for full 13-slide deck
          </p>
        </SlideShell>

        {/* Slide 2 */}
        <SlideShell id="slide-2" index={2} title="The Problem" subtitle="Discovery got harder. Content execution stayed expensive and fragmented.">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'AI Search Shift', value: '58%', note: 'GenAI vs traditional search' },
                { label: 'AI Shopping', value: '39%', note: 'Used AI for shopping' },
                { label: 'Creator Market', value: '$214B', note: 'Native content leads' },
                { label: 'Execution Cost', value: '$1M+', note: 'Annual ops overhead' },
              ].map((item) => (
                <article key={item.label} className="bg-hull border border-ink/10 shadow-brutalist p-6">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{item.label}</p>
                  <p className="deck-heading mt-4 text-4xl font-bold text-ink tabular-nums">{item.value}</p>
                  <p className="mt-3 text-[10px] leading-tight text-sage/95 font-medium italic">{item.note}</p>
                </article>
              ))}
            </div>
            <div className="lg:col-span-4 bg-hull border-2 border-ink shadow-brutalist p-8 flex items-center justify-center text-center rotate-1">
               <p className="text-sm font-medium text-sage/95 font-medium italic italic">The gap between diagnosis and execution is the single biggest leak in marketing ROI today.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic flex items-center gap-2 mb-4">
                <Search className="h-3 w-3" aria-hidden="true" />
                Discovery changed
              </p>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1.5">Old playbook</p>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">SEO rankings on Google blue links.</p>
              </div>
              <div className="mt-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 mb-1.5">New reality</p>
                <p className="text-sm leading-relaxed text-ink">
                  AI answer engines decide visibility. Ranking pages no longer guarantees citation in answers.
                </p>
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic flex items-center gap-2 mb-4">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Content changed
              </p>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1.5">Old playbook</p>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">Polished campaigns produced by large teams/agencies.</p>
              </div>
              <div className="mt-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 mb-1.5">New reality</p>
                <p className="text-sm leading-relaxed text-ink">
                  Platform-native creator execution wins attention, but requires a repeatable multi-platform system.
                </p>
              </div>
            </article>
          </div>

          <div className="bg-hull border-2 border-ink shadow-brutalist p-8 mt-5">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">The structural gap</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="border border-ink/10 bg-void p-4 text-sm text-sage/95 font-medium italic">Visibility tools tell you what's broken. They don't fix it or create the content to replace it.</div>
              <div className="border border-ink/10 bg-void p-4 text-sm text-sage/95 font-medium italic">Content tools write posts. They don't know if AI assistants will ever cite that content.</div>
              <div className="bg-clay/5 border border-clay/20 p-4 text-sm font-medium text-ink">Florus is the only system that diagnoses, executes, and learns from every outcome — closing the loop that every other tool leaves open.</div>
            </div>
          </div>

          <SlideFootnotes
            items={[
              { label: 'Source: Capgemini Research Institute (AI search shift)', href: 'https://www.capgemini.com/insights/research-library/what-matters-to-todays-consumer-2025/' },
              { label: 'Source: Adobe survey (AI shopping usage)', href: 'https://www.adobe.com/express/business/blog/online-shopping-trends' },
              { label: 'Source: APC salary guide + internal team-cost model', href: 'https://www.apc.org.au/resources/annual-salary-guide/' },
            ]}
          />
        </SlideShell>

        {/* Slide 3 */}
        <SlideShell id="slide-3" index={3} title="Why Now" subtitle="The category is opening before the stack is settled.">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
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
              <article key={item.tag} className="bg-hull border-2 border-ink shadow-brutalist p-10 lg:col-span-4 flex flex-col justify-between">
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-clay mb-4">{item.tag}</p>
                <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/80 font-medium italic">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="bg-hull border-2 border-ink shadow-brutalist p-10 transform -rotate-1 lg:col-span-7">
              <p className="deck-mono text-[10px] uppercase tracking-[0.16em] text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5 mb-3">The Window</p>
              <p className="text-xl font-medium leading-relaxed text-ink">
                Incumbents still focus on reporting and dashboard software. But with <span className="text-clay font-bold">agent-to-agent infrastructure</span> now emerging, the <span className="text-clay font-bold"> SMB, creator, developer, and agent-native layer </span>is still wide open for a category-defining platform.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-hull border-2 border-ink shadow-brutalist p-8 bg-white shadow-elevation">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-clay" />
                  <p className="text-sm font-bold text-ink">Early Advantage</p>
                </div>
                <p className="mt-2 text-sm text-sage/95 font-medium italic">We are not just building a workflow. We are positioning the product to become infrastructure for AI-native marketing before incumbents move beyond dashboards and point solutions.</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* Slide 4 */}
        <SlideShell id="slide-4" index={4} title="The Execution Stack" subtitle="Three live modules today. Audit and execution are live now, powered by a proprietary intelligence layer underneath.">
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Live Now */}
            <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-sage" />
                <p className="deck-mono text-[9px] uppercase tracking-[0.2em] text-sage font-bold">Live Now</p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    icon: <Search className="h-4 w-4 text-sage shrink-0 mt-0.5" aria-hidden="true" />,
                    name: 'AI Visibility Audit Engine',
                    desc: 'Paste any URL, get a visibility score in 15 seconds. See where AI assistants skip your brand, then get the fixes you can ship right away.',
                  },
                  {
                    icon: <Sparkles className="h-4 w-4 text-sage shrink-0 mt-0.5" aria-hidden="true" />,
                    name: 'Platform Content Engine',
                    desc: 'Paste a brand page, get a 30/60/90-day content calendar. Generates platform-native posts, threads, and articles built for how discovery actually works now.',
                  },
                  {
                    icon: <Radar className="h-4 w-4 text-sage shrink-0 mt-0.5" aria-hidden="true" />,
                    name: 'Hook Intelligence Engine',
                    desc: 'The proprietary system underneath the platform. Continuously scores what drives engagement across channels and improves every audit and content plan.',
                  },
                ].map((mod) => (
                  <div key={mod.name} className="rounded-xl border border-slate-100 bg-white p-5">
                    <div className="flex items-start gap-3">
                      {mod.icon}
                      <div>
                        <p className="text-sm font-bold text-ink">{mod.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink/70 font-medium italic">{mod.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming */}
            <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-clay" />
                <p className="deck-mono text-[9px] uppercase tracking-[0.2em] text-clay font-bold">Coming</p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: 'Agent API',
                    phase: 'Phase 1',
                    desc: 'Turns the product into stable infrastructure for partner apps, developers, and future ecosystem builders.',
                  },
                  {
                    name: 'Local App + CLI',
                    phase: 'Phase 2',
                    desc: 'A local-first desktop workflow with private vaults, optional cloud sync, and terminal access for power users.',
                  },
                  {
                    name: 'Plugin Ecosystem',
                    phase: 'Phase 2',
                    desc: 'An open plugin layer where builders extend analysis, workflows, and niche GTM use cases on top of the core platform.',
                  },
                  {
                    name: 'On-Chain Trust',
                    phase: 'Phase 3',
                    desc: 'A chain-agnostic trust layer for agent performance. EVM deployments use ERC8004, while Solana deployments use registry or SATI-style attestations for auditable track records.',
                  },
                  {
                    name: 'Vision Navigator',
                    phase: 'Phase 4',
                    desc: 'Answers the hardest marketing question: are you targeting the right audience before you scale spend? Built on millions of content outcomes across the platform.',
                  },
                ].map((mod) => (
                  <div key={mod.name} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-ink">{mod.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink/70 font-medium italic">{mod.desc}</p>
                      </div>
                      <span className="label-stamp shrink-0">{mod.phase}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ecosystem boundary */}
          <div className="mt-5 bg-hull border-2 border-ink shadow-brutalist p-6 transform -rotate-[0.3deg]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="deck-mono text-[9px] uppercase tracking-[0.2em] text-sage font-bold mb-1">Core Platform</p>
                <p className="text-sm text-ink/80 font-medium italic">We own, ship, and guarantee this layer</p>
              </div>
              <div className="hidden md:flex flex-1 items-center gap-3 mx-4">
                <div className="h-px flex-1 border-t-2 border-dashed border-ink/20" />
                <span className="deck-mono text-[8px] uppercase tracking-widest text-ink/40">opens here</span>
                <div className="h-px flex-1 border-t-2 border-dashed border-ink/20" />
              </div>
              <div className="text-center md:text-right">
                <p className="deck-mono text-[9px] uppercase tracking-[0.2em] text-clay font-bold mb-1">Ecosystem Layer</p>
                <p className="text-sm text-ink/80 font-medium italic">Devs and agents build wrappers on top</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-center leading-relaxed text-ink/70 font-medium italic">
              Less is more. We keep the core focused so external developers can build a rich ecosystem of plugins, local workflows, CLI automations, and niche GTM wrappers without bloating the platform.
            </p>
          </div>
        </SlideShell>

        {/* Slide 5 */}
        <SlideShell
          id="slide-5"
          index={5}
          title="Why We're Different"
          subtitle="Others are point tools or high-priced enterprise products. We’re building the workflow layer that connects visibility, execution, and feedback for the next market down."
        >
          <div className="bg-hull border-2 border-ink shadow-brutalist p-4 overflow-x-auto">
            <table className="deck-table min-w-[900px]">
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
                    <td className="font-medium text-ink">{row.category}</td>
                    <td>{row.BrightEdge}</td>
                    <td>{row.hootsuite}</td>
                    <td>{row.semrush}</td>
                    <td>{row.jasper}</td>
                    <td className="font-semibold text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5">{row.Florus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              'AI citation signal + content execution in one infra layer.',
              'Stable API foundation for SaaS, local app, and third-party builders.',
              'Open ecosystem + verifiable performance create platform defensibility.',
            ].map((gap, idx) => (
              <div key={gap} className="bg-hull border border-ink/10 shadow-brutalist p-5">
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-2">Gap {idx + 1}</p>
                <p className="text-sm leading-relaxed text-ink">{gap}</p>
              </div>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-lg leading-relaxed text-ink">
              Others are point tools built for human workflows. We are building the infrastructure layer for the agent era — one system connecting visibility signal, content execution, local-first workflows, and verified outcomes.
            </p>
          </div>
        </SlideShell>

        {/* Slide 6 */}
        <SlideShell id="slide-6" index={6} title="Platform Vision" subtitle="From workflow to local-first platform to a verified open ecosystem.">
          <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
            <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-5">
                <p className="text-base leading-relaxed text-ink">
                  <span className="font-bold">The Moat:</span> Every audit and campaign feeds our ranking model. That training signal becomes even more defensible once it sits underneath an API, local app, CLI, and plugin ecosystem.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-5">
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
                  <span className="font-bold">Vision Navigator:</span> We help brands answer whether they are running in the right direction before they scale execution budget.
                </p>
              </div>
            </div>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Step-by-step build path</p>
            <div className="grid gap-4 md:grid-cols-3">
              {buildPathRows.map((item, idx) => {
                const icon = [
                  <Rocket className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
                  <Server className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  <Activity className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                ][idx];

                return (
                  <article key={item.phase} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{item.phase}</span>
                      {icon}
                    </div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">{item.when}</p>
                    <p className="deck-heading text-base font-semibold text-ink mb-2">{item.ships}</p>
                    <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{item.target}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Training signal', 'Each audit and campaign adds the ranking data that improves which agent wins future jobs.'],
              ['Local-first adoption', 'Teams can run analysis against private knowledge locally, then opt into sync, collaboration, or cloud workflows only when needed.'],
              ['API-First Standard', 'Florus stays focused on the core workflow. Developers can build wrappers on top of it, such as KOL publishing flows, richer media generation, or milestone check-ins.'],
              ['Chain-agnostic trust', 'Verification is not tied to one chain. We can support EVM deployments through ERC8004 and Solana-native deployments through registry or SATI-style attestations.'],
            ].map(([title, body]) => (
              <article key={title} className="deck-card rounded-2xl p-5">
                <h3 className="text-base font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              Phase 0 is intentional. SaaS generates the proprietary training signal that makes the future API, local app, CLI, and ecosystem defensible. We are not pivoting away from execution; we are widening the distribution surface around the same core.
            </p>
          </div>
        </SlideShell>

        {/* Slide 7 */}
        <SlideShell id="slide-7" index={7} title="Open Ecosystem" subtitle="Private context in, best-fit execution out across agents, plugins, and local workflows.">
          <div className="bg-hull border-2 border-ink shadow-brutalist p-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">1. Private Context</p>
                  <p className="text-sm text-ink/90 font-medium italic">Brands send platform, product, and objective context.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">2. Smart Routing</p>
                  <p className="text-sm text-ink/90 font-medium italic">Florus selects agents by verified hook performance and outcome history.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">3. Native Execution</p>
                  <p className="text-sm text-ink/90 font-medium italic">Agents execute and feed outcomes back into the ranking loop.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Request flow</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <Bot className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">Personal agent</p>
                          <p className="text-xs font-semibold text-ink">Private context</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-ink/80 font-medium italic">TikTok, skincare launch, beauty / DTC.</p>
                    </div>

                    <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <Server className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">Florus</p>
                          <p className="text-xs font-semibold text-ink">Routing layer</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-ink/80 font-medium italic">Scores hook fit, availability, and performance.</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <ShieldCheck className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">Public agents</p>
                          <p className="text-xs font-semibold text-ink">Agents / plugins</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-ink/80 font-medium italic">Cloud agents, plugins, and extensions with different hook mixes and workflows.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic">Public agent examples</p>
                      <p className="mt-1 text-xs text-sage/95 font-medium italic">Each agent mixes several hook patterns at different weights, like a recipe for tone and structure.</p>
                    </div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic">Cloud-deployed</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <PublicAgentCard
                      name="Alice"
                      cloud="AWS"
                      context="Weighted for contrast-led product storytelling."
                      accent="text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5"
                      hooks={[
                        { label: 'Contrast hook', weight: 0.3, tone: 'from-accent-cyan to-blue-400' },
                        { label: 'Humble flex', weight: 0.35, tone: 'from-accent-violet to-purple-400' },
                        { label: 'Curiosity gap', weight: 0.2, tone: 'from-blue-400 to-indigo-400' },
                        { label: 'Soft CTA', weight: 0.15, tone: 'from-slate-500 to-slate-400' },
                      ]}
                    />
                    <PublicAgentCard
                      name="Bob"
                      cloud="GCP"
                      context="Weighted for sharper opinion-led campaign framing."
                      accent="text-sage/95 font-medium italic"
                      hooks={[
                        { label: 'Humble flex', weight: 0.2, tone: 'from-accent-violet to-purple-400' },
                        { label: 'Hot take', weight: 0.4, tone: 'from-accent-cyan to-blue-400' },
                        { label: 'Proof stack', weight: 0.25, tone: 'from-blue-400 to-indigo-400' },
                        { label: 'Authority cue', weight: 0.15, tone: 'from-slate-500 to-slate-400' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['Weighted agents', 'Each public agent is a weighted basket of hooks, not a single-hook identity. In plain English: each agent blends several messaging patterns in different proportions, like a recipe tuned to a brand context.'],
              ['Local-first core', 'Private knowledge can stay local by default while cloud agents, sync, and collaboration remain optional layers on top.'],
              ['Compounding loop', 'Measured outcomes improve routing quality, ranking history, future hook weights, and future plugin recommendations.'],
            ].map(([title, body]) => (
              <article key={title} className="deck-card rounded-2xl p-5">
                <h3 className="text-base font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6 space-y-3">
            <p className="text-sm leading-relaxed text-ink font-medium">
              The API opens a third-party builder ecosystem. Developers can ship plugins, lightweight frontends, and CLI automations powered by Florus's underlying routing and analysis engine.
            </p>
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              The on-chain layer is a chain-agnostic trust primitive, not a payment mechanism. EVM deployments can use ERC8004, while Solana-native deployments can use a Solana Agent Registry or SATI-style attestations.
            </p>
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              Both paths support the same product outcomes: agent performance attestation, reputation systems, data provenance, and dispute-resolution logs. Billing stays on fiat throughout.
            </p>
          </div>
        </SlideShell>

        {/* Slide 8 */}
        <SlideShell id="slide-8" index={8} title="Early Signal" subtitle="Free beta — conversion to paid starts Q2 2026. Here is what the signal already looks like.">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Activation Rate', value: '75%', icon: <DollarSign className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /> },
              { label: 'Active Users', value: '571', icon: <Search className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
              { label: 'Search Events', value: '4000+', icon: <BarChart3 className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
              { label: 'Website Visitors', value: '457', icon: <Users className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
            ].map((kpi) => (
              <article key={kpi.label} className="deck-card rounded-2xl p-5">
                <div>{kpi.icon}</div>
                <p className="deck-mono mt-3 text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">{kpi.label}</p>
                <p className="deck-heading mt-2 text-5xl font-bold text-ink tabular-nums">{kpi.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr,1fr]">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-4">The Beta Thesis</h3>
              <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
                We are seeing <span className="font-bold text-ink">75% activation</span> and 7 searches per active user. This depth of engagement proves users treat GeoCompanion as a core operating surface, not a one-time demo.
              </p>
              <div className="mt-6 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-sm leading-relaxed text-ink">
                This round builds our upmarket intelligence layer and scales conversion to durable revenue.
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-4">Milestones from beta to scale</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'Pre-seed',
                    desc: 'Convert free beta usage into repeat product usage, first paying teams, and early revenue.',
                    target: 'Goal by Q2 2026: 1.5K users, 10K searches, 50 creator/KOL customer accounts, 10 paying brand or agency teams, $5K\u2013$10K MRR',
                    icon: <Building2 className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  },
                  {
                    title: 'Seed',
                    desc: 'Turn early paid usage into a repeatable go-to-market motion across SMB, agency, and enterprise customers.',
                    target: 'Goal by Q4 2027: 25+ brand or agency customers, 500 creator/KOL customer accounts, $100K MRR, <3 month payback, strong retention',
                    icon: <Users className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  },
                  {
                    title: 'Series A',
                    desc: 'Build the system of record for AI-native marketing performance through infrastructure, APIs, and network effects.',
                    target: 'Goal by Q3 2029: $50M+ ARR, 120+ enterprise or agency customers, 5,000 creator/KOL customer accounts, enterprise-grade reporting and controls',
                    icon: <Handshake className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
                  },
                ].map((channel) => (
                  <div key={channel.title} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      {channel.icon}
                      <p className="text-sm font-semibold text-ink">{channel.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{channel.desc}</p>
                    <p className="deck-mono mt-2 text-[9px] uppercase tracking-[0.1em] text-sage/95 font-medium italic">{channel.target}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </SlideShell>

        {/* Slide 9 */}
        <SlideShell id="slide-9" index={9} title="Market Size" subtitle="At the intersection of three fast-growing markets.">
          <div className="deck-card overflow-x-auto rounded-2xl">
            <table className="deck-table min-w-[720px]">
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
                    <td className="font-medium text-ink">{row.market}</td>
                    <td>{row.size}</td>
                    <td className="font-semibold text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5">{row.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              ['TAM', '$87B', 'Global software market for marketing intelligence, content SaaS, and creator tools.'],
              ['SAM', '$12B', 'AI-first marketing tools for SMB through enterprise.'],
              ['Creator/SMB sub-TAM', '$6B', 'Serviceable market focused on creators and SMBs, excluding enterprise-heavy spend.'],
              ['SOM (Year 3)', '$150M', 'Under 1.5% SAM penetration target.'],
            ].map(([label, value, desc]) => (
              <article key={label} className="deck-card rounded-2xl p-5">
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-2">{label}</p>
                <p className="deck-heading text-4xl font-bold text-ink tabular-nums">{value}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink/80 font-medium italic">{desc}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Market Focus</p>
            <div className="space-y-4">
              {[
                { label: 'TAM $87B', width: 100, tone: 'from-emerald-500 to-emerald-400' },
                { label: 'SAM $12B', width: 38, tone: 'from-emerald-600/80 to-emerald-500/80' },
                { label: 'Creator/SMB $6B', width: 24, tone: 'from-slate-500 to-slate-400' },
                { label: 'SOM $150M', width: 8, tone: 'from-slate-600 to-slate-500' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="deck-mono mb-1.5 text-[10px] tracking-[0.1em] text-sage/95 font-medium italic">{bar.label}</div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full bg-gradient-to-r ${bar.tone}`} style={{ width: `${bar.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>

        {/* Slide 10 */}
        <SlideShell id="slide-10" index={10} title="Business Model" subtitle="SaaS first, then API, local app, and ecosystem revenue.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'SaaS subscriptions (now)',
                body: 'Start with a free trial, then convert into paid self-serve plans at $15/month (Starter) and $35/month (Pro).',
              },
              {
                title: 'API + cloud add-ons (Phase 1+)',
                body: 'A usage-based API plus sync, collaboration, and analytics layers for teams that want Florus beyond the core app.',
              },
              {
                title: 'Local app + ecosystem (Phase 2+)',
                body: 'Freemium desktop app, premium plugins, and marketplace take-rate as the builder ecosystem matures around the core workflow.',
              },
            ].map((item) => (
              <article key={item.title} className="bg-hull border-2 border-ink shadow-brutalist p-8">
                <h3 className="text-lg font-semibold text-ink mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-lg font-semibold text-ink mb-3">Flywheel Defensibility</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-ink/80 font-medium italic">
                <li><span className="font-bold text-ink">Data Moat:</span> Every campaign refined our ranking model.</li>
                <li><span className="font-bold text-ink">Outcome Lifts:</span> Better rankings drive better results, attracting demand.</li>
                <li><span className="font-bold text-ink">Ecosystem Lock-in:</span> Local workflows, plugins, and verification create switching costs.</li>
              </ul>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8 bg-slate-50 flex flex-col justify-center">
              <p className="text-base font-semibold text-ink italic text-center">
                GeoCompanion doesn't just manage workflows; it owns the outcome data that makes autonomous execution reliable.
              </p>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              Florus starts with subscription revenue, expands into API and cloud usage, and later adds local app, plugin, and marketplace revenue once the ecosystem matures.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80 font-medium italic">
              Billing stays on fiat. The on-chain layer is chain-agnostic and exists to prove performance history, preserve provenance, and make agent selection auditable for enterprise buyers.
            </p>
          </div>
        </SlideShell>

        {/* Slide 11 */}
        <SlideShell id="slide-11" index={11} title="Flywheel" subtitle="Every workflow improves the next one.">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {flywheelRows.map((item, idx) => (
              <article key={item.title} className="deck-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>{item.icon}</div>
                  <span className="deck-mono text-[9px] text-slate-700">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr,1fr]">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-3">Compounding loop</p>
              <p className="text-lg leading-relaxed text-ink">
                Better audits drive better content. Better content creates better outcome data. Vision Navigator turns that
                repeated usage into strategic guidance on whether the business is moving in the right direction before it
                scales execution further.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  ['Phase 0', 'Own the diagnosis \u2192 execution workflow'],
                  ['Phase 1', 'Open the platform through API, desktop, and CLI workflows'],
                  ['Phase 2', 'Plugin ecosystem and verified marketplace on top of the core engine'],
                ].map(([phase, detail]) => (
                  <div key={phase} className="rounded-xl border border-slate-100 bg-white p-4">
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-sage/95 font-medium italic mb-1">{phase}</p>
                    <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-sage/95 font-medium italic mb-4">Longer-term upside</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-ink mb-1">Vision Navigator</p>
                  <p className="text-sm leading-relaxed text-ink/80 font-medium italic">As more teams use the system, Florus gets better at helping companies understand whether they are running in the right direction before scaling more budget and effort.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-ink mb-1">Marketplace routing</p>
                  <p className="text-sm leading-relaxed text-ink/80 font-medium italic">As more partner products, plugins, and local workflows plug in, routing and ranking become a monetizable execution layer on top of that intelligence system.</p>
                </div>
              </div>
            </article>
          </div>
        </SlideShell>

        {/* Slide 12 */}
        <SlideShell id="slide-12" index={12} title="Team" subtitle="Engineering depth, product insight, and distribution in one founding group.">
          <div className="grid gap-5 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="bg-hull border-2 border-ink shadow-brutalist p-8 transform rotate-1 flex h-full flex-col">
                <div className="flex items-start gap-5">
                  <TeamAvatar member={member} />
                  <div className="pt-1">
                    <h3 className="deck-heading text-3xl font-bold text-ink leading-none">{member.name}</h3>
                    <p className="deck-mono mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-sage/95 font-medium italic">{member.role}</p>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-ink/80 transition-colors hover:text-ink"
                    >
                      <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                      LinkedIn
                    </a>
                </div>
                </div>

                <p className="mt-5 text-[13px] leading-relaxed text-sage/95 font-medium italic">
                  {member.body}
                </p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-ink/80 font-medium italic">
              Most marketing AI startups have strong engineering or strong distribution. Florus has both,
              plus product-level content science.
            </p>
          </div>
        </SlideShell>

        {/* Slide 13 */}
        <SlideShell
          id="slide-13"
          index={13}
          title="The Ask"
          subtitle="Raising a focused pre-seed now to convert product signal into revenue and seed readiness."
        >
          <div className="grid gap-5 lg:grid-cols-[1fr,1.12fr]">
            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-5">Use of funds</h3>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 mb-5">
                {[
                  { pct: 40, tone: 'bg-emerald-400' },
                  { pct: 30, tone: 'bg-emerald-600' },
                  { pct: 20, tone: 'bg-slate-500' },
                  { pct: 10, tone: 'bg-slate-600' },
                ].map((seg, idx) => (
                  <span key={`${seg.pct}-${idx}`} className={`inline-block h-full ${seg.tone}`} style={{ width: `${seg.pct}%` }} />
                ))}
              </div>

              <div className="space-y-3">
                {askRows.map((row, idx) => {
                  const pct = Number.parseInt(row.allocation, 10) || 0;
                  const icon = [
                    <Cpu className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" />,
                    <Target className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                    <Server className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                    <Wallet className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />,
                  ][idx] || <Activity className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />;

                  return (
                    <div key={row.allocation} className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {icon}
                          <p className="text-sm font-semibold text-ink">{row.allocation}</p>
                        </div>
                        <span className="deck-mono text-[9px] text-sage/95 font-medium italic">{pct}%</span>
                      </div>
                      <p className="text-sm leading-relaxed text-ink/80 font-medium italic">{row.use}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="bg-hull border-2 border-ink shadow-brutalist p-8">
              <h3 className="text-xl font-semibold text-ink mb-5">This round</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Raise', value: '$1.25M', detail: 'SAFE round sized for 18 months of runway and disciplined hiring', icon: <Rocket className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /> },
                  { title: 'Target cap', value: '$12M', detail: 'Priced to match current beta traction and leave room for seed step-up', icon: <Building2 className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" /> },
                  { title: 'Unlocks', value: '$100K MRR', detail: 'Goal: 25+ paying customers and a clean seed story by late 2027', icon: <CheckCircle2 className="h-4 w-4 text-sage font-bold uppercase tracking-widest bg-ink/5 px-2 py-0.5" aria-hidden="true" /> },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="mb-2">{item.icon}</div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic mb-1">{item.title}</p>
                    <p className="deck-heading text-2xl font-bold text-ink tabular-nums">{item.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/80 font-medium italic">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-sm leading-relaxed text-ink">
                We are raising one round: $1.25M on a $12M cap. If we join an accelerator, it will be because it helps
                fill this same round with strategic capital, distribution, and follow-on access, not because we are changing
                the plan.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/80 font-medium italic">
                Near term, this capital funds SaaS traction and revenue. Long term, the same core can expand into a local-first app, CLI, and plugin ecosystem without changing the product thesis.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="deck-mono inline-flex rounded-full border border-slate-100 bg-white/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">Ask: $1.25M SAFE on $12M cap</span>
            <span className="deck-mono inline-flex rounded-full border border-slate-100 bg-white/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-sage/95 font-medium italic">Accelerator participates only if it strengthens the same round</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-slate-100 bg-white/40 px-4 py-3">
            <Mail className="h-4 w-4 text-sage/95 font-medium italic" aria-hidden="true" />
            <a
              href="mailto:intern@geocompanion.ai"
              className="deck-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-sage"
            >
              intern@geocompanion.ai
            </a>
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
