import { useEffect, type RefObject } from 'react'

/**
 * Home entrance. Figma 1017:3606 + animation-spec 1053:3226
 * IntersectionObserver threshold 0.1, play once (Figma prototype loops).
 */
export function useHomeEnter(
  rootRef: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const root = rootRef.current
    const scroll = root?.querySelector('.soul-home__scroll')
    if (!(scroll instanceof HTMLElement)) return

    const nodes = [...scroll.querySelectorAll<HTMLElement>('[data-home-enter]')]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const finish = (el: HTMLElement) => {
      el.setAttribute('data-home-enter-state', 'done')
    }

    const reveal = (el: HTMLElement, delayMs: number) => {
      if (el.getAttribute('data-home-enter-state') === 'done') return
      el.style.setProperty('--home-enter-delay', `${Math.max(0, delayMs)}ms`)
      el.setAttribute('data-home-enter-state', 'in')
      const done = () => finish(el)
      const timer = window.setTimeout(done, delayMs + 560)
      el.addEventListener(
        'animationend',
        (event) => {
          if (event.target !== el) return
          window.clearTimeout(timer)
          done()
        },
        { once: true },
      )
    }

    if (reduce) {
      nodes.forEach((el) => finish(el))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          io.unobserve(el)
          const designed = Number(el.dataset.homeEnterDelay || 0)
          const rootBottom = entry.rootBounds?.bottom ?? window.innerHeight
          const inFirstPaint = entry.boundingClientRect.top < rootBottom * 0.92
          reveal(el, inFirstPaint ? designed : 0)
        }
      },
      { root: scroll, threshold: 0.1, rootMargin: '12px 0px' },
    )

    nodes.forEach((el) => {
      const state = el.getAttribute('data-home-enter-state')
      if (state === 'in' || state === 'done') return
      io.observe(el)
    })

    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller passes render keys
  }, deps)
}
