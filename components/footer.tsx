"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="font-bold text-xl">
              <span className="text-primary">Dev</span>Portfolio
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Luis Ronaldo Londoño Gomez. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
            <p className="text-xs text-muted-foreground">Diseñado y desarrollado con ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
