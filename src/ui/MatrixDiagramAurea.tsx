import { useRef, useEffect } from "react";
import { MatrixValues } from "@/core/calc";
import { useLanguage } from "@/contexts/LanguageContext";

interface MatrixDiagramAureaProps {
  values: MatrixValues;
  onRef?: (ref: HTMLDivElement | null) => void;
}

export function MatrixDiagramAurea({ values, onRef }: MatrixDiagramAureaProps) {
  const { center, top, left, right, bottom } = values;
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onRef) {
      onRef(containerRef.current);
    }
  }, [onRef]);

  const labels = {
    ru: {
      center: 'Ядро Души',
      top: 'Высший талант',
      left: 'Таланты/Проявление в мир',
      right: 'Задача души',
      bottom: 'Карма'
    },
    en: {
      center: 'Soul Core',
      top: 'Highest Talent',
      left: 'Talents/Manifestation',
      right: 'Soul Task',
      bottom: 'Karma'
    }
  };

  const t = labels[language];

  return (
    <div ref={containerRef} className="relative w-full aspect-square p-10 md:p-12 overflow-visible">
      {/* SVG with pearlescent glass effects */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <defs>
          {/* Pearlescent gradient - rainbow bubble effect */}
          <radialGradient id="pearlGradient" cx="50%" cy="50%">
            <stop offset="0%" style={{ stopColor: 'hsl(0 0% 100%)', stopOpacity: 0.4 }} />
            <stop offset="30%" style={{ stopColor: 'hsl(280 80% 90%)', stopOpacity: 0.25 }} />
            <stop offset="60%" style={{ stopColor: 'hsl(200 85% 85%)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(340 75% 90%)', stopOpacity: 0.15 }} />
          </radialGradient>

          {/* Soft glow filter */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Light beam filter */}
          <filter id="lightBeam">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for light lines */}
          <linearGradient id="lightLine1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(280 70% 75%)', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(280 70% 85%)', stopOpacity: 0.2 }} />
          </linearGradient>

          <linearGradient id="lightLine2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(200 75% 75%)', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(200 75% 85%)', stopOpacity: 0.2 }} />
          </linearGradient>

          <linearGradient id="lightLine3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'hsl(340 70% 75%)', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(340 70% 85%)', stopOpacity: 0.2 }} />
          </linearGradient>

          <linearGradient id="lightLine4" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'hsl(160 60% 75%)', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(160 60% 85%)', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>

        {/* Main glass orb background */}
        <circle
          cx="200"
          cy="200"
          r="175"
          fill="url(#pearlGradient)"
          stroke="hsl(0 0% 100% / 0.3)"
          strokeWidth="1.5"
          filter="url(#softGlow)"
        />

        {/* Inner glow ring */}
        <circle
          cx="200"
          cy="200"
          r="155"
          fill="none"
          stroke="hsl(0 0% 100% / 0.2)"
          strokeWidth="1"
        />

        {/* Light beam lines - cross */}
        <line
          x1="200" y1="50" x2="200" y2="350"
          stroke="url(#lightLine1)"
          strokeWidth="2"
          filter="url(#lightBeam)"
          opacity="0.7"
        />
        <line
          x1="50" y1="200" x2="350" y2="200"
          stroke="url(#lightLine2)"
          strokeWidth="2"
          filter="url(#lightBeam)"
          opacity="0.7"
        />

        {/* Diagonal light beams */}
        <line
          x1="90" y1="90" x2="310" y2="310"
          stroke="url(#lightLine3)"
          strokeWidth="1.5"
          filter="url(#lightBeam)"
          opacity="0.5"
        />
        <line
          x1="310" y1="90" x2="90" y2="310"
          stroke="url(#lightLine4)"
          strokeWidth="1.5"
          filter="url(#lightBeam)"
          opacity="0.5"
        />

        {/* Decorative circles */}
        <circle cx="200" cy="200" r="120" fill="none" stroke="hsl(0 0% 100% / 0.15)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="hsl(0 0% 100% / 0.1)" strokeWidth="0.5" />
      </svg>

      {/* Center - Golden glass orb (larger and more prominent) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30">
        <div
          className="w-24 h-24 md:w-36 md:h-36 rounded-full flex items-center justify-center backdrop-blur-[40px] border-[1.5px]"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 240, 200, 0.4), rgba(255, 200, 100, 0.25), rgba(255, 255, 255, 0.15))',
            borderColor: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <span className="text-4xl md:text-6xl font-extralight tracking-wide text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            {center}
          </span>
        </div>
        <span className="text-xs md:text-sm font-light text-foreground/70 tracking-wide" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          {t.center}
        </span>
      </div>

      {/* Top - Purple glass orb */}
      <div className="absolute top-[12%] md:top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
        <div
          className="w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center backdrop-blur-[40px] border-[1.5px]"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(230, 200, 255, 0.35), rgba(200, 150, 255, 0.25), rgba(255, 255, 255, 0.1))',
            borderColor: 'rgba(230, 200, 255, 0.5)'
          }}
        >
          <span className="text-2xl md:text-4xl font-extralight tracking-wide text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            {top}
          </span>
        </div>
        <span className="text-[10px] md:text-xs font-light text-foreground/60 tracking-wide text-center max-w-[80px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          {t.top}
        </span>
      </div>

      {/* Left - Blue glass orb */}
      <div className="absolute top-1/2 left-[12%] md:left-[10%] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div
          className="w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center backdrop-blur-[40px] border-[1.5px]"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(200, 230, 255, 0.35), rgba(150, 200, 255, 0.25), rgba(255, 255, 255, 0.1))',
            borderColor: 'rgba(200, 230, 255, 0.5)'
          }}
        >
          <span className="text-2xl md:text-4xl font-extralight tracking-wide text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            {left}
          </span>
        </div>
        <span className="text-[10px] md:text-xs font-light text-foreground/60 tracking-wide max-w-[80px] text-center" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          {t.left}
        </span>
      </div>

      {/* Right - Pink glass orb */}
      <div className="absolute top-1/2 right-[12%] md:right-[10%] -translate-y-1/2 translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div
          className="w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center backdrop-blur-[40px] border-[1.5px]"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 200, 230, 0.35), rgba(255, 150, 200, 0.25), rgba(255, 255, 255, 0.1))',
            borderColor: 'rgba(255, 200, 230, 0.5)'
          }}
        >
          <span className="text-2xl md:text-4xl font-extralight tracking-wide text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            {right}
          </span>
        </div>
        <span className="text-[10px] md:text-xs font-light text-foreground/60 tracking-wide text-center max-w-[80px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          {t.right}
        </span>
      </div>

      {/* Bottom - Green-blue glass orb */}
      <div className="absolute bottom-[12%] md:bottom-[10%] left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-2 z-20">
        <div
          className="w-16 h-16 md:w-28 md:h-28 rounded-full flex items-center justify-center backdrop-blur-[40px] border-[1.5px]"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(200, 255, 230, 0.35), rgba(150, 230, 200, 0.25), rgba(255, 255, 255, 0.1))',
            borderColor: 'rgba(200, 255, 230, 0.5)'
          }}
        >
          <span className="text-2xl md:text-4xl font-extralight tracking-wide text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            {bottom}
          </span>
        </div>
        <span className="text-[10px] md:text-xs font-light text-foreground/60 tracking-wide text-center max-w-[80px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
          {t.bottom}
        </span>
      </div>
    </div>
  );
}
