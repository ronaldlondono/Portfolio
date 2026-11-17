"use client"

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
import { cn } from "@/lib/utils"
import { navCv, navItems, profile } from "@/lib/portfolio-content"

const NARROW = "(max-width: 900px)"

/**
 * Glass header. Wide screens: inline nav. ≤900px (with JS): a "Menú" button
 * toggles a stacked panel; Escape closes it and returns focus to the button.
 * aria-current="true" marks the nav link whose section contains the viewport middle.
 * The `.js` class is set on <html> by app/layout.tsx; without it the nav simply wraps.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }, [])

  // Focus the first link when the panel opens.
  useEffect(() => {
    if (open) navRef.current?.querySelector("a")?.focus()
  }, [open])

  // Escape closes; widening past 900px closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) close(true)
    }
    const mq = window.matchMedia(NARROW)
    const onChange = () => {
      if (!mq.matches) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    mq.addEventListener("change", onChange)
    return () => {
      document.removeEventListener("keydown", onKey)
      mq.removeEventListener("change", onChange)
    }
  }, [open, close])

  // Section in view -> aria-current, written straight to the DOM (no state per scroll).
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight * 0.5
      let current = ""
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) current = item.id
      }
      navItems.forEach((item, i) => {
        const a = linkRefs.current[i]
        if (!a) return
        if (item.id === current) a.setAttribute("aria-current", "true")
        else a.removeAttribute("aria-current")
      })
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  const onNavClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a") && window.matchMedia(NARROW).matches) close(false)
  }

  const linkBase =
    "inline-flex min-h-[44px] items-center px-3 text-[15px] text-ink-muted no-underline transition-colors hover:text-ink max-[900px]:[.js_&]:min-h-[48px] max-[900px]:[.js_&]:text-[17px]"

  return (
    <header
      className={cn(
        "glass-bar fixed inset-x-0 top-0 z-50 flex h-hh items-center gap-6 px-pad",
        "[html:not(.js)_&]:max-[900px]:static [html:not(.js)_&]:max-[900px]:h-auto [html:not(.js)_&]:max-[900px]:flex-wrap [html:not(.js)_&]:max-[900px]:py-2",
      )}
    >
      <a
        href="#inicio"
        aria-label={`${profile.fullName}, inicio`}
        className="inline-flex min-h-[44px] items-center gap-3 no-underline"
      >
        <strong className="font-display text-[17px] font-[650] leading-none tracking-[-0.01em]">
          {profile.shortName}
        </strong>
        <span className="font-mono text-[13px] leading-none text-ink-faint max-[900px]:hidden">{profile.brandTag}</span>
      </a>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="nav-principal"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto hidden min-h-[44px] min-w-[44px] cursor-pointer items-center rounded-lg border border-line-strong bg-transparent px-3.5 font-sans text-[15px] font-semibold text-ink max-[900px]:[.js_&]:inline-flex"
      >
        {open ? "Cerrar" : "Menú"}
      </button>

      <nav
        ref={navRef}
        id="nav-principal"
        aria-label="Principal"
        onClick={onNavClick}
        className={cn(
          "ml-auto flex items-center gap-0.5",
          "[html:not(.js)_&]:max-[900px]:ml-0 [html:not(.js)_&]:max-[900px]:flex-wrap",
          "max-[900px]:[.js_&]:absolute max-[900px]:[.js_&]:inset-x-0 max-[900px]:[.js_&]:top-hh max-[900px]:[.js_&]:flex-col max-[900px]:[.js_&]:items-stretch max-[900px]:[.js_&]:gap-0 max-[900px]:[.js_&]:border-b max-[900px]:[.js_&]:border-line max-[900px]:[.js_&]:bg-base/[0.97] max-[900px]:[.js_&]:px-pad max-[900px]:[.js_&]:pb-4 max-[900px]:[.js_&]:pt-2",
          !open && "max-[900px]:[.js_&]:hidden",
        )}
      >
        {navItems.map((item, i) => (
          <a
            key={item.id}
            href={item.href}
            ref={(el) => {
              linkRefs.current[i] = el
            }}
            className={cn(linkBase, "border-b-2 border-transparent aria-[current=true]:border-teal aria-[current=true]:text-ink")}
          >
            {item.label}
          </a>
        ))}
        <a
          href={navCv.href}
          download
          className={cn(
            linkBase,
            "ml-2.5 rounded-lg border border-line-strong px-3.5 text-ink hover:border-sun max-[900px]:[.js_&]:mx-0 max-[900px]:[.js_&]:mt-2 max-[900px]:[.js_&]:justify-center",
          )}
        >
          {navCv.label}
          <small className="ml-1.5 font-mono text-xs font-medium text-ink-muted">{navCv.suffix}</small>
        </a>
      </nav>
    </header>
  )
}
