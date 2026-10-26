import React from 'react'
import './MainPlatformsPageHero.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ------------------------------------------------------------------
   👉 ADD YOUR BACKGROUND IMAGE LINK HERE
   (or pass it as a prop: <MainPlatformsPageHero backgroundImage="..." />)
------------------------------------------------------------------- */
const HERO_BG_IMAGE = '/PlatformHeroBGMain2.png'

/* ---------------------------- Icons ---------------------------- */
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconApplications = () => (
  <svg {...svgProps}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <circle cx="17.5" cy="17.5" r="3.5" />
  </svg>
)

const IconDatabases = () => (
  <svg {...svgProps}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
)

const IconCloud = () => (
  <svg {...svgProps}>
    <path d="M7 18.5h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.2 9.6 4.5 4.5 0 0 0 7 18.5z" />
  </svg>
)

const IconServers = () => (
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
  </svg>
)

const IconNetworks = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M12 7.2v4.3M12 11.5l-5.4 4.8M12 11.5l5.4 4.8" />
  </svg>
)

const IconInfrastructure = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconPlay = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
)

const IconWave = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M2 12h3.5l2.2-6 3.6 12 3.2-15 2.8 13 1.6-4H22" />
  </svg>
)

/* ---------------------------- Data ----------------------------- */
const LAYERS = [
  { label: 'Applications', Icon: IconApplications },
  { label: 'Databases', Icon: IconDatabases },
  { label: 'Cloud', Icon: IconCloud },
  { label: 'Servers', Icon: IconServers },
  { label: 'Networks', Icon: IconNetworks },
  { label: 'Infrastructure', Icon: IconInfrastructure },
]

const BEAMS = [
  { left: '12%', top: '6%', height: '62%', delay: '0s', dur: '6s' },
  { left: '24%', top: '0%', height: '46%', delay: '1.2s', dur: '7s' },
  { left: '41%', top: '4%', height: '80%', delay: '0.6s', dur: '5.5s' },
  { left: '56%', top: '0%', height: '58%', delay: '2s', dur: '6.5s' },
  { left: '66%', top: '10%', height: '74%', delay: '0.3s', dur: '8s' },
  { left: '93%', top: '28%', height: '50%', delay: '1.6s', dur: '6s' },
]

// Deterministic values (SSR safe – no Math.random)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 8) % 96}%`,
  top: `${38 + ((i * 23) % 55)}%`,
  delay: `${((i * 0.7) % 6).toFixed(1)}s`,
  dur: `${5 + (i % 4)}s`,
  size: `${2 + (i % 3)}px`,
}))

/* -------------------------- Component -------------------------- */
function MainPlatformsPageHero({
  backgroundImage = HERO_BG_IMAGE,
  exploreHref = '/platform',
  tourHref = '#platform-tour',
}) {
  return (
    <section
      className="hero-MainPlatformsPageHero"
      style={{
        '--hero-bg-MainPlatformsPageHero': backgroundImage ? `url("${backgroundImage}")` : 'none',
      }}
    >
      {/* Background */}
      <div className="bg-MainPlatformsPageHero" aria-hidden="true" />
      <div className="overlay-MainPlatformsPageHero" aria-hidden="true" />
      <div className="ambient-MainPlatformsPageHero" aria-hidden="true" />

      <div className="container-MainPlatformsPageHero">
        {/* ---------------- Left content ---------------- */}
        <div className="content-MainPlatformsPageHero">
          <BageZescloudAllComps badge="platforms" />

          <h1 className="title-MainPlatformsPageHero">
            <span
              className="title-line-MainPlatformsPageHero reveal-MainPlatformsPageHero"
              style={{ '--d-MainPlatformsPageHero': '0.2s' }}
            >
              One intelligent platform. Every layer. <span
              className="title-line-MainPlatformsPageHero title-accent-MainPlatformsPageHero"
              style={{ '--d-MainPlatformsPageHero': '0.5s' }}
            >
               Every system.
            </span>
            </span>
            
            
          </h1>

          <p
            className="lead-MainPlatformsPageHero reveal-MainPlatformsPageHero"
            style={{ '--d-MainPlatformsPageHero': '0.65s' }}
          >
            ZesCloud unifies monitoring, AI intelligence, automation, recovery, and security
            across your infrastructure stack.
          </p>

          <p
            className="desc-MainPlatformsPageHero reveal-MainPlatformsPageHero"
            style={{ '--d-MainPlatformsPageHero': '0.8s' }}
          >
            Your infrastructure may span servers, applications, networks, databases, cloud
            platforms, and services. ZesCloud gives your team one operational layer to
            understand them together.
          </p>

          <div
            className="actions-MainPlatformsPageHero reveal-MainPlatformsPageHero"
            style={{ '--d-MainPlatformsPageHero': '0.95s' }}
          >
            <a href={exploreHref} className="zescloud-btn zescloud-btn-primary">
              <span>Explore the Platform</span>
              <span className="btn-arrow-MainPlatformsPageHero">
                <IconArrow />
              </span>
            </a>

            <a href={tourHref} className="zescloud-btn zescloud-btn-outline ">
              <span className="play-MainPlatformsPageHero">
                <IconPlay />
              </span>
              <span>Watch Platform Tour</span>
            </a>
          </div>
        </div>

        {/* ---------------- Right visual ---------------- */}
        <div
          className="visual-MainPlatformsPageHero"
          aria-label="ZesCloud platform layers: Applications, Databases, Cloud, Servers, Networks and Infrastructure, monitored and optimized by Zaura"
          role="img"
        >
          <div className="visual-inner-MainPlatformsPageHero">
            {/* Light beams */}
            <div className="beams-MainPlatformsPageHero" aria-hidden="true">
              {BEAMS.map((b, i) => (
                <span
                  key={i}
                  className="beam-MainPlatformsPageHero"
                  style={{
                    left: b.left,
                    top: b.top,
                    height: b.height,
                    '--delay-MainPlatformsPageHero': b.delay,
                    '--dur-MainPlatformsPageHero': b.dur,
                  }}
                />
              ))}
            </div>

            {/* Ground glow + ripples */}
            <div className="ground-MainPlatformsPageHero" aria-hidden="true">
              <span className="ground-glow-MainPlatformsPageHero" />
              <span className="ripple-MainPlatformsPageHero" />
              <span className="ripple-MainPlatformsPageHero ripple-delay-MainPlatformsPageHero" />
            </div>

            {/* 3D stack */}
            <div className="stage-MainPlatformsPageHero" aria-hidden="true">
              <div className="scene-MainPlatformsPageHero">
                <div className="stack-MainPlatformsPageHero">
                  {/* Glowing vertical edge lines through the stack corners */}
                  <span className="pillar-MainPlatformsPageHero pillar-front-left-MainPlatformsPageHero" />
                  <span className="pillar-MainPlatformsPageHero pillar-front-right-MainPlatformsPageHero" />
                  <span className="pillar-MainPlatformsPageHero pillar-back-right-MainPlatformsPageHero" />

                  {LAYERS.map(({ label, Icon }, i) => (
                    <div
                      key={label}
                      className="slot-MainPlatformsPageHero"
                      style={{ '--i-MainPlatformsPageHero': i }}
                    >
                      <div className="float-MainPlatformsPageHero">
                        <div className="layer-MainPlatformsPageHero">
                          <div className="face-MainPlatformsPageHero face-bottom-MainPlatformsPageHero" />
                          <div className="face-MainPlatformsPageHero face-top-MainPlatformsPageHero" />
                          <div className="face-MainPlatformsPageHero face-right-MainPlatformsPageHero" />
                          <div className="face-MainPlatformsPageHero face-front-MainPlatformsPageHero">
                            <span className="icon-MainPlatformsPageHero">
                              <Icon />
                            </span>
                            <span className="label-MainPlatformsPageHero">{label}</span>
                            <span className="scan-MainPlatformsPageHero" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Particles */}
            <div className="particles-MainPlatformsPageHero" aria-hidden="true">
              {PARTICLES.map((p, i) => (
                <span
                  key={i}
                  className="particle-MainPlatformsPageHero"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: p.size,
                    height: p.size,
                    '--delay-MainPlatformsPageHero': p.delay,
                    '--dur-MainPlatformsPageHero': p.dur,
                  }}
                />
              ))}
            </div>

            {/* Connector + Zaura card */}
            <span className="connector-MainPlatformsPageHero" aria-hidden="true" />

            <div className="zaura-wrap-MainPlatformsPageHero">
              <div className="zaura-MainPlatformsPageHero">
                <div className="zaura-content-MainPlatformsPageHero">
                  <span className="zaura-icon-MainPlatformsPageHero">
                    <IconWave />
                  </span>
                  <span className="zaura-sub-MainPlatformsPageHero">
                    Monitored &amp; Optimized by
                  </span>
                  <span className="zaura-name-MainPlatformsPageHero">
                    Zaura<sup>™</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainPlatformsPageHero