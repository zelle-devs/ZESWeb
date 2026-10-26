'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import './InfrastructureSolutions.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* Background image: place it at /public/images/infrastructure-bg.png */
const BG_IMAGE = '/infrastructuresolutions3.png'

/* Text shown on the chip face (below the logo that is baked into the image) */
const CHIP_NAME = 'Zaura'

/* Design canvas = the background image's native size */
const BASE_W = 1672
const BASE_H = 941

/* Every class name in this component ends with -InfrastructureSolutions */
const SUFFIX = '-InfrastructureSolutions'
const cx = (...names) => names.filter(Boolean).map((n) => `${n}${SUFFIX}`).join(' ')

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/* ---------- Icons ---------- */
const svgProps = {
  width: '100%',
  height: '100%',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const Icons = {
  detect: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </svg>
  ),
  analyze: (
    <svg {...svgProps}>
      <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1z" />
      <path d="M12 8v8M8.5 10l7 4M15.5 10l-7 4" />
    </svg>
  ),
  predict: (
    <svg {...svgProps}>
      <path d="M3.5 20.5h17" />
      <path d="M5 16l4-4.5 3.5 3L19 6.5" />
      <path d="M15 6.5h4v4" />
    </svg>
  ),
  recommend: (
    <svg {...svgProps}>
      <path d="M12 2.8l7 2.6v6c0 4.4-3 8-7 9.4-4-1.4-7-5-7-9.4v-6z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.6" />
    </svg>
  ),
  explain: (
    <svg {...svgProps}>
      <path d="M20.5 12a8 8 0 0 1-11.7 7.1L3.5 20.5l1.4-4.8A8 8 0 1 1 20.5 12z" />
      <path d="M8.5 10.5h7M8.5 14h4.5" />
    </svg>
  ),
  assistant: (
    <svg {...svgProps}>
      <rect x="4" y="7" width="16" height="12" rx="3.5" />
      <path d="M12 3.5V7M9 12v1.6M15 12v1.6M9.5 16.2h5" />
      <circle cx="12" cy="3" r="1" fill="currentColor" />
    </svg>
  ),
}

/* ---------- Data (all positions are in background-image pixels, 1672 x 941) ---------- */
const FLOAT_CARDS = [
  { key: 'detect', title: 'Detect', sub: 'Anomalies', tone: 'blue', x: 182, y: 228, delay: 0 },
  { key: 'analyze', title: 'Analyze', sub: 'Root Cause', tone: 'purple', x: 772, y: 322, delay: 0.7 },
  { key: 'predict', title: 'Predict', sub: 'Potential Issues', tone: 'blue', x: 150, y: 520, delay: 1.4 },
  { key: 'recommend', title: 'Recommend', sub: 'Actions', tone: 'green', x: 778, y: 540, delay: 2.1 },
  { key: 'explain', title: 'Explain', sub: 'In Natural Language', tone: 'cyan', x: 470, y: 682, delay: 2.8 },
]

const FEATURES = [
  { icon: 'detect', tone: 'green', title: 'Anomaly Detection', desc: 'Identify behavior that differs from established patterns.' },
  { icon: 'analyze', tone: 'blue', title: 'Root Cause Analysis', desc: 'Connect related signals to help distinguish symptoms from causes.' },
  { icon: 'predict', tone: 'teal', title: 'Predictive Insights', desc: 'Identify emerging trends that could become operational issues.' },
  { icon: 'recommend', tone: 'purple', title: 'Intelligent Recommendations', desc: 'Get context-aware recommendations instead of another list of alerts.' },
  { icon: 'assistant', tone: 'cyan', title: 'Natural Language AI Assistant', desc: 'Ask questions about your infrastructure using natural language.' },
]

/* Blinking lights on the chip: [x, y, green?] */
const LEDS = [
  /* right edge */
  [633, 375], [633, 440], [633, 500, 1], [633, 545],
  /* left inner border */
  [364, 395], [364, 440, 1], [364, 510], [364, 580],
  /* top edge */
  [480, 328], [530, 322, 1], [580, 312], [430, 318],
  /* bottom edge / pins */
  [440, 643], [495, 640, 1], [550, 635], [515, 608],
  /* side ports */
  [298, 372], [315, 447, 1], [318, 520], [318, 582],
  /* fins */
  [345, 300], [430, 283], [520, 270, 1], [590, 262],
]

const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  left: 60 + ((i * 197) % 860),
  top: 120 + ((i * 131) % 700),
  size: 3 + (i % 3),
  dur: 5 + (i % 6),
  delay: (i * 0.45) % 6,
}))

function InfrastructureSolutions() {
  const rootRef = useRef(null)
  const visualRef = useRef(null)

  /* Keep the 1672x941 canvas exactly "cover"-fitted to the section at any size / zoom */
  useIsoLayoutEffect(() => {
    const el = visualRef.current
    if (!el) return undefined
    const apply = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      const s = Math.max(w / BASE_W, h / BASE_H)
      el.style.setProperty('--s', s.toFixed(5))
      el.classList.add(cx('ready'))
    }
    apply()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null
    if (ro) ro.observe(el)
    window.addEventListener('resize', apply)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', apply)
    }
  }, [])

  /* Reveal on scroll */
  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(cx('is-visible'))
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className={cx('section')} ref={rootRef} aria-labelledby="infrastructure-solutions-title">
      <div className={cx('inner')}>
        {/* ================= VISUAL (background image + overlays) ================= */}
        <div className={cx('visual')} ref={visualRef}>
          <div className={cx('canvas')}>
            <img className={cx('bg')} src={BG_IMAGE} alt="" draggable="false" />

            {/* glows */}
            <div className={cx('aura')} />
            <div className={cx('pedestal')} />
            <div className={cx('hexglow')} />

            {/* faint rings + orbiting dots */}
            {/* <svg
              className={cx('rings')}
              width={BASE_W}
              height={BASE_H}
              viewBox={`0 0 ${BASE_W} ${BASE_H}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ifsRingGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#56B4FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#1848D9" stopOpacity="0.15" />
                </linearGradient>
                <filter id="ifsDotGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <ellipse className={cx('ring', 'ring-1')} cx="450" cy="500" rx="470" ry="300" />
              <ellipse className={cx('ring', 'ring-2')} cx="450" cy="500" rx="590" ry="380" />
              <ellipse className={cx('ring', 'ring-3')} cx="450" cy="500" rx="700" ry="450" />
              <circle r="6" className={cx('orbit-dot')} filter="url(#ifsDotGlow)">
                <animateMotion
                  dur="16s"
                  repeatCount="indefinite"
                  path="M 920 500 A 470 300 0 1 1 -20 500 A 470 300 0 1 1 920 500"
                />
              </circle>
              <circle r="5" className={cx('orbit-dot', 'orbit-dot-b')} filter="url(#ifsDotGlow)">
                <animateMotion
                  dur="26s"
                  repeatCount="indefinite"
                  path="M -140 500 A 590 380 0 1 1 1040 500 A 590 380 0 1 1 -140 500"
                />
              </circle>
            </svg> */}

            {/* particles */}
            <div className={cx('particles')} aria-hidden="true">
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className={cx('particle')}
                  style={{
                    left: `${p.left}px`,
                    top: `${p.top}px`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDuration: `${p.dur}s`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* blinking chip lights */}
            {/* <div className={cx('leds')} aria-hidden="true">
              {LEDS.map(([x, y, green], i) => (
                <i
                  key={i}
                  className={cx('led', green ? 'led-green' : '')}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    animationDelay: `${((i * 0.37) % 2.4).toFixed(2)}s`,
                    animationDuration: `${1.4 + (i % 4) * 0.5}s`,
                  }}
                />
              ))}
            </div> */}

            {/* chip face – same perspective + skew as the chip in the image */}
            <div className={cx('face')}>
              <div className={cx('face-tilt')}>
                <div className={cx('face-scan')} />
                <div className={cx('face-text')}>
                  <span className={cx('name')}>
                    {CHIP_NAME}
                    <sup className={cx('tm')}>TM</sup>
                  </span>
                </div>
              </div>
            </div>

            {/* 3D tilted floating cards */}
            {FLOAT_CARDS.map((c) => (
              <div
                key={c.key}
                className={cx('card', `tone-${c.tone}`)}
                style={{ left: `${c.x}px`, top: `${c.y}px`, '--d': `${c.delay}s` }}
              >
                <div className={cx('card-tilt')}>
                  <span className={cx('card-icon')}>{Icons[c.key]}</span>
                  <span className={cx('card-text')}>
                    <b>{c.title}</b>
                    <small>{c.sub}</small>
                  </span>
                  <span className={cx('card-dot')} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className={cx('content')}>
          <p className={cx('eyebrow', 'reveal')} style={{ '--i': 0 }}>
            <BageZescloudAllComps badge=' AI-POWERED OPERATIONS'/>
          </p>
          <h2 id="infrastructure-solutions-title" className={cx('title', 'reveal')} style={{ '--i': 1 }}>
            <span>Let Zes AI investigate</span>
            <span className={cx('title-accent')}>infrastructure for you.</span>
          </h2>
          <p className={cx('desc', 'reveal')} style={{ '--i': 2 }}>
            ZesCloud analyzes infrastructure signals, detects unusual behavior, helps identify potential
            causes, and provides recommendations your team can act on.
          </p>

          <ul className={cx('list')}>
            {FEATURES.map((f, i) => (
              <li key={f.title} className={cx('item', `tone-${f.tone}`, 'reveal')} style={{ '--i': 3 + i }}>
                <span className={cx('item-icon')}>{Icons[f.icon]}</span>
                <span className={cx('item-text')}>
                  <b>{f.title}</b>
                  <small>{f.desc}</small>
                </span>
              </li>
            ))}
          </ul>

          <div className={cx('reveal')} style={{ '--i': 8 }}>
            <a href="#" className={`zescloud-btn zescloud-btn-primary ${cx('btn')}`}>
              Learn More
              <svg
                viewBox="0 0 24 24"
                width="1.1em"
                height="1.1em"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfrastructureSolutions