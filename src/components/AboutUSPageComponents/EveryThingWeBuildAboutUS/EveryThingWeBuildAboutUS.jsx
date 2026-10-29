'use client'

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import './EveryThingWeBuildAboutUS.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ---------------------------------------------------------------------------
   Icons
--------------------------------------------------------------------------- */
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

const IconEye = () => (
  <svg {...svgProps}>
    <g className="icon-eye-EveryThingWeBuildAboutUS">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </g>
  </svg>
)

const IconBrain = () => (
  <svg {...svgProps} strokeWidth={1.7}>
    <path d="M11 4.2a3.2 3.2 0 0 0-5.4 2.3A3.2 3.2 0 0 0 4 12a3.2 3.2 0 0 0 1.9 5.2A3.2 3.2 0 0 0 11 19.6z" />
    <path d="M13 4.2a3.2 3.2 0 0 1 5.4 2.3A3.2 3.2 0 0 1 20 12a3.2 3.2 0 0 1-1.9 5.2 3.2 3.2 0 0 1-5.1 2.4z" />
    <path className="icon-spark-EveryThingWeBuildAboutUS" d="M11 9H8.4M11 13.5H8M13 9h2.6M13 13.5h3M8.4 9V7.4M15.6 9V7.4" />
  </svg>
)

const IconBolt = () => (
  <svg {...svgProps}>
    <path className="icon-bolt-EveryThingWeBuildAboutUS" d="M13.2 2.5 5 13.6h6.2l-1.4 7.9 8.2-11.1h-6.2z" fill="currentColor" fillOpacity="0.18" />
  </svg>
)

const IconGear = () => (
  <svg {...svgProps} strokeWidth={1.7}>
    <g className="icon-gear-EveryThingWeBuildAboutUS">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  </svg>
)

const IconLayers = () => (
  <svg {...svgProps}>
    <path className="icon-layer-EveryThingWeBuildAboutUS" style={{ '--l-EveryThingWeBuildAboutUS': 0 }} d="M12 3 3 8l9 5 9-5z" fill="currentColor" fillOpacity="0.2" />
    <path className="icon-layer-EveryThingWeBuildAboutUS" style={{ '--l-EveryThingWeBuildAboutUS': 1 }} d="m3 12 9 5 9-5" />
    <path className="icon-layer-EveryThingWeBuildAboutUS" style={{ '--l-EveryThingWeBuildAboutUS': 2 }} d="m3 16 9 5 9-5" />
  </svg>
)

/* ---------------------------------------------------------------------------
   Data (card order = 01 … 05)
--------------------------------------------------------------------------- */
const PRINCIPLES = [
  {
    key: 'visibility',
    title: 'Visibility Is a Right.',
    text: 'Every team deserves to know what’s happening inside its own business.',
    Icon: IconEye,
    tone: 'cyan',
  },
  {
    key: 'intelligence',
    title: 'Intelligence Beats Noise.',
    text: 'More alerts don’t help. Zaura™ turns signals into the few things that matter.',
    Icon: IconBrain,
    tone: 'purple',
  },
  {
    key: 'speed',
    title: 'Speed Matters.',
    text: 'The faster you see a problem, the faster your team can fix it.',
    Icon: IconBolt,
    tone: 'teal',
  },
  {
    key: 'technology',
    title: 'Technology Serves Business.',
    text: 'Every metric and workflow exists to keep the business running.',
    Icon: IconGear,
    tone: 'teal',
  },
  {
    key: 'simple',
    title: 'Simple Wins.',
    text: 'Powerful doesn’t have to mean complicated. Clarity beats complexity.',
    Icon: IconLayers,
    tone: 'purple',
  },
].map((p) => ({ ...p, words: p.text.split(' ') }))

const TOTAL = PRINCIPLES.length
const AUTOPLAY_MS = 5200
const SWIPE_PX = 40
const pad2 = (n) => String(n).padStart(2, '0')
const stepsTo = (from, to) => (to - from + TOTAL) % TOTAL

/* fixed values (no Math.random → no hydration mismatch) */
const PARTICLES = [
  { x: 6, y: 72, s: 3, d: 9, t: 0 },
  { x: 14, y: 34, s: 2, d: 11, t: 2.4 },
  { x: 21, y: 86, s: 2, d: 8, t: 4.1 },
  { x: 29, y: 18, s: 3, d: 12, t: 1.2 },
  { x: 36, y: 64, s: 2, d: 10, t: 5.6 },
  { x: 44, y: 90, s: 3, d: 9.5, t: 3.3 },
  { x: 51, y: 28, s: 2, d: 11.5, t: 6.2 },
  { x: 58, y: 78, s: 2, d: 8.5, t: 0.8 },
  { x: 66, y: 12, s: 3, d: 12.5, t: 4.8 },
  { x: 74, y: 58, s: 2, d: 10.5, t: 2 },
  { x: 83, y: 84, s: 3, d: 9, t: 5.1 },
  { x: 92, y: 40, s: 2, d: 11, t: 3.7 },
]

const C = 'EveryThingWeBuildAboutUS'
const TILT_CLASS = `is-tilting-${C}`

function resetTilt(el) {
  el.classList.remove(TILT_CLASS)
  el.style.removeProperty(`--tilt-x-${C}`)
  el.style.removeProperty(`--tilt-y-${C}`)
}

/* ---------------------------------------------------------------------------
   Right column copy
--------------------------------------------------------------------------- */
const SectionContent = memo(function SectionContent() {
  return (
    <div className="content-EveryThingWeBuildAboutUS">
      <p className="eyebrow-EveryThingWeBuildAboutUS reveal-EveryThingWeBuildAboutUS" style={{ '--d-EveryThingWeBuildAboutUS': '0.15s' }}>
        {/* <span className="eyebrow-dot-EveryThingWeBuildAboutUS" aria-hidden="true" /> */}
        {/* <span className="eyebrow-line-EveryThingWeBuildAboutUS" aria-hidden="true" /> */}
       <BageZescloudAllComps badge=' What We Believe'/>
      </p>

      <h2 id="title-EveryThingWeBuildAboutUS" className="title-EveryThingWeBuildAboutUS">
        <span className="title-line-EveryThingWeBuildAboutUS">
          <span className="title-text-EveryThingWeBuildAboutUS" style={{ '--d-EveryThingWeBuildAboutUS': '0.3s' }}>
            Principles that shape
          </span>
        </span>
        <span className="title-line-EveryThingWeBuildAboutUS">
          <span className="title-text-EveryThingWeBuildAboutUS title-accent-EveryThingWeBuildAboutUS" style={{ '--d-EveryThingWeBuildAboutUS': '0.44s' }}>
            everything we build.
          </span>
        </span>
      </h2>

      <p className="lead-EveryThingWeBuildAboutUS reveal-EveryThingWeBuildAboutUS" style={{ '--d-EveryThingWeBuildAboutUS': '0.66s' }}>
        These principles guide our decisions, our product, and our commitment to our customers.
      </p>
    </div>
  )
})

/* ---------------------------------------------------------------------------
   Component
--------------------------------------------------------------------------- */
function EveryThingWeBuildAboutUS({ id = 'what-we-believe' }) {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const activeRef = useRef(0)
  const reducedRef = useRef(false)
  const swipeRef = useRef(null)
  const suppressClickRef = useRef(false)
  const tiltFrameRef = useRef(0)

  const [active, setActive] = useState(0)
  const [wraps, setWraps] = useState(() => PRINCIPLES.map(() => 0))
  const [shown, setShown] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [hoverPause, setHoverPause] = useState(false)
  const [focusPause, setFocusPause] = useState(false)

  const running = inView && pageVisible
  const autoplayOn = shown && running && !hoverPause && !focusPause

  /* move the carousel. `steps` > 0 = forward, < 0 = backward */
  const go = useCallback((steps) => {
    if (!steps) return
    const prev = activeRef.current
    const next = (((prev + steps) % TOTAL) + TOTAL) % TOTAL
    activeRef.current = next
    setActive(next)
    // cards that jump from one end of the row to the other fade out / back in
    setWraps((w) =>
      w.map((count, i) => {
        const oldSlot = stepsTo(prev, i)
        const newSlot = stepsTo(next, i)
        const wrapped = steps > 0 ? newSlot > oldSlot : newSlot < oldSlot
        return wrapped ? count + 1 : count
      }),
    )
  }, [])

  const goNext = useCallback(() => go(1), [go])
  const goPrev = useCallback(() => go(-1), [go])
  const goTo = useCallback((index) => go(stepsTo(activeRef.current, index)), [go])

  /* entrance once + pause every loop while off-screen */
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShown(true)
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) setShown(true)
      },
      { threshold: [0, 0.2] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* pause while the tab is hidden */
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const onVisibility = () => setPageVisible(document.visibilityState !== 'hidden')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  /* remember reduced-motion (used by the pointer tilt) */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      reducedRef.current = mq.matches
    }
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  /* a card that stops being active drops any leftover tilt */
  useEffect(() => {
    cancelAnimationFrame(tiltFrameRef.current)
    stageRef.current?.querySelectorAll(`.${TILT_CLASS}`).forEach((el) => resetTilt(el))
  }, [active])

  useEffect(() => () => cancelAnimationFrame(tiltFrameRef.current), [])

  /* ---- pause on mouse hover / keyboard focus (never on touch taps) ---- */
  const pauseHandlers = {
    onPointerEnter: (e) => {
      if (e.pointerType === 'mouse') setHoverPause(true)
    },
    onPointerLeave: (e) => {
      if (e.pointerType === 'mouse') setHoverPause(false)
    },
    onFocus: (e) => {
      let keyboard = false
      try {
        keyboard = e.target.matches(':focus-visible')
      } catch {
        keyboard = false
      }
      if (keyboard) setFocusPause(true)
    },
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFocusPause(false)
    },
    onKeyDown: (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    },
  }

  /* ---- touch swipe on the stage ---- */
  const onStagePointerDown = (e) => {
    if (e.pointerType === 'mouse') return
    swipeRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
  }

  const onStagePointerUp = (e) => {
    const start = swipeRef.current
    swipeRef.current = null
    if (!start || start.id !== e.pointerId) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 400)
      go(dx < 0 ? 1 : -1)
    }
  }

  const onStagePointerCancel = () => {
    swipeRef.current = null
  }

  const onStageClickCapture = (e) => {
    if (!suppressClickRef.current) return
    suppressClickRef.current = false
    e.preventDefault()
    e.stopPropagation()
  }

  /* ---- 3D tilt that follows the mouse on the active card ---- */
  const onCardPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || reducedRef.current) return
    const el = e.currentTarget
    if (!el.classList.contains(`is-active-${C}`)) return
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) return
    const px = Math.min(Math.max((e.clientX - r.left) / r.width - 0.5, -0.5), 0.5)
    const py = Math.min(Math.max((e.clientY - r.top) / r.height - 0.5, -0.5), 0.5)
    cancelAnimationFrame(tiltFrameRef.current)
    tiltFrameRef.current = requestAnimationFrame(() => {
      el.classList.add(TILT_CLASS)
      el.style.setProperty(`--tilt-x-${C}`, `${(-py * 9).toFixed(2)}deg`)
      el.style.setProperty(`--tilt-y-${C}`, `${(px * 11).toFixed(2)}deg`)
    })
  }

  const onCardPointerLeave = (e) => {
    cancelAnimationFrame(tiltFrameRef.current)
    resetTilt(e.currentTarget)
  }

  /* autoplay is driven by the progress ring on the "next" button:
     when its animation ends → next card. */
  const onTimerEnd = (e) => {
    if (e.target === e.currentTarget) goNext()
  }

  const current = PRINCIPLES[active]
  const heldClass = autoplayOn ? '' : ` is-held-${C}`
  const stateClass =
    `${shown ? ` is-shown-${C}` : ''}` +
    `${running ? '' : ` is-paused-${C}`}`

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section-EveryThingWeBuildAboutUS${stateClass}`}
      aria-labelledby="title-EveryThingWeBuildAboutUS"
    >
      {/* ---------------- Background ---------------- */}
      <div className="backdrop-EveryThingWeBuildAboutUS" aria-hidden="true">
        <span className="streaks-EveryThingWeBuildAboutUS" />
        <span className="halo-EveryThingWeBuildAboutUS" />
        <span className="orb-EveryThingWeBuildAboutUS orb-a-EveryThingWeBuildAboutUS" />
        <span className="orb-EveryThingWeBuildAboutUS orb-b-EveryThingWeBuildAboutUS" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle-EveryThingWeBuildAboutUS"
            style={{
              '--px-EveryThingWeBuildAboutUS': `${p.x}%`,
              '--py-EveryThingWeBuildAboutUS': `${p.y}%`,
              '--ps-EveryThingWeBuildAboutUS': p.s,
              '--pd-EveryThingWeBuildAboutUS': `${p.d}s`,
              '--pt-EveryThingWeBuildAboutUS': `${p.t}s`,
            }}
          />
        ))}
      </div>

      <div className="inner-EveryThingWeBuildAboutUS">
        {/* ---------------- Carousel (left) ---------------- */}
        <div
          className="carousel-EveryThingWeBuildAboutUS"
          role="region"
          aria-roledescription="carousel"
          aria-label="Our principles"
          {...pauseHandlers}
        >
          <div className="controls-EveryThingWeBuildAboutUS reveal-EveryThingWeBuildAboutUS" style={{ '--d-EveryThingWeBuildAboutUS': '0.05s' }}>
            <p className="counter-EveryThingWeBuildAboutUS" aria-hidden="true">
              <span className="counter-window-EveryThingWeBuildAboutUS">
                <span key={active} className="counter-current-EveryThingWeBuildAboutUS">
                  {pad2(active + 1)}
                </span>
              </span>
              <span className="counter-sep-EveryThingWeBuildAboutUS" />
              <span className="counter-total-EveryThingWeBuildAboutUS">{pad2(TOTAL)}</span>
            </p>

            <button type="button" className="arrow-EveryThingWeBuildAboutUS arrow-prev-EveryThingWeBuildAboutUS" onClick={goPrev} aria-label="Previous principle">
              <svg {...svgProps} strokeWidth={2.2}>
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
            </button>

            <button type="button" className="arrow-EveryThingWeBuildAboutUS arrow-next-EveryThingWeBuildAboutUS" onClick={goNext} aria-label="Next principle">
              <svg className="ring-EveryThingWeBuildAboutUS" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
                <circle className="ring-track-EveryThingWeBuildAboutUS" cx="20" cy="20" r="18.5" pathLength="100" />
                <circle
                  key={`timer-${active}`}
                  className={`ring-timer-EveryThingWeBuildAboutUS${heldClass}`}
                  cx="20"
                  cy="20"
                  r="18.5"
                  pathLength="100"
                  style={{ '--autoplay-EveryThingWeBuildAboutUS': `${AUTOPLAY_MS}ms` }}
                  onAnimationEnd={onTimerEnd}
                />
              </svg>
              <svg {...svgProps} strokeWidth={2.2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <span className={`status-EveryThingWeBuildAboutUS${autoplayOn ? '' : ' is-off-EveryThingWeBuildAboutUS'}`} aria-hidden="true">
              <span className="status-bars-EveryThingWeBuildAboutUS">
                <span />
                <span />
                <span />
              </span>
              <span className="status-label-EveryThingWeBuildAboutUS">{autoplayOn ? 'Auto' : 'Paused'}</span>
            </span>
          </div>

          <ul
            ref={stageRef}
            className="stage-EveryThingWeBuildAboutUS"
            onPointerDown={onStagePointerDown}
            onPointerUp={onStagePointerUp}
            onPointerCancel={onStagePointerCancel}
            onClickCapture={onStageClickCapture}
          >
            <li className="halo-card-EveryThingWeBuildAboutUS" aria-hidden="true" />
            <li className="floor-EveryThingWeBuildAboutUS" aria-hidden="true" />
            {PRINCIPLES.map((item, i) => {
              const slot = stepsTo(active, i)
              const isActive = slot === 0
              const wrapClass = wraps[i] ? ` wrap-${wraps[i] % 2 ? 'a' : 'b'}-EveryThingWeBuildAboutUS` : ''
              const { Icon } = item
              return (
                <li
                  key={item.key}
                  className={`card-pos-EveryThingWeBuildAboutUS slot-${slot}-EveryThingWeBuildAboutUS${wrapClass}`}
                  style={{ '--i-EveryThingWeBuildAboutUS': i }}
                >
                  <div className="card-float-EveryThingWeBuildAboutUS">
                    <span className="plate-EveryThingWeBuildAboutUS" aria-hidden="true" />
                    <button
                      type="button"
                      className={`card-EveryThingWeBuildAboutUS tone-${item.tone}-EveryThingWeBuildAboutUS${isActive ? ' is-active-EveryThingWeBuildAboutUS' : ''}`}
                      onClick={() => go(slot)}
                      onPointerMove={onCardPointerMove}
                      onPointerLeave={onCardPointerLeave}
                      aria-current={isActive ? 'true' : undefined}
                      aria-label={`${pad2(i + 1)}. ${item.title}`}
                      tabIndex={isActive ? -1 : 0}
                    >
                      <span className="card-glow-EveryThingWeBuildAboutUS" aria-hidden="true" />
                      <span className="card-num-EveryThingWeBuildAboutUS" aria-hidden="true">{pad2(i + 1)}</span>
                      <span className="card-corner-EveryThingWeBuildAboutUS" aria-hidden="true" />

                      <span className="card-body-EveryThingWeBuildAboutUS">
                        <span className="card-icon-EveryThingWeBuildAboutUS">
                          <span className="card-icon-ring-EveryThingWeBuildAboutUS" aria-hidden="true" />
                          <span className="card-orbit-EveryThingWeBuildAboutUS" aria-hidden="true">
                            <span className="card-orbit-dot-EveryThingWeBuildAboutUS" />
                          </span>
                          <Icon />
                        </span>
                        <span className="card-title-EveryThingWeBuildAboutUS">{item.title}</span>
                        <span className="card-text-wrap-EveryThingWeBuildAboutUS">
                          <span className="card-text-EveryThingWeBuildAboutUS">
                            {item.words.map((word, w) => (
                              <React.Fragment key={w}>
                                <span className="card-word-EveryThingWeBuildAboutUS" style={{ '--w-EveryThingWeBuildAboutUS': w }}>
                                  {word}
                                </span>
                                {w < item.words.length - 1 ? ' ' : null}
                              </React.Fragment>
                            ))}
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <p className="sr-only-EveryThingWeBuildAboutUS" aria-live={autoplayOn ? 'off' : 'polite'} aria-atomic="true">
            {`Principle ${active + 1} of ${TOTAL}: ${current.title} ${current.text}`}
          </p>
        </div>

        {/* ---------------- Copy + principle index (right) ---------------- */}
        <div className="aside-EveryThingWeBuildAboutUS">
          <SectionContent />

          <ol className="index-EveryThingWeBuildAboutUS" aria-label="Jump to a principle" {...pauseHandlers}>
            {PRINCIPLES.map((item, i) => {
              const isActive = i === active
              return (
                <li
                  key={item.key}
                  className="index-row-EveryThingWeBuildAboutUS reveal-EveryThingWeBuildAboutUS"
                  style={{ '--d-EveryThingWeBuildAboutUS': `${0.8 + i * 0.07}s` }}
                >
                  <button
                    type="button"
                    className={`index-item-EveryThingWeBuildAboutUS${isActive ? ' is-active-EveryThingWeBuildAboutUS' : ''}`}
                    onClick={() => goTo(i)}
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`${pad2(i + 1)}. ${item.title}`}
                  >
                    <span className="index-num-EveryThingWeBuildAboutUS">{pad2(i + 1)}</span>
                    <span className="index-label-EveryThingWeBuildAboutUS">{item.title}</span>
                    <svg className="index-arrow-EveryThingWeBuildAboutUS" {...svgProps} strokeWidth={2.2}>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <span className="index-bar-EveryThingWeBuildAboutUS" aria-hidden="true">
                      {isActive ? (
                        <span
                          key={`fill-${active}`}
                          className={`index-fill-EveryThingWeBuildAboutUS${heldClass}`}
                          style={{ '--autoplay-EveryThingWeBuildAboutUS': `${AUTOPLAY_MS}ms` }}
                        />
                      ) : null}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default EveryThingWeBuildAboutUS