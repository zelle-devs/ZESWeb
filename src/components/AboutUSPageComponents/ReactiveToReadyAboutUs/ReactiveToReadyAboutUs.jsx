"use client";

import React, { useEffect, useRef, useState } from "react";
import "./ReactiveToReadyAboutUs.css";
import BageZescloudAllComps from "@/components/BageZescloudAllComps/BageZescloudAllComps";

/* ------------------------------------------------------------------
   Class helper: every class is suffixed with the component file name
   e.g. cls("step") -> "step-ReactiveToReadyAboutUs"
------------------------------------------------------------------- */
const SUFFIX = "ReactiveToReadyAboutUs";
const cls = (...names) =>
  names
    .filter(Boolean)
    .map((name) => `${name}-${SUFFIX}`)
    .join(" ");
const delay = (ms) => ({ "--d": `${ms}ms` });

/* ------------------------------------------------------------------
   Icons (small looping animations, paused when off screen)
------------------------------------------------------------------- */
const EyeIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g className={cls("iconEyeLid")}>
      <path
        d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <g className={cls("iconEyePupil")}>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.1" fill="currentColor" />
      </g>
    </g>
  </svg>
);

const SearchIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g className={cls("iconLens")}>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.3 15.3L20.5 20.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path
        className={cls("iconLensGlint")}
        d="M7.6 9.2a3.2 3.2 0 0 1 2.4-2.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const BarsIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect className={cls("iconBar")} x="4" y="13" width="4" height="7" rx="1" fill="currentColor" style={{ "--b": 0 }} />
    <rect className={cls("iconBar")} x="10" y="9" width="4" height="11" rx="1" fill="currentColor" style={{ "--b": 1 }} />
    <rect className={cls("iconBar")} x="16" y="4" width="4" height="16" rx="1" fill="currentColor" style={{ "--b": 2 }} />
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

const ArrowHead = () => (
  <svg className={cls("connectorArrow")} viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M3 1.5L7 5 3 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------
   Content
------------------------------------------------------------------- */
const steps = [
  {
    key: "observe",
    variant: "stepBlue",
    icon: <EyeIcon />,
    title: "Observe",
    desc: "Collect data across your infrastructure.",
  },
  {
    key: "understand",
    variant: "stepPurple",
    icon: <SearchIcon />,
    title: "Understand",
    desc: "Find patterns and root causes.",
  },
  {
    key: "predict",
    variant: "stepCyan",
    icon: <BarsIcon />,
    title: "Predict",
    desc: "Anticipate issues before they impact your business.",
  },
  {
    key: "act",
    variant: "stepGreen",
    icon: <GearIcon />,
    title: "Act",
    desc: "Get clear recommendations and automate when possible.",
  },
];

const STEP_START = 250;
const STEP_GAP = 200;

/* ------------------------------------------------------------------
   Step
------------------------------------------------------------------- */
function FlowStep({ step, index, isLast }) {
  const d = STEP_START + index * STEP_GAP;

  return (
    <li className={cls("step", step.variant)} style={{ "--i": index }}>
      <div className={cls("stepIconWrap")} style={delay(d)}>
        <span className={cls("stepHalo")} aria-hidden="true" />
        <span className={cls("stepRing")} aria-hidden="true" />
        <div className={cls("stepIcon")}>{step.icon}</div>
      </div>

      {!isLast && (
        <span className={cls("connector")} style={delay(d + 220)} aria-hidden="true">
          <span className={cls("connectorLine")} />
          <span className={cls("connectorRunner")}>
            <span className={cls("connectorDot")} />
          </span>
          <ArrowHead />
        </span>
      )}

      <h3 className={cls("stepTitle", "reveal")} style={delay(d + 120)}>
        {step.title}
      </h3>
      <p className={cls("stepDesc", "reveal")} style={delay(d + 200)}>
        {step.desc}
      </p>
    </li>
  );
}

/* ------------------------------------------------------------------
   Section
------------------------------------------------------------------- */
function ReactiveToReadyAboutUs() {
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
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
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
        <div className={cls("layout")}>
          {/* Right column: text */}
          <div className={cls("textCol")}>
            <span className={cls("eyebrow", "reveal")} style={delay(450)}>
              <BageZescloudAllComps badge="How We Think" />
            </span>
            <h2 id={`title-${SUFFIX}`} className={cls("title")}>
              <span className={cls("titleLine", "reveal")} style={delay(540)}>
                From Reactive
              </span>
              <span className={cls("titleLine", "titleAccent", "reveal")} style={delay(630)}>
                To Ready.
              </span>
            </h2>
            <p className={cls("intro", "reveal")} style={delay(740)}>
              Most businesses find out about problems when customers do. We&apos;re building a world where teams
              find out first, understand why, and act before anyone notices.
            </p>
          </div>

          {/* Divider */}
          <span className={cls("divider")} style={delay(200)} aria-hidden="true" />

          {/* Left column: flow */}
          <div className={cls("flowCol")}>
            <ol className={cls("flow")}>
              {steps.map((step, i) => (
                <FlowStep key={step.key} step={step} index={i} isLast={i === steps.length - 1} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReactiveToReadyAboutUs;