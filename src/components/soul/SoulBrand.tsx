import './soul-ui.css'
import markHero from './assets/mark-hero.svg'

type SoulBrandProps = {
  className?: string
  /** White wordmark on dark/taupe backgrounds (default). */
  tone?: 'on-dark' | 'on-light'
  size?: 'md' | 'lg'
}

export function SoulBrand({ className = '', tone = 'on-dark', size = 'md' }: SoulBrandProps) {
  const classes = [
    'soul-brand',
    tone === 'on-light' ? 'soul-brand--on-light' : '',
    size === 'lg' ? 'soul-brand--lg' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className="soul-brand__mark">
        <img src={markHero} alt="" width={size === 'lg' ? 28 : 20} height={size === 'lg' ? 28 : 20} />
      </div>
      <p className="soul-brand__text">SOUL+AI</p>
    </div>
  )
}
