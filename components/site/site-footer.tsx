import { footer } from "@/lib/portfolio-content"

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line px-pad pb-10 pt-7 font-mono text-[13px] leading-normal text-ink-faint">
      <span>{footer.copyright}</span>
      <a href={footer.backToTop.href} className="inline-flex min-h-[44px] items-center text-ink-muted">
        {footer.backToTop.label}
      </a>
    </footer>
  )
}
