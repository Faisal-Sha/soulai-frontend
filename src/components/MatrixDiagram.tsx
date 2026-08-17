import { Card } from "@/components/ui/card";
import { type MatrixResult } from "@/lib/destinyMatrix";

interface MatrixDiagramProps {
  result: MatrixResult;
}

export function MatrixDiagram({ result }: MatrixDiagramProps) {
  return (
    <div className="glass-frosted rounded-[20px] p-8 border-border/50 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)]">
      <h3 className="text-xl font-semibold text-center mb-6">Your Energy Matrix</h3>

      <div className="relative max-w-md mx-auto aspect-square">
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-background/30 via-glass-purple/25 to-glass-pink/20 backdrop-blur-3xl border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)] flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {result.centerEnergy}
              </div>
              <div className="text-xs text-muted-foreground">Center</div>
            </div>
          </div>
        </div>

        {/* Top Point (Purpose) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-background/25 via-glass-blue/20 to-glass-purple/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{result.purpose}</div>
              <div className="text-[10px] text-muted-foreground">Purpose</div>
            </div>
          </div>
        </div>

        {/* Right Point (Talents) */}
        <div className="absolute top-1/2 right-0 transform translate-x-0 -translate-y-1/2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-background/25 via-glass-pink/20 to-glass-blue/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{result.talents}</div>
              <div className="text-[10px] text-muted-foreground">Talents</div>
            </div>
          </div>
        </div>

        {/* Bottom Point (Karma) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-background/25 via-glass-purple/20 to-glass-pink/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{result.karma}</div>
              <div className="text-[10px] text-muted-foreground">Karma</div>
            </div>
          </div>
        </div>

        {/* Left Point (Personal Growth) */}
        <div className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-background/25 via-background/20 to-glass-blue/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{result.personalGrowth}</div>
              <div className="text-[10px] text-muted-foreground">Growth</div>
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {/* Vertical line */}
          <line
            x1="50%"
            y1="10%"
            x2="50%"
            y2="90%"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="4"
          />
          {/* Horizontal line */}
          <line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="4"
          />
          {/* Diagonal lines */}
          <line
            x1="20%"
            y1="20%"
            x2="80%"
            y2="80%"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="4"
          />
          <line
            x1="80%"
            y1="20%"
            x2="20%"
            y2="80%"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="4"
          />
        </svg>

        {/* Channel Labels */}
        <div className="absolute top-1/4 right-1/4 bg-background/20 backdrop-blur-xl border border-border/30 px-3 py-1.5 rounded-full text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          Money: {result.moneyChannel}
        </div>
        <div className="absolute top-3/4 right-1/4 bg-background/20 backdrop-blur-xl border border-border/30 px-3 py-1.5 rounded-full text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          Love: {result.relationshipChannel}
        </div>
        <div className="absolute top-1/4 left-1/4 bg-background/20 backdrop-blur-xl border border-border/30 px-3 py-1.5 rounded-full text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          Health: {result.healthChannel}
        </div>
      </div>
    </div>
  );
}
