'use client'

import React, { useEffect, useRef, useState } from 'react'
import './ManualVentionsSolutions.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'

/* =========================================================
   Helpers
   ========================================================= */

const SUFFIX = 'ManualVentionsSolutions'
/** cn('node', 'is-active') -> "node-ManualVentionsSolutions is-active-ManualVentionsSolutions" */
const cn = (...names) =>
  names
    .filter(Boolean)
    .map((n) => `${n}-${SUFFIX}`)
    .join(' ')

const pct = (value, total) => `${((value / total) * 100).toFixed(4)}%`

/* =========================================================
   Icons
   ========================================================= */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
}

const IconRemediation = () => (
  <svg {...iconProps}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
)

const IconRunbook = () => (
  <svg {...iconProps}>
    <path d="M4.5 19.5v-15A2.5 2.5 0 017 2h12.5v20H7a2.5 2.5 0 010-5h12.5" />
    <path d="M9 7h6M9 10.5h4" />
  </svg>
)

const IconScheduled = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

const IconScaling = () => (
  <svg {...iconProps}>
    <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
  </svg>
)

const IconApproval = () => (
  <svg {...iconProps}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20c.8-3.4 3.2-5 6-5s5.2 1.6 6 5" />
    <path d="M15.5 11l2 2 3.5-4" />
  </svg>
)

const IconBolt = () => (
  <svg {...iconProps}>
    <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />
  </svg>
)

const IconGear = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
  </svg>
)

const IconRestart = () => (
  <svg {...iconProps}>
    <path d="M20 12a8 8 0 11-2.35-5.66L20 8.5" />
    <path d="M20 3.5v5h-5" />
  </svg>
)

const IconBell = () => (
  <svg {...iconProps}>
    <path d="M6 17V11a6 6 0 1112 0v6l1.5 2h-15L6 17z" />
    <path d="M10 21h4" />
  </svg>
)

const IconLog = () => (
  <svg {...iconProps}>
    <rect x="5" y="4" width="14" height="16" rx="2.5" />
    <path d="M9 9h6M9 13h6M9 17h3" />
  </svg>
)

const IconArrow = () => (
  <svg {...iconProps} strokeWidth={2.2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const IconCheck = () => (
  <svg {...iconProps} strokeWidth={3}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

/* =========================================================
   Left column data
   ========================================================= */

const FEATURES = [
  {
    title: 'Automated Remediation',
    text: 'Respond to known operational conditions using predefined actions.',
    tone: 'green',
    Icon: IconRemediation,
  },
  {
    title: 'Runbooks & Workflows',
    text: 'Standardize how your team responds to recurring incidents.',
    tone: 'blue',
    Icon: IconRunbook,
  },
  {
    title: 'Scheduled Tasks',
    text: 'Automate routine infrastructure maintenance.',
    tone: 'cyan',
    Icon: IconScheduled,
  },
  {
    title: 'Auto Scaling & Healing',
    text: 'Create workflows that respond to infrastructure conditions.',
    tone: 'purple',
    Icon: IconScaling,
  },
  {
    title: 'Approval & Safety Controls',
    text: 'Keep humans in control of sensitive actions.',
    tone: 'gray',
    Icon: IconApproval,
  },
]

/* =========================================================
   Workflow timeline
   One loop = phases 0..8. Every node / wire state is derived
   from the current phase, so lines, pulses and node glows can
   never drift out of sync.
   ========================================================= */

const FLOW_MS = 750 // time a pulse takes to travel one wire
const ENTRANCE_MS = 1900 // wait for the entrance to finish before looping

const PHASES = [
  { dur: 800, status: 'Monitoring', tone: 'neutral' }, // 0  idle
  { dur: 1000, status: 'Alert detected', tone: 'danger' }, // 1  trigger fires
  { dur: FLOW_MS, status: 'Running workflow', tone: 'info' }, // 2  wire 1
  { dur: 1100, status: 'Validating', tone: 'info' }, // 3  check
  { dur: FLOW_MS, status: 'Running workflow', tone: 'info' }, // 4  wires 2 + 3
  { dur: 1300, status: 'Remediating', tone: 'info' }, // 5  remediate + notify
  { dur: FLOW_MS, status: 'Running workflow', tone: 'info' }, // 6  wires 4 + 5
  { dur: 1000, status: 'Logging', tone: 'info' }, // 7  log
  { dur: 2400, status: 'Resolved', tone: 'success' }, // 8  complete
]
const COMPLETE_PHASE = PHASES.length - 1
const BASE_RUNS = 1284

/* =========================================================
   Stage geometry (single source of truth)
   Node boxes and SVG wires are both computed from these
   numbers, so lines always meet node edges exactly.
   ========================================================= */

const VB_W = 600
const VB_H = 400
const NODE_W = 208
const NODE_H = 64
const CORNER = 14

const NODES = [
  {
    key: 'trigger',
    x: 196,
    y: 8,
    tone: 'red',
    title: 'Trigger',
    sub: 'High CPU usage · 94%',
    Icon: IconBolt,
    anim: 'flicker',
    activePhase: 1,
    delay: 0.3,
  },
  {
    key: 'check',
    x: 196,
    y: 116,
    tone: 'purple',
    title: 'Check Conditions',
    sub: 'Validate host & service',
    Icon: IconGear,
    anim: 'spin-slow',
    activePhase: 3,
    delay: 0.45,
  },
  {
    key: 'remediate',
    x: 6,
    y: 224,
    tone: 'green',
    title: 'Auto Remediate',
    sub: 'Restart service',
    Icon: IconRestart,
    anim: 'spin',
    activePhase: 5,
    delay: 0.6,
  },
  {
    key: 'notify',
    x: 386,
    y: 224,
    tone: 'blue',
    title: 'Notify Team',
    sub: 'Alert sent to on-call',
    Icon: IconBell,
    anim: 'ring',
    activePhase: 5,
    delay: 0.6,
  },
  {
    key: 'log',
    x: 196,
    y: 328,
    tone: 'gray',
    title: 'Log & Report',
    sub: 'Record action & result',
    Icon: IconLog,
    anim: 'none',
    activePhase: 7,
    delay: 0.75,
  },
]

const NODE_BY_KEY = Object.fromEntries(NODES.map((n) => [n.key, n]))

const anchor = (key, side) => {
  const n = NODE_BY_KEY[key]
  const cx = n.x + NODE_W / 2
  const cy = n.y + NODE_H / 2
  switch (side) {
    case 'top':
      return [cx, n.y]
    case 'bottom':
      return [cx, n.y + NODE_H]
    case 'left':
      return [n.x, cy]
    default:
      return [n.x + NODE_W, cy]
  }
}

const straight = ([x1, y1], [x2, y2]) => `M${x1} ${y1} L${x2} ${y2}`

/* horizontal first, rounded corner, then vertical */
const elbowHV = ([x1, y1], [x2, y2]) => {
  const sx = Math.sign(x2 - x1)
  const sy = Math.sign(y2 - y1)
  return `M${x1} ${y1} H${x2 - sx * CORNER} Q${x2} ${y1} ${x2} ${y1 + sy * CORNER} V${y2}`
}

/* vertical first, rounded corner, then horizontal */
const elbowVH = ([x1, y1], [x2, y2]) => {
  const sx = Math.sign(x2 - x1)
  const sy = Math.sign(y2 - y1)
  return `M${x1} ${y1} V${y2 - sy * CORNER} Q${x1} ${y2} ${x1 + sx * CORNER} ${y2} H${x2}`
}

const EDGES = [
  { id: 'e1', from: anchor('trigger', 'bottom'), to: anchor('check', 'top'), shape: straight, flowPhase: 2, delay: 0.5 },
  { id: 'e2', from: anchor('check', 'left'), to: anchor('remediate', 'top'), shape: elbowHV, flowPhase: 4, delay: 0.65 },
  { id: 'e3', from: anchor('check', 'right'), to: anchor('notify', 'top'), shape: elbowHV, flowPhase: 4, delay: 0.65 },
  { id: 'e4', from: anchor('remediate', 'bottom'), to: anchor('log', 'left'), shape: elbowVH, flowPhase: 6, delay: 0.85 },
  { id: 'e5', from: anchor('notify', 'bottom'), to: anchor('log', 'right'), shape: elbowVH, flowPhase: 6, delay: 0.85 },
].map((e) => ({ ...e, d: e.shape(e.from, e.to) }))

const getNodeState = (activePhase, phase) => {
  if (phase < activePhase) return 'idle'
  return phase === activePhase ? 'active' : 'done'
}

const getEdgeState = (flowPhase, phase) => {
  if (phase < flowPhase) return 'idle'
  return phase === flowPhase ? 'flow' : 'done'
}

/* =========================================================
   Hooks
   ========================================================= */

function useInView(ref, { threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const [state, setState] = useState({ inView: false, entered: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setState({ inView: true, entered: true })
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState((prev) => {
          const inView = entry.isIntersecting
          const entered = prev.entered || inView
          return prev.inView === inView && prev.entered === entered ? prev : { inView, entered }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return state
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }
    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  return reduced
}

/* =========================================================
   Component
   ========================================================= */

function ManualVentionsSolutions() {
  const contentRef = useRef(null)
  const visualRef = useRef(null)
  const pulseRefs = useRef({})

  const content = useInView(contentRef, { threshold: 0.15 })
  const visual = useInView(visualRef, { threshold: 0.3 })
  const reducedMotion = usePrefersReducedMotion()

  const [entranceDone, setEntranceDone] = useState(false)
  const [phase, setPhase] = useState(0)
  const [runs, setRuns] = useState(BASE_RUNS)

  /* Start the workflow loop only after the entrance has played */
  useEffect(() => {
    if (!visual.entered) return undefined
    if (reducedMotion) {
      setEntranceDone(true)
      return undefined
    }
    const t = setTimeout(() => setEntranceDone(true), ENTRANCE_MS)
    return () => clearTimeout(t)
  }, [visual.entered, reducedMotion])

  /* Phase loop — pauses automatically when the visual leaves the viewport */
  const running = entranceDone && visual.inView && !reducedMotion

  useEffect(() => {
    if (!running) return undefined
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASES[phase].dur)
    return () => clearTimeout(t)
  }, [phase, running])

  /* Count a completed run */
  useEffect(() => {
    if (phase === COMPLETE_PHASE) setRuns((r) => r + 1)
  }, [phase])

  /* Fire the travelling pulse on every wire that starts flowing */
  useEffect(() => {
    EDGES.forEach((edge) => {
      if (edge.flowPhase !== phase) return
      const group = pulseRefs.current[edge.id]
      if (!group) return
      group.querySelectorAll('animate, animateMotion').forEach((anim) => {
        if (typeof anim.beginElement === 'function') anim.beginElement()
      })
    })
  }, [phase])

  const displayPhase = reducedMotion ? COMPLETE_PHASE : phase
  const current = PHASES[displayPhase]

  return (
    <section className={cn('section')} aria-labelledby="mvs-heading">
      <div className={cn('container')}>
        {/* ---------------- Left content ---------------- */}
        <div ref={contentRef} className={cn('content', content.entered && 'is-revealed')}>
          <BageZescloudAllComps badge='Automation'/>

          <h2 id="mvs-heading" className={cn('heading')}>
            <span className={cn('headingLine', 'reveal')} style={{ '--d': '0.08s' }}>
              Automate the work
            </span>
            <span className={cn('headingLine', 'reveal')} style={{ '--d': '0.18s' }}>
              <span className={cn('headingAccent')}>
                that shouldn&apos;t require manual intervention.
              </span>
            </span>
          </h2>

          <p className={cn('description', 'reveal')} style={{ '--d': '0.3s' }}>
            Turn repeatable operational procedures into controlled, observable workflows.
          </p>

          <ul className={cn('list')}>
            {FEATURES.map(({ title, text, tone, Icon }, i) => (
              <li
                key={title}
                className={cn('item', 'reveal')}
                style={{ '--d': `${(0.38 + i * 0.07).toFixed(2)}s` }}
              >
                <div className={cn('itemInner')}>
                  <span className={cn('itemIcon', `tone-${tone}`)}>
                    <Icon />
                  </span>
                  <div className={cn('itemBody')}>
                    <h3 className={cn('itemTitle')}>{title}</h3>
                    <p className={cn('itemText')}>{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className={cn('actions', 'reveal')} style={{ '--d': '0.8s' }}>
            <button type="button" className={cn('button')}>
              <span>Learn More</span>
              <IconArrow />
            </button>
          </div>
        </div>

        {/* ---------------- Right animated workflow ---------------- */}
        <div ref={visualRef} className={cn('visual', visual.entered && 'is-revealed')}>
          <div className={cn('glow')} aria-hidden="true" />

          <div
            className={cn('panel')}
            role="img"
            aria-label="Automation workflow: a high CPU trigger runs a condition check, then auto-remediates the service and notifies the team, and finally logs and reports the result."
          >
            {/* Header */}
            <div className={cn('panelHeader', 'reveal')} style={{ '--d': '0.2s' }} aria-hidden="true">
              <div className={cn('panelTitle')}>
                <span className={cn('panelDots')}>
                  <span />
                  <span />
                  <span />
                </span>
                <span className={cn('workflowName')}>CPU Health Recovery</span>
                <span className={cn('panelTag')}>Workflow</span>
              </div>

              <span className={cn('status', `status-${current.tone}`)}>
                <span className={cn('statusDot')} />
                <span key={current.status} className={cn('statusText')}>
                  {current.status}
                </span>
              </span>
            </div>

            {/* Stage */}
            <div className={cn('stage')} aria-hidden="true">
              {/* Wires (behind nodes) */}
              <svg
                className={cn('svg', 'svgWires')}
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ '--flow-dur': `${FLOW_MS}ms` }}
              >
                {EDGES.map((edge) => {
                  const state = getEdgeState(edge.flowPhase, displayPhase)
                  return (
                    <g key={edge.id} style={{ '--d': `${edge.delay}s` }}>
                      <path d={edge.d} className={cn('wireBase')} />
                      <path d={edge.d} pathLength="1" className={cn('wireDraw')} />
                      <path d={edge.d} pathLength="1" className={cn('wireLive', 'wireLiveGlow', `is-${state}`)} />
                      <path d={edge.d} pathLength="1" className={cn('wireLive', `is-${state}`)} />
                    </g>
                  )
                })}
              </svg>

              {/* Nodes */}
              {NODES.map((node) => {
                const state = getNodeState(node.activePhase, displayPhase)
                const { Icon } = node
                return (
                  <div
                    key={node.key}
                    className={cn('nodeWrap')}
                    style={{
                      left: pct(node.x, VB_W),
                      top: pct(node.y, VB_H),
                      width: pct(NODE_W, VB_W),
                      height: pct(NODE_H, VB_H),
                      '--d': `${node.delay}s`,
                    }}
                  >
                    <div
                      className={cn('node', `tone-${node.tone}`, `is-${state}`)}
                      data-anim={node.anim}
                      style={{ '--active-dur': `${PHASES[node.activePhase].dur}ms` }}
                    >
                      <span className={cn('nodeIcon')}>
                        <Icon />
                      </span>

                      <span className={cn('nodeText')}>
                        <span className={cn('nodeTitle')}>{node.title}</span>
                        <span className={cn('nodeSub')}>{node.sub}</span>
                      </span>

                      <span className={cn('nodeBadge')}>
                        {state === 'active' ? <span className={cn('nodeSpinner')} /> : <IconCheck />}
                      </span>

                      <span className={cn('nodeProgress')} />
                    </div>
                  </div>
                )
              })}

              {/* Ports + travelling pulses (above nodes) */}
              <svg
                className={cn('svg', 'svgOverlay')}
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                preserveAspectRatio="xMidYMid meet"
              >
                {EDGES.map((edge) => {
                  const state = getEdgeState(edge.flowPhase, displayPhase)
                  return (
                    <g key={`ports-${edge.id}`}>
                      <circle
                        cx={edge.from[0]}
                        cy={edge.from[1]}
                        r="3.2"
                        className={cn('endpoint', state !== 'idle' && 'is-lit')}
                        style={{ '--ed': `${edge.delay.toFixed(2)}s` }}
                      />
                      <circle
                        cx={edge.to[0]}
                        cy={edge.to[1]}
                        r="3.2"
                        className={cn('endpoint', state === 'done' && 'is-lit')}
                        style={{ '--ed': `${(edge.delay + 0.45).toFixed(2)}s` }}
                      />
                    </g>
                  )
                })}

                {EDGES.map((edge) => (
                  <g
                    key={`pulse-${edge.id}`}
                    ref={(el) => {
                      pulseRefs.current[edge.id] = el
                    }}
                    opacity="0"
                  >
                    <circle r="7" className={cn('pulseHalo')} />
                    <circle r="3" className={cn('pulseCore')} />
                    <animateMotion
                      begin="indefinite"
                      dur={`${FLOW_MS}ms`}
                      path={edge.d}
                      calcMode="paced"
                      fill="remove"
                    />
                    <animate
                      attributeName="opacity"
                      begin="indefinite"
                      dur={`${FLOW_MS}ms`}
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.85;1"
                      fill="remove"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Footer metrics */}
            <div className={cn('panelFooter', 'reveal')} style={{ '--d': '1s' }} aria-hidden="true">
              <div className={cn('metric')}>
                <span className={cn('metricLabel')}>Auto-resolved today</span>
                <span className={cn('metricValue')}>
                  <span key={runs} className={cn('metricNumber')}>
                    {runs.toLocaleString('en-US')}
                  </span>
                </span>
              </div>
              <div className={cn('metric')}>
                <span className={cn('metricLabel')}>Avg. resolution</span>
                <span className={cn('metricValue')}>38s</span>
              </div>
              <div className={cn('metric')}>
                <span className={cn('metricLabel')}>Manual steps</span>
                <span className={cn('metricValue', 'metricValueGood')}>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManualVentionsSolutions