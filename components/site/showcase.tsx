"use client"

/**
 * Stage of the page: hero and the six projects in the left column, the glass
 * layer stack in the right one (pinned across both on wide screens with motion
 * allowed). The server render is the readable static layout; see
 * components/site/showcase/showcase.module.css for the modes and
 * hooks/use-layer-stack.ts for the scroll motion.
 */

import { useRef } from "react"
import { Ident } from "@/components/site/code"
import { Hero } from "@/components/site/showcase/hero"
import { LayerRig } from "@/components/site/showcase/layer-rig"
import { ProjectArticle } from "@/components/site/showcase/project-article"
import styles from "@/components/site/showcase/showcase.module.css"
import { useLayerStack } from "@/hooks/use-layer-stack"
import { cn } from "@/lib/utils"
import { projects, projectsSection, sectionMood } from "@/lib/portfolio-content"

export function Showcase() {
  const stageRef = useRef<HTMLDivElement>(null)
  const { active } = useLayerStack(stageRef)

  return (
    <div ref={stageRef} className={styles.stage}>
      <Hero />
      <LayerRig active={active} />

      <section
        id="proyectos"
        aria-labelledby="proj-title"
        data-mood={sectionMood.proyectos}
        className={cn(styles.projects, "pb-[10vh]")}
      >
        <header className="max-w-[40em] pb-2 pt-[72px]">
          <Ident ident={projectsSection.ident} className="mt-3" />
          <h2
            id="proj-title"
            className="mt-2.5 font-display text-[clamp(30px,2.6vw,40px)] font-bold leading-[1.12] tracking-[-0.025em]"
          >
            {projectsSection.title}
          </h2>
          <p className="mt-3 max-w-[34em] text-ink-muted">{projectsSection.lead}</p>
        </header>
        {projects.map((p) => (
          <ProjectArticle key={p.id} project={p} />
        ))}
      </section>
    </div>
  )
}
