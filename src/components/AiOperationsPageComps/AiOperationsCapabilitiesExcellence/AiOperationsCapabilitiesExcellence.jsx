"use client";

import React, { useEffect, useRef, useState } from "react";
import "./AiOperationsCapabilitiesExcellence.css";
import BageZescloudAllComps from "@/components/BageZescloudAllComps/BageZescloudAllComps";

/* ------------------------------------------------------------------
   Class helper: every class is suffixed with the component file name
   e.g. cls("card") -> "card-AiOperationsCapabilitiesExcellence"
------------------------------------------------------------------- */
const SUFFIX = "AiOperationsCapabilitiesExcellence";
const cls = (...names) =>
  names
    .filter(Boolean)
    .map((name) => `${name}-${SUFFIX}`)
    .join(" ");
const delay = (ms) => ({ "--d": `${ms}ms` });
const pct = (value, total) => `${((value / total) * 100).toFixed(3)}%`;

/* ------------------------------------------------------------------
   Content
------------------------------------------------------------------- */
const anomalyFeatures = [
  "Adaptive baselines",
  "Multi-dimensional anomaly detection",
  "Context-aware alerting",
  "Reduced alert noise",
  "Higher-signal operational insights",
];

const predictiveFeatures = [
  "Resource growth",
  "Capacity pressure",
  "Service degradation",
  "Performance changes",
  "Infrastructure trends",
];

const assistantQuestions = [
  "Why is the checkout service slow?",
  "Which servers are using the most memory?",
  "What changed in production today?",
  "Show me the latest critical incidents.",
  "What services depend on this database?",
];

const PLACEHOLDER = "Ask a question...";

/* Anomaly chart geometry (viewBox 0 0 220 140) */
const ANOMALY_W = 220;
const ANOMALY_H = 140;
const anomalyLine =
  "M0 118 L16 110 L30 116 L46 98 L60 104 L76 88 L90 95 L106 76 L120 84 L136 58 L150 68 L166 36 L180 50 L198 22 L214 30";
const anomalyDots = [
  [46, 98],
  [106, 76],
  [136, 58],
  [198, 22],
];
const anomalySpike = [166, 36];

/* Root cause visual geometry (viewBox 0 0 180 140) */
const RCA_W = 180;
const RCA_H = 140;
const rcaSlabs = [62, 40, 18];
const rcaLinks = [
  { path: "M100 70 Q 50 40 8 30", dur: "2.6s", begin: "0s" },
  { path: "M100 78 Q 50 112 14 118", dur: "3.1s", begin: "0.6s" },
  { path: "M100 64 Q 140 30 172 22", dur: "2.8s", begin: "1.1s" },
  { path: "M100 80 Q 150 112 174 112", dur: "3.4s", begin: "0.3s" },
];
const rcaNodes = [
  [8, 30],
  [14, 118],
  [172, 22],
  [174, 112],
];

/* Predictive chart geometry (viewBox 0 0 240 140) */
const PRED_W = 240;
const PRED_H = 140;
const predictiveBars = [16, 24, 20, 30, 27, 38, 34, 46, 42, 56, 52, 66, 62, 78, 92];
const BAR_W = 10;
const BAR_STEP = 15.5;
const BAR_SCALE = 1.2;
const trendPoints = predictiveBars
  .map((h, i) => [8 + i * BAR_STEP + BAR_W / 2, PRED_H - h * BAR_SCALE - 12])
  .filter((_, i) => i % 2 === 0);
const trendPath = `M${trendPoints.map((p) => p.join(" ")).join(" L")}`;
const trendHead = trendPoints[trendPoints.length - 1];

/* Seamless wave: one period = 400 units, drawn twice so it can loop */
const wavePath = (y, a) =>
  `M0 ${y} C66 ${y - a} 133 ${y - a} 200 ${y} C266 ${y + a} 333 ${y + a} 400 ${y} ` +
  `C466 ${y - a} 533 ${y - a} 600 ${y} C666 ${y + a} 733 ${y + a} 800 ${y}`;
const assistWaves = [
  [140, 22],
  [155, 20],
  [170, 18],
  [185, 16],
];

/* Deterministic particles (no hydration mismatch) */
const sectionParticles = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 100,
  s: 1 + (i % 3),
  dur: 9 + (i % 5) * 2,
  wait: (i * 0.7) % 8,
}));

const predictiveParticles = Array.from({ length: 8 }, (_, i) => ({
  x: 30 + ((i * 29) % 68),
  dur: 3.2 + (i % 4) * 0.8,
  wait: i * 0.55,
}));

/* ------------------------------------------------------------------
   Icons
------------------------------------------------------------------- */
const CheckMark = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircle = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 10.2l2.4 2.4 4.6-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertXIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M21 3L10.3 13.7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 3l-6.6 18-4.1-7.3L3 9.6 21 3z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
  </svg>
);

const AnomalyIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M2 12h4l2-5 3 10 3-13 3 11 2-3h3"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={cls("iconPulsePath")}
      d="M2 12h4l2-5 3 10 3-13 3 11 2-3h3"
      pathLength="1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TargetIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className={cls("iconTargetRing")} cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3.2 2.4" />
    <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.6" />
    <circle className={cls("iconTargetCore")} cx="12" cy="12" r="2" fill="currentColor" />
    <path d="M12 1v3.5M12 19.5V23M1 12h3.5M19.5 12H23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const BarsIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect className={cls("iconBar")} x="4" y="12" width="4" height="8" rx="1" fill="currentColor" style={{ "--i": 0 }} />
    <rect className={cls("iconBar")} x="10" y="8" width="4" height="12" rx="1" fill="currentColor" style={{ "--i": 1 }} />
    <rect className={cls("iconBar")} x="16" y="4" width="4" height="16" rx="1" fill="currentColor" style={{ "--i": 2 }} />
  </svg>
);

const BulbIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      className={cls("iconBulbBody")}
      d="M12 4.5a5.5 5.5 0 0 0-3.3 9.9c.6.5.9 1.1.9 1.8v.8h4.8v-.8c0-.7.3-1.3.9-1.8A5.5 5.5 0 0 0 12 4.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M10 19.6h4M10.8 22h2.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path className={cls("iconBulbRay")} style={{ "--i": 0 }} d="M12 .8v1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path className={cls("iconBulbRay")} style={{ "--i": 1 }} d="M4.3 3.6l1.1 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path className={cls("iconBulbRay")} style={{ "--i": 2 }} d="M19.7 3.6l-1.1 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path className={cls("iconBulbRay")} style={{ "--i": 3 }} d="M1.6 10h1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path className={cls("iconBulbRay")} style={{ "--i": 4 }} d="M20.8 10h1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChatIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.5 4.5h15a1.5 1.5 0 0 1 1.5 1.5v9.5a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V17h-1A1.5 1.5 0 0 1 3 15.5V6a1.5 1.5 0 0 1 1.5-1.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle className={cls("iconChatDot")} style={{ "--i": 0 }} cx="8" cy="10.8" r="1.3" fill="currentColor" />
    <circle className={cls("iconChatDot")} style={{ "--i": 1 }} cx="12" cy="10.8" r="1.3" fill="currentColor" />
    <circle className={cls("iconChatDot")} style={{ "--i": 2 }} cx="16" cy="10.8" r="1.3" fill="currentColor" />
  </svg>
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="6.5" y="6.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="0.8" fill="currentColor" />
    <path
      d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M11 3l1.9 5.6 5.6 1.9-5.6 1.9L11 18l-1.9-5.6-5.6-1.9 5.6-1.9z" fill="currentColor" />
    <path className={cls("iconSparkleSmall")} d="M18.5 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" fill="currentColor" />
  </svg>
);

/* ------------------------------------------------------------------
   Card shell with cursor spotlight
   - pointer updates are batched to one per frame (requestAnimationFrame)
   - CSS variables are written only on the two glow layers, so the rest
     of the card never has to recalculate styles while the mouse moves
------------------------------------------------------------------- */
function Card({ variant, delayMs, visual, children }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const glowRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const handleMove = (event) => {
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;
    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = `${pointerRef.current.x - rect.left}px`;
      const y = `${pointerRef.current.y - rect.top}px`;
      [spotRef.current, glowRef.current].forEach((layer) => {
        if (!layer) return;
        layer.style.setProperty("--mx", x);
        layer.style.setProperty("--my", y);
      });
    });
  };

  return (
    <article ref={cardRef} className={cls("card", variant)} style={delay(delayMs)} onMouseMove={handleMove}>
      <span ref={spotRef} className={cls("cardSpotlight")} aria-hidden="true" />
      <span ref={glowRef} className={cls("cardBorderGlow")} aria-hidden="true" />
      {visual}
      <div className={cls("cardContent")}>{children}</div>
    </article>
  );
}

function CardHead({ icon, title, subtitle, variant, d }) {
  return (
    <div className={cls("cardHead")}>
      <div className={cls("iconBox", `iconBox${variant}`, "reveal")} style={delay(d)}>
        <span className={cls("iconRing")} aria-hidden="true" />
        {icon}
      </div>
      <div className={cls("cardHeadText")}>
        <h3 className={cls("cardTitle", "reveal")} style={delay(d + 80)}>
          {title}
        </h3>
        <p className={cls("cardSubtitle", "reveal")} style={delay(d + 150)}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function FeatureList({ items, start }) {
  return (
    <ul className={cls("featureList")}>
      {items.map((item, i) => (
        <li key={item} className={cls("featureItem", "reveal")} style={delay(start + i * 90)}>
          <span className={cls("featureCheck")}>
            <CheckMark />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------
   Card background visuals
   The SVGs only hold shapes that are drawn once. Everything that keeps
   moving (dots, rings, bars, slabs, LEDs, glows, waves) is an HTML layer
   animated with transform / opacity so the GPU handles it.
------------------------------------------------------------------- */
function AnomalyChart({ d }) {
  const [sx, sy] = anomalySpike;
  const spikePos = { left: pct(sx, ANOMALY_W), top: pct(sy, ANOMALY_H) };

  return (
    <div className={cls("anomalyChart")} style={delay(d)} aria-hidden="true">
      <svg viewBox={`0 0 ${ANOMALY_W} ${ANOMALY_H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`anomalyStroke-${SUFFIX}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--aoce-primary)", stopOpacity: 0 }} />
            <stop offset="35%" style={{ stopColor: "var(--aoce-primary)", stopOpacity: 0.55 }} />
            <stop offset="100%" style={{ stopColor: "var(--aoce-cyan)", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id={`anomalyArea-${SUFFIX}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--aoce-primary)", stopOpacity: 0.32 }} />
            <stop offset="100%" style={{ stopColor: "var(--aoce-primary)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        <g className={cls("anomalyGrid")}>
          {[28, 56, 84, 112].map((y) => (
            <line key={y} x1="0" x2={ANOMALY_W} y1={y} y2={y} />
          ))}
        </g>

        <path className={cls("anomalyArea")} d={`${anomalyLine} L214 140 L0 140 Z`} fill={`url(#anomalyArea-${SUFFIX})`} />
        <path className={cls("anomalyLineGlow")} d={anomalyLine} pathLength="1" stroke={`url(#anomalyStroke-${SUFFIX})`} />
        <path className={cls("anomalyLine")} d={anomalyLine} pathLength="1" stroke={`url(#anomalyStroke-${SUFFIX})`} />
      </svg>

      {anomalyDots.map(([x, y], i) => (
        <span
          key={`${x}-${y}`}
          className={cls("anomalyDot")}
          style={{ left: pct(x, ANOMALY_W), top: pct(y, ANOMALY_H), "--i": i }}
        />
      ))}

      <span className={cls("anomalyRingPulse")} style={{ ...spikePos, "--i": 0 }} />
      <span className={cls("anomalyRingPulse")} style={{ ...spikePos, "--i": 1 }} />
      <span className={cls("anomalyRingCore")} style={spikePos} />

      <span className={cls("anomalyScan")} />
    </div>
  );
}

function RcaVisual({ d }) {
  return (
    <div className={cls("rcaVisual")} style={delay(d)} aria-hidden="true">
      {/* Network layer: links + travelling packets */}
      <svg className={cls("rcaNetwork")} viewBox={`0 0 ${RCA_W} ${RCA_H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`slabTop-${SUFFIX}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--aoce-cyan)" }} />
            <stop offset="100%" style={{ stopColor: "var(--aoce-primary)" }} />
          </linearGradient>
          <linearGradient id={`slabLeft-${SUFFIX}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--aoce-slab-left-top)" }} />
            <stop offset="100%" style={{ stopColor: "var(--aoce-slab-left-bottom)" }} />
          </linearGradient>
          <linearGradient id={`slabRight-${SUFFIX}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--aoce-slab-right-top)" }} />
            <stop offset="100%" style={{ stopColor: "var(--aoce-slab-right-bottom)" }} />
          </linearGradient>
        </defs>

        {rcaLinks.map((link) => (
          <path key={link.path} className={cls("rcaLink")} d={link.path} />
        ))}
        {rcaLinks.map((link) => (
          <g key={`packet-${link.path}`} className={cls("rcaPacket")}>
            <circle r="3.6" className={cls("rcaPacketHalo")} />
            <circle r="1.8" className={cls("rcaPacketCore")} />
            <animateMotion dur={link.dur} begin={link.begin} repeatCount="indefinite" path={link.path} />
          </g>
        ))}
      </svg>

      {rcaNodes.map(([x, y], i) => (
        <span key={`${x}-${y}`} className={cls("rcaNode")} style={{ left: pct(x, RCA_W), top: pct(y, RCA_H), "--i": i }} />
      ))}

      <span className={cls("rcaGlow")} />

      {/* Each slab is its own floating layer */}
      {rcaSlabs.map((y, i) => (
        <div key={y} className={cls("rcaSlab")} style={{ "--i": i }}>
          <svg viewBox={`0 0 ${RCA_W} ${RCA_H}`} preserveAspectRatio="none">
            <g transform="translate(40 12)">
              <polygon points={`20,${y + 18} 60,${y + 36} 60,${y + 48} 20,${y + 30}`} fill={`url(#slabLeft-${SUFFIX})`} />
              <polygon points={`60,${y + 36} 100,${y + 18} 100,${y + 30} 60,${y + 48}`} fill={`url(#slabRight-${SUFFIX})`} />
              <polygon
                className={cls("rcaSlabTop")}
                points={`60,${y} 100,${y + 18} 60,${y + 36} 20,${y + 18}`}
                fill={`url(#slabTop-${SUFFIX})`}
              />
              <line className={cls("rcaSlabLine")} x1="26" y1={y + 27} x2="52" y2={y + 40} />
              <line className={cls("rcaSlabLine")} x1="64" y1={y + 40} x2="82" y2={y + 31} />
            </g>
          </svg>
          <span className={cls("rcaLed")} style={{ left: pct(129, RCA_W), top: pct(y + 39.5, RCA_H), "--i": i }} />
          <span
            className={cls("rcaLed", "rcaLedAlt")}
            style={{ left: pct(134.5, RCA_W), top: pct(y + 36.8, RCA_H), "--i": i }}
          />
        </div>
      ))}
    </div>
  );
}

function PredictiveChart({ d }) {
  const headPos = { left: pct(trendHead[0], PRED_W), top: pct(trendHead[1], PRED_H) };

  return (
    <div className={cls("predChart")} style={delay(d)} aria-hidden="true">
      {predictiveBars.map((h, i) => (
        <span
          key={i}
          className={cls("predBar", i >= predictiveBars.length - 3 && "predBarForecast")}
          style={{
            left: pct(8 + i * BAR_STEP, PRED_W),
            width: pct(BAR_W, PRED_W),
            height: pct(h * BAR_SCALE, PRED_H),
            "--i": i,
          }}
        />
      ))}

      <svg className={cls("predTrendSvg")} viewBox={`0 0 ${PRED_W} ${PRED_H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`predTrend-${SUFFIX}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" style={{ stopColor: "var(--aoce-cyan)", stopOpacity: 0 }} />
            <stop offset="100%" style={{ stopColor: "var(--aoce-purple-pale)", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path className={cls("predTrendGlow")} d={trendPath} pathLength="1" stroke={`url(#predTrend-${SUFFIX})`} />
        <path className={cls("predTrend")} d={trendPath} pathLength="1" stroke={`url(#predTrend-${SUFFIX})`} />
      </svg>

      <span className={cls("predTrendHalo")} style={headPos} />
      <span className={cls("predTrendHead")} style={headPos} />

      <div className={cls("predParticles")}>
        {predictiveParticles.map((p, i) => (
          <span
            key={i}
            className={cls("predParticle")}
            style={{ "--x": `${p.x}%`, "--dur": `${p.dur}s`, "--wait": `${p.wait}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function RecommendVisual() {
  return (
    <div className={cls("recVisual")} aria-hidden="true">
      <span className={cls("recGlow")} />
      <span className={cls("recDots")}>
        <span className={cls("recDotsInner")} />
      </span>
    </div>
  );
}

function AssistantWaves() {
  return (
    <div className={cls("assistWaves")} aria-hidden="true">
      {assistWaves.map(([y, a], i) => (
        <svg
          key={y}
          className={cls("assistWaveLayer")}
          style={{ "--i": i }}
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
        >
          <path className={cls("assistWave")} d={wavePath(y, a)} />
        </svg>
      ))}
      <span className={cls("assistGlow")} />
    </div>
  );
}

/* ------------------------------------------------------------------
   Assistant panel
   Kept as its own component so typing never re-renders the section.
   The typed letters are written straight into the DOM; React only
   re-renders this panel when the highlighted question changes.
------------------------------------------------------------------- */
function AssistantPanel({ active, inViewRef }) {
  const typedRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(-1);

  useEffect(() => {
    if (typedRef.current) typedRef.current.textContent = PLACEHOLDER;
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    let i = 0;
    let ch = 0;
    let deleting = false;
    let timer;

    const write = (text) => {
      if (typedRef.current) typedRef.current.textContent = text;
    };

    const tick = () => {
      // Section scrolled away: wait without doing any work
      if (inViewRef && !inViewRef.current) {
        timer = setTimeout(tick, 500);
        return;
      }

      const phrase = assistantQuestions[i];

      if (!deleting) {
        if (ch === 0) setActiveQuestion(i);
        ch += 1;
        write(phrase.slice(0, ch));
        if (ch >= phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 1900);
          return;
        }
        timer = setTimeout(tick, 42 + Math.random() * 38);
        return;
      }

      ch -= 1;
      write(phrase.slice(0, ch));
      if (ch <= 0) {
        deleting = false;
        i = (i + 1) % assistantQuestions.length;
        timer = setTimeout(tick, 450);
        return;
      }
      timer = setTimeout(tick, 22);
    };

    timer = setTimeout(tick, 2000);
    return () => clearTimeout(timer);
  }, [active, inViewRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    // Connect to Zes AI here, e.g. onAsk(question)
    setQuestion("");
  };

  const showTyped = !question && !inputFocused;

  return (
    <div className={cls("assistBody")}>
      <p className={cls("assistLabel", "reveal")} style={delay(1120)}>
        Ask questions such as:
      </p>
      <ul className={cls("assistList")}>
        {assistantQuestions.map((q, i) => (
          <li
            key={q}
            className={cls("assistItem", i === activeQuestion && "assistItemActive", "reveal")}
            style={delay(1220 + i * 90)}
          >
            <button type="button" className={cls("assistQuestion")} onClick={() => setQuestion(q)}>
              <span className={cls("assistCheck")}>
                <CheckCircle />
              </span>
              <span>{q}</span>
            </button>
          </li>
        ))}
      </ul>

      <form className={cls("assistForm", "reveal")} style={delay(1720)} onSubmit={handleSubmit}>
        <div className={cls("assistInputWrap")}>
          <input
            className={cls("assistInput")}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder={showTyped ? "" : PLACEHOLDER}
            aria-label="Ask a question about your infrastructure"
          />
          <span className={cls("assistTyped", !showTyped && "assistTypedHidden")} aria-hidden="true">
            <span ref={typedRef} className={cls("assistTypedText")} />
            <span className={cls("assistCaret")} />
          </span>
        </div>
        <button type="submit" className={cls("assistSend")} aria-label="Send question">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------
   Section
------------------------------------------------------------------- */
function AiOperationsCapabilitiesExcellence() {
  const sectionRef = useRef(null);
  const inViewRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const setActive = (on) => {
      inViewRef.current = on;
      node.dataset.active = on ? "true" : "false";
      // Pause / resume the SVG packet animations too
      node.querySelectorAll("svg").forEach((svg) => {
        if (on && typeof svg.unpauseAnimations === "function") svg.unpauseAnimations();
        if (!on && typeof svg.pauseAnimations === "function") svg.pauseAnimations();
      });
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
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
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
        <span className={cls("bgGrid")}>
          <span className={cls("bgGridInner")} />
        </span>
        <span className={cls("bgOrb", "bgOrbOne")} />
        <span className={cls("bgOrb", "bgOrbTwo")} />
        <span className={cls("bgOrb", "bgOrbThree")} />
        <div className={cls("particles")}>
          {sectionParticles.map((p, i) => (
            <span
              key={i}
              className={cls("particle")}
              style={{
                "--x": `${p.x}%`,
                "--y": `${p.y}%`,
                "--s": `${p.s}px`,
                "--dur": `${p.dur}s`,
                "--wait": `${p.wait}s`,
              }}
            />
          ))}
        </div>
        {/* Dark gradient across the top of the section */}
        <span className={cls("topShade")} />
          <span className={cls("bottomShade")} />
      </div>

      <div className={cls("container")}>
        {/* Header */}
        <header className={cls("header")}>
          <div className={cls("headingGroup")}>
            <span className={cls("eyebrow", "reveal")} style={delay(0)}>
              <BageZescloudAllComps badge='AI Capabilities'/>
            </span>
            <h2 id={`title-${SUFFIX}`} className={cls("title")}>
              <span className={cls("titleLine", "reveal")} style={delay(100)}>
                AI Capabilities That Drive
              </span>
              <span className={cls("titleLine", "titleAccent", "reveal")} style={delay(200)}>
                Operational Excellence.
              </span>
            </h2>
          </div>
          <p className={cls("intro", "reveal")} style={delay(260)}>
            From anomaly detection to automated actions, ZesCloud&apos;s AI capabilities help your team operate with
            greater visibility, context, and control.
          </p>
        </header>

        {/* Row 1 */}
        <div className={cls("grid", "gridTop")}>
          {/* Anomaly Detection */}
          <Card variant="cardAnomaly" delayMs={320} visual={<AnomalyChart d={760} />}>
            <CardHead
              variant="Blue"
              d={420}
              icon={<AnomalyIcon />}
              title="Anomaly Detection"
              subtitle="Detect issues before they become incidents."
            />
            <p className={cls("cardDesc", "reveal")} style={delay(620)}>
              ZesCloud establishes dynamic behavioral baselines and identifies meaningful deviations across your
              infrastructure.
            </p>
            <FeatureList items={anomalyFeatures} start={760} />
            <a href="#anomaly-detection" className={cls("cardLink", "reveal")} style={delay(1260)}>
              Explore Anomaly Detection
              <span className={cls("cardLinkArrow")}>
                <ArrowRight />
              </span>
            </a>
          </Card>

          {/* Root Cause Analysis */}
          <Card variant="cardRca" delayMs={440} visual={<RcaVisual d={820} />}>
            <CardHead
              variant="Blue"
              d={540}
              icon={<TargetIcon />}
              title="Root Cause Analysis"
              subtitle="Find the cause, not just the symptom."
            />
            <p className={cls("cardDesc", "cardDescNarrow", "reveal")} style={delay(740)}>
              Zes AI correlates infrastructure signals and dependencies to help your team understand what may have
              triggered an incident.
            </p>

            <div className={cls("rcaCompare", "reveal")} style={delay(900)}>
              <div className={cls("rcaBox", "rcaBoxBefore")}>
                <span className={cls("rcaLabel")}>Instead of:</span>
                <div className={cls("rcaRow")}>
                  <span className={cls("rcaStatus", "rcaStatusBad")}>
                    <AlertXIcon />
                  </span>
                  <p className={cls("rcaQuote")}>&ldquo;API response time is high.&rdquo;</p>
                </div>
              </div>

              <div className={cls("rcaFlow")} aria-hidden="true">
                <span className={cls("rcaFlowDot")} />
              </div>

              <div className={cls("rcaBox", "rcaBoxAfter", "reveal")} style={delay(1080)}>
                <span className={cls("rcaShine")} aria-hidden="true" />
                <span className={cls("rcaLabel", "rcaLabelBright")}>Zes AI can help investigate:</span>
                <div className={cls("rcaRow")}>
                  <span className={cls("rcaStatus", "rcaStatusGood")}>
                    <CheckMark />
                  </span>
                  <p className={cls("rcaQuote", "rcaQuoteBright")}>
                    &ldquo;API latency increased after{" "}
                    <mark className={cls("rcaMark")} style={delay(1600)}>
                      database response time increased
                    </mark>
                    , while{" "}
                    <mark className={cls("rcaMark")} style={delay(1950)}>
                      memory utilization
                    </mark>{" "}
                    on the database server also moved above its normal range.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Predictive Insights */}
          <Card variant="cardPredictive" delayMs={560} visual={<PredictiveChart d={940} />}>
            <CardHead
              variant="Purple"
              d={660}
              icon={<BarsIcon />}
              title="Predictive Insights"
              subtitle="See what could happen next."
            />
            <p className={cls("cardDesc", "reveal")} style={delay(860)}>
              Identify trends and behavioral changes that may indicate an emerging operational problem.
            </p>
            <FeatureList items={predictiveFeatures} start={1000} />
          </Card>
        </div>

        {/* Row 2 */}
        <div className={cls("grid", "gridBottom")}>
          {/* Smart Recommendations */}
          <Card variant="cardRecommend" delayMs={700} visual={<RecommendVisual />}>
            <CardHead
              variant="Blue"
              d={800}
              icon={<BulbIcon />}
              title="Smart Recommendations"
              subtitle="Know what to do next."
            />
            <p className={cls("cardDesc", "reveal")} style={delay(1000)}>
              Zes AI turns operational observations into recommendations that include context, reasoning, and potential
              impact.
            </p>

            <div className={cls("recPanel", "reveal")} style={delay(1100)}>
              <div className={cls("recAlert", "reveal")} style={delay(1150)}>
                <span className={cls("recAlertIcon")}>
                  <CpuIcon />
                </span>
                <div className={cls("recAlertText")}>
                  <strong className={cls("recAlertTitle")}>High CPU usage detected</strong>
                  <span className={cls("recAlertMeta")}>on web-01</span>
                </div>
              </div>

              <div className={cls("recFlow", "reveal")} style={delay(1320)} aria-hidden="true">
                <span className={cls("recFlowDot")} />
              </div>

              <div className={cls("recAction", "reveal")} style={delay(1420)}>
                <span className={cls("recActionBorder")} aria-hidden="true" />
                <div className={cls("recActionInner")}>
                  <div className={cls("recActionHead")}>
                    <span className={cls("recActionIcon")}>
                      <SparkleIcon />
                    </span>
                    <strong className={cls("recActionTitle")}>Recommended Action</strong>
                    <span className={cls("recActionChevron")}>
                      <ChevronRight />
                    </span>
                  </div>
                  <div className={cls("recActionBody")}>
                    <span className={cls("recActionCheck")}>
                      <CheckMark />
                    </span>
                    <p className={cls("recActionText")}>
                      Restart service and monitor.
                      <br />
                      Similar issue resolved 3 times before.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Natural Language Assistant */}
          <Card variant="cardAssistant" delayMs={820} visual={<AssistantWaves />}>
            <CardHead
              variant="Blue"
              d={920}
              icon={<ChatIcon />}
              title="Natural Language Assistant"
              subtitle="Ask anything about your infrastructure."
            />
            <AssistantPanel active={isVisible} inViewRef={inViewRef} />
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AiOperationsCapabilitiesExcellence;