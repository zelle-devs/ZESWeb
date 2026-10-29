'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './AboutPageMainSlider.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ---------------------------------------------------------------------------
   Background image (put the file in /public).
   The artwork is 1780 x 884. Everything that sits on the artwork (orbit
   packets, twinkling dots, globe glow, ZesCloud logo and the 5 cards) lives
   inside ONE fixed-ratio "scene" of 1900 x 884 units (the artwork + 120 units
   of empty space on the right for the card column, exactly like the
   screenshot). Positions are % of that scene and sizes are container-query
   units of that scene, so nothing drifts at any screen size or browser zoom.
   All geometry below was measured from THIS artwork — if the image is
   replaced, the coordinates must be re-measured.
--------------------------------------------------------------------------- */
const HERO_BG_IMAGE = '/AboutUsMainPageSlider.png'

const SCENE_W = 1900
const SCENE_H = 884
const ART_W = 1780

/* globe measured from the glowing rim (least-squares circle fit) */
const GLOBE = { cx: 1261, cy: 491, r: 266 }

const pctX = (x) => `${((x / SCENE_W) * 100).toFixed(4)}%`
const pctY = (y) => `${((y / SCENE_H) * 100).toFixed(4)}%`

/* ---------------------------------------------------------------------------
   Icons
--------------------------------------------------------------------------- */
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconPlay = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9.5 7.6v8.8c0 .6.7 1 1.2.7l6.9-4.4c.5-.3.5-1.1 0-1.4l-6.9-4.4c-.5-.3-1.2.1-1.2.7z" fill="currentColor" />
  </svg>
)

const IconEye = () => (
  <svg {...svgProps}>
    <g className="eye-lid-AboutPageMainSlider">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3.3" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="10.8" r="0.9" fill="#020A13" stroke="none" />
    </g>
  </svg>
)

const IconBrain = () => (
  <svg {...svgProps} strokeWidth={1.6}>
    <path d="M9.6 4.4a3 3 0 0 0-5 2.3 3 3 0 0 0-1.6 5.2 3 3 0 0 0 1.8 4.9 3 3 0 0 0 4.8 2.7V4.4z" />
    <path d="M14.4 4.4a3 3 0 0 1 5 2.3 3 3 0 0 1 1.6 5.2 3 3 0 0 1-1.8 4.9 3 3 0 0 1-4.8 2.7V4.4z" />
    <path className="brain-spark-AboutPageMainSlider" d="M9.6 9H7.4M9.6 14H6.8M14.4 9h2.2M14.4 14h2.8M7.4 9V7.6M16.6 9V7.6" />
  </svg>
)

const IconBars = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect className="bar-AboutPageMainSlider" style={{ '--b-AboutPageMainSlider': 0 }} x="3" y="13" width="4.2" height="8" rx="1.2" fill="currentColor" />
    <rect className="bar-AboutPageMainSlider" style={{ '--b-AboutPageMainSlider': 1 }} x="9.9" y="8" width="4.2" height="13" rx="1.2" fill="currentColor" />
    <rect className="bar-AboutPageMainSlider" style={{ '--b-AboutPageMainSlider': 2 }} x="16.8" y="3" width="4.2" height="18" rx="1.2" fill="currentColor" />
  </svg>
)

const IconGear = () => (
  <svg {...svgProps} strokeWidth={1.7}>
    <g className="gear-spin-AboutPageMainSlider">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  </svg>
)

const IconShield = () => (
  <svg {...svgProps}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path
      className="shield-core-AboutPageMainSlider"
      d="M12 7.4l3.6 1.35v3.15c0 2.45-2 4.05-3.6 4.85-1.6-.8-3.6-2.4-3.6-4.85V8.75z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

/* ZesCloud cloud mark (centre of the globe) */
const CloudMark = () => (
  <svg className="logo-cloud-AboutPageMainSlider" viewBox="0 0 120 76" aria-hidden="true">
    <defs>
      <linearGradient id="cloud-fill-AboutPageMainSlider" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8FD3FF" />
        <stop offset="0.45" stopColor="#4BA0FF" />
        <stop offset="1" stopColor="#1F5FE0" />
      </linearGradient>
      <linearGradient id="cloud-gloss-AboutPageMainSlider" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M33 73C17 73 7 62 7 48.5 7 35.6 16.6 25.4 29 24.2 33.6 11.8 45.6 3 59.6 3 76 3 89.6 15 91.8 30.8 105.6 31.8 115 43 115 52 115 63.6 105.6 73 94 73Z"
      fill="url(#cloud-fill-AboutPageMainSlider)"
    />
    <path
      d="M29 24.2C33.6 11.8 45.6 3 59.6 3 76 3 89.6 15 91.8 30.8 80 22 62 18 44 22 38 23.3 33 25 29 27Z"
      fill="url(#cloud-gloss-AboutPageMainSlider)"
    />
    <path className="logo-bolt-AboutPageMainSlider" d="M50 27l17 18.5h-7.5L73 62" fill="none" stroke="#071A3F" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ---------------------------------------------------------------------------
   Feature cards — measured from the screenshot and mapped into scene units
   (x, y = top-left, w, h). `from` = entrance direction.
--------------------------------------------------------------------------- */
const CARDS = [
  { key: 'monitor', title: 'Monitor', sub: 'See everything', Icon: IconEye, x: 817, y: 209, w: 314, h: 118, from: [-40, 0] },
  { key: 'understand', title: 'Understand', sub: 'Get AI insights', Icon: IconBrain, x: 1538, y: 226, w: 322, h: 121, from: [40, 0] },
  { key: 'predict', title: 'Predict', sub: 'Identify risks', Icon: IconBars, x: 1543, y: 403, w: 319, h: 119, from: [40, 0] },
  { key: 'automate', title: 'Automate', sub: 'Run workflows', Icon: IconGear, x: 1543, y: 576, w: 319, h: 118, from: [40, 0] },
  { key: 'recover', title: 'Recover', sub: 'Stay resilient', Icon: IconShield, x: 1347, y: 718, w: 305, h: 116, from: [0, 36] },
]

const CARD_STEP = 1.6 // seconds each card holds the spotlight
const CARD_CYCLE = CARD_STEP * CARDS.length

/* ZesCloud logo block (cloud + wordmark) — scene units */
const LOGO = { cx: 1284, top: 408 }

/* ---------------------------------------------------------------------------
   Orbit lines vectorised from the artwork (each point snapped onto the
   glowing orbit line). Packets and flow lights run exactly on them.
--------------------------------------------------------------------------- */
const ORBITS = [
  [[938, 191], [941.2, 199.9], [962.1, 237.8], [973, 261.6], [978.4, 277.2], [983.7, 287.4], [1000.7, 304.9], [1026.2, 327.3], [1035.1, 333.4], [1043, 337]],
  [[1043, 337], [1037.1, 310.7], [1035.4, 290.1], [1037, 263.9], [1041.8, 242.3], [1052, 219.3], [1063.2, 202.4], [1078, 188.1], [1098.4, 174.4], [1119.3, 167], [1141.8, 163.8], [1158.6, 163.7], [1182.9, 167.6], [1209.7, 176], [1231.8, 186.5], [1253.2, 200.6], [1273, 218]],
  [[952, 337], [940.3, 348.8], [919.7, 389.3], [901.5, 437.7], [877.9, 475.3], [872.7, 494], [871.9, 506.2], [872.7, 518.2], [876.4, 532.9], [885.6, 550.9], [898.6, 566.9], [912.9, 579.8], [928.5, 590.5], [946.7, 598.6], [989, 610]],
  [[929, 416], [941.4, 429.5], [958.7, 442.1], [977.3, 451], [1000, 458]],
  [[1518.9, 409.6], [1540.6, 384.8], [1558.1, 360.5], [1567.7, 342], [1574, 322.1], [1577.8, 295.5], [1576.8, 274.6], [1570.5, 251.7], [1561.4, 236.5], [1548.7, 224.2], [1531.1, 213.3], [1514.4, 207.1], [1496.8, 203.5], [1476, 202], [1455, 202.3], [1389.7, 210.1], [1366, 209]],
  [[1085.9, 697], [1035, 696.4], [1002.6, 691.2], [964, 676.5], [906.6, 660.1], [887.6, 651.4], [875.4, 642.9], [866.3, 631.6], [863.2, 620.8], [864.6, 609.7], [870.1, 599.4], [880.3, 588.7], [892.4, 579.9], [913.1, 567.9], [937.6, 556.7]],
  [[1521, 362.2], [1532.9, 359.8], [1549.4, 353.7], [1587, 335.7], [1609.9, 321.5], [1628.9, 307], [1641.8, 294.4], [1653, 280.4], [1661.3, 264.7], [1663.7, 253.4], [1662.1, 242.2], [1658, 234.7], [1649.5, 226.8], [1636.4, 219.9], [1610.9, 211.3], [1599.2, 208.8], [1581.4, 207.5]],
  [[1535.7, 725.5], [1536.4, 723], [1543.9, 719.6], [1563.8, 714.7], [1583.4, 707.4], [1604, 695.4], [1615.3, 685.6], [1623, 676.5], [1628.8, 666.2], [1632.6, 655.1], [1634.1, 640.4], [1633.3, 628.5], [1630.2, 613.9], [1625, 599.8], [1615.9, 580.9], [1605.1, 563], [1591.5, 543.4], [1579.4, 530.1]],
]

/* node dots detected on the artwork (exact centres of the glowing dots) */
const GLOBE_DOTS = [
  [1468, 445], [1312, 664], [1338, 357], [1169, 346], [1200, 250], [1285, 241], [1129, 296], [1178, 259], [1110, 608], [1374, 344],
  [1098, 302], [1310, 250], [1444, 402], [1049, 365], [1252, 664], [1018, 440], [1336, 284], [1408, 289], [1115, 557], [1018, 524],
  [1426, 307], [1170, 300], [1011, 461], [1118, 471], [1237, 248], [1448, 378], [1105, 386], [1201, 734], [1253, 741], [1380, 275],
  [1284, 732], [1115, 669], [1262, 567], [1454, 342], [1321, 735], [1261, 260], [1216, 348], [1356, 300], [1481, 484], [1164, 416],
  [1373, 702], [1047, 424], [1305, 488], [1099, 409], [1160, 637], [1245, 613], [1314, 278], [1353, 393], [1073, 520], [1127, 427],
  [1045, 554], [1264, 348],
]

const ORBIT_DOTS = [
  [1079, 187], [1273, 218], [1425, 205], [876, 533], [1617, 582], [1033, 154], [1567, 345], [1514, 650], [1173, 165], [919, 396],
  [904, 572], [1046, 231], [862, 621], [1218, 179], [1532, 395], [938, 191], [1036, 305], [872, 499], [989, 610], [923, 588],
  [969, 448], [973, 678], [952, 337], [929, 416], [1629, 667], [1545, 222], [996, 300], [1093, 251], [1033, 696], [1563, 237],
  [937, 670], [1443, 203], [1505, 724], [1534, 721], [1578, 426], [1362, 208], [1569, 538], [1665, 256],
]

/* brightest nodes in the artwork get a pulsing star flare */
const FLARES = [[1044, 339], [1263, 753], [1079, 187], [1273, 218], [1510, 419], [1094, 694], [1425, 205], [1157, 735], [999, 458]]

const PACKET_SPEED = 95 // scene units per second

const pathLength = (pts) =>
  pts.reduce((sum, p, i) => (i === 0 ? 0 : sum + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1])), 0)

const toD = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

const ORBIT_DATA = ORBITS.map((pts, i) => {
  const len = pathLength(pts)
  const dur = Math.max(1.4, len / PACKET_SPEED)
  return {
    d: toD(pts),
    reverse: i % 2 === 1,
    dur: dur.toFixed(2),
    begin: (-((i * 0.83) % dur)).toFixed(2),
    begin2: (-((i * 0.83 + dur / 2) % dur)).toFixed(2),
    flowDur: Math.max(1.8, len / 75).toFixed(2),
  }
})

/* deterministic rising particles around the globe */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  cx: 900 + ((i * 89) % 760),
  cy: 520 + ((i * 47) % 240),
  r: 1.1 + (i % 3) * 0.6,
  delay: `${((i * 0.57) % 7).toFixed(2)}s`,
  dur: `${6 + (i % 4) * 1.3}s`,
}))

/* ---------------------------------------------------------------------------
   Static SVG pieces (built once, never re-rendered)
--------------------------------------------------------------------------- */
const { cx: GX, cy: GY, r: GR } = GLOBE
const RIM_LEN = 2 * Math.PI * GR

const FX_DEFS = (
  <defs>
    <radialGradient id="packet-AboutPageMainSlider">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.35" stopColor="#E3F3FF" />
      <stop offset="0.6" stopColor="#7CC4FF" stopOpacity="0.5" />
      <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="dot-AboutPageMainSlider">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.4" stopColor="#CFEAFF" stopOpacity="0.9" />
      <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="halo-AboutPageMainSlider" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0.78" stopColor="#56B4FF" stopOpacity="0" />
      <stop offset="0.86" stopColor="#56B4FF" stopOpacity="0.32" />
      <stop offset="0.91" stopColor="#3989E2" stopOpacity="0.16" />
      <stop offset="1" stopColor="#1848D9" stopOpacity="0" />
    </radialGradient>

    <radialGradient id="core-AboutPageMainSlider" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#56B4FF" stopOpacity="0.28" />
      <stop offset="0.55" stopColor="#3989E2" stopOpacity="0.1" />
      <stop offset="1" stopColor="#1848D9" stopOpacity="0" />
    </radialGradient>

    <linearGradient id="sweep-AboutPageMainSlider" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#BFE6FF" stopOpacity="0" />
      <stop offset="0.5" stopColor="#E8F6FF" stopOpacity="0.2" />
      <stop offset="1" stopColor="#BFE6FF" stopOpacity="0" />
    </linearGradient>

    <linearGradient id="scan-AboutPageMainSlider" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#96D7FF" stopOpacity="0" />
      <stop offset="0.7" stopColor="#96D7FF" stopOpacity="0.14" />
      <stop offset="1" stopColor="#CFEAFF" stopOpacity="0" />
    </linearGradient>

    <radialGradient id="ripple-AboutPageMainSlider" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0.82" stopColor="#56B4FF" stopOpacity="0" />
      <stop offset="0.95" stopColor="#7CC4FF" stopOpacity="0.55" />
      <stop offset="1" stopColor="#56B4FF" stopOpacity="0" />
    </radialGradient>

    <clipPath id="globe-clip-AboutPageMainSlider">
      <circle cx={GX} cy={GY} r={GR - 2} />
    </clipPath>

    {/* one static blur, only used by the never-moving glow layer */}
    <filter id="bloom-AboutPageMainSlider" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
  </defs>
)

/* floor ripples spreading from the point where the globe touches the grid */
const FLOOR_LAYER = (
  <g className="floor-AboutPageMainSlider">
    {[0, 1, 2].map((k) => (
      <ellipse
        key={k}
        className="ripple-AboutPageMainSlider"
        cx={GX}
        cy={GY + GR + 8}
        rx={430}
        ry={48}
        fill="url(#ripple-AboutPageMainSlider)"
        style={{ '--delay-AboutPageMainSlider': `${k * 2}s` }}
      />
    ))}
  </g>
)

const GLOBE_LAYER = (
  <g className="globe-AboutPageMainSlider">
    {/* atmosphere halo */}
    <circle className="halo-AboutPageMainSlider" cx={GX} cy={GY} r={GR + 60} fill="url(#halo-AboutPageMainSlider)" />

    {/* light inside the globe */}
    <g clipPath="url(#globe-clip-AboutPageMainSlider)">
      <circle className="core-AboutPageMainSlider" cx={GX} cy={GY} r={GR} fill="url(#core-AboutPageMainSlider)" />
      <rect
        className="sweep-AboutPageMainSlider"
        x={GX - GR - 170}
        y={GY - GR}
        width={150}
        height={GR * 2}
        fill="url(#sweep-AboutPageMainSlider)"
        style={{ '--travel-AboutPageMainSlider': `${GR * 2 + 340}px` }}
      />
      <rect
        className="scan-AboutPageMainSlider"
        x={GX - GR}
        y={GY - GR - 60}
        width={GR * 2}
        height={60}
        fill="url(#scan-AboutPageMainSlider)"
        style={{ '--travel-AboutPageMainSlider': `${GR * 2 + 60}px` }}
      />
    </g>

    {/* rim: breathing outline + two light arcs travelling around it */}
    <circle className="rim-halo-AboutPageMainSlider" cx={GX} cy={GY} r={GR} />
    <circle className="rim-AboutPageMainSlider" cx={GX} cy={GY} r={GR} />
    <circle
      className="rim-arc-AboutPageMainSlider"
      cx={GX}
      cy={GY}
      r={GR}
      strokeDasharray={`${(RIM_LEN * 0.12).toFixed(1)} ${(RIM_LEN * 0.88).toFixed(1)}`}
    >
      <animateTransform attributeName="transform" type="rotate" from={`0 ${GX} ${GY}`} to={`360 ${GX} ${GY}`} dur="10s" repeatCount="indefinite" />
    </circle>
    <circle
      className="rim-arc-AboutPageMainSlider rim-arc-soft-AboutPageMainSlider"
      cx={GX}
      cy={GY}
      r={GR}
      strokeDasharray={`${(RIM_LEN * 0.07).toFixed(1)} ${(RIM_LEN * 0.93).toFixed(1)}`}
    >
      <animateTransform attributeName="transform" type="rotate" from={`200 ${GX} ${GY}`} to={`-160 ${GX} ${GY}`} dur="14s" repeatCount="indefinite" />
    </circle>
  </g>
)

/* soft bloom over every orbit — blurred once, then only its opacity breathes */
const BLOOM_LAYER = (
  <g className="bloom-AboutPageMainSlider" filter="url(#bloom-AboutPageMainSlider)">
    {ORBIT_DATA.map((o, i) => (
      <path key={i} d={o.d} />
    ))}
  </g>
)

const ORBIT_LAYER = (
  <g className="orbits-AboutPageMainSlider">
    {ORBIT_DATA.map((o, i) => {
      const motion = o.reverse ? { keyPoints: '1;0', keyTimes: '0;1', calcMode: 'linear' } : {}
      return (
        <g
          key={i}
          className={`orbit-AboutPageMainSlider${o.reverse ? ' orbit-rev-AboutPageMainSlider' : ''}`}
          style={{ '--i-AboutPageMainSlider': i, '--flow-dur-AboutPageMainSlider': `${o.flowDur}s` }}
        >
          <path d={o.d} pathLength="100" className="orbit-base-AboutPageMainSlider" />
          <path d={o.d} pathLength="100" className="orbit-flow-AboutPageMainSlider" />

          <circle r="7" className="packet-AboutPageMainSlider">
            <animateMotion dur={`${o.dur}s`} begin={`${o.begin}s`} repeatCount="indefinite" path={o.d} {...motion} />
          </circle>
          <circle r="3.6" className="packet-AboutPageMainSlider packet-small-AboutPageMainSlider">
            <animateMotion dur={`${o.dur}s`} begin={`${o.begin2}s`} repeatCount="indefinite" path={o.d} {...motion} />
          </circle>
        </g>
      )
    })}
  </g>
)

const DOT_LAYER = (
  <g className="dots-AboutPageMainSlider">
    {GLOBE_DOTS.map(([x, y], i) => (
      <circle
        key={`g${i}`}
        cx={x}
        cy={y}
        r="3.4"
        className="dot-AboutPageMainSlider dot-globe-AboutPageMainSlider"
        style={{ '--delay-AboutPageMainSlider': `${((i * 0.37) % 4).toFixed(2)}s` }}
      />
    ))}
    {ORBIT_DOTS.map(([x, y], i) => (
      <g key={`o${i}`} style={{ '--delay-AboutPageMainSlider': `${((i * 0.53) % 5).toFixed(2)}s` }}>
        {i % 3 === 0 ? <circle cx={x} cy={y} r="4" className="ping-AboutPageMainSlider" /> : null}
        <circle cx={x} cy={y} r="5" className="dot-AboutPageMainSlider dot-orbit-AboutPageMainSlider" />
      </g>
    ))}
  </g>
)

const FLARE_LAYER = (
  <g className="flares-AboutPageMainSlider">
    {FLARES.map(([x, y], i) => (
      <g
        key={i}
        className="flare-AboutPageMainSlider"
        style={{ '--delay-AboutPageMainSlider': `${((i * 0.9) % 6).toFixed(2)}s` }}
      >
        <ellipse cx={x} cy={y} rx="22" ry="1.3" />
        <ellipse cx={x} cy={y} rx="1.3" ry="22" />
        <circle cx={x} cy={y} r="7" className="flare-core-AboutPageMainSlider" />
      </g>
    ))}
  </g>
)

const PARTICLE_LAYER = (
  <g className="particles-AboutPageMainSlider">
    {PARTICLES.map((p, i) => (
      <circle
        key={i}
        cx={p.cx}
        cy={p.cy}
        r={p.r}
        className="particle-AboutPageMainSlider"
        style={{ '--delay-AboutPageMainSlider': p.delay, '--dur-AboutPageMainSlider': p.dur }}
      />
    ))}
  </g>
)

/* ---------------------------------------------------------------------------
   Cards
--------------------------------------------------------------------------- */
const FeatureCard = ({ card, index, placed }) => {
  const { key, title, sub, Icon } = card
  const style = placed
    ? {
        left: pctX(card.x),
        top: pctY(card.y),
        width: pctX(card.w),
        height: pctY(card.h),
        '--i-AboutPageMainSlider': index,
        '--from-x-AboutPageMainSlider': `${card.from[0]}px`,
        '--from-y-AboutPageMainSlider': `${card.from[1]}px`,
      }
    : { '--i-AboutPageMainSlider': index }

  return (
    <li className={placed ? 'card-pos-AboutPageMainSlider' : 'mcard-pos-AboutPageMainSlider'} style={style}>
      <article className={`card-AboutPageMainSlider card-${key}-AboutPageMainSlider`}>
        <span className="card-icon-AboutPageMainSlider">
          <Icon />
        </span>
        <span className="card-text-AboutPageMainSlider">
          <strong className="card-title-AboutPageMainSlider">{title}</strong>
          <span className="card-sub-AboutPageMainSlider">{sub}</span>
        </span>
      </article>
    </li>
  )
}

/* ---------------------------------------------------------------------------
   Left column content
--------------------------------------------------------------------------- */
const HeroContent = memo(function HeroContent({ storyHref, videoHref, onWatchVideo }) {
  const handleVideo = (e) => {
    if (onWatchVideo) {
      e.preventDefault()
      onWatchVideo()
    }
  }

  return (
    <div className="content-AboutPageMainSlider">
      <p className="eyebrow-AboutPageMainSlider reveal-AboutPageMainSlider" style={{ '--d-AboutPageMainSlider': '0.05s' }}>
       <BageZescloudAllComps badge=' About ZesCloud'/>
      </p>

      <h1 className="title-AboutPageMainSlider">
        <span className="title-line-AboutPageMainSlider">
          <span className="title-text-AboutPageMainSlider" style={{ '--d-AboutPageMainSlider': '0.18s' }}>
            A clearer way to operate <span style={{color:'var(--zescloud-primary)'}}>a complex world.</span>
          </span>
        </span>
        {/* <span className="title-line-AboutPageMainSlider">
          <span className="title-text-AboutPageMainSlider" style={{ '--d-AboutPageMainSlider': '0.3s' }}>
            
          </span>
        </span> */}
       
      </h1>

      <p className="lead-AboutPageMainSlider reveal-AboutPageMainSlider" style={{ '--d-AboutPageMainSlider': '0.62s' }}>
        ZesCloud helps businesses monitor, understand, automate, and optimize their infrastructure so they can
        operate with clarity, confidence, and control.
      </p>

      <div className="actions-AboutPageMainSlider reveal-AboutPageMainSlider" style={{ '--d-AboutPageMainSlider': '0.8s' }}>
        <a href={storyHref} className="zescloud-btn zescloud-btn-primary btn-story-AboutPageMainSlider">
          <span>Our Story</span>
          <span className="btn-arrow-AboutPageMainSlider">
            <IconArrow />
          </span>
        </a>

        <a href={videoHref} onClick={handleVideo} className="zescloud-btn zescloud-btn-outline btn-video-AboutPageMainSlider">
          <span className="btn-play-AboutPageMainSlider">
            <IconPlay />
          </span>
          <span>Watch Video</span>
        </a>
      </div>
    </div>
  )
})

/* ---------------------------------------------------------------------------
   Component
--------------------------------------------------------------------------- */
function AboutPageMainSlider({
  backgroundImage = HERO_BG_IMAGE,
  storyHref = '#our-story',
  videoHref = '#about-video',
  onWatchVideo,
}) {
  const sectionRef = useRef(null)
  const fxRef = useRef(null)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)

  // perf: animations only run while the hero is on screen and the tab is visible
  const running = inView && pageVisible

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '120px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const onVisibility = () => setPageVisible(document.visibilityState !== 'hidden')
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // pause / resume the SVG (SMIL) packet + rim animations together with the CSS ones
  useEffect(() => {
    const svg = fxRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return
    if (running) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [running])

  return (
    <section
      ref={sectionRef}
      className={`hero-AboutPageMainSlider${running ? '' : ' is-paused-AboutPageMainSlider'}`}
      style={{
        '--card-step-AboutPageMainSlider': `${CARD_STEP}s`,
        '--card-cycle-AboutPageMainSlider': `${CARD_CYCLE}s`,
      }}
    >
      {/* artwork: image + animated overlay + logo + cards share one fixed-ratio scene */}
      <div className="art-AboutPageMainSlider">
        <div className="scene-AboutPageMainSlider">
          {backgroundImage ? (
            <img
              className="scene-img-AboutPageMainSlider"
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              draggable="false"
              decoding="async"
              fetchPriority="high"
              style={{ width: pctX(ART_W) }}
            />
          ) : null}

          <svg
            ref={fxRef}
            className="fx-AboutPageMainSlider"
            viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {FX_DEFS}
            {FLOOR_LAYER}
            {GLOBE_LAYER}
            {BLOOM_LAYER}
            {ORBIT_LAYER}
            {DOT_LAYER}
            {FLARE_LAYER}
            {PARTICLE_LAYER}
          </svg>

          {/* ZesCloud mark in the centre of the globe */}
          <div className="logo-AboutPageMainSlider" style={{ left: pctX(LOGO.cx), top: pctY(LOGO.top) }} aria-hidden="true">
            {/* <span className="logo-ring-AboutPageMainSlider" /> */}
            {/* <span className="logo-ring-AboutPageMainSlider logo-ring-2-AboutPageMainSlider" /> */}
            {/* <CloudMark /> */}
            {/* <img src="/main_logoFav.png" alt="" width={240} style={{marginTop:'-60px'}}/> */}
            {/* <span className="logo-word-AboutPageMainSlider">ZesCloud</span> */}
          </div>

          <ul className="cards-AboutPageMainSlider" aria-label="What ZesCloud does">
            {CARDS.map((card, i) => (
              <FeatureCard key={card.key} card={card} index={i} placed />
            ))}
          </ul>
        </div>
      </div>

      <div className="shade-AboutPageMainSlider" aria-hidden="true" />

      <div className="container-AboutPageMainSlider">
        <HeroContent storyHref={storyHref} videoHref={videoHref} onWatchVideo={onWatchVideo} />
      </div>

      {/* phones: the same cards as a readable grid under the globe */}
      <ul className="mcards-AboutPageMainSlider" aria-label="What ZesCloud does">
        {CARDS.map((card, i) => (
          <FeatureCard key={card.key} card={card} index={i} placed={false} />
        ))}
      </ul>
    </section>
  )
}

export default AboutPageMainSlider