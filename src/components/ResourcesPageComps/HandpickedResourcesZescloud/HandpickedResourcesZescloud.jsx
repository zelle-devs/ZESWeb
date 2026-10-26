'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './HandpickedResourcesZescloud.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconGuide = () => (
  <svg {...svgProps}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
  </svg>
)

const IconBlog = () => (
  <svg {...svgProps}>
    <path d="M12 3c3.5 0 6 2.4 6 5.6 0 1.6-.7 2.9-1.7 3.9-.8.8-1.3 1.8-1.3 2.9V17H9v-1.6c0-1.1-.5-2.1-1.3-2.9C6.7 11.5 6 10.2 6 8.6 6 5.4 8.5 3 12 3z" />
    <path d="M9.5 20.5h5" />
  </svg>
)

const IconVideo = () => (
  <svg {...svgProps}>
    <rect x="3" y="6" width="13" height="12" rx="2.5" />
    <path d="M16 10.5l5-3v9l-5-3" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconPlay = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
)

const TYPES = {
  guide: { label: 'Guide', Icon: IconGuide, cta: 'Read Guide' },
  blog: { label: 'Blog', Icon: IconBlog, cta: 'Read Blog' },
  video: { label: 'Video', Icon: IconVideo, cta: 'Watch Video' },
}

const RESOURCES = [
  {
    type: 'guide',
    title: 'Getting Started with ZesCloud',
    text: 'A practical introduction to setting up your environment, connecting infrastructure, and beginning to monitor your systems.',
    href: '/resources/guides/getting-started',
    image: '/HandpickedResources4.png',
  },
  {
    type: 'blog',
    title: 'How AI Detects Issues Before They Impact Users',
    text: "Explore how ZesCloud's AI Operations engine turns infrastructure signals into useful operational insights.",
    href: '/resources/blog/ai-detects-issues',
    image: '/HandpickedResources2.png',
  },
  {
    type: 'guide',
    title: 'Infrastructure Monitoring Best Practices',
    text: 'Learn how to build an effective monitoring strategy across servers, applications, services, and databases.',
    href: '/resources/guides/monitoring-best-practices',
    image: '/HandpickedResources3.png',
  },
  {
    type: 'video',
    title: 'ZesCloud Platform Walkthrough',
    text: 'See how ZesCloud brings infrastructure visibility, AI insights, incidents, and automation together.',
    href: '/resources/videos/platform-walkthrough',
    image: '/HandpickedResources5.png',
  },
]

const ResourceCard = memo(function ResourceCard({ item, index }) {
  const { type, title, text, href, image } = item
  const { label, Icon, cta } = TYPES[type]
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <li
      className={`card-item-HandpickedResourcesZescloud type-${type}-HandpickedResourcesZescloud`}
      style={{ '--i-HandpickedResourcesZescloud': index }}
    >
      <a href={href} className="card-HandpickedResourcesZescloud">
        <span className={`media-HandpickedResourcesZescloud${loaded ? ' is-loaded-HandpickedResourcesZescloud' : ''}`}>
          <span className="media-skeleton-HandpickedResourcesZescloud" aria-hidden="true" />
          <img
            ref={imgRef}
            className="media-img-HandpickedResourcesZescloud"
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
          <span className="media-shade-HandpickedResourcesZescloud" aria-hidden="true" />
          <span className="media-scan-HandpickedResourcesZescloud" aria-hidden="true" />

          <span className="tag-HandpickedResourcesZescloud">
            <span className="tag-icon-HandpickedResourcesZescloud">
              <Icon />
            </span>
            {label}
          </span>

          {type === 'video' && (
            <span className="play-HandpickedResourcesZescloud" aria-hidden="true">
              <span className="play-ring-HandpickedResourcesZescloud" />
              <IconPlay />
            </span>
          )}
        </span>

        <span className="body-HandpickedResourcesZescloud">
          <span className="card-title-HandpickedResourcesZescloud">{title}</span>
          <span className="card-text-HandpickedResourcesZescloud">{text}</span>
          <span className="card-link-HandpickedResourcesZescloud">
            <span>{cta}</span>
            <span className="card-arrow-HandpickedResourcesZescloud">
              <IconArrow />
            </span>
          </span>
        </span>
      </a>
    </li>
  )
})

function HandpickedResourcesZescloud({ viewAllHref = '/resources/all' }) {
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
      className={`section-HandpickedResourcesZescloud${visible ? ' is-visible-HandpickedResourcesZescloud' : ''}${
        inView ? '' : ' is-paused-HandpickedResourcesZescloud'
      }`}
      aria-labelledby="handpicked-title-HandpickedResourcesZescloud"
    >
      <div className="bg-glow-HandpickedResourcesZescloud" aria-hidden="true" />
      <div className="bg-dots-HandpickedResourcesZescloud" aria-hidden="true" />

      <div className="container-HandpickedResourcesZescloud">
        <header className="head-HandpickedResourcesZescloud">
          <div className="head-left-HandpickedResourcesZescloud">
            <div className="reveal-HandpickedResourcesZescloud" style={{ '--d-HandpickedResourcesZescloud': '0s' }}>
              <BageZescloudAllComps badge="Featured Resources" />
            </div>
            <h2
              id="handpicked-title-HandpickedResourcesZescloud"
              className="title-HandpickedResourcesZescloud reveal-HandpickedResourcesZescloud"
              style={{ '--d-HandpickedResourcesZescloud': '0.1s' }}
            >
              Handpicked to help you{' '}
              <span className="title-accent-HandpickedResourcesZescloud">get more from ZesCloud.</span>
            </h2>
          </div>

          <a
            href={viewAllHref}
            className="view-all-HandpickedResourcesZescloud reveal-HandpickedResourcesZescloud"
            style={{ '--d-HandpickedResourcesZescloud': '0.2s' }}
          >
            <span>View All Resources</span>
            <span className="view-all-arrow-HandpickedResourcesZescloud">
              <IconArrow />
            </span>
          </a>
        </header>

        <ul className="grid-HandpickedResourcesZescloud">
          {RESOURCES.map((item, i) => (
            <ResourceCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HandpickedResourcesZescloud