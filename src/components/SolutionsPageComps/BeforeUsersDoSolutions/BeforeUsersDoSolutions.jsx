'use client'

import React, { useEffect, useRef, useState } from 'react'
import './BeforeUsersDoSolutions.css'
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

const IconMetrics = () => (
  <svg {...svgProps}>
    <path d="M3 12h4l2-6 4 12 2-6h6" />
  </svg>
)

const IconUptime = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

const IconProcess = () => (
  <svg {...svgProps}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
  </svg>
)

const IconBell = () => (
  <svg {...svgProps}>
    <path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15L6 16z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
)

const IconDashboard = () => (
  <svg {...svgProps}>
    <rect x="3" y="3" width="8" height="10" rx="1.5" />
    <rect x="13" y="3" width="8" height="6" rx="1.5" />
    <rect x="13" y="11" width="8" height="10" rx="1.5" />
    <rect x="3" y="15" width="8" height="6" rx="1.5" />
  </svg>
)

const IconServer = () => (
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
)

const IconLayers = () => (
  <svg {...svgProps}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </svg>
)

const IconBars = () => (
  <svg {...svgProps}>
    <path d="M5 20V11M11 20V5M17 20v-6M3 20h18" />
  </svg>
)

const IconReport = () => (
  <svg {...svgProps}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5M10 13h6M10 17h6" />
  </svg>
)

const IconSearch = () => (
  <svg {...svgProps}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
)

const IconChevron = () => (
  <svg {...svgProps}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const IconSun = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
)

const IconMoon = () => (
  <svg {...svgProps}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconWarning = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M12 3.5l9.5 16.5h-19L12 3.5z" />
    <path d="M12 10v4.5M12 17.5h.01" />
  </svg>
)

const IconLogoCloud = () => (
  <svg viewBox="0 0 32 22" aria-hidden="true">
    <defs>
      <linearGradient id="logoGrad-BeforeUsersDoSolutions" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7CC4FF" />
        <stop offset="1" stopColor="#1848D9" />
      </linearGradient>
    </defs>
    <path
      d="M8 21h16.5a6 6 0 0 0 .9-11.93A9 9 0 0 0 8.4 7.3 6.9 6.9 0 0 0 8 21z"
      fill="url(#logoGrad-BeforeUsersDoSolutions)"
    />
  </svg>
)

const FEATURES = [
  {
    title: 'Real-time Metrics & Health Checks',
    text: 'Monitor CPU, memory, storage, network, uptime, and system health.',
    Icon: IconMetrics,
  },
  {
    title: 'Uptime & Availability Monitoring',
    text: 'Know when systems become unavailable and how long they remain affected.',
    Icon: IconUptime,
  },
  {
    title: 'Process & Service Monitoring',
    text: 'Track critical processes and services running across your infrastructure.',
    Icon: IconProcess,
  },
  {
    title: 'Custom Alerts & Notifications',
    text: 'Define operational conditions that require attention and deliver alerts.',
    Icon: IconBell,
  },
  {
    title: 'Performance Dashboards',
    text: 'Turn infrastructure telemetry into useful operational views.',
    Icon: IconDashboard,
  },
]

const NAV = [
  { label: 'Overview', Icon: IconDashboard },
  { label: 'Servers', Icon: IconServer },
  { label: 'Services', Icon: IconLayers },
  { label: 'Processes', Icon: IconProcess },
  { label: 'Metrics', Icon: IconBars },
  { label: 'Alerts', Icon: IconBell },
  { label: 'Reports', Icon: IconReport },
]

const STATS = [
  { label: 'Total Servers', value: 48, delta: '1.2%', trend: 'up', tone: 'blue', spark: 'M0 16 C 8 14 12 9 20 10 S 32 4 40 6 S 52 2 60 3' },
  { label: 'Online', value: 46, delta: '1.4%', trend: 'up', tone: 'green', spark: 'M0 14 C 8 15 14 8 22 9 S 34 6 42 4 S 54 5 60 2' },
  { label: 'Offline', value: 1, delta: '0%', trend: 'down', tone: 'red', spark: 'M0 6 C 10 4 16 10 24 9 S 36 14 44 12 S 54 15 60 16' },
  { label: 'Degraded', value: 1, delta: '1%', trend: 'up', tone: 'amber', spark: 'M0 15 C 10 16 16 11 24 12 S 36 7 44 9 S 54 4 60 5' },
]

const INITIAL_SERIES = [42, 48, 45, 52, 58, 55, 62, 60, 66, 63, 70, 68, 64, 72, 69, 75, 71, 78, 74, 80, 76, 82, 79, 84]

const INITIAL_ROWS = [
  { name: 'web-01', status: 'Healthy', cpu: 12, mem: 34, uptime: '48d 2h', range: [8, 22] },
  { name: 'web-02', status: 'Healthy', cpu: 18, mem: 42, uptime: '13d 4h', range: [12, 28] },
  { name: 'db-01', status: 'Degraded', cpu: 76, mem: 82, uptime: '12d 4h', range: [72, 86] },
  { name: 'cache-01', status: 'Healthy', cpu: 22, mem: 48, uptime: '19d 3h', range: [16, 30] },
  { name: 'app-01', status: 'Healthy', cpu: 26, mem: 61, uptime: '7d 1h', range: [20, 34] },
]

const CHART_W = 400
const CHART_H = 150
const CHART_PAD = 10
const X_LABELS = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
const Y_LABELS = ['100', '75', '50', '25', '0']

const round = (n) => Math.round(n * 10) / 10
const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
const jitter = (amount) => Math.random() * amount * 2 - amount

const buildChart = (data) => {
  const pts = data.map((v, i) => [
    round((i * CHART_W) / (data.length - 1)),
    round(CHART_H - CHART_PAD - (v / 100) * (CHART_H - CHART_PAD * 2)),
  ])
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = round(p1[0] + (p2[0] - p0[0]) / 6)
    const c1y = round(p1[1] + (p2[1] - p0[1]) / 6)
    const c2x = round(p2[0] - (p3[0] - p1[0]) / 6)
    const c2y = round(p2[1] - (p3[1] - p1[1]) / 6)
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`
  }
  return {
    line: d,
    area: `${d} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`,
    last: pts[pts.length - 1],
  }
}

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true)
      return undefined
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function useTween(target, duration = 900) {
  const [display, setDisplay] = useState(target)
  const currentRef = useRef(target)
  useEffect(() => {
    const from = currentRef.current
    if (from === target) return undefined
    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const value = from + (target - from) * eased
      currentRef.current = value
      setDisplay(value)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return display
}

function Tween({ value, duration = 900, suffix = '' }) {
  const display = useTween(value, duration)
  return (
    <>
      {Math.round(display)}
      {suffix}
    </>
  )
}

function BeforeUsersDoSolutions({ learnMoreHref = '/solutions/server-monitoring' }) {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  const [series, setSeries] = useState(INITIAL_SERIES)
  const [cpu, setCpu] = useState(32)
  const [mem, setMem] = useState(58)
  const [rows, setRows] = useState(INITIAL_ROWS)
  const [activeFeature, setActiveFeature] = useState(0)
  const [featurePaused, setFeaturePaused] = useState(false)
  const [toastOn, setToastOn] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (!inView) return undefined
    const id = window.setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1]
        const next = Math.round(clamp(last + jitter(7), 56, 92))
        return [...prev.slice(1), next]
      })
      setCpu((c) => Math.round(clamp(c + jitter(4), 24, 44)))
      setMem((m) => Math.round(clamp(m + jitter(2), 52, 64)))
      setRows((prev) =>
        prev.map((r) => ({
          ...r,
          cpu: Math.round(clamp(r.cpu + jitter(3), r.range[0], r.range[1])),
          mem: Math.round(clamp(r.mem + jitter(2), r.mem - 3, r.mem + 3)),
        }))
      )
    }, 2400)
    return () => window.clearInterval(id)
  }, [inView])

  useEffect(() => {
    if (!inView || featurePaused) return undefined
    const id = window.setInterval(() => {
      setActiveFeature((p) => (p + 1) % FEATURES.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [inView, featurePaused])

  useEffect(() => {
    if (!inView) return undefined
    let hideId = 0
    const show = () => {
      setToastOn(true)
      hideId = window.setTimeout(() => setToastOn(false), 4500)
    }
    const firstId = window.setTimeout(show, 3600)
    const loopId = window.setInterval(show, 11000)
    return () => {
      window.clearTimeout(firstId)
      window.clearTimeout(hideId)
      window.clearInterval(loopId)
    }
  }, [inView])

  const isLight = theme === 'light'
  const chart = buildChart(series)
  const showToast = toastOn || activeFeature === 3
  const zone = (n) => `zone-BeforeUsersDoSolutions${activeFeature === n ? ' is-focus-BeforeUsersDoSolutions' : ''}`

  return (
    <section
      ref={sectionRef}
      className={`section-BeforeUsersDoSolutions${inView ? ' is-visible-BeforeUsersDoSolutions' : ''}`}
    >
      <div className="bg-BeforeUsersDoSolutions" aria-hidden="true">
        <span className="bg-grid-BeforeUsersDoSolutions" />
        <span className="bg-glow-BeforeUsersDoSolutions" />
        <span className="bg-line-BeforeUsersDoSolutions" />
      </div>

      <div className="container-BeforeUsersDoSolutions">
        <div className="content-BeforeUsersDoSolutions">
          <div className="eyebrow-BeforeUsersDoSolutions reveal-BeforeUsersDoSolutions" style={{ '--d-BeforeUsersDoSolutions': '0s' }}>
            <BageZescloudAllComps badge='Server Monitoring' />
          </div>

          <h2 className="title-BeforeUsersDoSolutions">
            <span className="title-line-BeforeUsersDoSolutions">
              <span className="title-text-BeforeUsersDoSolutions" style={{ '--d-BeforeUsersDoSolutions': '0.08s' }}>
                Know your servers
              </span>
            </span>
            <span className="title-line-BeforeUsersDoSolutions">
              <span
                className="title-text-BeforeUsersDoSolutions title-accent-BeforeUsersDoSolutions"
                style={{ '--d-BeforeUsersDoSolutions': '0.18s' }}
              >
                before your users do.
              </span>
            </span>
          </h2>

          <p className="lead-BeforeUsersDoSolutions reveal-BeforeUsersDoSolutions" style={{ '--d-BeforeUsersDoSolutions': '0.3s' }}>
            Monitor servers, services, and system resources in real time. Get instant visibility into
            performance, health, availability, and operational changes.
          </p>

          <ul
            className="features-BeforeUsersDoSolutions"
            onMouseLeave={() => setFeaturePaused(false)}
          >
            {FEATURES.map(({ title, text, Icon }, i) => (
              <li
                key={title}
                className={`feature-BeforeUsersDoSolutions reveal-BeforeUsersDoSolutions${activeFeature === i ? ' is-active-BeforeUsersDoSolutions' : ''}${activeFeature === i && featurePaused ? ' is-held-BeforeUsersDoSolutions' : ''}`}
                style={{ '--d-BeforeUsersDoSolutions': `${0.38 + i * 0.07}s` }}
                onMouseEnter={() => {
                  setActiveFeature(i)
                  setFeaturePaused(true)
                }}
              >
                <span
                  key={activeFeature === i ? `on-${i}` : `off-${i}`}
                  className="feature-progress-BeforeUsersDoSolutions"
                />
                <span className="feature-icon-BeforeUsersDoSolutions">
                  <Icon />
                </span>
                <span className="feature-text-BeforeUsersDoSolutions">
                  <span className="feature-title-BeforeUsersDoSolutions">{title}</span>
                  <span className="feature-desc-BeforeUsersDoSolutions">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="cta-BeforeUsersDoSolutions reveal-BeforeUsersDoSolutions" style={{ '--d-BeforeUsersDoSolutions': '0.8s' }}>
            <a href={learnMoreHref} className="zescloud-btn zescloud-btn-primary btn-BeforeUsersDoSolutions">
              <span>Learn More</span>
              <span className="btn-arrow-BeforeUsersDoSolutions">
                <IconArrow />
              </span>
            </a>
          </div>
        </div>

        <div className="visual-BeforeUsersDoSolutions">
          <div className={`stage-BeforeUsersDoSolutions${isLight ? ' theme-light-BeforeUsersDoSolutions' : ''}`}>
            <div className="frame-BeforeUsersDoSolutions">
              <div className="dash-BeforeUsersDoSolutions">
                <header className="topbar-BeforeUsersDoSolutions">
                  <div className="brand-BeforeUsersDoSolutions">
                    <span className="brand-logo-wrap-BeforeUsersDoSolutions">
                      <img
                        src="/main_logo.png"
                        alt="ZesCloud"
                        className="brand-img-BeforeUsersDoSolutions brand-img-dark-BeforeUsersDoSolutions"
                      />
                      <img
                        src="/main_logo_black_zescloud.png"
                        alt=""
                        aria-hidden="true"
                        className="brand-img-BeforeUsersDoSolutions brand-img-light-BeforeUsersDoSolutions"
                      />
                    </span>
                  </div>

                  <div className="search-BeforeUsersDoSolutions">
                    <span className="search-icon-BeforeUsersDoSolutions">
                      <IconSearch />
                    </span>
                    <span className="search-text-BeforeUsersDoSolutions">Search servers, services…</span>
                    <span className="search-kbd-BeforeUsersDoSolutions">⌘K</span>
                  </div>

                  <div className="top-actions-BeforeUsersDoSolutions">
                    <span className="range-BeforeUsersDoSolutions">
                      Last 24 hours
                      <IconChevron />
                    </span>
                    <button
                      type="button"
                      className="theme-toggle-BeforeUsersDoSolutions"
                      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                      aria-label={isLight ? 'Switch dashboard to dark theme' : 'Switch dashboard to light theme'}
                      aria-pressed={isLight}
                      title={isLight ? 'Dark theme' : 'Light theme'}
                    >
                      <span className="theme-icon-BeforeUsersDoSolutions theme-icon-sun-BeforeUsersDoSolutions">
                        <IconSun />
                      </span>
                      <span className="theme-icon-BeforeUsersDoSolutions theme-icon-moon-BeforeUsersDoSolutions">
                        <IconMoon />
                      </span>
                    </button>
                    <span className={`top-icon-BeforeUsersDoSolutions${showToast ? ' is-ringing-BeforeUsersDoSolutions' : ''}`}>
                      <IconBell />
                      <span className="bell-badge-BeforeUsersDoSolutions" />
                    </span>
                    <span className="avatar-BeforeUsersDoSolutions">ZC</span>
                  </div>
                </header>

                <div className="body-BeforeUsersDoSolutions">
                  <nav className={`sidebar-BeforeUsersDoSolutions ${zone(2)}`}>
                    {NAV.map(({ label, Icon }, i) => (
                      <span
                        key={label}
                        className={`nav-item-BeforeUsersDoSolutions${label === 'Servers' ? ' is-current-BeforeUsersDoSolutions' : ''}`}
                        style={{ '--i-BeforeUsersDoSolutions': i }}
                      >
                        <span className="nav-icon-BeforeUsersDoSolutions">
                          <Icon />
                        </span>
                        <span>{label}</span>
                        {label === 'Alerts' && <span className="nav-count-BeforeUsersDoSolutions">2</span>}
                      </span>
                    ))}
                  </nav>

                  <div className="main-BeforeUsersDoSolutions">
                    <div className={`stats-BeforeUsersDoSolutions ${zone(0)}`}>
                      {STATS.map((s, i) => (
                        <div
                          key={s.label}
                          className={`stat-BeforeUsersDoSolutions stat-${s.tone}-BeforeUsersDoSolutions`}
                          style={{ '--i-BeforeUsersDoSolutions': i }}
                        >
                          <span className="stat-label-BeforeUsersDoSolutions">{s.label}</span>
                          <span className="stat-value-BeforeUsersDoSolutions">
                            <Tween value={inView ? s.value : 0} duration={1400} />
                          </span>
                          <span className={`stat-delta-BeforeUsersDoSolutions is-${s.trend}-BeforeUsersDoSolutions`}>
                            {s.trend === 'up' ? '↑' : '↓'} {s.delta}
                          </span>
                          <svg className="stat-spark-BeforeUsersDoSolutions" viewBox="0 0 60 18" aria-hidden="true">
                            <path d={s.spark} pathLength="100" />
                          </svg>
                        </div>
                      ))}
                    </div>

                    <div className={`mid-BeforeUsersDoSolutions ${zone(4)}`}>
                      <div className="card-BeforeUsersDoSolutions chart-card-BeforeUsersDoSolutions">
                        <div className="card-head-BeforeUsersDoSolutions">
                          <span className="card-title-BeforeUsersDoSolutions">Server Health</span>
                          <span className="live-BeforeUsersDoSolutions">
                            <span className="live-dot-BeforeUsersDoSolutions" />
                            Live
                          </span>
                        </div>
                        <div className="chart-BeforeUsersDoSolutions">
                          <div className="chart-y-BeforeUsersDoSolutions" aria-hidden="true">
                            {Y_LABELS.map((y) => (
                              <span key={y}>{y}</span>
                            ))}
                          </div>
                          <div className="chart-plot-BeforeUsersDoSolutions">
                            <svg
                              className="chart-svg-BeforeUsersDoSolutions"
                              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                              preserveAspectRatio="none"
                              aria-hidden="true"
                            >
                              <defs>
                                <linearGradient id="areaGrad-BeforeUsersDoSolutions" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0" className="area-stop-a-BeforeUsersDoSolutions" />
                                  <stop offset="1" className="area-stop-b-BeforeUsersDoSolutions" />
                                </linearGradient>
                              </defs>
                              {[0.25, 0.5, 0.75].map((g) => (
                                <line
                                  key={g}
                                  x1="0"
                                  x2={CHART_W}
                                  y1={CHART_PAD + g * (CHART_H - CHART_PAD * 2)}
                                  y2={CHART_PAD + g * (CHART_H - CHART_PAD * 2)}
                                  className="chart-grid-BeforeUsersDoSolutions"
                                />
                              ))}
                              <path d={chart.area} className="chart-area-BeforeUsersDoSolutions" fill="url(#areaGrad-BeforeUsersDoSolutions)" />
                              <path d={chart.line} pathLength="1000" className="chart-line-BeforeUsersDoSolutions" />
                            </svg>
                            <span
                              className="chart-dot-BeforeUsersDoSolutions"
                              style={{
                                left: `${(chart.last[0] / CHART_W) * 100}%`,
                                top: `${(chart.last[1] / CHART_H) * 100}%`,
                              }}
                            >
                              <span className="chart-tip-BeforeUsersDoSolutions">
                                <Tween value={series[series.length - 1]} duration={700} suffix="%" />
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="chart-x-BeforeUsersDoSolutions" aria-hidden="true">
                          {X_LABELS.map((x) => (
                            <span key={x}>{x}</span>
                          ))}
                        </div>
                      </div>

                      <div className="side-col-BeforeUsersDoSolutions">
                        {[
                          { label: 'CPU Usage', value: cpu, tone: 'blue' },
                          { label: 'Memory Usage', value: mem, tone: 'cyan' },
                        ].map((g, i) => (
                          <div
                            key={g.label}
                            className={`card-BeforeUsersDoSolutions gauge-BeforeUsersDoSolutions gauge-${g.tone}-BeforeUsersDoSolutions`}
                            style={{ '--i-BeforeUsersDoSolutions': i }}
                          >
                            <div className="gauge-text-BeforeUsersDoSolutions">
                              <span className="card-title-BeforeUsersDoSolutions">{g.label}</span>
                              <span className="gauge-value-BeforeUsersDoSolutions">
                                <Tween value={inView ? g.value : 0} duration={1200} suffix="%" />
                              </span>
                            </div>
                            <div className="gauge-ring-BeforeUsersDoSolutions">
                              <svg viewBox="0 0 64 64" aria-hidden="true">
                                <circle cx="32" cy="32" r="26" className="gauge-track-BeforeUsersDoSolutions" />
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="26"
                                  pathLength="100"
                                  className="gauge-fill-BeforeUsersDoSolutions"
                                  style={{ strokeDashoffset: 100 - (inView ? g.value : 0) }}
                                />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`card-BeforeUsersDoSolutions table-BeforeUsersDoSolutions ${zone(1)}`}>
                      <div className="table-head-BeforeUsersDoSolutions">
                        <span>Servers</span>
                        <span>Status</span>
                        <span>CPU</span>
                        <span>Memory</span>
                        <span>Uptime</span>
                      </div>
                      {rows.map((r, i) => {
                        const degraded = r.status !== 'Healthy'
                        return (
                          <div
                            key={r.name}
                            className={`table-row-BeforeUsersDoSolutions${degraded ? ' is-degraded-BeforeUsersDoSolutions' : ''}`}
                            style={{ '--i-BeforeUsersDoSolutions': i }}
                          >
                            <span className="cell-name-BeforeUsersDoSolutions">
                              <span className="cell-server-BeforeUsersDoSolutions">
                                <IconServer />
                              </span>
                              {r.name}
                            </span>
                            <span>
                              <span className={`pill-BeforeUsersDoSolutions${degraded ? ' pill-warn-BeforeUsersDoSolutions' : ''}`}>
                                <span className="pill-dot-BeforeUsersDoSolutions" />
                                {r.status}
                              </span>
                            </span>
                            <span className="cell-metric-BeforeUsersDoSolutions">
                              <span className="cell-num-BeforeUsersDoSolutions">
                                <Tween value={inView ? r.cpu : 0} duration={900} suffix="%" />
                              </span>
                              <span className="bar-BeforeUsersDoSolutions">
                                <span
                                  className={r.cpu > 70 ? 'is-hot-BeforeUsersDoSolutions' : ''}
                                  style={{ width: `${inView ? r.cpu : 0}%` }}
                                />
                              </span>
                            </span>
                            <span className="cell-metric-BeforeUsersDoSolutions">
                              <span className="cell-num-BeforeUsersDoSolutions">
                                <Tween value={inView ? r.mem : 0} duration={900} suffix="%" />
                              </span>
                              <span className="bar-BeforeUsersDoSolutions">
                                <span
                                  className={r.mem > 75 ? 'is-hot-BeforeUsersDoSolutions' : ''}
                                  style={{ width: `${inView ? r.mem : 0}%` }}
                                />
                              </span>
                            </span>
                            <span className="cell-uptime-BeforeUsersDoSolutions">{r.uptime}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`toast-BeforeUsersDoSolutions${showToast ? ' is-shown-BeforeUsersDoSolutions' : ''}`} aria-hidden="true">
              <span className="toast-icon-BeforeUsersDoSolutions">
                <IconWarning />
              </span>
              <span className="toast-text-BeforeUsersDoSolutions">
                <span className="toast-title-BeforeUsersDoSolutions">db-01 CPU above 75%</span>
                <span className="toast-sub-BeforeUsersDoSolutions">Alert sent to on-call · just now</span>
              </span>
              <span key={showToast ? 'run' : 'idle'} className="toast-timer-BeforeUsersDoSolutions" />
            </div>

            <div className="chip-BeforeUsersDoSolutions" aria-hidden="true">
              <span className="chip-dot-BeforeUsersDoSolutions" />
              <span>
                Uptime <strong>99.98%</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeUsersDoSolutions