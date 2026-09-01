import type { HTMLAttributes } from 'react'
import bgRipple from '@/pages/home/assets/bg-ripple.png'
import './soul-ui.css'

type SoulRippleBgProps = HTMLAttributes<HTMLDivElement>

/**
 * One full-viewport ripple field. Extra stacked copies of this asset
 * read as tiles, so pages should use this instead of repeating the PNG.
 */
export function SoulRippleBg({ className = '', ...rest }: SoulRippleBgProps) {
  return (
    <div
      className={['soul-ripple-bg', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      {...rest}
    >
      <img src={bgRipple} alt="" />
      <span className="soul-ripple-bg__dim" />
    </div>
  )
}
