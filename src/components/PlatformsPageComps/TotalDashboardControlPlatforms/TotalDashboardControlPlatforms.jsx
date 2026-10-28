"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import {
  Workflow,
  ShieldCheck,
  Sparkles,
  Siren,
  Activity,
  Hexagon,
  ArrowRight,
  Cloud,
  LayoutDashboard,
  Server,
  AppWindow,
  Database,
  Network,
  Shield,
  RotateCcw,
  FileText,
  Search,
  ChevronDown,
  Bell,
  TrendingUp,
  Users,
  Shuffle,
  Globe,
  LayoutGrid,
  Crosshair,
  Maximize2,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
} from 'lucide-react';
import './TotalDashboardControlPlatforms.css';
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps';

/* ------------------------------------------------------------------
   👉 ADD YOUR BACKGROUND IMAGE LINK HERE
   (or pass it as a prop: <TotalDashboardControlPlatforms backgroundImage="..." />)
------------------------------------------------------------------- */
const SECTION_BG_IMAGE = '/OneDashboardTotalControlPlatform.png';

/* ============================== DATA ============================== */
const FEATURES = [
  {
    title: 'Real-time Infrastructure Map',
    desc: 'Understand relationships between servers, applications, databases, services, and other infrastructure components.',
    Icon: Workflow,
    tone: 'blue',
  },
  {
    title: 'Health Scores Across Components',
    desc: 'Quickly identify which parts of your environment are healthy, degraded, or requiring attention.',
    Icon: ShieldCheck,
    tone: 'green',
  },
  {
    title: 'AI Insights & Recommendations',
    desc: 'See important changes, anomalies, potential causes, and recommended actions.',
    Icon: Sparkles,
    tone: 'purple',
  },
  {
    title: 'Incident & Alert Overview',
    desc: 'Bring operational events together so your team can focus on what matters.',
    Icon: Siren,
    tone: 'red',
  },
  {
    title: 'System Metrics & Performance',
    desc: 'Monitor CPU, memory, storage, network activity, services, uptime, and other infrastructure signals.',
    Icon: Activity,
    tone: 'blue',
  },
  {
    title: 'Business Impact Visibility',
    desc: 'Understand how infrastructure problems can affect applications and dependent services.',
    Icon: Hexagon,
    tone: 'purple',
  },
];

const NAV = [
  { label: 'Overview', Icon: LayoutDashboard, active: true },
  { label: 'Infrastructure', Icon: Server },
  { label: 'Applications', Icon: AppWindow },
  { label: 'Databases', Icon: Database },
  { label: 'Networks', Icon: Network },
  { label: 'Security', Icon: Shield },
  { label: 'Recovery', Icon: RotateCcw },
  { label: 'Reports', Icon: FileText },
];

const STATS = [
  { label: 'Servers', value: 48, status: 'Healthy', tone: 'green' },
  { label: 'Applications', value: 32, status: 'Healthy', tone: 'green' },
  { label: 'Databases', value: 12, status: 'Degraded', tone: 'orange' },
  { label: 'Devices', value: 12, status: 'Healthy', tone: 'green' },
  { label: 'Services', value: 86, status: 'Healthy', tone: 'green' },
];

// Map node positions are in px inside the 632 x 190 map canvas
const MAP_NODES = [
  { id: 'users', label: 'Users', Icon: Users, tone: 'blue', x: 300, y: 20 },
  { id: 'lb', label: 'Load Balancer', Icon: Shuffle, tone: 'blue', x: 300, y: 68 },
  { id: 'web', label: 'Web Servers', status: '4 Healthy', Icon: Server, tone: 'green', x: 100, y: 105 },
  { id: 'apps', label: 'Applications', status: '6 Healthy', Icon: LayoutGrid, tone: 'blue', x: 505, y: 105 },
  { id: 'db', label: 'Databases', status: '2 Degraded', Icon: Database, tone: 'red', x: 292, y: 165 },
  { id: 'ext', label: 'External Services', status: '12 Healthy', Icon: Globe, tone: 'green', x: 505, y: 165 },
];

const MAP_LINKS = [
  { d: 'M70 85 C 150 -25, 460 -25, 535 85', tone: 'faint', dur: '6s' },
  { d: 'M300 37 L300 51', tone: 'blue', dur: '1.2s' },
  { d: 'M300 68 C 220 68, 140 72, 100 85', tone: 'blue', dur: '2.6s' },
  { d: 'M300 68 C 380 68, 460 72, 505 85', tone: 'blue', dur: '2.6s' },
  { d: 'M100 125 C 115 155, 190 165, 240 165', tone: 'red', dur: '3s' },
  { d: 'M505 125 C 490 155, 400 165, 345 165', tone: 'red', dur: '3s' },
  { d: 'M505 125 L505 145', tone: 'green', dur: '1.4s' },
];

const ALERTS = [
  { text: 'High CPU usage on server-03', time: '2 minutes ago', level: 'Critical', tone: 'red', Icon: AlertTriangle },
  { text: 'Database response time increased', time: '5 minutes ago', level: 'Warning', tone: 'orange', Icon: AlertCircle },
  { text: 'Backup job completed successfully', time: '12 minutes ago', level: 'Info', tone: 'blue', Icon: CheckCircle2 },
  { text: 'High error rate in payment service', time: '25 minutes ago', level: 'Critical', tone: 'red', Icon: XCircle },
  { text: 'New login from unrecognized location', time: '1 hour ago', level: 'Warning', tone: 'orange', Icon: ShieldAlert },
];

const GAUGE_RADIUS = 40;
const GAUGE_CIRC = 2 * Math.PI * GAUGE_RADIUS;
const HEALTH_SCORE = 92;

/* ============================ VARIANTS ============================ */
const leftContainer = {
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
  visible: { transition: { staggerChildren: 0.1 } },
};

const featureItem = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const dashEnter = {
  hidden: { opacity: 0, x: 80, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const dashInner = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.45 } },
};

const panelIn = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const navList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};

const navItem = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const rowsList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const rowItem = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ============================ HELPERS ============================ */
function CountUp({ to, duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{value}</span>;
}

/* =========================== COMPONENT =========================== */
function TotalDashboardControlPlatforms({
  backgroundImage = SECTION_BG_IMAGE,
  exploreHref = '/dashboard',
}) {
  return (
    <section
      className="section-TotalDashboardControlPlatforms"
      style={{
        '--bg-image-TotalDashboardControlPlatforms': backgroundImage ? `url("${backgroundImage}")` : 'none',
      }}
    >
      {/* Background layers */}
      <div className="bg-TotalDashboardControlPlatforms" aria-hidden="true" />
      <div className="overlay-TotalDashboardControlPlatforms" aria-hidden="true" />
      <div className="beam-TotalDashboardControlPlatforms" aria-hidden="true" />

      <div className="container-TotalDashboardControlPlatforms">
        {/* ======================= LEFT ======================= */}
        <motion.div
          className="content-TotalDashboardControlPlatforms"
          variants={leftContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-00px' }}
        >
          <motion.span variants={fadeUp} className="eyebrow-TotalDashboardControlPlatforms">
           <BageZescloudAllComps badge="mission control"/>
          </motion.span>

          <motion.h2 variants={fadeUp} className="heading-TotalDashboardControlPlatforms">
            <span className="heading-line-TotalDashboardControlPlatforms">One Dashboard.</span>
            <span className="heading-accent-TotalDashboardControlPlatforms">Total Control.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="lead-TotalDashboardControlPlatforms">
            The ZesCloud Mission Control dashboard gives your team a real-time operational view
            of infrastructure health.
          </motion.p>

          <motion.ul variants={featureList} className="features-TotalDashboardControlPlatforms">
            {FEATURES.map(({ title, desc, Icon, tone }, i) => (
              <motion.li
                key={title}
                variants={featureItem}
                className={`feature-TotalDashboardControlPlatforms tone-${tone}-TotalDashboardControlPlatforms`}
                style={{ '--i-TotalDashboardControlPlatforms': i }}
              >
                <span className="feature-icon-TotalDashboardControlPlatforms">
                  <Icon size={19} strokeWidth={1.9} />
                </span>
                <div className="feature-text-TotalDashboardControlPlatforms">
                  <h3 className="feature-title-TotalDashboardControlPlatforms">{title}</h3>
                  <p className="feature-desc-TotalDashboardControlPlatforms">{desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp}>
            <a href={exploreHref} className="btn-TotalDashboardControlPlatforms">
              <span>Explore Dashboard</span>
              <ArrowRight size={16} strokeWidth={2.2} className="btn-arrow-TotalDashboardControlPlatforms" />
            </a>
          </motion.div>
        </motion.div>

        {/* ======================= RIGHT ======================= */}
        <div
          className="visual-TotalDashboardControlPlatforms"
          role="img"
          aria-label="ZesCloud Mission Control dashboard showing infrastructure health, an infrastructure map and recent alerts"
        >
          <div className="scale-wrap-TotalDashboardControlPlatforms">
            <span className="dash-glow-TotalDashboardControlPlatforms" aria-hidden="true" />
            <span className="floor-TotalDashboardControlPlatforms" aria-hidden="true" />

            <motion.div
              className="enter-TotalDashboardControlPlatforms"
              variants={dashEnter}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="float-TotalDashboardControlPlatforms">
                <motion.div
                  className="dash-TotalDashboardControlPlatforms"
                  variants={dashInner}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  aria-hidden="true"
                >
                  <span className="dash-border-TotalDashboardControlPlatforms" />
                  <span className="dash-scan-TotalDashboardControlPlatforms" />

                  {/* ---------- Sidebar ---------- */}
                  <aside className="sidebar-TotalDashboardControlPlatforms">
                    <div className="logo-TotalDashboardControlPlatforms">
                      
                        <img src="main_logo.png" alt="" />
                      {/* <span className="logo-text-TotalDashboardControlPlatforms">ZesCloud</span> */}
                    </div>

                    <motion.ul variants={navList} className="nav-TotalDashboardControlPlatforms">
                      {NAV.map(({ label, Icon, active }) => (
                        <motion.li
                          key={label}
                          variants={navItem}
                          className={`nav-item-TotalDashboardControlPlatforms${active ? ' nav-active-TotalDashboardControlPlatforms' : ''}`}
                        >
                          <Icon size={14} strokeWidth={1.9} />
                          <span>{label}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </aside>

                  {/* ---------- Main ---------- */}
                  <div className="main-TotalDashboardControlPlatforms">
                    {/* Topbar */}
                    <motion.div variants={panelIn} className="topbar-TotalDashboardControlPlatforms">
                      <div className="search-TotalDashboardControlPlatforms">
                        <Search size={13} strokeWidth={2} />
                        <span>Search systems, services, or alerts...</span>
                        <span className="caret-TotalDashboardControlPlatforms" />
                      </div>
                      <div className="topbar-right-TotalDashboardControlPlatforms">
                        <div className="range-TotalDashboardControlPlatforms">
                          <span>Last 24 hours</span>
                          <ChevronDown size={13} strokeWidth={2} />
                        </div>
                        <div className="bell-TotalDashboardControlPlatforms">
                          <Bell size={15} strokeWidth={1.9} />
                          <span className="bell-dot-TotalDashboardControlPlatforms" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Infrastructure Health */}
                    <motion.div variants={panelIn} className="panel-TotalDashboardControlPlatforms">
                      <h4 className="panel-title-TotalDashboardControlPlatforms">Infrastructure Health</h4>

                      <div className="health-TotalDashboardControlPlatforms">
                        <div className="gauge-block-TotalDashboardControlPlatforms">
                          <div className="gauge-TotalDashboardControlPlatforms">
                            <svg viewBox="0 0 100 100" className="gauge-svg-TotalDashboardControlPlatforms">
                              <defs>
                                <linearGradient id="gaugeGrad-TotalDashboardControlPlatforms" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#34D399" />
                                  <stop offset="100%" stopColor="#10B981" />
                                </linearGradient>
                              </defs>
                              <circle
                                cx="50"
                                cy="50"
                                r={GAUGE_RADIUS}
                                className="gauge-track-TotalDashboardControlPlatforms"
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r={GAUGE_RADIUS}
                                className="gauge-value-TotalDashboardControlPlatforms"
                                stroke="url(#gaugeGrad-TotalDashboardControlPlatforms)"
                                strokeDasharray={GAUGE_CIRC}
                                initial={{ strokeDashoffset: GAUGE_CIRC }}
                                whileInView={{ strokeDashoffset: GAUGE_CIRC * (1 - HEALTH_SCORE / 100) }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                              />
                            </svg>
                            <span className="gauge-number-TotalDashboardControlPlatforms">
                              <CountUp to={HEALTH_SCORE} />
                            </span>
                          </div>

                          <div className="gauge-text-TotalDashboardControlPlatforms">
                            <span className="gauge-label-TotalDashboardControlPlatforms">Overall Health</span>
                            <span className="gauge-status-TotalDashboardControlPlatforms">Healthy</span>
                            <span className="gauge-trend-TotalDashboardControlPlatforms">
                              <TrendingUp size={11} strokeWidth={2.2} />
                              12% from last week
                            </span>
                          </div>
                        </div>

                        <div className="stats-TotalDashboardControlPlatforms">
                          {STATS.map(({ label, value, status, tone }) => (
                            <div
                              key={label}
                              className={`stat-TotalDashboardControlPlatforms tone-${tone}-TotalDashboardControlPlatforms`}
                            >
                              <span className="stat-label-TotalDashboardControlPlatforms">{label}</span>
                              <span className="stat-value-TotalDashboardControlPlatforms">
                                <CountUp to={value} duration={1.6} />
                              </span>
                              <span className="stat-status-TotalDashboardControlPlatforms">
                                <span className="dot-TotalDashboardControlPlatforms" />
                                {status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Infrastructure Map */}
                    <motion.div variants={panelIn} className="panel-TotalDashboardControlPlatforms map-panel-TotalDashboardControlPlatforms">
                      <h4 className="panel-title-TotalDashboardControlPlatforms">Infrastructure Map</h4>

                      <div className="map-controls-TotalDashboardControlPlatforms">
                        <span className="map-btn-TotalDashboardControlPlatforms">
                          <Crosshair size={12} strokeWidth={2} />
                        </span>
                        <span className="map-btn-TotalDashboardControlPlatforms">
                          <Maximize2 size={11} strokeWidth={2} />
                        </span>
                      </div>

                      <div className="map-TotalDashboardControlPlatforms">
                        <svg
                          className="map-svg-TotalDashboardControlPlatforms"
                          viewBox="0 0 632 190"
                          width="632"
                          height="190"
                        >
                          {MAP_LINKS.map((link, i) => (
                            <g key={i} className={`link-${link.tone}-TotalDashboardControlPlatforms`}>
                              <motion.path
                                d={link.d}
                                className="link-base-TotalDashboardControlPlatforms"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 1 + i * 0.12, ease: 'easeInOut' }}
                              />
                              <path d={link.d} className="link-flow-TotalDashboardControlPlatforms" />
                              <circle r="2.6" className="link-dot-TotalDashboardControlPlatforms">
                                <animateMotion
                                  dur={link.dur}
                                  repeatCount="indefinite"
                                  begin={`${1.8 + i * 0.3}s`}
                                  path={link.d}
                                />
                              </circle>
                            </g>
                          ))}
                        </svg>

                        {MAP_NODES.map(({ id, label, status, Icon, tone, x, y }, i) => (
                          <div
                            key={id}
                            className="node-pos-TotalDashboardControlPlatforms"
                            style={{ left: `${x}px`, top: `${y}px` }}
                          >
                            <motion.div
                              className={`node-TotalDashboardControlPlatforms tone-${tone}-TotalDashboardControlPlatforms${status ? '' : ' node-compact-TotalDashboardControlPlatforms'}`}
                              initial={{ opacity: 0, scale: 0.6 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.9 + i * 0.1 }}
                            >
                              <span className="node-icon-TotalDashboardControlPlatforms">
                                <Icon size={13} strokeWidth={2} />
                              </span>
                              <span className="node-text-TotalDashboardControlPlatforms">
                                <span className="node-label-TotalDashboardControlPlatforms">{label}</span>
                                {status && (
                                  <span className="node-status-TotalDashboardControlPlatforms">{status}</span>
                                )}
                              </span>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Recent Alerts */}
                    <motion.div variants={panelIn} className="panel-TotalDashboardControlPlatforms alerts-panel-TotalDashboardControlPlatforms">
                      <div className="alerts-head-TotalDashboardControlPlatforms">
                        <h4 className="panel-title-TotalDashboardControlPlatforms">
                          Recent Alerts
                          <span className="live-TotalDashboardControlPlatforms">
                            <span className="live-dot-TotalDashboardControlPlatforms" />
                            Live
                          </span>
                        </h4>
                        <span className="view-all-TotalDashboardControlPlatforms">
                          View All <ArrowRight size={11} strokeWidth={2.2} />
                        </span>
                      </div>

                      <motion.ul
                        className="alerts-TotalDashboardControlPlatforms"
                        variants={rowsList}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {ALERTS.map(({ text, time, level, tone, Icon }, i) => (
                          <motion.li
                            key={text}
                            variants={rowItem}
                            className={`alert-row-TotalDashboardControlPlatforms tone-${tone}-TotalDashboardControlPlatforms`}
                            style={{ '--i-TotalDashboardControlPlatforms': i }}
                          >
                            <span className="alert-text-TotalDashboardControlPlatforms">
                              <Icon size={13} strokeWidth={2} />
                              {text}
                            </span>
                            <span className="alert-time-TotalDashboardControlPlatforms">{time}</span>
                            <span className="alert-pill-TotalDashboardControlPlatforms">
                              <span className="dot-TotalDashboardControlPlatforms" />
                              {level}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TotalDashboardControlPlatforms;