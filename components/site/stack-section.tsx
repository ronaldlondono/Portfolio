// TODO(T3): replace this stub with the full section from the artboard.
import { Ident } from "@/components/site/code"
import { stackSection, sectionMood } from "@/lib/portfolio-content"

export function StackSection() {
  return (
    <section id="stack" aria-labelledby="stack-title" data-mood={sectionMood.stack} className="px-pad py-[104px] max-[900px]:py-[72px]">
      <div className="mx-auto max-w-[1340px]">
        <Ident ident={stackSection.ident} />
        <h2 id="stack-title" className="mt-2.5 font-display text-[clamp(30px,2.6vw,40px)] font-bold leading-tight tracking-[-0.025em]">
          {stackSection.title}
        </h2>
      </div>
    </section>
  )
}
