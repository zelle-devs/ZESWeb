'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './ResourcesPageMainHero.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const HERO_BG_IMAGE = '/ResourcesPageMainSlider.png'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

/* ------------------------------ Icons ------------------------------ */

const IconDocumentation = () => (
  <svg {...svgProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
)

const IconGuides = () => (
  <svg {...svgProps}>
    <path d="M2 9.5L12 4.5l10 5-10 5z" />
    <path d="M6 11.5v4.8c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8" />
    <path d="M22 9.5v5.5" />
  </svg>
)

const IconBlog = () => (
  <svg {...svgProps}>
    <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    <path d="M17.5 3.5a2.1 2.1 0 0 1 3 3L13 14l-4 1 1-4z" />
  </svg>
)

const IconCaseStudies = () => (
  <svg {...svgProps}>
    <path d="M3 20.5h18" />
    <path d="M6 20v-5M10.5 20v-9M15 20v-6.5M19.5 20V5" />
  </svg>
)

const IconApi = () => (
  <svg {...svgProps}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>
)

const IconVideos = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.6v6.8l5.8-3.4z" fill="currentColor" />
  </svg>
)

const IconSearch = () => (
  <svg {...svgProps} strokeWidth={2}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconChevron = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)

const CLOUD_PATH = 'M8 21h16.5a6 6 0 0 0 .9-11.93A9 9 0 0 0 8.4 7.3 6.9 6.9 0 0 0 8 21z'

const IconHubLogo = () => (
  <svg viewBox="0 0 32 22" aria-hidden="true">
    <defs>
      <linearGradient id="hubLogoGrad-ResourcesPageMainHero" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#CFEAFF" />
        <stop offset="0.45" stopColor="#7CC4FF" />
        <stop offset="1" stopColor="#1848D9" />
      </linearGradient>
    </defs>
    <path d={CLOUD_PATH} fill="url(#hubLogoGrad-ResourcesPageMainHero)" />
    <path d={CLOUD_PATH} pathLength="100" className="hub-logo-stroke-ResourcesPageMainHero" />
    <path d="M14.4 11.4v5.4l4.4-2.7z" className="hub-logo-play-ResourcesPageMainHero" />
  </svg>
)

/* ---------------------------- Geometry ----------------------------
   Same 680 x 640 stage as the Solutions hero, scaled by CSS.
   BOOK = the glowing book in the background image, HUB = logo above it.
------------------------------------------------------------------- */

const STAGE_W = 680
const STAGE_H = 640
const CARD_X = -66 // cards' left edge (smaller = further left)
const CARD_TOP = 48
const CARD_STEP = 78
const CARD_H = 60
const CARD_EDGE_X = CARD_X + 238 // visible right edge of a card after its 3D tilt
const HUB = { x: 500, y: 350, r: 62 }
const BOOK = { x: 500, y: 540 }
const BEAM_W = 96 // width of the light beam at the circle (narrow point sits on the book centre)

const RESOURCES = [
  { label: 'Documentation', href: '/resources/documentation', Icon: IconDocumentation },
  { label: 'Guides', href: '/resources/guides', Icon: IconGuides },
  { label: 'Blog', href: '/resources/blog', Icon: IconBlog },
  { label: 'Case Studies', href: '/resources/case-studies', Icon: IconCaseStudies },
  { label: 'API Reference', href: '/resources/api-reference', Icon: IconApi },
  { label: 'Videos', href: '/resources/videos', Icon: IconVideos },
]

const WORDS = ['Learn', 'Build', 'Integrate', 'Automate', 'Optimize']

const POPULAR_SEARCHES = ['Getting Started', 'API', 'Monitoring', 'Automation']

const round = (n) => Math.round(n * 10) / 10

// card (right edge) -> logo ring
const WIRES = RESOURCES.map((_, i) => {
  const sx = CARD_EDGE_X
  const sy = CARD_TOP + i * CARD_STEP + CARD_H / 2
  const angle = Math.atan2(sy - HUB.y, sx - HUB.x)
  const ex = HUB.x + Math.cos(angle) * HUB.r
  const ey = HUB.y + Math.sin(angle) * HUB.r
  const k = Math.abs(ex - sx) * 0.45
  const d = `M ${round(sx)} ${round(sy)} C ${round(sx + k)} ${round(sy)} ${round(ex + Math.cos(angle) * k)} ${round(
    ey + Math.sin(angle) * k
  )} ${round(ex)} ${round(ey)}`
  return { sx, sy, ex: round(ex), ey: round(ey), d }
})

// book centre -> logo light lines (start close together on the book, open up to the circle)
const PROJECTION_LINES = [-32, -19, -6, 6, 19, 32].map((dx) => {
  const x1 = BOOK.x + dx * 0.3
  const y1 = BOOK.y - 4
  const x2 = HUB.x + dx
  const y2 = HUB.y + 40
  return `M ${round(x1)} ${round(y1)} L ${round(x2)} ${round(y2)}`
})

const PROJ_SPARKS = Array.from({ length: 10 }, (_, i) => ({
  left: `${14 + ((i * 37) % 72)}%`,
  delay: `${((i * 0.47) % 3.4).toFixed(2)}s`,
  dur: `${2.4 + (i % 3) * 0.5}s`,
}))

const BEAMS = [
  { left: '4%', top: '6%', height: '52%', delay: '0s', dur: '6s' },
  { left: '44%', top: '0%', height: '36%', delay: '1.4s', dur: '7s' },
  { left: '82%', top: '20%', height: '44%', delay: '0.6s', dur: '6.5s' },
  { left: '97%', top: '30%', height: '50%', delay: '2.2s', dur: '7.5s' },
].map((b) => ({ ...b, travel: `${(parseFloat(b.height) / 100) * STAGE_H}px` }))

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: `${BOOK.x - 90 + ((i * 53) % 180)}px`,
  top: `${BOOK.y - 40 + ((i * 31) % 60)}px`,
  delay: `${((i * 0.57) % 6).toFixed(2)}s`,
  dur: `${5 + (i % 4)}s`,
  size: `${2 + (i % 3)}px`,
}))

/* ------------------------------------------------------------------
   perf: static decorative layers are created ONCE at module level.
   The 2.6s `active` ticker re-render never touches them.
------------------------------------------------------------------- */

const HERO_BG_LAYERS = (
  <>
    <div className="overlay-ResourcesPageMainHero" aria-hidden="true" />
    <div className="grid-ResourcesPageMainHero" aria-hidden="true" />
    <div className="ambient-ResourcesPageMainHero" aria-hidden="true" />
    <div className="hero-smoke-ResourcesPageMainHero" aria-hidden="true">
      <span className="hero-smoke-blob-ResourcesPageMainHero hero-smoke-a-ResourcesPageMainHero" />
      <span className="hero-smoke-blob-ResourcesPageMainHero hero-smoke-b-ResourcesPageMainHero" />
      <span className="hero-smoke-blob-ResourcesPageMainHero hero-smoke-c-ResourcesPageMainHero" />
    </div>
  </>
)

const VISUAL_BACK_LAYERS = (
  <>
    <div className="scene-img-ResourcesPageMainHero" aria-hidden="true" />

    <div className="beams-ResourcesPageMainHero" aria-hidden="true">
      {BEAMS.map((b, i) => (
        <span
          key={i}
          className="beam-ResourcesPageMainHero"
          style={{
            left: b.left,
            top: b.top,
            height: b.height,
            '--delay-ResourcesPageMainHero': b.delay,
            '--dur-ResourcesPageMainHero': b.dur,
            '--beam-h-ResourcesPageMainHero': b.travel,
          }}
        />
      ))}
    </div>

    <div className="smoke-ResourcesPageMainHero" aria-hidden="true">
      <span className="smoke-blob-ResourcesPageMainHero smoke-1-ResourcesPageMainHero" />
      <span className="smoke-blob-ResourcesPageMainHero smoke-2-ResourcesPageMainHero" />
      <span className="smoke-blob-ResourcesPageMainHero smoke-3-ResourcesPageMainHero" />
    </div>
  </>
)

const HUB_BLOCK = (
  <div
    className="hub-ResourcesPageMainHero"
    aria-hidden="true"
    style={{ left: `${HUB.x - 100}px`, top: `${HUB.y - 100}px` }}
  >
    <span className="hub-halo-ResourcesPageMainHero" />
    {['0s', '1.2s', '2.4s'].map((delay) => (
      <span key={delay} className="hub-ripple-ResourcesPageMainHero" style={{ '--delay-ResourcesPageMainHero': delay }} />
    ))}
    <span className="hub-ring-ResourcesPageMainHero hub-ring-dash-ResourcesPageMainHero" />
    <span className="hub-ring-ResourcesPageMainHero hub-ring-grad-ResourcesPageMainHero" />
    <span className="hub-ring-ResourcesPageMainHero hub-ring-ticks-ResourcesPageMainHero" />
    <span className="hub-sweep-ResourcesPageMainHero" />
    <div className="hub-orbits-ResourcesPageMainHero">
      <span className="hub-orbit-ResourcesPageMainHero hub-orbit-a-ResourcesPageMainHero" />
      <span className="hub-orbit-ResourcesPageMainHero hub-orbit-b-ResourcesPageMainHero" />
    </div>
    <span className="hub-glow-ResourcesPageMainHero" />
    <div className="hub-core-ResourcesPageMainHero">
      <span className="hub-core-grid-ResourcesPageMainHero" />
      <span className="hub-core-shine-ResourcesPageMainHero" />
      <span className="hub-logo-ResourcesPageMainHero">
        <IconHubLogo />
      </span>
    </div>
  </div>
)

const WORDS_BLOCK = (
  <div className="words-ResourcesPageMainHero" aria-hidden="true">
    <ul className="words-list-ResourcesPageMainHero">
      {WORDS.map((word, i) => (
        <li key={word} className="word-ResourcesPageMainHero" style={{ '--i-ResourcesPageMainHero': i }}>
          <span className="word-text-ResourcesPageMainHero">{word}</span>
        </li>
      ))}
    </ul>
    <span className="words-track-ResourcesPageMainHero">
      <span className="words-runner-ResourcesPageMainHero" />
    </span>
  </div>
)

const VISUAL_FRONT_LAYERS = (
  <>
    <div className="particles-ResourcesPageMainHero" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle-ResourcesPageMainHero"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            '--delay-ResourcesPageMainHero': p.delay,
            '--dur-ResourcesPageMainHero': p.dur,
          }}
        />
      ))}
    </div>

    <div className="smoke-front-ResourcesPageMainHero" aria-hidden="true">
      <span className="smoke-blob-ResourcesPageMainHero smoke-4-ResourcesPageMainHero" />
      <span className="smoke-blob-ResourcesPageMainHero smoke-5-ResourcesPageMainHero" />
    </div>
  </>
)

/* --------------------------- Left content --------------------------- */

const HeroContent = memo(function HeroContent({ searchAction }) {
  return (
    <div className="content-ResourcesPageMainHero">
      <div className="reveal-ResourcesPageMainHero" style={{ '--d-ResourcesPageMainHero': '0.05s' }}>
        <BageZescloudAllComps badge="Resources" />
      </div>

      <h1 className="title-ResourcesPageMainHero">
        <span className="title-line-ResourcesPageMainHero">
          <span className="title-text-ResourcesPageMainHero" style={{ '--d-ResourcesPageMainHero': '0.2s' }}>
            Knowledge that
          </span>
        </span>
        <span className="title-line-ResourcesPageMainHero">
          <span className="title-text-ResourcesPageMainHero" style={{ '--d-ResourcesPageMainHero': '0.34s' }}>
            powers{' '}
            <span className="title-accent-wrap-ResourcesPageMainHero">
              {/* perf: static glow copy instead of filter: drop-shadow on shimmering text */}
              <span className="title-accent-glow-ResourcesPageMainHero" aria-hidden="true">
                better
              </span>
              <span className="title-accent-ResourcesPageMainHero">better</span>
            </span>
          </span>
        </span>
        <span className="title-line-ResourcesPageMainHero">
          <span className="title-text-ResourcesPageMainHero" style={{ '--d-ResourcesPageMainHero': '0.48s' }}>
            operations.
          </span>
        </span>
      </h1>

      <p className="lead-ResourcesPageMainHero reveal-ResourcesPageMainHero" style={{ '--d-ResourcesPageMainHero': '0.65s' }}>
        Expert guides, practical insights, and technical resources to help you monitor, automate, and optimize your
        infrastructure with ZesCloud.
      </p>

      <form
        className="search-ResourcesPageMainHero reveal-ResourcesPageMainHero"
        style={{ '--d-ResourcesPageMainHero': '0.82s' }}
        action={searchAction}
        method="get"
        role="search"
      >
        <label htmlFor="resources-search-ResourcesPageMainHero" className="sr-only-ResourcesPageMainHero">
          Search resources
        </label>
        <div className="search-shell-ResourcesPageMainHero">
          <span className="search-sweep-ResourcesPageMainHero" aria-hidden="true" />
          <div className="search-body-ResourcesPageMainHero">
            <span className="search-icon-ResourcesPageMainHero">
              <IconSearch />
            </span>
            <input
              id="resources-search-ResourcesPageMainHero"
              className="search-input-ResourcesPageMainHero"
              type="search"
              name="q"
              placeholder="Search resources..."
              autoComplete="off"
            />
            <button type="submit" className="search-btn-ResourcesPageMainHero" aria-label="Search">
              <span className="search-btn-icon-ResourcesPageMainHero">
                <IconArrow />
              </span>
            </button>
          </div>
        </div>
      </form>

      <div className="popular-ResourcesPageMainHero reveal-ResourcesPageMainHero" style={{ '--d-ResourcesPageMainHero': '1s' }}>
        <span className="popular-label-ResourcesPageMainHero">Popular searches:</span>
        <ul className="popular-list-ResourcesPageMainHero">
          {POPULAR_SEARCHES.map((term, i) => (
            <li key={term} className="chip-item-ResourcesPageMainHero" style={{ '--i-ResourcesPageMainHero': i }}>
              <a href={`${searchAction}?q=${encodeURIComponent(term)}`} className="chip-ResourcesPageMainHero">
                {term}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

/* ------------------------------ Hero ------------------------------ */

function ResourcesPageMainHero({ backgroundImage = HERO_BG_IMAGE, searchAction = '/resources/search' }) {
  const sectionRef = useRef(null)
  const wiresRef = useRef(null)
  const projRef = useRef(null)
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
    ;[wiresRef.current, projRef.current].forEach((svg) => {
      if (!svg || typeof svg.pauseAnimations !== 'function') return
      if (running) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
  }, [running])

  useEffect(() => {
    if (paused || !running) return undefined
    if (typeof window === 'undefined') return undefined
    const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    if (media && media.matches) return undefined
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % RESOURCES.length)
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
      className={`hero-ResourcesPageMainHero${running ? '' : ' is-paused-ResourcesPageMainHero'}`}
      style={{
        '--hero-bg-ResourcesPageMainHero': backgroundImage ? `url("${backgroundImage}")` : 'none',
      }}
    >
      {HERO_BG_LAYERS}

      <div className="container-ResourcesPageMainHero">
        <HeroContent searchAction={searchAction} />

        <div className="visual-ResourcesPageMainHero">
          <div className="visual-inner-ResourcesPageMainHero">
            {VISUAL_BACK_LAYERS}

            {/* ---------- book -> logo projection (stays fixed on the book) ---------- */}
            <div className="projection-ResourcesPageMainHero" aria-hidden="true">
              <span
                className="book-glow-ResourcesPageMainHero"
                style={{ left: `${BOOK.x - 70}px`, top: `${BOOK.y - 20}px` }}
              />
              <span
                className="projection-cone-ResourcesPageMainHero"
                style={{
                  left: `${HUB.x - BEAM_W / 2}px`,
                  top: `${HUB.y + 34}px`,
                  width: `${BEAM_W}px`,
                  height: `${BOOK.y - HUB.y - 34}px`,
                }}
              />

              <svg
                ref={projRef}
                className="projection-svg-ResourcesPageMainHero"
                viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
              >
                <defs>
                  <radialGradient id="projPacketGrad-ResourcesPageMainHero">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset="0.45" stopColor="#CFEAFF" />
                    <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {PROJECTION_LINES.map((d, i) => (
                  <g key={d} style={{ '--i-ResourcesPageMainHero': i }}>
                    <path d={d} className="proj-base-ResourcesPageMainHero" />
                    <path d={d} pathLength="100" className="proj-flow-ResourcesPageMainHero" />
                    <circle r="3" className="proj-packet-ResourcesPageMainHero">
                      <animateMotion
                        dur={`${1.9 + (i % 3) * 0.4}s`}
                        begin={`${(-i * 0.37).toFixed(2)}s`}
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  </g>
                ))}
              </svg>

              <div
                className="proj-sparks-ResourcesPageMainHero"
                style={{
                  left: `${BOOK.x - 30}px`,
                  top: `${HUB.y + 40}px`,
                  height: `${BOOK.y - HUB.y - 40}px`,
                  '--rise-ResourcesPageMainHero': `${BOOK.y - HUB.y - 40}px`,
                }}
              >
                {PROJ_SPARKS.map((s, i) => (
                  <span
                    key={i}
                    className="proj-spark-ResourcesPageMainHero"
                    style={{
                      left: s.left,
                      '--delay-ResourcesPageMainHero': s.delay,
                      '--dur-ResourcesPageMainHero': s.dur,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ---------- floating group: wires + logo + 3D cards ---------- */}
            <div className="constellation-ResourcesPageMainHero">
              {/* perf: blurred glow in its own static SVG so the blur isn't recomputed per frame */}
              <svg
                className="wires-ResourcesPageMainHero wires-glow-ResourcesPageMainHero"
                viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
                aria-hidden="true"
              >
                <defs>
                  <filter id="wireBlur-ResourcesPageMainHero" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                <g filter="url(#wireBlur-ResourcesPageMainHero)">
                  {WIRES.map((wire, i) => (
                    <g
                      key={wire.d}
                      className={`wire-ResourcesPageMainHero${active === i ? ' is-active-ResourcesPageMainHero' : ''}`}
                      style={{ '--i-ResourcesPageMainHero': i }}
                    >
                      <path d={wire.d} className="wire-glow-ResourcesPageMainHero" />
                    </g>
                  ))}
                </g>
              </svg>

              <svg
                ref={wiresRef}
                className="wires-ResourcesPageMainHero"
                viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="packetGrad-ResourcesPageMainHero">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset="0.4" stopColor="#E3F3FF" />
                    <stop offset="0.52" stopColor="#7CC4FF" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {WIRES.map((wire, i) => (
                  <g
                    key={wire.d}
                    className={`wire-ResourcesPageMainHero${active === i ? ' is-active-ResourcesPageMainHero' : ''}`}
                    style={{ '--i-ResourcesPageMainHero': i }}
                  >
                    <path d={wire.d} pathLength="100" className="wire-base-ResourcesPageMainHero" />
                    <path d={wire.d} pathLength="100" className="wire-flow-ResourcesPageMainHero" />
                    <circle r="5.5" className="wire-packet-ResourcesPageMainHero">
                      <animateMotion
                        dur={`${2 + (i % 3) * 0.35}s`}
                        begin={`${(-i * 0.43).toFixed(2)}s`}
                        repeatCount="indefinite"
                        path={wire.d}
                      />
                    </circle>
                    <circle cx={wire.sx} cy={wire.sy} r="3" className="wire-start-ResourcesPageMainHero" />
                    <circle cx={wire.ex} cy={wire.ey} r="3.2" className="wire-port-ResourcesPageMainHero" />
                  </g>
                ))}
              </svg>

              {HUB_BLOCK}

              <nav className="stack-ResourcesPageMainHero" aria-label="Resource categories">
                <ul className="stack-list-ResourcesPageMainHero">
                  {RESOURCES.map(({ label, href, Icon }, i) => (
                    <li
                      key={label}
                      className={`card-ResourcesPageMainHero${active === i ? ' is-active-ResourcesPageMainHero' : ''}`}
                      style={{
                        left: `${CARD_X}px`,
                        top: `${CARD_TOP + i * CARD_STEP}px`,
                        '--i-ResourcesPageMainHero': i,
                      }}
                    >
                      <a
                        href={href}
                        className="card-tilt-ResourcesPageMainHero"
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={handleLeave}
                        onFocus={() => handleEnter(i)}
                        onBlur={handleLeave}
                      >
                        <span className="card-depth-ResourcesPageMainHero" aria-hidden="true" />
                        <span className="card-shell-ResourcesPageMainHero">
                          <span className="card-sweep-ResourcesPageMainHero" aria-hidden="true" />
                          <span className="card-body-ResourcesPageMainHero">
                            <span className="card-icon-ResourcesPageMainHero">
                              <Icon />
                            </span>
                            <span className="card-label-ResourcesPageMainHero">{label}</span>
                            <span className="card-arrow-ResourcesPageMainHero">
                              <IconChevron />
                            </span>
                            <span className="card-shine-ResourcesPageMainHero" aria-hidden="true" />
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {WORDS_BLOCK}

            {VISUAL_FRONT_LAYERS}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourcesPageMainHero