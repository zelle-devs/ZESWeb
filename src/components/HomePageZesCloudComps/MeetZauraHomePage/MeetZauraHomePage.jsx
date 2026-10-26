"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, TrendingUp, Settings, Zap } from 'lucide-react';
import './MeetZauraHomePage.css';

/* The 5-step intelligence pipeline, left to right, each with its own
   accent color matched to the screenshot (blue, purple, green,
   orange, red). */
const STEPS_MeetZauraHomePage = [
  {
    key: 'detect',
    icon: Search,
    title: 'Detect',
    desc: 'Find what changed.',
    accent: 'var(--zescloud-primary)',
  },
  {
    key: 'understand',
    icon: Lightbulb,
    title: 'Understand',
    desc: 'Know why it matters.',
    accent: 'var(--zescloud-status-purple)',
  },
  {
    key: 'predict',
    icon: TrendingUp,
    title: 'Predict',
    desc: 'Identify what could happen next.',
    accent: 'var(--zescloud-status-healthy)',
  },
  {
    key: 'recommend',
    icon: Settings,
    title: 'Recommend',
    desc: 'Know what to do.',
    accent: 'var(--zescloud-status-warning)',
  },
  {
    key: 'act',
    icon: Zap,
    title: 'Act',
    desc: 'Take action faster.',
    accent: 'var(--zescloud-status-danger)',
  },
];

/* Image: left to right entrance - starts off-screen to the left,
   slides + fades in. */
const imageVariants = {
  hidden: { opacity: 0, x: -90, scale: 1.04 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stepsListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.7 },
  },
};

const stepItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function MeetZauraHomePage() {
  return (
    <section className="section-MeetZauraHomePage zescloud-section">
      {/* Ambient animated background glow */}
      <div className="bgGlow-MeetZauraHomePage" aria-hidden="true" />
      <div className="topFade-MeetZauraHomePage" aria-hidden="true" />
      <div className="bottomFade-MeetZauraHomePage" aria-hidden="true" />

      <div className="grid-MeetZauraHomePage">

        {/* ---------------- LEFT: Zaura portrait ---------------- */}
        <motion.div
          className="visual-MeetZauraHomePage"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Set the portrait image here, or define --meet-zaura-image on :root */}
          <div className="visualImage-MeetZauraHomePage" aria-hidden="true" />
          <div className="visualFadeRight-MeetZauraHomePage" aria-hidden="true" />
          <div className="visualFadeBottom-MeetZauraHomePage" aria-hidden="true" />

          {/* Drifting particle sparks over the portrait, echoing the
              glowing neural-thread look of the artwork */}
          <span className="spark-MeetZauraHomePage spark1-MeetZauraHomePage" aria-hidden="true" />
          <span className="spark-MeetZauraHomePage spark2-MeetZauraHomePage" aria-hidden="true" />
          <span className="spark-MeetZauraHomePage spark3-MeetZauraHomePage" aria-hidden="true" />
          <span className="spark-MeetZauraHomePage spark4-MeetZauraHomePage" aria-hidden="true" />
        </motion.div>

        {/* ---------------- RIGHT: content ---------------- */}
        <motion.div
          className="content-MeetZauraHomePage"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.span variants={textItemVariants} className="overline-MeetZauraHomePage">
            ZAURA™
          </motion.span>

          <motion.h2 variants={textItemVariants} className="heading-MeetZauraHomePage">
            MEET <span className="highlight-MeetZauraHomePage">ZAURA™</span>
          </motion.h2>

          <motion.p variants={textItemVariants} className="subheading-MeetZauraHomePage">
            THE INTELLIGENCE BEHIND ZESCLOUD.
          </motion.p>

          <motion.p variants={textItemVariants} className="desc-MeetZauraHomePage">
            Zaura turns thousands of operational signals into insights your team can actually use.
          </motion.p>

          {/* ---------------- STEP PIPELINE ---------------- */}
          <motion.div
            className="steps-MeetZauraHomePage"
            variants={stepsListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Connecting line behind the icons, with a traveling light
                pulse that runs the length of the pipeline on a loop */}
            <span className="stepsLine-MeetZauraHomePage" aria-hidden="true">
              <span className="stepsLineTravel-MeetZauraHomePage" />
            </span>

            {STEPS_MeetZauraHomePage.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.key}
                  className="step-MeetZauraHomePage"
                  variants={stepItemVariants}
                  style={{ '--accent-MeetZauraHomePage': s.accent }}
                >
                  <span className="stepIcon-MeetZauraHomePage" aria-hidden="true">
                    <span className="stepIconPulse-MeetZauraHomePage" />
                    <Icon size={18} />
                  </span>
                  <span className="stepTitle-MeetZauraHomePage">{s.title}</span>
                  <span className="stepDesc-MeetZauraHomePage">{s.desc}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default MeetZauraHomePage;