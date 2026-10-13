"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Datos de habilidades basados en la hoja de vida
const skills = {
  frontend: [
    { name: "React", experience: "2 años" },
    { name: "Next.js", experience: "2 años" },
    { name: "TypeScript", experience: "2 años" },
    { name: "Tailwind CSS", experience: "2 años" },
    { name: "Bootstrap", experience: "1 año" },
    { name: "HTML5 / CSS3", experience: "3 años" },
    { name: "Diseño Responsivo", experience: "2 años" },
  ],
  backend: [
    { name: "Laravel", experience: "1 año" },
    { name: ".NET (C#)", experience: "1 año" },
    { name: "Node.js", experience: "1 año" },
    { name: "APIs REST", experience: "2 años" },
    { name: "Supabase", experience: "1 año" },
    { name: "MySQL", experience: "2 años" },
    { name: "SQL Server", experience: "1 año" },
    { name: "PostgreSQL", experience: "1 año" },
  ],
  languages: [
    { name: "TypeScript", experience: "2 años" },
    { name: "JavaScript (ES6+)", experience: "3 años" },
    { name: "PHP", experience: "1 año" },
    { name: "Python", experience: "1 año" },
    { name: "C#", experience: "1 año" },
    { name: "SQL", experience: "2 años" },
  ],
  tools: [
    { name: "Docker", experience: "1 año" },
    { name: "Git / GitHub", experience: "3 años" },
    { name: "GitHub Actions", experience: "1 año" },
    { name: "Vercel", experience: "2 años" },
    { name: "Railway", experience: "1 año" },
    { name: "Microsoft Azure", experience: "1 año" },
    { name: "Vite", experience: "2 años" },
    { name: "VS Code", experience: "4 años" },
  ],
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Mis Habilidades</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tecnologías y herramientas con las que trabajo, junto con mi experiencia en cada una de ellas.
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-2xl h-auto p-1 gap-1">
              <TabsTrigger value="frontend">Front-End</TabsTrigger>
              <TabsTrigger value="backend">Back-End & BD</TabsTrigger>
              <TabsTrigger value="languages">Lenguajes</TabsTrigger>
              <TabsTrigger value="tools">Herramientas & Nube</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frontend">
            <SkillsGrid skills={skills.frontend} />
          </TabsContent>

          <TabsContent value="backend">
            <SkillsGrid skills={skills.backend} />
          </TabsContent>

          <TabsContent value="languages">
            <SkillsGrid skills={skills.languages} />
          </TabsContent>

          <TabsContent value="tools">
            <SkillsGrid skills={skills.tools} />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <ServiceCard
            title="Desarrollo Web & SPA"
            description="Creación de interfaces modernas, reactivas y accesibles con React, Next.js y TypeScript."
            icon="⚛️"
          />
          <ServiceCard
            title="Back-End & APIs REST"
            description="Construcción de servicios robustos, arquitecturas limpias y bases de datos con Laravel, .NET y Node.js."
            icon="🖥️"
          />
          <ServiceCard
            title="Testing & DevOps"
            description="Desarrollo guiado por pruebas (TDD), integración continua (CI/CD) y contenedores con Docker en la nube."
            icon="🚀"
          />
        </div>
      </div>
    </section>
  )
}

interface Skill {
  name: string
  experience: string
}

function SkillsGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-foreground">{skill.name}</h3>
              <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {skill.experience}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="text-4xl mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
