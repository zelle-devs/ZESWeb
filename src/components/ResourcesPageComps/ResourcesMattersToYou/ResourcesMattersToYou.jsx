'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './ResourcesMattersToYou.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconRocket = () => (
  <svg {...svgProps}>
    <path
      d="M14.5 4.5c2.6-1.4 5-1.5 5-1.5s-.1 2.4-1.5 5l-5.8 5.8-3.9-3.9z"
      fill="currentColor"
      fillOpacity="0.22"
    />
    <path d="M8.3 9.9L5 9.4 3 11.5l4 1.3M14.1 15.7l.5 3.3-2.1 2-1.3-4" />
    <circle cx="15.5" cy="8.5" r="1.3" />
    <path d="M6.5 17.5c-1 1-1.5 3-1.5 3s2-.5 3-1.5" />
  </svg>
)

const IconMonitor = () => (
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="12.5" rx="2" fill="currentColor" fillOpacity="0.22" />
    <path d="M8.5 20.5h7M12 16.5v4" />
  </svg>
)

const IconBrain = () => (
  <svg {...svgProps}>
    <path
      d="M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 4.5 3 3 0 0 0 6 .5V6a2.5 2.5 0 0 0-3-1.5zM15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 4.5 3 3 0 0 1-6 .5"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <path d="M12 6a2.5 2.5 0 0 1 3-1.5M8.5 10.5h1.5M14 13.5h1.5" />
  </svg>
)

const IconGear = () => (
  <svg {...svgProps}>
    <path
      d="M12 2.8l1.6 2.1 2.6-.5.7 2.5 2.5.8-.5 2.6 2.1 1.7-2.1 1.6.5 2.6-2.5.8-.7 2.5-2.6-.5L12 21.2l-1.6-2.1-2.6.5-.7-2.5-2.5-.8.5-2.6L3 12l2.1-1.7-.5-2.6 2.5-.8.7-2.5 2.6.5z"
      fill="currentColor"
      fillOpacity="0.18"
    />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)

const IconLayers = () => (
  <svg {...svgProps}>
    <path d="M12 3l9 4.8-9 4.8-9-4.8z" fill="currentColor" fillOpacity="0.22" />
    <path d="M3 12l9 4.8 9-4.8M3 16.2L12 21l9-4.8" />
  </svg>
)

const IconShield = () => (
  <svg {...svgProps}>
    <path d="M12 3l7.5 3v5.6c0 4.5-3.1 8.3-7.5 9.4-4.4-1.1-7.5-4.9-7.5-9.4V6z" fill="currentColor" fillOpacity="0.2" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const TOPICS = [
  {
    title: 'Getting Started',
    text: 'Everything you need to start using ZesCloud.',
    href: '/resources/topics/getting-started',
    Icon: IconRocket,
    tone: 'blue',
  },
  {
    title: 'Monitoring & Observability',
    text: 'Understand infrastructure health, metrics, services, and operational signals.',
    href: '/resources/topics/monitoring-observability',
    Icon: IconMonitor,
    tone: 'cyan',
  },
  {
    title: 'AI Operations',
    text: 'Learn how Zes AI detects, investigates, and explains infrastructure issues.',
    href: '/resources/topics/ai-operations',
    Icon: IconBrain,
    tone: 'purple',
  },
  {
    title: 'Automation & Runbooks',
    text: 'Build reliable workflows for repetitive infrastructure operations.',
    href: '/resources/topics/automation-runbooks',
    Icon: IconGear,
    tone: 'green',
  },
  {
    title: 'Integrations',
    text: 'Connect ZesCloud with the tools already used by your team.',
    href: '/resources/topics/integrations',
    Icon: IconLayers,
    tone: 'blue',
  },
  {
    title: 'Security & Compliance',
    text: 'Understand infrastructure security, access controls, and operational safeguards.',
    href: '/resources/topics/security-compliance',
    Icon: IconShield,
    tone: 'violet',
  },
]

const TopicCard = memo(function TopicCard({ item, index }) {
  const { title, text, href, Icon, tone } = item

  return (
    <li
      className={`card-item-ResourcesMattersToYou tone-${tone}-ResourcesMattersToYou`}
      style={{ '--i-ResourcesMattersToYou': index }}
    >
      <a href={href} className="card-ResourcesMattersToYou" aria-label={title}>
        <span className="card-corner-ResourcesMattersToYou" aria-hidden="true" />

        <span className="icon-ResourcesMattersToYou">
          <span className="icon-pulse-ResourcesMattersToYou" aria-hidden="true" />
          <span className="icon-svg-ResourcesMattersToYou">
            <Icon />
          </span>
        </span>

        <span className="card-title-ResourcesMattersToYou">{title}</span>
        <span className="card-text-ResourcesMattersToYou">{text}</span>

        <span className="card-arrow-ResourcesMattersToYou">
          <span className="card-arrow-track-ResourcesMattersToYou">
            <IconArrow />
            <IconArrow />
          </span>
        </span>
      </a>
    </li>
  )
})

function ResourcesMattersToYou() {
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`section-ResourcesMattersToYou${visible ? ' is-visible-ResourcesMattersToYou' : ''}${
        inView ? '' : ' is-paused-ResourcesMattersToYou'
      }`}
      aria-labelledby="matters-title-ResourcesMattersToYou"
    >
      <div className="bg-glow-ResourcesMattersToYou" aria-hidden="true" />
      <div className="bg-beams-ResourcesMattersToYou" aria-hidden="true">
        <span className="bg-beam-ResourcesMattersToYou" />
        <span className="bg-beam-ResourcesMattersToYou" />
        <span className="bg-beam-ResourcesMattersToYou" />
      </div>

      <div className="container-ResourcesMattersToYou">
        <header className="head-ResourcesMattersToYou">
          <div className="head-left-ResourcesMattersToYou">
            <div className="reveal-ResourcesMattersToYou" style={{ '--d-ResourcesMattersToYou': '0s' }}>
              <BageZescloudAllComps badge="Popular Topics" />
            </div>
            <h2
              id="matters-title-ResourcesMattersToYou"
              className="title-ResourcesMattersToYou reveal-ResourcesMattersToYou"
              style={{ '--d-ResourcesMattersToYou': '0.1s' }}
            >
              Learn what <span className="title-accent-ResourcesMattersToYou">matters to you.</span>
            </h2>
          </div>

          <p
            className="lead-ResourcesMattersToYou reveal-ResourcesMattersToYou"
            style={{ '--d-ResourcesMattersToYou': '0.2s' }}
          >
            Explore topics to quickly find the information you need.
          </p>
        </header>

        <ul className="grid-ResourcesMattersToYou">
          {TOPICS.map((item, i) => (
            <TopicCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ResourcesMattersToYou