import type { ProjectCategory, ProjectParticipation } from "@/domain/project";
import type { Locale } from "./locales";

interface ProjectCopy {
  sectionTitle: string;
  relevantTitle: string;
  catalogTitle: string;
  allAreas: string;
  emptyArea: string;
  viewCase: string;
  sourceCode: string;
  openPilot: string;
  invitePlatform: string;
  noPublicDemo: string;
  backHome: string;
  problem: string;
  whyItMatters: string;
  solution: string;
  approach: string;
  engineeringDecisions: string;
  benefits: string;
  technologies: string;
  participation: Record<ProjectParticipation, string>;
  categories: Record<ProjectCategory, string>;
}

const projectCopy = {
  es: {
    sectionTitle: "Proyectos",
    relevantTitle: "Otros proyectos relevantes",
    catalogTitle: "Catálogo",
    allAreas: "Todos",
    emptyArea: "Todavía no hay proyectos publicados en esta área.",
    viewCase: "Ver el caso",
    sourceCode: "Código",
    openPilot: "Abrir el piloto",
    invitePlatform: "Abrir la plataforma por invitación",
    noPublicDemo: "Sin demo pública",
    backHome: "Volver al inicio",
    problem: "Problema",
    whyItMatters: "Por qué importa",
    solution: "Solución",
    approach: "Enfoque",
    engineeringDecisions: "Decisiones de ingeniería",
    benefits: "Beneficios",
    technologies: "Tecnologías",
    participation: {
      personal: "Personal",
      collaborative: "Colaborativo",
      internship: "Pasantía",
    },
    categories: {
      analytics: "Analítica",
      "data-science": "Ciencia de datos",
      ai: "IA",
      "data-engineering": "Ingeniería de datos",
    },
  },
  en: {
    sectionTitle: "Projects",
    relevantTitle: "Other relevant projects",
    catalogTitle: "Catalog",
    allAreas: "All",
    emptyArea: "No published projects in this area yet.",
    viewCase: "View the case",
    sourceCode: "Source",
    openPilot: "Open the pilot",
    invitePlatform: "Open the invitation-only platform",
    noPublicDemo: "No public demo",
    backHome: "Back to home",
    problem: "Problem",
    whyItMatters: "Why it matters",
    solution: "Solution",
    approach: "Approach",
    engineeringDecisions: "Engineering decisions",
    benefits: "Benefits",
    technologies: "Technologies",
    participation: {
      personal: "Personal",
      collaborative: "Collaborative",
      internship: "Internship",
    },
    categories: {
      analytics: "Analytics",
      "data-science": "Data science",
      ai: "AI",
      "data-engineering": "Data engineering",
    },
  },
  pt: {
    sectionTitle: "Projetos",
    relevantTitle: "Outros projetos relevantes",
    catalogTitle: "Catálogo",
    allAreas: "Todos",
    emptyArea: "Ainda não há projetos publicados nesta área.",
    viewCase: "Ver o caso",
    sourceCode: "Código",
    openPilot: "Abrir o piloto",
    invitePlatform: "Abrir a plataforma por convite",
    noPublicDemo: "Sem demo pública",
    backHome: "Voltar ao início",
    problem: "Problema",
    whyItMatters: "Por que importa",
    solution: "Solução",
    approach: "Abordagem",
    engineeringDecisions: "Decisões de engenharia",
    benefits: "Benefícios",
    technologies: "Tecnologias",
    participation: {
      personal: "Pessoal",
      collaborative: "Colaborativo",
      internship: "Estágio",
    },
    categories: {
      analytics: "Analítica",
      "data-science": "Ciência de dados",
      ai: "IA",
      "data-engineering": "Engenharia de dados",
    },
  },
} as const satisfies Record<Locale, ProjectCopy>;

export { projectCopy };
export type { ProjectCopy };
