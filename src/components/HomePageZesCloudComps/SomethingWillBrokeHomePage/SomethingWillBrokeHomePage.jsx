"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpCircle,
  AlertTriangle,
  XCircle,
  TrendingDown,
  ShieldAlert
} from 'lucide-react';
import './SomethingWillBrokeHomePage.css';

const alertCards = [
  {
    id: 1,
    title: "Server offline",
    time: "2 minutes ago",
    statusClass: "status-danger",
    icon: <ArrowUpCircle size={20} />
  },
  {
    id: 2,
    title: "High response time",
    time: "5 minutes ago",
    statusClass: "status-warning",
    icon: <AlertTriangle size={20} />
  },
  {
    id: 3,
    title: "Application error",
    time: "8 minutes ago",
    statusClass: "status-danger",
    icon: <XCircle size={20} />
  },
  {
    id: 4,
    title: "Traffic dropped",
    time: "12 minutes ago",
    statusClass: "status-info",
    icon: <TrendingDown size={20} />
  },
  {
    id: 5,
    title: "Suspicious activity",
    time: "15 minutes ago",
    statusClass: "status-purple",
    icon: <ShieldAlert size={20} />
  },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 }
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
};

function SomethingWillBrokeHomePage() {
  return (
    <section className="section-SomethingWillBrokeHomePage zescloud-section">
      {/* Decorative animated background (behind everything, CSS-only) */}
      <div className="bgGlow-SomethingWillBrokeHomePage" aria-hidden="true" />
      <div className="bgGrid-SomethingWillBrokeHomePage" aria-hidden="true" />

      <div className="zescloud-container">

        <div className="grid-SomethingWillBrokeHomePage">

          {/* Left Side: Content */}
          <motion.div
            className="content-col-SomethingWillBrokeHomePage"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span variants={textItemVariants} className="overline-SomethingWillBrokeHomePage">
              <span className="overlineDot-SomethingWillBrokeHomePage" aria-hidden="true" />
              THE CHALLENGE
            </motion.span>

            <motion.h2 variants={textItemVariants} className="heading-SomethingWillBrokeHomePage">
              SOMETHING <br />
              WILL <span className="highlight-SomethingWillBrokeHomePage">BREAK.</span>
            </motion.h2>

            <motion.p variants={textItemVariants} className="desc-SomethingWillBrokeHomePage">
              A server goes down. A website slows. An application fails. Traffic drops. A security threat appears.
            </motion.p>

            <motion.div variants={textItemVariants} className="highlight-box-SomethingWillBrokeHomePage">
              <p>The question isn't if.</p>
              <p className="highlight-box-strong-SomethingWillBrokeHomePage">It's how fast you knew.</p>
            </motion.div>
          </motion.div>

          {/* Right Side: Animated Cards with Background */}
          <motion.div
            className="visual-col-SomethingWillBrokeHomePage"
            variants={visualVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background image - set the URL in the CSS, on
               .bg-image-wrapper-SomethingWillBrokeHomePage { background-image: url('...'); } */}
            <div className="bg-image-wrapper-SomethingWillBrokeHomePage" aria-hidden="true" />

            <motion.div
              className="cards-wrapper-SomethingWillBrokeHomePage"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {alertCards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{ x: -6 }}
                  className="alert-card-SomethingWillBrokeHomePage"
                >
                  <div className={`icon-box-SomethingWillBrokeHomePage ${card.statusClass}-SomethingWillBrokeHomePage`}>
                    {card.icon}
                    <span className="iconPulse-SomethingWillBrokeHomePage" aria-hidden="true" />
                  </div>
                  <div className="card-text-SomethingWillBrokeHomePage">
                    <h5 className="card-title-SomethingWillBrokeHomePage">{card.title}</h5>
                    <span className="card-time-SomethingWillBrokeHomePage">{card.time}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default SomethingWillBrokeHomePage;