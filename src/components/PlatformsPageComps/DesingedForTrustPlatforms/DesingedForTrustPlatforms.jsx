"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Network, Globe, ShieldCheck, Hexagon, ArrowRight } from 'lucide-react';
import './DesingedForTrustPlatforms.css';
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps';

/* ------------------------------------------------------------------
   👉 ADD YOUR BACKGROUND IMAGE LINK HERE
   (or pass it as a prop: <DesingedForTrustPlatforms backgroundImage="..." />)
   The animated lights are positioned for the 1959 x 803 globe image.
------------------------------------------------------------------- */
const SECTION_BG_IMAGE = '/DesignedForTrustPlatform.png';

/* ============================== CONTENT ============================== */
const FEATURES = [
  {
    title: 'Reliable Operations',
    desc: 'Continuous monitoring and operational awareness.',
    Icon: Network,
    tone: 'blue',
  },
  {
    title: 'Global Infrastructure',
    desc: 'Designed to support distributed infrastructure and multiple environments.',
    Icon: Globe,
    tone: 'blue',
  },
  {
    title: 'Secure by Design',
    desc: 'Security and access controls are built into the operational experience.',
    Icon: ShieldCheck,
    tone: 'purple',
  },
  {
    title: 'Operational Control',
    desc: 'Automation should be powerful without removing human oversight.',
    Icon: Hexagon,
    tone: 'purple',
  },
];

/* ================= SCENE DATA (image pixel coordinates) ================= */
// deterministic pseudo random (SSR safe, same on server & client)
const rand = (n) => {
  const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const GLOBE = { cx: 1435, cy: 378, r: 340 };

// Rim arc over the visible (upper) part of the globe only – the lower part
// of the globe sits behind the server racks in the image
const RIM_Y = 430;
const rimArc = (r) => {
  const dx = Math.sqrt(r * r - (RIM_Y - GLOBE.cy) ** 2).toFixed(1);
  return `M ${GLOBE.cx - dx} ${RIM_Y} A ${r} ${r} 0 1 1 ${(GLOBE.cx + Number(dx)).toFixed(1)} ${RIM_Y}`;
};

// Big sweeping light rays across the scene
const RAYS = [
  { d: 'M 560 770 C 980 480, 1600 370, 1959 420', dur: '7s', delay: '0s' },
  { d: 'M 960 160 C 1240 -30, 1760 0, 1959 160', dur: '9s', delay: '1.6s' },
  { d: 'M 780 560 C 1120 310, 1500 250, 1959 330', dur: '8s', delay: '3.2s' },
];

// Night-side city lights on the globe
const CITY_LIGHTS = [
  [1250, 150], [1275, 175], [1300, 140], [1225, 192], [1320, 202], [1290, 232],
  [1345, 182], [1262, 252], [1380, 152], [1340, 300], [1400, 330], [1430, 362],
  [1470, 346], [1500, 392], [1455, 422], [1520, 432], [1482, 470], [1420, 468],
  [1545, 362], [1650, 202], [1690, 242], [1720, 282], [1672, 302], [1702, 182],
];

// Data arcs between cities
const CITY_ARCS = [
  'M 1290 172 Q 1340 240 1470 380',
  'M 1300 140 Q 1500 90 1690 242',
  'M 1455 422 Q 1600 300 1700 282',
  'M 1250 252 Q 1360 380 1520 432',
];

// Uplinks from the server racks to the globe
const UPLINKS = [
  'M 1000 378 Q 1060 260 1180 210',
  'M 1680 432 Q 1660 320 1640 250',
  'M 1356 528 Q 1360 470 1380 420',
];

// Twinkling stars in the sky (outside the globe)
const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: Math.round(660 + rand(i + 1) * 1290),
  y: Math.round(rand(i + 101) * 340),
  r: (0.8 + rand(i + 201) * 1.4).toFixed(2),
  delay: (rand(i + 301) * 5).toFixed(2),
  dur: (2.5 + rand(i + 401) * 3).toFixed(2),
})).filter(
  (s) => Math.hypot(s.x - GLOBE.cx, s.y - GLOBE.cy) > GLOBE.r + 18
);

// Server racks (front faces) – LEDs are generated inside them
const RACKS = [
  { x: 932, y: 380, w: 140, h: 290, cols: 6 },
  { x: 1100, y: 412, w: 55, h: 252, cols: 2 },
  { x: 836, y: 472, w: 64, h: 188, cols: 3 },
  { x: 1318, y: 532, w: 78, h: 132, cols: 3 },
  { x: 1642, y: 432, w: 78, h: 248, cols: 3 },
  { x: 1746, y: 412, w: 108, h: 268, cols: 4 },
  { x: 1890, y: 262, w: 62, h: 418, cols: 2 },
];

const LEDS = RACKS.flatMap((rack, ri) => {
  const rows = Math.floor(rack.h / 13);
  const leds = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < rack.cols; c += 1) {
      const seed = ri * 1000 + r * 10 + c;
      if (rand(seed) > 0.52) {
        leds.push({
          x: Math.round(rack.x + 6 + (c * (rack.w - 14)) / Math.max(rack.cols - 1, 1)),
          y: Math.round(rack.y + 8 + r * 13),
          delay: (rand(seed + 7) * 4).toFixed(2),
          dur: (1.2 + rand(seed + 13) * 2.4).toFixed(2),
        });
      }
    }
  }
  return leds;
});

// Vertical light beams on the rack edges
const BEAMS = [
  { x: 928, y1: 350, y2: 690, delay: '0s' },
  { x: 1088, y1: 340, y2: 690, delay: '1.1s' },
  { x: 1160, y1: 380, y2: 690, delay: '2.3s' },
  { x: 1312, y1: 500, y2: 680, delay: '0.6s' },
  { x: 1632, y1: 400, y2: 695, delay: '1.7s' },
  { x: 1736, y1: 380, y2: 700, delay: '2.9s' },
  { x: 1880, y1: 220, y2: 705, delay: '0.9s' },
];

/* ============================ VARIANTS ============================ */
const contentContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const featureList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const featureItem = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const S = 'DesingedForTrustPlatforms';

/* =========================== COMPONENT =========================== */
function DesingedForTrustPlatforms({
  backgroundImage = SECTION_BG_IMAGE,
  linkHref = '/security',
}) {
  return (
    <section
      className="section-DesingedForTrustPlatforms"
      style={{
        '--bg-image-DesingedForTrustPlatforms': backgroundImage ? `url("${backgroundImage}")` : 'none',
      }}
    >
      {/* ================= Background scene ================= */}
      <div className="scene-wrap-DesingedForTrustPlatforms" aria-hidden="true">
        <motion.div
          className="scene-enter-DesingedForTrustPlatforms"
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stage-DesingedForTrustPlatforms">
            <svg
              className="fx-DesingedForTrustPlatforms"
              viewBox="0 0 1959 803"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id={`glow-${S}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id={`soft-${S}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>

                <clipPath id={`globeClip-${S}`}>
                  <circle cx={GLOBE.cx} cy={GLOBE.cy} r={GLOBE.r} />
                </clipPath>
                <clipPath id={`skyClip-${S}`}>
                  <rect x="0" y="0" width="1959" height="505" />
                </clipPath>

                <linearGradient id={`rimFade-${S}`} gradientUnits="userSpaceOnUse" x1="0" y1={GLOBE.cy - GLOBE.r} x2="0" y2={RIM_Y}>
                  <stop offset="0" stopColor="#7CC4FF" stopOpacity="1" />
                  <stop offset="0.75" stopColor="#7CC4FF" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#7CC4FF" stopOpacity="0" />
                </linearGradient>

                <linearGradient id={`sweep-${S}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#9ED4FF" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#9ED4FF" stopOpacity="0.22" />
                  <stop offset="1" stopColor="#9ED4FF" stopOpacity="0" />
                </linearGradient>

                <linearGradient id={`beam-${S}`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#56B4FF" stopOpacity="0" />
                  <stop offset="0.35" stopColor="#56B4FF" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
                </linearGradient>

                <linearGradient id={`floor-${S}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#56B4FF" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#7CC4FF" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
                </linearGradient>

                <radialGradient id={`floorGlow-${S}`} cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#56B4FF" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* ---------- Stars ---------- */}
              <g className="stars-DesingedForTrustPlatforms">
                {STARS.map((s, i) => (
                  <circle
                    key={i}
                    cx={s.x}
                    cy={s.y}
                    r={s.r}
                    className="star-DesingedForTrustPlatforms"
                    style={{ animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s` }}
                  />
                ))}
              </g>

              {/* ---------- Globe atmosphere ---------- */}
              <path
                d={rimArc(GLOBE.r + 16)}
                stroke={`url(#rimFade-${S})`}
                className="halo-DesingedForTrustPlatforms"
                filter={`url(#soft-${S})`}
              />
              <path
                d={rimArc(GLOBE.r + 2)}
                stroke={`url(#rimFade-${S})`}
                className="rim-DesingedForTrustPlatforms"
                filter={`url(#glow-${S})`}
              />

              {/* ---------- Globe surface: grid, shine, cities ---------- */}
              <g clipPath={`url(#skyClip-${S})`}>
              <g clipPath={`url(#globeClip-${S})`}>
                <ellipse cx={GLOBE.cx} cy={GLOBE.cy - 120} rx={GLOBE.r} ry="62" className="lat-DesingedForTrustPlatforms" />
                <ellipse cx={GLOBE.cx} cy={GLOBE.cy + 40} rx={GLOBE.r} ry="76" className="lat-DesingedForTrustPlatforms lat-rev-DesingedForTrustPlatforms" />
                <ellipse cx={GLOBE.cx} cy={GLOBE.cy} rx="150" ry={GLOBE.r} className="lat-DesingedForTrustPlatforms" />

                <rect
                  x={GLOBE.cx - GLOBE.r - 280}
                  y={GLOBE.cy - GLOBE.r}
                  width="260"
                  height={GLOBE.r * 2}
                  fill={`url(#sweep-${S})`}
                  className="globe-sweep-DesingedForTrustPlatforms"
                />

                {CITY_ARCS.map((d, i) => (
                  <g key={d}>
                    <path d={d} className="city-arc-DesingedForTrustPlatforms" />
                    <circle r="2.4" className="city-pulse-DesingedForTrustPlatforms" filter={`url(#glow-${S})`}>
                      <animateMotion dur={`${3 + i * 0.6}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                ))}

                {CITY_LIGHTS.map(([x, y], i) => (
                  <circle
                    key={`${x}-${y}`}
                    cx={x}
                    cy={y}
                    r={i % 3 === 0 ? 3 : 2}
                    className="city-DesingedForTrustPlatforms"
                    style={{ animationDelay: `${(rand(i + 500) * 3).toFixed(2)}s` }}
                  />
                ))}
              </g>
              </g>

              {/* ---------- Orbit ring around the globe ---------- */}
              {/* <g transform={`rotate(-12 ${GLOBE.cx} ${GLOBE.cy + 30})`}>
                <ellipse
                  cx={GLOBE.cx}
                  cy={GLOBE.cy + 30}
                  rx="500"
                  ry="104"
                  className="orbit-base-DesingedForTrustPlatforms"
                />
                <ellipse
                  cx={GLOBE.cx}
                  cy={GLOBE.cy + 30}
                  rx="500"
                  ry="104"
                  pathLength="1000"
                  className="comet-DesingedForTrustPlatforms"
                  filter={`url(#glow-${S})`}
                  style={{ animationDuration: '10s' }}
                />
              </g> */}

              {/* ---------- Big sweeping light rays ---------- */}
              {/* {RAYS.map((ray) => (
                <g key={ray.d}>
                  <path d={ray.d} className="ray-base-DesingedForTrustPlatforms" />
                  <path
                    d={ray.d}
                    pathLength="1000"
                    className="comet-DesingedForTrustPlatforms"
                    filter={`url(#glow-${S})`}
                    style={{ animationDuration: ray.dur, animationDelay: ray.delay }}
                  />
                </g>
              ))} */}

              {/* ---------- Uplinks: racks to globe ---------- */}
              {UPLINKS.map((d, i) => (
                <g key={d}>
                  <path d={d} className="uplink-DesingedForTrustPlatforms" />
                  <circle r="2.6" className="uplink-dot-DesingedForTrustPlatforms" filter={`url(#glow-${S})`}>
                    <animateMotion dur={`${2.4 + i * 0.5}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
                  </circle>
                </g>
              ))}

              {/* ---------- Rack edge light beams ---------- */}
              {BEAMS.map((b) => (
                <g key={b.x}>
                  <line
                    x1={b.x}
                    y1={b.y2}
                    x2={b.x}
                    y2={b.y1 - 60}
                    stroke={`url(#beam-${S})`}
                    className="beam-DesingedForTrustPlatforms"
                    style={{ animationDelay: b.delay }}
                  />
                  <line
                    x1={b.x}
                    y1={b.y2}
                    x2={b.x}
                    y2={b.y1 - 60}
                    pathLength="1000"
                    className="beam-spark-DesingedForTrustPlatforms"
                    filter={`url(#glow-${S})`}
                    style={{ animationDelay: b.delay }}
                  />
                  <ellipse
                    cx={b.x}
                    cy={b.y2 + 8}
                    rx="46"
                    ry="9"
                    fill={`url(#floorGlow-${S})`}
                    className="beam-pool-DesingedForTrustPlatforms"
                    style={{ animationDelay: b.delay }}
                  />
                </g>
              ))}

              {/* ---------- Server LEDs ---------- */}
              <g className="leds-DesingedForTrustPlatforms">
                {LEDS.map((led, i) => (
                  <rect
                    key={i}
                    x={led.x}
                    y={led.y}
                    width="5"
                    height="2"
                    rx="1"
                    className="led-DesingedForTrustPlatforms"
                    style={{ animationDelay: `${led.delay}s`, animationDuration: `${led.dur}s` }}
                  />
                ))}
              </g>

              {/* ---------- Floor reflection shimmer ---------- */}
              <rect
                x="560"
                y="688"
                width="520"
                height="115"
                fill={`url(#floor-${S})`}
                className="floor-sweep-DesingedForTrustPlatforms"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* readability + section blending */}
      <div className="overlay-DesingedForTrustPlatforms" aria-hidden="true" />

      {/* ================= Content ================= */}
      <div className="container-DesingedForTrustPlatforms">
        <motion.div
          className="content-DesingedForTrustPlatforms"
          variants={contentContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span variants={fadeUp} className="eyebrow-DesingedForTrustPlatforms">
           <BageZescloudAllComps badge="why zescloud"/>
          </motion.span>

          <motion.h2 variants={fadeUp} className="heading-DesingedForTrustPlatforms">
            <span className="heading-line-DesingedForTrustPlatforms">Built for scale.</span>
            <span className="heading-accent-DesingedForTrustPlatforms">Designed for trust.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="lead-DesingedForTrustPlatforms">
            ZesCloud is designed to become an operational layer across growing infrastructure
            environments.
          </motion.p>

          <motion.ul variants={featureList} className="features-DesingedForTrustPlatforms">
            {FEATURES.map(({ title, desc, Icon, tone }, i) => (
              <motion.li
                key={title}
                variants={featureItem}
                className={`feature-DesingedForTrustPlatforms tone-${tone}-DesingedForTrustPlatforms`}
                style={{ '--i-DesingedForTrustPlatforms': i }}
              >
                <span className="feature-icon-DesingedForTrustPlatforms">
                  <Icon size={19} strokeWidth={1.9} />
                </span>
                <div className="feature-text-DesingedForTrustPlatforms">
                  <h3 className="feature-title-DesingedForTrustPlatforms">{title}</h3>
                  <p className="feature-desc-DesingedForTrustPlatforms">{desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.a variants={fadeUp} href={linkHref} className="link-DesingedForTrustPlatforms">
            <span className="link-text-DesingedForTrustPlatforms">Learn about Security</span>
            <ArrowRight size={15} strokeWidth={2.2} className="link-arrow-DesingedForTrustPlatforms" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default DesingedForTrustPlatforms;