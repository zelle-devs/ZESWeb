'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './DeeperZescloudResources.css'
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

const IconDocs = () => (
  <svg {...svgProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity="0.22" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
)

const IconEdit = () => (
  <svg {...svgProps}>
    <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    <path d="M17.5 3.5a2.1 2.1 0 0 1 3 3L13 14l-4 1 1-4z" fill="currentColor" fillOpacity="0.22" />
  </svg>
)

const IconCode = () => (
  <svg {...svgProps}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>
)

const IconChart = () => (
  <svg {...svgProps}>
    <rect x="4" y="13" width="3.6" height="7" rx="1" fill="currentColor" fillOpacity="0.22" />
    <rect x="10.2" y="8.5" width="3.6" height="11.5" rx="1" fill="currentColor" fillOpacity="0.22" />
    <rect x="16.4" y="4" width="3.6" height="16" rx="1" fill="currentColor" fillOpacity="0.22" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const RESOURCES = [
  {
    title: 'ZesCloud Documentation',
    text: 'Comprehensive technical documentation and product references.',
    tag: 'Documentation',
    tagTone: 'blue',
    tone: 'blue',
    href: '/resources/documentation',
    Icon: IconDocs,
  },
  {
    title: 'Infrastructure Monitoring Best Practices',
    text: 'Practical guidance for building reliable infrastructure monitoring.',
    tag: 'Guide',
    tagTone: 'green',
    tone: 'purple',
    href: '/resources/guides/monitoring-best-practices',
    Icon: IconEdit,
  },
  {
    title: 'ZesCloud API Reference',
    text: 'Technical documentation for integrating with ZesCloud programmatically.',
    tag: 'API Reference',
    tagTone: 'blue',
    tone: 'blue',
    href: '/resources/api-reference',
    Icon: IconCode,
  },
  {
    title: 'Incident Management with ZesCloud',
    text: 'Learn how to streamline incident response and improve operational resolution.',
    tag: 'Guide',
    tagTone: 'green',
    tone: 'purple',
    href: '/resources/guides/incident-management',
    Icon: IconChart,
  },
]

const LibraryCard = memo(function LibraryCard({ item, index }) {
  const { title, text, tag, tagTone, tone, href, Icon } = item

  return (
    <li
      className={`card-item-DeeperZescloudResources tone-${tone}-DeeperZescloudResources`}
      style={{ '--i-DeeperZescloudResources': index }}
    >
      <a href={href} className="card-DeeperZescloudResources">
        <span className="card-shine-DeeperZescloudResources" aria-hidden="true" />

        <span className="icon-DeeperZescloudResources">
          <span className="icon-pulse-DeeperZescloudResources" aria-hidden="true" />
          <span className="icon-svg-DeeperZescloudResources">
            <Icon />
          </span>
        </span>

        <span className="body-DeeperZescloudResources">
          <span className="card-title-DeeperZescloudResources">{title}</span>
          <span className="card-text-DeeperZescloudResources">{text}</span>

          <span className="foot-DeeperZescloudResources">
            <span className={`tag-DeeperZescloudResources tag-${tagTone}-DeeperZescloudResources`}>{tag}</span>
            <span className="card-arrow-DeeperZescloudResources" aria-hidden="true">
              <span className="card-arrow-track-DeeperZescloudResources">
                <IconArrow />
                <IconArrow />
              </span>
            </span>
          </span>
        </span>
      </a>
    </li>
  )
})

function DeeperZescloudResources({ viewAllHref = '/resources/all' }) {
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
      className={`section-DeeperZescloudResources${visible ? ' is-visible-DeeperZescloudResources' : ''}${
        inView ? '' : ' is-paused-DeeperZescloudResources'
      }`}
      aria-labelledby="deeper-title-DeeperZescloudResources"
    >
      <div className="bg-glow-DeeperZescloudResources" aria-hidden="true" />
      <div className="bg-orbs-DeeperZescloudResources" aria-hidden="true">
        <span className="bg-orb-DeeperZescloudResources" />
        <span className="bg-orb-DeeperZescloudResources" />
        <span className="bg-orb-DeeperZescloudResources" />
        <span className="bg-orb-DeeperZescloudResources" />
        <span className="bg-orb-DeeperZescloudResources" />
        <span className="bg-orb-DeeperZescloudResources" />
      </div>

      <div className="container-DeeperZescloudResources">
        <header className="head-DeeperZescloudResources">
          <div className="head-left-DeeperZescloudResources">
            <div className="reveal-DeeperZescloudResources" style={{ '--d-DeeperZescloudResources': '0s' }}>
              <BageZescloudAllComps badge="Resource Library" />
            </div>
            <h2
              id="deeper-title-DeeperZescloudResources"
              className="title-DeeperZescloudResources reveal-DeeperZescloudResources"
              style={{ '--d-DeeperZescloudResources': '0.1s' }}
            >
              Dive deeper into <span className="title-accent-DeeperZescloudResources">ZesCloud resources.</span>
            </h2>
          </div>

          <a
            href={viewAllHref}
            className="view-all-DeeperZescloudResources reveal-DeeperZescloudResources"
            style={{ '--d-DeeperZescloudResources': '0.2s' }}
          >
            <span>View All Resources</span>
            <span className="view-all-arrow-DeeperZescloudResources">
              <IconArrow />
            </span>
          </a>
        </header>

        <ul className="grid-DeeperZescloudResources">
          {RESOURCES.map((item, i) => (
            <LibraryCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default DeeperZescloudResources