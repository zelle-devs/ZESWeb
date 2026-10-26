'use client';

import React, { useEffect, useRef, useState } from 'react';
import './TrustedRunningSolutions.css';
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps';

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="m2 12 10 5 10-5" />
    <path d="m2 17 10 5 10-5" />
  </svg>
);

const PulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12h3l2.5-6 3.5 12 3-9 2 3h6" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 2 5 13.5h6L10 22l9-12h-6l.5-8Z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </svg>
);

const BarsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <rect x="3" y="14" width="4" height="7" rx="1" />
    <rect x="10" y="9" width="4" height="12" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);

/* ---------- Data ---------- */
const FEATURES = [
  {
    id: 'unified',
    title: 'Unified Platform',
    description: 'All your operational intelligence in one platform.',
    Icon: LayersIcon,
    accent: 'var(--zescloud-accent-cyan)',
    accentBg: 'var(--zescloud-bg-badge)',
  },
  {
    id: 'ai',
    title: 'AI-Powered',
    description: 'Intelligence that helps your team understand and improve.',
    Icon: PulseIcon,
    accent: 'var(--zescloud-status-purple)',
    accentBg: 'var(--zescloud-status-purple-bg)',
  },
  {
    id: 'resolution',
    title: 'Faster Resolution',
    description: 'Move from detection to action faster.',
    Icon: BoltIcon,
    accent: 'var(--zescloud-status-danger)',
    accentBg: 'var(--zescloud-status-danger-bg)',
  },
  {
    id: 'confidence',
    title: 'Operational Confidence',
    description: 'Know the state of your infrastructure before users do.',
    Icon: ShieldIcon,
    accent: 'var(--zescloud-status-healthy)',
    accentBg: 'var(--zescloud-status-healthy-bg)',
  },
  {
    id: 'scale',
    title: 'Built for Scale',
    description: 'Designed to grow from small environments to enterprise operations.',
    Icon: BarsIcon,
    accent: 'var(--zescloud-primary)',
    accentBg: 'var(--zescloud-bg-badge)',
  },
];

/* ---------- Component ---------- */
function TrustedRunningSolutions() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`zescloud-section sectionTrustedRunningSolutions ${
        isVisible ? 'isVisibleTrustedRunningSolutions' : ''
      }`}
      aria-labelledby="trusted-running-heading"
    >
      <div className="bgGlowTrustedRunningSolutions" aria-hidden="true" />
      <div className="bgGridTrustedRunningSolutions" aria-hidden="true" />

      <div className="zescloud-container containerTrustedRunningSolutions">
        <header className="headerTrustedRunningSolutions">
          <span
            className="eyebrowTrustedRunningSolutions revealTrustedRunningSolutions"
            style={{ '--delay': '0ms' }}
          >
            <BageZescloudAllComps badge='Why teams choose ZesCloud'/>
          </span>

          <h2
            id="trusted-running-heading"
            className="titleTrustedRunningSolutions revealTrustedRunningSolutions"
            style={{ '--delay': '120ms' }}
          >
            Built for real operations.{' '}
            <span className="titleGradientTrustedRunningSolutions">
              Trusted to keep them running.
            </span>
          </h2>
        </header>

        <ul className="gridTrustedRunningSolutions">
          {FEATURES.map(({ id, title, description, Icon, accent, accentBg }, index) => (
            <li
              key={id}
              className="cardTrustedRunningSolutions revealTrustedRunningSolutions"
              style={{
                '--card-accent': accent,
                '--card-accent-bg': accentBg,
                '--delay': `${250 + index * 110}ms`,
              }}
            >
              <span className="cardShineTrustedRunningSolutions" aria-hidden="true" />

              <div className="iconWrapTrustedRunningSolutions">
                <Icon />
              </div>

              <h3 className="cardTitleTrustedRunningSolutions">{title}</h3>
              <p className="cardTextTrustedRunningSolutions">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TrustedRunningSolutions;