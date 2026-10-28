'use client'

import React, { useEffect, useRef, useState } from 'react'
import './PricingOperationalExcellence.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconMonitor = () => (
  <svg {...svgProps}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle className="anim-pupil-PricingOperationalExcellence" cx="12" cy="12" r="3.2" />
    <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

const IconUnderstand = () => (
  <svg {...svgProps}>
    <path d="M9.5 4.5a2.8 2.8 0 0 0-2.8 2.4A3 3 0 0 0 4.5 10a3 3 0 0 0 .6 4.2 3 3 0 0 0 2.6 4.2 2.6 2.6 0 0 0 4.3 1.4V5.6a2.7 2.7 0 0 0-2.5-1.1z" />
    <path d="M14.5 4.5a2.8 2.8 0 0 1 2.8 2.4 3 3 0 0 1 2.2 3.1 3 3 0 0 1-.6 4.2 3 3 0 0 1-2.6 4.2 2.6 2.6 0 0 1-4.3 1.4V5.6a2.7 2.7 0 0 1 2.5-1.1z" />
    <path className="anim-spark-PricingOperationalExcellence" d="M8.2 9.5h1.6M14.2 9.5h1.6M8.2 14h1.6M14.2 14h1.6" />
  </svg>
)

const IconPredict = () => (
  <svg {...svgProps}>
    <path d="M3.5 3.5v17h17" />
    <path className="anim-trend-PricingOperationalExcellence" d="m6.5 15.5 3.6-4.2 3 2.6 5.4-6.4" pathLength="1" />
    <path d="M15 7.5h3.5V11" />
  </svg>
)

const IconRecommend = () => (
  <svg {...svgProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M8.5 12.5h7M8.5 16h4.5" />
    <path className="anim-tick-PricingOperationalExcellence" d="m14.5 16.3 1.3 1.3 2.4-2.6" pathLength="1" />
  </svg>
)

const IconAutomate = () => (
  <svg {...svgProps}>
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
    <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    <path className="anim-bolt-PricingOperationalExcellence" d="m12.8 8.8-2.6 3.6h3.6l-2.6 3.6" />
  </svg>
)

const IconEnforce = () => (
  <svg {...svgProps}>
    <path d="M12 2.8 19.5 6v5.4c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V6z" />
    <path className="anim-tick-PricingOperationalExcellence" d="m8.6 12.2 2.4 2.4 4.6-4.9" pathLength="1" />
  </svg>
)

const IconRecover = () => (
  <svg {...svgProps}>
    <g className="anim-spin-PricingOperationalExcellence">
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v4.5h4.5" />
    </g>
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </svg>
)

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 6 6 6-6 6" />
  </svg>
)

const STEPS = [
  { title: 'Monitor', text: 'See everything happening.', Icon: IconMonitor, tone: 'blue' },
  { title: 'Understand', text: 'Use AI to turn signals into context.', Icon: IconUnderstand, tone: 'purple' },
  { title: 'Predict', text: 'Identify unusual behavior and risks.', Icon: IconPredict, tone: 'teal' },
  { title: 'Recommend', text: 'Know what action makes sense.', Icon: IconRecommend, tone: 'violet' },
  { title: 'Automate', text: 'Execute approved workflows.', Icon: IconAutomate, tone: 'green' },
  { title: 'Enforce', text: 'Apply policies and keep systems secure.', Icon: IconEnforce, tone: 'sky' },
  { title: 'Recover', text: 'Restore services and verify health.', Icon: IconRecover, tone: 'indigo' },
]

const CYCLE_MS = 2200

function PricingOperationalExcellence({
  eyebrow = 'The ZesCloud Approach',
  title = 'From monitoring',
  titleAccent = 'to operational excellence.',
}) {
  const sectionRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(-1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setReady(true)
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return undefined
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setActive(STEPS.length - 1)
      return undefined
    }
    const start = setTimeout(() => setActive((a) => (a < 0 ? 0 : a)), 1500)
    return () => clearTimeout(start)
  }, [visible])

  useEffect(() => {
    if (active < 0 || paused) return undefined
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined
    const t = setTimeout(() => setActive((a) => (a + 1) % STEPS.length), CYCLE_MS)
    return () => clearTimeout(t)
  }, [active, paused])

  return (
    <section
      ref={sectionRef}
      className={[
        'section-PricingOperationalExcellence',
        ready ? 'is-ready-PricingOperationalExcellence' : '',
        visible ? 'is-visible-PricingOperationalExcellence' : '',
      ].join(' ')}
      aria-labelledby="title-PricingOperationalExcellence"
    >
      <div className="container-PricingOperationalExcellence">
        <div className="panel-PricingOperationalExcellence">
          <div className="ambient-PricingOperationalExcellence" aria-hidden="true" />

          <div className="intro-PricingOperationalExcellence">
            <span className="eyebrow-PricingOperationalExcellence"><BageZescloudAllComps badge='The ZesCloud Approach'/></span>
            <h2 id="title-PricingOperationalExcellence" className="title-PricingOperationalExcellence">
              <span className="title-line-PricingOperationalExcellence">{title}</span>
              <span className="title-line-PricingOperationalExcellence title-accent-PricingOperationalExcellence">
                {titleAccent}
              </span>
            </h2>
            <div className="progress-PricingOperationalExcellence" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span
                  key={s.title}
                  className={`progress-dot-PricingOperationalExcellence ${
                    i <= active ? 'is-on-PricingOperationalExcellence' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <ol
            className="steps-PricingOperationalExcellence"
            onMouseLeave={() => setPaused(false)}
          >
            {STEPS.map(({ title: stepTitle, text, Icon, tone }, i) => {
              const state =
                i === active
                  ? 'is-active-PricingOperationalExcellence'
                  : i < active
                    ? 'is-done-PricingOperationalExcellence'
                    : ''
              return (
                <li
                  key={stepTitle}
                  className={`step-PricingOperationalExcellence tone-${tone}-PricingOperationalExcellence ${state}`}
                  style={{ '--i-PricingOperationalExcellence': i }}
                  onMouseEnter={() => {
                    setPaused(true)
                    setActive(i)
                  }}
                  onFocus={() => {
                    setPaused(true)
                    setActive(i)
                  }}
                  tabIndex={0}
                >
                  <div className="node-wrap-PricingOperationalExcellence">
                    <span className="node-PricingOperationalExcellence">
                      <svg className="ring-PricingOperationalExcellence" viewBox="0 0 64 64" aria-hidden="true">
                        <circle className="ring-track-PricingOperationalExcellence" cx="32" cy="32" r="30" />
                        <circle className="ring-fill-PricingOperationalExcellence" cx="32" cy="32" r="30" pathLength="1" />
                      </svg>
                      <span className="icon-PricingOperationalExcellence">
                        <Icon />
                      </span>
                    </span>
                  </div>

                  {i < STEPS.length - 1 ? (
                    <span
                      className={`link-PricingOperationalExcellence ${
                        i < active ? 'is-lit-PricingOperationalExcellence' : ''
                      } ${i === active ? 'is-flow-PricingOperationalExcellence' : ''}`}
                      aria-hidden="true"
                    >
                      <span className="link-line-PricingOperationalExcellence" />
                      <span className="link-arrow-PricingOperationalExcellence">
                        <IconArrow />
                      </span>
                    </span>
                  ) : null}

                  <div className="copy-PricingOperationalExcellence">
                    <span className="step-num-PricingOperationalExcellence">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="step-title-PricingOperationalExcellence">{stepTitle}</h3>
                    <p className="step-text-PricingOperationalExcellence">{text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default PricingOperationalExcellence