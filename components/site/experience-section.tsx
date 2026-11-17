"use client"

import { useEffect, useRef } from "react"
import { Ident, MetaList } from "@/components/site/code"
import { experience, experienceSection, sectionMood } from "@/lib/portfolio-content"
import styles from "./sections.module.css"

/**
 * Experiencia: one glass pane per role, org/role/meta on the left, summary,
 * highlights and tech on the right.
 *
 * Entries reveal as they scroll into view. The hidden state only exists once
 * this effect sets data-reveal on the list (so it is absent without JS) and is
 * scoped to prefers-reduced-motion: no-preference in CSS (and skipped here).
 * Observer callbacks write data-in directly on the element: no React state.
 */
function useReveal() {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list || typeof IntersectionObserver === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const items = Array.from(list.children) as HTMLElement[]
    const pending = items.filter((item) => {
      // Entries already on screen at hydration stay visible: no flash.
      if (item.getBoundingClientRect().top < window.innerHeight) {
        item.dataset.in = ""
        return false
      }
      return true
    })
    list.dataset.reveal = ""
    if (pending.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.in = ""
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    )
    pending.forEach((item) => io.observe(item))
    return () => io.disconnect()
  }, [])

  return listRef
}

export function ExperienceSection() {
  const listRef = useReveal()

  return (
    <section
      id="experiencia"
      aria-labelledby="exp-title"
      data-mood={sectionMood.experiencia}
      className="px-pad py-[104px] max-[900px]:py-[72px]"
    >
      <div className="mx-auto grid max-w-[1340px] grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-[clamp(28px,4vw,64px)] max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:gap-6">
        <header>
          <Ident ident={experienceSection.ident} className="mt-3" />
          <h2
            id="exp-title"
            className="mt-2.5 font-display text-[clamp(30px,2.6vw,40px)] font-bold leading-[1.12] tracking-[-0.025em]"
          >
            {experienceSection.title}
          </h2>
          <p className="mt-3 max-w-[34em] text-ink-muted">{experienceSection.lead}</p>
        </header>

        <ol ref={listRef} className={`${styles.revealList} m-0 grid list-none gap-5 p-0`}>
          {experience.map((job) => (
            <li
              key={job.org}
              className="glass grid grid-cols-[minmax(0,17.5em)_minmax(0,1fr)] gap-x-8 gap-y-3 px-[30px] py-7 max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:px-5 max-[900px]:py-[22px]"
            >
              <div>
                <h3 className="m-0 font-display text-[21px] font-[650] leading-[1.3] tracking-[-0.01em]">{job.org}</h3>
                <p className="mt-1.5 text-[15.5px] text-ink-muted">{job.role}</p>
                <MetaList rows={job.meta} className="mt-3.5 text-[13px]" />
              </div>
              <div>
                <p className="m-0">{job.summary}</p>
                <ul className={styles.highlights}>
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="mt-3.5 font-mono text-[13.5px] leading-[1.6] text-teal-text">{job.tech.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
