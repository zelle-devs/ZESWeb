'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './AiOperationsPageMainSlider.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ------------------------------------------------------------------
   👉 ADD YOUR IMAGE LINKS HERE (files inside /public)
   SURFACE_BG_IMAGE → dark blue glowing network surface (image 1)
   ROBOT_IMAGE      → AI woman / robot PNG with TRANSPARENT background (image 2)
   (or pass them as props: <AiOperationsPageMainSlider surfaceImage="..." robotImage="..." />)
------------------------------------------------------------------- */
const SURFACE_BG_IMAGE = '/ZauraTMMainImageSurface.png'
const ROBOT_IMAGE = '/ZauraTMMainImageRightIMage.png'

/* ---------------------------- Icons ---------------------------- */
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconSync = () => (
  <svg {...svgProps}>
    <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8" />
    <path d="M4 3v5h5" />
    <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16" />
    <path d="M20 21v-5h-5" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </svg>
)

const IconTarget = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle className="target-core-AiOperationsPageMainSlider" cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
  </svg>
)

const IconSparkle = () => (
  <svg {...svgProps}>
    <path
      className="sparkle-main-AiOperationsPageMainSlider"
      d="M11 3.5l1.9 4.9 4.9 1.9-4.9 1.9L11 17.1l-1.9-4.9-4.9-1.9 4.9-1.9z"
    />
    <path
      className="sparkle-mini-AiOperationsPageMainSlider"
      d="M18.5 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"
    />
  </svg>
)

const IconHexCheck = () => (
  <svg {...svgProps}>
    <path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" />
    <path className="hex-check-AiOperationsPageMainSlider" d="M8.4 12.2l2.5 2.5 4.7-4.9" />
  </svg>
)

const IconCheck = () => (
  <svg {...svgProps} strokeWidth={2.6}>
    <path d="M5 12.5l4.2 4.2L19 7" />
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

/* ---------------------------- Data ----------------------------- */
const TITLE_LINES = [
  { words: ['Infrastructure'] },
  { words: ['Intelligence'] },
  { words: ['that', 'Works', 'for', 'You.'], accent: true },
]

// Glowing dots that sit on the bright nodes of the surface image (x%, y% of section)
const SURFACE_DOTS = [
  { x: 10.5, y: 81, s: 4, d: 0, t: 3.2, f: true },
  { x: 13, y: 80.4, s: 3, d: 1.1, t: 2.6 },
  { x: 21.1, y: 85, s: 4, d: 0.6, t: 3.6, f: true },
  { x: 31.1, y: 87.4, s: 3, d: 2.2, t: 2.9 },
  { x: 4.1, y: 91.4, s: 3, d: 1.5, t: 3.4 },
  { x: 15.7, y: 92.8, s: 3, d: 0.3, t: 2.7 },
  { x: 38, y: 84, s: 3, d: 1.4, t: 2.8 },
  { x: 45, y: 89, s: 2, d: 2.9, t: 3.3 },
  { x: 50.6, y: 80.8, s: 5, d: 0.9, t: 3.8, f: true },
  { x: 59.2, y: 93.5, s: 3, d: 1.9, t: 3.1 },
  { x: 67.4, y: 85, s: 4, d: 2.6, t: 3.3, f: true },
  { x: 70, y: 81.8, s: 4, d: 0.4, t: 2.8 },
  { x: 76.1, y: 72, s: 5, d: 1.3, t: 3.9, f: true },
  { x: 83, y: 78, s: 3, d: 0.8, t: 3 },
  { x: 90.1, y: 66.4, s: 5, d: 2.1, t: 3.5, f: true },
  { x: 89.3, y: 85.2, s: 4, d: 0.7, t: 3 },
  { x: 98.1, y: 85.9, s: 3, d: 1.7, t: 2.6 },
  { x: 77.1, y: 2.7, s: 3, d: 2.4, t: 3.7 },
  { x: 89.2, y: 10.4, s: 3, d: 0.2, t: 3.2 },
  { x: 67.3, y: 9.9, s: 2, d: 1.6, t: 2.7 },
  { x: 70.7, y: 57.9, s: 3, d: 1.2, t: 2.9 },
  { x: 21, y: 57.9, s: 2, d: 2.8, t: 3.4 },
  { x: 43.7, y: 59.5, s: 2, d: 0.5, t: 3.6 },
  { x: 51.5, y: 36.7, s: 2, d: 2, t: 3.1 },
]

// Deterministic star field (SSR safe – no Math.random)
const STARS = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 53 + 11) % 97}%`,
  top: `${(i * 29 + 7) % 62}%`,
  delay: `${((i * 0.53) % 5).toFixed(2)}s`,
  dur: `${(2.5 + (i % 5) * 0.7).toFixed(1)}s`,
  size: `${(1 + (i % 3) * 0.6).toFixed(1)}px`,
}))

// Blinking nodes inside the robot's hair (x%, y% of the robot image)
const HAIR_DOTS = [
  [77.2, 27.1, 5, 0, 2.8],
  [90.4, 40.9, 5, 1.2, 3.2],
  [79.6, 14.9, 4, 0.6, 2.6],
  [70.9, 10.4, 3, 1.8, 3.4],
  [88, 44.6, 4, 0.3, 3],
  [84.1, 62.7, 4, 2.1, 3.6],
  [90.4, 90.3, 5, 1.5, 3.1],
  [75.7, 6.9, 3, 2.5, 2.9],
  [73.3, 55.8, 3, 0.9, 3.3],
  [98.1, 38.3, 3, 1.4, 2.7],
  [82, 33, 3, 2.8, 3.5],
  [94, 58, 3, 0.5, 2.9],
  [86, 22, 3, 1.9, 3.2],
  [72, 72, 3, 2.3, 3.8],
]

// Data particles flowing along the hair
const FLOW_DOTS = [
  [80, 20, 0, 4.5],
  [84, 36, 1.4, 5],
  [78, 46, 2.6, 4.2],
  [88, 52, 0.8, 5.5],
  [82, 70, 3.2, 4.8],
  [76, 30, 2, 5.2],
]

const BARS = [38, 52, 44, 60, 48, 56, 42, 66, 50, 58, 46, 62, 54, 40, 58, 92, 84, 48, 56, 44, 62, 50, 58, 46]
const ANOMALY_BARS = [15, 16]

const ACTIONS = [
  { label: 'Contain', value: '82%' },
  { label: 'Remediate', value: '64%' },
  { label: 'Optimize', value: '46%' },
]

// Line chart paths (viewBox 0 0 200 60)
const LINE_PATH =
  'M0 46 C 14 44, 22 36, 34 38 S 52 48, 64 42 S 82 26, 96 30 S 116 40, 128 33 S 146 16, 160 20'
const AREA_PATH = `${LINE_PATH} L160 60 L0 60 Z`
const FORECAST_PATH = 'M160 20 S 182 10, 198 6'

// Connector lines from cards to the neural node (viewBox = robot image size)
const LINKS = [
  'M954 170 C 1060 160, 1190 200, 1290 255',
  'M994 433 C 1110 420, 1200 330, 1290 255',
  'M1048 598 C 1060 480, 1170 330, 1290 255',
  'M1462 512 C 1450 410, 1380 300, 1290 255',
]

/* --------------------------- Helpers --------------------------- */
function useCountUp(target, { duration = 2200, delay = 1600, decimals = 1 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return undefined
    }

    let raf = 0
    let start = 0
    const timer = setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 4)
        setValue(target * eased)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return value.toFixed(decimals)
}

function SignalCounter() {
  const value = useCountUp(1.2)
  return <span className="counter-AiOperationsPageMainSlider">{value}M+</span>
}

/* -------------------------- Component -------------------------- */
function AiOperationsPageMainSlider({
  surfaceImage = SURFACE_BG_IMAGE,
  robotImage = ROBOT_IMAGE,
  primaryHref = '/ai-operations',
  videoHref = '#ai-operations-video',
}) {
  let wordIndex = 0

  return (
    <section
      className="hero-AiOperationsPageMainSlider"
      style={{
        '--surface-bg-AiOperationsPageMainSlider': surfaceImage ? `url("${surfaceImage}")` : 'none',
      }}
    >
      {/* ======================= Background ======================= */}
      <div className="bg-AiOperationsPageMainSlider" aria-hidden="true">
        <div className="bg-image-AiOperationsPageMainSlider" />
        {SURFACE_DOTS.map((p, i) => (
          <span
            key={`dot-${i}`}
            className={`twinkle-AiOperationsPageMainSlider${p.f ? ' twinkle-flare-AiOperationsPageMainSlider' : ''}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              '--s-AiOperationsPageMainSlider': `${p.s}px`,
              '--delay-AiOperationsPageMainSlider': `${p.d}s`,
              '--dur-AiOperationsPageMainSlider': `${p.t}s`,
            }}
          />
        ))}
      </div>

      <div className="grid-lines-AiOperationsPageMainSlider" aria-hidden="true" />
      <div className="overlay-AiOperationsPageMainSlider" aria-hidden="true" />
      <div className="ambient-AiOperationsPageMainSlider" aria-hidden="true" />

      <div className="stars-AiOperationsPageMainSlider" aria-hidden="true">
        {STARS.map((s, i) => (
          <span
            key={`star-${i}`}
            className="star-AiOperationsPageMainSlider"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              '--delay-AiOperationsPageMainSlider': s.delay,
              '--dur-AiOperationsPageMainSlider': s.dur,
            }}
          />
        ))}
      </div>

      {/* ======================= Left content ======================= */}
      <div className="container-AiOperationsPageMainSlider">
        <div className="content-AiOperationsPageMainSlider">
          <span ><BageZescloudAllComps badge='AI Operations'/></span>

          <h1 className="title-AiOperationsPageMainSlider">
            {TITLE_LINES.map((line, li) => (
              <span
                key={`line-${li}`}
                className={`title-line-AiOperationsPageMainSlider${line.accent ? ' title-accent-line-AiOperationsPageMainSlider' : ''}`}
              >
                {line.words.map((word, wi) => {
                  const delay = 0.25 + wordIndex * 0.09
                  wordIndex += 1
                  return (
                    <React.Fragment key={`${word}-${wi}`}>
                      <span
                        className={`word-AiOperationsPageMainSlider${line.accent ? ' word-accent-AiOperationsPageMainSlider' : ''}`}
                        style={{ '--wd-AiOperationsPageMainSlider': `${delay.toFixed(2)}s` }}
                      >
                        {word}
                      </span>
                      {wi < line.words.length - 1 && ' '}
                    </React.Fragment>
                  )
                })}
              </span>
            ))}
          </h1>

          <p
            className="desc-AiOperationsPageMainSlider reveal-AiOperationsPageMainSlider"
            style={{ '--d-AiOperationsPageMainSlider': '0.85s' }}
          >
            ZesCloud&apos;s AI Operations engine observes, learns, and understands infrastructure
            behavior. It detects anomalies, uncovers potential root causes, identifies emerging
            risks, and recommends actions—so your team can respond faster and automate with
            confidence.
          </p>

          <div
            className="actions-AiOperationsPageMainSlider reveal-AiOperationsPageMainSlider"
            style={{ '--d-AiOperationsPageMainSlider': '1s' }}
          >
            <a
              href={primaryHref}
              className="zescloud-btn zescloud-btn-primary btn-primary-AiOperationsPageMainSlider"
            >
              <span>See AI in Action</span>
              <span className="btn-arrow-AiOperationsPageMainSlider">
                <IconArrow />
              </span>
            </a>

            <a
              href={videoHref}
              className="zescloud-btn zescloud-btn-outline btn-outline-AiOperationsPageMainSlider"
            >
              <span className="play-AiOperationsPageMainSlider">
                <IconPlay />
              </span>
              <span>Watch Video</span>
            </a>
          </div>
        </div>
      </div>

      {/* ======================= Right visual ======================= */}
      <div
        className="visual-AiOperationsPageMainSlider"
        role="img"
        aria-label="Zaura AI analyzing 1.2M+ signals in real time, identifying anomalies, predicting potential risks and recommending actions"
      >
        {/* Robot */}
        <div
          className="figure-AiOperationsPageMainSlider"
          aria-hidden="true"
        >
          <div className="figure-float-AiOperationsPageMainSlider">
            <span className="robot-glow-AiOperationsPageMainSlider" />

            <Image
              src={robotImage}
              alt=""
              fill
              priority
              quality={90}
              sizes="(max-width: 640px) 170vw, (max-width: 1024px) 150vw, 82vw"
              className="robot-img-AiOperationsPageMainSlider"
            />

            <span className="node-AiOperationsPageMainSlider">
              <span className="node-ring-AiOperationsPageMainSlider" />
              <span className="node-ring-AiOperationsPageMainSlider node-ring-delay-AiOperationsPageMainSlider" />
            </span>

            {HAIR_DOTS.map(([x, y, s, d, t], i) => (
              <span
                key={`hair-${i}`}
                className="hair-dot-AiOperationsPageMainSlider"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  '--s-AiOperationsPageMainSlider': `${s}px`,
                  '--delay-AiOperationsPageMainSlider': `${d + 1.4}s`,
                  '--dur-AiOperationsPageMainSlider': `${t}s`,
                }}
              />
            ))}

            {FLOW_DOTS.map(([x, y, d, t], i) => (
              <span
                key={`flow-${i}`}
                className="flow-dot-AiOperationsPageMainSlider"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  '--delay-AiOperationsPageMainSlider': `${d + 2}s`,
                  '--dur-AiOperationsPageMainSlider': `${t}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Connector lines */}
        <svg
          className="links-AiOperationsPageMainSlider"
          viewBox="0 0 1671 941"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {LINKS.map((d, i) => (
            <path
              key={`link-${i}`}
              id={`aiops-link-${i}-AiOperationsPageMainSlider`}
              className="link-path-AiOperationsPageMainSlider"
              d={d}
            />
          ))}
          {LINKS.map((_, i) => (
            <circle key={`pulse-${i}`} className="link-pulse-AiOperationsPageMainSlider" r="5">
              <animateMotion
                dur={`${3.2 + i * 0.5}s`}
                begin={`${2.4 + i * 0.6}s`}
                repeatCount="indefinite"
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#aiops-link-${i}-AiOperationsPageMainSlider`} />
              </animateMotion>
            </circle>
          ))}
        </svg>

        {/* Cards */}
        <div className="cards-AiOperationsPageMainSlider" aria-hidden="true">
          {/* 1 — Analyzing signals */}
          <div className="slot-AiOperationsPageMainSlider slot-signals-AiOperationsPageMainSlider">
            <div className="card-AiOperationsPageMainSlider">
              <div className="card-head-AiOperationsPageMainSlider">
                <span className="card-icon-AiOperationsPageMainSlider icon-spin-AiOperationsPageMainSlider">
                  <IconSync />
                </span>
                <div className="card-text-AiOperationsPageMainSlider">
                  <span className="card-title-AiOperationsPageMainSlider">Analyzing</span>
                  <span className="card-title-AiOperationsPageMainSlider">
                    <SignalCounter /> signals
                  </span>
                  <span className="card-sub-AiOperationsPageMainSlider">
                    in real time
                    <span className="live-dot-AiOperationsPageMainSlider" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2 — Identifying anomalies */}
          <div className="slot-AiOperationsPageMainSlider slot-anomalies-AiOperationsPageMainSlider">
            <div className="card-AiOperationsPageMainSlider">
              <div className="card-head-AiOperationsPageMainSlider">
                <span className="card-icon-AiOperationsPageMainSlider">
                  <IconTarget />
                </span>
                <div className="card-text-AiOperationsPageMainSlider">
                  <span className="card-title-AiOperationsPageMainSlider">Identifying</span>
                  <span className="card-sub-AiOperationsPageMainSlider">anomalies</span>
                </div>
              </div>

              <div className="bars-AiOperationsPageMainSlider">
                <span className="threshold-AiOperationsPageMainSlider" />
                {BARS.map((h, i) => (
                  <span
                    key={`bar-${i}`}
                    className={`bar-AiOperationsPageMainSlider${ANOMALY_BARS.includes(i) ? ' bar-anomaly-AiOperationsPageMainSlider' : ''}`}
                    style={{
                      '--h-AiOperationsPageMainSlider': `${h}%`,
                      '--i-AiOperationsPageMainSlider': i,
                      '--amp-AiOperationsPageMainSlider': (0.72 + ((i * 37) % 25) / 100).toFixed(2),
                      '--bp-AiOperationsPageMainSlider': `${(2.6 + (i % 4) * 0.45).toFixed(2)}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3 — Predicting potential risks */}
          <div className="slot-AiOperationsPageMainSlider slot-predict-AiOperationsPageMainSlider">
            <div className="card-AiOperationsPageMainSlider">
              <div className="card-head-AiOperationsPageMainSlider">
                <span className="card-icon-AiOperationsPageMainSlider">
                  <IconSparkle />
                </span>
                <div className="card-text-AiOperationsPageMainSlider">
                  <span className="card-title-AiOperationsPageMainSlider">Predicting</span>
                  <span className="card-sub-AiOperationsPageMainSlider">potential risks</span>
                </div>
              </div>

              <svg className="chart-AiOperationsPageMainSlider" viewBox="0 0 200 60" aria-hidden="true">
                <defs>
                  <linearGradient id="aiops-area-AiOperationsPageMainSlider" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <line className="chart-grid-AiOperationsPageMainSlider" x1="0" y1="15" x2="200" y2="15" />
                <line className="chart-grid-AiOperationsPageMainSlider" x1="0" y1="30" x2="200" y2="30" />
                <line className="chart-grid-AiOperationsPageMainSlider" x1="0" y1="45" x2="200" y2="45" />

                <path className="chart-area-AiOperationsPageMainSlider" d={AREA_PATH} />
                <path className="chart-line-AiOperationsPageMainSlider" d={LINE_PATH} pathLength="1" />
                <path className="chart-forecast-AiOperationsPageMainSlider" d={FORECAST_PATH} />

                <circle className="chart-risk-ring-AiOperationsPageMainSlider" cx="198" cy="6" r="2.6" />
                <circle className="chart-risk-AiOperationsPageMainSlider" cx="198" cy="6" r="2.4" />

                <circle className="chart-dot-AiOperationsPageMainSlider" r="2.6">
                  <animateMotion dur="4.2s" begin="2.8s" repeatCount="indefinite" path={LINE_PATH} />
                </circle>
              </svg>
            </div>
          </div>

          {/* 4 — Recommending actions */}
          <div className="slot-AiOperationsPageMainSlider slot-actions-AiOperationsPageMainSlider">
            <div className="card-AiOperationsPageMainSlider">
              <div className="card-head-AiOperationsPageMainSlider">
                <span className="card-icon-AiOperationsPageMainSlider">
                  <IconHexCheck />
                </span>
                <div className="card-text-AiOperationsPageMainSlider">
                  <span className="card-title-AiOperationsPageMainSlider">Recommending</span>
                  <span className="card-sub-AiOperationsPageMainSlider">actions</span>
                </div>
              </div>

              <div className="actions-list-AiOperationsPageMainSlider">
                {ACTIONS.map((a, i) => (
                  <div
                    key={a.label}
                    className="action-row-AiOperationsPageMainSlider"
                    style={{ '--i-AiOperationsPageMainSlider': i, '--v-AiOperationsPageMainSlider': a.value }}
                  >
                    <span className="action-check-AiOperationsPageMainSlider">
                      <IconCheck />
                    </span>
                    <span className="action-label-AiOperationsPageMainSlider">{a.label}</span>
                    <span className="track-AiOperationsPageMainSlider">
                      <span className="fill-AiOperationsPageMainSlider" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiOperationsPageMainSlider