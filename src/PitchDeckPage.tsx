import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ChevronDown, Sparkles, Radar, Bot, ShieldCheck, BarChart3, Coins, Users, Search, DollarSign, Building2, Handshake, Rocket, Target, Activity, Wallet, Cpu, Server, CheckCircle2 } from 'lucide-react';
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
    className="deck-slide flex flex-col justify-center snap-start min-h-[100svh] px-5 pb-14 pt-20 md:px-10 lg:px-14 lg:pt-24"
  >
    <div className="mx-auto w-full max-w-7xl relative">
      <span
        className="pointer-events-none select-none absolute -top-8 -right-8 font-bold leading-none"
        style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', color: 'rgba(15, 17, 21, 0.03)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.05em' }}
        aria-hidden="true"
      >
        {String(index).padStart(2, '0')}
      </span>

      <p className="deck-slide-counter mb-6" aria-hidden="true">
        {String(index).padStart(2, '0')} — 13
      </p>

      <h2 className="deck-slide-title text-5xl font-bold leading-[1.02] text-onyx sm:text-6xl lg:text-[4.5rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="deck-slide-subtitle mt-6 max-w-xl text-lg leading-relaxed text-stardust">{subtitle}</p>
      ) : null}

      <div className="deck-slide-body mt-10">{children}</div>
    </div>
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
        className="deck-mono text-[10px] text-stardust hover:text-stardust transition-colors"
      >
        &#8599; {item.label}
      </a>
    ))}
  </div>
);

const GeoCompanionMark = ({ size = 36 }: { size?: number }) => (
  <div
    className="relative rounded-xl border border-slate-200/50 bg-white shadow-sm"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <svg viewBox="0 0 100 100" className="h-full w-full p-2.5">
      <defs>
        <linearGradient id="gclogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F1115" />
          <stop offset="100%" stopColor="#6B7280" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="none" stroke="url(#gclogo)" strokeWidth="7" strokeLinecap="round" strokeDasharray="160 70" />
      <path d="M38 60 L50 40 L63 60" fill="none" stroke="#0F1115" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="5" fill="#00E5FF" />
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
  body: string;
};

const HookWeightBar = ({ label, weight, tone }: HookWeight) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="deck-mono text-[9px] tracking-[0.1em] uppercase text-stardust">{label}</span>
      <span className="deck-mono text-[9px] text-stardust">{Math.round(weight * 100)}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-slate-100">
      <div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${weight * 100}%` }} />
    </div>
  </div>
);

const PublicAgentCard = ({ name, cloud, context, accent, hooks }: PublicAgentCardProps) => (
  <article className="h-full rounded-xl border border-slate-100 bg-white p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="deck-mono text-[9px] uppercase tracking-[0.18em] text-stardust">{cloud}</p>
        <p className="mt-1 text-base font-semibold text-onyx deck-heading">{name}</p>
        <p className="mt-1 text-xs leading-relaxed text-stardust">{context}</p>
      </div>
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 ${accent}`}>
        <Bot className="h-6 w-6" aria-hidden="true" />
      </div>
    </div>

    <div className="mt-4 space-y-2.5">
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
    body: 'Serial technical founder with two exits. Raised $1.3M in venture capital and generated $1.3M in product revenue at Honeypot Finance. Previously Co-Founder/CTO at Antslabor (acquired; ranked Top 30 most innovative startups in Canada) and Senior Software Architect at Mastodon, one of the largest decentralized social infrastructure projects in production. Brings a rare combination of product engineering depth, agent architecture experience, and prior fundraising across Web2 and Web3.',
  },
  {
    name: 'Huan',
    role: 'Co-Founder & Product',
    photo: huanImage,
    photoAlt: 'Portrait of Huan',
    photoPosition: 'center 20%',
    body: 'Product leader spanning Web3, AI, and traditional finance. At GeoCompanion, owns the loop between GEO signal and content execution, the core conversion mechanic behind the platform thesis. Focuses on turning technical capability into workflows marketing teams can actually adopt, bridging product strategy, customer use cases, and day-to-day execution.',
  },
  {
    name: 'Austin',
    role: 'Co-Founder & GTM',
    photo: austinImage,
    photoAlt: 'Portrait of Austin',
    photoPosition: 'center 16%',
    body: 'Enterprise distribution leader with relationship-driven access into networks around LayerZero, Sei, and Xiaomi. Built and scaled a media project to 100M+ organic streams, demonstrating platform-native distribution at scale, the same playbook GeoCompanion sells to brands. Understands creator economics from both the operator side and the platform side.',
  },
];

const TeamAvatar = ({ member }: { member: TeamMember }) => {
  const initials = member.name.slice(0, 1);

  return (
    <div className="relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_48px_rgba(0,0,0,0.45)]">
      <img
        src={member.photo}
        alt={member.photoAlt}
        className="h-full w-full object-cover"
        style={{ objectPosition: member.photoPosition }}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = 'none';
          const fallback = event.currentTarget.nextElementSibling as HTMLDivElement | null;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-slate-950 text-2xl font-semibold text-onyx">
        {initials}
      </div>
    </div>
  );
};

const competitorRows = [
  {
    category: 'GEO / AI search scoring',
    brightedge: 'Yes',
    evertune: 'Yes (measurement)',
    athena: 'Yes (monitoring)',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Fix outputs you can deploy',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes',
  },
  {
    category: 'Social content execution',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'Yes (generic)',
    geoCompanion: 'Yes (platform-native)',
  },
  {
    category: 'Agent API (machine-to-machine)',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes (Phase 1)',
  },
  {
    category: 'On-chain performance verification',
    brightedge: 'No',
    evertune: 'No',
    athena: 'No',
    surfer: 'No',
    jasper: 'No',
    geoCompanion: 'Yes (Phase 5)',
  },
  {
    category: 'SMB / creator accessible',
    brightedge: 'No',
    evertune: 'No',
    athena: 'Partial',
    surfer: 'Yes',
    jasper: 'Yes',
    geoCompanion: 'Yes',
  },
  {
    category: 'Entry price',
    brightedge: '$12K+/yr',
    evertune: '$3K/mo',
    athena: '$295/mo',
    surfer: '$79/mo',
    jasper: '$39/mo',
    geoCompanion: 'Beta free \u2192 <$10/mo starter',
  },
];

const marketRows = [
  {
    market: 'AI Search Optimization (GEO / AEO)',
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
    ships: 'GEO Audit + Vibe Marketing',
    target: '1,500+ users, 10K+ search events, 50 creator accounts, and first 10 paying teams.',
  },
  {
    phase: 'Phase 1\u20133',
    when: 'Q3 2026 \u2192 Q4 2027',
    ships: 'Enterprise Strategic Intelligence',
    target: '$100K MRR, 25+ agency customers, 500 creator accounts, and upmarket expansion.',
  },
  {
    phase: 'Phase 4\u20135',
    when: '2028+',
    ships: 'Agent Marketplace + On-Chain Trust',
    target: '$50M+ ARR, 120+ enterprise customers, 5,000 creator accounts, and verified infrastructure.',
  },
];

const flywheelRows = [
  {
    title: 'Diagnose',
    body: 'Run a GEO audit to surface visibility gaps, citation risks, and priority fixes.',
    icon: <Radar className="h-4 w-4 text-stardust" aria-hidden="true" />,
  },
  {
    title: 'Create',
    body: 'Turn those gaps into platform-native hooks, campaigns, and content systems.',
    icon: <Sparkles className="h-4 w-4 text-accent-cyan" aria-hidden="true" />,
  },
  {
    title: 'Deploy',
    body: 'Ship through SaaS workflows today and through agent/API calls as usage expands.',
    icon: <Rocket className="h-4 w-4 text-stardust" aria-hidden="true" />,
  },
  {
    title: 'Learn',
    body: 'Outcome data improves recommendations, routing, and future marketplace trust signals.',
    icon: <Activity className="h-4 w-4 text-accent-cyan" aria-hidden="true" />,
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
        slide.style.width = `${Math.ceil(sourceRect.width)}px`;
        slide.style.minHeight = `${Math.ceil(sourceRect.height)}px`;
        slide.style.height = `${Math.ceil(sourceRect.height)}px`;
        slide.style.paddingTop = '80px';
        slide.style.paddingRight = sourceStyle.paddingRight;
        slide.style.paddingBottom = '48px';
        slide.style.paddingLeft = sourceStyle.paddingLeft;
        
        // Ensure bg-onyx children keep their dark background in PDF
        slide.querySelectorAll<HTMLElement>('.bg-onyx').forEach(el => {
          el.style.backgroundColor = '#0F1115';
          el.style.color = '#FFFFFF';
        });

        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'deck-grid pointer-events-none absolute inset-0';
        slide.appendChild(gridOverlay);

        exportStage.appendChild(slide);

        const layoutRoot = slide.firstElementChild as HTMLElement | null;
        if (layoutRoot) {
          layoutRoot.style.maxWidth = '80rem';
          layoutRoot.style.width = '100%';
          layoutRoot.style.marginLeft = 'auto';
          layoutRoot.style.marginRight = 'auto';
        }

        slide.querySelectorAll<HTMLElement>('.overflow-x-auto').forEach(node => {
          node.style.overflow = 'visible';
        });
        slide.querySelectorAll<HTMLElement>('.deck-table').forEach(table => {
          table.style.width = '100%';
          table.style.minWidth = '0';
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

        .deck-slide-counter {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(107, 114, 128, 0.55);
          text-transform: uppercase;
        }

        .deck-grid {
          background-image:
            linear-gradient(to right, rgba(15, 17, 21, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 17, 21, 0.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        .deck-card {
          border: 1px solid rgba(15, 17, 21, 0.04);
          background-color: #FFFFFF;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .deck-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(15, 17, 21, 0.08);
        }

        .deck-slide h2 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          letter-spacing: -0.025em;
          text-wrap: balance;
          animation: slideIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .deck-sheen {
          position: relative;
          overflow: hidden;
        }

        .deck-sheen::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(45deg);
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
        }

        .deck-sheen:hover::after {
          transform: rotate(45deg) translate(20%, 20%);
        }

        .deck-hero-ring {
          position: relative;
          isolation: isolate;
        }

        .deck-hero-ring::before {
          content: "";
          position: absolute;
          inset: -10px;
          border-radius: 20px;
          background: conic-gradient(from 120deg, rgba(45,212,191,0.32), rgba(34,211,238,0.09), rgba(16,185,129,0.25), rgba(45,212,191,0.32));
          filter: blur(14px);
          z-index: -1;
          animation: deckSpin 14s linear infinite;
        }

        @keyframes deckSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .deck-slide h3 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          letter-spacing: -0.015em;
          margin-bottom: 1rem;
        }

        .deck-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .deck-table th {
          text-align: left;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.67rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(107, 114, 128, 0.8);
          font-weight: 500;
          background: #FAFBFC;
        }

        .deck-table th,
        .deck-table td {
          border: 1px solid rgba(15, 17, 21, 0.04);
          padding: 0.72rem 0.875rem;
          vertical-align: top;
        }

        .deck-table td {
          color: rgba(15, 17, 21, 0.85);
          line-height: 1.5;
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
            className="inline-flex items-center gap-2 text-stardust hover:text-onyx transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="deck-mono text-[10px] tracking-[0.15em] uppercase">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <GeoCompanionMark size={28} />
            <div>
              <p className="deck-mono text-[10px] tracking-[0.22em] text-onyx uppercase">GeoCompanion.ai</p>
              <p className="deck-mono text-[9px] tracking-[0.14em] text-stardust">Investor Deck &middot; 2026</p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/8 px-4 py-2 text-accent-cyan transition hover:bg-accent-cyan/15 hover:border-accent-cyan/35 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b14]"
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
          title="AI now decides who gets found. Most businesses have no system to change that."
          subtitle="The intelligence layer for an AI-first world. One workflow from diagnosis to execution."
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="deck-card rounded-3xl p-8 lg:col-span-7 lg:mt-4">
              <div className="mb-6 flex items-center gap-3">
                <GeoCompanionMark size={28} />
                <span className="deck-mono text-[10px] tracking-[0.2em] uppercase text-stardust">Enterprise Strategic Intelligence Platform</span>
              </div>
              <p className="deck-mono text-[9px] uppercase tracking-[0.2em] text-stardust mb-3">Core Mission</p>
              <p className="text-2xl font-semibold leading-relaxed text-onyx sm:text-3xl">
                Helping brands win AI citations and build platform-native content that captures market attention.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-stardust">
                GeoCompanion bridges the gap between diagnosis and execution, surfacing exactly where you are missing citations and providing the native content system to fix it.
              </p>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="deck-card deck-hero-ring rounded-2xl p-6">
                <p className="deck-mono text-[9px] uppercase tracking-[0.18em] text-stardust mb-4">The Destination</p>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
                      <Radar className="h-5 w-5 text-accent-cyan" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-onyx">Strategic Intelligence</p>
                      <p className="mt-0.5 text-sm text-stardust">Vision, market positioning, predictive analytics</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
                      <Bot className="h-5 w-5 text-accent-violet" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-onyx">Agent Marketplace</p>
                      <p className="mt-0.5 text-sm text-stardust">Agents ranked by verified outcome data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
                      <ShieldCheck className="h-5 w-5 text-indigo-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-onyx">On-Chain Trust</p>
                      <p className="mt-0.5 text-sm text-stardust">Immutable performance attestation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <Sparkles className="h-4 w-4 text-accent-cyan" aria-hidden="true" />, label: 'Today', value: 'GEO + Vibe Marketing' },
                  { icon: <BarChart3 className="h-4 w-4 text-accent-violet" aria-hidden="true" />, label: 'Phase 1\u20133', value: 'Enterprise Intelligence' },
                ].map((item) => (
                  <div key={item.label} className="deck-card flex items-center gap-4 rounded-xl p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50">{item.icon}</div>
                    <div>
                      <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-stardust">{item.label}</p>
                      <p className="text-sm font-bold text-onyx">{item.value}</p>
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
                <article key={item.label} className="deck-card rounded-3xl p-6 text-center">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-stardust">{item.label}</p>
                  <p className="deck-heading mt-4 text-4xl font-bold text-onyx tabular-nums">{item.value}</p>
                  <p className="mt-3 text-[10px] leading-tight text-stardust">{item.note}</p>
                </article>
              ))}
            </div>
            <div className="lg:col-span-4 bg-slate-50/50 rounded-3xl border border-slate-100 p-6 flex items-center justify-center text-center">
               <p className="text-sm font-medium text-stardust italic">The gap between diagnosis and execution is the single biggest leak in marketing ROI today.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <article className="deck-card rounded-2xl p-6">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust flex items-center gap-2 mb-4">
                <Search className="h-3 w-3" aria-hidden="true" />
                Discovery changed
              </p>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust mb-1.5">Old playbook</p>
                <p className="text-sm leading-relaxed text-stardust">SEO rankings on Google blue links.</p>
              </div>
              <div className="mt-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-accent-cyan mb-1.5">New reality</p>
                <p className="text-sm leading-relaxed text-onyx">
                  AI answer engines decide visibility. Ranking pages no longer guarantees citation in answers.
                </p>
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust flex items-center gap-2 mb-4">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Content changed
              </p>
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust mb-1.5">Old playbook</p>
                <p className="text-sm leading-relaxed text-stardust">Polished campaigns produced by large teams/agencies.</p>
              </div>
              <div className="mt-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-accent-cyan mb-1.5">New reality</p>
                <p className="text-sm leading-relaxed text-onyx">
                  Platform-native creator execution wins attention, but requires a repeatable multi-platform system.
                </p>
              </div>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-4">The structural gap</p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-stardust">GEO tools measure visibility but do not create content.</div>
              <div className="rounded-xl border border-slate-100 bg-white p-4 text-sm text-stardust">Content tools generate posts but do not optimize AI citation share.</div>
              <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-sm font-medium text-onyx">GeoCompanion connects diagnosis, execution, and compounding outcomes.</div>
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
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                tag: 'Shift 1',
                title: 'Behavior shifts faster than tooling',
                body: 'Buyers are moving toward AI answers now, but teams still use SEO stacks built for the old web.',
              },
              {
                tag: 'Shift 2',
                title: 'Creator-native budgets',
                body: 'Teams want platform-native content, but the market stills separates strategy from execution.',
              },
              {
                tag: 'Shift 3',
                title: 'Agent Infrastructure',
                body: 'Machine-to-machine workflows mean this becomes a platform play, not just a point solution.',
              },
            ].map((item, idx) => (
              <article key={item.tag} className={`deck-card rounded-2xl p-7 ${idx === 1 ? 'lg:mt-8' : ''}`}>
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-4">{item.tag}</p>
                <h3 className="text-xl font-bold text-onyx">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stardust">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="deck-card rounded-2xl p-8 lg:col-span-7 bg-accent-cyan/5 border-accent-cyan/10">
              <p className="deck-mono text-[10px] uppercase tracking-[0.16em] text-accent-cyan mb-3">The Window</p>
              <p className="text-xl font-medium leading-relaxed text-onyx">
                Incumbents skew toward enterprise reporting. The <span className="text-accent-cyan font-bold">SMB, creator, and agent-native layer</span> is still wide open for a category-defining workflow.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="deck-card rounded-2xl p-6 bg-white shadow-elevation">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent-cyan" />
                  <p className="text-sm font-bold text-onyx">Early Advantage</p>
                </div>
                <p className="mt-2 text-sm text-stardust">We aren't just competing in a workflow; we are defining it before the incumbents pivot from reporting to execution.</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* Slide 4 */}
        <SlideShell id="slide-4" index={4} title="Our Solution" subtitle="Two engines, one workflow, one prioritized action plan.">
          <div className="grid gap-8 lg:grid-cols-12">
            <article className="deck-card rounded-3xl p-8 lg:col-span-6 bg-white shadow-elevation flex flex-col justify-between">
              <div>
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-6">Execution Engines</p>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 group transition-all hover:bg-white hover:shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white border border-slate-100"><Search className="h-5 w-5 text-accent-cyan" aria-hidden="true" /></div>
                      <p className="text-lg font-bold text-onyx">GEO Audit Engine</p>
                    </div>
                    <ul className="space-y-2 text-sm text-stardust">
                      <li>• Citation-share competitive analysis</li>
                      <li>• EEAT & algorithm fit scoring</li>
                      <li>• Deployable fix prioritization</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 group transition-all hover:bg-white hover:shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-white border border-slate-100"><Sparkles className="h-5 w-5 text-accent-violet" aria-hidden="true" /></div>
                      <p className="text-lg font-bold text-onyx">Vibe Marketing Engine</p>
                    </div>
                    <ul className="space-y-2 text-sm text-stardust">
                      <li>• Platform-native voice detection</li>
                      <li>• Hook-based campaign architecting</li>
                      <li>• Voice-consistent automated generation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <article className="lg:col-span-6 space-y-6">
              <div className="deck-card deck-sheen rounded-3xl p-8 !bg-onyx !text-white overflow-hidden">
                <p className="deck-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-4">The Output</p>
                <h3 className="text-2xl font-bold mb-4">The "Prioritized Action Plan"</h3>
                <p className="text-slate-100 leading-relaxed font-medium">We don't just dump data. GeoCompanion produces a single backlog of high-impact moves across SEO, AI citation, and social content.</p>
                <div className="mt-8 flex items-center gap-4">
                   <div className="h-px flex-1 bg-slate-800" />
                   <div className="text-[10px] deck-mono text-slate-500">AUTOMATED WORKFLOW</div>
                </div>
              </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Latency', value: '15s' },
                    { label: 'Price', value: '<$10/mo' },
                  ].map(stat => (
                    <div key={stat.label} className="deck-card rounded-2xl p-6 text-center">
                       <p className="deck-mono text-[9px] text-stardust uppercase tracking-widest">{stat.label}</p>
                       <p className="text-2xl font-bold text-onyx mt-1">{stat.value}</p>
                    </div>
                  ))}
               </div>
            </article>
          </div>
        </SlideShell>

        {/* Slide 5 */}
        <SlideShell
          id="slide-5"
          index={5}
          title="Why We're Different"
          subtitle="Others either diagnose or create. We do both, and connect the loop."
        >
          <div className="deck-card overflow-x-auto rounded-2xl">
            <table className="deck-table min-w-[900px]">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>BrightEdge</th>
                  <th>Evertune</th>
                  <th>AthenaHQ</th>
                  <th>Surfer SEO</th>
                  <th>Jasper / Copy.ai</th>
                  <th>GeoCompanion</th>
                </tr>
              </thead>
              <tbody>
                {competitorRows.map((row) => (
                  <tr key={row.category}>
                    <td className="font-medium text-onyx">{row.category}</td>
                    <td>{row.brightedge}</td>
                    <td>{row.evertune}</td>
                    <td>{row.athena}</td>
                    <td>{row.surfer}</td>
                    <td>{row.jasper}</td>
                    <td className="font-semibold text-accent-cyan">{row.geoCompanion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              'GEO + content execution in one product.',
              'Agent-queryable API and ranking layer built on proprietary outcome data.',
              'Verifiable agent performance for enterprise trust.',
            ].map((gap, idx) => (
              <div key={gap} className="deck-card rounded-xl p-5">
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-2">Gap {idx + 1}</p>
                <p className="text-sm leading-relaxed text-onyx">{gap}</p>
              </div>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-lg leading-relaxed text-onyx">
              Others either diagnose or create. We do both, and connect the loop.
            </p>
          </div>
        </SlideShell>

        {/* Slide 6 */}
        <SlideShell id="slide-6" index={6} title="Platform Vision" subtitle="From workflow to intelligence to a verified agent economy.">
          <div className="deck-card rounded-2xl p-6">
            <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-5">
                <p className="text-base leading-relaxed text-onyx">
                  <span className="font-bold">The Moat:</span> Every audit and campaign feeds our ranking model. This outcome data is a proprietary training signal that no generic intelligence platform can replicate.
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-white p-5">
                <p className="text-sm leading-relaxed text-stardust">
                  <span className="font-bold">Vision Navigator:</span> We help brands answer whether they are running in the right direction before they scale execution budget.
                </p>
              </div>
            </div>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-4">Step-by-step build path</p>
            <div className="grid gap-4 md:grid-cols-3">
              {buildPathRows.map((item, idx) => {
                const icon = [
                  <Rocket className="h-4 w-4 text-accent-cyan" aria-hidden="true" />,
                  <Server className="h-4 w-4 text-stardust" aria-hidden="true" />,
                  <Activity className="h-4 w-4 text-stardust" aria-hidden="true" />,
                ][idx];

                return (
                  <article key={item.phase} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="deck-mono text-[9px] uppercase tracking-[0.14em] text-stardust">{item.phase}</span>
                      {icon}
                    </div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust mb-1">{item.when}</p>
                    <p className="deck-heading text-base font-semibold text-onyx mb-2">{item.ships}</p>
                    <p className="text-sm leading-relaxed text-stardust">{item.target}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['Training signal', 'Each audit and campaign adds the ranking data that improves which agent wins future jobs.'],
              ['Enterprise intelligence', 'The next layer is continuous decision support, not just another dashboard or one-off report.'],
              ['Verified trust', 'The marketplace only works if enterprise buyers can audit real performance history before they trust an agent.'],
            ].map(([title, body]) => (
              <article key={title} className="deck-card rounded-2xl p-5">
                <h3 className="text-base font-semibold text-onyx mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-stardust">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-stardust">
              Phase 0 is intentional. The app generates the proprietary training signal that makes Phase 1 routing defensible. We are not pivoting to infra; we are building toward it with every workflow we run today.
            </p>
          </div>
        </SlideShell>

        {/* Slide 7 */}
        <SlideShell id="slide-7" index={7} title="Agent Marketplace" subtitle="Private context in, best-fit execution out.">
          <div className="deck-card rounded-2xl p-6">
            <div className="grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust mb-1">1. Private Context</p>
                  <p className="text-sm text-stardust">Brands send platform, product, and objective context.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust mb-1">2. Smart Routing</p>
                  <p className="text-sm text-stardust">GeoCompanion selects agents by verified hook performance and outcome history.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust mb-1">3. Native Execution</p>
                  <p className="text-sm text-stardust">Agents execute and feed outcomes back into the ranking loop.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-4">Request flow</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <Bot className="h-4 w-4 text-stardust" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust">Personal agent</p>
                          <p className="text-xs font-semibold text-onyx">Private context</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-stardust">TikTok, skincare launch, beauty / DTC.</p>
                    </div>

                    <div className="rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <Server className="h-4 w-4 text-accent-cyan" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust">GeoCompanion</p>
                          <p className="text-xs font-semibold text-onyx">Routing layer</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-stardust">Scores hook fit, availability, and performance.</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
                          <ShieldCheck className="h-4 w-4 text-stardust" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust">Public agents</p>
                          <p className="text-xs font-semibold text-onyx">Marketplace agents</p>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-stardust">AWS / GCP deployed agents with different hook mixes.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust">Public agent examples</p>
                      <p className="mt-1 text-xs text-stardust">Each agent mixes several hook patterns at different weights, like a recipe for tone and structure.</p>
                    </div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust">Cloud-deployed</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <PublicAgentCard
                      name="Alice"
                      cloud="AWS"
                      context="Weighted for contrast-led product storytelling."
                      accent="text-accent-cyan"
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
                      accent="text-stardust"
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
              ['Cloud-native layer', 'Public agents run on AWS or GCP while personal agents keep private context local.'],
              ['Compounding loop', 'Measured outcomes improve routing quality, ranking history, and future hook weights.'],
            ].map(([title, body]) => (
              <article key={title} className="deck-card rounded-2xl p-5">
                <h3 className="text-base font-semibold text-onyx mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-stardust">{body}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-stardust">
              The on-chain layer (ERC8004) is a trust primitive, not a payment mechanism. Billing stays on fiat throughout.
              The chain provides immutable performance attestation that enterprise buyers require before trusting autonomous
              agents with their brand.
            </p>
          </div>
        </SlideShell>

        {/* Slide 8 */}
        <SlideShell id="slide-8" index={8} title="Early Signal" subtitle="Pre-revenue for now. Here is the signal we are building toward.">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: 'Website Visitors', value: '457', icon: <Users className="h-4 w-4 text-stardust" aria-hidden="true" /> },
              { label: 'Active Users', value: '340', icon: <Search className="h-4 w-4 text-stardust" aria-hidden="true" /> },
              { label: 'Search Events', value: '2,326', icon: <BarChart3 className="h-4 w-4 text-stardust" aria-hidden="true" /> },
              { label: 'Activation Rate', value: '74%', icon: <DollarSign className="h-4 w-4 text-accent-cyan" aria-hidden="true" /> },
            ].map((kpi) => (
              <article key={kpi.label} className="deck-card rounded-2xl p-5">
                <div>{kpi.icon}</div>
                <p className="deck-mono mt-3 text-[9px] uppercase tracking-[0.14em] text-stardust">{kpi.label}</p>
                <p className="deck-heading mt-2 text-5xl font-bold text-onyx tabular-nums">{kpi.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr,1fr]">
            <article className="deck-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-onyx mb-4">The Beta Thesis</h3>
              <p className="text-sm leading-relaxed text-stardust">
                We are seeing <span className="font-bold text-onyx">74% activation</span> and 6.8 searches per active user. This depth of engagement proves users treat GeoCompanion as a core operating surface, not a one-time demo.
              </p>
              <div className="mt-6 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-sm leading-relaxed text-onyx">
                This round builds our upmarket intelligence layer and scales conversion to durable revenue.
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-onyx mb-4">Milestones from beta to IPO window</h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'Pre-seed / Accelerator',
                    desc: 'Convert beta traffic into repeat product usage and first revenue before institutional seed.',
                    target: 'Goal by Q2 2026: 1.5K users, 10K searches, 50 creator/KOL customer accounts, 10 paying brand or agency teams, $5K\u2013$10K MRR',
                    icon: <Building2 className="h-4 w-4 text-stardust" aria-hidden="true" />,
                  },
                  {
                    title: 'Seed / Series A',
                    desc: 'Move upmarket with intelligence workflows and prove expansion revenue across SMB, agency, and enterprise accounts.',
                    target: 'Goal by Q4 2027: 25+ brand or agency customers, 500 creator/KOL customer accounts, $100K MRR, <3 month payback, strong retention',
                    icon: <Users className="h-4 w-4 text-stardust" aria-hidden="true" />,
                  },
                  {
                    title: 'Growth / IPO readiness',
                    desc: 'Use marketplace and verification infrastructure to become the system of record for AI-native marketing performance.',
                    target: 'Goal by Q3 2029: $50M+ ARR, 120+ enterprise or agency customers, 5,000 creator/KOL customer accounts, enterprise-grade reporting and controls',
                    icon: <Handshake className="h-4 w-4 text-accent-cyan" aria-hidden="true" />,
                  },
                ].map((channel) => (
                  <div key={channel.title} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      {channel.icon}
                      <p className="text-sm font-semibold text-onyx">{channel.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-stardust">{channel.desc}</p>
                    <p className="deck-mono mt-2 text-[9px] uppercase tracking-[0.1em] text-stardust">{channel.target}</p>
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
                    <td className="font-medium text-onyx">{row.market}</td>
                    <td>{row.size}</td>
                    <td className="font-semibold text-accent-cyan">{row.growth}</td>
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
                <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-2">{label}</p>
                <p className="deck-heading text-4xl font-bold text-onyx tabular-nums">{value}</p>
                <p className="mt-2 text-xs leading-relaxed text-stardust">{desc}</p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-4">Market Focus</p>
            <div className="space-y-4">
              {[
                { label: 'TAM $87B', width: 100, tone: 'from-emerald-500 to-emerald-400' },
                { label: 'SAM $12B', width: 38, tone: 'from-emerald-600/80 to-emerald-500/80' },
                { label: 'Creator/SMB $6B', width: 24, tone: 'from-slate-500 to-slate-400' },
                { label: 'SOM $150M', width: 8, tone: 'from-slate-600 to-slate-500' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="deck-mono mb-1.5 text-[10px] tracking-[0.1em] text-stardust">{bar.label}</div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full bg-gradient-to-r ${bar.tone}`} style={{ width: `${bar.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>

        {/* Slide 10 */}
        <SlideShell id="slide-10" index={10} title="Business Model" subtitle="Three layers, each compounding the previous one.">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'SaaS subscriptions (now)',
                body: 'Beta is free today. Paid launch starts under $10/month, then scales through Agency and Enterprise tiers.',
              },
              {
                title: 'Agent API (Phase 1)',
                body: 'Usage-based API billing for autonomous agents and enterprise workflows, billed in fiat while the trust layer stays separate.',
              },
              {
                title: 'Marketplace take-rate (Phase 4+)',
                body: '15\u201320% commission on verified agent transactions. Creators keep 80\u201385%, while personal agents route spend to top-ranked public agents.',
              },
            ].map((item) => (
              <article key={item.title} className="deck-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-onyx mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-stardust">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="deck-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-onyx mb-3">Flywheel Defensibility</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-stardust">
                <li><span className="font-bold text-onyx">Data Moat:</span> Every campaign refined our ranking model.</li>
                <li><span className="font-bold text-onyx">Outcome Lifts:</span> Better rankings drive better results, attracting demand.</li>
                <li><span className="font-bold text-onyx">Creator Lock-in:</span> Distribution and verification create switching costs.</li>
              </ul>
            </article>

            <article className="deck-card rounded-2xl p-6 bg-slate-50 flex flex-col justify-center">
              <p className="text-base font-semibold text-onyx italic text-center">
                GeoCompanion doesn't just manage workflows; it owns the outcome data that makes autonomous execution reliable.
              </p>
            </article>
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-stardust">
              Comparable benchmark: Shopify takes 1.5\u20133% of GMV. GeoCompanion targets higher defensibility through
              outcome verification and trust-layer switching costs.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stardust">
              Billing stays on fiat. The on-chain layer exists to prove performance history and make agent selection
              auditable for enterprise buyers.
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
                <h3 className="text-lg font-semibold text-onyx mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-stardust">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr,1fr]">
            <article className="deck-card rounded-2xl p-6">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-3">Compounding loop</p>
              <p className="text-lg leading-relaxed text-onyx">
                Better audits drive better content. Better content creates better outcome data. Vision Navigator turns that
                repeated usage into strategic guidance on whether the business is moving in the right direction before it
                scales execution further.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  ['Phase 0', 'Own the diagnosis \u2192 execution workflow'],
                  ['Phase 1', 'Vision Navigator: turn usage into directional guidance'],
                  ['Phase 2', 'Open the loop to agent/API traffic'],
                ].map(([phase, detail]) => (
                  <div key={phase} className="rounded-xl border border-slate-100 bg-white p-4">
                    <p className="deck-mono text-[9px] uppercase tracking-[0.12em] text-stardust mb-1">{phase}</p>
                    <p className="text-sm leading-relaxed text-stardust">{detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <p className="deck-mono text-[9px] uppercase tracking-[0.16em] text-stardust mb-4">Longer-term upside</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-onyx mb-1">Vision Navigator</p>
                  <p className="text-sm leading-relaxed text-stardust">As more teams use the system, GeoCompanion gets better at helping companies understand whether they are running in the right direction before scaling more budget and effort.</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-4">
                  <p className="text-sm font-semibold text-onyx mb-1">Marketplace routing</p>
                  <p className="text-sm leading-relaxed text-stardust">As machine-to-machine traffic grows, routing and ranking become a monetizable execution layer on top of that intelligence system.</p>
                </div>
              </div>
            </article>
          </div>
        </SlideShell>

        {/* Slide 12 */}
        <SlideShell id="slide-12" index={12} title="Team" subtitle="Engineering depth, product insight, and distribution in one founding group.">
          <div className="grid gap-5 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="deck-card flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-start gap-5">
                  <TeamAvatar member={member} />
                  <div className="pt-1">
                    <h3 className="deck-heading text-3xl font-bold text-onyx leading-none">{member.name}</h3>
                    <p className="deck-mono mt-2 text-[9px] font-medium uppercase tracking-[0.18em] text-stardust">{member.role}</p>
                  </div>
                </div>

                <p className="mt-5 text-[13px] leading-relaxed text-stardust">
                  {member.body}
                </p>
              </article>
            ))}
          </div>

          <div className="deck-card mt-5 rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-stardust">
              Most marketing AI startups have strong engineering or strong distribution. GeoCompanion has both,
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
            <article className="deck-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-onyx mb-5">Use of funds</h3>
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
                    <Cpu className="h-4 w-4 text-accent-cyan" aria-hidden="true" />,
                    <Target className="h-4 w-4 text-stardust" aria-hidden="true" />,
                    <Server className="h-4 w-4 text-stardust" aria-hidden="true" />,
                    <Wallet className="h-4 w-4 text-stardust" aria-hidden="true" />,
                  ][idx] || <Activity className="h-4 w-4 text-stardust" aria-hidden="true" />;

                  return (
                    <div key={row.allocation} className="rounded-xl border border-slate-100 bg-white p-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {icon}
                          <p className="text-sm font-semibold text-onyx">{row.allocation}</p>
                        </div>
                        <span className="deck-mono text-[9px] text-stardust">{pct}%</span>
                      </div>
                      <p className="text-sm leading-relaxed text-stardust">{row.use}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="deck-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-onyx mb-5">This round</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Raise', value: '$1.25M', detail: 'SAFE round sized for 18 months of runway and disciplined hiring', icon: <Rocket className="h-4 w-4 text-accent-cyan" aria-hidden="true" /> },
                  { title: 'Target cap', value: '$12M', detail: 'Priced to match current beta traction and leave room for seed step-up', icon: <Building2 className="h-4 w-4 text-stardust" aria-hidden="true" /> },
                  { title: 'Unlocks', value: '$100K MRR', detail: 'Goal: 25+ paying customers and a clean seed story by late 2027', icon: <CheckCircle2 className="h-4 w-4 text-accent-cyan" aria-hidden="true" /> },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="mb-2">{item.icon}</div>
                    <p className="deck-mono text-[9px] uppercase tracking-[0.14em] text-stardust mb-1">{item.title}</p>
                    <p className="deck-heading text-2xl font-bold text-onyx tabular-nums">{item.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-stardust">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5 p-4 text-sm leading-relaxed text-onyx">
                We are raising one round: $1.25M on a $12M cap. If we join an accelerator, it will be because it helps
                fill this same round with strategic capital, distribution, and follow-on access, not because we are changing
                the plan.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-white/25 px-3 py-1.5">
              <Sparkles className="h-3 w-3 text-accent-cyan" aria-hidden="true" />
              <span className="deck-mono text-[9px] uppercase tracking-[0.14em] text-stardust">Pre-final investor deck</span>
            </span>
            <span className="deck-mono inline-flex rounded-full border border-slate-100 bg-white/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-stardust">Ask: $1.25M SAFE on $12M cap</span>
            <span className="deck-mono inline-flex rounded-full border border-slate-100 bg-white/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-stardust">Accelerator participates only if it strengthens the same round</span>
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
