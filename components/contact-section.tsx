"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarme. Te responderé lo antes posible.",
    })

    setIsSubmitting(false)
    e.target.reset()
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Contacto</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Contáctame y hablemos sobre cómo puedo ayudarte.
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardContent className="p-6 space-y-8">

                <div className="grid gap-y-4">
                  <ContactInfo
                    icon={<Mail className="h-5 w-5" />}
                    title="Email"
                    content="ronaldlondono20@gmail.com"
                    href="mailto:ronaldlondono20@gmail.com"
                  />

                  <ContactInfo
                    icon={<Phone className="h-5 w-5" />}
                    title="Teléfono"
                    content="+57 300 480 7418"
                    href="tel:3004807418"
                  />

                  <ContactInfo
                    icon={<MapPin className="h-5 w-5" />}
                    title="Ubicación"
                    content="Colombia, Barranquilla"
                  />
                </div>

                <div className="pt-4 text-center space-y-3">
                  <h4 className="text-sm font-medium">Sígueme en</h4>
                  <div className="flex justify-center space-x-4">
                    <SocialButton href="https://github.com/ronaldlondono" label="GitHub" />
                    <SocialButton href="https://www.linkedin.com/in/luis-ronaldo-londo%C3%B1o-g%C3%B3mez-53561a272/" label="LinkedIn" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactInfo({ icon, title, content, href }) {
  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-4 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium">{title}</h4>
        {href ? (
          <a href={href} className="text-muted-foreground hover:text-primary transition-colors">
            {content}
          </a>
        ) : (
          <p className="text-muted-foreground">{content}</p>
        )}
      </div>
    </div>
  )
}

function SocialButton({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-muted hover:bg-primary/10 text-foreground hover:text-primary px-3 py-1 rounded-md text-sm transition-colors"
    >
      {label}
    </a>
  )
}
