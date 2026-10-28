'use client'

import React, { useEffect, useRef, useState } from 'react'
import './PricingPageTable.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const CHECK = 'check'
const DASH = 'dash'

const PLANS = ['Starter', 'Growth', 'Business', 'Enterprise']

const ROWS = [
  { capability: 'Infrastructure Monitoring', values: [CHECK, CHECK, CHECK, CHECK] },
  { capability: 'AI Anomaly Detection', values: ['Basic', CHECK, CHECK, CHECK] },
  { capability: 'Root Cause Analysis', values: ['Basic', CHECK, CHECK, CHECK] },
  { capability: 'Automation & Runbooks', values: [DASH, 'Basic', CHECK, CHECK] },
  { capability: 'Data Retention', values: ['7 Days', '30 Days', 'Extended', 'Custom'] },
  { capability: 'Support', values: ['Community', 'Email Priority', 'Priority', 'Premium'] },
  { capability: 'Onboarding', values: ['Self-Service', DASH, CHECK, CHECK] },
]

const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path className="check-path-PricingPageTable" d="m4.5 12.5 4.8 4.8L19.5 7" pathLength="1" />
  </svg>
)

const IconArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

function Cell({ value, plan }) {
  if (value === CHECK) {
    return (
      <span className="check-PricingPageTable" role="img" aria-label={`Included in ${plan}`}>
        <IconCheck />
      </span>
    )
  }
  if (value === DASH) {
    return (
      <span className="dash-PricingPageTable" role="img" aria-label={`Not included in ${plan}`}>
        —
      </span>
    )
  }
  return <span className="value-PricingPageTable">{value}</span>
}

function PricingPageTable({
  eyebrow = 'Compare Plans',
  title = 'Find the right plan',
  titleAccent = 'for your needs.',
  ctaLabel = 'View Full Feature Comparison',
  ctaHref = '#full-feature-comparison',
}) {
  const sectionRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeCol, setActiveCol] = useState(null)

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

  const colClass = (index) =>
    activeCol === index ? 'is-col-active-PricingPageTable' : ''

  return (
    <section
      ref={sectionRef}
      className={[
        'section-PricingPageTable',
        ready ? 'is-ready-PricingPageTable' : '',
        visible ? 'is-visible-PricingPageTable' : '',
      ].join(' ')}
      aria-labelledby="title-PricingPageTable"
    >
      <div className="glow-PricingPageTable" aria-hidden="true" />

      <div className="container-PricingPageTable">
        <div className="head-PricingPageTable">
          <div className="head-text-PricingPageTable">
            <span className="eyebrow-PricingPageTable"><BageZescloudAllComps badge='Compare Plans'/></span>
            <h2 id="title-PricingPageTable" className="title-PricingPageTable">
              {title} <span className="title-accent-PricingPageTable">{titleAccent}</span>
            </h2>
          </div>

          <a href={ctaHref} className="cta-PricingPageTable">
            <span>{ctaLabel}</span>
            <span className="cta-arrow-PricingPageTable">
              <IconArrow />
            </span>
          </a>
        </div>

        <div className="frame-PricingPageTable">
          <div className="scroll-PricingPageTable">
            <table className="table-PricingPageTable" onMouseLeave={() => setActiveCol(null)}>
              <caption className="sr-only-PricingPageTable">Plan comparison by capability</caption>
              <colgroup>
                <col className="col-first-PricingPageTable" />
                {PLANS.map((plan) => (
                  <col key={plan} />
                ))}
              </colgroup>

              <thead>
                <tr className="row-head-PricingPageTable">
                  <th scope="col" className="th-PricingPageTable th-first-PricingPageTable">
                    Capability
                  </th>
                  {PLANS.map((plan, c) => (
                    <th
                      key={plan}
                      scope="col"
                      className={`th-PricingPageTable ${colClass(c)}`}
                      onMouseEnter={() => setActiveCol(c)}
                    >
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, r) => (
                  <tr
                    key={row.capability}
                    className="row-PricingPageTable"
                    style={{ '--r-PricingPageTable': r }}
                  >
                    <th scope="row" className="td-PricingPageTable td-first-PricingPageTable">
                      {row.capability}
                    </th>
                    {row.values.map((value, c) => (
                      <td
                        key={PLANS[c]}
                        className={`td-PricingPageTable ${colClass(c)}`}
                        style={{ '--c-PricingPageTable': c }}
                        onMouseEnter={() => setActiveCol(c)}
                      >
                        <Cell value={value} plan={PLANS[c]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingPageTable