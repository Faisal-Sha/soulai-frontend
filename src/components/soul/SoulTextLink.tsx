import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import './soul-ui.css'
import iconArrowLink from './assets/icon-arrow-link.svg'
import iconArrowLinkPressed from './assets/icon-arrow-link-pressed.svg'

type Common = {
  children: ReactNode
  showArrow?: boolean
  tone?: 'on-light' | 'on-dark'
  className?: string
}

type AsSpan = Common &
  Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'className'> & {
    as: 'span'
    href?: undefined
  }

type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    as?: 'button'
    href?: undefined
  }

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    as?: 'a'
    href: string
  }

/**
 * Figma WIP · Text Link (559:582)
 * States: Default · Pressed
 * Use `as="span"` when nested inside another button (cards, etc.).
 */
export function SoulTextLink(props: AsSpan | AsButton | AsLink) {
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

  if ('as' in props && props.as === 'span') {
    const {
      children: _c,
      showArrow: _s,
      tone: _t,
      className: _cl,
      as: _as,
      ...spanRest
    } = props
    return (
      <span className={classes} {...spanRest}>
        {content}
      </span>
    )
  }

  if ('href' in props && props.href) {
    const {
      children: _c,
      showArrow: _s,
      tone: _t,
      className: _cl,
      as: _as,
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
    as: _as,
    type = 'button',
    ...btnRest
  } = props as AsButton

  return (
    <button type={type} className={classes} {...btnRest}>
      {content}
    </button>
  )
}
