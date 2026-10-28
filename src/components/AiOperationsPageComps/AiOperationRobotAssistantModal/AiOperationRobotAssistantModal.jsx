'use client';

import React, { useEffect, useRef, useState } from 'react';
import AiOperationRobotAssistantModalRobot from './AiOperationRobotAssistantModalRobot';
import './AiOperationRobotAssistantModal.css';
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps';

/* ------------------------------------------------------------------ */
/* Flowing "current" wave background (no grid)                         */
/* Paths are generated once at module load: deterministic, SSR-safe.   */
/* Each path repeats every 1440 units, so translating the 2880-wide    */
/* layer by -50% loops seamlessly.                                     */
/* ------------------------------------------------------------------ */
const WAVE_WIDTH = 2880;

function buildWavePath({ baseY, amp, period, phase }) {
  let d = '';
  for (let x = 0; x <= WAVE_WIDTH; x += 16) {
    const t = (x / period) * Math.PI * 2;
    const y =
      baseY +
      Math.sin(t + phase) * amp +
      Math.sin((x / 720) * Math.PI * 2 + phase * 1.6) * amp * 0.22;
    d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)} `;
  }
  return d.trim();
}

const WAVE_BUNDLES = [
  {
    key: 'A',
    lines: Array.from({ length: 8 }, (_, i) => ({
      d: buildWavePath({ baseY: 372 + i * 9, amp: 56 + i * 3, period: 1440, phase: i * 0.13 }),
      opacity: 0.5 - Math.abs(i - 3.5) * 0.09,
    })),
  },
  {
    key: 'B',
    lines: Array.from({ length: 6 }, (_, i) => ({
      d: buildWavePath({ baseY: 482 + i * 8, amp: 30 + i * 2, period: 720, phase: 1.4 + i * 0.16 }),
      opacity: 0.38 - Math.abs(i - 2.5) * 0.08,
    })),
  },
  {
    key: 'C',
    lines: Array.from({ length: 5 }, (_, i) => ({
      d: buildWavePath({ baseY: 140 + i * 11, amp: 40, period: 1440, phase: 2.6 + i * 0.1 }),
      opacity: 0.28 - Math.abs(i - 2) * 0.07,
    })),
  },
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */
const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const IconInvestigate = () => (
  <svg {...iconProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
    <path d="M14 3v5h5" />
    <path d="M19 8v2.5" />
    <circle cx="16.5" cy="15.5" r="3" />
    <path d="m21 20-2.3-2.3" />
    <path d="M8.5 9h2.5M8.5 12.5h3" />
  </svg>
);

const IconExplain = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.3a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2.2-2.4 3.7" />
    <path d="M12 17.2h.01" />
  </svg>
);

const IconExecute = () => (
  <svg {...iconProps}>
    <path d="M9 3h6" />
    <path d="M10 3v6.2L4.8 18.4A1.8 1.8 0 0 0 6.4 21h11.2a1.8 1.8 0 0 0 1.6-2.6L14 9.2V3" />
    <path d="M7.2 15h9.6" />
  </svg>
);

const IconAnswer = () => (
  <svg {...iconProps}>
    <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12Z" />
    <path d="M9.8 10a2.3 2.3 0 0 1 4.4.9c0 1.5-2.2 1.9-2.2 3.2" />
    <path d="M12 16.6h.01" />
  </svg>
);

const IconGenerate = () => (
  <svg {...iconProps}>
    <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9" />
    <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9" />
    <path d="M18.5 3v3.4h-3.4" />
    <path d="M5.5 21v-3.4h3.4" />
    <path d="m12 8.6.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9Z" />
  </svg>
);

const IconArrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Cards around the robot (positions match the reference screenshot)  */
/* ------------------------------------------------------------------ */
const CAPABILITY_CARDS = [
  { id: 'investigate', lines: ['Investigate', 'incidents'], tone: 'cyan', side: 'left', pos: 'investigate', arrow: true, Icon: IconInvestigate },
  { id: 'explain', lines: ['Explain', 'issues'], tone: 'purple', side: 'left', pos: 'explain', arrow: true, Icon: IconExplain },
  { id: 'execute', lines: ['Execute', 'approved actions'], tone: 'rose', side: 'left', pos: 'execute', arrow: false, Icon: IconExecute },
  { id: 'answer', lines: ['Answer', 'questions'], tone: 'teal', side: 'right', pos: 'answer', arrow: false, Icon: IconAnswer },
  { id: 'generate', lines: ['Generate', 'recommendations'], tone: 'violet', side: 'right', pos: 'generate', arrow: false, Icon: IconGenerate },
];

function AiOperationRobotAssistantModal({ ctaHref = '#', ctaLabel = 'Ask Zes AI', onCtaClick }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.22 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-AiOperationRobotAssistantModal ${isVisible ? 'isVisible-AiOperationRobotAssistantModal' : ''}`}
      aria-labelledby="heading-AiOperationRobotAssistantModal"
    >
      {/* ---------- Background: flowing current waves + soft glows ---------- */}
      <div className="background-AiOperationRobotAssistantModal" aria-hidden="true">
        <span className="glow-AiOperationRobotAssistantModal glowRobot-AiOperationRobotAssistantModal" />
        <span className="glow-AiOperationRobotAssistantModal glowContent-AiOperationRobotAssistantModal" />
        <div className="waves-AiOperationRobotAssistantModal">
          {WAVE_BUNDLES.map((bundle) => (
            <div
              key={bundle.key}
              className={`waveLayer-AiOperationRobotAssistantModal waveLayer${bundle.key}-AiOperationRobotAssistantModal`}
            >
              <svg
                className="waveSvg-AiOperationRobotAssistantModal"
                viewBox={`0 0 ${WAVE_WIDTH} 600`}
                preserveAspectRatio="none"
                focusable="false"
              >
                {bundle.lines.map((line, i) => (
                  <path
                    key={i}
                    d={line.d}
                    className="wavePath-AiOperationRobotAssistantModal"
                    style={{ opacity: Math.max(0.06, line.opacity) }}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            </div>
          ))}
        </div>
        <span className="fadeTop-AiOperationRobotAssistantModal" />
        <span className="fadeBottom-AiOperationRobotAssistantModal" />
      </div>

      <div className="container-AiOperationRobotAssistantModal">
        {/* ---------- Left: 3D robot + capability cards ---------- */}
        <div className="visual-AiOperationRobotAssistantModal">
          <div className="robotStage-AiOperationRobotAssistantModal">
            <AiOperationRobotAssistantModalRobot />
          </div>

          <ul className="cards-AiOperationRobotAssistantModal" aria-label="What Zes AI Copilot can do">
            {CAPABILITY_CARDS.map((card, index) => {
              const { Icon } = card;
              return (
                <li
                  key={card.id}
                  className={`cardSlot-AiOperationRobotAssistantModal cardSlot-${card.pos}-AiOperationRobotAssistantModal cardSlot-${card.side}-AiOperationRobotAssistantModal`}
                  style={{ '--card-index': index }}
                >
                  <div className="cardFloat-AiOperationRobotAssistantModal">
                    <div className={`card-AiOperationRobotAssistantModal card-${card.tone}-AiOperationRobotAssistantModal`}>
                      <span className="cardIcon-AiOperationRobotAssistantModal">
                        <Icon />
                      </span>
                      <span className="cardText-AiOperationRobotAssistantModal">
                        <span>{card.lines[0]}</span>
                        <span className="cardTextLast-AiOperationRobotAssistantModal">
                          {card.lines[1]}
                          {card.arrow && (
                            <span className="cardArrow-AiOperationRobotAssistantModal">
                              <IconArrow size={13} />
                            </span>
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- Right: content ---------- */}
        <div className="content-AiOperationRobotAssistantModal">
          <span className="eyebrow-AiOperationRobotAssistantModal reveal-AiOperationRobotAssistantModal" style={{ '--reveal-delay': '0.15s' }}>
           <BageZescloudAllComps badge='Meet Zes AI Copilot'/>
          </span>

          <h2 id="heading-AiOperationRobotAssistantModal" className="heading-AiOperationRobotAssistantModal">
            <span className="headingLine-AiOperationRobotAssistantModal">
              <span className="headingInner-AiOperationRobotAssistantModal" style={{ '--reveal-delay': '0.25s' }}>
                Your AI Operations
              </span>
            </span>
            <span className="headingLine-AiOperationRobotAssistantModal">
              <span
                className="headingInner-AiOperationRobotAssistantModal headingAccent-AiOperationRobotAssistantModal"
                style={{ '--reveal-delay': '0.38s' }}
              >
                Assistant.
              </span>
            </span>
          </h2>

          <p className="text-AiOperationRobotAssistantModal reveal-AiOperationRobotAssistantModal" style={{ '--reveal-delay': '0.55s' }}>
            Ask questions, investigate incidents, get explanations, and execute approved actions using natural language.
          </p>
          <p className="text-AiOperationRobotAssistantModal reveal-AiOperationRobotAssistantModal" style={{ '--reveal-delay': '0.68s' }}>
            Zes AI helps your team operate infrastructure with greater speed and confidence without replacing human judgment.
          </p>

          <div className="actions-AiOperationRobotAssistantModal reveal-AiOperationRobotAssistantModal" style={{ '--reveal-delay': '0.82s' }}>
            <a href={ctaHref} onClick={onCtaClick} className="cta-AiOperationRobotAssistantModal">
              <span>{ctaLabel}</span>
              <span className="ctaArrow-AiOperationRobotAssistantModal">
                <IconArrow size={16} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiOperationRobotAssistantModal;