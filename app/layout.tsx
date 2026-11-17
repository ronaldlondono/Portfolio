import type React from "react"
import type { Metadata, Viewport } from "next"
import "@/app/globals.css"
import { profile } from "@/lib/portfolio-content"

export const metadata: Metadata = {
  title: `${profile.fullName} — ${profile.role}`,
  description: profile.metaDescription,
}

export const viewport: Viewport = {
  themeColor: "#0E1116",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script adds `js` before paint so no-JS fallbacks (wrapped nav) only apply without JS.
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  )
}
