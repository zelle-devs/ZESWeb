'use client';

import React, { useEffect, useRef, useState } from 'react';
import './AiOperationRobotAssistantModalRobot.css';

/**
 * 3D Zes AI robot.
 * - three.js + the scene are code-split and only downloaded when the robot
 *   is about to scroll into view, so the page / layout is never blocked.
 * - The canvas ignores pointer events: no click / drag rotation. Only the
 *   head follows the mouse.
 */
function AiOperationRobotAssistantModalRobot({
  modelUrl = '/models/zes-ai-robot.glb',
  className = '',
}) {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let cancelled = false;
    let loadStarted = false;
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startScene = async () => {
      if (loadStarted) return;
      loadStarted = true;
      setStatus('loading');
      try {
        const { default: RobotScene } = await import('./AiOperationRobotAssistantModalRobotScene');
        if (cancelled) return;
        const scene = new RobotScene(host, {
          modelUrl,
          reducedMotion,
          onReady: () => {
            if (!cancelled) setStatus('ready');
          },
          onError: () => {
            if (!cancelled) setStatus('error');
          },
        });
        sceneRef.current = scene;
        scene.start();
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    };

    // 1) load when near the viewport  2) pause rendering when off-screen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startScene();
          if (sceneRef.current) sceneRef.current.setInView(entry.isIntersecting);
        });
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(host);

    return () => {
      cancelled = true;
      io.disconnect();
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, [modelUrl]);

  return (
    <div
      className={`wrapper-AiOperationRobotAssistantModalRobot ${
        status === 'ready' ? 'isReady-AiOperationRobotAssistantModalRobot' : ''
      } ${className}`}
      role="img"
      aria-label="Zes AI Copilot robot assistant"
    >
      <div className="placeholder-AiOperationRobotAssistantModalRobot" aria-hidden="true">
        <span className="placeholderGlow-AiOperationRobotAssistantModalRobot" />
        <span className="placeholderRing-AiOperationRobotAssistantModalRobot" />
      </div>
      <div ref={hostRef} className="canvasHost-AiOperationRobotAssistantModalRobot" />
    </div>
  );
}

export default AiOperationRobotAssistantModalRobot;