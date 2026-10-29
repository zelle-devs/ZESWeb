'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './IntelligenceClearViewAboutUs.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ---------------------------------------------------------------------------
   Background image (put the file in /public).
   The artwork is 1983 x 793. Every animated element below is drawn in the
   image's own pixel space, so the chart, status dots and rack lights stay
   locked on the artwork at every screen size and every browser zoom level.
   All geometry below is measured from THIS artwork — if the image is
   replaced, the coordinates must be re-measured.
--------------------------------------------------------------------------- */
const SECTION_BG_IMAGE = '/IntelligenceClearViewAboutUs2.png'

const VIEW_W = 1983
const VIEW_H = 793

/* chart line traced from the dashboard (image pixels) */
const CHART = [
  [1584, 697.1], [1605, 681.4], [1628, 657.2], [1637, 651.4], [1644, 651.4], [1657, 657.9], [1663, 658.6], [1669, 654.9],
  [1685, 638.4], [1694, 634.1], [1700, 635.6], [1715, 645], [1722, 644.8], [1733, 634.6], [1755, 607.3], [1762, 602],
  [1766, 601.3], [1770, 602.8], [1781, 612.4], [1792, 616.3], [1801, 625.6], [1805, 627.2], [1810, 624.4], [1823, 608.3],
  [1829, 603.2], [1834, 602.8], [1844, 608.8], [1849, 607.4], [1867, 582.8], [1874, 576.3], [1880, 576.6], [1892, 586.8],
  [1897, 588.8], [1900, 588.3], [1911, 575.4], [1920, 571.7], [1934, 550.2], [1942, 542.1], [1948, 539.1],
]
const CHART_END = CHART[CHART.length - 1]
const CHART_BASE_Y = 700

const toD = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
const CHART_D = toD(CHART)
const CHART_AREA_D = `${CHART_D} L ${CHART_END[0]} ${CHART_BASE_Y} L ${CHART[0][0]} ${CHART_BASE_Y} Z`

/* status dot on the dashboard (red "Critical 2" dot) */
const DOT_CRITICAL = [1925, 461]

/* ZesCloud hexagon logo + active "Overview" icon */
const LOGO_GLOW = [1351, 143]
const NAV_ICON = [1339, 245]

/* glowing light bars on the server racks (x, y, w, h — image pixels) */
const RACK_LIGHTS = [
  [1737, 2, 34, 12], [1444, 10, 17, 18], [1156, 26, 25, 17], [1497, 32, 72, 41], [1611, 65, 12, 20], [1902, 115, 70, 31],
  [1165, 158, 69, 33], [1788, 193, 18, 9], [1911, 221, 62, 19], [1164, 284, 67, 26], [1164, 363, 41, 17], [1164, 451, 40, 14],
  [1163, 542, 41, 13],
]

/* floor reflections in front of the monitor */
const FLOOR_GLOWS = [
  { cx: 1040, cy: 740, rx: 75, ry: 30, delay: '0s' },
  { cx: 1175, cy: 748, rx: 48, ry: 36, delay: '1.1s' },
  { cx: 1588, cy: 765, rx: 46, ry: 26, delay: '2.2s' },
  { cx: 1784, cy: 772, rx: 36, ry: 18, delay: '0.6s' },
  { cx: 1922, cy: 752, rx: 46, ry: 26, delay: '1.7s' },
]

/* deterministic rising particles around the monitor */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  cx: 1060 + ((i * 83) % 900),
  cy: 600 + ((i * 41) % 170),
  r: 1.1 + (i % 3) * 0.6,
  delay: `${((i * 0.61) % 7).toFixed(2)}s`,
  dur: `${6 + (i % 4) * 1.3}s`,
}))

/* ---------------------------------------------------------------------------
   Static SVG pieces (built once, never re-rendered)
--------------------------------------------------------------------------- */
const FX_DEFS = (
  <defs>
    <radialGradient id="glow-blue-IntelligenceClearViewAboutUs">
      <stop offset="0" stopColor="#E3F3FF" stopOpacity="0.9" />
      <stop offset="0.35" stopColor="#7CC4FF" stopOpacity="0.55" />
      <stop offset="1" stopColor="#3989E2" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="glow-soft-IntelligenceClearViewAboutUs">
      <stop offset="0" stopColor="#56B4FF" stopOpacity="0.45" />
      <stop offset="0.6" stopColor="#3989E2" stopOpacity="0.14" />
      <stop offset="1" stopColor="#1848D9" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="glow-logo-IntelligenceClearViewAboutUs">
      <stop offset="0" stopColor="#7C5CFF" stopOpacity="0.45" />
      <stop offset="0.5" stopColor="#3989E2" stopOpacity="0.18" />
      <stop offset="1" stopColor="#1848D9" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="packet-IntelligenceClearViewAboutUs">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.35" stopColor="#E3F3FF" />
      <stop offset="0.6" stopColor="#7CC4FF" stopOpacity="0.5" />
      <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
    </radialGradient>

    <linearGradient id="area-IntelligenceClearViewAboutUs" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#56B4FF" stopOpacity="0.35" />
      <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
    </linearGradient>

    <filter id="bloom-IntelligenceClearViewAboutUs" x="-10%" y="-30%" width="120%" height="160%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
)

const RACK_LAYER = (
  <g className="racks-IntelligenceClearViewAboutUs">
    {RACK_LIGHTS.map(([x, y, w, h], i) => (
      <ellipse
        key={i}
        className="rack-light-IntelligenceClearViewAboutUs"
        cx={x + w / 2}
        cy={y + h / 2}
        rx={w * 0.85 + 8}
        ry={h * 0.9 + 8}
        fill="url(#glow-blue-IntelligenceClearViewAboutUs)"
        style={{
          '--delay-IntelligenceClearViewAboutUs': `${((i * 0.73) % 5).toFixed(2)}s`,
          '--dur-IntelligenceClearViewAboutUs': `${2.6 + (i % 4) * 0.7}s`,
        }}
      />
    ))}
  </g>
)

const FLOOR_LAYER = (
  <g className="floor-IntelligenceClearViewAboutUs">
    {FLOOR_GLOWS.map((f, i) => (
      <ellipse
        key={i}
        className="floor-glow-IntelligenceClearViewAboutUs"
        cx={f.cx}
        cy={f.cy}
        rx={f.rx}
        ry={f.ry}
        fill="url(#glow-soft-IntelligenceClearViewAboutUs)"
        style={{ '--delay-IntelligenceClearViewAboutUs': f.delay }}
      />
    ))}
  </g>
)

const SCREEN_LAYER = (
  <g className="screen-IntelligenceClearViewAboutUs">
    {/* ZesCloud logo glow */}
    <circle
      className="logo-glow-IntelligenceClearViewAboutUs"
      cx={LOGO_GLOW[0]}
      cy={LOGO_GLOW[1]}
      r="62"
      fill="url(#glow-logo-IntelligenceClearViewAboutUs)"
    />

    {/* active nav item glow */}
    <circle
      className="nav-glow-IntelligenceClearViewAboutUs"
      cx={NAV_ICON[0]}
      cy={NAV_ICON[1]}
      r="22"
      fill="url(#glow-soft-IntelligenceClearViewAboutUs)"
    />

    {/* chart: area glow, bloom, re-drawn line, travelling packet, live end point */}
    <path className="chart-area-IntelligenceClearViewAboutUs" d={CHART_AREA_D} fill="url(#area-IntelligenceClearViewAboutUs)" />
    <path className="chart-bloom-IntelligenceClearViewAboutUs" d={CHART_D} filter="url(#bloom-IntelligenceClearViewAboutUs)" />
    <path className="chart-line-IntelligenceClearViewAboutUs" d={CHART_D} pathLength="100" />
    <path className="chart-flow-IntelligenceClearViewAboutUs" d={CHART_D} pathLength="100" />

    <circle r="6" className="chart-packet-IntelligenceClearViewAboutUs">
      <animateMotion dur="4.2s" begin="0s" repeatCount="indefinite" path={CHART_D} />
    </circle>

    <g className="chart-end-IntelligenceClearViewAboutUs">
      <circle cx={CHART_END[0]} cy={CHART_END[1]} r="5" className="ring-IntelligenceClearViewAboutUs ring-blue-IntelligenceClearViewAboutUs" />
      <circle cx={CHART_END[0]} cy={CHART_END[1]} r="9" fill="url(#packet-IntelligenceClearViewAboutUs)" className="end-glow-IntelligenceClearViewAboutUs" />
      <circle cx={CHART_END[0]} cy={CHART_END[1]} r="3" className="end-dot-IntelligenceClearViewAboutUs" />
    </g>

    {/* critical alert dot */}
    <g className="status-IntelligenceClearViewAboutUs">
      <circle cx={DOT_CRITICAL[0]} cy={DOT_CRITICAL[1]} r="6" className="ring-IntelligenceClearViewAboutUs ring-red-IntelligenceClearViewAboutUs" />
      <circle cx={DOT_CRITICAL[0]} cy={DOT_CRITICAL[1]} r="6.2" className="dot-red-IntelligenceClearViewAboutUs" />
    </g>
  </g>
)

const PARTICLE_LAYER = (
  <g className="particles-IntelligenceClearViewAboutUs">
    {PARTICLES.map((p, i) => (
      <circle
        key={i}
        cx={p.cx}
        cy={p.cy}
        r={p.r}
        className="particle-IntelligenceClearViewAboutUs"
        style={{ '--delay-IntelligenceClearViewAboutUs': p.delay, '--dur-IntelligenceClearViewAboutUs': p.dur }}
      />
    ))}
  </g>
)

/* ---------------------------------------------------------------------------
   Left column content
--------------------------------------------------------------------------- */
const HEADLINE = [
  { text: 'One platform. One', accent: false },
  { text: 'intelligence layer.  ', accent: false },
  { text: 'One clear view.', accent: true },
]

const STATEMENTS = [
  { text: 'Not more dashboards.', accent: false },
  { text: 'Not more alerts.', accent: false },
  { text: 'More clarity.', accent: true },
]

const SectionContent = memo(function SectionContent() {
  return (
    <div className="content-IntelligenceClearViewAboutUs">
      <p className="eyebrow-IntelligenceClearViewAboutUs reveal-IntelligenceClearViewAboutUs" style={{ '--d-IntelligenceClearViewAboutUs': '0.05s' }}>
        {/* <span className="eyebrow-line-IntelligenceClearViewAboutUs" aria-hidden="true" /> */}
        <BageZescloudAllComps badge='The Idea' />
      </p>

      <h2 className="title-IntelligenceClearViewAboutUs">
        {HEADLINE.map((line, i) => (
          <span key={line.text} className="title-line-IntelligenceClearViewAboutUs">
            <span
              className={`title-text-IntelligenceClearViewAboutUs${line.accent ? ' title-accent-IntelligenceClearViewAboutUs' : ''}`}
              style={{ '--d-IntelligenceClearViewAboutUs': `${0.18 + i * 0.13}s` }}
            >
              {line.text}
            </span>
          </span>
        ))}
      </h2>

      <p className="lead-IntelligenceClearViewAboutUs reveal-IntelligenceClearViewAboutUs" style={{ '--d-IntelligenceClearViewAboutUs': '0.62s' }}>
        ZesCloud brings your digital operations together, watches them continuously, and uses Zaura™ to turn signals
        into decisions.
      </p>

      <ul className="statements-IntelligenceClearViewAboutUs">
        {STATEMENTS.map((line, i) => (
          <li
            key={line.text}
            className={`statement-IntelligenceClearViewAboutUs${line.accent ? ' statement-accent-IntelligenceClearViewAboutUs' : ''}`}
            style={{ '--d-IntelligenceClearViewAboutUs': `${0.85 + i * 0.16}s` }}
          >
            <span className="statement-text-IntelligenceClearViewAboutUs">{line.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
})

/* ---------------------------------------------------------------------------
   Component
--------------------------------------------------------------------------- */
function IntelligenceClearViewAboutUs({ backgroundImage = SECTION_BG_IMAGE, id = 'the-idea' }) {
  const sectionRef = useRef(null)
  const fxRef = useRef(null)
  const [shown, setShown] = useState(false)
  const [inView, setInView] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)

  // perf: loop animations only run while the section is on screen and the tab is visible
  const running = inView && pageVisible

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
        // entrance plays once, the first time the section scrolls into view
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) setShown(true)
      },
      { threshold: [0, 0.2], rootMargin: '0px 0px -5% 0px' },
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

  // pause / resume the SVG (SMIL) chart packet together with the CSS animations
  useEffect(() => {
    const svg = fxRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return
    if (running && shown) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [running, shown])

  const stateClass = `${shown ? ' is-shown-IntelligenceClearViewAboutUs' : ''}${running ? '' : ' is-paused-IntelligenceClearViewAboutUs'}`

  return (
    <section ref={sectionRef} id={id} className={`section-IntelligenceClearViewAboutUs${stateClass}`}>
      {/* artwork: image + animated overlay share one fixed-ratio stage */}
      <div className="art-IntelligenceClearViewAboutUs">
        <div className="stage-IntelligenceClearViewAboutUs">
          {backgroundImage ? (
            <img
              className="stage-img-IntelligenceClearViewAboutUs"
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              draggable="false"
              loading="lazy"
              decoding="async"
            />
          ) : null}

          <svg
            ref={fxRef}
            className="fx-IntelligenceClearViewAboutUs"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="ZesCloud dashboard showing infrastructure health, servers, critical alerts and live performance"
          >
            {FX_DEFS}
            {FLOOR_LAYER}
            {RACK_LAYER}
            {SCREEN_LAYER}
            {PARTICLE_LAYER}
          </svg>
        </div>
      </div>

      <div className="shade-IntelligenceClearViewAboutUs" aria-hidden="true" />

      <div className="container-IntelligenceClearViewAboutUs">
        <SectionContent />
      </div>
    </section>
  )
}

export default IntelligenceClearViewAboutUs