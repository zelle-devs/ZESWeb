"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Layers,
  Brain,
  Settings,
  RotateCcw,
  Shield,
  ArrowRight,
} from 'lucide-react';
import './InfrastructureOperationsPlatforms.css';
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps';

/* ============================== DATA ============================== */
const CAPABILITIES = [
  {
    title: 'Infrastructure',
    subtitle: 'Monitor every layer of your infrastructure.',
    desc: 'Monitor servers, networks, containers, services, and system resources in real time.',
    points: ['Server Monitoring', 'Network Monitoring', 'Service Monitoring', 'System Metrics'],
    link: 'Explore Infrastructure',
    href: '/platform/infrastructure',
    Icon: Server,
    tone: 'blue',
    anim: 'server',
  },
  {
    title: 'Applications',
    subtitle: 'Understand what is happening beyond the server.',
    desc: 'Gain visibility into applications, dependencies, APIs, databases, and the services that support your digital experiences.',
    points: ['Application Monitoring', 'API & Service Monitoring', 'Error Monitoring', 'Database Monitoring', 'Business Impact'],
    link: 'Explore Applications',
    href: '/platform/applications',
    Icon: Layers,
    tone: 'purple',
    anim: 'layers',
  },
  {
    title: 'AI Operations',
    subtitle: 'Turn infrastructure data into operational intelligence.',
    desc: 'Zaura™ analyzes infrastructure behavior to identify anomalies, investigate issues, and provide actionable recommendations.',
    points: ['Anomaly Detection', 'Root Cause Analysis', 'Predictive Insights', 'Smart Recommendations'],
    link: 'Explore AI Operations',
    href: '/platform/ai-operations',
    Icon: Brain,
    tone: 'purple',
    anim: 'brain',
  },
  {
    title: 'Automation',
    subtitle: 'Turn repetitive operations into reliable workflows.',
    desc: 'Automate operational procedures while maintaining visibility, approvals, and control.',
    points: ['Auto Remediation', 'Runbooks', 'Workflows', 'Scheduled Tasks'],
    link: 'Explore Automation',
    href: '/platform/automation',
    Icon: Settings,
    tone: 'green',
    anim: 'gear',
  },
  {
    title: 'Recovery',
    subtitle: 'Know whether your infrastructure can recover when it matters.',
    desc: 'Monitor backups, disaster recovery plans, recovery readiness, and operational continuity.',
    points: ['Backup Monitoring', 'Disaster Recovery', 'Recovery Testing', 'RTO / RPO Tracking'],
    link: 'Explore Recovery',
    href: '/platform/recovery',
    Icon: RotateCcw,
    tone: 'purple',
    anim: 'recovery',
  },
  {
    title: 'Security',
    subtitle: 'Build security awareness into infrastructure operations.',
    desc: 'Monitor security-related infrastructure signals and maintain visibility into the controls protecting your systems.',
    points: ['Threat Detection', 'Vulnerability Monitoring', 'Security Events', 'Audit Logs'],
    link: 'Explore Security',
    href: '/platform/security',
    Icon: Shield,
    tone: 'blue',
    anim: 'shield',
  },
];

/* ============================ VARIANTS ============================ */
const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
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

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.07,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 240, damping: 15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* =========================== COMPONENT =========================== */
function InfrastructureOperationsPlatforms() {
  return (
    <section className="section-InfrastructureOperationsPlatforms">
      <div className="ambient-InfrastructureOperationsPlatforms" aria-hidden="true" />

      <div className="container-InfrastructureOperationsPlatforms">
        {/* ---------------- Header ---------------- */}
        <motion.div
          className="header-InfrastructureOperationsPlatforms"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span variants={fadeUp} className="eyebrow-InfrastructureOperationsPlatforms">
            <BageZescloudAllComps badge="platform capabilities"/>
          </motion.span>

          <motion.h2 variants={fadeUp} className="heading-InfrastructureOperationsPlatforms">
            <span className="heading-line-InfrastructureOperationsPlatforms">Everything you need for</span>
            <span className="heading-accent-InfrastructureOperationsPlatforms">
              modern infrastructure operations.
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="lead-InfrastructureOperationsPlatforms">
            A complete operational platform built around reliability, performance, visibility, and
            intelligent action.
          </motion.p>
        </motion.div>

        {/* ---------------- Cards ---------------- */}
        <motion.div
          className="grid-InfrastructureOperationsPlatforms"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {CAPABILITIES.map(({ title, subtitle, desc, points, link, href, Icon, tone, anim }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`card-InfrastructureOperationsPlatforms tone-${tone}-InfrastructureOperationsPlatforms`}
            >
              <span className="glow-InfrastructureOperationsPlatforms" aria-hidden="true" />

              {/* Top: icon + title */}
              <div className="card-head-InfrastructureOperationsPlatforms">
                <motion.span variants={iconVariants} className="icon-box-InfrastructureOperationsPlatforms">
                  <span className="icon-ring-InfrastructureOperationsPlatforms" aria-hidden="true" />
                  <span className={`icon-anim-${anim}-InfrastructureOperationsPlatforms`}>
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                </motion.span>

                <div className="card-title-wrap-InfrastructureOperationsPlatforms">
                  <h3 className="card-title-InfrastructureOperationsPlatforms">{title}</h3>
                  <p className="card-subtitle-InfrastructureOperationsPlatforms">{subtitle}</p>
                </div>
              </div>

              {/* Body */}
              <motion.p variants={itemVariants} className="card-desc-InfrastructureOperationsPlatforms">
                {desc}
              </motion.p>

              <ul className="points-InfrastructureOperationsPlatforms">
                {points.map((point) => (
                  <motion.li
                    key={point}
                    variants={itemVariants}
                    className="point-InfrastructureOperationsPlatforms"
                  >
                    <span className="bullet-InfrastructureOperationsPlatforms" aria-hidden="true" />
                    {point}
                  </motion.li>
                ))}
              </ul>

              {/* Link */}
              <motion.a
                variants={itemVariants}
                href={href}
                className="link-InfrastructureOperationsPlatforms"
              >
                <span className="link-text-InfrastructureOperationsPlatforms">{link}</span>
                <ArrowRight size={15} strokeWidth={2.2} className="link-arrow-InfrastructureOperationsPlatforms" />
              </motion.a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default InfrastructureOperationsPlatforms;