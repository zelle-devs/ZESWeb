'use client'

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import './AiOperationsDecisionAutomatically.css'
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

const IconObserve = () => (
  <svg {...svgProps}>
    <ellipse cx="12" cy="5.5" rx="7" ry="2.6" fill="currentColor" fillOpacity="0.2" />
    <path d="M5 5.5v4.3c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V5.5" />
    <path d="M5 9.8v4.4c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V9.8" />
    <path d="M5 14.2v4.3c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-4.3" />
  </svg>
)

const IconDetect = () => (
  <svg {...svgProps}>
    <circle cx="10.5" cy="10.5" r="6" fill="currentColor" fillOpacity="0.16" />
    <path d="M15 15l5.5 5.5" strokeWidth={2.1} />
  </svg>
)

const IconUnderstand = () => (
  <svg {...svgProps}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" strokeOpacity="0.55" />
    <path d="M6.5 16.5l4-7 3 4 4-6.5" />
    <circle cx="6.5" cy="16.5" r="1.3" fill="currentColor" />
    <circle cx="10.5" cy="9.5" r="1.3" fill="currentColor" />
    <circle cx="13.5" cy="13.5" r="1.3" fill="currentColor" />
    <circle cx="17.5" cy="7" r="1.3" fill="currentColor" />
  </svg>
)

const IconPredict = () => (
  <svg {...svgProps}>
    <path d="M3.5 20.5h17" strokeOpacity="0.55" />
    <path d="M4.5 16.5l4.5-4.5 3.5 3 6.5-7.5" />
    <path d="M15 7.5h4v4" />
  </svg>
)

const IconRecommend = () => (
  <svg {...svgProps}>
    <path
      d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.3v.4h5v-.4c0-.9.4-1.7 1.1-2.3A6 6 0 0 0 12 3.5z"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path d="M10 20.5h4" />
    <path d="M12 1.2v.6M4.4 4.4l.5.5M19.6 4.4l-.5.5M1.5 11h.7M21.8 11h.7" />
  </svg>
)

const IconAct = () => (
  <svg {...svgProps}>
    <path
      d="M12 2.8l1.6 2.1 2.6-.5.7 2.5 2.5.8-.5 2.6 2.1 1.7-2.1 1.6.5 2.6-2.5.8-.7 2.5-2.6-.5L12 21.2l-1.6-2.1-2.6.5-.7-2.5-2.5-.8.5-2.6L3 12l2.1-1.7-.5-2.6 2.5-.8.7-2.5 2.6.5z"
      fill="currentColor"
      fillOpacity="0.16"
    />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)

const STEPS = [
  {
    title: 'Observe',
    text: 'Collect metrics, logs, events, and traces from across your infrastructure.',
    Icon: IconObserve,
    tone: 'blue',
  },
  {
    title: 'Detect',
    text: 'AI models analyze patterns to identify anomalies and unusual behavior.',
    Icon: IconDetect,
    tone: 'indigo',
  },
  {
    title: 'Understand',
    text: 'Correlate signals across systems to help find the root cause.',
    Icon: IconUnderstand,
    tone: 'green',
  },
  {
    title: 'Predict',
    text: 'Forecast potential issues before they impact your services.',
    Icon: IconPredict,
    tone: 'purple',
  },
  {
    title: 'Recommend',
    text: 'Get intelligent, context-aware recommendations ranked by impact and confidence.',
    Icon: IconRecommend,
    tone: 'violet',
  },
  {
    title: 'Act & Learn',
    text: 'Execute approved actions and learn from the resulting outcomes.',
    Icon: IconAct,
    tone: 'teal',
  },
]

const STEP_INTERVAL = 2400

const Step = memo(function Step({ step, index, state, isLast, onEnter, onLeave }) {
  const { title, text, Icon, tone } = step
  const number = String(index + 1).padStart(2, '0')

  return (
    <li
      className={`step-AiOperationsDecisionAutomatically tone-${tone}-AiOperationsDecisionAutomatically is-${state}-AiOperationsDecisionAutomatically`}
      style={{ '--i-AiOperationsDecisionAutomatically': index }}
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
    >
      <div className="step-top-AiOperationsDecisionAutomatically">
        <span className="node-AiOperationsDecisionAutomatically">
          <span className="node-halo-AiOperationsDecisionAutomatically" aria-hidden="true" />
          <span className="node-ring-AiOperationsDecisionAutomatically" aria-hidden="true" />
          <span className="node-core-AiOperationsDecisionAutomatically">
            <span className="node-icon-AiOperationsDecisionAutomatically">
              <Icon />
            </span>
          </span>
        </span>

        {!isLast && (
          <span className="link-AiOperationsDecisionAutomatically" aria-hidden="true">
            <span className="link-track-AiOperationsDecisionAutomatically" />
            <span className="link-fill-AiOperationsDecisionAutomatically" />
            <span className="link-pulse-AiOperationsDecisionAutomatically" />
            <svg className="link-arrow-AiOperationsDecisionAutomatically" viewBox="0 0 24 24">
              <path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" />
            </svg>
          </span>
        )}
      </div>

      <h3 className="step-title-AiOperationsDecisionAutomatically">
        <span className="step-num-AiOperationsDecisionAutomatically">{number}.</span> {title}
      </h3>
      <p className="step-text-AiOperationsDecisionAutomatically">{text}</p>
    </li>
  )
})

function AiOperationsDecisionAutomatically() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(true)
  const [active, setActive] = useState(-1)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true)
      setActive(0)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return undefined
    const start = window.setTimeout(() => setActive((prev) => (prev < 0 ? 0 : prev)), 1500)
    return () => window.clearTimeout(start)
  }, [visible])

  useEffect(() => {
    if (!visible || !inView || hovered !== null || active < 0) return undefined
    const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    if (media && media.matches) return undefined
    const id = window.setTimeout(() => {
      setActive((prev) => (prev + 1) % STEPS.length)
    }, active === STEPS.length - 1 ? STEP_INTERVAL + 1200 : STEP_INTERVAL)
    return () => window.clearTimeout(id)
  }, [visible, inView, hovered, active])

  const handleEnter = useCallback((index) => {
    setHovered(index)
    setActive(index)
  }, [])

  const handleLeave = useCallback(() => setHovered(null), [])

  const stateOf = (index) => {
    if (active < 0) return 'idle'
    if (index === active) return 'active'
    if (index < active) return 'done'
    return 'idle'
  }

  return (
    <section
      ref={sectionRef}
      className={`section-AiOperationsDecisionAutomatically${visible ? ' is-visible-AiOperationsDecisionAutomatically' : ''}${
        inView ? '' : ' is-paused-AiOperationsDecisionAutomatically'
      }`}
      aria-labelledby="how-title-AiOperationsDecisionAutomatically"
    >
      <div className="bg-glow-AiOperationsDecisionAutomatically" aria-hidden="true" />
      <div className="bg-rain-AiOperationsDecisionAutomatically" aria-hidden="true" />

      <div className="container-AiOperationsDecisionAutomatically">
        <header className="head-AiOperationsDecisionAutomatically">
          <div className="reveal-AiOperationsDecisionAutomatically" style={{ '--d-AiOperationsDecisionAutomatically': '0s' }}>
            <BageZescloudAllComps badge="How It Works" />
          </div>

          <h2 id="how-title-AiOperationsDecisionAutomatically" className="title-AiOperationsDecisionAutomatically">
            <span className="title-line-AiOperationsDecisionAutomatically">
              <span className="title-text-AiOperationsDecisionAutomatically" style={{ '--d-AiOperationsDecisionAutomatically': '0.1s' }}>
                From Data to Decisions.
              </span>
            </span>{' '}
            <span className="title-line-AiOperationsDecisionAutomatically">
              <span
                className="title-text-AiOperationsDecisionAutomatically title-accent-AiOperationsDecisionAutomatically"
                style={{ '--d-AiOperationsDecisionAutomatically': '0.22s' }}
              >
                Automatically.
              </span>
            </span>
          </h2>

          <p className="lead-AiOperationsDecisionAutomatically reveal-AiOperationsDecisionAutomatically" style={{ '--d-AiOperationsDecisionAutomatically': '0.34s' }}>
            Our AI engine continuously analyzes infrastructure data to understand what&apos;s normal, detect what&apos;s
            abnormal, and recommend or automate the right actions.
          </p>
        </header>

        <ol className="steps-AiOperationsDecisionAutomatically">
          {STEPS.map((step, i) => (
            <Step
              key={step.title}
              step={step}
              index={i}
              state={stateOf(i)}
              isLast={i === STEPS.length - 1}
              onEnter={handleEnter}
              onLeave={handleLeave}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default AiOperationsDecisionAutomatically