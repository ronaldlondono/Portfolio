"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ArrowDown, Briefcase, Mail } from "lucide-react"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Desarrollador Front-End"
  const typingSpeed = 150

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* contenedor principal: en móvil es columna; en md fila */}
      <div className="flex-1 container flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-10 md:py-0">

        {/* === FOTO: en móvil va PRIMERO (order-1), en md va SEGUNDO (md:order-2) y se hace grande === */}
        <motion.div
          className="
            order-1 md:order-2
            relative w-full
            max-w-[220px] sm:max-w-xs md:max-w-md
            aspect-square
          "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* halo: más suave en móvil, más grande en md */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-xl md:blur-3xl" />
          <div className="relative h-full w-full rounded-full overflow-hidden border-2 md:border-4 border-primary/20 p-1.5 md:p-2">
            <div className="h-full w-full rounded-full overflow-hidden bg-muted">
              <Image
                src="LuisRonaldoLondonoGomez.png?height=600&width=600"
                alt="Luis Ronaldo Londoño Gomez"
                width={600}
                height={600}
                sizes="(max-width: 768px) 220px, (max-width: 1024px) 320px, 384px"
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* === TEXTO: en móvil va SEGUNDO (order-2), en md va PRIMERO (md:order-1) === */}
        <motion.div
          className="order-2 md:order-1 flex-1 space-y-6 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-medium text-primary">¡Hola! Soy</h2>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              Luis Ronaldo Londoño Gomez
            </h1>
            <div className="h-10 md:h-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
                {typedText}
                <span className="animate-blink">|</span>
              </h2>
            </div>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            Creo experiencias web modernas, atractivas y de alto rendimiento utilizando las últimas tecnologías
            front-end.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 md:pt-4">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => {
                const projectsSection = document.getElementById("projects")
                projectsSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Briefcase className="h-5 w-5" />
              Ver Proyectos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-transparent"
              onClick={() => {
                const contactSection = document.getElementById("contact")
                contactSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Mail className="h-5 w-5" />
              Contactar
            </Button>
          </div>
        </motion.div>
      </div>

      {/* flecha scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Bajar">
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}
