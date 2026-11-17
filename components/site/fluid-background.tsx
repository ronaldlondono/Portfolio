"use client"

/**
 * Fluid background: four organic SVG blobs drawn in a small viewBox, blurred and
 * scaled up, drifting slowly with time and scroll and shifting slightly with the
 * pointer.
 *
 * data-mood contract
 * - Any element in the document may carry `data-mood="N"` with N in 0–9
 *   (0 inicio/proyectos, 1–6 the six projects, 7 experiencia, 8 stack, 9 contacto).
 * - Each frame, the active mood is the LAST element in document order whose box
 *   contains the vertical middle of the viewport. Nested elements come after their
 *   parent, so a project <article data-mood="3"> inside <section data-mood="0">
 *   wins while it is in view.
 * - When no element matches, the mood stays where it was.
 * - Elements added or removed later are picked up automatically (MutationObserver).
 * The blobs ease toward the active mood's opacity and position (MOODS below).
 *
 * Motion: refs + requestAnimationFrame only (no React state per frame), paused
 * while the tab is hidden. With prefers-reduced-motion one static frame is drawn.
 */

import { useEffect, useRef } from "react"

type Blob = { fill: string; R: number; seed: number; sp: number; ph: number }

const BLOBS: Blob[] = [
  { fill: "#2BB3A8", R: 92, seed: 11, sp: 0.00011, ph: 0 },
  { fill: "#17707A", R: 112, seed: 29, sp: 0.00008, ph: 2.1 },
  { fill: "#F2C14E", R: 78, seed: 47, sp: 0.00013, ph: 4.2 },
  { fill: "#F07A5F", R: 84, seed: 73, sp: 0.0001, ph: 1.3 },
]

/** Per mood: [opacity, x, y] for each blob in the 400×250 viewBox. */
type BlobState = [number, number, number]
const MOODS: BlobState[][] = [
  [[0.55, 300, 80], [0.5, 130, 200], [0.4, 345, 210], [0.25, 60, 40]], // 0 inicio
  [[0.3, 320, 60], [0.45, 80, 200], [0.55, 300, 175], [0.3, 200, 40]], // 1 vipePos
  [[0.55, 285, 130], [0.5, 90, 60], [0.2, 350, 225], [0.15, 40, 220]], // 2 printCostPro
  [[0.25, 360, 60], [0.45, 80, 90], [0.3, 240, 225], [0.55, 320, 165]], // 3 mapanetBpo
  [[0.45, 300, 60], [0.4, 60, 200], [0.45, 340, 200], [0.2, 160, 40]], // 4 radeStudio
  [[0.55, 330, 150], [0.55, 140, 60], [0.25, 260, 230], [0.15, 30, 200]], // 5 vision
  [[0.2, 40, 60], [0.4, 200, 40], [0.45, 285, 90], [0.5, 330, 200]], // 6 magicCulture
  [[0.4, 80, 60], [0.55, 300, 200], [0.2, 360, 40], [0.25, 200, 230]], // 7 experiencia
  [[0.5, 200, 120], [0.4, 360, 40], [0.35, 60, 220], [0.2, 340, 230]], // 8 stack
  [[0.3, 60, 200], [0.35, 200, 40], [0.5, 330, 90], [0.5, 250, 210]], // 9 contacto
]

const EASE_PER_FRAME = 0.025

/** Deterministic PRNG so server and client render the same blob geometry. */
function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Closed Catmull-Rom curve through 8 jittered points around a circle. */
function blobPath(seed: number, R: number) {
  const r = rng(seed)
  const n = 8
  const p: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + (r() - 0.5) * 0.4
    const rad = R * (0.74 + r() * 0.5)
    p.push([Math.cos(a) * rad, Math.sin(a) * rad])
  }
  const f = (v: number) => v.toFixed(1)
  let d = `M${f(p[0][0])} ${f(p[0][1])}`
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n]
    const p1 = p[i]
    const p2 = p[(i + 1) % n]
    const p3 = p[(i + 2) % n]
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(
      p2[1] - (p3[1] - p1[1]) / 6,
    )} ${f(p2[0])} ${f(p2[1])}`
  }
  return `${d}Z`
}

const PATHS = BLOBS.map((b) => blobPath(b.seed, b.R))

/** Transform of blob i for state s at time t, scroll fraction sf and pointer x px (0–1). */
function blobTransform(i: number, s: BlobState, t: number, sf: number, px: number) {
  const b = BLOBS[i]
  const w = t * b.sp + b.ph
  const side = i % 2 ? 1 : -1
  const x = s[1] + Math.sin(w) * 22 + (px - 0.5) * 10 * side
  const y = s[2] + Math.cos(w * 1.3) * 14 - sf * 24 * (i % 2 ? 1 : -0.6)
  const rot = (w * 18) % 360
  const sx = 1 + Math.sin(w * 1.7) * 0.14
  const sy = 1 + Math.cos(w * 1.4) * 0.14
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`
}

/** Active mood from the data-mood contract, or null when nothing contains the viewport middle. */
function findMood(nodes: Element[], mid: number): number | null {
  let mood: number | null = null
  for (const el of nodes) {
    const r = el.getBoundingClientRect()
    if (r.top <= mid && r.bottom > mid) {
      const m = Number((el as HTMLElement).dataset.mood)
      if (Number.isInteger(m) && m >= 0 && m < MOODS.length) mood = m
    }
  }
  return mood
}

export function FluidBackground() {
  const groupRefs = useRef<(SVGGElement | null)[]>([])

  useEffect(() => {
    const groups = groupRefs.current
    const state: BlobState[] = MOODS[0].map((s) => [...s] as BlobState)
    let mood = 0
    let px = 0.5
    let raf = 0
    let nodes: Element[] = Array.from(document.querySelectorAll("[data-mood]"))

    const observer = new MutationObserver(() => {
      nodes = Array.from(document.querySelectorAll("[data-mood]"))
    })
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-mood"] })

    const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)")

    const draw = (t: number, instant: boolean) => {
      const vh = window.innerHeight
      const found = findMood(nodes, vh * 0.5)
      if (found !== null) mood = found
      const max = Math.max(1, document.documentElement.scrollHeight - vh)
      const sf = instant ? 0 : window.scrollY / max
      const k = instant ? 1 : EASE_PER_FRAME
      for (let i = 0; i < BLOBS.length; i++) {
        const g = groups[i]
        if (!g) continue
        const s = state[i]
        const target = MOODS[mood][i]
        for (let j = 0; j < 3; j++) s[j] += (target[j] - s[j]) * k
        g.setAttribute("transform", blobTransform(i, s, instant ? 0 : t, sf, instant ? 0.5 : px))
        g.style.opacity = s[0].toFixed(3)
      }
    }

    const loop = (t: number) => {
      draw(t, false)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!raf && !reduceMQ.matches && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const apply = () => {
      stop()
      if (reduceMQ.matches) draw(0, true)
      else start()
    }

    const onPointer = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    window.addEventListener("pointermove", onPointer, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    reduceMQ.addEventListener("change", apply)
    apply()

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener("pointermove", onPointer)
      document.removeEventListener("visibilitychange", onVisibility)
      reduceMQ.removeEventListener("change", apply)
    }
  }, [])

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[2] overflow-hidden">
        <svg
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid slice"
          className="absolute left-0 top-0 h-[25vh] w-[25vw] origin-top-left scale-[4] blur-[15px] will-change-transform"
        >
          <rect width="400" height="250" fill="#0E1116" />
          {BLOBS.map((b, i) => (
            <g
              key={b.seed}
              ref={(el) => {
                groupRefs.current[i] = el
              }}
              transform={blobTransform(i, MOODS[0][i], 0, 0, 0.5)}
              style={{ opacity: MOODS[0][i][0] }}
            >
              <path d={PATHS[i]} fill={b.fill} />
            </g>
          ))}
        </svg>
      </div>
      {/* Scrim: keeps the left reading column calm; flat on narrow screens. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-[1] bg-[linear-gradient(90deg,rgb(var(--c-base)/0.80)_0%,rgb(var(--c-base)/0.70)_38%,rgb(var(--c-base)/0.38)_62%,rgb(var(--c-base)/0.30)_100%)] max-[900px]:bg-base/[0.74] max-[900px]:bg-none"
      />
    </>
  )
}
