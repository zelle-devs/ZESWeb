"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./MostSeeThemAboutUs.css";
import BageZescloudAllComps from "@/components/BageZescloudAllComps/BageZescloudAllComps";

/* ------------------------------------------------------------------
   Background image
   Put your image in: /public/images/about/MostSeeThemAboutUs-bg.png
   (or change the path below)
------------------------------------------------------------------- */
const BG_IMAGE_SRC = "/MostSeeThemAboutUsBackground.png";

/* ------------------------------------------------------------------
   The visual is built on a fixed "canvas" that has the exact size
   ratio of the background image (1922 x 818). Every card, line and
   glow is placed in % / cqw of that canvas, so everything stays
   locked onto the artwork at any zoom level and any screen width.
------------------------------------------------------------------- */
const CANVAS_WIDTH = 1922;
const CANVAS_HEIGHT = 818;

/*
  x / y   -> card centre, in % of the full image
  width   -> card width, in % of the image width
  rotate  -> slant of the card (deg)
  depth   -> how strongly the card follows the mouse
  delay   -> entrance delay (s)
  float   -> duration of the idle float loop (s)
  from    -> point on the server tower (image px) the glowing line starts from
*/
const SYSTEM_CARDS = [
  { id: "servers", label: "Servers", icon: "server", x: 8.5, y: 38.9, width: 8, rotate: 8, depth: 1.4, delay: 0.2, float: 6.2, from: [305, 340] },
  { id: "applications", label: "Applications", icon: "apps", x: 40.5, y: 30.9, width: 9.6, rotate: 14, depth: 1, delay: 0.32, float: 7.1, from: [575, 262] },
  { id: "cloud", label: "Cloud", icon: "cloud", x: 33.8, y: 43.4, width: 6.4, rotate: 6, depth: 0.7, delay: 0.44, float: 5.6, from: [605, 372] },
  { id: "dashboards", label: "Dashboards", icon: "dashboard", x: 42.7, y: 50.8, width: 9, rotate: 18, depth: 1.2, delay: 0.56, float: 6.8, from: [605, 452] },
  { id: "security-tools", label: "Security Tools", icon: "shield", x: 19, y: 58.3, width: 11.6, rotate: 12, depth: 1.6, delay: 0.68, float: 7.4, from: [330, 560] },
  { id: "websites", label: "Websites", icon: "globe", x: 31.6, y: 61, width: 9, rotate: 9, depth: 1.1, delay: 0.8, float: 6, from: [560, 575] },
];

/* Vertical light beams that match the streaks in the artwork */
const LIGHT_BEAMS = [
  { x: 9.4, top: 4, height: 42, duration: 4.2, delay: 0 },
  { x: 16.6, top: 10, height: 38, duration: 5.1, delay: 1.2 },
  { x: 36.4, top: 16, height: 30, duration: 3.8, delay: 0.6 },
  { x: 40, top: 14, height: 32, duration: 4.6, delay: 2 },
  { x: 52, top: 8, height: 42, duration: 5.4, delay: 1.6 },
];

/* Fixed values (no Math.random) so server and client render the same markup */
const PARTICLES = [
  { x: 4, y: 62, size: 0.2, duration: 9, delay: 0 },
  { x: 11, y: 48, size: 0.16, duration: 11, delay: 2.4 },
  { x: 14, y: 70, size: 0.24, duration: 8, delay: 4.1 },
  { x: 21, y: 40, size: 0.18, duration: 10, delay: 1.2 },
  { x: 25, y: 66, size: 0.22, duration: 12, delay: 5.3 },
  { x: 28, y: 34, size: 0.16, duration: 9.5, delay: 3.2 },
  { x: 33, y: 58, size: 0.2, duration: 8.5, delay: 0.8 },
  { x: 37, y: 38, size: 0.24, duration: 11.5, delay: 6 },
  { x: 41, y: 64, size: 0.16, duration: 10.5, delay: 2 },
  { x: 45, y: 44, size: 0.2, duration: 9, delay: 4.6 },
  { x: 48, y: 60, size: 0.18, duration: 12.5, delay: 1.6 },
  { x: 52, y: 36, size: 0.22, duration: 10, delay: 3.8 },
  { x: 18, y: 54, size: 0.14, duration: 13, delay: 7 },
  { x: 7, y: 30, size: 0.18, duration: 10, delay: 5.6 },
];

const getLinkPath = ({ from, x, y }) => {
  const [x1, y1] = from;
  const x2 = (x / 100) * CANVAS_WIDTH;
  const y2 = (y / 100) * CANVAS_HEIGHT;
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - 40;
  return `M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

function SystemIcon({ name }) {
  const svgProps = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };

  switch (name) {
    case "server":
      return (
        <svg {...svgProps}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
        </svg>
      );
    case "apps":
      return (
        <svg {...svgProps}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...svgProps}>
          <path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.2 4.7 4.7 0 0 0 7 18.5Z" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...svgProps}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M7 12.5l3-3 2.5 2 4.5-4.5M9 20h6M12 16v4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...svgProps}>
          <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3Z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "globe":
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

function MostSeeThemAboutUs() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Play the entrance animation once the section scrolls into view */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* Soft mouse parallax on the cards (desktop mouse only) */
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof window === "undefined") return undefined;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frameId = 0;
    let target = { x: 0, y: 0 };

    const applyPointer = () => {
      frameId = 0;
      frame.style.setProperty("--pointer-x", target.x.toFixed(3));
      frame.style.setProperty("--pointer-y", target.y.toFixed(3));
    };

    const schedule = () => {
      if (!frameId) frameId = window.requestAnimationFrame(applyPointer);
    };

    const handleMove = (event) => {
      if (!finePointer.matches || reduceMotion.matches) return;
      const rect = frame.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      target = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
      schedule();
    };

    const handleLeave = () => {
      target = { x: 0, y: 0 };
      schedule();
    };

    frame.addEventListener("pointermove", handleMove);
    frame.addEventListener("pointerleave", handleLeave);

    return () => {
      frame.removeEventListener("pointermove", handleMove);
      frame.removeEventListener("pointerleave", handleLeave);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section-MostSeeThemAboutUs${isVisible ? " is-visible-MostSeeThemAboutUs" : ""}`}
      aria-labelledby="title-MostSeeThemAboutUs"
    >
      <div ref={frameRef} className="frame-MostSeeThemAboutUs">
        {/* ---------- Visual (image + animated layers + cards) ---------- */}
        <div className="visual-MostSeeThemAboutUs">
          <div className="canvas-MostSeeThemAboutUs">
            <Image
              src={BG_IMAGE_SRC}
              alt=""
              fill
              sizes="(max-width: 640px) 200vw, (max-width: 1199px) 180vw, 100vw"
              className="bg-image-MostSeeThemAboutUs"
              draggable={false}
            />

            <span className="sweep-MostSeeThemAboutUs" aria-hidden="true" />

            <div className="beams-MostSeeThemAboutUs" aria-hidden="true">
              {LIGHT_BEAMS.map((beam, index) => (
                <span
                  key={`beam-${index}`}
                  className="beam-MostSeeThemAboutUs"
                  style={{
                    "--beam-x": `${beam.x}%`,
                    "--beam-top": `${beam.top}%`,
                    "--beam-height": `${beam.height}%`,
                    "--beam-duration": `${beam.duration}s`,
                    "--beam-delay": `${beam.delay}s`,
                  }}
                />
              ))}
            </div>

            <span className="tower-glow-MostSeeThemAboutUs" aria-hidden="true">
              <span className="tower-ring-MostSeeThemAboutUs" />
              <span className="tower-ring-MostSeeThemAboutUs tower-ring-late-MostSeeThemAboutUs" />
            </span>

            <svg
              className="links-MostSeeThemAboutUs"
              viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
              aria-hidden="true"
              focusable="false"
            >
              {SYSTEM_CARDS.map((card, index) => {
                const path = getLinkPath(card);
                const begin = `-${(index * 0.6).toFixed(1)}s`;
                return (
                  <g key={`link-${card.id}`}>
                    <path className="link-base-MostSeeThemAboutUs" d={path} />
                    <path
                      className="link-flow-MostSeeThemAboutUs"
                      d={path}
                      style={{ animationDelay: `${index * -0.4}s` }}
                    />
                    <circle className="link-pulse-MostSeeThemAboutUs" r="4">
                      <animateMotion dur="3.6s" begin={begin} repeatCount="indefinite" path={path} />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.15;0.8;1"
                        dur="3.6s"
                        begin={begin}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>

            <div className="particles-MostSeeThemAboutUs" aria-hidden="true">
              {PARTICLES.map((particle, index) => (
                <span
                  key={`particle-${index}`}
                  className="particle-MostSeeThemAboutUs"
                  style={{
                    "--particle-x": `${particle.x}%`,
                    "--particle-y": `${particle.y}%`,
                    "--particle-size": `${particle.size}cqw`,
                    "--particle-duration": `${particle.duration}s`,
                    "--particle-delay": `${particle.delay}s`,
                  }}
                />
              ))}
            </div>

            <ul className="cards-MostSeeThemAboutUs" aria-label="Disconnected business systems">
              {SYSTEM_CARDS.map((card) => (
                <li
                  key={card.id}
                  className="card-anchor-MostSeeThemAboutUs"
                  style={{
                    "--card-x": `${card.x}%`,
                    "--card-y": `${card.y}%`,
                    "--card-width": `${card.width}cqw`,
                    "--card-rotate": `${card.rotate}deg`,
                    "--card-depth": card.depth,
                    "--card-delay": `${card.delay}s`,
                    "--card-float": `${card.float}s`,
                  }}
                >
                  <div className="card-parallax-MostSeeThemAboutUs">
                    <div className="card-float-MostSeeThemAboutUs">
                      <div className="card-MostSeeThemAboutUs">
                        <span className="card-shine-MostSeeThemAboutUs" aria-hidden="true" />
                        <span className="card-icon-MostSeeThemAboutUs">
                          <SystemIcon name={card.icon} />
                        </span>
                        <span className="card-label-MostSeeThemAboutUs">{card.label}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <span className="shade-MostSeeThemAboutUs" aria-hidden="true" />
        </div>

        {/* ---------- Text content ---------- */}
        <div className="content-MostSeeThemAboutUs">
          <p className="eyebrow-MostSeeThemAboutUs reveal-MostSeeThemAboutUs" style={{ "--reveal-order": 0 }}>
           <BageZescloudAllComps badge='Why We Exist'/>
          </p>

          <h2 id="title-MostSeeThemAboutUs" className="title-MostSeeThemAboutUs">
            <span className="title-line-MostSeeThemAboutUs">
              <span className="title-line-text-MostSeeThemAboutUs" style={{ "--reveal-order": 1 }}>
                Businesses Run on Systems.
              </span>
            </span>
            <span className="title-line-MostSeeThemAboutUs">
              <span
                className="title-line-text-MostSeeThemAboutUs title-accent-MostSeeThemAboutUs"
                style={{ "--reveal-order": 2 }}
              >
                Most Can’t See Them.
              </span>
            </span>
          </h2>

          <p className="text-MostSeeThemAboutUs reveal-MostSeeThemAboutUs" style={{ "--reveal-order": 3 }}>
            Servers in one place. Cloud in another. Applications, websites, security tools, dashboards—each
            telling a different part of the story.
          </p>

          <p className="text-MostSeeThemAboutUs reveal-MostSeeThemAboutUs" style={{ "--reveal-order": 4 }}>
            When something goes wrong, teams spend more time searching for answers than solving the problem.
          </p>

          <p className="tagline-MostSeeThemAboutUs reveal-MostSeeThemAboutUs" style={{ "--reveal-order": 5 }}>
            We thought there had to be a clearer way.
          </p>
        </div>
      </div>
    </section>
  );
}

export default MostSeeThemAboutUs;