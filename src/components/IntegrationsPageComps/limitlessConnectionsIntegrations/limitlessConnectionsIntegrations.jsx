'use client'

import React, { memo, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  SiAnsible,
  SiBitbucket,
  SiDigitalocean,
  SiDiscord,
  SiElasticsearch,
  SiFortinet,
  SiHelm,
  SiNutanix,
  SiOkta,
  SiPagerduty,
  SiProxmox,
  SiRedhatopenshift,
  SiSplunk,
  SiTerraform,
} from 'react-icons/si'
import { DiMsqlServer } from 'react-icons/di'
import { TbWebhook } from 'react-icons/tb'
import './limitlessConnectionsIntegrations.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* ---------------------------------------------------------------------------
   limitlessConnectionsIntegrations
   Integration ecosystem section: search + category filters + animated grid.

   Logos shown on the cards are your own SVGs from /public/IntegrationsIcons
   (`src` below). Integrations that only appear in search results use
   `react-icons` (npm install react-icons@5.7.0) until you add a file for them:
   give the item a `src` and it switches to your SVG automatically.

   Layout (desktop, nothing filtered):
     Cloud | Infrastructure | Containers    | Databases (tall,
     DevOps| Communication  | Security      |  2 x 2 logos)
--------------------------------------------------------------------------- */

const LINK_BASE = '/integrations'
const ICON_BASE = '/IntegrationsIcons'
const LEAVE_MS = 200 // cards fade out this long before the new results come in
const SEARCH_DEBOUNCE_MS = 140

/* /public/IntegrationsIcons/<name>zescloudINT.svg */
const icon = (name) => `${ICON_BASE}/${name}zescloudINT.svg`

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/* ------------------------------- ui icons ------------------------------- */

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const IconSearch = () => (
  <svg {...stroke}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
)

const IconArrow = () => (
  <svg {...stroke}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconClose = () => (
  <svg {...stroke}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

/* category glyphs (generic shapes, coloured by each card's tone) */
const GlyphCloud = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M7 18.5h10.2a4.3 4.3 0 0 0 .7-8.55A6.2 6.2 0 0 0 6.1 9.2 4.7 4.7 0 0 0 7 18.5z" />
  </svg>
)

const GlyphServer = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect fill="currentColor" x="4" y="3.5" width="16" height="5" rx="1.4" />
    <rect fill="currentColor" x="4" y="9.5" width="16" height="5" rx="1.4" />
    <rect fill="currentColor" x="4" y="15.5" width="16" height="5" rx="1.4" />
    <g className="glyph-cut-limitlessConnectionsIntegrations">
      <circle cx="7.3" cy="6" r="0.95" />
      <circle cx="7.3" cy="12" r="0.95" />
      <circle cx="7.3" cy="18" r="0.95" />
      <rect x="10.5" y="5.4" width="6.5" height="1.2" rx="0.6" />
      <rect x="10.5" y="11.4" width="6.5" height="1.2" rx="0.6" />
      <rect x="10.5" y="17.4" width="6.5" height="1.2" rx="0.6" />
    </g>
  </svg>
)

const GlyphCube = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 2.6l8.2 4.6v9.6L12 21.4l-8.2-4.6V7.2z" />
    <path fill="#FFFFFF" opacity="0.3" d="M12 2.6l8.2 4.6L12 11.8 3.8 7.2z" />
    <path className="glyph-line-limitlessConnectionsIntegrations" d="M12 11.8v9.4M3.8 7.2L12 11.8l8.2-4.6" />
  </svg>
)

const GlyphInfinity = () => (
  <svg {...stroke} strokeWidth={2.4}>
    <path d="M8.3 8.3c-2.2 0-3.8 1.6-3.8 3.7s1.6 3.7 3.8 3.7c3.6 0 3.8-7.4 7.4-7.4 2.2 0 3.8 1.6 3.8 3.7s-1.6 3.7-3.8 3.7c-3.6 0-3.8-7.4-7.4-7.4z" />
  </svg>
)

const GlyphChat = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 4.2h14a2 2 0 0 1 2 2v8.8a2 2 0 0 1-2 2h-8.3l-4.3 3.6v-3.6H5a2 2 0 0 1-2-2V6.2a2 2 0 0 1 2-2z"
    />
    <g className="glyph-cut-limitlessConnectionsIntegrations">
      <circle cx="8.4" cy="10.6" r="1.25" />
      <circle cx="12" cy="10.6" r="1.25" />
      <circle cx="15.6" cy="10.6" r="1.25" />
    </g>
  </svg>
)

const GlyphDatabase = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M4.5 5.6v12.8c0 1.6 3.4 2.9 7.5 2.9s7.5-1.3 7.5-2.9V5.6z" opacity="0.88" />
    <ellipse fill="currentColor" cx="12" cy="5.6" rx="7.5" ry="2.9" />
    <path
      className="glyph-line-limitlessConnectionsIntegrations"
      d="M4.5 5.6c0 1.6 3.4 2.9 7.5 2.9s7.5-1.3 7.5-2.9M4.5 10.6c0 1.6 3.4 2.9 7.5 2.9s7.5-1.3 7.5-2.9M4.5 15.2c0 1.6 3.4 2.9 7.5 2.9s7.5-1.3 7.5-2.9"
    />
  </svg>
)

const GlyphShield = () => (
  <svg {...stroke} strokeWidth={2.2}>
    <path d="M12 3l7 2.8v5.6c0 4.5-3 8.2-7 9.6-4-1.4-7-5.1-7-9.6V5.8z" />
  </svg>
)

/* ------------------------------- data ----------------------------------- */
/* Order = grid order. `featured` = logos shown on the card; the rest are
   searchable (searching "terraform" shows DevOps with Terraform up front).
   `src`  = your SVG in /public/IntegrationsIcons (used whenever it is set).
   `Icon` = react-icons fallback for search-only items without a file yet. */

const CATEGORIES = [
  {
    id: 'cloud',
    chip: 'Cloud',
    title: 'Cloud Platforms',
    description: 'Monitor and manage cloud infrastructure with deeper operational visibility.',
    Glyph: GlyphCloud,
    tone: '46, 168, 255',
    featured: 3,
    keywords: ['iaas', 'paas', 'public cloud', 'multi-cloud'],
    integrations: [
      { name: 'AWS', slug: 'aws', src: icon('aws'), aliases: 'amazon web services ec2 s3' },
      { name: 'Microsoft Azure', slug: 'azure', src: icon('azure') },
      { name: 'Google Cloud', slug: 'google-cloud', src: icon('googlecloud'), aliases: 'gcp' },
      { name: 'DigitalOcean', slug: 'digitalocean', Icon: SiDigitalocean, color: '#0080FF' },
    ],
  },
  {
    id: 'infrastructure',
    chip: 'Infrastructure',
    title: 'Infrastructure',
    description: 'Connect servers, virtualization, operating systems, and infrastructure tooling.',
    Glyph: GlyphServer,
    tone: '59, 139, 255',
    featured: 3,
    keywords: ['servers', 'virtualization', 'operating systems', 'hypervisor'],
    integrations: [
      { name: 'Linux', slug: 'linux', src: icon('linux'), aliases: 'ubuntu debian rhel' },
      { name: 'Windows Server', slug: 'windows', src: icon('windows'), aliases: 'windows' },
      { name: 'VMware', slug: 'vmware', src: icon('vmware'), aliases: 'vsphere esxi' },
      { name: 'Proxmox', slug: 'proxmox', Icon: SiProxmox, color: '#E57000' },
      { name: 'Nutanix', slug: 'nutanix', Icon: SiNutanix, color: '#7EC4FF' },
    ],
  },
  {
    id: 'containers',
    chip: 'Containers',
    title: 'Containers & Orchestration',
    description: 'Gain visibility into containerized workloads and orchestration platforms.',
    Glyph: GlyphCube,
    tone: '30, 155, 255',
    featured: 3,
    keywords: ['containers', 'orchestration', 'k8s', 'clusters', 'pods'],
    integrations: [
      { name: 'Kubernetes', slug: 'kubernetes', src: icon('kubernetes'), aliases: 'k8s' },
      { name: 'Docker', slug: 'docker', src: icon('docker') },
      { name: 'Rancher', slug: 'rancher', src: icon('rancher') },
      { name: 'OpenShift', slug: 'openshift', Icon: SiRedhatopenshift, color: '#EE0000' },
      { name: 'Helm', slug: 'helm', Icon: SiHelm, color: '#5BB2DC' },
    ],
  },
  {
    id: 'databases',
    chip: 'Databases',
    title: 'Databases',
    description: 'Monitor database health and performance across critical workloads.',
    Glyph: GlyphDatabase,
    tone: '183, 148, 246',
    featured: 4,
    tall: true, // spans both rows in the last column, logos in a 2 x 2 grid
    keywords: ['sql', 'nosql', 'replication', 'queries', 'storage'],
    integrations: [
      { name: 'MySQL', slug: 'mysql', src: icon('database') },
      { name: 'PostgreSQL', slug: 'postgresql', src: icon('postgresql'), aliases: 'postgres' },
      { name: 'MongoDB', slug: 'mongodb', src: icon('mongo'), aliases: 'mongo' },
      { name: 'Redis', slug: 'redis', src: icon('redis') },
      { name: 'Microsoft SQL Server', slug: 'mssql', Icon: DiMsqlServer, color: '#E2483C', aliases: 'mssql sql server' },
      { name: 'Elasticsearch', slug: 'elasticsearch', Icon: SiElasticsearch, color: '#00BFB3' },
    ],
  },
  {
    id: 'devops',
    chip: 'DevOps',
    title: 'DevOps & CI/CD',
    description: 'Connect your development and deployment workflows with infrastructure operations.',
    Glyph: GlyphInfinity,
    tone: '167, 139, 250',
    featured: 3,
    keywords: ['ci', 'cd', 'pipelines', 'deployments', 'git', 'iac'],
    integrations: [
      { name: 'GitHub', slug: 'github', src: icon('github'), aliases: 'github actions' },
      { name: 'GitLab', slug: 'gitlab', src: icon('gitlab') },
      { name: 'Jenkins', slug: 'jenkins', src: icon('jenkins') },
      { name: 'Terraform', slug: 'terraform', Icon: SiTerraform, color: '#9B6BDF' },
      { name: 'Ansible', slug: 'ansible', Icon: SiAnsible, color: '#E8EDF2' },
      { name: 'Bitbucket', slug: 'bitbucket', Icon: SiBitbucket, color: '#2684FF' },
    ],
  },
  {
    id: 'communication',
    chip: 'Communication',
    title: 'Communication',
    description: 'Send alerts, incidents, recommendations, and operational updates where your team works.',
    Glyph: GlyphChat,
    tone: '20, 212, 197',
    featured: 3,
    keywords: ['alerts', 'notifications', 'incidents', 'chat', 'on-call'],
    integrations: [
      { name: 'Slack', slug: 'slack', src: icon('slack') },
      { name: 'Microsoft Teams', slug: 'microsoft-teams', src: icon('microsoftteams'), aliases: 'teams' },
      { name: 'Email', slug: 'email', src: icon('email'), aliases: 'mail smtp' },
      { name: 'PagerDuty', slug: 'pagerduty', Icon: SiPagerduty, color: '#06AC38' },
      { name: 'Discord', slug: 'discord', Icon: SiDiscord, color: '#5865F2' },
      { name: 'Webhooks', slug: 'webhooks', Icon: TbWebhook, color: '#56B4FF', aliases: 'webhook api' },
    ],
  },
  {
    id: 'security',
    chip: 'Security',
    title: 'Security',
    description: 'Connect security tooling to improve infrastructure awareness and operational response.',
    Glyph: GlyphShield,
    tone: '109, 124, 255',
    featured: 3,
    keywords: ['siem', 'waf', 'threats', 'compliance', 'edr'],
    integrations: [
      { name: 'Cloudflare', slug: 'cloudflare', src: icon('cloudflare') },
      { name: 'Network Security', slug: 'network-security', src: icon('networksecurity'), aliases: 'microsoft defender firewall' },
      { name: 'Microsoft Sentinel', slug: 'microsoft-sentinel', src: icon('azure'), aliases: 'sentinel siem azure' },
      { name: 'Okta', slug: 'okta', Icon: SiOkta, color: '#4C8DF5' },
      { name: 'Fortinet', slug: 'fortinet', Icon: SiFortinet, color: '#EE3124' },
      { name: 'Splunk', slug: 'splunk', Icon: SiSplunk, color: '#7CC242' },
    ],
  },
]

const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

/* filter buttons keep the design's order */
const FILTER_ORDER = ['cloud', 'infrastructure', 'containers', 'devops', 'communication', 'databases', 'security']
const FILTERS = [{ id: 'all', label: 'All' }, ...FILTER_ORDER.map((id) => ({ id, label: CATEGORY_BY_ID[id].chip }))]

const TOTAL_INTEGRATIONS = CATEGORIES.reduce((n, c) => n + c.integrations.length, 0)

/* ------------------------------ helpers --------------------------------- */

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/* does this category match the (normalised) query, and which logos match */
const matchCategory = (cat, q) => {
  if (!q) return { visible: true, matched: null }
  const text = normalize(`${cat.title} ${cat.chip} ${cat.description} ${cat.keywords.join(' ')}`)
  const matched = new Set(
    cat.integrations
      .filter((it) => normalize(`${it.name} ${it.slug} ${it.aliases || ''}`).includes(q))
      .map((it) => it.slug),
  )
  return { visible: text.includes(q) || matched.size > 0, matched }
}

/* logos shown on a card: matched ones first, then the featured ones */
const pickLogos = (cat, matched) => {
  const featured = cat.integrations.slice(0, cat.featured)
  if (!matched || matched.size === 0) return featured
  const hits = cat.integrations.filter((it) => matched.has(it.slug))
  const rest = featured.filter((it) => !matched.has(it.slug))
  return [...hits, ...rest].slice(0, Math.max(cat.featured, Math.min(hits.length, 4)))
}

const highlight = (text, rawQuery) => {
  const q = rawQuery.trim()
  if (!q) return text
  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'ig'))
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="mark-limitlessConnectionsIntegrations">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

/* ------------------------------- hooks ---------------------------------- */

function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    if (value === '') {
      setDebounced('') // clearing feels instant
      return undefined
    }
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])
  return debounced
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])
  return reduced
}

/* ----------------------------- components ------------------------------- */

/* brand logo: your SVG file when `src` is set, otherwise the react-icons fallback */
const BrandIcon = ({ item, className }) => {
  if (item.src) {
    return (
      <img
        className={`${className} logo-img-limitlessConnectionsIntegrations`}
        src={item.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
    )
  }
  const { Icon } = item
  return <Icon className={className} style={{ color: item.color }} aria-hidden="true" focusable="false" />
}

const stateClass = (state) => (state ? ` is-${state}-limitlessConnectionsIntegrations` : '')

/* compact logo (normal cards) */
const LogoItem = memo(function LogoItem({ item, index, state }) {
  return (
    <li
      className={`logo-limitlessConnectionsIntegrations${stateClass(state)}`}
      style={{ '--k-limitlessConnectionsIntegrations': index }}
      data-name={item.name}
    >
      <span className="logo-inner-limitlessConnectionsIntegrations">
        <BrandIcon item={item} className="logo-svg-limitlessConnectionsIntegrations" />
      </span>
      <span className="sr-only-limitlessConnectionsIntegrations">{item.name}</span>
    </li>
  )
})

/* logo tile with name (tall Databases card, 2 x 2) */
const LogoTile = memo(function LogoTile({ item, index, state }) {
  return (
    <li
      className={`logo-limitlessConnectionsIntegrations tile-limitlessConnectionsIntegrations${stateClass(state)}`}
      style={{ '--k-limitlessConnectionsIntegrations': index }}
    >
      <span className="tile-glow-limitlessConnectionsIntegrations" aria-hidden="true" />
      <span className="logo-inner-limitlessConnectionsIntegrations tile-icon-limitlessConnectionsIntegrations">
        <BrandIcon item={item} className="logo-svg-limitlessConnectionsIntegrations" />
      </span>
      <span className="tile-name-limitlessConnectionsIntegrations">{item.name}</span>
    </li>
  )
})

/* cursor-follow spotlight without re-rendering React */
const handlePointerMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx-limitlessConnectionsIntegrations', `${e.clientX - r.left}px`)
  el.style.setProperty('--my-limitlessConnectionsIntegrations', `${e.clientY - r.top}px`)
}

const CategoryCard = memo(function CategoryCard({ cat, index, rawQuery, matched, linkBase, tall }) {
  const { Glyph } = cat
  const logos = pickLogos(cat, matched)
  const searching = !!(matched && matched.size > 0)
  const Item = tall ? LogoTile : LogoItem

  return (
    <li
      className={`cell-limitlessConnectionsIntegrations${tall ? ' is-tall-limitlessConnectionsIntegrations' : ''}`}
      style={{
        '--i-limitlessConnectionsIntegrations': index,
        '--tone-limitlessConnectionsIntegrations': cat.tone,
      }}
    >
      <article className="card-limitlessConnectionsIntegrations" onPointerMove={handlePointerMove}>
        <span className="card-spot-limitlessConnectionsIntegrations" aria-hidden="true" />
        <span className="card-border-limitlessConnectionsIntegrations" aria-hidden="true" />
        <span className="card-shine-limitlessConnectionsIntegrations" aria-hidden="true" />

        <header className="card-head-limitlessConnectionsIntegrations">
          <span className="card-icon-limitlessConnectionsIntegrations">
            <Glyph />
          </span>
          <h3 className="card-title-limitlessConnectionsIntegrations">{highlight(cat.title, rawQuery)}</h3>
        </header>

        <p className="card-desc-limitlessConnectionsIntegrations">{highlight(cat.description, rawQuery)}</p>

        <ul
          className={tall ? 'tiles-limitlessConnectionsIntegrations' : 'logos-limitlessConnectionsIntegrations'}
          aria-label={`${cat.title} integrations`}
        >
          {logos.map((item, k) => (
            <Item
              key={item.slug}
              item={item}
              index={k}
              state={searching ? (matched.has(item.slug) ? 'match' : 'dim') : null}
            />
          ))}
        </ul>

        <a href={`${linkBase}/${cat.id}`} className="card-link-limitlessConnectionsIntegrations">
          <span>View Integrations</span>
          <span className="sr-only-limitlessConnectionsIntegrations"> for {cat.title}</span>
          <span className="card-link-arrow-limitlessConnectionsIntegrations">
            <IconArrow />
          </span>
        </a>
      </article>
    </li>
  )
})

/* ------------------------------- section -------------------------------- */

function LimitlessConnectionsIntegrations({ linkBasePath = LINK_BASE }) {
  const sectionRef = useRef(null)
  const inputRef = useRef(null)
  const chipsRef = useRef(null)
  const chipRefs = useRef({})
  const searchId = useId()

  const [inView, setInView] = useState(false)
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [indicator, setIndicator] = useState(null)
  const [indicatorReady, setIndicatorReady] = useState(false)

  const reduced = usePrefersReducedMotion()
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS)
  const q = normalize(debouncedQuery.trim())

  /* ---- reveal once the section scrolls into view ---- */
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* ---- filtering ---- */
  const matches = useMemo(() => {
    const out = {}
    CATEGORIES.forEach((cat) => {
      out[cat.id] = matchCategory(cat, q)
    })
    return out
  }, [q])

  const resultIds = useMemo(
    () => CATEGORIES.filter((c) => (category === 'all' || c.id === category) && matches[c.id].visible).map((c) => c.id),
    [category, matches],
  )
  const resultKey = resultIds.join('|')

  /* old cards fade out, then the new set staggers in (grid remounts per gen) */
  const [view, setView] = useState(() => ({ key: resultKey, gen: 0, leaving: false }))

  useEffect(() => {
    if (resultKey === view.key) {
      if (view.leaving) setView((v) => ({ ...v, leaving: false }))
      return undefined
    }
    if (reduced) {
      setView((v) => ({ key: resultKey, gen: v.gen + 1, leaving: false }))
      return undefined
    }
    if (!view.leaving) setView((v) => ({ ...v, leaving: true }))
    const id = window.setTimeout(() => {
      setView((v) => ({ key: resultKey, gen: v.gen + 1, leaving: false }))
    }, LEAVE_MS)
    return () => window.clearTimeout(id)
  }, [resultKey, view.key, view.leaving, reduced])

  const shownIds = view.key ? view.key.split('|') : []
  const shownIntegrations = shownIds.reduce((n, id) => n + CATEGORY_BY_ID[id].integrations.length, 0)
  const isFiltered = category !== 'all' || query.trim() !== ''
  // the tall Databases layout is used when the full set is on screen
  const fullLayout = shownIds.length === CATEGORIES.length

  /* ---- sliding active-chip indicator ---- */
  const measureIndicator = useCallback(() => {
    const el = chipRefs.current[category]
    if (!el) return
    setIndicator({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight })
  }, [category])

  useIsoLayoutEffect(() => {
    measureIndicator()
  }, [measureIndicator])

  useEffect(() => {
    if (indicator && !indicatorReady) {
      const id = window.requestAnimationFrame(() => setIndicatorReady(true))
      return () => window.cancelAnimationFrame(id)
    }
    return undefined
  }, [indicator, indicatorReady])

  useEffect(() => {
    const wrap = chipsRef.current
    if (!wrap) return undefined
    let ro
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measureIndicator())
      ro.observe(wrap)
      Object.values(chipRefs.current).forEach((el) => el && ro.observe(el))
    }
    window.addEventListener('resize', measureIndicator)
    document.fonts?.ready?.then(measureIndicator).catch(() => {})
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measureIndicator)
    }
  }, [measureIndicator])

  /* ---- keyboard: "/" focuses search while the section is on screen ---- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return
      const sec = sectionRef.current
      if (!sec) return
      const r = sec.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const clearAll = useCallback(() => {
    setQuery('')
    setCategory('all')
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`section-limitlessConnectionsIntegrations${inView ? ' is-inview-limitlessConnectionsIntegrations' : ''}`}
      aria-labelledby={`${searchId}-title`}
    >
      <div className="bg-limitlessConnectionsIntegrations" aria-hidden="true">
        <span className="bg-glow-limitlessConnectionsIntegrations bg-glow-a-limitlessConnectionsIntegrations" />
        <span className="bg-glow-limitlessConnectionsIntegrations bg-glow-b-limitlessConnectionsIntegrations" />
        <span className="bg-grid-limitlessConnectionsIntegrations" />
      </div>

      <div className="container-limitlessConnectionsIntegrations">
        {/* ------------------------------ header ------------------------------ */}
        <div className="head-limitlessConnectionsIntegrations">
          <div className="intro-limitlessConnectionsIntegrations">
            <p className="eyebrow-limitlessConnectionsIntegrations reveal-limitlessConnectionsIntegrations" style={{ '--d-limitlessConnectionsIntegrations': '0s' }}>
              {/* <span className="eyebrow-dot-limitlessConnectionsIntegrations" aria-hidden="true" /> */}
              <BageZescloudAllComps badge='Integrations ecosystem'/>
            </p>

            <h2 id={`${searchId}-title`} className="title-limitlessConnectionsIntegrations">
              <span className="title-line-limitlessConnectionsIntegrations">
                <span className="title-text-limitlessConnectionsIntegrations" style={{ '--d-limitlessConnectionsIntegrations': '0.1s' }}>
                  One Platform.
                </span>
              </span>
              <span className="title-line-limitlessConnectionsIntegrations">
                <span
                  className="title-text-limitlessConnectionsIntegrations title-accent-limitlessConnectionsIntegrations"
                  style={{ '--d-limitlessConnectionsIntegrations': '0.24s' }}
                >
                  Limitless Connections.
                </span>
              </span>
            </h2>

            <p className="lead-limitlessConnectionsIntegrations reveal-limitlessConnectionsIntegrations" style={{ '--d-limitlessConnectionsIntegrations': '0.4s' }}>
              ZesCloud connects with the technologies that power your infrastructure and workflows. Build a unified
              operational intelligence layer across your entire stack.
            </p>
          </div>

          <div className="tools-limitlessConnectionsIntegrations">
            <div
              className={`search-limitlessConnectionsIntegrations reveal-limitlessConnectionsIntegrations${query ? ' has-value-limitlessConnectionsIntegrations' : ''}`}
              style={{ '--d-limitlessConnectionsIntegrations': '0.3s' }}
            >
              <span className="search-icon-limitlessConnectionsIntegrations">
                <IconSearch />
              </span>
              <label htmlFor={`${searchId}-search`} className="sr-only-limitlessConnectionsIntegrations">
                Search integrations
              </label>
              <input
                ref={inputRef}
                id={`${searchId}-search`}
                className="search-input-limitlessConnectionsIntegrations"
                type="search"
                placeholder="Search integrations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setQuery('')
                    e.currentTarget.blur()
                  }
                }}
                autoComplete="off"
                spellCheck={false}
                aria-controls={`${searchId}-grid`}
              />
              {query ? (
                <button
                  type="button"
                  className="search-clear-limitlessConnectionsIntegrations"
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  aria-label="Clear search"
                >
                  <IconClose />
                </button>
              ) : (
                <kbd className="search-kbd-limitlessConnectionsIntegrations" aria-hidden="true">
                  /
                </kbd>
              )}
              <span className="search-ring-limitlessConnectionsIntegrations" aria-hidden="true" />
            </div>

            <div
              ref={chipsRef}
              className={`chips-limitlessConnectionsIntegrations${indicatorReady ? ' is-ready-limitlessConnectionsIntegrations' : ''}`}
              role="group"
              aria-label="Filter integrations by category"
            >
              <span
                className="chip-indicator-limitlessConnectionsIntegrations"
                aria-hidden="true"
                style={
                  indicator
                    ? {
                        width: `${indicator.w}px`,
                        height: `${indicator.h}px`,
                        transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`,
                        opacity: 1,
                      }
                    : undefined
                }
              />
              {FILTERS.map((f, i) => (
                <button
                  key={f.id}
                  ref={(el) => {
                    chipRefs.current[f.id] = el
                  }}
                  type="button"
                  className={`chip-limitlessConnectionsIntegrations${category === f.id ? ' is-active-limitlessConnectionsIntegrations' : ''}`}
                  style={{ '--c-limitlessConnectionsIntegrations': i }}
                  aria-pressed={category === f.id}
                  onClick={() => setCategory(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------- grid ------------------------------- */}
        <p className="sr-only-limitlessConnectionsIntegrations" aria-live="polite">
          {shownIds.length === 0
            ? 'No integrations match your filters.'
            : `Showing ${shownIds.length} of ${CATEGORIES.length} categories, ${shownIntegrations} of ${TOTAL_INTEGRATIONS} integrations.`}
        </p>

        {shownIds.length > 0 ? (
          <ul
            key={view.gen}
            id={`${searchId}-grid`}
            className={`grid-limitlessConnectionsIntegrations${fullLayout ? ' is-full-limitlessConnectionsIntegrations' : ''}${view.gen > 0 ? ' is-refilter-limitlessConnectionsIntegrations' : ''}${view.leaving ? ' is-leaving-limitlessConnectionsIntegrations' : ''}`}
          >
            {shownIds.map((id, index) => (
              <CategoryCard
                key={id}
                cat={CATEGORY_BY_ID[id]}
                index={index}
                rawQuery={debouncedQuery}
                matched={matches[id].matched}
                linkBase={linkBasePath}
                tall={fullLayout && !!CATEGORY_BY_ID[id].tall}
              />
            ))}
          </ul>
        ) : (
          <div
            key={`empty-${view.gen}`}
            id={`${searchId}-grid`}
            className={`empty-limitlessConnectionsIntegrations${view.leaving ? ' is-leaving-limitlessConnectionsIntegrations' : ''}`}
          >
            <span className="empty-icon-limitlessConnectionsIntegrations" aria-hidden="true">
              <IconSearch />
            </span>
            <h3 className="empty-title-limitlessConnectionsIntegrations">No integrations found</h3>
            <p className="empty-text-limitlessConnectionsIntegrations">
              {query.trim() ? (
                <>
                  Nothing matches “{query.trim()}”
                  {category !== 'all' ? ` in ${CATEGORY_BY_ID[category].chip}` : ''}. Try another name or category.
                </>
              ) : (
                'Try another category.'
              )}
            </p>
            {isFiltered ? (
              <button type="button" className="zescloud-btn zescloud-btn-outline empty-btn-limitlessConnectionsIntegrations" onClick={clearAll}>
                Clear filters
              </button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}

export default LimitlessConnectionsIntegrations