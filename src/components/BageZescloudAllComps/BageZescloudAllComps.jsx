"use client";

import React from 'react';
import { motion } from 'framer-motion';
import './BageZescloudAllComps.css';

/**
 * Reusable ZesCloud badge
 *
 * Usage:
 *   <BageZescloudAllComps badge="platforms" />
 *   <BageZescloudAllComps badge="the challenge" variants={textItemVariants} />
 *   <BageZescloudAllComps badge="platforms" showDot={false} />
 */
function BageZescloudAllComps({
  badge,
  children,
  text,
  showDot = true,
  className = '',
  ...rest
}) {
  return (
    <motion.span
      className={`badge-BageZescloudAllComps ${className}`.trim()}
      {...rest}
    >
      {showDot && (
        <span className="dot-BageZescloudAllComps" aria-hidden="true">
          <span className="ripple-BageZescloudAllComps" />
          <span className="ripple-BageZescloudAllComps ripple-delay-BageZescloudAllComps" />
        </span>
      )}
      <span className="text-BageZescloudAllComps">{badge ?? children ?? text}</span>
    </motion.span>
  );
}

export default BageZescloudAllComps;