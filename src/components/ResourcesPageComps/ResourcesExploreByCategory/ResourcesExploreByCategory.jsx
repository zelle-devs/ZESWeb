'use client'

import React, { memo, useEffect, useRef, useState } from 'react'
import './ResourcesExploreByCategory.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ------------------------------ Icons ------------------------------ */

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconDocumentation = () => (
  <svg {...svgProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity="0.22" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
)

const IconGuides = () => (
  <svg {...svgProps}>
    <path d="M2 9.5L12 4.5l10 5-10 5z" fill="currentColor" fillOpacity="0.22" />
    <path d="M6 11.5v4.8c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.8" />
    <path d="M22 9.5v5.5" />
  </svg>
)

const IconBlog = () => (
  <svg {...svgProps}>
    <path d="M12 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    <path d="M17.5 3.5a2.1 2.1 0 0 1 3 3L13 14l-4 1 1-4z" fill="currentColor" fillOpacity="0.22" />
  </svg>
)

const IconCaseStudies = () => (
  <svg {...svgProps}>
    <rect x="4" y="13" width="3.6" height="7" rx="1" fill="currentColor" fillOpacity="0.22" />
    <rect x="10.2" y="8.5" width="3.6" height="11.5" rx="1" fill="currentColor" fillOpacity="0.22" />
    <rect x="16.4" y="4" width="3.6" height="16" rx="1" fill="currentColor" fillOpacity="0.22" />
  </svg>
)

const IconApi = () => (
  <svg {...svgProps}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>
)

const IconVideos = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.22" />
    <path d="M10 8.6v6.8l5.8-3.4z" fill="currentColor" />
  </svg>
)

const IconArrow = () => (
  <svg {...svgProps} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ------------------------------ Data ------------------------------ */

const CATEGORIES = [
  {
    title: 'Documentation',
    text: 'Technical documentation, setup instructions, configuration references, and product documentation.',
    href: '/resources/documentation',
    Icon: IconDocumentation,
    tone: 'blue',
  },
  {
    title: 'Guides',
    text: 'Step-by-step guides and practical best practices for infrastructure operations.',
    href: '/resources/guides',
    Icon: IconGuides,
    tone: 'blue',
  },
  {
    title: 'Blog',
    text: 'Product updates, infrastructure insights, AI Operations thinking, and industry perspectives.',
    href: '/resources/blog',
    Icon: IconBlog,
    tone: 'purple',
  },
  {
    title: 'Case Studies',
    text: 'Real-world stories showing how teams improve infrastructure visibility and operational efficiency.',
    href: '/resources/case-studies',
    Icon: IconCaseStudies,
    tone: 'blue',
  },
  {
    title: 'API Reference',
    text: 'Explore ZesCloud APIs and learn how to integrate ZesCloud into your own systems.',
    href: '/resources/api-reference',
    Icon: IconApi,
    tone: 'blue',
  },
  {
    title: 'Videos',
    text: 'Product walkthroughs, tutorials, feature demonstrations, and technical explainers.',
    href: '/resources/videos',
    Icon: IconVideos,
    tone: 'violet',
  },
]

/* ------------------------- Background layers -------------------------
   viewBox 1600 x 700, stretched to the section. Lines = flowing light,
   dots = glowing nodes, both move with scroll (parallax) via CSS vars.
------------------------------------------------------------------------ */

const BG_LINES = [
  'M -50 140 C 300 60 520 220 820 150 S 1300 40 1650 120',
  'M -50 300 C 260 380 600 230 900 300 S 1350 420 1650 280',
  'M -50 470 C 340 400 640 560 960 480 S 1380 360 1650 450',
  'M -50 610 C 280 660 620 540 920 620 S 1400 680 1650 590',
  'M 200 -40 C 260 180 120 360 260 740',
  'M 1380 -40 C 1300 200 1460 420 1340 740',
]

const BG_DOTS = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 37 + 7) % 100}%`,
  top: `${(i * 53 + 11) % 100}%`,
  size: `${2 + (i % 3)}px`,
  delay: `${((i * 0.61) % 5).toFixed(2)}s`,
  dur: `${3 + (i % 4)}s`,
  far: i % 2 === 0,
}))

const BG_LAYERS = (
  <div className="bg-fx-ResourcesExploreByCategory" aria-hidden="true">
    <div className="bg-lines-wrap-ResourcesExploreByCategory">
      <svg className="bg-lines-ResourcesExploreByCategory" viewBox="0 0 1600 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bgLineGrad-ResourcesExploreByCategory" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#56B4FF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#7CC4FF" stopOpacity="1" />
            <stop offset="1" stopColor="#1848D9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {BG_LINES.map((d, i) => (
          <g key={d} style={{ '--i-ResourcesExploreByCategory': i }}>
            <path d={d} className="bg-line-base-ResourcesExploreByCategory" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              pathLength="100"
              className="bg-line-glow-ResourcesExploreByCategory"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={d}
              pathLength="100"
              className="bg-line-run-ResourcesExploreByCategory"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
    </div>

    <div className="bg-dots-ResourcesExploreByCategory bg-dots-far-ResourcesExploreByCategory">
      {BG_DOTS.filter((d) => d.far).map((d, i) => (
        <span
          key={i}
          className="bg-dot-ResourcesExploreByCategory"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            '--delay-ResourcesExploreByCategory': d.delay,
            '--dur-ResourcesExploreByCategory': d.dur,
          }}
        />
      ))}
    </div>
    <div className="bg-dots-ResourcesExploreByCategory bg-dots-near-ResourcesExploreByCategory">
      {BG_DOTS.filter((d) => !d.far).map((d, i) => (
        <span
          key={i}
          className="bg-dot-ResourcesExploreByCategory bg-dot-big-ResourcesExploreByCategory"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            '--delay-ResourcesExploreByCategory': d.delay,
            '--dur-ResourcesExploreByCategory': d.dur,
          }}
        />
      ))}
    </div>
  </div>
)

/* ------------------------------ Card ------------------------------ */

const CategoryCard = memo(function CategoryCard({ item, index }) {
  const { title, text, href, Icon, tone } = item
  return (
    <li
      className={`card-item-ResourcesExploreByCategory tone-${tone}-ResourcesExploreByCategory`}
      style={{ '--i-ResourcesExploreByCategory': index }}
    >
      <a href={href} className="card-ResourcesExploreByCategory">
        <span className="card-body-ResourcesExploreByCategory">
          <span className="card-grid-ResourcesExploreByCategory" aria-hidden="true" />

          <span className="icon-ResourcesExploreByCategory">
            <span className="icon-glow-ResourcesExploreByCategory" aria-hidden="true" />
            <span className="icon-svg-ResourcesExploreByCategory">
              <Icon />
            </span>
          </span>

          <span className="card-title-ResourcesExploreByCategory">{title}</span>
          <span className="card-text-ResourcesExploreByCategory">{text}</span>

          <span className="card-link-ResourcesExploreByCategory">
            <span>Explore</span>
            <span className="card-arrow-ResourcesExploreByCategory">
              <IconArrow />
            </span>
          </span>
        </span>
      </a>
    </li>
  )
})

/* ------------------------------ Section ------------------------------ */

function ResourcesExploreByCategory() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(true)

  // reveal once when the section scrolls in; pause loops while off-screen
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // scroll parallax: progress -1 → 1 while the section passes through the viewport.
  // Written as a CSS var (no re-render); layers move with transform only.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !inView) return undefined
    const media = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    if (media && media.matches) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)
      el.style.setProperty('--scroll-ResourcesExploreByCategory', Math.max(-1, Math.min(1, p)).toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [inView])

  return (
    <section
      ref={sectionRef}
      className={`section-ResourcesExploreByCategory${visible ? ' is-visible-ResourcesExploreByCategory' : ''}${
        inView ? '' : ' is-paused-ResourcesExploreByCategory'
      }`}
      aria-labelledby="resources-categories-title-ResourcesExploreByCategory"
    >
      <div className="bg-glow-ResourcesExploreByCategory" aria-hidden="true" />
      {BG_LAYERS}

      <div className="container-ResourcesExploreByCategory">
        <header className="head-ResourcesExploreByCategory">
          <div className="head-left-ResourcesExploreByCategory">
            <div className="reveal-ResourcesExploreByCategory" style={{ '--d-ResourcesExploreByCategory': '0s' }}>
              <BageZescloudAllComps badge="Resource Categories" />
            </div>
            <h2
              id="resources-categories-title-ResourcesExploreByCategory"
              className="title-ResourcesExploreByCategory reveal-ResourcesExploreByCategory"
              style={{ '--d-ResourcesExploreByCategory': '0.1s' }}
            >
              Explore <span className="title-accent-ResourcesExploreByCategory">by category.</span>
            </h2>
          </div>

          <p className="lead-ResourcesExploreByCategory reveal-ResourcesExploreByCategory" style={{ '--d-ResourcesExploreByCategory': '0.2s' }}>
            Find the right resources for your goals — from technical documentation to practical guides and real-world
            insights.
          </p>
        </header>

        <span className="divider-ResourcesExploreByCategory" aria-hidden="true" />

        <ul className="grid-ResourcesExploreByCategory">
          {CATEGORIES.map((item, i) => (
            <CategoryCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ResourcesExploreByCategory