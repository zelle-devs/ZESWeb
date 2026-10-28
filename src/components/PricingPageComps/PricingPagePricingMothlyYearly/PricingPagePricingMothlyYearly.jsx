'use client'

import React, { useEffect, useRef, useState } from 'react'
import './PricingPagePricingMothlyYearly.css'

/* ------------------------------------------------------------------
   👉 PRICING SETTINGS
   ANNUAL_DISCOUNT = 0.2 → 20% off when "Billed Annually" is selected.
   Monthly prices are set per plan below (monthly: 29, 79, 199 ...).
------------------------------------------------------------------- */
const ANNUAL_DISCOUNT = 0.2

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

const IconCube = () => (
  <svg {...svgProps}>
    <path d="M12 2.8 20 7.2v9.6l-8 4.4-8-4.4V7.2z" />
    <path d="M4 7.2 12 11.6l8-4.4M12 11.6v9.6" />
    <path d="m8 5 8 4.4" />
  </svg>
)

const IconBars = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3.5" y="14" width="3.6" height="6.5" rx="1" fill="currentColor" />
    <rect x="8.6" y="10.5" width="3.6" height="10" rx="1" fill="currentColor" />
    <rect x="13.7" y="7" width="3.6" height="13.5" rx="1" fill="currentColor" />
    <rect x="18.8" y="3.5" width="3.6" height="17" rx="1" fill="currentColor" opacity="0.55" />
  </svg>
)

const IconLayers = () => (
  <svg {...svgProps}>
    <path d="M12 3 21 7.6 12 12.2 3 7.6z" />
    <path d="m3 12 9 4.6 9-4.6" />
    <path d="m3 16.4 9 4.6 9-4.6" />
  </svg>
)

const IconBuilding = () => (
  <svg {...svgProps}>
    <path d="M4 21V9.5l5-2.5V21" />
    <path d="M9 21V4.5L15 2.5V21" />
    <path d="M15 21V8l5 2.5V21" />
    <path d="M2.5 21h19" />
    <path d="M11.3 7.5h1.4M11.3 11h1.4M11.3 14.5h1.4M6.2 12h1M6.2 15.5h1M17.3 13h1M17.3 16.5h1" />
  </svg>
)

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4.5 12.5 4.8 4.8L19.5 7" />
  </svg>
)

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ---------------------------- Data ----------------------------- */
const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small infrastructure',
    Icon: IconCube,
    tone: 'blue',
    monthly: 29,
    servers: 'Up to 5 servers',
    serversTone: 'accent',
    desc: 'A simple starting point for teams that need essential infrastructure visibility.',
    listTitle: 'Includes',
    features: [
      'Up to 5 Servers',
      'Infrastructure Monitoring',
      'Real-time Alerts',
      'Basic AI Insights',
      '7 Days Data Retention',
      'Email Notifications',
      'Community Support',
    ],
    cta: 'Start Free Trial',
    href: '#start-trial-starter',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing teams',
    Icon: IconBars,
    tone: 'teal',
    monthly: 79,
    servers: 'Up to 25 servers',
    serversTone: 'white',
    desc: 'Advanced monitoring and AI-powered insights for teams managing a growing infrastructure environment.',
    listTitle: 'Everything in Starter, plus:',
    features: [
      'Up to 25 Servers',
      'AI Anomaly Detection',
      'Root Cause Analysis',
      'Incident Management',
      'Basic Automation',
      '30 Days Data Retention',
      'Priority Email Support',
    ],
    cta: 'Start Free Trial',
    href: '#start-trial-growth',
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For businesses at scale',
    Icon: IconLayers,
    tone: 'purple',
    monthly: 199,
    servers: 'Up to 100 servers',
    serversTone: 'accent',
    desc: 'Intelligent infrastructure operations with automation, deeper AI capabilities, and operational reporting.',
    listTitle: 'Everything in Growth, plus:',
    features: [
      'Up to 100 Servers',
      'Advanced AI Operations',
      'Automation & Runbooks',
      'Custom Dashboards',
      'Integrations & Webhooks',
      'Extended Data Retention',
      'Team Notifications',
      'Priority Support',
    ],
    cta: 'Start Free Trial',
    href: '#start-trial-business',
    featured: true,
    badge: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large environments',
    Icon: IconBuilding,
    tone: 'sky',
    monthly: null, // custom pricing
    servers: 'Unlimited servers',
    serversTone: 'accent',
    desc: 'Tailored infrastructure operations for organizations with complex environments, advanced requirements, and dedicated operational needs.',
    listTitle: 'Everything in Business, plus:',
    features: [
      'Unlimited Servers',
      'Advanced Automation',
      'SLA & Uptime Options',
      'Custom Integrations',
      'Extended Data Retention',
      'Dedicated Account Management',
      'Premium Support',
      'Onboarding & Training',
    ],
    cta: 'Contact Sales',
    href: '#contact-sales',
  },
]

const getPrice = (monthly, billing) =>
  monthly == null ? null : billing === 'annual' ? Math.round(monthly * (1 - ANNUAL_DISCOUNT)) : monthly

/* ------------------- Animated number (count up/down) ------------------- */
function AnimatedNumber({ value, duration = 650 }) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)

  useEffect(() => {
    const from = fromRef.current
    if (from === value) return undefined

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      fromRef.current = value
      setDisplay(value)
      return undefined
    }

    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(from + (value - from) * eased)
      setDisplay(current)
      fromRef.current = current
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <>{display}</>
}

/* -------------------------- Component -------------------------- */
function PricingPagePricingMothlyYearly({
  defaultBilling = 'monthly',
  note = 'Annual savings are shown as an example and should be finalized based on your actual pricing.',
}) {
  const [billing, setBilling] = useState(defaultBilling)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  /* reveal the section when it scrolls into view */
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
      // threshold 0 + rootMargin → works for tall sections on short screens too
      { threshold: 0, rootMargin: '0px 0px -12% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const isAnnual = billing === 'annual'

  return (
    <section
      ref={sectionRef}
      className={[
        'section-PricingPagePricingMothlyYearly',
        ready ? 'is-ready-PricingPagePricingMothlyYearly' : '',
        visible ? 'is-visible-PricingPagePricingMothlyYearly' : '',
      ].join(' ')}
      aria-label="Pricing plans"
    >
      <div className="glow-PricingPagePricingMothlyYearly" aria-hidden="true" />

      <div className="container-PricingPagePricingMothlyYearly">
        {/* ---------------- Billing toggle ---------------- */}
        <div className="topbar-PricingPagePricingMothlyYearly">
          <div
            className={`toggle-PricingPagePricingMothlyYearly ${
              isAnnual ? 'is-annual-PricingPagePricingMothlyYearly' : ''
            }`}
            role="group"
            aria-label="Billing period"
          >
            <span className="toggle-thumb-PricingPagePricingMothlyYearly" aria-hidden="true" />

            <button
              type="button"
              className={`toggle-btn-PricingPagePricingMothlyYearly ${
                !isAnnual ? 'is-active-PricingPagePricingMothlyYearly' : ''
              }`}
              aria-pressed={!isAnnual}
              onClick={() => setBilling('monthly')}
            >
              Billed Monthly
            </button>

            <button
              type="button"
              className={`toggle-btn-PricingPagePricingMothlyYearly ${
                isAnnual ? 'is-active-PricingPagePricingMothlyYearly' : ''
              }`}
              aria-pressed={isAnnual}
              onClick={() => setBilling('annual')}
            >
              Billed Annually
              <span className="save-PricingPagePricingMothlyYearly">
                Save {Math.round(ANNUAL_DISCOUNT * 100)}%
              </span>
            </button>
          </div>

          {note ? <p className="note-PricingPagePricingMothlyYearly">{note}</p> : null}
        </div>

        {/* ---------------- Plans ---------------- */}
        <div className="grid-PricingPagePricingMothlyYearly">
          {PLANS.map((plan, i) => {
            const price = getPrice(plan.monthly, billing)
            const { Icon } = plan

            return (
              <article
                key={plan.id}
                className={`card-PricingPagePricingMothlyYearly ${
                  plan.featured ? 'is-featured-PricingPagePricingMothlyYearly' : ''
                }`}
                style={{ '--i-PricingPagePricingMothlyYearly': i }}
              >
                {plan.badge ? (
                  <span className="badge-PricingPagePricingMothlyYearly">{plan.badge}</span>
                ) : null}

                {/* Head */}
                <header className="head-PricingPagePricingMothlyYearly">
                  <span
                    className={`icon-PricingPagePricingMothlyYearly icon-${plan.tone}-PricingPagePricingMothlyYearly`}
                  >
                    <Icon />
                  </span>
                  <span className="head-text-PricingPagePricingMothlyYearly">
                    <h3 className="name-PricingPagePricingMothlyYearly">{plan.name}</h3>
                    <span className="tagline-PricingPagePricingMothlyYearly">{plan.tagline}</span>
                  </span>
                </header>

                {/* Price */}
                <div className="price-row-PricingPagePricingMothlyYearly" aria-live="polite">
                  {price == null ? (
                    <span className="price-PricingPagePricingMothlyYearly price-custom-PricingPagePricingMothlyYearly">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="price-PricingPagePricingMothlyYearly">
                        $<AnimatedNumber value={price} />
                      </span>
                      <span className="period-PricingPagePricingMothlyYearly">/ month</span>
                      <span
                        className={`old-price-PricingPagePricingMothlyYearly ${
                          isAnnual ? 'is-shown-PricingPagePricingMothlyYearly' : ''
                        }`}
                        aria-hidden={!isAnnual}
                      >
                        ${plan.monthly}
                      </span>
                    </>
                  )}
                </div>

                <p
                  className={`servers-PricingPagePricingMothlyYearly servers-${plan.serversTone}-PricingPagePricingMothlyYearly`}
                >
                  {plan.servers}
                </p>

                {/* <p className="desc-PricingPagePricingMothlyYearly">{plan.desc}</p> */}

                <span className="divider-PricingPagePricingMothlyYearly" aria-hidden="true" />

                {/* Features */}
                <p className="list-title-PricingPagePricingMothlyYearly">{plan.listTitle}</p>
                <ul className="list-PricingPagePricingMothlyYearly">
                  {plan.features.map((f, j) => (
                    <li
                      key={f}
                      className="item-PricingPagePricingMothlyYearly"
                      style={{ '--j-PricingPagePricingMothlyYearly': j }}
                    >
                      <span className="check-PricingPagePricingMothlyYearly">
                        <IconCheck />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.href}
                  className={`cta-PricingPagePricingMothlyYearly ${
                    plan.featured ? 'cta-primary-PricingPagePricingMothlyYearly' : ''
                  }`}
                >
                  <span>{plan.cta}</span>
                  <span className="cta-arrow-PricingPagePricingMothlyYearly">
                    <IconArrow />
                  </span>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingPagePricingMothlyYearly