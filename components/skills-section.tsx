"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Datos de ejemplo para las habilidades
const skills = {
  frontend: [
    { name: "TypeScript", experience: "2 años" },
    { name: "React", experience: "2 años" },
    { name: "Next.js", experience: "1 años" },
    { name: "Tailwind CSS", experience: "2 años" },
    { name: "bootstrap", experience: "1 año" },
  ],
  tools: [
    { name: "Git/GitHub", experience: "3 años" },
    { name: "Webpack", experience: "1 año" },
    { name: "Vite", experience: "2 años" },
    { name: "Figma", experience: "2 años" },
    { name: "VS Code", experience: "4 años" },
    { name: "Chrome DevTools", experience: "3 años" },
  ],
  other: [
    { name: "Node.js", experience: "1 año" },
    { name: "Express", experience: "8 meses" },
    { name: "MongoDB", experience: "6 meses" },
    { name: "Firebase", experience: "1 año" },
    { name: "Mysql", experience: "1 año" },
    { name: "SQLserver", experience: "1 año" },
    { name: "REST API", experience: "2 años" },
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
            <TabsList>
              <TabsTrigger value="frontend">Front-End</TabsTrigger>
              <TabsTrigger value="tools">Herramientas</TabsTrigger>
              <TabsTrigger value="other">Otras</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frontend">
            <SkillsGrid skills={skills.frontend} />
          </TabsContent>

          <TabsContent value="tools">
            <SkillsGrid skills={skills.tools} />
          </TabsContent>

          <TabsContent value="other">
            <SkillsGrid skills={skills.other} />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <ServiceCard
            title="Desarrollo Web"
            description="Creación de sitios web modernos, responsivos y optimizados para SEO."
            icon="🌐"
          />
          <ServiceCard
            title="Aplicaciones SPA"
            description="Desarrollo de aplicaciones web de una sola página con React y Next.js."
            icon="⚛️"
          />
          <ServiceCard
            title="UI/UX Design"
            description="Diseño de interfaces intuitivas y experiencias de usuario atractivas."
            icon="🎨"
          />
        </div>
      </div>
    </section>
  )
}

function SkillsGrid({ skills }) {
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

function ServiceCard({ title, description, icon }) {
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
