"use client"

/**
 * Drives the pinned glass layer stack of the showcase (port of the artboard's
 * liveUpdate()). Everything per frame is written straight to the DOM through the
 * elements found under `rootRef` (transform, opacity, stroke-dashoffset only); the
 * only React state is the active project index, set when it changes.
 *
 * Markup contract (all inside rootRef):
 *   [data-stack-hero]                  hero section (drives the separation)
 *   [data-stack-v3d] > [data-stack-scene]  720×760 design space, fitted on resize
 *   [data-stack-layer="0..3"]          plane wrappers, with [data-stack-tag] and [data-stack-engr]
 *   [data-stack-seg="0..2"]            light-line segments, with [data-stack-wire|pulse|port]
 *   [data-stack-shot="0..5"]           screenshot that drops onto the Interfaz plane
 *   [data-stack-project]               project articles, with [data-layer-row="0..3"] rows
 * Lit plane / lit row are flagged with a `data-lit` attribute.
 *
 * Modes: live only when LIVE_QUERY matches (same query as showcase.module.css).
 * Otherwise every inline style is cleared and the CSS static state shows.
 */

import { useEffect, useState, type RefObject } from "react"

export const LIVE_QUERY = "(min-width: 901px) and (prefers-reduced-motion: no-preference)"
const NARROW_QUERY = "(max-width: 900px)"
const SCENE_W = 720
const SCENE_W_NARROW = 500
const SCENE_H = 760
const SHOT_TILT = "perspective(1800px) rotateX(60deg) rotateZ(-45deg)"
const PULSE_MS = 3000

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

type Els = {
  hero: HTMLElement
  v3d: HTMLElement
  scene: HTMLElement
  layers: HTMLElement[]
  tags: (HTMLElement | null)[]
  engrs: (HTMLElement | null)[]
  wires: (SVGElement | null)[]
  pulses: (SVGElement | null)[]
  ports: (SVGElement | null)[]
  shots: HTMLElement[]
  projects: HTMLElement[]
  rows: HTMLElement[][]
}

function byIndex<T extends Element>(root: Element, attr: string): T[] {
  return Array.from(root.querySelectorAll<T & HTMLElement>(`[${attr}]`)).sort(
    (a, b) => Number(a.getAttribute(attr)) - Number(b.getAttribute(attr)),
  )
}

function collect(root: HTMLElement): Els | null {
  const hero = root.querySelector<HTMLElement>("[data-stack-hero]")
  const v3d = root.querySelector<HTMLElement>("[data-stack-v3d]")
  const scene = root.querySelector<HTMLElement>("[data-stack-scene]")
  if (!hero || !v3d || !scene) return null
  const layers = byIndex<HTMLElement>(root, "data-stack-layer")
  const segs = byIndex<SVGElement>(root, "data-stack-seg")
  const projects = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-project]"))
  return {
    hero,
    v3d,
    scene,
    layers,
    tags: layers.map((l) => l.querySelector<HTMLElement>("[data-stack-tag]")),
    engrs: layers.map((l) => l.querySelector<HTMLElement>("[data-stack-engr]")),
    wires: segs.map((s) => s.querySelector<SVGElement>("[data-stack-wire]")),
    pulses: segs.map((s) => s.querySelector<SVGElement>("[data-stack-pulse]")),
    ports: segs.map((s) => s.querySelector<SVGElement>("[data-stack-port]")),
    shots: byIndex<HTMLElement>(root, "data-stack-shot"),
    projects,
    rows: projects.map((p) => Array.from(p.querySelectorAll<HTMLElement>("[data-layer-row]"))),
  }
}

type Prop = "transform" | "opacity" | "strokeDashoffset"
const written = new WeakMap<Element, Partial<Record<Prop, string>>>()

/** Sets an inline style only when the value changed since the last write. */
function put(el: HTMLElement | SVGElement | null, prop: Prop, v: string) {
  if (!el) return
  let cache = written.get(el)
  if (!cache) written.set(el, (cache = {}))
  if (cache[prop] === v) return
  cache[prop] = v
  el.style[prop] = v
}

export function useLayerStack(rootRef: RefObject<HTMLElement>): { active: number } {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = collect(root)
    if (!els) return
    const liveMQ = window.matchMedia(LIVE_QUERY)
    const narrowMQ = window.matchMedia(NARROW_QUERY)

    let live = false
    let raf = 0
    let y = window.scrollY
    let vh = window.innerHeight
    let current = -1
    let litLayer = -1
    let litRow: HTMLElement | null = null

    const setProject = (k: number) => {
      if (k === current) return
      current = k
      setActive(k)
    }

    const setLit = (i: number, row: HTMLElement | null) => {
      if (row !== litRow) {
        litRow?.removeAttribute("data-lit")
        litRow = row
        row?.setAttribute("data-lit", "")
      }
      if (i === litLayer) return
      litLayer = i
      els.layers.forEach((l, j) => l.toggleAttribute("data-lit", j === i))
    }

    const fitScene = () => {
      const w = els.v3d.clientWidth
      const h = els.v3d.clientHeight
      if (!w || !h) return
      const sw = narrowMQ.matches ? SCENE_W_NARROW : SCENE_W
      const s = Math.min(w / sw, h / SCENE_H)
      const ox = (w - sw * s) / 2
      const oy = (h - SCENE_H * s) / 2
      els.scene.style.transform = `translate(${ox.toFixed(1)}px, ${oy.toFixed(1)}px) scale(${s.toFixed(4)})`
    }

    const clearInline = () => {
      const all: (HTMLElement | SVGElement | null)[] = [
        ...els.layers,
        ...els.tags,
        ...els.engrs,
        ...els.wires,
        ...els.pulses,
        ...els.ports,
        ...els.shots,
      ]
      all.forEach((el) => {
        if (!el) return
        el.style.transform = ""
        el.style.opacity = ""
        el.style.strokeDashoffset = ""
        written.delete(el)
      })
      setLit(-1, null)
      setProject(-1)
    }

    const update = (t: number) => {
      const mid = vh * 0.5
      // Separation: each plane leaves the rested stack at its own pace and drift.
      const e = clamp(y / (els.hero.offsetHeight * 0.72))
      const ee = easeOut(e)
      for (let i = 0; i < els.layers.length; i++) {
        const c = i - 1.5
        const off = c * (16 + 134 * ee) - c * 150
        const dx = (1 - e) * e * 4 * c * -14
        put(els.layers[i], "transform", `translate3d(${dx.toFixed(1)}px, ${off.toFixed(1)}px, 0)`)
        put(els.tags[i], "opacity", clamp((e - 0.45) * 4 - i * 0.3).toFixed(3))
        if (i) put(els.engrs[i], "opacity", clamp(e * 3 - 0.4).toFixed(3))
      }

      // Light line: drawn segment by segment at the end of the separation; then a pulse travels it.
      const draw = clamp((e - 0.8) / 0.2) * 3
      const cyc = ((t % PULSE_MS) / PULSE_MS) * 4
      for (let k = 0; k < els.wires.length; k++) {
        const dk = clamp(draw - k)
        put(els.wires[k], "strokeDashoffset", (100 * (1 - dk)).toFixed(2))
        put(els.ports[k], "opacity", dk.toFixed(3))
        const loc = cyc - k
        if (e > 0.98 && loc >= 0 && loc <= 1) {
          put(els.pulses[k], "opacity", "1")
          put(els.pulses[k], "strokeDashoffset", (8 - loc * 108).toFixed(2))
        } else put(els.pulses[k], "opacity", "0")
      }

      // Active project, screenshot drop and lit layer.
      let act = -1
      let local = 0
      for (let a = 0; a < els.projects.length; a++) {
        const r = els.projects[a].getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) {
          act = a
          local = (mid - r.top) / r.height
        }
      }
      setProject(act)
      for (let q = 0; q < els.shots.length; q++) {
        if (q !== act) {
          put(els.shots[q], "opacity", "0")
          continue
        }
        const land = easeOut(clamp(local / 0.22))
        put(els.shots[q], "opacity", clamp(land * 1.6).toFixed(3))
        put(els.shots[q], "transform", `translateY(${(-(1 - land) * 190).toFixed(1)}px) ${SHOT_TILT}`)
      }

      let li = -1
      let row: HTMLElement | null = null
      if (act >= 0) {
        let best = vh * 0.28
        for (const r of els.rows[act]) {
          const b = r.getBoundingClientRect()
          const dist = Math.abs(b.top + b.height / 2 - mid)
          if (dist < best) {
            best = dist
            li = Number(r.getAttribute("data-layer-row"))
            row = r
          }
        }
      }
      setLit(li, row)
    }

    const loop = (t: number) => {
      update(t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!raf && live && !document.hidden) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const applyMode = () => {
      const wasLive = live
      live = liveMQ.matches
      stop()
      if (wasLive && !live) clearInline()
      fitScene()
      if (live) {
        y = window.scrollY
        update(performance.now())
        start()
      }
    }

    const onScroll = () => {
      y = window.scrollY
    }
    const onResize = () => {
      vh = window.innerHeight
      fitScene()
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    liveMQ.addEventListener("change", applyMode)
    narrowMQ.addEventListener("change", applyMode)
    applyMode()

    return () => {
      stop()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
      liveMQ.removeEventListener("change", applyMode)
      narrowMQ.removeEventListener("change", applyMode)
    }
  }, [rootRef])

  return { active }
}
