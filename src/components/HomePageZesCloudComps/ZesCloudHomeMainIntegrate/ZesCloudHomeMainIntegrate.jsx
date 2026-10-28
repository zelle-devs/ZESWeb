'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import './ZesCloudHomeMainIntegrate.css'

const SUFFIX = 'ZesCloudHomeMainIntegrate'
const cn = (...names) =>
  names
    .filter(Boolean)
    .map((n) => `${n}-${SUFFIX}`)
    .join(' ')
const v = (name) => `--${name}-${SUFFIX}`

const STAGE_W = 1200
const STAGE_H = 560
const CORE = { x: 600, y: 260 }
const ENGINE_Y = 116
const pctX = (value) => `${((value / STAGE_W) * 100).toFixed(4)}%`
const pctY = (value) => `${((value / STAGE_H) * 100).toFixed(4)}%`

const LINK_START = 700
const LINK_STEP = 260
const WIRE_DRAW = 900
const CYCLE_MS = 2400
const TICK_MS = 1800

const ARC_R = 95
const ARC_HALF = (16 * Math.PI) / 180
const ARC_PATH = `M ${CORE.x + ARC_R * Math.cos(ARC_HALF)} ${CORE.y - ARC_R * Math.sin(ARC_HALF)} A ${ARC_R} ${ARC_R} 0 0 1 ${CORE.x + ARC_R * Math.cos(ARC_HALF)} ${CORE.y + ARC_R * Math.sin(ARC_HALF)}`

const TONES = {
  blue: 'var(--zescloud-primary, #2f7bff)',
  cyan: 'var(--zescloud-accent-cyan, #22d3ee)',
  green: 'var(--zescloud-status-healthy, #10b981)',
  orange: 'var(--zescloud-status-warning, #f59e0b)',
  purple: 'var(--zescloud-status-purple, #8b5cf6)',
}

const wave = (t, i) => (Math.sin(t * 1.7 + i * 2.3) + Math.sin(t * 0.9 + i)) / 2
const fmtK = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${Math.round(n)}`)
const perMin = (base) => (w) => `${fmtK(base * (1 + 0.06 * w))}/min`

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

const IconCheck = () => (
  <svg {...svgProps} strokeWidth={2.4}>
    <path d="M5 12.5l4.2 4L19 7" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const TOOL_LIST = [
  {
    key: 'cloudwatch',
    name: 'CloudWatch',
    role: 'Cloud metrics & logs',
    tone: 'blue',
    side: 'left',
    x: 180,
    y: 110,
    port: { x: 510, y: 230 },
    wire: 'M320 110 H 400 Q 420 110 420 130 V 210 Q 420 230 440 230 H 510',
    logo: '/cloudwatchlogo.png',
    rate: 4200,
    stat: perMin(4200),
  },
  {
    key: 'uptime',
    name: 'Uptime',
    role: 'Uptime & status alerts',
    tone: 'green',
    side: 'right',
    x: 1020,
    y: 110,
    port: { x: 690, y: 230 },
    wire: 'M880 110 H 800 Q 780 110 780 130 V 210 Q 780 230 760 230 H 690',
    logo: '/uptimelogo.png',
    rate: 360,
    stat: (w) => `${(99.97 + 0.02 * w).toFixed(2)}%`,
  },
  {
    key: 'pingdom',
    name: 'Pingdom',
    role: 'Website & speed checks',
    tone: 'cyan',
    side: 'left',
    x: 180,
    y: 410,
    port: { x: 510, y: 290 },
    wire: 'M320 410 H 400 Q 420 410 420 390 V 310 Q 420 290 440 290 H 510',
    logo: '/pingdomlogo.png',
    rate: 240,
    stat: (w) => `${Math.round(182 + 14 * w)} ms`,
  },
  {
    key: 'splunk',
    name: 'Splunk',
    role: 'Log search & analytics',
    tone: 'orange',
    side: 'right',
    x: 1020,
    y: 410,
    port: { x: 690, y: 290 },
    wire: 'M880 410 H 800 Q 780 410 780 390 V 310 Q 780 290 760 290 H 690',
    logo: '/splunklogo.png',
    rate: 12600,
    stat: perMin(12600),
  },
  {
    key: 'datadog',
    name: 'Datadog',
    role: 'Full-stack observability',
    tone: 'purple',
    side: 'bottom',
    x: 600,
    y: 500,
    port: { x: 600, y: 355 },
    wire: 'M600 456 V 355',
    logo: '/datadoglogo.png',
    rate: 2300,
    stat: perMin(2300),
  },
]

const TOOLS = TOOL_LIST.map((tool) => ({
  ...tool,
  angle: (Math.atan2(tool.port.y - CORE.y, tool.port.x - CORE.x) * 180) / Math.PI,
}))

const OLD_WAY = ['5 subscriptions', '5 dashboards', '5 alert inboxes', '5 separate logins']
const NEW_WAY = ['1 platform', '1 dashboard', '1 bill', 'Zaura AI on every signal']

function ZesCloudHomeMainIntegrate() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const [entered, setEntered] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [linkedCount, setLinkedCount] = useState(0)
  const [active, setActive] = useState(-1)
  const [hovered, setHovered] = useState(null)
  const [tick, setTick] = useState(0)
  const [arcAngle, setArcAngle] = useState(null)

  const allLinked = linkedCount >= TOOLS.length
  const shown = hovered ?? active
  const shownTool = shown >= 0 ? TOOLS[shown] : null

  const totalSignals = useMemo(
    () => TOOLS.reduce((sum, tool, i) => sum + tool.rate * (1 + 0.06 * wave(tick, i)), 0),
    [tick]
  )

  const engineText = allLinked
    ? `${fmtK(totalSignals)} signals/min`
    : `Linking ${linkedCount}/${TOOLS.length}`

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

  useEffect(() => {
    if (allLinked) setActive((current) => (current < 0 ? 0 : current))
  }, [allLinked])

  useEffect(() => {
    if (!allLinked || !onScreen || hovered !== null) return undefined
    const id = setInterval(() => setActive((current) => (current + 1) % TOOLS.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [allLinked, onScreen, hovered])

  useEffect(() => {
    if (!allLinked || !onScreen) return undefined
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS)
    return () => clearInterval(id)
  }, [allLinked, onScreen])

  useEffect(() => {
    if (shown < 0) return undefined
    const target = TOOLS[shown].angle
    setArcAngle((prev) => {
      if (prev === null) return target
      const delta = ((((target - prev) % 360) + 540) % 360) - 180
      return prev + delta
    })
    return undefined
  }, [shown])

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

  return (
    <section
      ref={sectionRef}
      className={cn('section', entered && 'is-in', !onScreen && 'is-paused', allLinked && 'is-online')}
      aria-labelledby={`title-${SUFFIX}`}
    >
      <div className={cn('bg')} aria-hidden="true">
        <span className={cn('orb', 'orbA')} />
        <span className={cn('orb', 'orbB')} />
        <span className={cn('orb', 'orbC')} />
        <span className={cn('noise')} />
      </div>

      <div className={`zescloud-container ${cn('container')}`}>
        <header className={cn('header')}>
          <span className={cn('eyebrow', 'reveal')} style={{ [v('d')]: '0s' }}>
            <span className={cn('eyebrowDot')} aria-hidden="true" />
            One platform · Every tool
          </span>

          <h2 id={`title-${SUFFIX}`} className={cn('title', 'reveal')} style={{ [v('d')]: '0.1s' }}>
            <span className={cn('titleLine')}>Five tools. Five bills.</span>
            <span className={cn('titleAccent')}>One ZesCloud.</span>
          </h2>

          <p className={cn('desc', 'reveal')} style={{ [v('d')]: '0.2s' }}>
            CloudWatch, Pingdom, Uptime, Splunk and Datadog are usually bought one by one, each
            with its own subscription, dashboard and alerts. ZesCloud brings all of them together in
            one platform, with Zaura connecting every signal so your team works from a single view.
          </p>
        </header>

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
                <stop offset="0%" stopColor="#2f7bff" stopOpacity="0.18" />
                <stop offset="60%" stopColor="#1848d9" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#1848d9" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g className={cn('rings')}>
              <circle className={cn('halo')} cx={CORE.x} cy={CORE.y} r="170" fill={`url(#halo-${SUFFIX})`} />
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  className={cn('ripple')}
                  cx={CORE.x}
                  cy={CORE.y}
                  r="82"
                  style={{ [v('rd')]: `${i * 1.4}s` }}
                />
              ))}
              <circle className={cn('portRing')} cx={CORE.x} cy={CORE.y} r={ARC_R} />
              <g className={cn('orbit')}>
                <circle className={cn('orbitPath')} cx={CORE.x} cy={CORE.y} r="118" />
                <circle className={cn('orbitDot')} cx={CORE.x} cy={CORE.y - 118} r="3" />
              </g>
              <g
                className={cn('focusArc', shownTool && 'is-on')}
                style={{
                  transform: `rotate(${arcAngle ?? 0}deg)`,
                  [v('tone')]: shownTool ? TONES[shownTool.tone] : TONES.blue,
                }}
              >
                <path d={ARC_PATH} />
              </g>
            </g>

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
                <path className={cn('wireLine')} d={tool.wire} pathLength="100" />

                <g className={cn('packets')}>
                  {[0, 1].map((p) => (
                    <g key={p}>
                      <circle className={cn('packetHalo')} r="6" />
                      <circle className={cn('packetCore')} r="2.6" />
                      <animateMotion
                        dur="2.2s"
                        begin={`${p * 1.1 + i * 0.27}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;1"
                        keyPoints="0;1"
                        keySplines="0.4 0 0.6 1"
                        path={tool.wire}
                      />
                    </g>
                  ))}
                </g>

                <circle className={cn('portPulse')} cx={tool.port.x} cy={tool.port.y} r="4" />
                <circle className={cn('portDot')} cx={tool.port.x} cy={tool.port.y} r="4" />
              </g>
            ))}
          </svg>

          <div
            className={cn('engine', allLinked && 'is-live')}
            style={{ [v('x')]: pctX(CORE.x), [v('y')]: pctY(ENGINE_Y) }}
          >
            <span className={cn('engineDot')} aria-hidden="true" />
            <span className={cn('engineName')}>Zaura AI</span>
            <span className={cn('engineSep')} aria-hidden="true" />
            <span key={engineText} className={cn('engineValue')}>
              {engineText}
            </span>
          </div>

          <div
            className={cn('core')}
            style={{
              [v('x')]: pctX(CORE.x),
              [v('y')]: pctY(CORE.y),
              [v('tone')]: shownTool ? TONES[shownTool.tone] : TONES.blue,
            }}
          >
            <div className={cn('coreDisc')}>
              <img src="/main_logoFav.png" alt="ZesCloud" className={cn('coreLogo')} draggable="false" />
            </div>
          </div>

          {TOOLS.map((tool, i) => {
            const linked = linkedCount > i
            const metric = linked ? tool.stat(wave(tick, i)) : '—'
            return (
              <article
                key={tool.key}
                className={cn(
                  'card',
                  `side-${tool.side}`,
                  `tone-${tool.tone}`,
                  linked && 'is-linked',
                  shown === i && 'is-active'
                )}
                style={{
                  [v('x')]: pctX(tool.x),
                  [v('y')]: pctY(tool.y),
                  [v('card-delay')]: `${0.3 + i * 0.08}s`,
                }}
                tabIndex={0}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                <span className={cn('cardPort')} aria-hidden="true" />
                <div className={cn('cardInner')}>
                  <span className={cn('cardLogoWrap')}>
                    <img
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className={cn('cardLogo')}
                      loading="lazy"
                      draggable="false"
                    />
                  </span>
                  <span className={cn('cardBody')}>
                    <span className={cn('cardName')}>{tool.name}</span>
                    <span className={cn('cardRole')}>{tool.role}</span>
                    <span className={cn('cardStatus')}>
                      <span className={cn('statusDot')} aria-hidden="true" />
                      <span className={cn('statusText')}>{linked ? 'Connected' : 'Connecting'}</span>
                      <span key={metric} className={cn('cardMetric')}>
                        {metric}
                      </span>
                    </span>
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        {/* <div className={cn('summary')}>
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
        </div> */}

        {/* <div className={cn('cta', 'reveal')} style={{ [v('d')]: '0.6s' }}>
          <a href="/integrations" className={`zescloud-btn zescloud-btn-primary ${cn('ctaBtn')}`}>
            Explore ZesCloud
            <IconArrow />
          </a>
        </div> */}
      </div>
    </section>
  )
}

export default ZesCloudHomeMainIntegrate