import { FluidBackground } from "@/components/site/fluid-background"
import { SiteHeader } from "@/components/site/site-header"
import { Showcase } from "@/components/site/showcase"
import { ExperienceSection } from "@/components/site/experience-section"
import { StackSection } from "@/components/site/stack-section"
import { ContactSection } from "@/components/site/contact-section"
import { SiteFooter } from "@/components/site/site-footer"

export default function Home() {
  return (
    <>
      <FluidBackground />
      <SiteHeader />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Showcase />
        <ExperienceSection />
        <StackSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
