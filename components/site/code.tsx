import { Fragment } from "react"
import { cn } from "@/lib/utils"
import { NEW_TAB_SR, type CodeIdent, type MetaRow, type MetaValue } from "@/lib/portfolio-content"

/** `scope.<key>` identifier line, e.g. luis.perfil, proyecto.vipePos. */
export function Ident({ ident, className, as: Tag = "p" }: { ident: CodeIdent; className?: string; as?: "p" | "span" }) {
  return (
    <Tag className={cn("code-ident", className)}>
      {ident.scope}.<span className="code-key">{ident.key}</span>
    </Tag>
  )
}

function MetaValueView({ value }: { value: MetaValue }) {
  switch (value.kind) {
    case "str":
      return (
        <>
          {value.values.map((v, i) => (
            <Fragment key={v}>
              {i > 0 && <span className="code-punct">, </span>}
              <q className="code-str">{v}</q>
            </Fragment>
          ))}
        </>
      )
    case "num":
      return (
        <>
          <span className="code-num">{value.value}</span> {value.rest}
        </>
      )
    case "link":
      return value.external ? (
        <a href={value.href} target="_blank" rel="noopener noreferrer">
          {value.label}
          <span className="sr-only">{NEW_TAB_SR}</span>
        </a>
      ) : (
        <a href={value.href}>{value.label}</a>
      )
    case "null":
      return (
        <>
          null <span className="code-punct">{`// ${value.comment}`}</span>
        </>
      )
  }
}

/** key: value metadata list in the "código limpio" tint (.code-meta). */
export function MetaList({ rows, className }: { rows: MetaRow[]; className?: string }) {
  return (
    <dl className={cn("code-meta", className)}>
      {rows.map((row) => (
        <Fragment key={row.key}>
          <dt>{row.key}</dt>
          <dd>
            <MetaValueView value={row.value} />
          </dd>
        </Fragment>
      ))}
    </dl>
  )
}
