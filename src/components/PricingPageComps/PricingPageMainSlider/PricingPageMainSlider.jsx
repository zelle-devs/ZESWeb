import React from 'react'
import './PricingPageMainSlider.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ------------------------------------------------------------------
   👉 BACKGROUND IMAGE
   Put "BackgroundPricingPageSlider.png" inside /public
   (or pass it as a prop: <PricingPageMainSlider backgroundImage="..." />)
------------------------------------------------------------------- */
const PRICING_BG_IMAGE = '/BackgroundPricingPageSlider.png'

/* ------------------------------------------------------------------
   IMPORTANT – why nothing moves on zoom in / zoom out
   On desktop the whole hero (image, lines, dots, cards, text, badge) is
   built on ONE fixed 1671px wide "canvas" – exactly the background
   image's pixel size. Every line, dot, LED and card below is written in
   the image's own pixel coordinates (image = 1671 x 941).
   The canvas is then scaled as one piece to the screen width (pure CSS),
   so on any screen size or browser zoom level everything keeps exactly
   the same size and position relative to each other.
------------------------------------------------------------------- */
const VB_W = 1671
const VB_H = 941
const px = (x) => `${(x / VB_W) * 100}%`
const py = (y) => `${(y / VB_H) * 100}%`

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

const IconContract = () => (
  <svg {...svgProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
)

const IconShield = () => (
  <svg {...svgProps}>
    <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z" />
  </svg>
)

const IconMonitor = () => (
  <svg {...svgProps}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4M7 12l3-3 2.5 2.5L17 7" />
  </svg>
)

const IconAutomate = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
  </svg>
)

const IconUnderstand = () => (
  <svg {...svgProps}>
    <path d="M12 2.8 20 7.4v9.2l-8 4.6-8-4.6V7.4z" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 9.4V6.8M14.3 13.3l2.2 1.3M9.7 13.3l-2.2 1.3" />
  </svg>
)

const IconPredict = () => (
  <svg {...svgProps}>
    <path d="M2.5 12h3.6l2.2-6 3.6 12 3.1-9 1.9 3h4.6" />
  </svg>
)

const IconRecover = () => (
  <svg {...svgProps}>
    <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const IconOperate = () => (
  <svg {...svgProps}>
    <path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8z" />
    <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
  </svg>
)

/* ---------------------------- Content ---------------------------- */
const FEATURES = [
  {
    title: 'No long-term contracts',
    desc: 'Change or cancel your plan according to your needs.',
    Icon: IconContract,
  },
  {
    title: 'Transparent pricing',
    desc: 'Clear plans designed around infrastructure scale.',
    Icon: IconShield,
  },
]

/* Cards beside the server – image pixels.
   Every card is centred on its glowing dot (y = dot y) and its inner edge
   sits exactly 17px from the dot (edge = dot x ∓ 17). Card width = 180px,
   so for left cards x = dot x - 17 - 180, for right cards x = dot x + 17. */
const CARD_W = 180
const CARD_GAP = 17
const CARDS = [
  { title: 'Monitor', sub: 'See everything', Icon: IconMonitor, side: 'left', dotX: 837, y: 404 },
  { title: 'Automate', sub: 'Run workflows', Icon: IconAutomate, side: 'left', dotX: 838, y: 528 },
  { title: 'Understand', sub: 'Get AI insights', Icon: IconUnderstand, side: 'left', dotX: 839, y: 668 },
  { title: 'Predict', sub: 'Identify risks', Icon: IconPredict, side: 'right', dotX: 1454, y: 402 },
  { title: 'Recover', sub: 'Stay resilient', Icon: IconRecover, side: 'right', dotX: 1456, y: 527 },
  { title: 'Operate', sub: 'With confidence', Icon: IconOperate, side: 'right', dotX: 1459, y: 655 },
].map((c) => ({
  ...c,
  x: c.side === 'left' ? c.dotX - CARD_GAP - CARD_W : c.dotX + CARD_GAP,
  edgeX: c.side === 'left' ? c.dotX - CARD_GAP : c.dotX + CARD_GAP,
}))

/* ------------------- Image-traced animation data ------------------- */
/* Circuit lines exactly on top of the lines inside the image
   (written from the glowing dot → into the server) */
const CIRCUITS = [
  // left side: 3 dots → server
  { d: 'M837 404 H909 Q917 404 917 412 V443 Q917 450 925 450 H959 Q966 450 966 457 V498', delay: 0.6, dur: 3.4 },
  { d: 'M838 528 H909 Q917 528 917 536 V571 Q917 579 925 579 H959', delay: 0.8, dur: 3 },
  { d: 'M839 668 H911 Q919 668 919 661 V659 Q919 652 926 652 H959', delay: 1, dur: 2.8 },
  // right side: 3 dots → server
  { d: 'M1454 402 H1366 Q1358 402 1358 410 V443 Q1358 451 1350 451 H1320 Q1312 451 1312 459 V488', delay: 0.7, dur: 3.4 },
  { d: 'M1456 527 H1378 Q1370 527 1370 535 V569 Q1370 577 1362 577 H1329', delay: 0.9, dur: 3 },
  { d: 'M1459 655 H1330', delay: 1.1, dur: 2.6 },
  // vertical lines above the server / cloud (drawn upward → dot)
  { d: 'M1004 487 V309', delay: 0.3, dur: 3.6 },
  { d: 'M984 492 V425', delay: 0.5, dur: 2.4 },
  { d: 'M1090 363 V262', delay: 0.4, dur: 3 },
  { d: 'M1216 362 V253', delay: 0.45, dur: 3.2 },
  { d: 'M1287 487 V305', delay: 0.35, dur: 3.8 },
  { d: 'M1280 492 V380', delay: 0.55, dur: 2.9 },
  { d: 'M1300 492 V448', delay: 0.65, dur: 2.2 },
  // main glowing corner edge of the server
  { d: 'M1128 772 V448', delay: 0.2, dur: 2.8 },
]

/* Glowing end-dots of the lines */
const END_DOTS = [
  { x: 837, y: 404, d: 0 },
  { x: 838, y: 528, d: 0.8 },
  { x: 839, y: 668, d: 1.6 },
  { x: 1454, y: 402, d: 0.4 },
  { x: 1456, y: 527, d: 1.2 },
  { x: 1459, y: 655, d: 2 },
  { x: 1004, y: 309, d: 0.6 },
  { x: 984, y: 425, d: 2.3 },
  { x: 1090, y: 262, d: 1.4 },
  { x: 1216, y: 253, d: 0.2 },
  { x: 1287, y: 305, d: 1.8 },
  { x: 1280, y: 379, d: 1 },
  { x: 1300, y: 448, d: 2.6 },
]

/* Junctions where the lines touch the server */
const JUNCTIONS = [
  { x: 966, y: 498, d: 0.3 },
  { x: 959, y: 579, d: 1.1 },
  { x: 959, y: 652, d: 1.9 },
  { x: 1312, y: 488, d: 0.7 },
  { x: 1329, y: 577, d: 1.5 },
  { x: 1330, y: 654, d: 2.2 },
]

/* Server LEDs (round lights on the right face) */
const LEDS = [
  { x: 1159, y: 475, t: 2.2, d: 0 },
  { x: 1159, y: 503, t: 3.1, d: 0.6 },
  { x: 1159, y: 552, t: 1.7, d: 0.3 },
  { x: 1159, y: 579, t: 2.6, d: 1.1 },
  { x: 1160, y: 627, t: 3.4, d: 0.8 },
  { x: 1160, y: 653, t: 1.9, d: 0.2 },
  { x: 1160, y: 700, t: 2.8, d: 1.4 },
  { x: 1160, y: 729, t: 2.1, d: 0.5 },
]

/* Light bars on the right face (progress movement) */
const BARS = [
  { d: 'M1277 499 L1307 506', dl: 0 },
  { d: 'M1277 528 L1306 534', dl: 0.7 },
  { d: 'M1279 571 L1307 576', dl: 1.3 },
  { d: 'M1278 598 L1307 602', dl: 0.4 },
  { d: 'M1279 640 L1308 644', dl: 1.8 },
  { d: 'M1280 667 L1308 670', dl: 1 },
  { d: 'M1281 710 L1308 712', dl: 0.2 },
  { d: 'M1280 738 L1306 740', dl: 1.5 },
]

/* Server unit top edges – data packets run along them */
const UNIT_EDGES = [
  { d: 'M962 498 L1126 449 L1326 498', dl: 0.2 },
  { d: 'M962 572 L1128 532 L1326 568', dl: 1.1 },
  { d: 'M962 641 L1128 608 L1326 635', dl: 2 },
  { d: 'M962 706 L1128 683 L1326 703', dl: 2.9 },
]

/* Corner nodes on the main glowing edge */
const EDGE_NODES = [450, 512, 532, 590, 608, 665, 683, 742, 757]
const EDGE_X = 1128

/* Card connection lines: card inner edge → edge of the glowing dot */
const CARD_LINKS = CARDS.map((c, i) => ({
  d: `M${c.edgeX} ${c.y} H${c.side === 'left' ? c.dotX - 7 : c.dotX + 7}`,
  dl: (i % 3) * 0.6 + (c.side === 'right' ? 0.3 : 0),
}))

// Deterministic particles (SSR safe – no Math.random)
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  x: 860 + ((i * 97) % 580),
  y: 600 + ((i * 53) % 180),
  r: 1.4 + (i % 3) * 0.6,
  d: ((i * 0.83) % 7).toFixed(2),
  t: 6 + (i % 4),
}))

/* -------------------------- Component -------------------------- */
function PricingPageMainSlider({ backgroundImage = PRICING_BG_IMAGE }) {
  return (
    <section
      className="hero-PricingPageMainSlider"
      style={{
        '--bg-image-PricingPageMainSlider': backgroundImage ? `url("${backgroundImage}")` : 'none',
      }}
    >
      {/* frame = reserves the scaled height, canvas = fixed 1671px design */}
      <div className="frame-PricingPageMainSlider">
        <div className="canvas-PricingPageMainSlider">
          {/* ============ Locked visual (image + animations) ============ */}
          <div
            className="visual-PricingPageMainSlider"
            role="img"
            aria-label="Cloud server stack connected to Monitor, Automate, Understand, Predict, Recover and Operate"
          >
            <div className="stage-PricingPageMainSlider" aria-hidden="true">
              <div className="bg-PricingPageMainSlider" />
              <div className="shade-PricingPageMainSlider" />

              <svg
                className="fx-PricingPageMainSlider"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="none"
                focusable="false"
              >
                <defs>
                  <filter
                    id="glow-PricingPageMainSlider"
                    filterUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width={VB_W}
                    height={VB_H}
                  >
                    <feGaussianBlur stdDeviation="3.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <radialGradient id="dotGlow-PricingPageMainSlider">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="28%" stopColor="#BFE6FF" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#56B4FF" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3989E2" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="ledCap-PricingPageMainSlider">
                    <stop offset="0%" stopColor="#041327" stopOpacity="0.96" />
                    <stop offset="60%" stopColor="#051731" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#051731" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="cloudGlow-PricingPageMainSlider">
                    <stop offset="0%" stopColor="#7CC8FF" stopOpacity="0.55" />
                    <stop offset="55%" stopColor="#3989E2" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#1848D9" stopOpacity="0" />
                  </radialGradient>

                </defs>

                {/* Cloud breathing glow */}
                <ellipse
                  className="cloud-glow-PricingPageMainSlider"
                  cx="1132"
                  cy="398"
                  rx="150"
                  ry="96"
                  fill="url(#cloudGlow-PricingPageMainSlider)"
                />



                {/* Line "start" draw + soft glow on top of the image lines */}
                <g className="lines-PricingPageMainSlider" filter="url(#glow-PricingPageMainSlider)">
                  {CIRCUITS.map((c, i) => (
                    <path
                      key={`l-${i}`}
                      className="line-PricingPageMainSlider"
                      d={c.d}
                      pathLength="1"
                      style={{ '--d-PricingPageMainSlider': `${c.delay}s` }}
                    />
                  ))}
                  {CARD_LINKS.map((c, i) => (
                    <path
                      key={`cl-${i}`}
                      className="line-PricingPageMainSlider card-link-PricingPageMainSlider"
                      d={c.d}
                      pathLength="1"
                      style={{ '--d-PricingPageMainSlider': `${1.4 + i * 0.15}s` }}
                    />
                  ))}
                </g>

                {/* Travelling energy pulses along every line */}
                <g className="pulses-PricingPageMainSlider" filter="url(#glow-PricingPageMainSlider)">
                  {CIRCUITS.map((c, i) => (
                    <path
                      key={`p-${i}`}
                      className="pulse-PricingPageMainSlider"
                      d={c.d}
                      pathLength="1"
                      style={{
                        '--d-PricingPageMainSlider': `${c.delay + 1.6}s`,
                        '--t-PricingPageMainSlider': `${c.dur}s`,
                      }}
                    />
                  ))}
                  {CARD_LINKS.map((c, i) => (
                    <path
                      key={`cp-${i}`}
                      className="pulse-PricingPageMainSlider pulse-short-PricingPageMainSlider card-link-PricingPageMainSlider"
                      d={c.d}
                      pathLength="1"
                      style={{
                        '--d-PricingPageMainSlider': `${2 + c.dl}s`,
                        '--t-PricingPageMainSlider': '2.2s',
                      }}
                    />
                  ))}

                  {/* Server progress: packets along each unit edge */}
                  {UNIT_EDGES.map((u, i) => (
                    <path
                      key={`u-${i}`}
                      className="packet-PricingPageMainSlider"
                      d={u.d}
                      pathLength="1"
                      style={{ '--d-PricingPageMainSlider': `${1.8 + u.dl}s` }}
                    />
                  ))}

                  {/* Server progress: light bars filling */}
                  {BARS.map((b, i) => (
                    <path
                      key={`b-${i}`}
                      className="bar-PricingPageMainSlider"
                      d={b.d}
                      pathLength="1"
                      style={{ '--d-PricingPageMainSlider': `${1.5 + b.dl}s` }}
                    />
                  ))}
                </g>

                {/* Server LEDs blinking */}
                <g className="leds-PricingPageMainSlider">
                  {LEDS.map((l, i) => (
                    <g
                      key={`led-${i}`}
                      className="led-PricingPageMainSlider"
                      style={{
                        '--d-PricingPageMainSlider': `${l.d}s`,
                        '--t-PricingPageMainSlider': `${l.t}s`,
                      }}
                    >
                      <circle className="led-off-PricingPageMainSlider" cx={l.x} cy={l.y} r="7.5" fill="url(#ledCap-PricingPageMainSlider)" />
                      <circle className="led-on-PricingPageMainSlider" cx={l.x} cy={l.y} r="11" fill="url(#dotGlow-PricingPageMainSlider)" />
                    </g>
                  ))}
                </g>

                {/* Corner nodes on the main edge */}
                <g className="nodes-PricingPageMainSlider">
                  {EDGE_NODES.map((y, i) => (
                    <circle
                      key={`n-${i}`}
                      className="node-PricingPageMainSlider"
                      cx={EDGE_X}
                      cy={y}
                      r="10"
                      fill="url(#dotGlow-PricingPageMainSlider)"
                      style={{ '--d-PricingPageMainSlider': `${i * 0.28}s` }}
                    />
                  ))}
                </g>

                {/* End dots – blink + ping ring */}
                <g className="dots-PricingPageMainSlider">
                  {END_DOTS.map((p, i) => (
                    <g key={`d-${i}`} style={{ '--d-PricingPageMainSlider': `${p.d}s` }}>
                      <circle className="dot-ring-PricingPageMainSlider" cx={p.x} cy={p.y} r="6" />
                      <circle
                        className="dot-glow-PricingPageMainSlider"
                        cx={p.x}
                        cy={p.y}
                        r="13"
                        fill="url(#dotGlow-PricingPageMainSlider)"
                      />
                    </g>
                  ))}
                </g>

                {/* Junctions where lines meet the server */}
                <g className="dots-PricingPageMainSlider">
                  {JUNCTIONS.map((p, i) => (
                    <circle
                      key={`j-${i}`}
                      className="junction-PricingPageMainSlider"
                      cx={p.x}
                      cy={p.y}
                      r="10"
                      fill="url(#dotGlow-PricingPageMainSlider)"
                      style={{ '--d-PricingPageMainSlider': `${p.d}s` }}
                    />
                  ))}
                </g>


                {/* Rising particles */}
                <g className="particles-PricingPageMainSlider">
                  {PARTICLES.map((p, i) => (
                    <circle
                      key={`pt-${i}`}
                      className="particle-PricingPageMainSlider"
                      cx={p.x}
                      cy={p.y}
                      r={p.r}
                      style={{
                        '--d-PricingPageMainSlider': `${p.d}s`,
                        '--t-PricingPageMainSlider': `${p.t}s`,
                      }}
                    />
                  ))}
                </g>
              </svg>

              {/* Floating tilted cards (locked to the image) */}
              {CARDS.map(({ title, sub, Icon, side, x, y }, i) => (
                <div
                  key={title}
                  className={`card-PricingPageMainSlider card-${side}-PricingPageMainSlider`}
                  style={{
                    left: px(x),
                    top: py(y),
                    width: px(CARD_W),
                    '--d-PricingPageMainSlider': `${1.2 + (i % 3) * 0.15 + (side === 'right' ? 0.1 : 0)}s`,
                  }}
                >
                  <div className="card-panel-PricingPageMainSlider">
                    <span className="card-icon-PricingPageMainSlider">
                      <Icon />
                    </span>
                    <span className="card-text-PricingPageMainSlider">
                      <span className="card-title-PricingPageMainSlider">{title}</span>
                      <span className="card-sub-PricingPageMainSlider">{sub}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ======================= Left content ======================= */}
          <div className="container-PricingPageMainSlider">
            <div className="content-PricingPageMainSlider">
              <span
                className="eyebrow-PricingPageMainSlider reveal-PricingPageMainSlider"
                style={{ '--d-PricingPageMainSlider': '0.1s' }}
              >
                <BageZescloudAllComps badge='Pricing'/>
              </span>

              <h1 className="title-PricingPageMainSlider">
                <span
                  className="title-line-PricingPageMainSlider reveal-PricingPageMainSlider"
                  style={{ '--d-PricingPageMainSlider': '0.25s' }}
                >
                  Simple pricing.
                </span>
                <span
                  className="title-line-PricingPageMainSlider title-accent-PricingPageMainSlider"
                  style={{ '--d-PricingPageMainSlider': '0.45s' }}
                >
                  Powerful value.
                </span>
              </h1>

              <p
                className="lead-PricingPageMainSlider reveal-PricingPageMainSlider"
                style={{ '--d-PricingPageMainSlider': '0.6s' }}
              >
                Choose the plan that fits your infrastructure.
                <br />
                Scale up or down as your environment changes.
              </p>

              <ul className="features-PricingPageMainSlider">
                {FEATURES.map(({ title, desc, Icon }, i) => (
                  <li
                    key={title}
                    className="feature-PricingPageMainSlider reveal-PricingPageMainSlider"
                    style={{ '--d-PricingPageMainSlider': `${0.75 + i * 0.15}s` }}
                  >
                    <span className="feature-icon-PricingPageMainSlider">
                      <Icon />
                    </span>
                    <span className="feature-text-PricingPageMainSlider">
                      <span className="feature-title-PricingPageMainSlider">{title}</span>
                      <span className="feature-desc-PricingPageMainSlider">{desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile only: cards as a grid (stage cards get too small there) */}
      <ul className="chips-PricingPageMainSlider">
        {CARDS.map(({ title, sub, Icon }) => (
          <li key={title} className="chip-PricingPageMainSlider">
            <span className="card-icon-PricingPageMainSlider">
              <Icon />
            </span>
            <span className="card-text-PricingPageMainSlider">
              <span className="card-title-PricingPageMainSlider">{title}</span>
              <span className="card-sub-PricingPageMainSlider">{sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PricingPageMainSlider