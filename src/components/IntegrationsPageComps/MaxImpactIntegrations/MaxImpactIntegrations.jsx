'use client'

import React, { useEffect, useRef, useState } from 'react'
import './MaxImpactIntegrations.css'

/* ---------------------------------------------------------------------------
   MaxImpactIntegrations — "Seamless Integration. Maximum Impact."
   The diagram lives on ONE fixed-ratio stage (1000 x 440 design units).
   Cards are positioned in % of that stage and the connector SVG uses the
   same viewBox, so lines, arrows and packets always land exactly on the
   cards at every width and zoom. Text inside the stage scales with the
   stage (container query units). Below 640px it becomes a stacked flow.
--------------------------------------------------------------------------- */

const VB_W = 1000
const VB_H = 440

/* % helpers for absolutely positioned nodes */
const box = (x, y, w, h) => ({
  left: `${(x / VB_W) * 100}%`,
  top: `${(y / VB_H) * 100}%`,
  width: `${(w / VB_W) * 100}%`,
  height: `${(h / VB_H) * 100}%`,
})

/* ------------------------------ icons ----------------------------------- */
/* every icon animates on its own (see CSS "ICONS" section) */

const IconServers = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-MaxImpactIntegrations ico-servers-MaxImpactIntegrations">
    {[3.5, 9.5, 15.5].map((y, i) => (
      <g key={y} style={{ '--r-MaxImpactIntegrations': i }}>
        <rect className="srv-row-MaxImpactIntegrations" x="4" y={y} width="16" height="5" rx="1.4" />
        <rect className="srv-slot-MaxImpactIntegrations" x="10.5" y={y + 1.9} width="6.5" height="1.2" rx="0.6" />
        <circle className="srv-led-MaxImpactIntegrations" cx="7.3" cy={y + 2.5} r="1" />
      </g>
    ))}
  </svg>
)

const IconCube = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-MaxImpactIntegrations ico-cube-MaxImpactIntegrations">
    <g className="cube-body-MaxImpactIntegrations">
      <path className="cube-left-MaxImpactIntegrations" d="M3.8 8.2L12 12.8v8.8l-8.2-4.6z" />
      <path className="cube-right-MaxImpactIntegrations" d="M20.2 8.2L12 12.8v8.8l8.2-4.6z" />
    </g>
    <path className="cube-top-MaxImpactIntegrations" d="M12 3.4l8.2 4.6L12 12.6 3.8 8z" />
    <path className="cube-edge-MaxImpactIntegrations" pathLength="100" d="M3.8 8.2L12 12.8l8.2-4.6M12 12.8v8.8" />
  </svg>
)

/* gear path generated once (8 teeth) */
const GEAR_PATH = (() => {
  const teeth = 8
  const rO = 9.6
  const rI = 7.4
  const pts = []
  for (let i = 0; i < teeth; i += 1) {
    const a = (i / teeth) * Math.PI * 2
    const step = (Math.PI * 2) / teeth
    const seq = [
      [rI, a - step * 0.5],
      [rI, a - step * 0.3],
      [rO, a - step * 0.18],
      [rO, a + step * 0.18],
      [rI, a + step * 0.3],
    ]
    seq.forEach(([r, ang]) => pts.push([12 + r * Math.cos(ang), 12 + r * Math.sin(ang)]))
  }
  return `${pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')}Z`
})()

const IconGear = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-MaxImpactIntegrations ico-gear-MaxImpactIntegrations">
    <circle className="gear-ring-MaxImpactIntegrations" cx="12" cy="12" r="11" pathLength="100" />
    <g className="gear-spin-MaxImpactIntegrations">
      <path className="gear-body-MaxImpactIntegrations" d={GEAR_PATH} />
      <circle className="gear-hole-MaxImpactIntegrations" cx="12" cy="12" r="3.1" />
    </g>
  </svg>
)

const IconEye = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-MaxImpactIntegrations ico-eye-MaxImpactIntegrations">
    <g className="eye-lid-MaxImpactIntegrations">
      <path className="eye-shape-MaxImpactIntegrations" d="M2 12c2.6-4.4 6-6.6 10-6.6s7.4 2.2 10 6.6c-2.6 4.4-6 6.6-10 6.6S4.6 16.4 2 12z" />
      <g className="eye-look-MaxImpactIntegrations">
        <circle className="eye-iris-MaxImpactIntegrations" cx="12" cy="12" r="4" />
        <circle className="eye-pupil-MaxImpactIntegrations" cx="12" cy="12" r="1.7" />
        <circle className="eye-glint-MaxImpactIntegrations" cx="13.4" cy="10.6" r="0.8" />
      </g>
    </g>
  </svg>
)

const IconBolt = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-MaxImpactIntegrations ico-bolt-MaxImpactIntegrations">
    <g className="bolt-sparks-MaxImpactIntegrations">
      <path d="M4.5 7.5l-1.8-1M19.5 16.5l1.8 1M5 15.5l-2 .6M19 8.5l2-.6" />
    </g>
    <path className="bolt-body-MaxImpactIntegrations" d="M13.6 2.2L5.6 13.4h5.2l-1.6 8.4 8.2-11.4h-5.3z" />
  </svg>
)

const IconClock = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-MaxImpactIntegrations ico-clock-MaxImpactIntegrations">
    <circle className="clock-face-MaxImpactIntegrations" cx="12" cy="12" r="9" />
    <g className="clock-ticks-MaxImpactIntegrations">
      <path d="M12 4.6v1.4M19.4 12H18M12 19.4V18M4.6 12H6" />
    </g>
    <line className="clock-hour-MaxImpactIntegrations" x1="12" y1="12" x2="12" y2="8" />
    <line className="clock-min-MaxImpactIntegrations" x1="12" y1="12" x2="15.6" y2="12" />
    <circle className="clock-center-MaxImpactIntegrations" cx="12" cy="12" r="1.2" />
  </svg>
)

const IconBars = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-MaxImpactIntegrations ico-bars-MaxImpactIntegrations">
    {[
      [4.2, 13.5, 6.5],
      [10, 9, 11],
      [15.8, 4, 16],
    ].map(([x, y, h], i) => (
      <rect key={x} className="bar-MaxImpactIntegrations" x={x} y={y} width="4" height={h} rx="1.2" style={{ '--b-MaxImpactIntegrations': i }} />
    ))}
  </svg>
)

/* ZesCloud mark: two overlapping clouds with a forward chevron */
const IconZesCloud = () => (
  <svg viewBox="0 0 48 32" aria-hidden="true" className="core-logo-MaxImpactIntegrations">
    <defs>
      <linearGradient id="coreBack-MaxImpactIntegrations" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7FD0FF" />
        <stop offset="1" stopColor="#2F8BEA" />
      </linearGradient>
      <linearGradient id="coreFront-MaxImpactIntegrations" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4AB2FF" />
        <stop offset="1" stopColor="#1A62D8" />
      </linearGradient>
    </defs>
    <path className="core-cloud-back-MaxImpactIntegrations" fill="url(#coreBack-MaxImpactIntegrations)" d="M14 26h20a8 8 0 0 0 1.4-15.9A11 11 0 0 0 14.6 8.6 8.8 8.8 0 0 0 14 26z" />
    <path className="core-cloud-front-MaxImpactIntegrations" fill="url(#coreFront-MaxImpactIntegrations)" d="M9.5 29h14a6.2 6.2 0 0 0 1-12.3 8.4 8.4 0 0 0-15.8-1A6.9 6.9 0 0 0 9.5 29z" />
    {/* <path className="core-chevron-MaxImpactIntegrations" d="M24 14.5l5.5 5.5-5.5 5.5" /> */}
  </svg>
)

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ------------------------------ diagram --------------------------------- */

const INPUTS = [
  { id: 'infra', label: 'Your Infrastructure', Icon: IconServers, tone: '41, 150, 255', color: '#36AEFF', x: 64, cx: 182 },
  { id: 'tools', label: 'Your Tools', Icon: IconCube, tone: '168, 85, 247', color: '#B985FF', x: 382, cx: 500 },
  { id: 'flows', label: 'Your Workflows', Icon: IconGear, tone: '20, 200, 160', color: '#2EE6B8', x: 700, cx: 818 },
]
const IN_Y = 4
const IN_W = 236
const IN_H = 112

const OUTPUTS = [
  { id: 'visibility', label: 'Unified Visibility', Icon: IconEye, tone: '41, 170, 255', color: '#45BCFF', x: 8, cx: 121 },
  { id: 'automation', label: 'Smarter Automation', Icon: IconBolt, tone: '16, 200, 130', color: '#2EE88F', x: 261, cx: 374 },
  { id: 'resolution', label: 'Faster Resolution', Icon: IconClock, tone: '168, 110, 255', color: '#C8A2FF', x: 514, cx: 627 },
  { id: 'excellence', label: 'Operational Excellence', Icon: IconBars, tone: '16, 200, 130', color: '#22E39A', x: 767, cx: 880 },
]
const OUT_Y = 326
const OUT_W = 226
const OUT_H = 112

const CORE = { x: 355, y: 172, w: 290, h: 84 }
const PLUS = [341, 659]

/* connector paths (design units) */
const IN_PATHS = [
  'M182 118 V200 Q182 214 196 214 H355',
  'M500 118 V172',
  'M818 118 V200 Q818 214 804 214 H645',
]
const OUT_PATHS = OUTPUTS.map(({ cx }) => {
  const dir = cx < 500 ? -1 : 1
  return `M500 258 V268 Q500 282 ${500 + dir * 14} 282 H${cx - dir * 14} Q${cx} 282 ${cx} 296 V326`
})

/* no arrow heads: every line runs straight into its card / the core */

const Connectors = ({ svgRef }) => (
  <svg ref={svgRef} className="links-MaxImpactIntegrations" viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true" focusable="false">
    <defs>
      <filter id="linkBlur-MaxImpactIntegrations" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>

    {/* static soft glow under all lines (blurred once) */}
    <g className="link-glow-MaxImpactIntegrations" filter="url(#linkBlur-MaxImpactIntegrations)">
      {[...IN_PATHS, ...OUT_PATHS].map((d) => (
        <path key={d} d={d} />
      ))}
    </g>

    {IN_PATHS.map((d, i) => (
      <g key={d} className="link-MaxImpactIntegrations is-in-MaxImpactIntegrations" style={{ '--i-MaxImpactIntegrations': i }}>
        <path d={d} pathLength="100" className="link-base-MaxImpactIntegrations" />
        <path d={d} pathLength="100" className="link-flow-MaxImpactIntegrations" />
        <path d={d} pathLength="100" className="link-surge-MaxImpactIntegrations" />
        <g className="packet-MaxImpactIntegrations">
          <circle r="7" className="packet-halo-MaxImpactIntegrations" />
          <circle r="2.8" className="packet-core-MaxImpactIntegrations" />
          <animateMotion dur={`${2.2 + i * 0.25}s`} begin={`${-i * 0.7}s`} repeatCount="indefinite" path={d} />
        </g>
      </g>
    ))}

    {OUT_PATHS.map((d, i) => (
      <g key={d} className="link-MaxImpactIntegrations is-out-MaxImpactIntegrations" style={{ '--i-MaxImpactIntegrations': i }}>
        <path d={d} pathLength="100" className="link-base-MaxImpactIntegrations" />
        <path d={d} pathLength="100" className="link-flow-MaxImpactIntegrations" />
        <path d={d} pathLength="100" className="link-surge-MaxImpactIntegrations" />
        <g className="packet-MaxImpactIntegrations">
          <circle r="7" className="packet-halo-MaxImpactIntegrations" />
          <circle r="2.8" className="packet-core-MaxImpactIntegrations" />
          <animateMotion dur={`${2.6 + (i % 2) * 0.3}s`} begin={`${-i * 0.55 - 0.3}s`} repeatCount="indefinite" path={d} />
        </g>
      </g>
    ))}

    {/* small ports where lines leave / enter the core */}
    {[
      [500, 172],
      [355, 214],
      [645, 214],
      [500, 256],
    ].map(([cx, cy], i) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.6" className="port-MaxImpactIntegrations" style={{ '--i-MaxImpactIntegrations': i }} />
    ))}
  </svg>
)

const Node = ({ node, index, kind, style }) => {
  const { Icon } = node
  return (
    <div
      className={`node-MaxImpactIntegrations is-${kind}-MaxImpactIntegrations`}
      style={{
        ...style,
        '--i-MaxImpactIntegrations': index,
        '--tone-MaxImpactIntegrations': node.tone,
        '--icon-MaxImpactIntegrations': node.color,
      }}
    >
      <span className="node-pulse-MaxImpactIntegrations" aria-hidden="true" />
      <span className="node-icon-MaxImpactIntegrations">
        <Icon />
      </span>
      <span className="node-label-MaxImpactIntegrations">{node.label}</span>
    </div>
  )
}

/* ------------------------------ section --------------------------------- */

function MaxImpactIntegrations({ learnHref = '/integrations/how-it-works' }) {
  const sectionRef = useRef(null)
  const linksRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
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

  // pause / resume the SVG packets together with the CSS animations
  useEffect(() => {
    const svg = linksRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return
    if (running) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [running])

  return (
    <section
      ref={sectionRef}
      className={`section-MaxImpactIntegrations${inView ? ' is-inview-MaxImpactIntegrations' : ''}${running ? '' : ' is-paused-MaxImpactIntegrations'}`}
      aria-labelledby="title-MaxImpactIntegrations"
    >
      <div className="bg-MaxImpactIntegrations" aria-hidden="true">
        <span className="bg-grid-MaxImpactIntegrations" />
        <span className="bg-glow-MaxImpactIntegrations" />
      </div>

      <div className="container-MaxImpactIntegrations">
        {/* ------------------------------ text ------------------------------ */}
        <div className="content-MaxImpactIntegrations">
          <div className="copy-MaxImpactIntegrations">
            <p className="eyebrow-MaxImpactIntegrations reveal-MaxImpactIntegrations" style={{ '--d-MaxImpactIntegrations': '0s' }}>
              Seamless Integration
            </p>

            <h2 id="title-MaxImpactIntegrations" className="title-MaxImpactIntegrations">
              <span className="title-line-MaxImpactIntegrations">
                <span className="title-text-MaxImpactIntegrations" style={{ '--d-MaxImpactIntegrations': '0.12s' }}>
                  Seamless Integration.
                </span>
              </span>
              <span className="title-line-MaxImpactIntegrations">
                <span
                  className="title-text-MaxImpactIntegrations title-accent-MaxImpactIntegrations"
                  style={{ '--d-MaxImpactIntegrations': '0.26s' }}
                >
                  Maximum Impact.
                </span>
              </span>
            </h2>

            <p className="lead-MaxImpactIntegrations reveal-MaxImpactIntegrations" style={{ '--d-MaxImpactIntegrations': '0.42s' }}>
              Whether you&apos;re running infrastructure in the cloud, on-premises, or across hybrid environments, ZesCloud
              fits into your existing ecosystem.
            </p>
          </div>

          <div className="actions-MaxImpactIntegrations reveal-MaxImpactIntegrations" style={{ '--d-MaxImpactIntegrations': '0.6s' }}>
            <a href={learnHref} className="zescloud-btn zescloud-btn-primary btn-MaxImpactIntegrations">
              <span>Learn How Integrations Work</span>
              <span className="btn-arrow-MaxImpactIntegrations">
                <IconArrow />
              </span>
            </a>
          </div>
        </div>

        {/* ----------------------------- diagram ---------------------------- */}
        <div
          className="stage-MaxImpactIntegrations"
          role="img"
          aria-label="Your infrastructure, tools and workflows connect to ZesCloud, which delivers unified visibility, smarter automation, faster resolution and operational excellence."
        >
          <Connectors svgRef={linksRef} />

          <div className="row-in-MaxImpactIntegrations">
            {INPUTS.map((node, i) => (
              <Node key={node.id} node={node} index={i} kind="in" style={box(node.x, IN_Y, IN_W, IN_H)} />
            ))}
          </div>

          {PLUS.map((x, i) => (
            <span
              key={x}
              className="plus-MaxImpactIntegrations"
              style={{ left: `${(x / VB_W) * 100}%`, top: `${(60 / VB_H) * 100}%`, '--i-MaxImpactIntegrations': i }}
              aria-hidden="true"
            >
              +
            </span>
          ))}

          {/* stacked layout only (phones): animated vertical links */}
          <span className="mlink-MaxImpactIntegrations mlink-a-MaxImpactIntegrations" aria-hidden="true" />

          <div className="core-MaxImpactIntegrations" style={box(CORE.x, CORE.y, CORE.w, CORE.h)}>
            <span className="core-ripple-MaxImpactIntegrations" aria-hidden="true" />
            <span className="core-ripple-MaxImpactIntegrations core-ripple-b-MaxImpactIntegrations" aria-hidden="true" />
            <span className="core-hit-MaxImpactIntegrations" aria-hidden="true" />
            <IconZesCloud />
            <span className="core-name-MaxImpactIntegrations">ZesCloud</span>
          </div>

          <span className="mlink-MaxImpactIntegrations mlink-b-MaxImpactIntegrations" aria-hidden="true" />

          <div className="row-out-MaxImpactIntegrations">
            {OUTPUTS.map((node, i) => (
              <Node key={node.id} node={node} index={i} kind="out" style={box(node.x, OUT_Y, OUT_W, OUT_H)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MaxImpactIntegrations