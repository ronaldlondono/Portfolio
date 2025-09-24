"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, X, Moon, Sun, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: "Inicio" },
    { href: "#projects", label: "Proyectos" },
    { href: "#skills", label: "Habilidades" },
    { href: "#contact", label: "Contacto" },
  ]

  const socialLinks = [
    { href: "https://github.com/ronaldlondono", icon: <Github className="h-5 w-5" /> },
    { href: "https://www.linkedin.com/in/luis-ronaldo-londo%C3%B1o-g%C3%B3mez-53561a272/", icon: <Linkedin className="h-5 w-5" /> },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-primary">Dev</span>Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.icon}
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // Forzar el cambio de tema explícitamente
              const newTheme = theme === "dark" ? "light" : "dark"
              setTheme(newTheme)
              // Opcional: Para debugging
              console.log("Cambiando tema a:", newTheme)
            }}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex justify-end mb-8">
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex items-center gap-4 mt-auto mb-8">
                    {socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
