'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './BeyoundIntegrationsProvide.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ---------------------------------------------------------------------------
   BeyoundIntegrationsProvide — "API & Webhooks" banner
   - Background: circuit wires generated once (seeded, so server and client
     render the same markup) with dots running along them continuously.
   - Wires are drawn at a fixed pixel scale and anchored to the panel's top
     and bottom edges, so they never stretch or distort at any width / zoom.
   - Everything pauses while the section is off-screen.
--------------------------------------------------------------------------- */

const WIRE_W = 1440
const WIRE_H = 150

/* small deterministic PRNG (same output on server and client) */
function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const LANES = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132]

/* circuit traces: horizontal runs joined by 45° steps */
function buildWires(seed, count, minX) {
  const rnd = mulberry32(seed)
  const wires = []
  for (let i = 0; i < count; i += 1) {
    let x = Math.round(minX + rnd() * (WIRE_W - minX - 160))
    let y = LANES[Math.floor(rnd() * LANES.length)]
    const pts = [[x, y]]
    const segs = 2 + Math.floor(rnd() * 3)
    for (let s = 0; s < segs; s += 1) {
      x = Math.min(WIRE_W - 4, x + Math.round(40 + rnd() * 160))
      pts.push([x, y])
      if (x >= WIRE_W - 4) break
      if (s < segs - 1) {
        let dy = (rnd() < 0.5 ? -1 : 1) * 12 * (1 + Math.floor(rnd() * 2))
        if (y + dy < 8 || y + dy > WIRE_H - 8) dy = -dy
        x += Math.abs(dy)
        y += dy
        if (x >= WIRE_W - 4) break
        pts.push([x, y])
      }
    }
    if (pts.length < 2) continue
    const len = pts.reduce((n, p, k) => (k ? n + Math.hypot(p[0] - pts[k - 1][0], p[1] - pts[k - 1][1]) : 0), 0)
    const dur = Math.max(1.8, len / (60 + rnd() * 70))
    wires.push({
      d: pts.map((p, k) => `${k ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' '),
      start: pts[0],
      end: pts[pts.length - 1],
      dur: dur.toFixed(2),
      begin: (-rnd() * dur).toFixed(2),
      reverse: rnd() < 0.4,
      second: rnd() < 0.3,
      blink: rnd() < 0.55,
      bright: rnd() < 0.35,
      delay: (rnd() * 3).toFixed(2),
      flow: (2.2 + rnd() * 2.6).toFixed(2),
    })
  }
  return wires
}

const WIRES_TOP = buildWires(7, 24, 140)
const WIRES_BOTTOM = buildWires(23, 24, 140)

/* ------------------------------- icons ---------------------------------- */

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconCode = () => (
  <svg {...stroke} strokeWidth={2.3}>
    <path d="M8 7.5L3.5 12 8 16.5M16 7.5l4.5 4.5-4.5 4.5M13.6 4.5l-3.2 15" />
  </svg>
)

/* webhook glyph — after Tabler Icons (MIT) */
const IconWebhook = () => (
  <svg {...stroke} strokeWidth={2.1}>
    <path d="M4.876 13.61a4 4 0 1 0 6.124 3.39h6" />
    <path d="M15.066 20.502a4 4 0 1 0 1.934-7.502c-.706 0-1.424.179-2 .5l-3-5.5" />
    <path d="M16 8a4 4 0 1 0-8 0c0 1.506.77 2.818 2 3.5l-3 5.5" />
  </svg>
)

const IconDoc = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M6.5 2.5h7.2L19 7.8v11.7a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z" />
    <path fill="#FFFFFF" opacity="0.45" d="M13.7 2.5V6.3a1.5 1.5 0 0 0 1.5 1.5H19z" />
    <g className="glyph-cut-BeyoundIntegrationsProvide">
      <rect x="7.6" y="10.6" width="8.8" height="1.6" rx="0.8" />
      <rect x="7.6" y="13.7" width="8.8" height="1.6" rx="0.8" />
      <rect x="7.6" y="16.8" width="5.6" height="1.6" rx="0.8" />
    </g>
  </svg>
)

const IconLock = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"
    />
    <rect fill="currentColor" x="4.8" y="10" width="14.4" height="11" rx="2.6" />
    <path className="glyph-cut-BeyoundIntegrationsProvide" d="M12 13.4a1.6 1.6 0 0 1 .9 2.9l.4 2.2h-2.6l.4-2.2a1.6 1.6 0 0 1 .9-2.9z" />
  </svg>
)

const IconArrow = () => (
  <svg {...stroke} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const FEATURES = [
  {
    title: 'RESTful APIs',
    text: 'Access operational data programmatically.',
    Icon: IconCode,
    tone: '59, 155, 255',
    icon: '#4FA8FF',
  },
  {
    title: 'Real-time Webhooks',
    text: 'Receive operational events as they happen.',
    Icon: IconWebhook,
    tone: '196, 76, 255',
    icon: '#E05CFF',
  },
  {
    title: 'Detailed Documentation',
    text: 'Build integrations with clear technical references.',
    Icon: IconDoc,
    tone: '20, 190, 255',
    icon: '#1FC8FF',
  },
  {
    title: 'Enterprise Security',
    text: 'Control access to your operational data and actions.',
    Icon: IconLock,
    tone: '150, 110, 255',
    icon: '#D7B8FF',
  },
]

/* ------------------------------ pieces ---------------------------------- */

const WireStrip = memo(function WireStrip({ wires, position, svgRef }) {
  return (
    <svg
      ref={svgRef}
      className={`wires-BeyoundIntegrationsProvide wires-${position}-BeyoundIntegrationsProvide`}
      viewBox={`0 0 ${WIRE_W} ${WIRE_H}`}
      width={WIRE_W}
      height={WIRE_H}
      aria-hidden="true"
      focusable="false"
    >
      {wires.map((w, i) => {
        const motion = w.reverse ? { keyPoints: '1;0', keyTimes: '0;1', calcMode: 'linear' } : {}
        return (
          <g
            key={i}
            className={`wire-BeyoundIntegrationsProvide${w.bright ? ' is-bright-BeyoundIntegrationsProvide' : ''}`}
            style={{
              '--i-BeyoundIntegrationsProvide': i,
              '--delay-BeyoundIntegrationsProvide': `${w.delay}s`,
              '--flow-BeyoundIntegrationsProvide': `${w.flow}s`,
            }}
          >
            <path d={w.d} pathLength="100" className="wire-line-BeyoundIntegrationsProvide" />
            <path d={w.d} pathLength="100" className="wire-flow-BeyoundIntegrationsProvide" />
            <circle
              cx={w.start[0]}
              cy={w.start[1]}
              r="2.4"
              className={`wire-pad-BeyoundIntegrationsProvide${w.blink ? ' is-blink-BeyoundIntegrationsProvide' : ''}`}
            />
            <circle cx={w.end[0]} cy={w.end[1]} r="2.4" className="wire-pad-BeyoundIntegrationsProvide is-blink-BeyoundIntegrationsProvide" />

            {/* running dot = soft halo + bright core */}
            <g className="wire-dot-BeyoundIntegrationsProvide">
              <circle r="6" className="wire-dot-halo-BeyoundIntegrationsProvide" />
              <circle r="2" className="wire-dot-core-BeyoundIntegrationsProvide" />
              <animateMotion dur={`${w.dur}s`} begin={`${w.begin}s`} repeatCount="indefinite" path={w.d} {...motion} />
            </g>
            {w.second ? (
              <g className="wire-dot-BeyoundIntegrationsProvide">
                <circle r="5" className="wire-dot-halo-BeyoundIntegrationsProvide" />
                <circle r="1.6" className="wire-dot-core-BeyoundIntegrationsProvide" />
                <animateMotion
                  dur={`${w.dur}s`}
                  begin={`${(Number(w.begin) - Number(w.dur) / 2).toFixed(2)}s`}
                  repeatCount="indefinite"
                  path={w.d}
                  {...motion}
                />
              </g>
            ) : null}
          </g>
        )
      })}
    </svg>
  )
})

/* the large floating </> between the text and the cards */
const CODE_PATHS = ['M44 30 L16 58 L44 86', 'M74 16 L58 100', 'M88 30 L116 58 L88 86']

const CodeGlyph = () => (
  <div className="glyph-BeyoundIntegrationsProvide" aria-hidden="true">
    <span className="glyph-glow-BeyoundIntegrationsProvide" />
    <svg className="glyph-svg-BeyoundIntegrationsProvide" viewBox="0 0 132 116">
      <defs>
        <linearGradient id="glyphGrad-BeyoundIntegrationsProvide" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4C9DFF" />
          <stop offset="1" stopColor="#1A4FB8" />
        </linearGradient>
      </defs>
      {CODE_PATHS.map((d) => (
        <path key={`b-${d}`} d={d} className="glyph-base-BeyoundIntegrationsProvide" />
      ))}
      {CODE_PATHS.map((d) => (
        <path key={`e-${d}`} d={d} className="glyph-edge-BeyoundIntegrationsProvide" />
      ))}
      {CODE_PATHS.map((d, i) => (
        <path
          key={`r-${d}`}
          d={d}
          pathLength="100"
          className="glyph-run-BeyoundIntegrationsProvide"
          style={{ '--g-BeyoundIntegrationsProvide': i }}
        />
      ))}
    </svg>
  </div>
)

/* cursor-follow spotlight without re-rendering React */
const handlePointerMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx-BeyoundIntegrationsProvide', `${e.clientX - r.left}px`)
  el.style.setProperty('--my-BeyoundIntegrationsProvide', `${e.clientY - r.top}px`)
}

const FeatureCard = memo(function FeatureCard({ feature, index }) {
  const { Icon } = feature
  return (
    <li
      className="cell-BeyoundIntegrationsProvide"
      style={{
        '--i-BeyoundIntegrationsProvide': index,
        '--tone-BeyoundIntegrationsProvide': feature.tone,
        '--icon-BeyoundIntegrationsProvide': feature.icon,
      }}
    >
      <article className="card-BeyoundIntegrationsProvide" onPointerMove={handlePointerMove}>
        <span className="card-spot-BeyoundIntegrationsProvide" aria-hidden="true" />
        <span className="card-border-BeyoundIntegrationsProvide" aria-hidden="true" />
        <span className="card-shine-BeyoundIntegrationsProvide" aria-hidden="true" />

        <span className="card-icon-BeyoundIntegrationsProvide">
          <Icon />
        </span>

        <div className="card-text-BeyoundIntegrationsProvide">
          <h3 className="card-title-BeyoundIntegrationsProvide">{feature.title}</h3>
          <p className="card-desc-BeyoundIntegrationsProvide">{feature.text}</p>
        </div>
      </article>
    </li>
  )
})

/* ------------------------------ section --------------------------------- */

function BeyoundIntegrationsProvide({ docsHref = '/docs/api' }) {
  const sectionRef = useRef(null)
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const [inView, setInView] = useState(false) // has been revealed (once)
  const [onScreen, setOnScreen] = useState(true) // currently visible → run animations
  const [pageVisible, setPageVisible] = useState(true)

  const running = onScreen && pageVisible

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting)
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.15, rootMargin: '80px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const onVisibility = () => setPageVisible(document.visibilityState !== 'hidden')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // pause / resume the SVG (SMIL) dots together with the CSS animations
  useEffect(() => {
    ;[topRef.current, bottomRef.current].forEach((svg) => {
      if (!svg || typeof svg.pauseAnimations !== 'function') return
      if (running) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
  }, [running])

  return (
    <section
      ref={sectionRef}
      className={`section-BeyoundIntegrationsProvide${inView ? ' is-inview-BeyoundIntegrationsProvide' : ''}${running ? '' : ' is-paused-BeyoundIntegrationsProvide'}`}
      aria-labelledby="title-BeyoundIntegrationsProvide"
    >
      <div className="container-BeyoundIntegrationsProvide">
        <div className="panel-BeyoundIntegrationsProvide">
          {/* ---------------- background ---------------- */}
          <div className="bg-BeyoundIntegrationsProvide" aria-hidden="true">
            <span className="bg-glow-BeyoundIntegrationsProvide bg-glow-a-BeyoundIntegrationsProvide" />
            <span className="bg-glow-BeyoundIntegrationsProvide bg-glow-b-BeyoundIntegrationsProvide" />
            <span className="bg-dots-BeyoundIntegrationsProvide" />
            <WireStrip wires={WIRES_TOP} position="top" svgRef={topRef} />
            <WireStrip wires={WIRES_BOTTOM} position="bottom" svgRef={bottomRef} />
            <span className="bg-scan-BeyoundIntegrationsProvide" />
          </div>

          {/* ---------------- content ---------------- */}
          <div className="layout-BeyoundIntegrationsProvide">
            <div className="content-BeyoundIntegrationsProvide">
              <p className="eyebrow-BeyoundIntegrationsProvide reveal-BeyoundIntegrationsProvide" style={{ '--d-BeyoundIntegrationsProvide': '0.05s' }}>
              <BageZescloudAllComps badge= '  API & Webhooks'/>
              </p>

              <h2 id="title-BeyoundIntegrationsProvide" className="title-BeyoundIntegrationsProvide">
                <span className="title-line-BeyoundIntegrationsProvide">
                  <span className="title-text-BeyoundIntegrationsProvide" style={{ '--d-BeyoundIntegrationsProvide': '0.15s' }}>
                    Build beyond the
                  </span>
                </span>
                <span className="title-line-BeyoundIntegrationsProvide">
                  <span
                    className="title-text-BeyoundIntegrationsProvide title-accent-BeyoundIntegrationsProvide"
                    style={{ '--d-BeyoundIntegrationsProvide': '0.3s' }}
                  >
                    integrations we provide.
                  </span>
                </span>
              </h2>

              <p className="lead-BeyoundIntegrationsProvide reveal-BeyoundIntegrationsProvide" style={{ '--d-BeyoundIntegrationsProvide': '0.45s' }}>
                Use ZesCloud APIs and webhooks to connect your own applications, workflows, dashboards, and automation
                systems.
              </p>

              <div className="actions-BeyoundIntegrationsProvide reveal-BeyoundIntegrationsProvide" style={{ '--d-BeyoundIntegrationsProvide': '0.6s' }}>
                <a href={docsHref} className="zescloud-btn zescloud-btn-primary btn-BeyoundIntegrationsProvide">
                  <span className="btn-shine-BeyoundIntegrationsProvide" aria-hidden="true" />
                  <span>Explore API Docs</span>
                  <span className="btn-arrow-BeyoundIntegrationsProvide">
                    <IconArrow />
                  </span>
                </a>
              </div>
            </div>

            <CodeGlyph />

            <ul className="features-BeyoundIntegrationsProvide">
              {FEATURES.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeyoundIntegrationsProvide