"use client";

import React from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { Search, Lightbulb, TrendingUp, Settings, Zap } from 'lucide-react';
import './MeetZauraHomePage.css';
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps';

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

const EASE_MeetZauraHomePage = [0.22, 1, 0.36, 1];
const STEP_START_MeetZauraHomePage = 2.1;
const STEP_GAP_MeetZauraHomePage = 0.28;

const sectionVariants = {
  hidden: {},
  visible: {},
};

const imageVariants = {
  hidden: {
    opacity: 0,
    x: -145,
    y: 39,
    scale: 1.12,
    filter: 'blur(18px) brightness(1.8)',
    WebkitMaskPosition: '100% 0%',
    maskPosition: '100% 0%',
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    WebkitMaskPosition: '0% 100%',
    maskPosition: '0% 100%',
    transition: {
      duration: 2.2,
      ease: EASE_MeetZauraHomePage,
      opacity: { duration: 0.9, ease: 'easeOut' },
    },
  },
};

const sweepVariants = {
  hidden: { opacity: 0, backgroundPosition: '100% 100%' },
  visible: {
    opacity: [0, 1, 1, 0],
    backgroundPosition: '0% 0%',
    transition: { delay: 1.7, duration: 2.2, ease: 'easeInOut' },
  },
};

const overlineVariants = {
  hidden: { opacity: 0, x: -24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.7, duration: 1, ease: EASE_MeetZauraHomePage },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: '60%', rotateX: -85, filter: 'blur(10px)' },
  visible: (delay) => ({
    opacity: 1,
    y: '0%',
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { delay, duration: 1.2, ease: EASE_MeetZauraHomePage },
  }),
};

const subheadingVariants = {
  hidden: { opacity: 0, x: -20, clipPath: 'inset(0 100% 0 0)' },
  visible: {
    opacity: 1,
    x: 0,
    clipPath: 'inset(0 0% 0 0)',
    transition: { delay: 1.45, duration: 1.2, ease: EASE_MeetZauraHomePage },
  },
};

const descVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 1.75, duration: 1.1, ease: EASE_MeetZauraHomePage },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { delay: 2, duration: 1.8, ease: EASE_MeetZauraHomePage },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -56, filter: 'blur(8px)' },
  visible: (delay) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { delay, duration: 1, ease: EASE_MeetZauraHomePage },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -120 },
  visible: (delay) => ({
    scale: 1,
    rotate: 0,
    transition: { delay: delay + 0.15, type: 'spring', stiffness: 170, damping: 18 },
  }),
};

const stepTextVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay: delay + 0.3, duration: 0.7, ease: EASE_MeetZauraHomePage },
  }),
};

function MeetZauraHomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="section-MeetZauraHomePage zescloud-section">
        <div className="bottomFade-MeetZauraHomePage" aria-hidden="true" />

        <div className="grid-MeetZauraHomePage">
          <motion.div
            className="visual-MeetZauraHomePage"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="visualImage-MeetZauraHomePage" aria-hidden="true">
              <motion.span
                className="visualSweep-MeetZauraHomePage"
                variants={sweepVariants}
              />
            </div>
            <div className="visualFadeRight-MeetZauraHomePage" aria-hidden="true" />

            <span className="spark-MeetZauraHomePage spark1-MeetZauraHomePage" aria-hidden="true" />
            <span className="spark-MeetZauraHomePage spark2-MeetZauraHomePage" aria-hidden="true" />
            <span className="spark-MeetZauraHomePage spark3-MeetZauraHomePage" aria-hidden="true" />
            <span className="spark-MeetZauraHomePage spark4-MeetZauraHomePage" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="content-MeetZauraHomePage"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={overlineVariants} className="overline-MeetZauraHomePage">
              <BageZescloudAllComps badge='ZAURA™'/>
            </motion.span>

            <h2 className="heading-MeetZauraHomePage">
              <motion.span
                className="headingWord-MeetZauraHomePage"
                variants={wordVariants}
                custom={0.95}
              >
                MEET
              </motion.span>{' '}
              <motion.span
                className="headingWord-MeetZauraHomePage"
                variants={wordVariants}
                custom={1.15}
              >
                <span className="highlight-MeetZauraHomePage">ZAURA™</span>
              </motion.span>
            </h2>

            <motion.p variants={subheadingVariants} className="subheading-MeetZauraHomePage">
              THE INTELLIGENCE BEHIND ZESCLOUD.
            </motion.p>

            <motion.p variants={descVariants} className="desc-MeetZauraHomePage">
              Zaura turns thousands of operational signals into insights your team can actually use.
            </motion.p>

            <div className="steps-MeetZauraHomePage">
              <motion.span
                className="stepsLine-MeetZauraHomePage"
                variants={lineVariants}
                aria-hidden="true"
              >
                <span className="stepsLineTravel-MeetZauraHomePage" />
              </motion.span>

              {STEPS_MeetZauraHomePage.map((s, i) => {
                const Icon = s.icon;
                const delay = STEP_START_MeetZauraHomePage + i * STEP_GAP_MeetZauraHomePage;
                return (
                  <motion.div
                    key={s.key}
                    className="step-MeetZauraHomePage"
                    variants={stepVariants}
                    custom={delay}
                    style={{ '--accent-MeetZauraHomePage': s.accent }}
                  >
                    <motion.span
                      className="stepIconWrap-MeetZauraHomePage"
                      variants={iconVariants}
                      custom={delay}
                    >
                      <span className="stepIcon-MeetZauraHomePage" aria-hidden="true">
                        <span className="stepIconPulse-MeetZauraHomePage" />
                        <Icon size={18} />
                      </span>
                    </motion.span>
                    <motion.span
                      className="stepTitle-MeetZauraHomePage"
                      variants={stepTextVariants}
                      custom={delay}
                    >
                      {s.title}
                    </motion.span>
                    <motion.span
                      className="stepDesc-MeetZauraHomePage"
                      variants={stepTextVariants}
                      custom={delay + 0.1}
                    >
                      {s.desc}
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}

export default MeetZauraHomePage;