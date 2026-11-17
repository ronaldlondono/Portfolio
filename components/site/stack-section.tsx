import { Fragment } from "react"
import { Ident } from "@/components/site/code"
import { education, languages, sectionMood, stackGroups, stackSection } from "@/lib/portfolio-content"
import styles from "./sections.module.css"

/** Stack: groups as `stack.<key>  item, item, …` rows in a glass pane, then education and languages. */
export function StackSection() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      data-mood={sectionMood.stack}
      className="px-pad py-[104px] max-[900px]:py-[72px]"
    >
      <div className="mx-auto grid max-w-[1340px] grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-[clamp(28px,4vw,64px)] max-[900px]:grid-cols-[minmax(0,1fr)] max-[900px]:gap-6">
        <header>
          <Ident ident={stackSection.ident} className="mt-3" />
          <h2
            id="stack-title"
            className="mt-2.5 font-display text-[clamp(30px,2.6vw,40px)] font-bold leading-[1.12] tracking-[-0.025em]"
          >
            {stackSection.title}
          </h2>
          <p className="mt-3 max-w-[34em] text-ink-muted">{stackSection.lead}</p>
        </header>

        <div>
          <div className="glass px-[30px] py-[26px] max-[900px]:p-5">
            <dl className={styles.stackCode}>
              {stackGroups.map((group) => (
                <div key={group.key}>
                  <dt>
                    {stackSection.groupScope}.<span>{group.key}</span>
                  </dt>
                  <dd>
                    {group.items.map((item, i) => (
                      <Fragment key={item}>
                        {i > 0 && (
                          <>
                            <span className={styles.sep}>,</span>{" "}
                          </>
                        )}
                        {item}
                      </Fragment>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 px-1 max-[480px]:grid-cols-1">
            {[education, languages].map((fact) => (
              <div key={fact.ident.key}>
                <Ident ident={fact.ident} className="text-[13px]" />
                <p className="mt-1">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
