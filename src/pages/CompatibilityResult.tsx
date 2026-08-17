import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Languages, ArrowLeft, Lock, Target, Star, Activity, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MatrixNavigation } from "@/components/MatrixNavigation";
import { energies as energiesRu } from "@/content/energies.ru";
import { energies as energiesEn } from "@/content/energies.en";
import { zones as zonesRu } from "@/content/zones.ru";
import { zones as zonesEn } from "@/content/zones.en";

interface CompatibilityResultData {
  name1: string;
  name2: string;
  date1: string;
  date2: string;
  result: {
    center: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    love: number;
    money: number;
    karma: number;
  };
}

const CompatibilityResult = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as CompatibilityResultData;
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);

  useEffect(() => {
    if (!data || !data.result) {
      navigate('/compatibility');
    }
  }, [data, navigate]);

  if (!data || !data.result) {
    return null;
  }

  const { name1, name2, date1, date2, result } = data;

  const energies = language === 'ru' ? energiesRu : energiesEn;
  const zones = language === 'ru' ? zonesRu : zonesEn;

  const detailedSections = [
    { key: 'center', value: result.center, icon: Sparkles, gradient: 'from-white/25 via-glass-purple/20 to-glass-pink/15' },
    { key: 'top', value: result.top, icon: Target, gradient: 'from-white/25 via-glass-blue/20 to-glass-purple/15' },
    { key: 'right', value: result.right, icon: Star, gradient: 'from-white/25 via-glass-pink/20 to-glass-blue/15' },
    { key: 'bottom', value: result.bottom, icon: Activity, gradient: 'from-white/25 via-white/20 to-glass-blue/15' },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-cosmic overflow-x-hidden max-w-full pt-20">
      <div className="container mx-auto px-2 sm:px-4 py-8 md:py-12 max-w-6xl overflow-hidden">
        {/* Language Toggle */}
        {/* Language Toggle moved for mobile safety */}
        <div className="flex justify-end mb-4 px-4 overflow-hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="gap-2"
          >
            <Languages className="w-4 h-4" />
            {language.toUpperCase()}
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 tracking-tight break-words">
            {t('compatibilityResult')}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2 break-words">
            {name1} ({date1}) & {name2} ({date2})
          </p>
        </div>

        {/* Result Card */}
        <Card className="max-w-4xl mx-auto overflow-hidden mb-8 glass-frosted rounded-[20px] border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)]">
          <MatrixNavigation />

          <div className="p-6">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => navigate('/compatibility')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('back')}
              </Button>
            </div>

            {/* Main nodes */}
            <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
              <div></div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t('positionTop')}
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/25 via-glass-blue/20 to-glass-purple/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center text-2xl font-bold mx-auto">
                  {result.top}
                </div>
              </div>
              <div></div>

              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t('positionLeft')}
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/25 via-white/20 to-glass-blue/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center text-2xl font-bold mx-auto">
                  {result.left}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t('positionCenter')}
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/30 via-glass-purple/25 to-glass-pink/20 backdrop-blur-3xl border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)] flex items-center justify-center text-3xl font-bold mx-auto">
                  {result.center}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t('positionRight')}
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/25 via-glass-pink/20 to-glass-blue/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center text-2xl font-bold mx-auto">
                  {result.right}
                </div>
              </div>

              <div></div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {t('positionBottom')}
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/25 via-glass-purple/20 to-glass-pink/15 backdrop-blur-3xl border border-white/35 shadow-[0_6px_30px_rgba(0,0,0,0.15),inset_0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center text-2xl font-bold mx-auto">
                  {result.bottom}
                </div>
              </div>
              <div></div>
            </div>

            {/* Energies */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="glass-frosted rounded-[20px] p-6 border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)] text-center">
                <div className="text-sm font-medium mb-2">
                  💞 {t('love')}
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {result.love}
                </div>
              </div>

              <div className="glass-frosted rounded-[20px] p-6 border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)] text-center">
                <div className="text-sm font-medium mb-2">
                  💰 {t('money')}
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {result.money}
                </div>
              </div>

              <div className="glass-frosted rounded-[20px] p-6 border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)] text-center">
                <div className="text-sm font-medium mb-2">
                  ✨ {t('karma')}
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {result.karma}
                </div>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="mt-8 pt-8 border-t border-border/50">
              <h2 className="text-lg sm:text-xl font-light text-center mb-8">
                {t('personalityDossier')}
              </h2>
              <div className="space-y-6">
                {(() => {
                  // Group sections by energy number
                  const groupedByEnergy: Record<number, { items: typeof detailedSections; zones: string[] }> = {};
                  detailedSections.forEach(section => {
                    const zone = zones[section.key];
                    if (!groupedByEnergy[section.value]) {
                      groupedByEnergy[section.value] = { items: [], zones: [] };
                    }
                    groupedByEnergy[section.value].items.push(section);
                    groupedByEnergy[section.value].zones.push(zone.title);
                  });

                  return Object.entries(groupedByEnergy).map(([valueStr, group]) => {
                    const value = parseInt(valueStr);
                    const energy = energies[value];
                    const firstItem = group.items[0];
                    const IconComponent = firstItem.icon;

                    return (
                      <Card key={valueStr} className="glass-frosted rounded-[20px] p-6 border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.15),inset_0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)] transition-all duration-300 relative max-w-full overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex items-start gap-4 mb-4">
                              <div className={`p-3 rounded-full bg-gradient-to-br ${firstItem.gradient} backdrop-blur-xl border border-white/30`}>
                                <IconComponent className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {group.zones.map((title, idx) => (
                                    <span key={idx} className="text-[10px] uppercase tracking-wider font-bold text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                                      {title}
                                    </span>
                                  ))}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-lg">{energy?.name || 'Unknown'}</h4>
                                  <span className="text-2xl font-bold text-primary">{value}</span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {energy?.shortDesc || 'Energy description not available'}
                                </p>
                              </div>
                            </div>

                            {/* Lock Icon Logic (kept for premium placeholder) */}
                            <button
                              onClick={() => setIsPremiumDialogOpen(true)}
                              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors group z-10"
                              aria-label="Premium content"
                            >
                              <Lock className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
                            </button>
                          </div>

                          {energy?.videoUrl && (
                            <div className="w-full md:w-[320px] shrink-0">
                              <div className="rounded-xl overflow-hidden aspect-video border bg-muted/30 shadow-inner">
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={energy.videoUrl}
                                  title={`${energy.name} explanation`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  className="w-full h-full"
                                ></iframe>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </Card>

        {/* Premium CTA */}
        <Card className="glass-frosted rounded-[20px] p-8 border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.2),inset_0_0_50px_rgba(255,255,255,0.3)] text-center max-w-2xl mx-auto mt-8">
          <div className="space-y-4">
            <Sparkles className="w-12 h-12 mx-auto text-primary" />
            <h3 className="text-xl font-light">
              {t('premiumTitle')}
            </h3>
            <p className="text-muted-foreground">
              {t('premiumDesc')}
            </p>
            <Button size="lg">
              {t('premiumButton')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Premium Dialog */}
      <Dialog open={isPremiumDialogOpen} onOpenChange={setIsPremiumDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-foreground" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-light">
              {t('premiumContent')}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {t('premiumContentDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button size="lg" className="w-full">
              {t('getPremiumAccess')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => setIsPremiumDialogOpen(false)}
            >
              {t('maybeLater')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompatibilityResult;