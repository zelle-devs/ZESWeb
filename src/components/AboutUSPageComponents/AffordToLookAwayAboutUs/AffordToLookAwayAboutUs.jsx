"use client";

import React, { useEffect, useRef, useState } from "react";
import "./AffordToLookAwayAboutUs.css";
import BageZescloudAllComps from "@/components/BageZescloudAllComps/BageZescloudAllComps";

const SUFFIX = "AffordToLookAwayAboutUs";
const cls = (...names) =>
  names
    .filter(Boolean)
    .map((name) => `${name}-${SUFFIX}`)
    .join(" ");
const delay = (ms) => ({ "--d": `${ms}ms` });
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&q=80`;

const CartIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g className={cls("iconCart")}>
      <path
        d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="19.5" r="1.4" fill="currentColor" />
    </g>
  </svg>
);

const CubeIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g className={cls("iconCube")}>
      <path
        d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        className={cls("iconCubeFace")}
        d="M12 12l8-4.6L12 2.8 4 7.4z"
        fill="currentColor"
      />
      <path
        d="M4 7.4l8 4.6 8-4.6M12 12v9.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const ShieldIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2.8l7.5 3v5.6c0 4.6-3.2 8.3-7.5 9.8-4.3-1.5-7.5-5.2-7.5-9.8V5.8z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      className={cls("iconShieldCheck")}
      d="M8.8 12.2l2.2 2.2 4.4-4.6"
      pathLength="1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BuildingIcon = () => (
  <svg className={cls("icon")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4.5" y="3" width="10" height="18" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14.5 9h4a1 1 0 0 1 1 1v11h-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    {[
      [7, 6],
      [10.5, 6],
      [7, 10],
      [10.5, 10],
      [7, 14],
      [10.5, 14],
    ].map(([x, y], i) => (
      <rect
        key={`${x}-${y}`}
        className={cls("iconWindow")}
        x={x}
        y={y}
        width="1.8"
        height="1.8"
        rx="0.3"
        fill="currentColor"
        style={{ "--w": i }}
      />
    ))}
    <path d="M3 21h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const audiences = [
  {
    key: "online-stores",
    variant: "cardBlue",
    image: unsplash("photo-1460925895917-afdab827c52f"),
    alt: "Laptop showing an online store analytics dashboard",
    icon: <CartIcon />,
    title: "Online Stores",
    desc: "Need to stay open.",
  },
  {
    key: "saas-products",
    variant: "cardPurple",
    image: unsplash("photo-1522071820081-009f0129c71c"),
    alt: "Product team working together on laptops",
    icon: <CubeIcon />,
    title: "SaaS Products",
    desc: "Customers rely on every day.",
  },
  {
    key: "healthcare-finance",
    variant: "cardGreen",
    image: unsplash("photo-1576091160399-112ba8d25d1d"),
    alt: "Healthcare professional reviewing data on a tablet",
    icon: <ShieldIcon />,
    title: "Healthcare & Finance",
    desc: "Where reliability isn't optional.",
  },
  {
    key: "enterprise-teams",
    variant: "cardCyan",
    image: unsplash("photo-1486406146926-c627a92ad1ab"),
    alt: "Modern enterprise office towers",
    icon: <BuildingIcon />,
    title: "Enterprise Teams",
    desc: "Managing complex systems at scale.",
  },
];

const CARD_START = 380;
const CARD_STEP = 130;

function AudienceCard({ item, index }) {
  const d = CARD_START + index * CARD_STEP;

  const handleError = (event) => {
    event.currentTarget.style.opacity = "0";
  };

  return (
    <li className={cls("card", item.variant)} style={{ ...delay(d), "--i": index }}>
      <div className={cls("media")}>
        <div className={cls("mediaDrift")}>
          <img
            className={cls("image")}
            src={item.image}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            onError={handleError}
          />
        </div>
        <span className={cls("mediaTint")} aria-hidden="true" />
        <span className={cls("mediaCurtain")} aria-hidden="true" />
      </div>

      <span className={cls("cardShade")} aria-hidden="true" />
      <span className={cls("cardBaseLine")} aria-hidden="true" />

      <div className={cls("cardContent")}>
        <div className={cls("iconBox")} style={delay(d + 420)}>
          {item.icon}
        </div>
        <h3 className={cls("cardTitle", "reveal")} style={delay(d + 500)}>
          {item.title}
        </h3>
        <p className={cls("cardDesc", "reveal")} style={delay(d + 580)}>
          {item.desc}
        </p>
      </div>
    </li>
  );
}

function AffordToLookAwayAboutUs() {
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

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

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
      <div className={cls("bg")} aria-hidden="true">
        <span className={cls("bgGrid")} />
        <span className={cls("bgOrb", "bgOrbOne")} />
        <span className={cls("bgOrb", "bgOrbTwo")} />
        <span className={cls("topShade")} />
        <span className={cls("bottomShade")} />
      </div>

      <div className={cls("container")}>
        <div className={cls("layout")}>
          <div className={cls("textCol")}>
            <span className={cls("eyebrow", "reveal")} style={delay(0)}>
              <BageZescloudAllComps badge="Who We Build For" />
            </span>

            <h2 id={`title-${SUFFIX}`} className={cls("title")}>
              <span className={cls("titleLine", "reveal")} style={delay(90)}>
                For Teams That Can&apos;t
              </span>
              <span className={cls("titleLine", "reveal")} style={delay(180)}>
                Afford To <span className={cls("titleAccent")}>Look Away.</span>
              </span>
            </h2>

            <p className={cls("intro", "reveal")} style={delay(280)}>
              Online stores that need to stay open. SaaS products customers rely on every day. Healthcare and
              finance teams where reliability isn&apos;t optional. Enterprises managing complex systems at scale.
            </p>

            <p className={cls("callout", "reveal")} style={delay(380)}>
              If your business runs online, ZesCloud is built for you.
            </p>
          </div>

          <ul className={cls("cards")}>
            {audiences.map((item, i) => (
              <AudienceCard key={item.key} item={item} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AffordToLookAwayAboutUs;