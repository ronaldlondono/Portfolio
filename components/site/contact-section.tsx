// TODO(T3): replace this stub with the full section from the artboard.
import { Ident } from "@/components/site/code"
import { contactSection, sectionMood } from "@/lib/portfolio-content"

export function ContactSection() {
  return (
    <section id="contacto" aria-labelledby="contact-title" data-mood={sectionMood.contacto} className="px-pad py-[104px] max-[900px]:py-[72px]">
      <div className="mx-auto max-w-[1340px]">
        <Ident ident={contactSection.ident} />
        <h2 id="contact-title" className="mt-2.5 font-display text-[clamp(30px,2.6vw,40px)] font-bold leading-tight tracking-[-0.025em]">
          {contactSection.title}
        </h2>
      </div>
    </section>
  )
}
