'use client'

import React, { useEffect, useRef, useState } from 'react'
import './ProjectServersSolutions.css'
import BageZescloudAllComps from '@/components/BageZescloudAllComps/BageZescloudAllComps'
import GroundHexLogo from './GroundHexLogo'

/* =========================================================
   Helpers
   ========================================================= */

const SUFFIX = 'ProjectServersSolutions'
/** cn('server', 'is-revealed') -> "server-ProjectServersSolutions is-revealed-ProjectServersSolutions" */
const cn = (...names) =>
    names
        .filter(Boolean)
        .map((n) => `${n}-${SUFFIX}`)
        .join(' ')

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

const IconBackup = () => (
    <svg {...iconProps}>
        <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
        <path d="M5 5.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
        <path d="M5 11.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
    </svg>
)

const IconRecovery = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3.6" />
        <path d="M5.99 5.99l3.46 3.46M14.55 14.55l3.46 3.46M14.55 9.45l3.46-3.46M5.99 18.01l3.46-3.46" />
    </svg>
)

const IconReadiness = () => (
    <svg {...iconProps}>
        <path d="M12 3l7 3v5.5c0 4.4-2.9 8-7 9.5-4.1-1.5-7-5.1-7-9.5V6l7-3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
    </svg>
)

const IconFailover = () => (
    <svg {...iconProps}>
        <path d="M4 8h14M14.5 4.5L18 8l-3.5 3.5" />
        <path d="M20 16H6M9.5 12.5L6 16l3.5 3.5" />
    </svg>
)

const IconTimer = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="13.5" r="7.5" />
        <path d="M12 13.5V9.5M10 2.5h4M18.5 6.5l-1.3 1.3" />
    </svg>
)

const IconArrow = () => (
    <svg {...iconProps} strokeWidth={2.2}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

/* =========================================================
   Content data
   ========================================================= */

const FEATURES = [
    {
        title: 'Backup Monitoring & Validation',
        text: 'Know whether critical backups are completing successfully.',
        tone: 'green',
        Icon: IconBackup,
    },
    {
        title: 'Disaster Recovery Planning',
        text: 'Maintain visibility into recovery infrastructure and procedures.',
        tone: 'cyan',
        Icon: IconRecovery,
    },
    {
        title: 'Recovery Readiness',
        text: 'Understand whether your environment is prepared to recover.',
        tone: 'indigo',
        Icon: IconReadiness,
    },
    {
        title: 'Failover & Fallback',
        text: 'Monitor operational processes around switching between environments.',
        tone: 'orange',
        Icon: IconFailover,
    },
    {
        title: 'RTO / RPO Tracking',
        text: 'Track recovery objectives and readiness against your requirements.',
        tone: 'gray',
        Icon: IconTimer,
    },
]

/* =========================================================
   3D scene data
   All scene sizes are in "u" units (1u = 1/560 of the visual's
   width, max 1px), so the whole 3D scene scales as one piece.
   Angles: 0 = right, 90 = front (toward viewer), 270 = back.
   ========================================================= */

const RING_RADIUS = 195
const SERVER_W = 64

const SERVERS = [
    { id: 'back', angle: 270, h: 150 },
    { id: 'back-left', angle: 212, h: 118 },
    { id: 'back-right', angle: 328, h: 118 },
    { id: 'left', angle: 162, h: 100 },
    { id: 'right', angle: 18, h: 100 },
    { id: 'front-left', angle: 118, h: 84 },
    { id: 'front-right', angle: 62, h: 84 },
].map((s, i) => {
    const rad = (s.angle * Math.PI) / 180
    return {
        ...s,
        x: Math.round(RING_RADIUS * Math.cos(rad)),
        y: Math.round(RING_RADIUS * Math.sin(rad)),
        delay: +(0.4 + i * 0.08).toFixed(2),
        slots: Math.max(2, Math.floor((s.h - 14) / 26)),
    }
})

const SPARKS = Array.from({ length: 16 }, (_, i) => ({
    x: 8 + ((i * 37) % 84),
    y: 22 + ((i * 23) % 56),
    size: 2 + (i % 3),
    dur: +(4.2 + (i % 5) * 0.7).toFixed(1),
    delay: +((i * 0.53) % 5).toFixed(2),
}))

const SHIELD_D = 'M100 10 L178 40 V104 C178 158 144 196 100 218 C56 196 22 158 22 104 V40 Z'
const SHIELD_INNER_D = 'M100 30 L161 54 V104 C161 147 134 177 100 196 C66 177 39 147 39 104 V54 Z'
const CHECK_D = 'M64 112 L90 138 L138 86'

const HOUDINI_PROPS = [
    { name: '--pss-tilt', syntax: '<angle>', inherits: true, initialValue: '58deg' },
    { name: '--pss-sway', syntax: '<angle>', inherits: true, initialValue: '0deg' },
    { name: '--pss-o', syntax: '<number>', inherits: true, initialValue: '1' },
]

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

/** Registers the animatable custom properties (camera tilt, sway, fade). */
function useRegisteredProps() {
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined' || !window.CSS || typeof window.CSS.registerProperty !== 'function') {
            return
        }
        HOUDINI_PROPS.forEach((prop) => {
            try {
                window.CSS.registerProperty(prop)
            } catch (e) {
                /* already registered (via CSS @property or hot reload) */
            }
        })
        setOk(true)
    }, [])

    return ok
}

/** Smooth mouse-follow tilt of the 3D scene (desktop pointers only). */
function useParallax(ref, enabled) {
    useEffect(() => {
        const el = ref.current
        if (!el || !enabled || typeof window === 'undefined') return undefined
        if (typeof window.matchMedia !== 'function' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return undefined
        }

        let raf = 0
        let tx = 0
        let ty = 0
        let cx = 0
        let cy = 0

        const apply = () => {
            cx += (tx - cx) * 0.08
            cy += (ty - cy) * 0.08
            el.style.setProperty('--pz', `${(cx * 7).toFixed(3)}deg`)
            el.style.setProperty('--px', `${(cy * -5).toFixed(3)}deg`)
            raf = Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(apply) : 0
        }

        const kick = () => {
            if (!raf) raf = requestAnimationFrame(apply)
        }

        const onMove = (e) => {
            const r = el.getBoundingClientRect()
            if (!r.width || !r.height) return
            tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))
            ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))
            kick()
        }

        const onLeave = () => {
            tx = 0
            ty = 0
            kick()
        }

        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)

        return () => {
            el.removeEventListener('pointermove', onMove)
            el.removeEventListener('pointerleave', onLeave)
            if (raf) cancelAnimationFrame(raf)
            el.style.removeProperty('--pz')
            el.style.removeProperty('--px')
        }
    }, [ref, enabled])
}

/* =========================================================
   Scene parts
   ========================================================= */

function Rack({ slots, offset }) {
    return (
        <span className={cn('rack')}>
            {Array.from({ length: slots }, (_, i) => (
                <span key={i} className={cn('slot')}>
                    <span className={cn('slotBar')} />
                    <span className={cn('led')} style={{ '--ld': `${((offset + i * 0.37) % 2.2).toFixed(2)}s` }} />
                    <span
                        className={cn('led', 'ledGreen')}
                        style={{ '--ld': `${((offset + i * 0.61 + 0.9) % 2.6).toFixed(2)}s` }}
                    />
                </span>
            ))}
        </span>
    )
}

function Server({ server, index }) {
    return (
        <div
            className={cn('server')}
            style={{
                left: `calc(50% + var(--u) * ${server.x})`,
                top: `calc(50% + var(--u) * ${server.y})`,
                '--h': server.h,
                '--d': `${server.delay}s`,
                '--fd': `${(1.6 + index * 0.45).toFixed(2)}s`,
            }}
        >
            <div className={cn('serverDrop')}>
                <div className={cn('serverFloat')}>
                    {[0, 90, 180, 270].map((a) => {
                        const front = a === 0 || a === 270
                        return (
                            <div
                                key={a}
                                className={cn('face', 'faceSide', front ? 'faceFront' : 'faceBack')}
                                style={{ '--a': `${a}deg` }}
                            >
                                {front && <Rack slots={server.slots} offset={index * 0.29 + a / 400} />}
                            </div>
                        )
                    })}
                    <div className={cn('face', 'faceTop')}>
                        <span className={cn('topLight')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ShieldSvg = () => (
    <svg className={cn('shieldSvg')} viewBox="0 0 200 230" aria-hidden="true" focusable="false">
        <defs>
            <linearGradient id="pss-shield-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8fd3ff" stopOpacity="0.92" />
                <stop offset="0.55" stopColor="#2a6ef0" stopOpacity="0.86" />
                <stop offset="1" stopColor="#1a3aa8" stopOpacity="0.92" />
            </linearGradient>
            <linearGradient id="pss-shield-edge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e2f5ff" />
                <stop offset="0.5" stopColor="#5fb6ff" />
                <stop offset="1" stopColor="#2f6dff" />
            </linearGradient>
            <linearGradient id="pss-shield-shine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="pss-shield-clip">
                <path d={SHIELD_D} />
            </clipPath>
        </defs>

        <path
            d={SHIELD_D}
            fill="url(#pss-shield-fill)"
            stroke="url(#pss-shield-edge)"
            strokeWidth="4"
            strokeLinejoin="round"
        />
        <path d={SHIELD_INNER_D} fill="none" stroke="rgba(190, 230, 255, 0.45)" strokeWidth="1.5" strokeLinejoin="round" />

        <g clipPath="url(#pss-shield-clip)">
            <g transform="skewX(-20)">
                <rect className={cn('shieldShine')} x="-90" y="-20" width="60" height="280" fill="url(#pss-shield-shine)" />
            </g>
        </g>

        <path d={CHECK_D} pathLength="1" className={cn('check')} />
    </svg>
)

const PadSvg = () => (
    <svg className={cn('pad')} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <defs>
            <radialGradient id="pss-pad-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#7cc8ff" stopOpacity="0.55" />
                <stop offset="0.6" stopColor="#2f7bff" stopOpacity="0.2" />
                <stop offset="1" stopColor="#2f7bff" stopOpacity="0.05" />
            </radialGradient>
        </defs>
        <polygon
            points="50,4 90,27 90,73 50,96 10,73 10,27"
            fill="url(#pss-pad-fill)"
            stroke="rgba(140, 210, 255, 0.85)"
            strokeWidth="1.2"
        />
        <polygon
            className={cn('padInner')}
            points="50,18 78,34 78,66 50,82 22,66 22,34"
            fill="none"
            stroke="rgba(140, 210, 255, 0.55)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
        />
    </svg>
)

/* =========================================================
   Component
   ========================================================= */

function ProjectServersSolutions() {
    const visualRef = useRef(null)
    const contentRef = useRef(null)

    const visual = useInView(visualRef, { threshold: 0.25 })
    const content = useInView(contentRef, { threshold: 0.15 })
    const reducedMotion = usePrefersReducedMotion()
    const hasProps = useRegisteredProps()

    useParallax(visualRef, !reducedMotion)

    return (
        <section className={cn('section')} aria-labelledby="pss-heading">
            <div className={cn('container')}>
                {/* ---------------- Left: 3D visual ---------------- */}
                <div
                    ref={visualRef}
                    className={cn(
                        'visual',
                        hasProps && 'has-props',
                        visual.entered && 'is-revealed',
                        visual.entered && !visual.inView && 'is-paused'
                    )}
                >
                    <div className={cn('aura')} aria-hidden="true" />

                    <div className={cn('stage')} aria-hidden="true">
                        <div className={cn('scene')}>
                            {/* Flat floor layer */}
                            <div className={cn('floor')}>
                                <div className={cn('floorIn')}>
                                    <span className={cn('circle', 'ringOuter')} />
                                    <span className={cn('circle', 'disc')} />
                                    <span className={cn('circle', 'grid')} />
                                    <span className={cn('circle', 'ringDashed')} />
                                    <span className={cn('circle', 'ringTicks')} />
                                    <span className={cn('circle', 'orbit')} />
                                    <span className={cn('circle', 'ripple')} />
                                    <span className={cn('circle', 'ripple', 'rippleLate')} />

                                    {SERVERS.map((s) => (
                                        <span
                                            key={`foot-${s.id}`}
                                            className={cn('foot')}
                                            style={{
                                                left: `calc(50% + var(--u) * ${s.x})`,
                                                top: `calc(50% + var(--u) * ${s.y})`,
                                                '--d': `${s.delay}s`,
                                            }}
                                        />
                                    ))}

                                    {SERVERS.map((s, i) => (
                                        <span
                                            key={`beam-${s.id}`}
                                            className={cn('beam')}
                                            style={{
                                                '--a': `${s.angle}deg`,
                                                '--d': `${(1 + i * 0.06).toFixed(2)}s`,
                                                '--pd': `${(1.8 + i * 0.37).toFixed(2)}s`,
                                            }}
                                        >
                                            <span className={cn('beamLine')}>
                                                <span className={cn('beamPulse')} />
                                            </span>
                                        </span>
                                    ))}

                                    <span className={cn('circle', 'padWrap')}>
                                        <PadSvg />
                                        <GroundHexLogo x="50%" y="50%" size="92%" tilt={0} />
                                    </span>
                                </div>
                            </div>

                            {/* 3D glass servers */}
                            {SERVERS.map((s, i) => (
                                <Server key={s.id} server={s} index={i} />
                            ))}

                            {/* Shield — always turned to face the camera */}
                            <div className={cn('shieldAnchor')}>
                                <div className={cn('shieldRise')}>
                                    <span className={cn('shieldBeam')} />
                                    <div className={cn('shieldFloat')}>
                                        <span className={cn('shieldHalo')} />
                                        <span className={cn('shieldBurst')} />
                                        <ShieldSvg />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cn('sparks')} aria-hidden="true">
                        {SPARKS.map((s, i) => (
                            <span
                                key={i}
                                className={cn('spark')}
                                style={{
                                    '--x': `${s.x}%`,
                                    '--y': `${s.y}%`,
                                    '--sz': `${s.size}px`,
                                    '--dur': `${s.dur}s`,
                                    '--dl': `${(1.4 + s.delay).toFixed(2)}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* ---------------- Right: content ---------------- */}
                <div ref={contentRef} className={cn('content', content.entered && 'is-revealed')}>
                    <span className={cn('label', 'reveal')} style={{ '--d': '0s' }}>
                        <BageZescloudAllComps badge=' Business Continuity' />
                    </span>

                    <h2 id="pss-heading" className={cn('heading')}>
                        <span className={cn('headingLine', 'reveal')} style={{ '--d': '0.08s' }}>
                            Protect the business,
                        </span>
                        <span className={cn('headingLine', 'reveal')} style={{ '--d': '0.18s' }}>
                            <span className={cn('headingAccent')}>not just the server.</span>
                        </span>
                    </h2>

                    <p className={cn('description', 'reveal')} style={{ '--d': '0.3s' }}>
                        ZesCloud helps teams understand whether their backups, recovery plans, and critical
                        infrastructure are ready when something goes wrong.
                    </p>

                    <ul className={cn('list')}>
                        {FEATURES.map(({ title, text, tone, Icon }, i) => (
                            <li
                                key={title}
                                className={cn('item', 'reveal')}
                                style={{ '--d': `${(0.4 + i * 0.08).toFixed(2)}s` }}
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

                    <div className={cn('actions', 'reveal')} style={{ '--d': '0.85s' }}>
                        <button type="button" className={cn('button')}>
                            <span>Learn More</span>
                            <IconArrow />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectServersSolutions