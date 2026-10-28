'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './AiOperationsBannerAfterCards.css'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconBolt = () => (
  <svg {...svgProps}>
    <path
      className="icon-bolt-AiOperationsBannerAfterCards"
      d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6z"
      fill="currentColor"
      fillOpacity="0.25"
    />
  </svg>
)

const IconGear = () => (
  <svg {...svgProps}>
    <g className="icon-gear-AiOperationsBannerAfterCards">
      <path
        d="M12 2.8l1.6 2.1 2.6-.5.7 2.5 2.5.8-.5 2.6 2.1 1.7-2.1 1.6.5 2.6-2.5.8-.7 2.5-2.6-.5L12 21.2l-1.6-2.1-2.6.5-.7-2.5-2.5-.8.5-2.6L3 12l2.1-1.7-.5-2.6 2.5-.8.7-2.5 2.6.5z"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <circle cx="12" cy="12" r="3.2" />
    </g>
  </svg>
)

const IconRoots = () => (
  <svg {...svgProps}>
    <path
      className="icon-root-trunk-AiOperationsBannerAfterCards"
      d="M12 3c-1.6 3-1 5.5-2.5 8.5S6 15 4 16M12 3c1.6 3 1 5.5 2.5 8.5S18 15 20 16"
      pathLength="100"
    />
    <path
      className="icon-root-branch-AiOperationsBannerAfterCards"
      d="M12 3v9.5M12 12.5c-1 2.5-3 3.5-5 4.5M12 12.5c1 2.5 3 3.5 5 4.5M7 17c-1 1.4-2.2 2.2-3.5 2.6M17 17c1 1.4 2.2 2.2 3.5 2.6M12 12.5v8"
      pathLength="100"
    />
  </svg>
)

const FEATURES = [
  {
    title: 'Faster Issue Detection',
    text: 'Identify unusual behavior earlier.',
    Icon: IconBolt,
    tone: 'green',
  },
  {
    title: 'Less Manual Work',
    text: 'Spend less time investigating repetitive issues.',
    Icon: IconGear,
    tone: 'blue',
  },
  {
    title: 'Smarter Root Cause Analysis',
    text: 'Move beyond symptoms toward potential causes.',
    Icon: IconRoots,
    tone: 'purple',
  },
]

const FeatureCard = memo(function FeatureCard({ item, index }) {
  const { title, text, Icon, tone } = item

  return (
    <li
      className={`card-item-AiOperationsBannerAfterCards tone-${tone}-AiOperationsBannerAfterCards`}
      style={{ '--i-AiOperationsBannerAfterCards': index }}
    >
      <div className="card-AiOperationsBannerAfterCards">
        <span className="card-line-AiOperationsBannerAfterCards" aria-hidden="true" />

        <span className="icon-AiOperationsBannerAfterCards">
          <span className="icon-ring-AiOperationsBannerAfterCards" aria-hidden="true" />
          <span className="icon-svg-AiOperationsBannerAfterCards">
            <Icon />
          </span>
        </span>

        <div className="text-AiOperationsBannerAfterCards">
          <h3 className="card-title-AiOperationsBannerAfterCards">{title}</h3>
          <p className="card-text-AiOperationsBannerAfterCards">{text}</p>
        </div>
      </div>
    </li>
  )
})

function AiOperationsBannerAfterCards() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`section-AiOperationsBannerAfterCards${visible ? ' is-visible-AiOperationsBannerAfterCards' : ''}${
        inView ? '' : ' is-paused-AiOperationsBannerAfterCards'
      }`}
      aria-label="AI Operations benefits"
    >
      <div className="bg-glow-AiOperationsBannerAfterCards" aria-hidden="true" />

      <div className="container-AiOperationsBannerAfterCards">
        <ul className="grid-AiOperationsBannerAfterCards">
          {FEATURES.map((item, i) => (
            <FeatureCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AiOperationsBannerAfterCards