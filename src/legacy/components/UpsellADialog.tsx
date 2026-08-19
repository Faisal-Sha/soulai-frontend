// Upsell A Dialog — used on the /rates page
// Compact horizontal layout — fits in one screen view

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const UPGRADE_HIGHLIGHTS = [
  '3 compatibility readings',
  '3 deep matrix readings',
  '10 AI chat questions',
];

interface UpsellADialogProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
  isProcessing?: boolean;
}

export default function UpsellADialog({ open, onAccept, onDecline, isProcessing = false }: UpsellADialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !isProcessing) onDecline(); }}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden gap-0">

        {/* Header */}
        <div className="px-5 pt-5 pb-3 text-center">
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            ✦ Before you go
          </div>
          <h2 className="text-lg font-semibold text-foreground tracking-tight leading-snug">
            Get 3× more for <span className="text-primary">$20 extra</span>
          </h2>
        </div>

        {/* Horizontal plan comparison */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 px-4 pb-3 items-stretch">

          {/* Trial — dimmed */}
          <div className="border border-border rounded-xl p-3 bg-card opacity-60 flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Your pick</p>
            <p className="font-semibold text-foreground text-sm">1-Week Trial</p>
            <p className="text-xl font-bold text-foreground leading-none">$9.99</p>
            <p className="text-[10px] text-muted-foreground mt-1">$1.43/day · 3 AI questions</p>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center text-xs font-bold text-muted-foreground px-1">
            vs
          </div>

          {/* 4-Week — highlighted */}
          <div className="border-2 border-primary rounded-xl p-3 bg-primary/5 flex flex-col gap-1 relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full whitespace-nowrap">
              ★ Recommended
            </div>
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mt-1">Upgrade to</p>
            <p className="font-semibold text-foreground text-sm">4-Week Plan</p>
            <p className="text-xl font-bold text-primary leading-none">$29.99</p>
            <p className="text-[10px] text-muted-foreground mt-1">$1.07/day · 10 AI questions</p>
          </div>
        </div>

        {/* What you get extra — pill chips */}
        <div className="mx-4 mb-4 bg-primary/5 border border-primary/20 rounded-xl px-3 py-2.5">
          <p className="text-[10px] font-semibold text-primary uppercase tracking-wider text-center mb-2">
            Also included in 4-Week
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {UPGRADE_HIGHLIGHTS.map((h, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground bg-background border border-primary/30 rounded-full px-2.5 py-0.5">
                <span className="text-primary font-bold text-[9px]">✓</span>
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 pb-5 flex flex-col gap-2">
          <Button className="w-full h-11" onClick={onAccept} disabled={isProcessing}>
            {isProcessing ? 'Starting checkout…' : 'Upgrade to 4-Week — $29.99'}
          </Button>
          <button
            onClick={onDecline}
            disabled={isProcessing}
            className="text-xs text-muted-foreground underline underline-offset-2 py-1.5 hover:text-foreground transition-colors disabled:opacity-50"
          >
            No thanks, keep my 1-Week Trial
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
