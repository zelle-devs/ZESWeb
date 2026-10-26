'use client'

import React, { useEffect, useRef, useState } from 'react'
import './BottomCTAMoonHomePage.css'

const DEFAULT_SURFACE_IMAGE = '/BottomCTAZesCloud2.png'
const DEFAULT_MOON_IMAGE = '/BottomCTAZesCloudMoon2.png'

const TITLE_LINES = ['What if your business', 'could see what’s coming?']

const STAR_COLORS = ['255, 255, 255', '214, 230, 255', '176, 206, 255', '206, 192, 255']

const MOON_CENTER_Y = 1.585
const MOON_RADIUS = 0.535

function BottomCTAMoonHomePage({
  surfaceImage = DEFAULT_SURFACE_IMAGE,
  moonImage = DEFAULT_MOON_IMAGE,
  eyebrow = 'Ready to take control?',
  primaryLabel = 'Explore ZesCloud',
  primaryHref = '/zescloud',
  secondaryLabel = 'Talk to Us',
  secondaryHref = '/contact',
}) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const starsRef = useRef(null)
  const moonRef = useRef(null)
  const moonGlowRef = useRef(null)
  const fogRef = useRef(null)
  const surfaceRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(stage)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    const moon = moonRef.current
    const glow = moonGlowRef.current
    const surface = surfaceRef.current
    const stars = starsRef.current
    const fog = fogRef.current

    if (!stage || !moon || !glow || !surface || !stars || !fog) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

    const getTarget = () => {
      const rect = stage.getBoundingClientRect()
      const viewport = window.innerHeight || document.documentElement.clientHeight || 1
      const distance = (viewport + rect.height) * 0.5 * 0.9
      return clamp((viewport - rect.top) / distance, 0, 1)
    }

    let rafId = 0
    let running = false
    let progress = reduceMotion ? 1 : getTarget()

    const render = () => {
      const height = stage.offsetHeight
      const eased = easeOutCubic(progress)
      const inverse = 1 - eased

      moon.style.transform = `translate3d(-50%, ${(inverse * height * 0.78).toFixed(2)}px, 0) scale(${(0.84 + eased * 0.16).toFixed(4)})`

      glow.style.opacity = (0.15 + eased * 0.85).toFixed(3)
      glow.style.transform = `translate3d(-50%, ${(inverse * height * 0.62).toFixed(2)}px, 0) scale(${(0.78 + eased * 0.22).toFixed(4)})`

      surface.style.transform = `translate3d(0, ${(-inverse * height * 0.14).toFixed(2)}px, 0) scale(${(1.06 - eased * 0.06).toFixed(4)})`

      stars.style.transform = `translate3d(0, ${(inverse * -36).toFixed(2)}px, 0)`

      fog.style.opacity = (0.35 + eased * 0.65).toFixed(3)
    }

    const tick = () => {
      const target = reduceMotion ? 1 : getTarget()
      progress += (target - progress) * 0.08
      if (Math.abs(target - progress) < 0.0005) progress = target

      render()

      if (running) rafId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running) return
      running = true
      rafId = requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(rafId)
    }

    const handleResize = () => render()

    render()

    let observer = null

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start()
            else stop()
          })
        },
        { rootMargin: '150px 0px 150px 0px' }
      )
      observer.observe(stage)
    } else {
      start()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      stop()
      if (observer) observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let stars = []
    let shootingStars = []
    let rafId = 0
    let running = false
    let lastTime = 0
    let nextShootAt = 0

    const random = (min, max) => min + Math.random() * (max - min)
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(480, Math.round((width * height) / 2100))

      stars = Array.from({ length: count }, () => {
        const isBright = Math.random() < 0.06
        const y = Math.pow(Math.random(), 1.4) * height * 0.8
        return {
          x: Math.random() * width,
          y,
          r: isBright ? random(1.3, 2.1) : random(0.35, 1.25),
          alpha: random(0.35, 1),
          fade: clamp(1 - (y / height - 0.4) / 0.38, 0, 1),
          speed: random(0.6, 2.8),
          phase: random(0, Math.PI * 2),
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        }
      })

      shootingStars = []
    }

    const clipOutMoon = () => {
      const moon = moonRef.current
      if (!moon) return
      const moonRect = moon.getBoundingClientRect()
      if (moonRect.width < 10 || moonRect.height < 10) return
      const canvasRect = canvas.getBoundingClientRect()
      const centerX = moonRect.left + moonRect.width / 2 - canvasRect.left
      const centerY = moonRect.top + moonRect.height * MOON_CENTER_Y - canvasRect.top
      const radius = moonRect.width * MOON_RADIUS

      ctx.beginPath()
      ctx.rect(0, 0, width, height)
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
      ctx.clip('evenodd')
    }

    const spawnShootingStar = () => {
      const goLeft = Math.random() < 0.5
      shootingStars.push({
        x: goLeft ? random(width * 0.35, width) : random(0, width * 0.65),
        y: random(0, height * 0.3),
        angle: (goLeft ? Math.PI * 0.82 : Math.PI * 0.18) + random(-0.08, 0.08),
        speed: random(0.55, 0.95),
        length: random(110, 220),
        life: 0,
        duration: random(900, 1500),
      })
    }

    const drawStars = (time) => {
      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i]
        if (star.fade <= 0) continue

        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.001 * star.speed + star.phase)
        const alpha = star.alpha * star.fade * (0.3 + 0.7 * twinkle)

        ctx.fillStyle = `rgba(${star.color}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()

        if (star.r > 1.25) {
          ctx.fillStyle = `rgba(${star.color}, ${(alpha * 0.16).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * 3.4, 0, Math.PI * 2)
          ctx.fill()

          const spike = star.r * (4 + twinkle * 3)
          ctx.strokeStyle = `rgba(${star.color}, ${(alpha * 0.55).toFixed(3)})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(star.x - spike, star.y)
          ctx.lineTo(star.x + spike, star.y)
          ctx.moveTo(star.x, star.y - spike)
          ctx.lineTo(star.x, star.y + spike)
          ctx.stroke()
        }
      }
    }

    const drawShootingStars = (delta) => {
      for (let i = shootingStars.length - 1; i >= 0; i -= 1) {
        const star = shootingStars[i]
        star.life += delta

        if (star.life >= star.duration) {
          shootingStars.splice(i, 1)
          continue
        }

        const travel = star.speed * star.life
        const headX = star.x + Math.cos(star.angle) * travel
        const headY = star.y + Math.sin(star.angle) * travel
        const tailX = headX - Math.cos(star.angle) * star.length
        const tailY = headY - Math.sin(star.angle) * star.length
        const alpha = Math.sin((star.life / star.duration) * Math.PI)

        const gradient = ctx.createLinearGradient(headX, headY, tailX, tailY)
        gradient.addColorStop(0, `rgba(226, 240, 255, ${alpha.toFixed(3)})`)
        gradient.addColorStop(0.3, `rgba(86, 180, 255, ${(alpha * 0.45).toFixed(3)})`)
        gradient.addColorStop(1, 'rgba(86, 180, 255, 0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.4
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(headX, headY)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(headX, headY, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const paint = (time, delta) => {
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      clipOutMoon()
      drawStars(time)
      if (delta !== null) drawShootingStars(delta)
      ctx.restore()
    }

    const frame = (time) => {
      const delta = lastTime ? Math.min(time - lastTime, 50) : 16
      lastTime = time

      if (time >= nextShootAt) {
        spawnShootingStar()
        nextShootAt = time + random(2500, 7000)
      }

      paint(time, delta)

      if (running) rafId = requestAnimationFrame(frame)
    }

    const drawStatic = () => paint(0, null)

    const start = () => {
      if (running || reduceMotion) return
      running = true
      lastTime = 0
      nextShootAt = performance.now() + random(1200, 3000)
      rafId = requestAnimationFrame(frame)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(rafId)
    }

    build()
    drawStatic()

    const moonImageElement = moonRef.current ? moonRef.current.querySelector('img') : null
    const handleMoonLoad = () => {
      if (!running) drawStatic()
    }
    if (moonImageElement) moonImageElement.addEventListener('load', handleMoonLoad)

    let resizeObserver = null

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        build()
        if (!running) drawStatic()
      })
      resizeObserver.observe(canvas)
    }

    let visibilityObserver = null

    if (typeof IntersectionObserver !== 'undefined') {
      visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start()
            else stop()
          })
        },
        { rootMargin: '100px 0px 100px 0px' }
      )
      visibilityObserver.observe(stage)
    } else {
      start()
    }

    return () => {
      stop()
      if (moonImageElement) moonImageElement.removeEventListener('load', handleMoonLoad)
      if (resizeObserver) resizeObserver.disconnect()
      if (visibilityObserver) visibilityObserver.disconnect()
    }
  }, [])

  return (
    <section
      className="bcta-section-BottomCTAMoonHomePage"
      aria-labelledby="bcta-title-BottomCTAMoonHomePage"
    >
      <div className="bcta-container-BottomCTAMoonHomePage">
        <div
          ref={stageRef}
          className={`bcta-stage-BottomCTAMoonHomePage${isVisible ? ' is-visible-BottomCTAMoonHomePage' : ''}`}
        >
          <div className="bcta-sky-BottomCTAMoonHomePage" aria-hidden="true">
            <span className="bcta-nebula-BottomCTAMoonHomePage bcta-nebula-left-BottomCTAMoonHomePage" />
            <span className="bcta-nebula-BottomCTAMoonHomePage bcta-nebula-right-BottomCTAMoonHomePage" />
          </div>

          <div ref={starsRef} className="bcta-stars-BottomCTAMoonHomePage" aria-hidden="true">
            <canvas ref={canvasRef} className="bcta-stars-canvas-BottomCTAMoonHomePage" />
          </div>

          <div ref={moonGlowRef} className="bcta-moon-glow-BottomCTAMoonHomePage" aria-hidden="true" />

          <div ref={moonRef} className="bcta-moon-BottomCTAMoonHomePage" aria-hidden="true">
            <span className="bcta-moon-backdrop-BottomCTAMoonHomePage" />
            <img
              src={moonImage}
              alt=""
              className="bcta-moon-image-BottomCTAMoonHomePage"
              draggable="false"
              decoding="async"
            />
          </div>

          <div ref={surfaceRef} className="bcta-surface-BottomCTAMoonHomePage" aria-hidden="true">
            <img
              src={surfaceImage}
              alt=""
              className="bcta-surface-image-BottomCTAMoonHomePage"
              draggable="false"
              decoding="async"
            />
          </div>

          <div ref={fogRef} className="bcta-fog-BottomCTAMoonHomePage" aria-hidden="true">
            <span className="bcta-fog-layer-BottomCTAMoonHomePage bcta-fog-layer-one-BottomCTAMoonHomePage" />
            <span className="bcta-fog-layer-BottomCTAMoonHomePage bcta-fog-layer-two-BottomCTAMoonHomePage" />
          </div>

          <span className="bcta-ground-glow-BottomCTAMoonHomePage" aria-hidden="true" />

          <div className="bcta-vignette-BottomCTAMoonHomePage" aria-hidden="true" />

          <div className="bcta-content-BottomCTAMoonHomePage">
            <span
              className="bcta-eyebrow-BottomCTAMoonHomePage bcta-reveal-BottomCTAMoonHomePage"
              style={{ '--bcta-delay': '0.1s' }}
            >
              {eyebrow}
            </span>

            <h2 id="bcta-title-BottomCTAMoonHomePage" className="bcta-title-BottomCTAMoonHomePage">
              {TITLE_LINES.map((line, index) => (
                <span key={line} className="bcta-title-line-BottomCTAMoonHomePage">
                  <span
                    className="bcta-title-text-BottomCTAMoonHomePage"
                    style={{ '--bcta-delay': `${0.25 + index * 0.14}s` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p
              className="bcta-subtitle-BottomCTAMoonHomePage bcta-reveal-BottomCTAMoonHomePage"
              style={{ '--bcta-delay': '0.6s' }}
            >
              Meet ZesCloud. Powered by <span className="bcta-brand-BottomCTAMoonHomePage">Zaura™</span>.
            </p>

            <div
              className="bcta-actions-BottomCTAMoonHomePage bcta-reveal-BottomCTAMoonHomePage"
              style={{ '--bcta-delay': '0.75s' }}
            >
              <a
                href={primaryHref}
                className="bcta-btn-BottomCTAMoonHomePage bcta-btn-primary-BottomCTAMoonHomePage"
              >
                <span className="bcta-btn-label-BottomCTAMoonHomePage">{primaryLabel}</span>
                <svg
                  className="bcta-btn-arrow-BottomCTAMoonHomePage"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href={secondaryHref}
                className="bcta-btn-BottomCTAMoonHomePage bcta-btn-secondary-BottomCTAMoonHomePage"
              >
                <span className="bcta-play-BottomCTAMoonHomePage" aria-hidden="true">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <path
                      d="M1 1.2v9.6c0 .6.6.9 1.1.6l7.2-4.8c.4-.3.4-.9 0-1.2L2.1.6C1.6.3 1 .6 1 1.2z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="bcta-btn-label-BottomCTAMoonHomePage">{secondaryLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BottomCTAMoonHomePage