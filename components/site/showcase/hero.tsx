import { memo } from "react"
import { MetaList, Ident } from "@/components/site/code"
import { cn } from "@/lib/utils"
import { hero, profile, sectionMood } from "@/lib/portfolio-content"
import styles from "./showcase.module.css"

/** Left column of the stage: identity, pitch, actions, portrait and the layer hint. */
export const Hero = memo(function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      data-mood={sectionMood.inicio}
      data-stack-hero=""
      className={cn(
        styles.hero,
        "flex min-h-screen min-h-svh flex-col justify-center pb-14 pt-[calc(var(--hh)+40px)]",
        "max-[900px]:min-h-0 max-[900px]:pb-2 max-[900px]:pt-[calc(var(--hh)+36px)]",
      )}
    >
      <Ident ident={hero.ident} />
      <h1
        id="hero-title"
        className="mt-[22px] font-display text-[clamp(44px,4.6vw,72px)] font-bold leading-none tracking-[-0.035em] max-[480px]:text-[40px]"
      >
        {profile.nameLines[0]} <span className="block font-medium text-ink-muted">{profile.nameLines[1]}</span>
      </h1>
      <p className="mt-[22px] text-[19px] font-semibold">
        {profile.role} <span className="font-normal text-ink-muted">— {profile.roleStack}</span>
      </p>
      <p className="mt-3.5 max-w-[33em] text-lg leading-[1.6] max-[480px]:text-[17px]">{hero.pitch}</p>
      <MetaList rows={hero.meta} className="mt-[22px]" />

      <div className="mt-[30px] flex flex-wrap gap-3">
        {hero.actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            download={a.download || undefined}
            className={cn("action-btn max-[480px]:flex-[1_1_100%]", a.primary && "action-btn-primary")}
          >
            {a.label}
            {a.suffix && <small>{a.suffix}</small>}
          </a>
        ))}
      </div>

      <div className="mt-[34px] grid max-w-[520px] grid-cols-[84px_minmax(0,1fr)] items-end gap-[18px]">
        <figure className="m-0 aspect-[4/5] overflow-hidden rounded-[10px] border border-line-strong bg-pane">
          <img
            src={hero.portrait.asset}
            alt={hero.portrait.alt}
            width={585}
            height={585}
            decoding="async"
            className="block h-full w-full object-cover"
          />
        </figure>
        <p className="m-0 text-sm leading-normal text-ink-muted">
          <span className="code-ident mb-1 block text-[12.5px]">{hero.hint.ident}</span>
          {hero.hint.text}
          <span className={styles.liveOnly}> {hero.hint.liveText}</span>
        </p>
      </div>
    </section>
  )
})
