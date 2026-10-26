'use client'

import React, { useId } from 'react'
import './GroundHexLogo.css'

/* =========================================================
   GroundHexLogo
   The brand logo drawn as a flat 2D SVG, laid flat on the
   ground (perspective tilt) and slowly turning in place, so it
   sits on the hexagon platform of the background image.

   Place it inside the element that shows the background image
   (that element must have position: relative).

     <GroundHexLogo />
     <GroundHexLogo x="48.7%" y="59.3%" size="34%" tilt={56} spin={24} />

   x / y  -> centre of the hexagon platform (relative to parent)
   size   -> logo width (relative to parent width)
   tilt   -> how far it is laid back onto the floor (deg)
   spin   -> seconds for one full turn
   ========================================================= */

const SUFFIX = 'GroundHexLogo'
const cn = (...names) =>
  names
    .filter(Boolean)
    .map((n) => `${n}-${SUFFIX}`)
    .join(' ')

/* ---------- Logo geometry, traced from ZesFavIcon.png (1080 x 1080) ---------- */

const SHAPES = {
  // upper hexagon band (ends with the diagonal cut on the right)
  topBand: '185,334 540,131 856,313 769,371 540,239 279,389',
  // left bar + bottom chevron + right bar
  lowerBand: '185,339 185,745 540,950 895,745 895,378 802,425 802,691 540,842 278,691 278,392',
  // inner cube
  cubeTop: '540,336 693,424 545,522 373,433',
  cubeLeft: '364,443 438,488 438,555 540,614 540,745 364,643',
  cubeRight: '540,557 716,468 716,643 540,745',
}

/* pointy-top hexagon points around (cx, cy) */
const hex = (r, cx = 500, cy = 500) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')

function GroundHexLogo({ x = '48.7%', y = '59.3%', size = '34%', tilt = 56, spin = 24, className = '', style }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name) => `ghl-${uid}-${name}`
  const url = (name) => `url(#${id(name)})`

  return (
    <div
      className={[cn('root'), className].filter(Boolean).join(' ')}
      style={{
        '--ghl-x': x,
        '--ghl-y': y,
        '--ghl-size': size,
        '--ghl-tilt': `${tilt}deg`,
        '--ghl-spin': `${spin}s`,
        ...style,
      }}
      aria-hidden="true"
    >
      <div className={cn('plane')}>
        {/* soft light pool on the floor */}
        <span className={cn('halo')} />

        {/* floor rings: hex ring and dashed circle turn the opposite way */}
        <svg className={cn('rings')} viewBox="0 0 1000 1000" focusable="false">
          <g className={cn('ringReverse')}>
            <polygon points={hex(470)} className={cn('ringHex')} />
          </g>
          <g className={cn('ringForward')}>
            <circle cx="500" cy="500" r="492" className={cn('ringCircle')} />
          </g>
          <polygon points={hex(420)} className={cn('ripple')} />
          <polygon points={hex(420)} className={cn('ripple', 'rippleLate')} />
        </svg>

        {/* the logo — turns with the platform */}
        <div className={cn('spin')}>
          <svg className={cn('logo')} viewBox="130 130 820 820" focusable="false">
            <defs>
              <linearGradient id={id('top')} gradientUnits="userSpaceOnUse" x1="560" y1="200" x2="840" y2="330">
                <stop offset="0" stopColor="#009EFF" />
                <stop offset="0.4" stopColor="#0067F0" />
                <stop offset="1" stopColor="#0E20DF" />
              </linearGradient>

              <linearGradient id={id('lower')} gradientUnits="userSpaceOnUse" x1="200" y1="700" x2="580" y2="900">
                <stop offset="0" stopColor="#009EFF" />
                <stop offset="0.1" stopColor="#007CF6" />
                <stop offset="0.5" stopColor="#002DE0" />
                <stop offset="0.75" stopColor="#3A08E2" />
                <stop offset="0.92" stopColor="#5103E4" />
                <stop offset="1" stopColor="#5800E4" />
              </linearGradient>

              <linearGradient id={id('cubeTop')} gradientUnits="userSpaceOnUse" x1="373" y1="430" x2="693" y2="430">
                <stop offset="0" stopColor="#12B8FF" />
                <stop offset="0.1" stopColor="#0BA6FF" />
                <stop offset="0.52" stopColor="#005FEE" />
                <stop offset="0.9" stopColor="#002DE0" />
                <stop offset="1" stopColor="#0028DE" />
              </linearGradient>

              <linearGradient id={id('cubeLeft')} gradientUnits="userSpaceOnUse" x1="370" y1="450" x2="540" y2="740">
                <stop offset="0" stopColor="#0080F6" />
                <stop offset="0.5" stopColor="#0050EA" />
                <stop offset="1" stopColor="#1030D3" />
              </linearGradient>

              <linearGradient id={id('cubeRight')} gradientUnits="userSpaceOnUse" x1="540" y1="660" x2="716" y2="520">
                <stop offset="0" stopColor="#0035E3" />
                <stop offset="1" stopColor="#0822DB" />
              </linearGradient>

              <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <clipPath id={id('clip')}>
                {Object.values(SHAPES).map((pts) => (
                  <polygon key={pts} points={pts} />
                ))}
              </clipPath>
            </defs>
             <polygon points="540,131 895,336 895,745 540,950 185,745 185,336" fill="var(--zescloud-bg-base)" />   
            <polygon points={SHAPES.lowerBand} fill={url('lower')} />
            <polygon points={SHAPES.topBand} fill={url('top')} />
            <polygon points={SHAPES.cubeLeft} fill={url('cubeLeft')} />
            <polygon points={SHAPES.cubeRight} fill={url('cubeRight')} />
            <polygon points={SHAPES.cubeTop} fill={url('cubeTop')} />

            {/* light sweep across the logo */}
            <g clipPath={url('clip')}>
              <g transform="rotate(20 540 540)">
                <rect className={cn('sweep')} x="-300" y="-200" width="170" height="1480" fill={url('sheen')} />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default GroundHexLogo