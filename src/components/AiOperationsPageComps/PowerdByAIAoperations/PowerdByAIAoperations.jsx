"use client";

import React, { useEffect, useRef, useState } from "react";
import "./PowerdByAIAoperations.css";
import BageZescloudAllComps from "@/components/BageZescloudAllComps/BageZescloudAllComps";

/* ------------------------------------------------------------------
   Class helper: every class is suffixed with the component file name
   e.g. cls("card") -> "card-PowerdByAIAoperations"
------------------------------------------------------------------- */
const SUFFIX = "PowerdByAIAoperations";
const cls = (...names) =>
  names
    .filter(Boolean)
    .map((name) => `${name}-${SUFFIX}`)
    .join(" ");
const delay = (ms) => ({ "--d": `${ms}ms` });

/* ------------------------------------------------------------------
   Icons (small looping animations, paused when off screen)
------------------------------------------------------------------- */
const BoltIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      className={cls("iconBoltFill")}
      d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6l1-8z"
      fill="currentColor"
    />
    <path
      d="M13.5 2.5L5 13.5h6l-1 8 8.5-11h-6l1-8z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      className={cls("iconTrendBase")}
      d="M7 15.5l3.2-3.6 2.8 2.3 4-4.7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={cls("iconTrendLine")}
      d="M7 15.5l3.2-3.6 2.8 2.3 4-4.7"
      pathLength="1"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={cls("iconTrendHead")}
      d="M14 9.5h3v3"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BellIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g className={cls("iconBell")}>
      <path
        d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15l1.5-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 3v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </g>
    <path
      className={cls("iconClapper")}
      d="M10 21a2 2 0 0 0 4 0"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const GearIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g className={cls("iconGear")}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

/* ------------------------------------------------------------------
   Content
------------------------------------------------------------------- */
const impacts = [
  {
    key: "resolution",
    variant: "cardRed",
    icon: <BoltIcon />,
    title: "Faster Resolution",
    desc: "Reduce the time between detection, investigation, and action.",
  },
  {
    key: "availability",
    variant: "cardGreen",
    icon: <TrendIcon />,
    title: "Improved Availability",
    desc: "Identify operational issues earlier and respond with greater context.",
  },
  {
    key: "noise",
    variant: "cardPurple",
    icon: <BellIcon />,
    title: "Noise Reduction",
    desc: "Focus attention on meaningful signals instead of overwhelming alert volume.",
  },
  {
    key: "efficiency",
    variant: "cardBlue",
    icon: <GearIcon />,
    title: "Operational Efficiency",
    desc: "Automate repetitive investigation and remediation workflows.",
  },
];

const CARD_START = 280;
const CARD_STEP = 120;

/* ------------------------------------------------------------------
   Card
------------------------------------------------------------------- */
function ImpactCard({ item, d }) {
  return (
    <li className={cls("card", item.variant)} style={delay(d)}>
      <span className={cls("cardGlow")} aria-hidden="true" />
      <span className={cls("cardCorner")} aria-hidden="true" />
      <span className={cls("cardAccent")} style={delay(d + 420)} aria-hidden="true" />
      <span className={cls("cardBaseLine")} aria-hidden="true" />

      <div className={cls("cardContent")}>
        <div className={cls("iconBox")} style={delay(d + 140)}>
          <span className={cls("iconRing")} aria-hidden="true" />
          {item.icon}
        </div>
        <h3 className={cls("cardTitle", "reveal")} style={delay(d + 240)}>
          {item.title}
        </h3>
        <p className={cls("cardDesc", "reveal")} style={delay(d + 320)}>
          {item.desc}
        </p>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------
   Section
------------------------------------------------------------------- */
function PowerdByAIAoperations() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const setActive = (on) => {
      node.dataset.active = on ? "true" : "false";
    };

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      setIsVisible(true);
      return undefined;
    }

    // 1) Start the entrance animation once
    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    // 2) Run the looping animations only while the section is near the screen
    const activityObserver = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "150px 0px 150px 0px",
    });

    revealObserver.observe(node);
    activityObserver.observe(node);

    return () => {
      revealObserver.disconnect();
      activityObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cls("section", isVisible && "isVisible")}
      aria-labelledby={`title-${SUFFIX}`}
    >
      {/* Ambient background */}
      <div className={cls("bg")} aria-hidden="true">
        <span className={cls("bgGrid")} />
        <span className={cls("bgOrb", "bgOrbOne")} />
        <span className={cls("bgOrb", "bgOrbTwo")} />
        {/* Dark gradients across the top and bottom of the section */}
        <span className={cls("topShade")} />
        <span className={cls("bottomShade")} />
      </div>

      <div className={cls("container")}>
        {/* Header */}
        <header className={cls("header")}>
          <span className={cls("eyebrow", "reveal")} style={delay(0)}>
            <BageZescloudAllComps badge="Real Impact" />
          </span>
          <h2 id={`title-${SUFFIX}`} className={cls("title")}>
            <span className={cls("titleWord", "reveal")} style={delay(90)}>
              Real Impact.
            </span>{" "}
            <span className={cls("titleWord", "titleAccent", "reveal")} style={delay(180)}>
              Powered by AI.
            </span>
          </h2>
        </header>

        {/* Cards */}
        <ul className={cls("grid")}>
          {impacts.map((item, i) => (
            <ImpactCard key={item.key} item={item} d={CARD_START + i * CARD_STEP} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PowerdByAIAoperations;