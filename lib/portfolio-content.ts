/**
 * All page content, transcribed from the "Capas de cristal" artboard.
 * Asset and document paths are RELATIVE (no leading slash) so they resolve under
 * the /Portfolio basePath of the static export.
 */

/* ---------- Shared primitives ---------- */

/** Placeholder the artboard shows when a layer has no confirmed data. */
export const EMPTY = "—" as const

/** Rendered as `luis.<key>` / `proyecto.<key>`: scope in faint, key in .code-key. */
export interface CodeIdent {
  scope: string
  key: string
}

/** One `key: value` row of a .code-meta list. */
export type MetaValue =
  | { kind: "str"; values: string[] } // one or more quoted strings, comma separated
  | { kind: "num"; value: string; rest: string } // coral number + plain text
  | { kind: "link"; href: string; label: string; external: boolean }
  | { kind: "null"; comment: string } // `null // comment`

export interface MetaRow {
  key: string
  value: MetaValue
}

export interface LinkItem {
  label: string
  href: string
}

export interface DownloadLink {
  label: string
  /** Small mono suffix shown after the label, e.g. "PDF". */
  suffix: string
  href: string
  lang: "es" | "en"
  primary: boolean
}

/* ---------- Layers ---------- */

export type LayerKey = "interfaz" | "logicaApi" | "datos" | "despliegue"

export const LAYER_ORDER: readonly LayerKey[] = ["interfaz", "logicaApi", "datos", "despliegue"]

export interface LayerMeta {
  key: LayerKey
  /** Index in the stack, 0 = top (interfaz). */
  index: 0 | 1 | 2 | 3
  /** Label shown in mono, e.g. "lógica y API". */
  label: string
  /** Engraving on the glass plane, e.g. "logica-api/". */
  folder: string
  /** Layer tint as "r, g, b" (artboard --rgb). */
  rgb: string
}

export const LAYER_META: Record<LayerKey, LayerMeta> = {
  interfaz: { key: "interfaz", index: 0, label: "interfaz", folder: "interfaz/", rgb: "242, 193, 78" },
  logicaApi: { key: "logicaApi", index: 1, label: "lógica y API", folder: "logica-api/", rgb: "240, 122, 95" },
  datos: { key: "datos", index: 2, label: "datos", folder: "datos/", rgb: "43, 179, 168" },
  despliegue: { key: "despliegue", index: 3, label: "despliegue", folder: "despliegue/", rgb: "170, 192, 214" },
}

export interface Layer {
  /** Stack shown in the layer, or EMPTY ("—"). */
  value: string
  /** Optional explanatory sentence under the value. */
  note?: string
}

export type ProjectLayers = Record<LayerKey, Layer>

/** General stack shown on the rig before any project is active. */
export const generalStack: { ident: CodeIdent; layers: Record<LayerKey, string>; footLead: string; footPath: string } = {
  ident: { scope: "capas", key: "stackGeneral" },
  layers: {
    interfaz: "React · TypeScript · Tailwind",
    logicaApi: "Laravel · .NET · Node.js · Supabase",
    datos: "PostgreSQL · MySQL · SQL Server",
    despliegue: "Vercel · Railway · Azure · Docker",
  },
  footLead: "la línea sigue una solicitud:",
  footPath: "interfaz → lógica → datos → despliegue",
}

/* ---------- CV ---------- */

export const cv = {
  es: {
    label: "Hoja de vida (ES)",
    suffix: "PDF",
    href: "HojaDeVida_LuisRonaldoLondono.pdf",
    lang: "es",
    primary: true,
  },
  en: {
    label: "Resume (EN)",
    suffix: "PDF",
    href: "Resume_LuisRonaldoLondono.pdf",
    lang: "en",
    primary: false,
  },
} as const satisfies Record<"es" | "en", DownloadLink>

/* ---------- Profile and hero ---------- */

export interface Profile {
  fullName: string
  /** h1 split: first line in ink, second line muted. */
  nameLines: [string, string]
  shortName: string
  brandTag: string
  location: string
  role: string
  roleStack: string
  metaDescription: string
}

export const profile: Profile = {
  fullName: "Luis Ronaldo Londoño Gómez",
  nameLines: ["Luis Ronaldo", "Londoño Gómez"],
  shortName: "Luis R. Londoño",
  brandTag: "full-stack · Barranquilla",
  location: "Barranquilla, Colombia",
  role: "Desarrollador Full-Stack",
  roleStack: "React · TypeScript · Laravel · .NET",
  metaDescription:
    "Desarrollador Full-Stack en Barranquilla. Aplicaciones web con React y TypeScript sobre Laravel, Supabase y .NET, con pruebas primero (TDD) y CI.",
}

export interface HeroAction {
  label: string
  href: string
  suffix?: string
  download?: boolean
  primary?: boolean
}

export const hero = {
  ident: { scope: "luis", key: "perfil" } satisfies CodeIdent,
  pitch:
    "Construyo aplicaciones web con React y TypeScript sobre Laravel, Supabase y .NET. Escribo las pruebas primero (TDD) y cada cambio pasa por integración continua y revisión de pull request.",
  meta: [
    { key: "ubicacion", value: { kind: "str", values: ["Barranquilla, Colombia"] } },
    { key: "idiomas", value: { kind: "str", values: ["español nativo", "inglés B1"] } },
  ] satisfies MetaRow[],
  actions: [
    { label: "Ver proyectos", href: "#proyectos", primary: true },
    { label: "Hoja de vida", suffix: "PDF", href: cv.es.href, download: true },
    { label: "Escribirme", href: "#contacto" },
  ] satisfies HeroAction[],
  portrait: {
    asset: "LuisRonaldoLondonoGomez.png",
    alt: "Retrato de Luis Ronaldo Londoño Gómez",
  },
  hint: {
    ident: "capas",
    text: "Cada proyecto se lee en cuatro capas: interfaz, lógica y API, datos y despliegue.",
    /** Only shown when the pinned rig is live (wide screens, motion allowed). */
    liveText: "Al bajar, la pila de la derecha se separa y se rearma con el stack real de cada uno.",
  },
}

/* ---------- Navigation ---------- */

export type SectionId = "inicio" | "proyectos" | "experiencia" | "stack" | "contacto"

export interface NavItem {
  id: SectionId
  label: string
  href: `#${SectionId}`
}

export const navItems: NavItem[] = [
  { id: "proyectos", label: "Proyectos", href: "#proyectos" },
  { id: "experiencia", label: "Experiencia", href: "#experiencia" },
  { id: "stack", label: "Stack", href: "#stack" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
]

/** Header CV link ("Hoja de vida PDF"). */
export const navCv = { label: "Hoja de vida", suffix: "PDF", href: cv.es.href }

/** data-mood value of each top-level section (see components/site/fluid-background.tsx). */
export const sectionMood: Record<SectionId, number> = {
  inicio: 0,
  proyectos: 0,
  experiencia: 7,
  stack: 8,
  contacto: 9,
}

/* ---------- Projects ---------- */

export type ProjectLinks =
  | {
      kind: "public"
      /** Meta key in the artboard: "demo" or "sitio". */
      metaKey: "demo" | "sitio"
      href: string
      /** Host shown in the meta row, e.g. "vipepos.radestudio.org". */
      host: string
      /** Text of the call-to-action link, e.g. "Abrir la demo de Vipe POS". */
      cta: string
    }
  | {
      kind: "none"
      metaKey: "demo"
      /** Meta row comment: `null // <comment>`. */
      comment: string
      /** Note shown where the CTA would be. */
      note: string
    }

export interface ProjectTests {
  /** e.g. "2.800+" (rendered with .code-num). */
  count: string
  detail: string
}

export interface Project {
  /** camelCase identifier shown as proyecto.<id>. */
  id: string
  /** "01" … "06". */
  number: string
  title: string
  description: string
  /** Quoted value of the `estado` meta row. */
  status: string
  tests?: ProjectTests
  links: ProjectLinks
  /** Screenshot filename in public/, relative. */
  asset: string
  assetAlt: string
  /** data-mood index (1–6) for the fluid background. */
  mood: number
  /** Accent colour (artboard --acc). */
  accent: string
  layers: ProjectLayers
}

export const projectsSection = {
  ident: { scope: "luis", key: "proyectos" } satisfies CodeIdent,
  title: "Seis proyectos, capa por capa",
  lead: "Cada uno con su stack real en cada capa. Donde no hay un dato confirmado, la capa queda en —.",
  total: "06",
}

export const projects: Project[] = [
  {
    id: "vipePos",
    number: "01",
    title: "Vipe POS",
    description:
      "Punto de venta para restaurantes. Cada rol trabaja en su propia pantalla, y hoy está en uso real en un restaurante.",
    status: "en uso en un restaurante",
    links: {
      kind: "public",
      metaKey: "demo",
      href: "https://vipepos.radestudio.org",
      host: "vipepos.radestudio.org",
      cta: "Abrir la demo de Vipe POS",
    },
    asset: "vipe-pos.png",
    assetAlt: "Captura de Vipe POS: categorías, productos y comanda",
    mood: 1,
    accent: "#F2C14E",
    layers: {
      interfaz: {
        value: "React · TypeScript · Tailwind",
        note: "Una interfaz por rol: meseros, cocina, cajeros y administradores.",
      },
      logicaApi: { value: "Supabase · Python" },
      datos: { value: "Supabase" },
      despliegue: { value: "Vercel", note: "Demo pública abierta para probarlo." },
    },
  },
  {
    id: "printCostPro",
    number: "02",
    title: "PrintCost Pro",
    description:
      "Plataforma de gestión que usa un negocio de impresión 3D: clientes, ventas, impresiones, inventario, finanzas y estadísticas en un mismo lugar.",
    status: "en uso por un negocio de impresión 3D",
    links: {
      kind: "public",
      metaKey: "demo",
      href: "https://3dprintcost.radestudio.org",
      host: "3dprintcost.radestudio.org",
      cta: "Abrir la demo de PrintCost Pro",
    },
    asset: "presentacion.png",
    assetAlt: "Captura de PrintCost Pro: menú lateral y tabla de gestión",
    mood: 2,
    accent: "#2BB3A8",
    layers: {
      interfaz: {
        value: "React",
        note: "Módulos de clientes, ventas, impresiones, inventario, finanzas y estadísticas.",
      },
      logicaApi: { value: "C# · .NET" },
      datos: { value: "SQL Server" },
      despliegue: { value: "Azure" },
    },
  },
  {
    id: "mapanetBpo",
    number: "03",
    title: "MapaNet BPO",
    description:
      "ERP a medida y portal público de empleo, donde trabajé como desarrollador junior. Dentro del ERP construí el módulo de reclutamiento.",
    status: "portal público en línea",
    tests: { count: "2.800+", detail: "en verde en GitHub Actions" },
    links: {
      kind: "public",
      metaKey: "sitio",
      href: "https://mapanetbpo.co",
      host: "mapanetbpo.co",
      cta: "Abrir mapanetbpo.co",
    },
    asset: "mapanetbpo.jpeg",
    assetAlt: "Captura de MapaNet BPO: pipeline de candidatos por etapas",
    mood: 3,
    accent: "#F07A5F",
    layers: {
      interfaz: {
        value: "React · TypeScript · Inertia",
        note: "Vacantes, pipeline de candidatos con arrastrar y soltar, entrevistas con scorecards, ofertas y la página pública de empleo.",
      },
      logicaApi: {
        value: "Laravel",
        note: "Monolito organizado por módulos de dominio (Reclutamiento, CRM, Configuración), con roles granulares y formularios versionados con campos de fórmula.",
      },
      datos: { value: "MySQL · Redis" },
      despliegue: {
        value: "Railway · Docker Compose · GitHub Actions",
        note: "Desarrollo con TDD en Pest y Vitest; el proyecto mantiene 2.800+ pruebas en verde en CI.",
      },
    },
  },
  {
    id: "radeStudio",
    number: "04",
    title: "Rade Studio",
    description:
      "Sitio corporativo de un estudio de software, en español e inglés, con un recorrido interactivo por el portafolio de clientes.",
    status: "sitio público en línea",
    links: {
      kind: "public",
      metaKey: "sitio",
      href: "https://radestudio.org",
      host: "radestudio.org",
      cta: "Abrir radestudio.org",
    },
    asset: "radestudio.png",
    assetAlt: "Captura de Rade Studio: navegación, portada y recorrido de portafolio",
    mood: 4,
    accent: "#F2C14E",
    layers: {
      interfaz: { value: "Astro SSR", note: "Bilingüe ES/EN, con el recorrido interactivo por el portafolio." },
      logicaApi: { value: "Node.js · Resend", note: "API de contacto que envía el correo a través de Resend." },
      datos: { value: EMPTY },
      despliegue: { value: "Docker · GitHub Actions · Coolify", note: "Publicado en un VPS con Coolify." },
    },
  },
  {
    id: "vision",
    number: "05",
    title: "Vision",
    description:
      "Plataforma interna de la Corporación Universitaria Americana que centraliza casos, solicitudes y tareas de los equipos de la universidad.",
    status: "en piloto con un equipo",
    tests: { count: "2.500+", detail: "unitarias (Vitest) + pgTAP" },
    links: {
      kind: "none",
      metaKey: "demo",
      comment: "herramienta interna",
      note: "Uso interno · sin demo pública",
    },
    asset: "vision.jpg",
    assetAlt: "Captura de Vision: menú lateral, indicadores y tableros por equipo",
    mood: 5,
    accent: "#72D7CC",
    layers: {
      interfaz: { value: "React · TypeScript · Tailwind", note: "Remisiones entre áreas, tableros por equipo e indicadores." },
      logicaApi: { value: "Supabase Edge Functions · Auth con 2FA", note: "Permisos para 12 roles." },
      datos: {
        value: "PostgreSQL con RLS",
        note: "El acceso se controla en la propia base de datos y se prueba con pgTAP.",
      },
      despliegue: { value: "Vercel" },
    },
  },
  {
    id: "magicCulture",
    number: "06",
    title: "Magic Culture",
    description: "Proyecto universitario sobre la cultura de un municipio: su historia, sus tradiciones y sus eventos.",
    status: "proyecto universitario",
    links: {
      kind: "none",
      metaKey: "demo",
      comment: "sin demo publicada",
      note: "Proyecto académico · sin demo publicada",
    },
    asset: "magicculture.png",
    assetAlt: "Captura de Magic Culture: portada, texto y tarjetas de eventos",
    mood: 6,
    accent: "#F07A5F",
    layers: {
      interfaz: { value: "React · TypeScript · Tailwind", note: "Secciones de historia, tradiciones y eventos." },
      logicaApi: { value: EMPTY },
      datos: { value: EMPTY },
      despliegue: { value: EMPTY },
    },
  },
]

/* ---------- Experience ---------- */

export interface ExperienceEntry {
  org: string
  role: string
  meta: MetaRow[]
  summary: string
  highlights: string[]
  tech: string[]
}

export const experienceSection = {
  ident: { scope: "luis", key: "experiencia" } satisfies CodeIdent,
  title: "Experiencia",
  lead: "Una plataforma interna en una universidad y un ERP con portal público, ambos con pruebas automatizadas en cada cambio.",
}

export const experience: ExperienceEntry[] = [
  {
    org: "Corporación Universitaria Americana",
    role: "Cargue de Contenido y Desarrollo de Herramientas Internas",
    meta: [
      { key: "periodo", value: { kind: "str", values: ["nov 2025 – actualidad"] } },
      { key: "modalidad", value: { kind: "str", values: ["prestación de servicios"] } },
    ],
    summary:
      "Construí Vision, la plataforma interna que centraliza casos, solicitudes y tareas de los equipos de la universidad.",
    highlights: [
      "Remisiones entre áreas, tableros por equipo e indicadores.",
      "Permisos para 12 roles sobre PostgreSQL con RLS, Edge Functions y 2FA, desplegado en Vercel.",
      "2.500+ pruebas unitarias con Vitest y pruebas de base de datos con pgTAP; en piloto con un equipo.",
      "Automatización del cargue de contenido con n8n.",
    ],
    tech: ["React", "TypeScript", "Tailwind", "Supabase", "Vitest", "pgTAP", "n8n"],
  },
  {
    org: "MapaNet BPO",
    role: "Desarrollador Junior",
    meta: [{ key: "periodo", value: { kind: "str", values: ["abr 2026 – oct 2026"] } }],
    summary:
      "ERP a medida y portal público de empleo sobre un monolito Laravel con React y TypeScript vía Inertia, desplegado en Railway.",
    highlights: [
      "Módulo de reclutamiento (ATS): requisiciones, vacantes, pipeline drag & drop, entrevistas con scorecards, ofertas y página pública de empleo.",
      "Decisiones de arquitectura: módulos por dominio (Reclutamiento, CRM, Configuración), roles granulares y formularios versionados con campos de fórmula.",
      "TDD con Pest y Vitest; 2.800+ pruebas en verde en GitHub Actions.",
    ],
    tech: ["Laravel", "React", "TypeScript", "Inertia", "MySQL", "Redis", "Docker Compose", "Railway"],
  },
]

/* ---------- Stack ---------- */

export interface StackGroup {
  /** Rendered as stack.<key>. */
  key: string
  items: string[]
}

export const stackSection = {
  ident: { scope: "luis", key: "stack" } satisfies CodeIdent,
  title: "Stack",
  lead: "Lo que uso en proyectos reales, ordenado como las capas de arriba.",
  groupScope: "stack",
}

export const stackGroups: StackGroup[] = [
  { key: "lenguajes", items: ["TypeScript", "JavaScript", "PHP", "Python", "C#", "SQL"] },
  { key: "interfaz", items: ["React", "Tailwind CSS", "Bootstrap", "HTML/CSS"] },
  { key: "logicaApi", items: ["Laravel", "Node.js", ".NET", "Supabase"] },
  { key: "datos", items: ["PostgreSQL", "MySQL", "SQL Server"] },
  {
    key: "despliegue",
    items: ["Vercel", "Railway", "Azure", "Docker", "Git/GitHub", "GitHub Actions", "n8n"],
  },
  { key: "practica", items: ["TDD", "CI", "REST APIs", "modelado de datos"] },
]

export interface Fact {
  ident: CodeIdent
  text: string
}

export const education: Fact = {
  ident: { scope: "luis", key: "formacion" },
  text: "Ingeniería en Sistemas — Corporación Universitaria Americana, 2021 – en curso.",
}

export const languages: Fact = {
  ident: { scope: "luis", key: "idiomas" },
  text: "Español nativo · Inglés B1",
}

/* ---------- Contact ---------- */

export interface ContactChannel {
  /** Mono key, e.g. "whatsapp". */
  key: string
  label: string
  href: string
}

export const contactSection = {
  ident: { scope: "luis", key: "contacto" } satisfies CodeIdent,
  title: "Escríbeme",
  lead: "Por correo, WhatsApp o en mis perfiles. La hoja de vida está en español y en inglés.",
}

export const email = "ronaldlondono20@gmail.com"

export const contactChannels: ContactChannel[] = [
  { key: "whatsapp", label: "+57 300 480 7418", href: "https://wa.me/573004807418" },
  { key: "github", label: "ronaldlondono", href: "https://github.com/ronaldlondono" },
  {
    key: "linkedin",
    label: "Luis Ronaldo Londoño Gómez",
    href: "https://www.linkedin.com/in/luis-ronaldo-londo%C3%B1o-g%C3%B3mez-53561a272/",
  },
]

/** Both CV downloads, ES first (primary). */
export const cvLinks: DownloadLink[] = [cv.es, cv.en]

/** Screen-reader suffix for links that open a new tab. */
export const NEW_TAB_SR = " (se abre en otra pestaña)"

/* ---------- Footer ---------- */

export const footer = {
  copyright: "© 2026 Luis Ronaldo Londoño Gómez · Barranquilla, Colombia",
  backToTop: { label: "Volver arriba", href: "#inicio" } satisfies LinkItem,
}
