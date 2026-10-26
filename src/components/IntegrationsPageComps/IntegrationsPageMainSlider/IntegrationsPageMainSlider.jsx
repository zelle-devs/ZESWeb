'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './IntegrationsPageMainSlider.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ---------------------------------------------------------------------------
   Background image (put the file in /public).
   Every animated element below is drawn in the image's own pixel space
   (1672 x 941), so dots, packets and shines stay locked on the cards and
   circuit traces at every screen size and every browser zoom level.
   All geometry below is measured from THIS artwork version — if the image
   is replaced, the coordinates must be re-measured.
--------------------------------------------------------------------------- */
const HERO_BG_IMAGE = '/ZesCloud_Neon_Integration_Hub2.png'

const VIEW_W = 1672
const VIEW_H = 941

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconCode = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4.5l-3 15" />
  </svg>
)

/* ---------------------------------------------------------------------------
   Card faces measured from the background image (image pixels).
   The cards are drawn in perspective, so each face is a quadrilateral, not a
   rectangle: every edge was fitted to the card's glowing rim highlight and
   the four edges intersected → [top-left, top-right, bottom-right, bottom-left].
   `r` is the face's corner radius in the artwork.
--------------------------------------------------------------------------- */
const CARD_QUADS = {
  linux: { q: [[879.1, 297.3], [964.6, 289.6], [965.1, 375.1], [878.7, 379.9]], r: 18 },
  aws: { q: [[992.1, 244.9], [1089.0, 235.2], [1089.0, 319.4], [992.0, 326.9]], r: 15 },
  azure: { q: [[1136.1, 217.6], [1245.0, 205.1], [1244.9, 312.9], [1136.1, 320.5]], r: 18 },
  gcp: { q: [[1295.1, 237.2], [1404.9, 226.0], [1405.0, 326.3], [1295.0, 334.3]], r: 19 },
  k8s: { q: [[1425.0, 313.3], [1538.2, 303.8], [1537.6, 402.6], [1424.6, 407.4]], r: 20 },
  windows: { q: [[830.0, 393.0], [913.0, 388.7], [913.1, 475.0], [830.0, 475.0]], r: 15 },
  docker: { q: [[1507.7, 407.8], [1629.0, 402.2], [1629.0, 501.0], [1508.1, 501.0]], r: 18 },
  github: { q: [[876.0, 500.0], [965.9, 500.0], [966.1, 587.4], [876.0, 584.4]], r: 16 },
  db: { q: [[1375.9, 490.3], [1477.4, 489.1], [1477.3, 578.3], [1375.7, 575.6]], r: 17 },
  slack: { q: [[1508.6, 519.6], [1620.4, 521.3], [1618.8, 617.5], [1507.1, 612.9]], r: 18 },
  // GitLab is turned in perspective: its bottom edge slopes (y 680.8 → 690.4),
  // measured column-by-column on the rim (floor glow below it excluded)
  gitlab: { q: [[979.5, 594.7], [1071.0, 596.3], [1071.0, 690.4], [979.5, 680.8]], r: 18 },
  cube: { q: [[1236.8, 607.9], [1334.9, 611.8], [1334.9, 705.9], [1236.7, 703.8]], r: 20 },
  gear: { q: [[1395.1, 608.1], [1502.9, 612.5], [1503.1, 708.5], [1394.9, 699.1]], r: 17 },
}

const CORE_QUAD = { q: [[1073.0, 381.0], [1281.3, 370.0], [1280.5, 568.9], [1073.0, 563.6]], r: 34 }

const r1 = (n) => Math.round(n * 10) / 10

/* rounded quadrilateral path: each corner is rounded with a quadratic curve
   whose control point is the true corner, so the outline follows the
   perspective of the artwork exactly */
const roundedQuadPath = (q, r) => {
  const n = q.length
  const pts = q.map((p, i) => {
    const prev = q[(i - 1 + n) % n]
    const next = q[(i + 1) % n]
    const toPrev = [prev[0] - p[0], prev[1] - p[1]]
    const toNext = [next[0] - p[0], next[1] - p[1]]
    const lp = Math.hypot(...toPrev)
    const ln = Math.hypot(...toNext)
    const rr = Math.min(r, lp / 2, ln / 2)
    return {
      c: p,
      a: [p[0] + (toPrev[0] / lp) * rr, p[1] + (toPrev[1] / lp) * rr],
      b: [p[0] + (toNext[0] / ln) * rr, p[1] + (toNext[1] / ln) * rr],
    }
  })
  let d = `M ${r1(pts[0].b[0])} ${r1(pts[0].b[1])}`
  for (let i = 1; i <= n; i += 1) {
    const k = pts[i % n]
    d += ` L ${r1(k.a[0])} ${r1(k.a[1])} Q ${r1(k.c[0])} ${r1(k.c[1])} ${r1(k.b[0])} ${r1(k.b[1])}`
  }
  return `${d} Z`
}

const toFace = ({ q, r }) => {
  const xs = q.map((p) => p[0])
  const ys = q.map((p) => p[1])
  const x = Math.min(...xs)
  const y = Math.min(...ys)
  return { q, r, d: roundedQuadPath(q, r), x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y }
}

const CARDS = Object.fromEntries(Object.entries(CARD_QUADS).map(([k, v]) => [k, toFace(v)]))
const CORE_BOX = toFace(CORE_QUAD)

/* ---------------------------------------------------------------------------
   Circuit traces vectorised from the image. Each path starts at the
   ZesCloud core and ends on the glowing terminal dot next to its card.
   Order = clockwise spotlight order.
   This artwork: Slack has its own long trace from the core's lower-right
   exit, GitLab has one trace, and the Automation (gear) card has none.
--------------------------------------------------------------------------- */
const LINKS = [
  { card: 'aws', label: 'AWS', paths: [[[1118, 378.6], [1118, 337.1], [1092.5, 315.5]]] },
  { card: 'azure', label: 'Azure', paths: [[[1194, 374.6], [1193.8, 322.8]]] },
  { card: 'gcp', label: 'Google Cloud', paths: [[[1264, 371], [1264.5, 354.5], [1283.4, 334.1], [1300.2, 333.5]]] },
  {
    card: 'k8s',
    label: 'Kubernetes',
    paths: [[[1294, 454.3], [1320, 453.4], [1329.3, 444.6], [1331.3, 420.3], [1340.1, 411.4], [1359.2, 410.3], [1367, 402.4], [1367, 380.3], [1380.2, 366.7], [1422.5, 364.7]]],
  },
  { card: 'docker', label: 'Docker', paths: [[[1296, 478], [1367, 477.9], [1390.1, 455.4], [1505.5, 453]]] },
  { card: 'db', label: 'Databases', paths: [[[1298, 478], [1309.8, 478], [1336, 505.5], [1336, 521.9], [1348.8, 533.9], [1373.5, 533.7]]] },
  { card: 'slack', label: 'Slack', paths: [[[1297, 529], [1322, 549.6], [1322, 581.3], [1337.5, 597.6], [1505.3, 595.2]]] },
  { card: 'cube', label: 'Containers', paths: [[[1188, 566.5], [1188, 632.5], [1207.6, 654.3], [1233.9, 655.3]]] },
  { card: 'gitlab', label: 'GitLab', paths: [[[1115, 564.7], [1115, 602.6], [1094.9, 625.3], [1085.2, 626.6]]] },
  { card: 'github', label: 'GitHub', paths: [[[1073, 512], [1043, 512], [1033.1, 521.9], [1032.9, 533.3], [1020.5, 546.1], [981, 545.8]]] },
  {
    card: 'windows',
    label: 'Windows',
    paths: [[[1073, 457], [1044, 457], [1022.2, 481.9], [992.1, 482.1], [984.1, 474.1], [983.9, 455.8], [969.8, 440.3], [927.6, 441.2]]],
  },
  { card: 'linux', label: 'Linux', paths: [[[1073, 428.8], [1057.5, 429.2], [1043, 414.1], [1043, 375.9], [1022, 352.5], [980.7, 354.5]]] },
]

/* cards without a trace in this artwork: shine + rim + hover only.
   `spot` places their rim flash between their neighbours in the cycle. */
const SOLO_CARDS = [{ card: 'gear', label: 'Automation', spot: 6.5, shine: 12 }]

const SPOT_STEP = 1.3 // seconds each card holds the spotlight
const SPOT_CYCLE = SPOT_STEP * LINKS.length
const PACKET_SPEED = 115 // image px per second

const pathLength = (pts) =>
  pts.reduce((sum, p, i) => (i === 0 ? 0 : sum + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1])), 0)

const toD = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

const LINK_DATA = LINKS.map((link, i) => ({
  ...link,
  index: i,
  box: CARDS[link.card],
  traces: link.paths.map((pts, j) => {
    const len = pathLength(pts)
    const out = Math.max(0.9, len / PACKET_SPEED)
    return {
      d: toD(pts),
      start: pts[0],
      end: pts[pts.length - 1],
      outDur: out.toFixed(2),
      inDur: (out * 1.45).toFixed(2),
      outBegin: (-((i * 0.53 + j * 0.37) % out)).toFixed(2),
      inBegin: (-((i * 0.71 + j * 0.29 + 0.4) % (out * 1.45))).toFixed(2),
      flowDur: (Math.max(1.6, len / 70)).toFixed(2),
    }
  }),
}))

/* floor reflection streaks under the glowing traces / cards */
const FLOOR_STREAKS = [
  { x: 900, y: 700, h: 200, w: 12, tone: 'cyan', delay: '2s' },
  { x: 966, y: 705, h: 150, w: 14, tone: 'cyan', delay: '0s' },
  { x: 1031, y: 715, h: 130, w: 30, tone: 'orange', delay: '1.1s' },
  { x: 1104, y: 690, h: 240, w: 16, tone: 'cyan', delay: '0.4s' },
  { x: 1196, y: 690, h: 240, w: 22, tone: 'cyan', delay: '1.7s' },
  { x: 1340, y: 740, h: 190, w: 14, tone: 'cyan', delay: '0.9s' },
  { x: 1440, y: 735, h: 95, w: 30, tone: 'teal', delay: '2.3s' },
  { x: 1577, y: 720, h: 120, w: 12, tone: 'cyan', delay: '1.4s' },
]

/* deterministic rising particles around the cluster */
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  cx: 900 + ((i * 97) % 700),
  cy: 600 + ((i * 53) % 160),
  r: 1.2 + (i % 3) * 0.6,
  delay: `${((i * 0.61) % 7).toFixed(2)}s`,
  dur: `${6 + (i % 4) * 1.2}s`,
}))

/* ---------------------------------------------------------------------------
   Static SVG pieces (built once, never re-rendered)
--------------------------------------------------------------------------- */
const FX_DEFS = (
  <defs>
    <radialGradient id="packet-IntegrationsPageMainSlider">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.35" stopColor="#E3F3FF" />
      <stop offset="0.55" stopColor="#7CC4FF" stopOpacity="0.55" />
      <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="terminal-IntegrationsPageMainSlider">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.45" stopColor="#BFE6FF" />
      <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
    </radialGradient>

    <linearGradient id="shine-IntegrationsPageMainSlider" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#CFEAFF" stopOpacity="0" />
      <stop offset="0.5" stopColor="#E8F6FF" stopOpacity="0.42" />
      <stop offset="1" stopColor="#CFEAFF" stopOpacity="0" />
    </linearGradient>

    <linearGradient id="scan-IntegrationsPageMainSlider" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#96D7FF" stopOpacity="0" />
      <stop offset="0.6" stopColor="#96D7FF" stopOpacity="0.16" />
      <stop offset="1" stopColor="#CFEAFF" stopOpacity="0" />
    </linearGradient>

    <radialGradient id="core-glow-IntegrationsPageMainSlider" cx="0.5" cy="0.5" r="0.6">
      <stop offset="0" stopColor="#56B4FF" stopOpacity="0.32" />
      <stop offset="0.6" stopColor="#3989E2" stopOpacity="0.12" />
      <stop offset="1" stopColor="#1848D9" stopOpacity="0" />
    </radialGradient>

    {/* soft elliptical reflections — no hard edges */}
    <radialGradient id="streak-cyan-IntegrationsPageMainSlider" cx="0.5" cy="0.4" r="0.5">
      <stop offset="0" stopColor="#7CC4FF" stopOpacity="0.5" />
      <stop offset="0.5" stopColor="#3989E2" stopOpacity="0.18" />
      <stop offset="1" stopColor="#1848D9" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="streak-orange-IntegrationsPageMainSlider" cx="0.5" cy="0.4" r="0.5">
      <stop offset="0" stopColor="#FF8A4C" stopOpacity="0.32" />
      <stop offset="1" stopColor="#FF5A1F" stopOpacity="0" />
    </radialGradient>
    <radialGradient id="streak-teal-IntegrationsPageMainSlider" cx="0.5" cy="0.4" r="0.5">
      <stop offset="0" stopColor="#3FF0D2" stopOpacity="0.34" />
      <stop offset="1" stopColor="#14B8A6" stopOpacity="0" />
    </radialGradient>

    {/* one static blur, only used by the never-moving glow layer */}
    <filter id="bloom-IntegrationsPageMainSlider" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3.2" />
    </filter>

    {Object.entries({ ...CARDS, core: CORE_BOX }).map(([key, b]) => (
      <clipPath key={key} id={`clip-${key}-IntegrationsPageMainSlider`}>
        <path d={b.d} />
      </clipPath>
    ))}
  </defs>
)

const FLOOR_LAYER = (
  <g className="floor-IntegrationsPageMainSlider">
    {FLOOR_STREAKS.map((s) => (
      <rect
        key={s.x}
        x={s.x - s.w * 1.5}
        y={s.y - 10}
        width={s.w * 3}
        height={s.h + 20}
        fill={`url(#streak-${s.tone}-IntegrationsPageMainSlider)`}
        className="streak-IntegrationsPageMainSlider"
        style={{ '--delay-IntegrationsPageMainSlider': s.delay }}
      />
    ))}
  </g>
)

/* soft bloom over every trace — blurred once, then only its opacity breathes */
const GLOW_LAYER = (
  <g className="bloom-IntegrationsPageMainSlider" filter="url(#bloom-IntegrationsPageMainSlider)">
    {LINK_DATA.map((link) =>
      link.traces.map((t, j) => <path key={`${link.card}-${j}`} d={t.d} />),
    )}
  </g>
)

/* shine band that sweeps across a card face, clipped to the card */
const CardShine = ({ id, box, index }) => (
  <g clipPath={`url(#clip-${id}-IntegrationsPageMainSlider)`}>
    <rect
      className="shine-IntegrationsPageMainSlider"
      x={box.x - 70}
      y={box.y - 30}
      width={52}
      height={box.h + 60}
      fill="url(#shine-IntegrationsPageMainSlider)"
      style={{
        '--travel-IntegrationsPageMainSlider': `${box.w + 150}px`,
        '--i-IntegrationsPageMainSlider': index,
      }}
    />
  </g>
)

/* rim follows the measured (perspective) outline of the card face */
const CardRim = ({ box }) => (
  <>
    <path className="rim-halo-IntegrationsPageMainSlider" d={box.d} />
    <path className="rim-IntegrationsPageMainSlider" d={box.d} />
  </>
)

const LINK_LAYER = LINK_DATA.map((link) => {
  const box = link.box
  return (
    <g
      key={link.card}
      className="link-IntegrationsPageMainSlider"
      style={{ '--i-IntegrationsPageMainSlider': link.index }}
    >
      <title>{`${link.label} connected to ZesCloud`}</title>

      {/* hover target = the card face in the image */}
      <path className="hit-IntegrationsPageMainSlider" d={box.d} />

      {link.traces.map((t, j) => (
        <g key={j} style={{ '--flow-dur-IntegrationsPageMainSlider': `${t.flowDur}s`, '--j-IntegrationsPageMainSlider': j }}>
          <path d={t.d} pathLength="100" className="trace-base-IntegrationsPageMainSlider" />
          <path d={t.d} pathLength="100" className="trace-flow-IntegrationsPageMainSlider" />
          <path d={t.d} pathLength="100" className="trace-surge-IntegrationsPageMainSlider" />

          {/* port on the core edge */}
          <circle cx={t.start[0]} cy={t.start[1]} r="2.6" className="port-IntegrationsPageMainSlider" />

          {/* blinking terminal dot exactly on the image's terminal */}
          <g className="terminal-IntegrationsPageMainSlider">
            <circle cx={t.end[0]} cy={t.end[1]} r="5" className="terminal-ring-IntegrationsPageMainSlider" />
            <circle cx={t.end[0]} cy={t.end[1]} r="9" className="terminal-glow-IntegrationsPageMainSlider" />
            <circle cx={t.end[0]} cy={t.end[1]} r="3" className="terminal-dot-IntegrationsPageMainSlider" />
          </g>

          {/* running data packets: core → card, and a smaller one card → core */}
          <circle r="7" className="packet-IntegrationsPageMainSlider">
            <animateMotion dur={`${t.outDur}s`} begin={`${t.outBegin}s`} repeatCount="indefinite" path={t.d} />
          </circle>
          <circle r="3.6" className="packet-IntegrationsPageMainSlider packet-return-IntegrationsPageMainSlider">
            <animateMotion
              dur={`${t.inDur}s`}
              begin={`${t.inBegin}s`}
              repeatCount="indefinite"
              path={t.d}
              keyPoints="1;0"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        </g>
      ))}

      <CardShine id={link.card} box={box} index={link.index} />
      <CardRim box={box} />
    </g>
  )
})

/* cards with no trace in the artwork — shine + rim + hover only */
const SOLO_LAYER = SOLO_CARDS.map(({ card, label, spot, shine }) => (
  <g
    key={card}
    className="link-IntegrationsPageMainSlider link-solo-IntegrationsPageMainSlider"
    style={{ '--i-IntegrationsPageMainSlider': spot }}
  >
    <title>{`${label} connected to ZesCloud`}</title>
    <path className="hit-IntegrationsPageMainSlider" d={CARDS[card].d} />
    <CardShine id={card} box={CARDS[card]} index={shine} />
    <CardRim box={CARDS[card]} />
  </g>
))

const CORE_LAYER = (
  <g className="core-IntegrationsPageMainSlider">
    <rect
      className="core-glow-IntegrationsPageMainSlider"
      x={CORE_BOX.x - 40}
      y={CORE_BOX.y - 40}
      width={CORE_BOX.w + 80}
      height={CORE_BOX.h + 80}
      rx={60}
      fill="url(#core-glow-IntegrationsPageMainSlider)"
    />
    <g clipPath="url(#clip-core-IntegrationsPageMainSlider)">
      <rect
        className="core-scan-IntegrationsPageMainSlider"
        x={CORE_BOX.x}
        y={CORE_BOX.y - 40}
        width={CORE_BOX.w}
        height={40}
        fill="url(#scan-IntegrationsPageMainSlider)"
        style={{ '--travel-IntegrationsPageMainSlider': `${CORE_BOX.h + 40}px` }}
      />
      <rect
        className="shine-IntegrationsPageMainSlider core-shine-IntegrationsPageMainSlider"
        x={CORE_BOX.x - 110}
        y={CORE_BOX.y - 40}
        width={90}
        height={CORE_BOX.h + 80}
        fill="url(#shine-IntegrationsPageMainSlider)"
        style={{ '--travel-IntegrationsPageMainSlider': `${CORE_BOX.w + 240}px` }}
      />
    </g>
    <path className="core-rim-halo-IntegrationsPageMainSlider" d={CORE_BOX.d} />
    <path className="core-rim-IntegrationsPageMainSlider" d={CORE_BOX.d} />
    <path className="core-ripple-IntegrationsPageMainSlider" d={CORE_BOX.d} />
  </g>
)

const PARTICLE_LAYER = (
  <g className="particles-IntegrationsPageMainSlider">
    {PARTICLES.map((p, i) => (
      <circle
        key={i}
        cx={p.cx}
        cy={p.cy}
        r={p.r}
        className="particle-IntegrationsPageMainSlider"
        style={{ '--delay-IntegrationsPageMainSlider': p.delay, '--dur-IntegrationsPageMainSlider': p.dur }}
      />
    ))}
  </g>
)

/* ---------------------------------------------------------------------------
   Left column content
--------------------------------------------------------------------------- */
const HeroContent = memo(function HeroContent({ exploreHref, docsHref }) {
  return (
    <div className="content-IntegrationsPageMainSlider">
      <div className="reveal-IntegrationsPageMainSlider" style={{ '--d-IntegrationsPageMainSlider': '0.05s' }}>
        <BageZescloudAllComps badge="Integrations" />
      </div>

      <h1 className="title-IntegrationsPageMainSlider">
        <span className="title-line-IntegrationsPageMainSlider">
          <span className="title-text-IntegrationsPageMainSlider" style={{ '--d-IntegrationsPageMainSlider': '0.2s' }}>
            Connect. Integrate.
          </span>
        </span>
        <span className="title-line-IntegrationsPageMainSlider">
          <span
            className="title-glow-IntegrationsPageMainSlider"
            aria-hidden="true"
            style={{ '--d-IntegrationsPageMainSlider': '0.38s' }}
          >
            Operate Smarter.
          </span>
          <span
            className="title-text-IntegrationsPageMainSlider title-accent-IntegrationsPageMainSlider"
            style={{ '--d-IntegrationsPageMainSlider': '0.38s' }}
          >
            Operate Smarter.
          </span>
        </span>
      </h1>

      <p className="lead-IntegrationsPageMainSlider reveal-IntegrationsPageMainSlider" style={{ '--d-IntegrationsPageMainSlider': '0.6s' }}>
        ZesCloud integrates with the tools you already use across cloud, infrastructure, DevOps, communication,
        databases, and security ecosystems.
      </p>

      <p
        className="lead-IntegrationsPageMainSlider lead-sub-IntegrationsPageMainSlider reveal-IntegrationsPageMainSlider"
        style={{ '--d-IntegrationsPageMainSlider': '0.72s' }}
      >
        Bring your operational data together and create a unified intelligence layer across your technology stack.
      </p>

      <div className="actions-IntegrationsPageMainSlider reveal-IntegrationsPageMainSlider" style={{ '--d-IntegrationsPageMainSlider': '0.9s' }}>
        <a href={exploreHref} className="zescloud-btn zescloud-btn-primary btn-shine-IntegrationsPageMainSlider">
          <span>Explore Integrations</span>
          <span className="btn-arrow-IntegrationsPageMainSlider">
            <IconArrow />
          </span>
        </a>

        <a href={docsHref} className="zescloud-btn zescloud-btn-outline btn-docs-IntegrationsPageMainSlider">
          <span className="btn-code-IntegrationsPageMainSlider">
            <IconCode />
          </span>
          <span>View API Docs</span>
        </a>
      </div>
    </div>
  )
})

/* ---------------------------------------------------------------------------
   Component
--------------------------------------------------------------------------- */
function IntegrationsPageMainSlider({
  backgroundImage = HERO_BG_IMAGE,
  exploreHref = '#integrations-list',
  docsHref = '/docs/api',
}) {
  const sectionRef = useRef(null)
  const fxRef = useRef(null)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  // perf: animations only run while the hero is on screen and the tab is visible
  const running = inView && pageVisible

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '120px 0px' })
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

  // pause / resume the SVG (SMIL) packet animations together with the CSS ones
  useEffect(() => {
    const svg = fxRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return
    if (running) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [running])

  return (
    <section
      ref={sectionRef}
      className={`hero-IntegrationsPageMainSlider${running ? '' : ' is-paused-IntegrationsPageMainSlider'}`}
      style={{
        '--spot-step-IntegrationsPageMainSlider': `${SPOT_STEP}s`,
        '--spot-cycle-IntegrationsPageMainSlider': `${SPOT_CYCLE}s`,
      }}
    >
      {/* artwork: image + animated overlay share one fixed-ratio stage */}
      <div className="art-IntegrationsPageMainSlider">
        <div className="stage-IntegrationsPageMainSlider">
          {backgroundImage ? (
            <img
              className="stage-img-IntegrationsPageMainSlider"
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              draggable="false"
              decoding="async"
              fetchPriority="high"
            />
          ) : null}

          <svg
            ref={fxRef}
            className="fx-IntegrationsPageMainSlider"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="ZesCloud connected to AWS, Azure, Google Cloud, Kubernetes, Docker, databases, automation, containers, GitLab, GitHub, Windows, Linux and Slack"
          >
            {FX_DEFS}
            {FLOOR_LAYER}
            {GLOW_LAYER}
            {CORE_LAYER}
            {LINK_LAYER}
            {SOLO_LAYER}
            {PARTICLE_LAYER}
          </svg>
        </div>
      </div>

      <div className="shade-IntegrationsPageMainSlider" aria-hidden="true" />

      <div className="container-IntegrationsPageMainSlider">
        <HeroContent exploreHref={exploreHref} docsHref={docsHref} />
      </div>
    </section>
  )
}

export default IntegrationsPageMainSlider