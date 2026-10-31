import React from 'react'
import './ContactUsPageSlider.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

const featuresContactUsPageSlider = [
  {
    title: 'Talk to Experts',
    text: 'Get the right guidance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4.5h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-8.5L6 20.5v-3.5H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
      </svg>
    ),
  },
  {
    title: 'Custom Solutions',
    text: 'Built for your needs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
  {
    title: 'Fast Response',
    text: 'We\u2019ll get back to you soon',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.2 2.2 4.6 13.1c-.36.46-.03 1.13.55 1.13h5.35l-1.2 7.1c-.11.66.73 1.03 1.15.5l8.6-10.9c.36-.46.03-1.13-.55-1.13h-5.35l1.2-7.1c.11-.66-.73-1.03-1.15-.5Z" />
      </svg>
    ),
  },
]

const tagsContactUsPageSlider = [
  { label: 'Questions', className: 'tagOneContactUsPageSlider' },
  { label: 'Projects', className: 'tagTwoContactUsPageSlider' },
  { label: 'Partnerships', className: 'tagThreeContactUsPageSlider' },
  { label: 'Support', className: 'tagFourContactUsPageSlider' },
]

/* Flowing light lines: "rise" bundle sweeps bottom-left -> top-right,
   "flow" bundle sweeps left-middle -> bottom-right (they cross in the middle) */
const risePathsContactUsPageSlider = [
  'M 40 480 C 220 420, 300 330, 400 220 S 560 30, 720 -20',
  'M 0 470 C 190 400, 280 310, 380 200 S 540 20, 700 -30',
  'M 90 490 C 260 430, 330 350, 430 240 S 600 50, 740 0',
  'M -30 440 C 160 380, 250 290, 360 185 S 520 10, 680 -40',
  'M 140 500 C 300 450, 370 370, 460 265 S 620 80, 760 30',
]

const flowPathsContactUsPageSlider = [
  'M -40 250 C 120 230, 230 200, 330 225 S 560 340, 760 430',
  'M -40 275 C 130 255, 240 225, 340 250 S 560 360, 760 455',
  'M -40 230 C 110 215, 220 185, 320 205 S 560 320, 760 405',
  'M -40 300 C 140 280, 250 250, 350 275 S 570 385, 760 480',
]

function ContactUsPageSlider() {
  return (
    <section className="heroSectionContactUsPageSlider" aria-labelledby="contactUsPageSliderTitle">
      {/* Background layers */}
      <div className="bgGridContactUsPageSlider" aria-hidden="true" />
      <div className="bgGlowContactUsPageSlider" aria-hidden="true" />

      {/* Right side animated visual */}
      <div className="visualWrapContactUsPageSlider" aria-hidden="true">
        <div className="visualDotsContactUsPageSlider" />

        <span className="beamContactUsPageSlider beamOneContactUsPageSlider" />
        <span className="beamContactUsPageSlider beamTwoContactUsPageSlider" />
        <span className="beamContactUsPageSlider beamThreeContactUsPageSlider" />
        <span className="beamContactUsPageSlider beamFourContactUsPageSlider" />

        <svg
          className="linesSvgContactUsPageSlider"
          viewBox="0 0 700 460"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="riseGradContactUsPageSlider" x1="0" y1="460" x2="700" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1848D9" stopOpacity="0" />
              <stop offset="35%" stopColor="#1848D9" stopOpacity="0.7" />
              <stop offset="65%" stopColor="#3989E2" stopOpacity="1" />
              <stop offset="100%" stopColor="#56B4FF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="flowGradContactUsPageSlider" x1="0" y1="230" x2="760" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1848D9" stopOpacity="0" />
              <stop offset="30%" stopColor="#1848D9" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#3989E2" stopOpacity="1" />
              <stop offset="100%" stopColor="#56B4FF" stopOpacity="0.35" />
            </linearGradient>
            <filter id="glowContactUsPageSlider" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlowContactUsPageSlider" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          {/* Soft wide glow under the bundles */}
          <path d={risePathsContactUsPageSlider[0]} className="haloLineContactUsPageSlider" stroke="url(#riseGradContactUsPageSlider)" filter="url(#softGlowContactUsPageSlider)" />
          <path d={flowPathsContactUsPageSlider[0]} className="haloLineContactUsPageSlider" stroke="url(#flowGradContactUsPageSlider)" filter="url(#softGlowContactUsPageSlider)" />

          {/* Base lines (draw in on load) */}
          <g filter="url(#glowContactUsPageSlider)">
            {risePathsContactUsPageSlider.map((d, i) => (
              <path
                key={`rise-${i}`}
                id={`risePathContactUsPageSlider${i}`}
                d={d}
                pathLength="1000"
                className={`baseLineContactUsPageSlider ${i === 0 ? 'mainLineContactUsPageSlider' : ''}`}
                stroke="url(#riseGradContactUsPageSlider)"
                style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              />
            ))}
            {flowPathsContactUsPageSlider.map((d, i) => (
              <path
                key={`flow-${i}`}
                id={`flowPathContactUsPageSlider${i}`}
                d={d}
                pathLength="1000"
                className={`baseLineContactUsPageSlider ${i === 0 ? 'mainLineContactUsPageSlider' : ''}`}
                stroke="url(#flowGradContactUsPageSlider)"
                style={{ animationDelay: `${0.5 + i * 0.12}s` }}
              />
            ))}
          </g>

          {/* Moving light streaks travelling along the lines */}
          <g filter="url(#glowContactUsPageSlider)">
            {risePathsContactUsPageSlider.map((d, i) => (
              <path
                key={`rise-streak-${i}`}
                d={d}
                pathLength="1000"
                className="streakLineContactUsPageSlider"
                style={{ animationDuration: `${4 + i * 0.7}s`, animationDelay: `${1.6 + i * 0.6}s` }}
              />
            ))}
            {flowPathsContactUsPageSlider.map((d, i) => (
              <path
                key={`flow-streak-${i}`}
                d={d}
                pathLength="1000"
                className="streakLineContactUsPageSlider"
                style={{ animationDuration: `${4.6 + i * 0.8}s`, animationDelay: `${2 + i * 0.7}s` }}
              />
            ))}
          </g>

          {/* Glowing particles riding the paths */}
          <g className="particlesContactUsPageSlider">
            {[0, 1, 2, 3].map((i) => (
              <circle key={`rise-dot-${i}`} r={i === 0 ? 3 : 2} opacity="0" className="particleDotContactUsPageSlider" filter="url(#glowContactUsPageSlider)">
                <animateMotion dur={`${5 + i * 1.3}s`} begin={`${1.5 + i * 0.9}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#risePathContactUsPageSlider${i}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${5 + i * 1.3}s`} begin={`${1.5 + i * 0.9}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {[0, 1, 2].map((i) => (
              <circle key={`flow-dot-${i}`} r={i === 0 ? 3 : 2} opacity="0" className="particleDotContactUsPageSlider" filter="url(#glowContactUsPageSlider)">
                <animateMotion dur={`${6 + i * 1.4}s`} begin={`${2 + i * 1.1}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#flowPathContactUsPageSlider${i}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${6 + i * 1.4}s`} begin={`${2 + i * 1.1}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>

          {/* Twinkling sparks */}
          <g className="sparksContactUsPageSlider">
            <circle cx="430" cy="165" r="2.2" style={{ animationDelay: '0s' }} />
            <circle cx="300" cy="230" r="1.8" style={{ animationDelay: '0.8s' }} />
            <circle cx="510" cy="300" r="1.6" style={{ animationDelay: '1.6s' }} />
            <circle cx="180" cy="320" r="1.6" style={{ animationDelay: '2.2s' }} />
            <circle cx="600" cy="360" r="1.8" style={{ animationDelay: '1.1s' }} />
            <circle cx="360" cy="270" r="1.4" style={{ animationDelay: '2.8s' }} />
            <circle cx="560" cy="110" r="1.4" style={{ animationDelay: '0.4s' }} />
            <circle cx="250" cy="390" r="1.4" style={{ animationDelay: '3.2s' }} />
          </g>
        </svg>

        {/* Bright flare where the lines are strongest */}
        <span className="flareContactUsPageSlider" />

        {/* Floating glass tags */}
        {tagsContactUsPageSlider.map((tag) => (
          <div key={tag.label} className={`tagContactUsPageSlider ${tag.className}`}>
            <div className="tagInnerContactUsPageSlider">
              <span className="tagDotContactUsPageSlider" />
              <span className="tagLabelContactUsPageSlider">{tag.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Left content */}
      <div className="zescloud-container containerContactUsPageSlider">
        <div className="contentContactUsPageSlider">
          <div className="eyebrowContactUsPageSlider">
            <span className="eyebrowTextContactUsPageSlider"><BageZescloudAllComps badge='Contact Us'/></span>
            {/* <span className="eyebrowLineContactUsPageSlider" /> */}
          </div>

          <h1 id="contactUsPageSliderTitle" className="titleContactUsPageSlider">
            <span className="titleLineContactUsPageSlider">Let&rsquo;s Build a</span>
            <span className="titleHighlightContactUsPageSlider">Clearer Way to Operate.</span>
          </h1>

          <p className="descContactUsPageSlider">
            Have a question, a project in mind, or want to learn more about ZesCloud? We&rsquo;d love to hear from you.
          </p>

          <ul className="featuresContactUsPageSlider">
            {featuresContactUsPageSlider.map((item, i) => (
              <li
                key={item.title}
                className="featureItemContactUsPageSlider"
                style={{ animationDelay: `${0.75 + i * 0.12}s` }}
              >
                <span className="featureIconContactUsPageSlider">{item.icon}</span>
                <span className="featureTextWrapContactUsPageSlider">
                  <span className="featureTitleContactUsPageSlider">{item.title}</span>
                  <span className="featureSubContactUsPageSlider">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span className="bottomLineContactUsPageSlider" aria-hidden="true" />
    </section>
  )
}

export default ContactUsPageSlider