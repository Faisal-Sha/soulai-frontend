import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FileText, Loader2, ChevronRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/hooks/useUser';
import { checkDeepDiveAccess, listCompatibilityReports } from '@/lib/compatibilityReportService';
import type { CompatibilityReportRow } from '@/types/compatibilityReport';

type Props = {
  /** Bump to reload list (e.g. after generating a new report). */
  refreshKey?: number;
  /** Compact layout for dashboard tab. */
  compact?: boolean;
};

export function CompatibilityReportsPanel({ refreshKey = 0, compact = false }: Props) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { language } = useLanguage();

  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<CompatibilityReportRow[]>([]);

  const copy =
    language === 'ru'
      ? {
          title: 'Сохранённые отчёты Deep-Dive',
          subtitle: 'Открывайте в любое время — без повторного расчёта и генерации.',
          empty: 'Пока нет отчётов. Рассчитайте совместимость ниже и нажмите «Создать отчёт».',
          open: 'Открыть',
          processing: 'Создаётся…',
          failed: 'Ошибка',
          newCalc: 'Новый расчёт',
        }
      : {
          title: 'Saved Deep-Dive Reports',
          subtitle: 'Open anytime — no recalculation or regeneration needed.',
          empty: 'No reports yet. Calculate compatibility below, then tap Generate Report.',
          open: 'Open',
          processing: 'Generating…',
          failed: 'Failed',
          newCalc: 'New calculation',
        };

  const load = useCallback(async () => {
    if (!user) {
      setHasAccess(false);
      setReports([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { hasAccess: access } = await checkDeepDiveAccess();
      setHasAccess(access);
      if (access) {
        const rows = await listCompatibilityReports();
        setReports(rows);
      } else {
        setReports([]);
      }
    } catch (e) {
      console.error('[CompatibilityReportsPanel]', e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  useEffect(() => {
    const onFocus = () => void load();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [load]);

  if (!user || (!loading && !hasAccess)) {
    return null;
  }

  const openReport = (id: string, status: string) => {
    if (status === 'failed') return;
    navigate(`/compatibility/report/${id}`, {
      state: compact ? { from: 'avatar' as const } : undefined,
    });
  };

  const formatReportDate = (iso: string) => {
    try {
      return format(new Date(iso), 'dd MMM yyyy');
    } catch {
      return '';
    }
  };

  const statusLabel = (status: string) => {
    if (status === 'ready') return copy.open;
    if (status === 'processing') return copy.processing;
    if (status === 'failed') return copy.failed;
    return status;
  };

  return (
    <Card
      className={
        compact
          ? 'border-primary/20 bg-primary/5'
          : 'max-w-2xl mx-auto border-primary/20 bg-primary/5'
      }
    >
      <div className={compact ? 'p-4' : 'p-6'}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground">{copy.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{copy.subtitle}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-6 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : reports.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">{copy.empty}</p>
        ) : (
          <ul className="space-y-2">
            {reports.map((r) => {
              const ready = r.status === 'ready';
              const label =
                r.person_a_name && r.person_b_name
                  ? `${r.person_a_name} & ${r.person_b_name}`
                  : r.title;
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => openReport(r.id, r.status)}
                    disabled={r.status === 'failed'}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-background/80 hover:bg-background hover:border-primary/30 transition-colors text-left disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{label}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatReportDate(r.created_at)}
                        {r.status !== 'ready' && (
                          <span className="ml-2 capitalize">{r.status}</span>
                        )}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-primary shrink-0 flex items-center gap-0.5">
                      {statusLabel(r.status)}
                      {ready && <ChevronRight className="w-4 h-4" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
}
