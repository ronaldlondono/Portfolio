import { useRef, type CSSProperties } from "react"
import { EMPTY, LAYER_META, LAYER_ORDER, generalStack, projects, projectsSection } from "@/lib/portfolio-content"
import styles from "./showcase.module.css"

/** Light-line segment k joins plane k to plane k + 1 (720×760 design space). */
const SEGMENTS = [
  { d: "M250 150 C 266 192, 234 254, 250 300", cy: 300 },
  { d: "M250 300 C 236 342, 266 404, 250 450", cy: 450 },
  { d: "M250 450 C 264 492, 236 556, 250 600", cy: 600 },
] as const

const rgbVar = (rgb: string) => ({ "--rgb": rgb }) as CSSProperties

function Plane({ index, value, swap }: { index: number; value: string; swap: boolean }) {
  const meta = LAYER_META[LAYER_ORDER[index]]
  const empty = value === EMPTY
  return (
    <div className={styles.layer} data-stack-layer={index} style={rgbVar(meta.rgb)}>
      <div className={styles.plane}>
        <span className={styles.engr} data-stack-engr="">
          {meta.folder}
        </span>
      </div>
      <div className={styles.tag} data-stack-tag="">
        <span className={styles.tk}>{meta.label}</span>
        <span key={value} className={styles.tv} data-empty={empty || undefined} data-swap={swap || undefined}>
          {value}
        </span>
      </div>
    </div>
  )
}

function Segment({ k }: { k: number }) {
  const s = SEGMENTS[k]
  return (
    <svg className={styles.seg} data-stack-seg={k} viewBox="0 0 720 760" focusable="false">
      <path className={styles.wire} data-stack-wire="" pathLength={100} d={s.d} />
      <path className={styles.pulse} data-stack-pulse="" pathLength={100} d={s.d} />
      <ellipse className={styles.port} data-stack-port="" cx={250} cy={s.cy} rx={10} ry={5} />
    </svg>
  )
}

/**
 * Right column: four glass planes in 3D, relabelled with the active project's
 * layers. Decorative (aria-hidden); every value is also in the text column.
 * Per-frame motion is written by useLayerStack.
 */
export function LayerRig({ active }: { active: number }) {
  // Relabel fade only after the first change, never on first paint.
  const changed = useRef(false)
  const first = useRef(active)
  if (active !== first.current) changed.current = true

  const project = active >= 0 ? projects[active] : null
  const values = LAYER_ORDER.map((key) => (project ? project.layers[key].value : generalStack.layers[key]))
  const ident = project ? { scope: "proyecto", key: project.id } : generalStack.ident
  const count = `${project ? project.number : "—"} / ${projectsSection.total}`
  const swap = changed.current

  return (
    <aside className={styles.rig} aria-hidden="true">
      <div className={styles.rigIn}>
        <div className="flex items-baseline justify-between gap-4 px-1 pt-1.5 font-mono text-[13.5px] font-medium leading-[1.4] text-ink-faint">
          <span>
            {ident.scope}.<span className="text-teal-text">{ident.key}</span>
          </span>
          <span className="tabular-nums text-ink-muted max-[900px]:hidden">{count}</span>
        </div>

        <div className={styles.v3d} data-stack-v3d="">
          <div className={styles.scene} data-stack-scene="">
            <Plane index={3} value={values[3]} swap={swap} />
            <Segment k={2} />
            <Plane index={2} value={values[2]} swap={swap} />
            <Segment k={1} />
            <Plane index={1} value={values[1]} swap={swap} />
            <Segment k={0} />
            <Plane index={0} value={values[0]} swap={swap} />
            <div className={styles.shots}>
              {projects.map((p, q) => (
                <div key={p.id} className={styles.shot3d} data-stack-shot={q}>
                  <img src={p.asset} alt="" width={210} height={132} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="m-0 px-1 pb-1.5 font-mono text-[13px] leading-[1.4] text-ink-faint">
          {generalStack.footLead} <b className="font-medium text-ink-muted">{generalStack.footPath}</b>
        </p>
      </div>
    </aside>
  )
}
