'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './MainSolutionsPageHero.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const HERO_BG_IMAGE = '/SolutionsHeroBackgroundimage.jpg'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconApplications = () => (
  <svg {...svgProps}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <circle cx="17.5" cy="17.5" r="3.5" />
  </svg>
)

const IconDatabases = () => (
  <svg {...svgProps}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
)

const IconCloud = () => (
  <svg {...svgProps}>
    <path d="M7 18.5h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 9.6 4.5 4.5 0 0 0 7 18.5z" />
  </svg>
)

const IconServers = () => (
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
  </svg>
)

const IconNetworks = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M12 7.2v4.3M12 11.5l-5.4 4.8M12 11.5l5.4 4.8" />
  </svg>
)

const IconSecurity = () => (
  <svg {...svgProps}>
    <path d="M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconPlay = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
)

const IconWave = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M2 12h3.5l2.2-6 3.6 12 3.2-15 2.8 13 1.6-4H22" />
  </svg>
)

const IconLogoCloud = () => (
  <svg viewBox="0 0 32 22" aria-hidden="true">
    <defs>
      <linearGradient id="logoGrad-MainSolutionsPageHero" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7CC4FF" />
        <stop offset="1" stopColor="#1848D9" />
      </linearGradient>
    </defs>
    <path
      d="M8 21h16.5a6 6 0 0 0 .9-11.93A9 9 0 0 0 8.4 7.3 6.9 6.9 0 0 0 8 21z"
      fill="url(#logoGrad-MainSolutionsPageHero)"
    />
  </svg>
)

const STAGE_W = 680
const STAGE_H = 640
const CARD_W = 176
const CARD_H = 68
const CORE = { x: 340, y: 290 }

const ROWS = [
  { y: 96, inset: 24, dx: 69.3, dy: -40, bend: 0 },
  { y: 256, inset: 0, dx: 80, dy: 0, bend: 26 },
  { y: 416, inset: 24, dx: 69.3, dy: 40, bend: 0 },
]

const LAYERS = [
  { label: 'Applications', meta: '248 services', Icon: IconApplications, side: 'left', row: 0, load: 78 },
  { label: 'Databases', meta: '4 replicas synced', Icon: IconDatabases, side: 'left', row: 1, load: 64 },
  { label: 'Cloud', meta: '3 regions live', Icon: IconCloud, side: 'left', row: 2, load: 86 },
  { label: 'Servers', meta: '1.2k nodes', Icon: IconServers, side: 'right', row: 0, load: 72 },
  { label: 'Networks', meta: '12 ms latency', Icon: IconNetworks, side: 'right', row: 1, load: 58 },
  { label: 'Security', meta: '0 open threats', Icon: IconSecurity, side: 'right', row: 2, load: 92 },
]

const round = (n) => Math.round(n * 10) / 10

const NODES = LAYERS.map((layer) => {
  const row = ROWS[layer.row]
  const isLeft = layer.side === 'left'
  const dir = isLeft ? 1 : -1
  const x = isLeft ? row.inset : STAGE_W - CARD_W - row.inset
  const y = row.y
  const sx = isLeft ? x + CARD_W : x
  const sy = y + CARD_H / 2
  const ex = CORE.x - dir * row.dx
  const ey = CORE.y + row.dy
  const k = Math.abs(ex - sx) * 0.55
  const b = row.bend * dir
  const d = `M ${round(sx)} ${round(sy)} C ${round(sx + dir * k)} ${round(sy - b)} ${round(ex - dir * k)} ${round(ey + b)} ${round(ex)} ${round(ey)}`
  return { ...layer, x, y, ex: round(ex), ey: round(ey), d }
})

const BUS_WIRES = [
  'M 44 164 C 44 210 16 210 16 256',
  'M 16 324 C 16 370 44 370 44 416',
  'M 112 484 C 112 536 150 566 200 574',
  'M 636 164 C 636 210 664 210 664 256',
  'M 664 324 C 664 370 636 370 636 416',
  'M 568 484 C 568 536 530 566 480 574',
  // 'M 340 126 C 340 146 340 160 340 176',
]

const COLUMN_WAVES = ['0s', '1.2s', '2.4s']

const COLUMN_SPARKS = Array.from({ length: 10 }, (_, i) => ({
  left: `${18 + ((i * 37) % 64)}%`,
  delay: `${((i * 0.47) % 3.6).toFixed(2)}s`,
  dur: `${2.6 + (i % 3) * 0.6}s`,
}))

// perf: beam travel distance in px so the light can move with transform instead of `top`
const BEAMS = [
  { left: '6%', top: '4%', height: '58%', delay: '0s', dur: '6s' },
  { left: '19%', top: '0%', height: '40%', delay: '1.2s', dur: '7s' },
  { left: '78%', top: '2%', height: '42%', delay: '0.6s', dur: '6.5s' },
  { left: '95%', top: '16%', height: '56%', delay: '2s', dur: '7.5s' },
].map((b) => ({ ...b, travel: `${(parseFloat(b.height) / 100) * STAGE_H}px` }))

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  left: `${96 + ((i * 53) % 488)}px`,
  top: `${492 + ((i * 31) % 96)}px`,
  delay: `${((i * 0.57) % 6).toFixed(2)}s`,
  dur: `${5 + (i % 4)}s`,
  size: `${2 + (i % 3)}px`,
}))

const STATS = [
  { value: '6', label: 'Infrastructure layers' },
  { value: '24/7', label: 'Zaura AI monitoring' },
  { value: '1', label: 'Unified control plane' },
]

/* ------------------------------------------------------------------
   perf: static decorative layers are created ONCE at module level.
   The 2.6s `active` ticker re-render no longer touches any of them.
------------------------------------------------------------------- */

const HERO_BG_LAYERS = (
  <>
    <div className="overlay-MainSolutionsPageHero" aria-hidden="true" />
    <div className="grid-MainSolutionsPageHero" aria-hidden="true" />
    <div className="ambient-MainSolutionsPageHero" aria-hidden="true" />
    <div className="hero-smoke-MainSolutionsPageHero" aria-hidden="true">
      <span className="hero-smoke-blob-MainSolutionsPageHero hero-smoke-a-MainSolutionsPageHero" />
      <span className="hero-smoke-blob-MainSolutionsPageHero hero-smoke-b-MainSolutionsPageHero" />
      <span className="hero-smoke-blob-MainSolutionsPageHero hero-smoke-c-MainSolutionsPageHero" />
    </div>
  </>
)

const VISUAL_BACK_LAYERS = (
  <>
    <div className="scene-img-MainSolutionsPageHero" aria-hidden="true" />

    <div className="beams-MainSolutionsPageHero" aria-hidden="true">
      {BEAMS.map((b, i) => (
        <span
          key={i}
          className="beam-MainSolutionsPageHero"
          style={{
            left: b.left,
            top: b.top,
            height: b.height,
            '--delay-MainSolutionsPageHero': b.delay,
            '--dur-MainSolutionsPageHero': b.dur,
            '--beam-h-MainSolutionsPageHero': b.travel,
          }}
        />
      ))}
    </div>

    <div className="smoke-MainSolutionsPageHero" aria-hidden="true">
      <span className="smoke-blob-MainSolutionsPageHero smoke-1-MainSolutionsPageHero" />
      <span className="smoke-blob-MainSolutionsPageHero smoke-2-MainSolutionsPageHero" />
      <span className="smoke-blob-MainSolutionsPageHero smoke-3-MainSolutionsPageHero" />
    </div>

    <div className="ring-MainSolutionsPageHero" aria-hidden="true">
      <span className="ring-glow-MainSolutionsPageHero" />
      <span className="ring-line-MainSolutionsPageHero" />
      <span className="ring-ripple-MainSolutionsPageHero" />
      <span className="ring-ripple-MainSolutionsPageHero ring-ripple-delay-MainSolutionsPageHero" />
      <span className="ring-reflect-MainSolutionsPageHero" />
    </div>

    {/* perf: SVG blur filter replaced by a soft "halo" stroke under each runner */}
    <svg className="ring-flow-MainSolutionsPageHero" viewBox="0 0 680 640" aria-hidden="true">
      <ellipse cx="340" cy="546" rx="258" ry="34" className="ring-flow-base-MainSolutionsPageHero" />
      <ellipse
        cx="340"
        cy="546"
        rx="258"
        ry="34"
        pathLength="100"
        className="ring-flow-run-MainSolutionsPageHero ring-flow-halo-MainSolutionsPageHero"
      />
      <ellipse cx="340" cy="546" rx="258" ry="34" pathLength="100" className="ring-flow-run-MainSolutionsPageHero" />
      <ellipse
        cx="340"
        cy="546"
        rx="258"
        ry="34"
        pathLength="100"
        className="ring-flow-run-MainSolutionsPageHero ring-flow-run-b-MainSolutionsPageHero ring-flow-halo-MainSolutionsPageHero"
      />
      <ellipse
        cx="340"
        cy="546"
        rx="258"
        ry="34"
        pathLength="100"
        className="ring-flow-run-MainSolutionsPageHero ring-flow-run-b-MainSolutionsPageHero"
      />
    </svg>

    <div className="column-MainSolutionsPageHero" aria-hidden="true">
      <span className="column-beam-MainSolutionsPageHero" />
      <span className="column-core-MainSolutionsPageHero" />
      <span className="column-pad-MainSolutionsPageHero" />
      {COLUMN_WAVES.map((delay) => (
        <span
          key={delay}
          className="column-wave-MainSolutionsPageHero"
          style={{ '--delay-MainSolutionsPageHero': delay }}
        />
      ))}
      {COLUMN_SPARKS.map((s, i) => (
        <span
          key={i}
          className="column-spark-MainSolutionsPageHero"
          style={{
            left: s.left,
            '--delay-MainSolutionsPageHero': s.delay,
            '--dur-MainSolutionsPageHero': s.dur,
          }}
        />
      ))}
    </div>
  </>
)

const CORE_DECOR = (
  <>
    <span className="core-halo-MainSolutionsPageHero" />
    <span className="core-ring-MainSolutionsPageHero core-ring-outer-MainSolutionsPageHero" />
    <span className="core-ring-MainSolutionsPageHero core-ring-dock-MainSolutionsPageHero" />
    <span className="core-sweep-MainSolutionsPageHero" />
    <div className="core-orbits-MainSolutionsPageHero">
      <span className="core-orbit-MainSolutionsPageHero core-orbit-a-MainSolutionsPageHero" />
      <span className="core-orbit-MainSolutionsPageHero core-orbit-b-MainSolutionsPageHero" />
      <span className="core-orbit-MainSolutionsPageHero core-orbit-c-MainSolutionsPageHero" />
    </div>
    {/* perf: pulsing glow layer (opacity only) instead of animating box-shadow */}
    <span className="core-glow-MainSolutionsPageHero" />
  </>
)

const SPHERE_DECOR = (
  <>
    <span className="core-grid-MainSolutionsPageHero" />
    <span className="core-scan-MainSolutionsPageHero" />
    <span className="core-shine-MainSolutionsPageHero" />
    <span className="core-icon-MainSolutionsPageHero">
      <IconWave />
    </span>
    <span className="core-name-MainSolutionsPageHero">
      Zaura<sup>™</sup>
    </span>
    <span className="core-sub-MainSolutionsPageHero">AI Intelligence</span>
  </>
)

const VISUAL_FRONT_LAYERS = (
  <>
    <div className="plate-MainSolutionsPageHero" aria-hidden="true">
      <span className="plate-logo-MainSolutionsPageHero">
        <IconLogoCloud />
      </span>
      <span className="plate-text-MainSolutionsPageHero">ZesCloud</span>
      <span className="plate-shine-MainSolutionsPageHero" />
    </div>

    <div className="particles-MainSolutionsPageHero" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle-MainSolutionsPageHero"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            '--delay-MainSolutionsPageHero': p.delay,
            '--dur-MainSolutionsPageHero': p.dur,
          }}
        />
      ))}
    </div>

    <div className="smoke-front-MainSolutionsPageHero" aria-hidden="true">
      <span className="smoke-blob-MainSolutionsPageHero smoke-4-MainSolutionsPageHero" />
      <span className="smoke-blob-MainSolutionsPageHero smoke-5-MainSolutionsPageHero" />
    </div>
  </>
)

const HeroContent = memo(function HeroContent({ exploreHref, tourHref }) {
  return (
    <div className="content-MainSolutionsPageHero">
      <div className="reveal-MainSolutionsPageHero" style={{ '--d-MainSolutionsPageHero': '0.05s' }}>
        <BageZescloudAllComps badge="Solutions" />
      </div>

      <h1 className="title-MainSolutionsPageHero">
        <span className="title-line-MainSolutionsPageHero">
          <span className="title-text-MainSolutionsPageHero" style={{ '--d-MainSolutionsPageHero': '0.2s' }}>
            Built for every layer.
          </span>
        </span>
        <span className="title-line-MainSolutionsPageHero">
          {/* perf: static glow copy (own layer) replaces filter: drop-shadow on the shimmering text */}
          <span
            className="title-glow-MainSolutionsPageHero"
            aria-hidden="true"
            style={{ '--d-MainSolutionsPageHero': '0.38s' }}
          >
            Built for real impact.
          </span>
          <span
            className="title-text-MainSolutionsPageHero title-accent-MainSolutionsPageHero"
            style={{ '--d-MainSolutionsPageHero': '0.38s' }}
          >
            Built for real impact.
          </span>
        </span>
      </h1>

      <p className="lead-MainSolutionsPageHero reveal-MainSolutionsPageHero" style={{ '--d-MainSolutionsPageHero': '0.6s' }}>
        ZesCloud solutions help modern teams monitor, automate, and optimize infrastructure operations with
        confidence.
      </p>

      <div className="actions-MainSolutionsPageHero reveal-MainSolutionsPageHero" style={{ '--d-MainSolutionsPageHero': '0.8s' }}>
        <a href={exploreHref} className="zescloud-btn zescloud-btn-primary btn-shine-MainSolutionsPageHero">
          <span>Explore the Solutions</span>
          <span className="btn-arrow-MainSolutionsPageHero">
            <IconArrow />
          </span>
        </a>

        <a href={tourHref} className="zescloud-btn zescloud-btn-outline">
          <span className="play-MainSolutionsPageHero">
            <IconPlay />
          </span>
          <span>Watch Overview</span>
        </a>
      </div>

      <ul className="stats-MainSolutionsPageHero reveal-MainSolutionsPageHero" style={{ '--d-MainSolutionsPageHero': '1s' }}>
        {STATS.map((stat) => (
          <li key={stat.label} className="stat-MainSolutionsPageHero">
            <span className="stat-value-MainSolutionsPageHero">{stat.value}</span>
            <span className="stat-label-MainSolutionsPageHero">{stat.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
})

function MainSolutionsPageHero({
  backgroundImage = HERO_BG_IMAGE,
  exploreHref = '/solutions',
  tourHref = '#solutions-overview',
}) {
  const sectionRef = useRef(null)
  const wiresRef = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  // perf: everything runs only while the hero is on screen and the tab is visible
  const running = inView && pageVisible

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '120px 0px',
    })
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

  // perf: pause / resume the SVG (SMIL) packet animations together with the CSS ones
  useEffect(() => {
    const svg = wiresRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return
    if (running) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [running])

  useEffect(() => {
    if (paused || !running) return undefined
    if (typeof window === 'undefined') return undefined
    const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    if (media && media.matches) return undefined
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % LAYERS.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [paused, running])

  const handleEnter = (index) => {
    setActive(index)
    setPaused(true)
  }

  const handleLeave = () => {
    setPaused(false)
  }

  return (
    <section
      ref={sectionRef}
      className={`hero-MainSolutionsPageHero${running ? '' : ' is-paused-MainSolutionsPageHero'}`}
      style={{
        '--hero-bg-MainSolutionsPageHero': backgroundImage ? `url("${backgroundImage}")` : 'none',
      }}
    >
      {HERO_BG_LAYERS}

      <div className="container-MainSolutionsPageHero">
        <HeroContent exploreHref={exploreHref} tourHref={tourHref} />

        <div
          className="visual-MainSolutionsPageHero"
          role="img"
          aria-label="ZesCloud solutions: Applications, Databases, Cloud, Servers, Networks and Security connected to the Zaura AI Intelligence core"
        >
          <div className="visual-inner-MainSolutionsPageHero">
            {VISUAL_BACK_LAYERS}

            <div className="constellation-MainSolutionsPageHero">
              <div className="core-MainSolutionsPageHero" aria-hidden="true">
                {CORE_DECOR}
                <div className="core-sphere-MainSolutionsPageHero">
                  {SPHERE_DECOR}
                  <span key={active} className="core-ticker-MainSolutionsPageHero">
                    <span className="core-ticker-dot-MainSolutionsPageHero" />
                    {LAYERS[active].label}
                  </span>
                </div>
              </div>

              {/* perf: blurred wire glow lives in its own static SVG layer, so the blur is
                  NOT recomputed every frame while packets move in the SVG below */}
              <svg
                className="wires-MainSolutionsPageHero wires-glow-MainSolutionsPageHero"
                viewBox="0 0 680 640"
                aria-hidden="true"
              >
                <defs>
                  <filter id="wireBlur-MainSolutionsPageHero" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                <g filter="url(#wireBlur-MainSolutionsPageHero)">
                  {NODES.map((node, i) => (
                    <g
                      key={node.label}
                      className={`wire-MainSolutionsPageHero${active === i ? ' is-active-MainSolutionsPageHero' : ''}`}
                      style={{ '--i-MainSolutionsPageHero': i }}
                    >
                      <path d={node.d} className="wire-glow-MainSolutionsPageHero" />
                    </g>
                  ))}
                </g>
              </svg>

              <svg ref={wiresRef} className="wires-MainSolutionsPageHero" viewBox="0 0 680 640" aria-hidden="true">
                <defs>
                  {/* perf: glow baked into a radial gradient instead of an SVG blur filter per packet */}
                  <radialGradient id="packetGrad-MainSolutionsPageHero">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset="0.4" stopColor="#E3F3FF" />
                    <stop offset="0.52" stopColor="#7CC4FF" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {BUS_WIRES.map((d, i) => (
                  <g
                    key={d}
                    className="wire-MainSolutionsPageHero wire-bus-MainSolutionsPageHero"
                    style={{ '--i-MainSolutionsPageHero': i + 6 }}
                  >
                    <path d={d} pathLength="100" className="wire-base-MainSolutionsPageHero" />
                    <path d={d} pathLength="100" className="wire-flow-MainSolutionsPageHero" />
                    <circle r="5" className="wire-packet-MainSolutionsPageHero">
                      <animateMotion
                        dur={`${2.6 + (i % 3) * 0.5}s`}
                        begin={`${(-i * 0.61).toFixed(2)}s`}
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  </g>
                ))}

                {NODES.map((node, i) => (
                  <g
                    key={node.label}
                    className={`wire-MainSolutionsPageHero${active === i ? ' is-active-MainSolutionsPageHero' : ''}`}
                    style={{ '--i-MainSolutionsPageHero': i }}
                  >
                    <path d={node.d} pathLength="100" className="wire-base-MainSolutionsPageHero" />
                    <path d={node.d} pathLength="100" className="wire-flow-MainSolutionsPageHero" />
                    <circle r="7" className="wire-packet-MainSolutionsPageHero">
                      <animateMotion
                        dur={`${1.8 + (i % 3) * 0.35}s`}
                        begin={`${(-i * 0.43).toFixed(2)}s`}
                        repeatCount="indefinite"
                        path={node.d}
                      />
                    </circle>
                    <circle r="1.8" className="wire-packet-MainSolutionsPageHero wire-packet-return-MainSolutionsPageHero">
                      <animateMotion
                        dur={`${2.6 + (i % 2) * 0.4}s`}
                        begin={`${(-i * 0.29 - 0.9).toFixed(2)}s`}
                        repeatCount="indefinite"
                        path={node.d}
                        keyPoints="1;0"
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                    <circle cx={node.ex} cy={node.ey} r="3.4" className="wire-port-MainSolutionsPageHero" />
                  </g>
                ))}
              </svg>

              {/* <div className="hud-MainSolutionsPageHero" aria-hidden="true">
                <span className="hud-dot-MainSolutionsPageHero" />
                <span className="hud-text-MainSolutionsPageHero">All systems operational</span>
                <span className="hud-chip-MainSolutionsPageHero">99.99%</span>
              </div> */}

              {NODES.map(({ label, meta, Icon, side, x, y, load }, i) => (
                <div
                  key={label}
                  className={`node-MainSolutionsPageHero node-${side}-MainSolutionsPageHero${active === i ? ' is-active-MainSolutionsPageHero' : ''}`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    '--i-MainSolutionsPageHero': i,
                    '--load-MainSolutionsPageHero': `${load}%`,
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={handleLeave}
                >
                  <div className="node-shell-MainSolutionsPageHero">
                    <span className="node-sweep-MainSolutionsPageHero" />
                    <div className="node-body-MainSolutionsPageHero">
                      <span className="node-icon-MainSolutionsPageHero">
                        <Icon />
                      </span>
                      <span className="node-text-MainSolutionsPageHero">
                        <span className="node-label-MainSolutionsPageHero">{label}</span>
                        <span className="node-meta-MainSolutionsPageHero">{meta}</span>
                      </span>
                      <span className="node-status-MainSolutionsPageHero" />
                    </div>
                    <span className="node-meter-MainSolutionsPageHero">
                      <span />
                    </span>
                  </div>
                  <span className="node-port-MainSolutionsPageHero" />
                </div>
              ))}
            </div>

            {VISUAL_FRONT_LAYERS}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainSolutionsPageHero