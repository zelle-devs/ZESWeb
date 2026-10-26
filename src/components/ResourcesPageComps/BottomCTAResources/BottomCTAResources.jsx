'use client'

import React, { useEffect, useRef, useState } from 'react'
import './BottomCTAResources.css'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconHeadset = () => (
  <svg {...svgProps} strokeWidth={1.7}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.6" fill="currentColor" fillOpacity="0.25" />
    <rect x="17" y="13" width="4" height="6" rx="1.6" fill="currentColor" fillOpacity="0.25" />
    <path d="M19 19c0 1.7-1.6 2.5-4 2.5h-2" />
    <circle cx="12" cy="21.5" r="1" fill="currentColor" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconChat = () => (
  <svg {...svgProps}>
    <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth={2.6} />
  </svg>
)

function BottomCTAResources({ helpCenterHref = '/help-center', supportHref = '/contact-support' }) {
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
      className={`section-BottomCTAResources${visible ? ' is-visible-BottomCTAResources' : ''}${
        inView ? '' : ' is-paused-BottomCTAResources'
      }`}
      aria-labelledby="bottom-cta-title-BottomCTAResources"
    >
      <div className="container-BottomCTAResources">
        <div className="banner-BottomCTAResources">
          <span className="banner-glow-BottomCTAResources" aria-hidden="true" />
          <span className="banner-shine-BottomCTAResources" aria-hidden="true" />
          <span className="banner-line-BottomCTAResources" aria-hidden="true" />

          <div className="icon-BottomCTAResources reveal-BottomCTAResources" style={{ '--d-BottomCTAResources': '0.1s' }}>
            <span className="icon-wave-BottomCTAResources" aria-hidden="true" />
            <span className="icon-wave-BottomCTAResources icon-wave-delay-BottomCTAResources" aria-hidden="true" />
            <span className="icon-svg-BottomCTAResources">
              <IconHeadset />
            </span>
          </div>

          <div className="text-BottomCTAResources">
            <h2
              id="bottom-cta-title-BottomCTAResources"
              className="title-BottomCTAResources reveal-BottomCTAResources"
              style={{ '--d-BottomCTAResources': '0.2s' }}
            >
              Need more help?
            </h2>
            <p className="lead-BottomCTAResources reveal-BottomCTAResources" style={{ '--d-BottomCTAResources': '0.3s' }}>
              Our documentation and support resources are here to help you get more from ZesCloud.
            </p>
          </div>

          <div className="actions-BottomCTAResources reveal-BottomCTAResources" style={{ '--d-BottomCTAResources': '0.42s' }}>
            <a href={helpCenterHref} className="btn-BottomCTAResources btn-primary-BottomCTAResources">
              <span className="btn-shine-BottomCTAResources" aria-hidden="true" />
              <span>Visit Help Center</span>
              <span className="btn-arrow-BottomCTAResources">
                <IconArrow />
              </span>
            </a>

            <a href={supportHref} className="btn-BottomCTAResources btn-outline-BottomCTAResources">
              <span className="btn-chat-BottomCTAResources">
                <IconChat />
              </span>
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BottomCTAResources