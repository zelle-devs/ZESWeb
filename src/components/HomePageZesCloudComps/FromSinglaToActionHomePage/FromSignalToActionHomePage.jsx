'use client'

import React, { useEffect, useRef, useState } from 'react'
import './FromSignalToActionHomePage.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const icons = {
  connect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 12h6M12 9v6" />
      <circle cx="7.5" cy="7.5" r="1" />
      <circle cx="16.5" cy="16.5" r="1" />
    </svg>
  ),
  observe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M6 13l3-3 3 2 4-5 2 2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  analyze: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      <path d="M8 15l3-4 2 2 3-4" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
      <path d="M12 8v3" />
    </svg>
  ),
  act: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M13 6l-4 7h4l-2 5 5-8h-4z" />
    </svg>
  ),
  improve: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7 16l4-4 3 3 4-5" />
      <path d="M15 10h3v3" />
    </svg>
  ),
}

const steps = [
  { key: 'connect', num: '01', title: 'Connect', text: 'Bring your systems into ZesCloud.', tone: 'blueFromSignalToActionHomePage' },
  { key: 'observe', num: '02', title: 'Observe', text: 'Collect operational signals continuously.', tone: 'indigoFromSignalToActionHomePage' },
  { key: 'analyze', num: '03', title: 'Analyze', text: 'Zaura understands patterns and anomalies.', tone: 'tealFromSignalToActionHomePage' },
  { key: 'alert', num: '04', title: 'Alert', text: 'Critical events reach your team.', tone: 'purpleFromSignalToActionHomePage' },
  { key: 'act', num: '05', title: 'Act', text: 'Automations and teams respond.', tone: 'cyanFromSignalToActionHomePage' },
  { key: 'improve', num: '06', title: 'Improve', text: 'Every event becomes an opportunity to operate better.', tone: 'greenFromSignalToActionHomePage' },
]

function FromSignalToActionHomePage() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`sectionFromSignalToActionHomePage ${visible ? 'isVisibleFromSignalToActionHomePage' : ''}`}
    >
      <div className="bgGlowFromSignalToActionHomePage" aria-hidden="true" />
      <div className="bgGridFromSignalToActionHomePage" aria-hidden="true" />

      <div className="zescloud-container containerFromSignalToActionHomePage">
        <div className="headerFromSignalToActionHomePage">
          <div className="headingWrapFromSignalToActionHomePage">
            <span className="eyebrowFromSignalToActionHomePage"><BageZescloudAllComps badge="How it works"/></span>
            <h2 className="titleFromSignalToActionHomePage">
              From signal <span className="zescloud-text-gradient">to action.</span>
            </h2>
          </div>
          <p className="subtitleFromSignalToActionHomePage">
            A simple process. A more resilient business.
            <br />
            Powered by Zaura<sup>TM</sup>.
          </p>
        </div>

        <ol className="stepsFromSignalToActionHomePage">
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <li
                className={`stepFromSignalToActionHomePage ${step.tone}`}
                style={{ '--delayFromSignalToActionHomePage': `${0.25 + i * 0.15}s` }}
              >
                <div className="iconWrapFromSignalToActionHomePage">
                  <span className="ringFromSignalToActionHomePage" aria-hidden="true" />
                  <span className="ringFromSignalToActionHomePage ringDelayFromSignalToActionHomePage" aria-hidden="true" />
                  <div className="iconFromSignalToActionHomePage">{icons[step.key]}</div>
                </div>
                <span className="numFromSignalToActionHomePage">{step.num}</span>
                <h3 className="stepTitleFromSignalToActionHomePage">{step.title}</h3>
                <p className="stepTextFromSignalToActionHomePage">{step.text}</p>
              </li>

              {i < steps.length - 1 && (
                <li
                  className="arrowFromSignalToActionHomePage"
                  aria-hidden="true"
                  style={{ '--delayFromSignalToActionHomePage': `${0.35 + i * 0.15}s` }}
                >
                  <span className="arrowLineFromSignalToActionHomePage" />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12h15M14 7l5 5-5 5" />
                  </svg>
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default FromSignalToActionHomePage