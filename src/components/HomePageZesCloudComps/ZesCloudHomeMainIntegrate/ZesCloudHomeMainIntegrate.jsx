'use client'

import React, { useEffect, useRef, useState } from 'react'
import './ZesCloudHomeMainIntegrate.css'

const SUFFIX = 'ZesCloudHomeMainIntegrate'
const cn = (...names) =>
  names
    .filter(Boolean)
    .map((n) => `${n}-${SUFFIX}`)
    .join(' ')
const v = (name) => `--${name}-${SUFFIX}`

/* The wiring stage is drawn on a fixed 1200 x 680 canvas. The SVG wires and
   the HTML cards both use these same coordinates, and the stage keeps this
   aspect ratio, so nothing drifts apart on resize or browser zoom. */
const STAGE_W = 1200
const STAGE_H = 680
const CORE = { x: 600, y: 320 }
const pctX = (value) => `${((value / STAGE_W) * 100).toFixed(4)}%`
const pctY = (value) => `${((value / STAGE_H) * 100).toFixed(4)}%`

/* Timeline (ms after the section scrolls into view) */
const LINK_START = 900
const LINK_STEP = 320
const WIRE_DRAW = 1100
const CYCLE_MS = 2600

const TONES = {
  blue: 'var(--zescloud-primary, #2f7bff)',
  cyan: 'var(--zescloud-accent-cyan, #22d3ee)',
  green: 'var(--zescloud-status-healthy, #10b981)',
  orange: 'var(--zescloud-status-warning, #f59e0b)',
  purple: 'var(--zescloud-status-purple, #8b5cf6)',
}

/* ---------------------------------- Icons --------------------------------- */
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

const IconCloudMetrics = () => (
  <svg {...svgProps}>
    <path d="M7 18h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 9.1 4.5 4.5 0 0 0 7 18z" />
    <path d="M9 14.5l2-2 1.6 1.6 2.6-2.8" />
  </svg>
)

const IconSpeed = () => (
  <svg {...svgProps}>
    <path d="M4.6 17.5a8 8 0 1 1 14.8 0" />
    <path d="M12 13.5l3.6-4.2" />
    <circle cx="12" cy="13.5" r="1.3" />
    <path d="M7.5 17.5h9" />
  </svg>
)

const IconHeartbeat = () => (
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M6 12h3l1.5-3.2 3 6.4 1.5-3.2h3" />
  </svg>
)

const IconPipeline = () => (
  <svg {...svgProps}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="12" r="2" />
    <path d="M7 6h2.5a3 3 0 0 1 3 3 3 3 0 0 0 3 3H17" />
    <path d="M7 18h2.5a3 3 0 0 0 3-3 3 3 0 0 1 3-3" />
  </svg>
)

const IconObservability = () => (
  <svg {...svgProps}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 15.5l3-3 2.5 2 4.5-5" />
    <path d="M7 7.5h3.5" />
  </svg>
)

const IconCheck = () => (
  <svg {...svgProps} strokeWidth={2.4}>
    <path d="M5 12.5l4.2 4L19 7" />
  </svg>
)

const IconReceipt = () => (
  <svg {...svgProps}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const ZauraWave = () => (
  <svg viewBox="0 0 64 32" fill="none" aria-hidden="true" focusable="false" className={cn('coreWave')}>
    <path className={cn('coreWaveBase')} d="M2 16h10l4-9 6 18 6-24 6 26 5-17 4 6h19" />
    <path
      className={cn('coreWavePath')}
      d="M2 16h10l4-9 6 18 6-24 6 26 5-17 4 6h19"
      pathLength="100"
    />
  </svg>
)

/* ---------------------------------- Data ---------------------------------- */
/* x / y = card centre on the 1200 x 680 stage. Cards are 300 x 104.
   start = where the wire leaves the card, port = where it meets the
   Zaura ring (radius 128 around the core). */
const TOOLS = [
  {
    key: 'cloudwatch',
    name: 'CloudWatch',
    role: 'Cloud metrics & logs',
    tone: 'blue',
    side: 'left',
    x: 190,
    y: 140,
    start: { x: 340, y: 140 },
    port: { x: 488, y: 258 },
    wire: 'M340 140 C 430 140, 410 258, 488 258',
    Icon: IconCloudMetrics,
  },
  {
    key: 'uptime',
    name: 'Uptime',
    role: 'Uptime & status alerts',
    tone: 'green',
    side: 'right',
    x: 1010,
    y: 140,
    start: { x: 860, y: 140 },
    port: { x: 712, y: 258 },
    wire: 'M860 140 C 770 140, 790 258, 712 258',
    Icon: IconHeartbeat,
  },
  {
    key: 'pingdom',
    name: 'Pingdom',
    role: 'Website & speed checks',
    tone: 'cyan',
    side: 'left',
    x: 190,
    y: 500,
    start: { x: 340, y: 500 },
    port: { x: 488, y: 382 },
    wire: 'M340 500 C 430 500, 410 382, 488 382',
    Icon: IconSpeed,
  },
  {
    key: 'vectorops',
    name: 'VectorOps',
    role: 'Log & data pipelines',
    tone: 'orange',
    side: 'right',
    x: 1010,
    y: 500,
    start: { x: 860, y: 500 },
    port: { x: 712, y: 382 },
    wire: 'M860 500 C 770 500, 790 382, 712 382',
    Icon: IconPipeline,
  },
  {
    key: 'datadog',
    name: 'Datadog',
    role: 'Full-stack observability',
    tone: 'purple',
    side: 'bottom',
    x: 600,
    y: 612,
    start: { x: 600, y: 560 },
    port: { x: 600, y: 448 },
    wire: 'M600 560 C 600 525, 600 490, 600 448',
    Icon: IconObservability,
  },
]

const OLD_WAY = ['5 subscriptions', '5 dashboards', '5 alert inboxes', '5 separate logins']
const NEW_WAY = ['1 platform', '1 dashboard', '1 bill', 'Zaura AI on every signal']

/* -------------------------------- Component ------------------------------- */
function ZesCloudHomeMainIntegrate() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const [entered, setEntered] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [linkedCount, setLinkedCount] = useState(0)
  const [active, setActive] = useState(-1)
  const [hovered, setHovered] = useState(null)

  const allLinked = linkedCount >= TOOLS.length
  const shown = hovered ?? active

  /* Start the entrance when the section scrolls in, and track visibility
     so every animation pauses while it is off screen. */
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setEntered(true)
      setOnScreen(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting)
        if (entry.isIntersecting) setEntered(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /* Link the tools to Zaura one by one, in sync with the CSS wire draw. */
  useEffect(() => {
    if (!entered) return undefined
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setLinkedCount(TOOLS.length)
      return undefined
    }
    const timers = TOOLS.map((_, i) =>
      setTimeout(
        () => setLinkedCount((count) => Math.max(count, i + 1)),
        LINK_START + i * LINK_STEP + WIRE_DRAW
      )
    )
    return () => timers.forEach(clearTimeout)
  }, [entered])

  /* Once everything is linked, highlight each tool in turn. */
  useEffect(() => {
    if (allLinked) setActive((current) => (current < 0 ? 0 : current))
  }, [allLinked])

  useEffect(() => {
    if (!allLinked || !onScreen || hovered !== null) return undefined
    const id = setInterval(() => setActive((current) => (current + 1) % TOOLS.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [allLinked, onScreen, hovered])

  /* Pause the SVG packet animations while the section is hidden. */
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return undefined
    const sync = () => {
      if (onScreen && !document.hidden) svg.unpauseAnimations()
      else svg.pauseAnimations()
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [onScreen])

  const statusText = allLinked
    ? `Syncing ${TOOLS[shown >= 0 ? shown : 0].name}`
    : `Linking ${linkedCount}/${TOOLS.length}`

  return (
    <section
      ref={sectionRef}
      className={cn('section', entered && 'is-in', !onScreen && 'is-paused', allLinked && 'is-online')}
      aria-labelledby={`title-${SUFFIX}`}
    >
      <div className={cn('bgGlow')} aria-hidden="true" />
      <div className={cn('bgGrid')} aria-hidden="true" />

      <div className={`zescloud-container ${cn('container')}`}>
        {/* ------------------------------ Header ------------------------------ */}
        <header className={cn('header')}>
          <span className={cn('eyebrow', 'reveal')} style={{ [v('d')]: '0s' }}>
            <span className={cn('eyebrowDot')} aria-hidden="true" />
            One platform · Every tool
          </span>

          <h2 id={`title-${SUFFIX}`} className={cn('title', 'reveal')} style={{ [v('d')]: '0.12s' }}>
            <span className={cn('titleLine')}>Five tools. Five bills.</span>
            <span className={cn('titleAccent')}>One ZesCloud.</span>
          </h2>

          <p className={cn('desc', 'reveal')} style={{ [v('d')]: '0.24s' }}>
            CloudWatch, Pingdom, Uptime, VectorOps and Datadog are usually bought one by one, each
            with its own subscription, dashboard and alerts. ZesCloud brings all of them together in
            one platform, with Zaura connecting every signal so your team works from a single view.
          </p>
        </header>

        {/* ------------------------------ Stage ------------------------------- */}
        <div className={cn('stage')}>
          <svg
            ref={svgRef}
            className={cn('wires')}
            viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient id={`halo-${SUFFIX}`}>
                <stop offset="0%" stopColor="#2f7bff" stopOpacity="0.32" />
                <stop offset="55%" stopColor="#1848d9" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1848d9" stopOpacity="0" />
              </radialGradient>
              {Object.entries(TONES).map(([tone, color]) => (
                <radialGradient key={tone} id={`packet-${tone}-${SUFFIX}`}>
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="32%" style={{ stopColor: color }} stopOpacity="0.95" />
                  <stop offset="100%" style={{ stopColor: color }} stopOpacity="0" />
                </radialGradient>
              ))}
              {TOOLS.map((tool) => (
                <path key={tool.key} id={`route-${tool.key}-${SUFFIX}`} d={tool.wire} />
              ))}
            </defs>

            {/* Zaura rings */}
            <g className={cn('rings')}>
              <circle className={cn('halo')} cx={CORE.x} cy={CORE.y} r="196" fill={`url(#halo-${SUFFIX})`} />
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  className={cn('ripple')}
                  cx={CORE.x}
                  cy={CORE.y}
                  r="92"
                  style={{ [v('rd')]: `${i * 1.2}s` }}
                />
              ))}
              <circle className={cn('ringPort')} cx={CORE.x} cy={CORE.y} r="128" />
              <g className={cn('ringOuter')}>
                <circle className={cn('ringOuterArc')} cx={CORE.x} cy={CORE.y} r="154" />
                <circle className={cn('ringOrbitDot')} cx={CORE.x} cy={CORE.y - 154} r="3.6" />
                <circle className={cn('ringOrbitDot')} cx={CORE.x} cy={CORE.y + 154} r="2.6" />
              </g>
              <g className={cn('ringInner')}>
                <circle className={cn('ringInnerArc')} cx={CORE.x} cy={CORE.y} r="108" />
              </g>
            </g>

            {/* Wires from every tool into Zaura */}
            {TOOLS.map((tool, i) => (
              <g
                key={tool.key}
                className={cn(
                  'wire',
                  `tone-${tool.tone}`,
                  linkedCount > i && 'is-linked',
                  shown === i && 'is-active'
                )}
                style={{ [v('draw-delay')]: `${(LINK_START + i * LINK_STEP) / 1000}s` }}
              >
                <path className={cn('wireTrack')} d={tool.wire} />
                <path className={cn('wireGlow')} d={tool.wire} pathLength="100" />
                <path className={cn('wireLine')} d={tool.wire} pathLength="100" />
                <path className={cn('wireFlow')} d={tool.wire} pathLength="100" />

                <g className={cn('packets')}>
                  {[0, 1].map((p) => (
                    <circle key={p} r="6" fill={`url(#packet-${tool.tone}-${SUFFIX})`}>
                      <animateMotion
                        dur="2.4s"
                        begin={`${p * 1.2 + i * 0.3}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;1"
                        keyPoints="0;1"
                        keySplines="0.45 0 0.55 1"
                      >
                        <mpath href={`#route-${tool.key}-${SUFFIX}`} />
                      </animateMotion>
                    </circle>
                  ))}
                  <circle className={cn('packetBurst')} r="9" fill={`url(#packet-${tool.tone}-${SUFFIX})`}>
                    <animateMotion dur="0.9s" begin="0s" repeatCount="indefinite">
                      <mpath href={`#route-${tool.key}-${SUFFIX}`} />
                    </animateMotion>
                  </circle>
                </g>

                <circle className={cn('startDot')} cx={tool.start.x} cy={tool.start.y} r="3.6" />
                <circle className={cn('portPulse')} cx={tool.port.x} cy={tool.port.y} r="4.5" />
                <circle className={cn('portDot')} cx={tool.port.x} cy={tool.port.y} r="4.5" />
              </g>
            ))}
          </svg>

          {/* Zaura core */}
          <div
            className={cn('core')}
            style={{ [v('x')]: pctX(CORE.x), [v('y')]: pctY(CORE.y) }}
          >
            <div className={cn('coreDisc')}>
              <span className={cn('coreBorder')} aria-hidden="true" />
              <span className={cn('coreInner')}>
                <img src="/main_logoFav.png" alt=""  width={'150px'}/>
                {/* <ZauraWave /> */}
                {/* <span className={cn('coreName')}>
                  ZES CLOUD
                </span> */}
                {/* <span className={cn('coreStatus')} aria-hidden="true">
                  <span className={cn('coreStatusDot')} />
                  <span key={statusText} className={cn('coreStatusText')}>
                    {statusText}
                  </span>
                </span> */}
              </span>
            </div>
          </div>

          {/* Tool cards */}
          {TOOLS.map((tool, i) => {
            const { Icon } = tool
            return (
              <article
                key={tool.key}
                className={cn(
                  'card',
                  `side-${tool.side}`,
                  `tone-${tool.tone}`,
                  linkedCount > i && 'is-linked',
                  shown === i && 'is-active'
                )}
                style={{
                  [v('x')]: pctX(tool.x),
                  [v('y')]: pctY(tool.y),
                  [v('card-delay')]: `${0.35 + i * 0.1}s`,
                }}
                tabIndex={0}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                <span className={cn('cardPort')} aria-hidden="true" />
                <div className={cn('cardInner')}>
                  <span className={cn('cardIcon')}>
                    <Icon />
                  </span>
                  <span className={cn('cardBody')}>
                    <span className={cn('cardName')}>{tool.name}</span>
                    <span className={cn('cardRole')}>{tool.role}</span>
                    {/* <span className={cn('cardTag')}>
                      <span className={cn('tagSolo')}>
                        <IconReceipt />
                        Billed separately
                      </span>
                      <span className={cn('tagIncluded')}>
                        <IconCheck />
                        Included in ZesCloud
                      </span>
                    </span> */}
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        {/* ----------------------------- Summary ------------------------------ */}
        <div className={cn('summary')}>
          <div className={cn('compare', 'compareOld')}>
            <span className={cn('compareLabel')}>Buying them separately</span>
            <ul className={cn('compareList')}>
              {OLD_WAY.map((item, i) => (
                <li key={item} className={cn('compareItem')} style={{ [v('i')]: i }}>
                  <span className={cn('compareText')}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <span className={cn('compareArrow')} aria-hidden="true">
            <IconArrow />
          </span>

          <div className={cn('compare', 'compareNew')}>
            <span className={cn('compareLabel')}>With ZesCloud</span>
            <ul className={cn('compareList')}>
              {NEW_WAY.map((item, i) => (
                <li key={item} className={cn('compareItem')} style={{ [v('i')]: i }}>
                  <span className={cn('compareCheck')} aria-hidden="true">
                    <IconCheck />
                  </span>
                  <span className={cn('compareText')}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={cn('cta', 'reveal')} style={{ [v('d')]: '0.75s' }}>
          <a href="/integrations" className={`zescloud-btn zescloud-btn-primary ${cn('ctaBtn')}`}>
            Explore ZesCloud
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ZesCloudHomeMainIntegrate