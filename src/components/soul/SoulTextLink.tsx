import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import './soul-ui.css'
import iconArrowLink from './assets/icon-arrow-link.svg'
import iconArrowLinkPressed from './assets/icon-arrow-link-pressed.svg'

type Common = {
  children: ReactNode
  showArrow?: boolean
  tone?: 'on-light' | 'on-dark'
  className?: string
}

type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined
  }

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string
  }

/**
 * Figma WIP · Text Link (559:582)
 * States: Default · Pressed
 */
export function SoulTextLink(props: AsButton | AsLink) {
  const { children, showArrow = true, tone = 'on-light', className = '' } = props

  const classes = [
    'soul-text-link',
    tone === 'on-dark' ? 'soul-text-link--on-dark' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {showArrow && (
        <span className="soul-text-link__arrows" aria-hidden="true">
          <img
            className="soul-text-link__arrow soul-text-link__arrow--default"
            src={iconArrowLink}
            alt=""
            width={14}
            height={14}
          />
          <img
            className="soul-text-link__arrow soul-text-link__arrow--pressed"
            src={iconArrowLinkPressed}
            alt=""
            width={14}
            height={14}
          />
        </span>
      )}
    </>
  )

  if ('href' in props && props.href) {
    const {
      children: _c,
      showArrow: _s,
      tone: _t,
      className: _cl,
      ...anchorRest
    } = props
    return (
      <a className={classes} {...anchorRest}>
        {content}
      </a>
    )
  }

  const {
    children: _c,
    showArrow: _s,
    tone: _t,
    className: _cl,
    type = 'button',
    ...btnRest
  } = props as AsButton

  return (
    <button type={type} className={classes} {...btnRest}>
      {content}
    </button>
  )
}
