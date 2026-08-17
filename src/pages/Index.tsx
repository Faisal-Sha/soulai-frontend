import { Link, useSearchParams } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { DestinyMatrixCalculator } from '@/components/DestinyMatrixCalculator'
import { useLanguage } from '@/contexts/LanguageContext'
import { HeartHandshake } from 'lucide-react'
import { PageLoader } from '@/components/LoadingSpinner'
import {
  SoulHomeScreen,
  type SoulHomeVariant,
} from '@/features/home/SoulHomeScreen'

/** Signed-in / → SoulHomeScreen (Figma Home). NEXT Figma slice: Readings list + chapter detail. */
function resolveHomeVariant(
  param: string | null,
  subscription: {
    status?: string | null
    current_period_start?: string | null
  } | null,
  isPremium: boolean,
): SoulHomeVariant {
  if (param === 'day1' || param === 'dayone') return 'day1'
  if (param === 'trial') return 'trial'
  if (param === 'loading') return 'loading'

  if (!subscription) return 'day1'
  const status = subscription.status?.toLowerCase() ?? ''
  if (status === 'trialing') {
    if (subscription.current_period_start) {
      const ageMs = Date.now() - new Date(subscription.current_period_start).getTime()
      if (ageMs < 36 * 60 * 60 * 1000) return 'day1'
    }
    return 'trial'
  }
  void isPremium
  return 'default'
}

function trialDayNumber(periodStart?: string | null): number {
  if (!periodStart) return 1
  const ageMs = Date.now() - new Date(periodStart).getTime()
  if (Number.isNaN(ageMs) || ageMs < 0) return 1
  return Math.max(1, Math.floor(ageMs / (24 * 60 * 60 * 1000)) + 1)
}

function trialBannerCopy(periodEnd?: string | null): { title: string; detail: string } {
  const end = periodEnd ? new Date(periodEnd) : null
  const valid = end && !Number.isNaN(end.getTime())
  const daysLeft = valid
    ? Math.ceil((end.getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    : null

  let title = 'Your trial ends soon.'
  if (daysLeft !== null) {
    if (daysLeft <= 0) title = 'Your trial ends today.'
    else if (daysLeft === 1) title = 'Your trial ends tomorrow.'
    else title = `Your trial ends in ${daysLeft} days.`
  }

  const startLabel = valid
    ? end!.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : 'soon'
  const detail = `$5.99/month starts ${startLabel}. Cancel anytime.`

  return { title, detail }
}

const Index = () => {
  const { user, profile, subscription, isPremium, loading } = useUser()
  const { language } = useLanguage()
  const [searchParams] = useSearchParams()

  const labels = {
    en: {
      compatibility: 'Want to check Compatibility Matrix?',
      compatibilityLink: 'Calculate Compatibility',
    },
    ru: {
      compatibility: 'Хотите проверить матрицу совместимости?',
      compatibilityLink: 'Рассчитать совместимость',
    },
  }
  const t = (labels as Record<string, typeof labels.en>)[language] || labels.en

  if (loading) return <PageLoader />

  const userName =
    profile?.full_name || (user?.email ? user.email.split('@')[0] : null)

  if (user) {
    const variant = resolveHomeVariant(
      searchParams.get('home'),
      subscription,
      isPremium,
    )
    const trialCopy = trialBannerCopy(subscription?.current_period_end)
    return (
      <SoulHomeScreen
        variant={variant}
        dayNumber={trialDayNumber(subscription?.current_period_start)}
        isPremium={isPremium}
        chaptersDone={variant === 'day1' ? 0 : 3}
        insightsCount={variant === 'day1' ? 0 : 12}
        compatSummary={
          variant === 'day1' ? 'Add someone close to you' : 'Anna, Mark and 2 more'
        }
        trialTitle={trialCopy.title}
        trialDetail={trialCopy.detail}
      />
    )
  }

  // Guest — keep existing calculator landing
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <div className="flex-1 p-2 sm:p-8 overflow-hidden">
        <div className="w-full">
          <DestinyMatrixCalculator
            simplified={false}
            initialDiagramType="aurea"
            hideDiagramToggle={true}
            isHomePage={true}
            userName={userName}
          />

          <div className="mt-12 text-center py-8 border-t border-border/40 max-w-3xl mx-auto overflow-hidden">
            <p className="text-muted-foreground mb-4">{t.compatibility}</p>
            <Link
              to="/compatibility"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-500/20 text-foreground transition-all hover:scale-105"
            >
              <HeartHandshake className="w-5 h-5 text-pink-500" />
              {t.compatibilityLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
