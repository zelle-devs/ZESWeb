"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, Settings } from 'lucide-react';
import './AfterHeroCardsPlatformsPage.css';

const cards = [
  {
    id: 1,
    title: 'Unified Visibility',
    desc: 'See your entire infrastructure in one place.',
    Icon: Eye,
    variant: 'blue',
    anim: 'eye',
  },
  {
    id: 2,
    title: 'AI-Powered Intelligence',
    desc: 'Understand issues, predict impact, and get actionable recommendations.',
    Icon: Brain,
    variant: 'purple',
    anim: 'brain',
  },
  {
    id: 3,
    title: 'Automated Operations',
    desc: 'Resolve issues faster with intelligent automation and controlled runbooks.',
    Icon: Settings,
    variant: 'green',
    anim: 'gear',
  },
];

// Framer Motion Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 220, damping: 14, delay: 0.25 },
  },
};

function AfterHeroCardsPlatformsPage() {
  return (
    <section className="section-AfterHeroCardsPlatformsPage">
      <div className="container-AfterHeroCardsPlatformsPage">
        <motion.div
          className="grid-AfterHeroCardsPlatformsPage"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map(({ id, title, desc, Icon, variant, anim }) => (
            <motion.article
              key={id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`card-AfterHeroCardsPlatformsPage card-${variant}-AfterHeroCardsPlatformsPage`}
            >
              {/* Decorative layers */}
              <span className="glow-AfterHeroCardsPlatformsPage" aria-hidden="true" />
              <span className="bottom-line-AfterHeroCardsPlatformsPage" aria-hidden="true" />

              {/* Icon */}
              <motion.div variants={iconVariants} className="icon-box-AfterHeroCardsPlatformsPage">
                <span className="icon-ring-AfterHeroCardsPlatformsPage" aria-hidden="true" />
                <span className={`icon-anim-${anim}-AfterHeroCardsPlatformsPage`}>
                  <Icon size={22} strokeWidth={1.8} />
                </span>
              </motion.div>

              {/* Text */}
              <h3 className="title-AfterHeroCardsPlatformsPage">{title}</h3>
              <p className="desc-AfterHeroCardsPlatformsPage">{desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AfterHeroCardsPlatformsPage;