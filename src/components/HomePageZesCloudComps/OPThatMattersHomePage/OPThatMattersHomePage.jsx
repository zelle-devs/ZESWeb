"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Cloud,
  AppWindow,
  Globe2,
  ShieldCheck,
  RotateCcw,
  Zap,
  Briefcase,
  TrendingUp,
  Plug,
  ChevronRight,
} from 'lucide-react';
import './OPThatMattersHomePage.css';

/* Each card gets its own accent color, matched to the screenshot's
   icon-badge colors (blue, cyan, blue, green, purple, indigo, violet,
   blue, teal, purple). */
const FEATURES_OPThatMattersHomePage = [
  {
    key: 'infrastructure',
    icon: Server,
    title: 'Infrastructure',
    desc: "Know what's happening across your servers.",
    accent: 'var(--zescloud-primary)',
  },
  {
    key: 'cloud',
    icon: Cloud,
    title: 'Cloud',
    desc: 'Monitor your cloud environment from one place.',
    accent: 'var(--zescloud-accent-cyan)',
  },
  {
    key: 'applications',
    icon: AppWindow,
    title: 'Applications',
    desc: 'Detect issues before they become business problems.',
    accent: 'var(--zescloud-primary)',
  },
  {
    key: 'websites',
    icon: Globe2,
    title: 'Websites',
    desc: 'Track availability, performance and critical health.',
    accent: 'var(--zescloud-status-healthy)',
  },
  {
    key: 'security',
    icon: ShieldCheck,
    title: 'Security',
    desc: 'Identify suspicious activity and operational risks.',
    accent: 'var(--zescloud-status-purple)',
  },
  {
    key: 'recovery',
    icon: RotateCcw,
    title: 'Recovery',
    desc: 'Respond faster when things go wrong.',
    accent: '#6366F1',
  },
  {
    key: 'automation',
    icon: Zap,
    title: 'Automation',
    desc: 'Turn repetitive operations into automated actions.',
    accent: 'var(--zescloud-status-purple)',
  },
  {
    key: 'business',
    icon: Briefcase,
    title: 'Business',
    desc: 'Connect technical performance with business impact.',
    accent: 'var(--zescloud-primary)',
  },
  {
    key: 'seo',
    icon: TrendingUp,
    title: 'SEO',
    desc: 'Understand how technical health impacts visibility.',
    accent: 'var(--zescloud-status-healthy)',
  },
  {
    key: 'api',
    icon: Plug,
    title: 'API',
    desc: 'Connect ZesCloud with the tools you already use.',
    accent: 'var(--zescloud-status-purple)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function OPThatMattersHomePage() {
  return (
    <section className="section-OPThatMattersHomePage zescloud-section">
      {/* Animated background: drifting glow + faint moving grid */}
      <div className="bgGlowA-OPThatMattersHomePage" aria-hidden="true" />
      <div className="bgGlowB-OPThatMattersHomePage" aria-hidden="true" />
      <div className="bgGrid-OPThatMattersHomePage" aria-hidden="true" />

      {/* Top + bottom fades so this section blends with the ones above/below */}
      <div className="topFade-OPThatMattersHomePage" aria-hidden="true" />
      <div className="bottomFade-OPThatMattersHomePage" aria-hidden="true" />

      <div className="zescloud-container">
        {/* ---------------- HEADER ---------------- */}
        <motion.div
          className="header-OPThatMattersHomePage"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="headerLeft-OPThatMattersHomePage">
            <motion.span variants={textItemVariants} className="overline-OPThatMattersHomePage">
              <span className="overlineDot-OPThatMattersHomePage" aria-hidden="true" />
              THE ZESCLOUD ECOSYSTEM
            </motion.span>

            <motion.h2 variants={textItemVariants} className="heading-OPThatMattersHomePage">
              <span className="headingLine-OPThatMattersHomePage">ONE PLATFORM.</span>
              <span className="headingLine-OPThatMattersHomePage">
                <span className="highlight-OPThatMattersHomePage">EVERYTHING THAT MATTERS.</span>
              </span>
            </motion.h2>
          </div>

          <motion.p variants={textItemVariants} className="headerDesc-OPThatMattersHomePage">
            Your infrastructure, applications, websites, security, cloud, and business operations — working together through one intelligent platform.
          </motion.p>
        </motion.div>

        {/* ---------------- CARD GRID ---------------- */}
        <motion.div
          className="grid-OPThatMattersHomePage"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES_OPThatMattersHomePage.map((f) => {
            const Icon = f.icon;
            return (
              <motion.a
                key={f.key}
                href={`#${f.key}`}
                className="card-OPThatMattersHomePage"
                variants={cardVariants}
                whileHover={{ y: -6 }}
                style={{ '--accent-OPThatMattersHomePage': f.accent }}
              >
                <span className="cardIconBox-OPThatMattersHomePage" aria-hidden="true">
                  <Icon size={20} />
                </span>

                <span className="cardTitle-OPThatMattersHomePage">{f.title}</span>
                <span className="cardDesc-OPThatMattersHomePage">{f.desc}</span>

                <span className="cardArrow-OPThatMattersHomePage" aria-hidden="true">
                  <ChevronRight size={16} />
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default OPThatMattersHomePage;