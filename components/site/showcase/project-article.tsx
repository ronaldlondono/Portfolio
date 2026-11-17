import { memo, type CSSProperties } from "react"
import { Ident } from "@/components/site/code"
import { cn } from "@/lib/utils"
import { EMPTY, LAYER_META, LAYER_ORDER, NEW_TAB_SR, projectsSection, type Project } from "@/lib/portfolio-content"
import styles from "./showcase.module.css"

/** Image sizes of the real screenshots in public/ (width/height attributes). */
const SHOT_SIZE: Record<string, [number, number]> = {
  "vipe-pos.png": [1024, 654],
  "presentacion.png": [996, 728],
  "mapanetbpo.jpeg": [1536, 1024],
  "radestudio.png": [1200, 630],
  "vision.jpg": [1200, 705],
  "magicculture.png": [1744, 902],
}

/**
 * estado / pruebas / demo|sitio rows in the .code-meta tint. Rendered here rather
 * than with MetaList so the external link carries rel="noopener noreferrer".
 */
function ProjectMeta({ project }: { project: Project }) {
  const { links, tests } = project
  return (
    <dl className="code-meta mt-[18px]">
      <dt>estado</dt>
      <dd>
        <q className="code-str">{project.status}</q>
      </dd>
      {tests && (
        <>
          <dt>pruebas</dt>
          <dd>
            <span className="code-num">{tests.count}</span> {tests.detail}
          </dd>
        </>
      )}
      <dt>{links.metaKey}</dt>
      <dd>
        {links.kind === "public" ? (
          <a href={links.href} target="_blank" rel="noopener noreferrer" className="underline">
            {links.host}
            <span className="sr-only">{NEW_TAB_SR}</span>
          </a>
        ) : (
          <>
            null <span className="code-punct">{`// ${links.comment}`}</span>
          </>
        )}
      </dd>
    </dl>
  )
}

/** One project: text column, own screenshot (static / narrow modes) and the flat layer list. */
export const ProjectArticle = memo(function ProjectArticle({ project }: { project: Project }) {
  const [w, h] = SHOT_SIZE[project.asset] ?? [1200, 750]
  const titleId = `p-${project.id}`
  const { links } = project
  return (
    <article data-stack-project="" data-mood={project.mood} aria-labelledby={titleId} className={styles.project}>
      <div className="flex items-baseline justify-between gap-4">
        <Ident ident={{ scope: "proyecto", key: project.id }} />
        <span className="font-mono text-[13px] tabular-nums text-ink-faint">
          {project.number} / {projectsSection.total}
        </span>
      </div>
      <h3
        id={titleId}
        className="mt-3 font-display text-[clamp(28px,2.4vw,36px)] font-bold leading-[1.1] tracking-[-0.025em]"
      >
        {project.title}
      </h3>
      <p className="mt-3 max-w-[34em]">{project.description}</p>
      <ProjectMeta project={project} />

      <figure className={cn(styles.shot, "m-0 overflow-hidden rounded-[10px] border border-line-strong bg-[#141920]")}>
        <img
          src={project.asset}
          alt={project.assetAlt}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        <figcaption className="border-t border-line px-3 py-2 font-mono text-[12.5px] text-ink-faint">
          captura · {project.asset}
        </figcaption>
      </figure>

      <ol className={styles.rows}>
        {LAYER_ORDER.map((key) => {
          const meta = LAYER_META[key]
          const layer = project.layers[key]
          const empty = layer.value === EMPTY
          return (
            <li
              key={key}
              data-layer-row={meta.index}
              className={styles.row}
              style={{ "--rgb": meta.rgb } as CSSProperties}
            >
              <span className={styles.rowKey}>{meta.label}</span>
              <span className={cn("block", empty ? "font-normal text-ink-faint" : "font-semibold")}>{layer.value}</span>
              {layer.note && <p className={styles.rowNote}>{layer.note}</p>}
            </li>
          )
        })}
      </ol>

      <div className="mt-[22px] flex flex-wrap items-center gap-3">
        {links.kind === "public" ? (
          <a
            href={links.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-sun underline underline-offset-[5px] hover:text-sun-hover"
          >
            {links.cta} <span aria-hidden="true">↗</span>
            <span className="sr-only">{NEW_TAB_SR}</span>
          </a>
        ) : (
          <span className="inline-flex min-h-[44px] items-center font-mono text-[13.5px] leading-normal text-ink-faint">
            {links.note}
          </span>
        )}
      </div>
    </article>
  )
})
