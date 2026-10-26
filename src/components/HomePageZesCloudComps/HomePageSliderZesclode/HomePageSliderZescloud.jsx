'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { geoEquirectangular, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import landTopology from 'world-atlas/land-110m.json'
import './HomePageSliderZescloud.css'

const SURFACE_IMAGE_HomePageSliderZescloud = '/MainHomePageSliderSurfaceZescloud.png'

/* ------------------------- PARALLAX SETTINGS -------------------------
   d = how many px of the hero have scrolled away (0 -> hero height).
   Globe goes DOWN by d * GLOBE_SPEED  (it "sets" behind the surface).
   Surface goes UP   by d * SURFACE_SPEED (it rises over the globe).
   The black strip under the surface (.foreground ::after in the CSS)
   scales with the hero, so it always covers SURFACE_SPEED * hero.
   All movement is a % of the hero height, so it looks identical at
   every browser zoom level.
   ----------------------------------------------------------------- */
const GLOBE_SPEED = 0.7
const SURFACE_SPEED = 0.022
const TEXT_SPEED = 0.12
const STARS_SPEED = 0.2
const GLOBE_ZOOM = 0.35
const ENABLE_BOLTS = false // set true to turn the lightning bolts on the arcs back on

/* ----------------------------- DATA -------------------------------- */
/* inDelay = entrance pop-in, floatDelay = negative so cards are already
   mid-float on first paint. */
const STATUS_CARDS_HomePageSliderZescloud = [
  { key: 'infra', label: 'Infrastructure', status: 'Healthy', accent: 'var(--zescloud-status-healthy)', delay: '0s', inDelay: '0.2s', floatDelay: '-0.5s', icon: 'server' },
  { key: 'apps', label: 'Applications', status: 'Optimal', accent: 'var(--zescloud-primary)', delay: '0.8s', inDelay: '0.3s', floatDelay: '-2.1s', icon: 'apps' },
  { key: 'security', label: 'Security', status: 'Protected', accent: 'var(--zescloud-status-danger)', delay: '1.6s', inDelay: '0.4s', floatDelay: '-3.4s', icon: 'shield' },
  { key: 'websites', label: 'Websites', status: 'Online', accent: 'var(--zescloud-status-purple)', delay: '2.4s', inDelay: '0.5s', floatDelay: '-1.3s', icon: 'browser' },
  { key: 'cloud', label: 'Cloud', status: 'Connected', accent: 'var(--zescloud-accent-cyan)', delay: '3.2s', inDelay: '0.6s', floatDelay: '-4.2s', icon: 'cloud' },
]

const ICONS_HomePageSliderZescloud = {
  server: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path d="M7 7h.01M7 17h.01" /></svg>,
  apps: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>,
  browser: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18a4 4 0 01-.5-7.97A5.5 5.5 0 0117 9.5a4.25 4.25 0 01.5 8.5H7z" /></svg>,
}

const CITIES = [
  ['New York', -74, 40.7], ['San Francisco', -122.4, 37.8], ['Mexico City', -99.1, 19.4],
  ['Sao Paulo', -46.6, -23.5], ['London', -0.1, 51.5], ['Lagos', 3.4, 6.5],
  ['Johannesburg', 28, -26.2], ['Dubai', 55.3, 25.2], ['Karachi', 67, 24.9],
  ['Mumbai', 72.9, 19.1], ['Singapore', 103.8, 1.35], ['Tokyo', 139.7, 35.7],
  ['Sydney', 151.2, -33.9], ['Frankfurt', 8.7, 50.1], ['Toronto', -79.4, 43.7],
]

const ARCS = [
  [0, 4], [1, 11], [4, 7], [7, 10], [8, 4], [10, 12], [3, 5], [5, 4],
  [0, 3], [8, 9], [11, 10], [13, 8], [6, 7], [2, 0], [1, 2], [14, 13],
]

const RINGS = [
  { r: 1.3, tilt: 1.2, roll: 0.5, spd: 0.00032, ph: 0 },
  { r: 1.46, tilt: 0.8, roll: -0.7, spd: -0.00022, ph: 2 },
  { r: 1.2, tilt: 1.45, roll: -0.2, spd: 0.00042, ph: 4 },
]

const DEG = Math.PI / 180
const TAU = Math.PI * 2
const SEG = 64
const SPEED = 0.00014
const GLOBE_RADIUS = 0.33 // of the canvas size; 0.33 * 1.46 (outer ring) stays inside the canvas

const toVec = (lon, lat) => {
  const a = lon * DEG
  const b = lat * DEG
  return [Math.cos(b) * Math.sin(a), Math.sin(b), Math.cos(b) * Math.cos(a)]
}

const rgba = (hex, a) => {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
}

const fract = (n) => n - Math.floor(n)

/* ------------------------------------------------------------------
   LAND DOTS (fast)
   Old version ran geoContains() 7000 times = several hundred ms of
   frozen main thread on load. Now the land is painted ONCE onto a
   small hidden canvas (world map image) and each dot just reads one
   pixel. Same result, ~10-20ms, so the globe is complete on frame 1.
   ------------------------------------------------------------------ */
let LAND_CACHE = null
const buildLand = () => {
  if (LAND_CACHE) return LAND_CACHE

  const land = feature(landTopology, landTopology.objects.land)
  const MW = 1024
  const MH = 512
  const mask = document.createElement('canvas')
  mask.width = MW
  mask.height = MH
  const mctx = mask.getContext('2d', { willReadFrequently: true })
  const projection = geoEquirectangular().scale(MW / TAU).translate([MW / 2, MH / 2]).precision(0.3)
  mctx.fillStyle = '#ffffff'
  mctx.beginPath()
  geoPath(projection, mctx)(land)
  mctx.fill('evenodd')
  const px = mctx.getImageData(0, 0, MW, MH).data

  const isLand = (lon, lat) => {
    const x = Math.min(MW - 1, Math.max(0, Math.floor(((lon + 180) / 360) * MW)))
    const y = Math.min(MH - 1, Math.max(0, Math.floor(((90 - lat) / 180) * MH)))
    return px[(y * MW + x) * 4 + 3] > 127
  }

  const cityVecs = CITIES.map((c) => toVec(c[1], c[2]))
  const N = 7000
  const golden = Math.PI * (3 - Math.sqrt(5))
  const dots = []
  const lights = []
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i
    const x = Math.cos(th) * r
    const z = Math.sin(th) * r
    const lat = Math.asin(y) / DEG
    const lon = Math.atan2(x, z) / DEG
    if (!isLand(lon, lat)) continue
    const rnd = fract(Math.sin(i * 12.9898) * 43758.5453)
    const near = cityVecs.some((v) => v[0] * x + v[1] * y + v[2] * z > 0.985)
    if ((near && rnd < 0.55) || rnd < 0.04) lights.push(x, y, z, rnd * TAU)
    else dots.push(x, y, z)
  }
  LAND_CACHE = { dots: new Float32Array(dots), lights: new Float32Array(lights) }
  return LAND_CACHE
}

export default function HomePageSliderZescloud({
  exploreHref = '#',
  howItWorksHref = '#',
}) {
  const sectionRef = useRef(null)
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const starsCanvasRef = useRef(null)
  // Parallax layers (moved directly through refs - no React re-render on scroll)
  const textLayerRef = useRef(null)
  const globeLayerRef = useRef(null)
  const surfaceRef = useRef(null)

  /* 1. SCROLL PARALLAX ("sunset") ------------------------------------ */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined // everything stays at rest

    let ticking = false
    let raf = 0

    const apply = () => {
      ticking = false
      const rect = section.getBoundingClientRect()
      const heroH = section.offsetHeight || 1
      const d = Math.min(Math.max(-rect.top, 0), heroH)
      const p = d / heroH // 0 -> 1

      const text = textLayerRef.current
      if (text) {
        text.style.transform = `translate3d(0, ${(d * TEXT_SPEED).toFixed(2)}px, 0)`
        text.style.opacity = String(Math.max(0, 1 - p * 1.6))
      }
      const globe = globeLayerRef.current
      if (globe) {
        globe.style.transform = `translate3d(0, ${(d * GLOBE_SPEED).toFixed(2)}px, 0) scale(${(1 + p * GLOBE_ZOOM).toFixed(4)})`
      }
      const surface = surfaceRef.current
      if (surface) {
        surface.style.transform = `translate3d(0, ${(-d * SURFACE_SPEED).toFixed(2)}px, 0)`
      }
      const stars = starsCanvasRef.current
      if (stars) {
        stars.style.transform = `translate3d(0, ${(d * STARS_SPEED).toFixed(2)}px, 0)`
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  /* 2. STARS: twinkling sky + occasional shooting stars --------------- */
  useEffect(() => {
    const canvas = starsCanvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return undefined
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let buffer = 0 // extra sky above the hero (scales with the hero, set in CSS)
    let dpr = 1
    let stars = []
    let meteors = []
    let nextMeteor = performance.now() + 900
    let raf = 0
    let visible = true

    const TINTS = ['255,255,255', '255,255,255', '255,255,255', '170,210,255', '120,190,255']

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, section.clientWidth)
      h = Math.max(1, canvas.clientHeight || section.clientHeight)
      buffer = Math.max(0, h - section.clientHeight)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // stars only live in the sky: from the top down to ~78% of the hero
      const skyBottom = h * 0.78
      const count = Math.round(Math.min(260, Math.max(90, (w * skyBottom) / 6500)))
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.12
        const y = Math.random() * skyBottom
        // fade out near the horizon so nothing floats on the surface
        const horizonFade = y > skyBottom * 0.72 ? 1 - (y - skyBottom * 0.72) / (skyBottom * 0.28) : 1
        return {
          x: Math.random() * w,
          y,
          r: big ? 1.1 + Math.random() * 0.9 : 0.35 + Math.random() * 0.8,
          base: (big ? 0.7 : 0.35) + Math.random() * 0.3,
          speed: 0.0006 + Math.random() * 0.0022,
          phase: Math.random() * TAU,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
          fade: Math.max(0, horizonFade),
          big,
        }
      })
      meteors = []
    }

    const spawnMeteor = (t) => {
      const fromLeft = Math.random() < 0.5
      const ang = (fromLeft ? 28 : 152) * DEG + (Math.random() - 0.5) * 0.25
      meteors.push({
        x: w * (0.12 + Math.random() * 0.76),
        y: buffer + h * (0.02 + Math.random() * 0.25),
        vx: Math.cos(ang),
        vy: Math.sin(ang),
        speed: 0.55 + Math.random() * 0.35,
        len: 110 + Math.random() * 90,
        born: t,
        life: 900 + Math.random() * 500,
      })
    }

    const drawMeteors = (t) => {
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        const age = t - m.born
        if (age > m.life || age < 0) { meteors.splice(i, 1); continue }
        const k = age / m.life
        const alpha = Math.sin(Math.PI * k)
        const dist = age * m.speed
        const hx = m.x + m.vx * dist
        const hy = m.y + m.vy * dist
        const tx = hx - m.vx * m.len
        const ty = hy - m.vy * m.len
        const g = ctx.createLinearGradient(tx, ty, hx, hy)
        g.addColorStop(0, 'rgba(120,190,255,0)')
        g.addColorStop(1, `rgba(255,255,255,${(0.85 * alpha).toFixed(3)})`)
        ctx.strokeStyle = g
        ctx.lineWidth = 1.4
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(hx, hy)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(hx, hy, 1.6, 0, TAU)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    const drawFrame = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const tw = reduced ? 0.8 : 0.5 + 0.5 * Math.sin(t * s.speed + s.phase)
        const a = s.base * (0.25 + 0.75 * tw) * s.fade
        if (a <= 0.01) continue
        if (s.big) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 3.2, 0, TAU)
          ctx.fillStyle = `rgba(${s.tint},${a * 0.12})`
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, TAU)
        ctx.fillStyle = `rgba(${s.tint},${a})`
        ctx.fill()
      }
      if (!reduced) {
        if (t > nextMeteor) {
          spawnMeteor(t)
          nextMeteor = t + 2500 + Math.random() * 4500
        }
        drawMeteors(t)
      }
    }

    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      drawFrame(t)
    }

    init()
    drawFrame(performance.now()) // paint stars right away, no blank first frame
    if (!reduced) raf = requestAnimationFrame(loop)

    const ro = new ResizeObserver(() => {
      init()
      drawFrame(performance.now())
    })
    ro.observe(section)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(section)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  /* 3. GLOBE 3D CANVAS ------------------------------------------------ */
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined
    const ctx = canvas.getContext('2d')

    const css = getComputedStyle(document.documentElement)
    const v = (name, fb) => css.getPropertyValue(name).trim() || fb
    const C = {
      primary: v('--zescloud-primary', '#3989E2'),
      dark: v('--zescloud-primary-dark', '#1848D9'),
      cyan: v('--zescloud-accent-cyan', '#56B4FF'),
      base: v('--zescloud-bg-base', '#020A13'),
      surface: v('--zescloud-bg-surface', '#071527'),
      warm: v('--zescloud-status-warning', '#F59E0B'),
      white: v('--zescloud-text-white', '#FFFFFF'),
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speedMul = reduced ? 0.2 : 1

    const makeSprite = (color) => {
      const c = document.createElement('canvas')
      c.width = 64
      c.height = 64
      const g = c.getContext('2d')
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32)
      gr.addColorStop(0, rgba(color, 1))
      gr.addColorStop(0.25, rgba(color, 0.55))
      gr.addColorStop(1, rgba(color, 0))
      g.fillStyle = gr
      g.fillRect(0, 0, 64, 64)
      return c
    }
    const sprCyan = makeSprite(C.cyan)
    const sprWhite = makeSprite(C.white)
    const sprWarm = makeSprite(C.warm)

    let W = 0
    let H = 0
    let dpr = 1
    let R = 0
    let cx = 0
    let cy = 0
    let yaw = 1.6
    const tilt = 0.38
    let cY = 1
    let sY = 0
    const cT = Math.cos(tilt)
    const sT = Math.sin(tilt)
    const P = [0, 0, 0, 0, 0]
    let land = null
    let visible = true
    let readyMarked = false

    const proj = (x, y, z) => {
      const x1 = x * cY + z * sY
      const z1 = -x * sY + z * cY
      const y2 = y * cT - z1 * sT
      const z2 = y * sT + z1 * cT
      P[0] = cx + R * x1
      P[1] = cy - R * y2
      P[2] = z2
      P[3] = x1
      P[4] = y2
    }

    const now0 = performance.now()
    const arcs = ARCS.map(([ia, ib]) => {
      const a = toVec(CITIES[ia][1], CITIES[ia][2])
      const b = toVec(CITIES[ib][1], CITIES[ib][2])
      const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
      const om = Math.acos(dot)
      const lift = 0.1 + 0.22 * (om / Math.PI)
      const pts = new Float32Array((SEG + 1) * 3)
      for (let i = 0; i <= SEG; i++) {
        const t = i / SEG
        const s1 = Math.sin((1 - t) * om) / Math.sin(om)
        const s2 = Math.sin(t * om) / Math.sin(om)
        const h = 1 + lift * Math.sin(Math.PI * t)
        pts[i * 3] = (s1 * a[0] + s2 * b[0]) * h
        pts[i * 3 + 1] = (s1 * a[1] + s2 * b[1]) * h
        pts[i * 3 + 2] = (s1 * a[2] + s2 * b[2]) * h
      }
      return {
        pts,
        sx: new Float32Array(SEG + 1),
        sy: new Float32Array(SEG + 1),
        vis: new Uint8Array(SEG + 1),
        speed: 0.00014 + Math.random() * 0.0001,
        offset: Math.random(),
        nextBolt: now0 + 900 + Math.random() * 4500,
        boltUntil: 0,
      }
    })

    const nodes = CITIES.map((c, i) => ({ vec: toVec(c[1], c[2]), ph: (i * 0.37) % 1 }))

    // clientWidth/Height = real layout size, NOT affected by the entrance
    // scale animation or the scroll zoom (getBoundingClientRect is), so
    // the canvas never renders at the wrong resolution / blurry.
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.width = Math.max(1, Math.round(wrap.clientWidth * dpr))
      H = canvas.height = Math.max(1, Math.round(wrap.clientHeight * dpr))
      cx = W / 2
      cy = H / 2
      R = Math.min(W, H) * GLOBE_RADIUS
    }

    const glow = (spr, x, y, size, alpha) => {
      ctx.globalAlpha = alpha
      ctx.drawImage(spr, x - size / 2, y - size / 2, size, size)
      ctx.globalAlpha = 1
    }

    const ringPt = (ring, a) => {
      const x = Math.cos(a) * ring.r
      const z = Math.sin(a) * ring.r
      const ct = Math.cos(ring.tilt)
      const st = Math.sin(ring.tilt)
      const y1 = -z * st
      const z1 = z * ct
      const cr = Math.cos(ring.roll)
      const sr = Math.sin(ring.roll)
      const x2 = x * cr - y1 * sr
      const y2 = x * sr + y1 * cr
      P[0] = cx + R * x2
      P[1] = cy - R * y2
      P[2] = z1
      P[3] = x2
      P[4] = y2
    }

    const drawRings = (front, t) => {
      RINGS.forEach((ring) => {
        const steps = 96
        ctx.beginPath()
        for (let k = 0; k < steps; k++) {
          const a0 = (k / steps) * TAU
          const a1 = ((k + 1) / steps) * TAU
          ringPt(ring, a0)
          const x0 = P[0]
          const y0 = P[1]
          const z0 = P[2]
          ringPt(ring, a1)
          if ((z0 + P[2]) / 2 > 0 === front) {
            ctx.moveTo(x0, y0)
            ctx.lineTo(P[0], P[1])
          }
        }
        ctx.lineWidth = dpr
        ctx.strokeStyle = rgba(C.cyan, front ? 0.32 : 0.12)
        ctx.stroke()

        const a = ring.ph + t * ring.spd
        ringPt(ring, a)
        if (P[2] > 0 === front) {
          glow(sprCyan, P[0], P[1], 26 * dpr, 0.9)
          glow(sprWhite, P[0], P[1], 8 * dpr, 1)
        }
      })
    }

    const strokeList = (list, w, col, a) => {
      ctx.lineWidth = w * dpr
      ctx.strokeStyle = rgba(col, a)
      ctx.beginPath()
      list.forEach((p) => {
        ctx.moveTo(p[0], p[1])
        for (let k = 2; k < p.length; k += 2) ctx.lineTo(p[k], p[k + 1])
      })
      ctx.stroke()
    }

    const drawBolt = (arc, life) => {
      const { sx, sy, vis } = arc
      const amp = 10 * dpr
      const main = []
      let cur = null
      for (let i = 0; i <= SEG; i++) {
        if (!vis[i]) { cur = null; continue }
        const i0 = Math.max(i - 1, 0)
        const i1 = Math.min(i + 1, SEG)
        let dx = sx[i1] - sx[i0]
        let dy = sy[i1] - sy[i0]
        const len = Math.hypot(dx, dy) || 1
        dx /= len
        dy /= len
        const j = (Math.random() - 0.5) * 2 * amp * Math.sin((Math.PI * i) / SEG)
        if (!cur) { cur = []; main.push(cur) }
        cur.push(sx[i] - dy * j, sy[i] + dx * j)
      }
      const branches = []
      for (let b = 0; b < 3; b++) {
        const i = 6 + Math.floor(Math.random() * (SEG - 12))
        if (!vis[i]) continue
        let x = sx[i]
        let y = sy[i]
        let ang = Math.random() * TAU
        const poly = [x, y]
        for (let s = 0; s < 4; s++) {
          ang += (Math.random() - 0.5) * 1.3
          x += Math.cos(ang) * 9 * dpr
          y += Math.sin(ang) * 9 * dpr
          poly.push(x, y)
        }
        branches.push(poly)
      }
      const flick = life * (0.55 + 0.45 * Math.random())
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineJoin = 'round'
      ctx.shadowColor = C.cyan
      ctx.shadowBlur = 16 * dpr
      strokeList(main, 3.5, C.cyan, 0.35 * flick)
      strokeList(main, 1.5, C.white, 0.95 * flick)
      strokeList(branches, 1, C.cyan, 0.8 * flick)
      ctx.restore()
    }

    const buckets = [[], [], [], []]

    const draw = (t) => {
      cY = Math.cos(yaw)
      sY = Math.sin(yaw)
      ctx.clearRect(0, 0, W, H)

      drawRings(false, t)

      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, TAU)
      ctx.fillStyle = C.base
      ctx.fill()
      let g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.05, cx, cy, R)
      g.addColorStop(0, rgba(C.dark, 0.55))
      g.addColorStop(0.55, rgba(C.surface, 0.9))
      g.addColorStop(1, rgba(C.base, 1))
      ctx.fillStyle = g
      ctx.fill()

      ctx.beginPath()
      for (let lon = -180; lon < 180; lon += 30) {
        let pen = false
        for (let lat = -90; lat <= 90; lat += 6) {
          const p = toVec(lon, lat)
          proj(p[0], p[1], p[2])
          if (P[2] > 0) {
            if (pen) ctx.lineTo(P[0], P[1])
            else ctx.moveTo(P[0], P[1])
            pen = true
          } else pen = false
        }
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        let pen = false
        for (let lon = -180; lon <= 180; lon += 6) {
          const p = toVec(lon, lat)
          proj(p[0], p[1], p[2])
          if (P[2] > 0) {
            if (pen) ctx.lineTo(P[0], P[1])
            else ctx.moveTo(P[0], P[1])
            pen = true
          } else pen = false
        }
      }
      ctx.lineWidth = dpr * 0.8
      ctx.strokeStyle = rgba(C.primary, 0.14)
      ctx.stroke()

      if (land) {
        buckets.forEach((b) => { b.length = 0 })
        const d = land.dots
        for (let i = 0; i < d.length; i += 3) {
          proj(d[i], d[i + 1], d[i + 2])
          const z = P[2]
          if (z <= 0.02) continue
          const a = 0.18 + 0.82 * z
          const bi = Math.min(3, Math.floor(a * 4))
          buckets[bi].push(P[0], P[1], (0.8 + 0.6 * z) * dpr)
        }
        ctx.fillStyle = C.cyan
        buckets.forEach((b, bi) => {
          ctx.globalAlpha = 0.2 + bi * 0.22
          ctx.beginPath()
          for (let k = 0; k < b.length; k += 3) {
            ctx.moveTo(b[k] + b[k + 2], b[k + 1])
            ctx.arc(b[k], b[k + 1], b[k + 2], 0, TAU)
          }
          ctx.fill()
        })
        ctx.globalAlpha = 1

        const l = land.lights
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < l.length; i += 4) {
          proj(l[i], l[i + 1], l[i + 2])
          if (P[2] <= 0.05) continue
          const tw = 0.55 + 0.45 * Math.sin(t * 0.003 + l[i + 3] * 3)
          glow(sprWarm, P[0], P[1], 9 * dpr, tw * P[2])
        }
        ctx.restore()
      }

      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, TAU)
      g = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.45, cx, cy, R)
      g.addColorStop(0, rgba(C.base, 0))
      g.addColorStop(1, rgba(C.base, 0.65))
      ctx.fillStyle = g
      ctx.fill()

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      g = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.08)
      g.addColorStop(0, rgba(C.primary, 0))
      g.addColorStop(0.62, rgba(C.cyan, 0.5))
      g.addColorStop(1, rgba(C.primary, 0))
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.08, 0, TAU)
      ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.lineCap = 'round'
      arcs.forEach((arc) => {
        const { pts, sx, sy, vis } = arc
        for (let i = 0; i <= SEG; i++) {
          proj(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2])
          sx[i] = P[0]
          sy[i] = P[1]
          vis[i] = P[2] > 0 || P[3] * P[3] + P[4] * P[4] > 1 ? 1 : 0
        }
        ctx.beginPath()
        let pen = false
        for (let i = 0; i <= SEG; i++) {
          if (vis[i]) {
            if (pen) ctx.lineTo(sx[i], sy[i])
            else ctx.moveTo(sx[i], sy[i])
            pen = true
          } else pen = false
        }
        ctx.lineWidth = 1.1 * dpr
        ctx.strokeStyle = rgba(C.cyan, 0.26)
        ctx.stroke()

        ctx.globalCompositeOperation = 'lighter'
        const head = ((t * arc.speed + arc.offset) % 1) * SEG
        const tail = SEG * 0.22
        for (let i = Math.max(1, Math.floor(head - tail)); i <= Math.floor(head) && i <= SEG; i++) {
          if (!vis[i] || !vis[i - 1]) continue
          const f = Math.min(1, Math.max(0, (i - (head - tail)) / tail))
          ctx.beginPath()
          ctx.moveTo(sx[i - 1], sy[i - 1])
          ctx.lineTo(sx[i], sy[i])
          ctx.lineWidth = (3 + 5 * f) * dpr
          ctx.strokeStyle = rgba(C.primary, 0.1 * f)
          ctx.stroke()
          ctx.lineWidth = (0.8 + 1.8 * f) * dpr
          ctx.strokeStyle = rgba(C.cyan, f)
          ctx.stroke()
        }
        const hi = Math.min(SEG - 1, Math.floor(head))
        if (vis[hi] && vis[hi + 1]) {
          const fr = head - hi
          const hx = sx[hi] + (sx[hi + 1] - sx[hi]) * fr
          const hy = sy[hi] + (sy[hi + 1] - sy[hi]) * fr
          glow(sprCyan, hx, hy, 24 * dpr, 1)
          glow(sprWhite, hx, hy, 8 * dpr, 1)
        }
        ctx.globalCompositeOperation = 'source-over'

        if (ENABLE_BOLTS && !reduced) {
          if (t > arc.nextBolt) {
            arc.boltUntil = t + 280
            arc.nextBolt = t + 2200 + Math.random() * 5500
          }
          if (t < arc.boltUntil) drawBolt(arc, (arc.boltUntil - t) / 280)
        }
      })
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      nodes.forEach((n) => {
        proj(n.vec[0], n.vec[1], n.vec[2])
        if (P[2] <= 0.03) return
        const ph = (t * 0.0007 + n.ph) % 1
        glow(sprCyan, P[0], P[1], 16 * dpr, 0.8)
        glow(sprWhite, P[0], P[1], 5 * dpr, 1)
        ctx.beginPath()
        ctx.arc(P[0], P[1], (3 + ph * 13) * dpr, 0, TAU)
        ctx.lineWidth = dpr
        ctx.strokeStyle = rgba(C.cyan, (1 - ph) * 0.6)
        ctx.stroke()
      })
      ctx.restore()

      drawRings(true, t)

      if (!readyMarked) {
        readyMarked = true
        wrap.classList.add('isReady-HomePageSliderZescloud') // fades the globe in
      }
    }

    let raf = 0
    let last = performance.now()
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (!visible || !W) { last = now; return }
      const dt = Math.min(now - last, 50)
      last = now
      yaw += dt * SPEED * speedMul
      draw(now)
    }

    resize()
    // Land is built synchronously (fast now) so the very first frame is complete.
    try {
      land = buildLand()
    } catch (err) {
      land = null // globe still runs without the land dots
    }
    draw(performance.now()) // first frame immediately, before the loop starts
    raf = requestAnimationFrame(frame)

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(wrap)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const handleScrollClick = () => {
    const h = sectionRef.current ? sectionRef.current.offsetHeight : window.innerHeight
    window.scrollBy({ top: h, behavior: 'smooth' })
  }

  return (
    <section className="section-HomePageSliderZescloud" ref={sectionRef}>
      {/* Background animated stars (behind everything, sky only) */}
      <canvas ref={starsCanvasRef} className="stars-HomePageSliderZescloud" aria-hidden="true" />
      <div className="overlay-HomePageSliderZescloud" aria-hidden="true" />

      <div className="container-HomePageSliderZescloud">
        {/* ---------------- LEFT ---------------- */}
        {/* Outer layer = scroll parallax (JS). Inner elements = entrance animations (CSS). */}
        <div className="contentLayer-HomePageSliderZescloud" ref={textLayerRef}>
          <div className="content-HomePageSliderZescloud">
            <span className="eyebrow-HomePageSliderZescloud">
              <span className="eyebrowDot-HomePageSliderZescloud" aria-hidden="true" />
              AI Operations Cloud
            </span>

            <h1 className="title-HomePageSliderZescloud">
              <span className="titleRow-HomePageSliderZescloud">
                <span className="titleLine-HomePageSliderZescloud">Your Business.</span>
              </span>
              <span className="titleRow-HomePageSliderZescloud">
                <span className="titleAccent-HomePageSliderZescloud">Always On.</span>
              </span>
            </h1>

            <p className="description-HomePageSliderZescloud">
              ZesCloud is an AI-powered operations platform that monitors, understands, and protects your digital business.
            </p>

            <div className="actions-HomePageSliderZescloud">
              <a href={exploreHref} className="btnPrimary-HomePageSliderZescloud">
                <span>Explore ZesCloud</span>
                <svg className="btnArrow-HomePageSliderZescloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href={howItWorksHref} className="btnOutline-HomePageSliderZescloud">
                <span className="btnPlay-HomePageSliderZescloud" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
                <span>See How it Works</span>
              </a>
            </div>

            {/* <p className="powered-HomePageSliderZescloud">Powered by Zaura&trade; Intelligence.</p> */}
          </div>
        </div>

        {/* ---------------- RIGHT (GLOBE) ---------------- */}
        <div className="visualLayer-HomePageSliderZescloud" ref={globeLayerRef}>
          <div className="visual-HomePageSliderZescloud">
            <div className="globeWrap-HomePageSliderZescloud" ref={wrapRef}>
              <div className="globeHalo-HomePageSliderZescloud" aria-hidden="true" />
              <canvas
                ref={canvasRef}
                className="canvas-HomePageSliderZescloud"
                aria-label="Rotating globe showing live global connections"
                role="img"
              />

              {STATUS_CARDS_HomePageSliderZescloud.map((c) => (
                <div
                  key={c.key}
                  className={`card-HomePageSliderZescloud card_${c.key}-HomePageSliderZescloud`}
                  style={{
                    '--accent-HomePageSliderZescloud': c.accent,
                    '--delay-HomePageSliderZescloud': c.delay,
                    '--in-HomePageSliderZescloud': c.inDelay,
                    '--float-HomePageSliderZescloud': c.floatDelay,
                  }}
                >
                  <span className="cardIcon-HomePageSliderZescloud">{ICONS_HomePageSliderZescloud[c.icon]}</span>
                  <span className="cardText-HomePageSliderZescloud">
                    <span className="cardLabel-HomePageSliderZescloud">{c.label}</span>
                    <span className="cardStatus-HomePageSliderZescloud">{c.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- FOREGROUND SURFACE (in front of globe) ---------------- */}
      {/* next/image: served as WebP/AVIF, sized for the screen, loaded with high priority */}
      <div ref={surfaceRef} className="foreground-HomePageSliderZescloud" aria-hidden="true">
        <Image
          src={SURFACE_IMAGE_HomePageSliderZescloud}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          quality={100}
          className="foregroundImg-HomePageSliderZescloud"
        />
      </div>

      <button type="button" className="scroll-HomePageSliderZescloud" onClick={handleScrollClick}>
        <span className="scrollLine-HomePageSliderZescloud" aria-hidden="true" />
        {/* <span>Scroll to explore</span> */}
      </button>
    </section>
  )
}