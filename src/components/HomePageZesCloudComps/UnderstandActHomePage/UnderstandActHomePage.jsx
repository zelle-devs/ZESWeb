"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Server,
  AppWindow,
  Globe2,
  ShieldCheck,
  Zap,
  BarChart3,
  ChevronDown,
  Bell,
  Settings,
  Cloud,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  AlertTriangle,
} from 'lucide-react';
import './UnderstandActHomePage.css';

/* Sidebar nav - first item is the active one, same as the screenshot */
const NAV_ITEMS_UnderstandActHomePage = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard, active: true },
  { key: 'infrastructure', label: 'Infrastructure', icon: Server },
  { key: 'applications', label: 'Applications', icon: AppWindow },
  { key: 'websites', label: 'Websites', icon: Globe2 },
  { key: 'security', label: 'Security', icon: ShieldCheck },
  { key: 'automation', label: 'Automation', icon: Zap },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
];

/* Bottom stat row */
const STATS_UnderstandActHomePage = [
  { key: 'servers', label: 'Servers', value: '24', note: 'Active', statusClass: 'ok', icon: CheckCircle2 },
  { key: 'applications', label: 'Applications', value: '12', note: 'Healthy', statusClass: 'ok', icon: HeartPulse },
  { key: 'websites', label: 'Websites', value: '18', note: 'Online', statusClass: 'ok', icon: Globe2 },
  { key: 'security', label: 'Security', value: '0', note: 'Threats', statusClass: 'flat', icon: AlertTriangle },
];

/* Rough world-map pin positions, as % of the map box (lon/lat mapped
   loosely onto a 2:1 box) so they read like the screenshot's glowing
   clusters without needing a mapping library. */
const MAP_PINS_UnderstandActHomePage = [
  { key: 'na', top: '34%', left: '16%', size: 'lg' },
  { key: 'sa', top: '64%', left: '27%', size: 'sm' },
  { key: 'eu', top: '28%', left: '47%', size: 'md' },
  { key: 'af', top: '56%', left: '49%', size: 'sm' },
  { key: 'me', top: '40%', left: '58%', size: 'sm' },
  { key: 'as1', top: '32%', left: '70%', size: 'lg' },
  { key: 'as2', top: '46%', left: '76%', size: 'md' },
  { key: 'au', top: '68%', left: '82%', size: 'sm' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const panelVariants = {
  hidden: { opacity: 0, x: 60, rotateY: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const navListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.5 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function UnderstandActHomePage() {
  return (
    <section className="section-UnderstandActHomePage zescloud-section">
      {/* Background image goes on this layer. Set the URL on
          .bgImage-UnderstandActHomePage in the CSS, or set the CSS
          variable --understand-act-bg-image in :root. */}
      <div className="bgImage-UnderstandActHomePage" aria-hidden="true" />
      <div className="bgOverlay-UnderstandActHomePage" aria-hidden="true" />

      <div className="zescloud-container">
        <div className="grid-UnderstandActHomePage">

          {/* ---------------- LEFT: content ---------------- */}
          <motion.div
            className="content-col-UnderstandActHomePage"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.span variants={textItemVariants} className="overline-UnderstandActHomePage">
              <span className="overlineDot-UnderstandActHomePage" aria-hidden="true" />
              THE ZESCLOUD ANSWER
            </motion.span>

            <motion.h2 variants={textItemVariants} className="heading-UnderstandActHomePage">
              <span className="headingLine-UnderstandActHomePage">SEE IT.</span>
              <span className="headingLine-UnderstandActHomePage">UNDERSTAND IT.</span>
              <span className="headingLine-UnderstandActHomePage">
                <span className="highlight-UnderstandActHomePage">ACT ON IT.</span>
              </span>
            </motion.h2>

            <motion.p variants={textItemVariants} className="desc-UnderstandActHomePage">
              ZesCloud continuously watches your digital environment and turns operational data into actionable intelligence.
            </motion.p>

            <motion.div variants={textItemVariants}>
              <a href="#platform" className="cta-UnderstandActHomePage">
                <span>Explore the Platform</span>
                <ArrowRight className="ctaIcon-UnderstandActHomePage" size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* ---------------- RIGHT: tilted dashboard ---------------- */}
          <motion.div
            className="visual-col-UnderstandActHomePage"
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="panelStage-UnderstandActHomePage">
              {/* Ambient glow behind the frame */}
              <div className="panelGlow-UnderstandActHomePage" aria-hidden="true" />

              {/* Real SVG device frame: an aluminium-style tablet bezel
                  with the whole dashboard rendered inside it through a
                  foreignObject, so the dashboard is genuinely "inside"
                  the frame rather than just a div styled to look tilted. */}
              <svg
                className="tabletFrame-UnderstandActHomePage"
                viewBox="0 0 960 498"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="ZesCloud monitoring dashboard shown on a tablet"
              >
                <defs>
                  <linearGradient id="bezelMetal-UnderstandActHomePage" x1="20%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b4454" />
                    <stop offset="22%" stopColor="#171c26" />
                    <stop offset="55%" stopColor="#0a0d13" />
                    <stop offset="80%" stopColor="#1b212c" />
                    <stop offset="100%" stopColor="#40495c" />
                  </linearGradient>
                  <linearGradient id="bezelEdgeLight-UnderstandActHomePage" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
                    <stop offset="16%" stopColor="rgba(255,255,255,0.08)" />
                    <stop offset="55%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="88%" stopColor="rgba(86,180,255,0.18)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                  </linearGradient>
                  <linearGradient id="screenReflection-UnderstandActHomePage" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
                    <stop offset="38%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                  <clipPath id="screenClip-UnderstandActHomePage">
                    <rect x="22" y="22" width="916" height="448" rx="14" />
                  </clipPath>
                </defs>

                {/* Outer aluminium body */}
                <rect x="2" y="2" width="956" height="488" rx="26" fill="url(#bezelMetal-UnderstandActHomePage)" />
                <rect x="2" y="2" width="956" height="488" rx="26" fill="none" stroke="url(#bezelEdgeLight-UnderstandActHomePage)" strokeWidth="2" />

                {/* Front camera */}
                <circle cx="380" cy="12" r="2.6" fill="#0a0d13" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

                {/* Screen cutout (the glass area the dashboard sits in) */}
                <rect x="22" y="22" width="916" height="448" rx="14" fill="#05070b" />

                {/* Dashboard content, clipped to the screen cutout */}
                <g clipPath="url(#screenClip-UnderstandActHomePage)">
                  <foreignObject x="22" y="22" width="916" height="498">
                    <div xmlns="http://www.w3.org/1999/xhtml" className="dashboard-UnderstandActHomePage">
                      {/* Header */}
                      <div className="dashHeader-UnderstandActHomePage">
                        <div className="brand-UnderstandActHomePage">
                          <span className="brandIcon-UnderstandActHomePage" aria-hidden="true">
                            <Cloud size={20} />
                          </span>
                          <span className="brandName-UnderstandActHomePage">ZesCloud</span>
                        </div>

                        <div className="dashHeaderRight-UnderstandActHomePage">
                          <span className="accessPill-UnderstandActHomePage">
                            Level 24 Access
                            <ChevronDown size={15} />
                          </span>
                          <span className="dashIconBtn-UnderstandActHomePage" aria-hidden="true">
                            <Bell size={16} />
                            <span className="dashIconDot-UnderstandActHomePage" />
                          </span>
                          <span className="dashIconBtn-UnderstandActHomePage" aria-hidden="true">
                            <Settings size={16} />
                          </span>
                        </div>
                      </div>

                      <div className="dashBody-UnderstandActHomePage">
                        {/* Sidebar */}
                        <nav className="sidebar-UnderstandActHomePage">
                          {NAV_ITEMS_UnderstandActHomePage.map((item) => {
                            const Icon = item.icon;
                            return (
                              <div
                                key={item.key}
                                className={`navItem-UnderstandActHomePage ${item.active ? 'navItemActive-UnderstandActHomePage' : ''}`}
                              >
                                <Icon size={16} />
                                <span>{item.label}</span>
                              </div>
                            );
                          })}
                        </nav>

                        {/* Main content */}
                        <div className="dashMain-UnderstandActHomePage">
                          <div className="mainRow-UnderstandActHomePage">
                            {/* Healthy status ring card */}
                            <div className="statusCard-UnderstandActHomePage">
                              <span className="statusCardLabel-UnderstandActHomePage">All Systems</span>

                              <div className="ring-UnderstandActHomePage" aria-hidden="true">
                                {/* Faint full circle underneath, like the screenshot's base track */}
                                <svg className="ringTrackSvg-UnderstandActHomePage" viewBox="0 0 78 78">
                                  <circle cx="39" cy="39" r="34" />
                                </svg>

                                {/* 3 rounded arc segments, spinning together as one ring */}
                                <svg className="ringArcsSvg-UnderstandActHomePage" viewBox="0 0 78 78">
                                  <circle cx="39" cy="39" r="34" strokeLinecap="round" />
                                </svg>

                                <ShieldCheck className="ringCenterIcon-UnderstandActHomePage" size={36} />
                              </div>

                              <span className="statusCardState-UnderstandActHomePage">Healthy</span>
                              <span className="statusCardSub-UnderstandActHomePage">99.9% uptime</span>
                            </div>

                            {/* World map */}
                            <div className="mapCard-UnderstandActHomePage">
                              <div className="mapBox-UnderstandActHomePage">
                                <span className="mapDots-UnderstandActHomePage" aria-hidden="true" />
                                {MAP_PINS_UnderstandActHomePage.map((pin, i) => (
                                  <span
                                    key={pin.key}
                                    className={`mapPin-UnderstandActHomePage mapPin_${pin.size}-UnderstandActHomePage`}
                                    style={{ top: pin.top, left: pin.left, animationDelay: `${i * 0.35}s` }}
                                  >
                                    <span className="mapPinPing-UnderstandActHomePage" />
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Stat cards */}
                          <div className="statsRow-UnderstandActHomePage">
                            {STATS_UnderstandActHomePage.map((s) => {
                              const NoteIcon = s.icon;
                              return (
                                <div key={s.key} className="statCard-UnderstandActHomePage">
                                  <span className="statCardLabel-UnderstandActHomePage">{s.label}</span>
                                  <span className="statCardValue-UnderstandActHomePage">{s.value}</span>
                                  <span className={`statCardNote-UnderstandActHomePage statCardNote_${s.statusClass}-UnderstandActHomePage`}>
                                    {NoteIcon && <NoteIcon className="statCardNoteIcon-UnderstandActHomePage" size={12} />}
                                    {s.note}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </foreignObject>

                  {/* Static glass reflection across the screen - no loop,
                      just a fixed diagonal highlight like light caught
                      once on the glass, for a realistic (not animated) feel. */}
                  <polygon
                    points="22,22 260,22 110,490 22,420"
                    fill="url(#screenReflection-UnderstandActHomePage)"
                  />
                </g>

                {/* Inner bezel rim so the screen reads as inset glass */}
                <rect
                  x="22" y="22" width="916" height="448" rx="14"
                  fill="none"
                  stroke="rgba(0,0,0,0.6)"
                  strokeWidth="2"
                />
                <rect
                  x="24" y="24" width="912" height="444" rx="12"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Dark gradient fade at the very bottom of the section */}
      <div className="bottomFade-UnderstandActHomePage" aria-hidden="true" />
    </section>
  );
}

export default UnderstandActHomePage;