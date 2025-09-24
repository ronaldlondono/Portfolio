"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink } from "lucide-react"

// Datos de ejemplo para los proyectos
const projects = [
  {
    id: 1,
    title: "Vipe POS",
    description: "Un sistema completo de punto de venta (POS) para restaurantes, diseñado para optimizar las operaciones diarias desde la toma de órdenes hasta la gestión administrativa. Esta aplicación web proporciona interfaces específicas para meseros, cocina, cajeros y administradores, con funcionalidades adaptadas a cada rol.",
    image: "vipe-pos.png?height=400&width=600",
    tags: ["React", "TypeScript", "SupaBase", "Vercel", "Tailwind CSS", "Python"],
    category: "app",
    demo: "https://vipe-pos.vercel.app",
  },
  {
    id: 2,
    title: "PrintCost Pro",
    description: "Esta plataforma centraliza la gestión de clientes, ventas, impresiones 3D, inventario, finanzas y estadísticas en un solo sistema automatizado y visual",
    image: "presentacion.png",
    tags: ["React", "C#", ".NET", "SQL Server", "Azure", "Tailwind CSS"],
    category: "app",
    demo: "http://printing-cost.vercel.app",
  }
]

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Mis Proyectos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una selección de mis trabajos recientes en desarrollo web, aplicaciones y diseño de interfaces.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="app">Aplicativos Web</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col group">
                    <div className="relative overflow-hidden h-48 md:h-56 lg:h-72">
                      <Image
                        src={project.image || "placeholder.svg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3} // Prioriza las primeras tres imágenes
                        quality={85}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button size="sm" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Ver
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center pt-8">
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/ronaldlondono"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              Ver más en GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
