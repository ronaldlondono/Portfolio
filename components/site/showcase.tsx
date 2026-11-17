// TODO(T2): replace this stub with the hero, the six projects and the pinned glass layer stack.
import { Ident } from "@/components/site/code"
import { hero, profile, projects, projectsSection, sectionMood } from "@/lib/portfolio-content"

export function Showcase() {
  return (
    <div className="px-pad">
      <section
        id="inicio"
        aria-labelledby="hero-title"
        data-mood={sectionMood.inicio}
        className="flex min-h-svh flex-col justify-center pb-14 pt-[calc(var(--hh)+40px)]"
      >
        <Ident ident={hero.ident} />
        <h1 id="hero-title" className="mt-5 font-display text-[clamp(40px,4.6vw,72px)] font-bold leading-none tracking-[-0.035em]">
          {profile.nameLines[0]} <span className="block font-medium text-ink-muted">{profile.nameLines[1]}</span>
        </h1>
      </section>

      <section id="proyectos" aria-labelledby="proj-title" data-mood={sectionMood.proyectos} className="pb-[10vh]">
        <header className="max-w-[40em] pb-2 pt-[72px]">
          <Ident ident={projectsSection.ident} />
          <h2 id="proj-title" className="mt-2.5 font-display text-[clamp(30px,2.6vw,40px)] font-bold leading-tight tracking-[-0.025em]">
            {projectsSection.title}
          </h2>
        </header>
        {projects.map((p) => (
          <article key={p.id} data-mood={p.mood} aria-labelledby={`p-${p.id}`} className="min-h-[60vh] border-t border-line py-14">
            <h3 id={`p-${p.id}`} className="font-display text-3xl font-bold tracking-[-0.025em]">
              {p.title}
            </h3>
          </article>
        ))}
      </section>
    </div>
  )
}
