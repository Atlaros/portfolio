import type { CapabilityId } from "@/lib/capabilities/config";
import type { Locale } from "./locales";

interface CapabilityItemCopy {
  id: CapabilityId;
  name: string;
  build: string;
}

interface CapabilitiesCopy {
  navLabel: string;
  eyebrow: string;
  title: string;
  lead: string;
  evidenceLabel: string;
  emptyEvidence: string;
  pendingLabel: string;
  pendingNote: string;
  capabilities: readonly [
    CapabilityItemCopy,
    CapabilityItemCopy,
    CapabilityItemCopy,
    CapabilityItemCopy,
  ];
}

const capabilitiesCopy = {
  es: {
    navLabel: "Capacidades",
    eyebrow: "Capacidades",
    title: "Capacidades de ingeniería",
    lead: "Cuatro formas en las que diseño y entrego sistemas. Cada una se ancla en proyectos publicados en el catálogo, no en una lista de herramientas.",
    evidenceLabel: "Evidencia en el catálogo",
    emptyEvidence:
      "Todavía no hay un caso destacado publicado en MDX para esta capacidad.",
    pendingLabel: "Preparación · Fase D",
    pendingNote:
      "Candidatos del portafolio PDF. Sin enlace hasta verificar repositorio y publicar el caso en MDX.",
    capabilities: [
      {
        id: "ai-agentic",
        name: "AI & Agentic Engineering",
        build:
          "Flujos con límites explícitos: respuestas ancladas en fichas o datos publicados, negativa clara cuando falta evidencia y orquestación cuando el problema lo exige.",
      },
      {
        id: "data",
        name: "Data Engineering & Analytics",
        build:
          "Datos listos para decidir: catálogos consultables, criterios con pesos trazables y separación entre puntaje determinista y texto generado por un modelo.",
      },
      {
        id: "fullstack",
        name: "Full-Stack Engineering",
        build:
          "Productos web de punta a punta: interfaz, APIs, autenticación y despliegue documentados en los casos publicados, con el alcance real de cada demo.",
      },
      {
        id: "ml",
        name: "Machine Learning",
        build:
          "Modelos y pipelines predictivos cuando el problema lo pide: forecasting, evaluación y revisión humana cuando la evidencia no alcanza.",
      },
    ],
  },
  en: {
    navLabel: "Capabilities",
    eyebrow: "Capabilities",
    title: "Engineering capabilities",
    lead: "Four ways I design and ship systems. Each one ties to projects published in the catalog—not a wall of tool names.",
    evidenceLabel: "Catalog evidence",
    emptyEvidence:
      "No featured MDX case study is published for this capability yet.",
    pendingLabel: "Preparation · Phase D",
    pendingNote:
      "Candidates from the portfolio PDF. No link until the repository is verified and the case is published in MDX.",
    capabilities: [
      {
        id: "ai-agentic",
        name: "AI & Agentic Engineering",
        build:
          "Flows with explicit limits: answers grounded in published records, clear refusal when evidence is missing, and orchestration when the problem requires it.",
      },
      {
        id: "data",
        name: "Data Engineering & Analytics",
        build:
          "Data shaped for decisions: queryable catalogs, traceable weighted criteria, and a hard split between deterministic scores and model-generated text.",
      },
      {
        id: "fullstack",
        name: "Full-Stack Engineering",
        build:
          "End-to-end web products: UI, APIs, authentication, and deployment as documented in published cases, with each demo’s real scope.",
      },
      {
        id: "ml",
        name: "Machine Learning",
        build:
          "Predictive models and pipelines when the problem calls for them: forecasting, evaluation, and human review when evidence is not enough.",
      },
    ],
  },
  pt: {
    navLabel: "Capacidades",
    eyebrow: "Capacidades",
    title: "Capacidades de engenharia",
    lead: "Quatro formas de desenhar e entregar sistemas. Cada uma se ancora em projetos publicados no catálogo — não em uma lista de ferramentas.",
    evidenceLabel: "Evidência no catálogo",
    emptyEvidence:
      "Ainda não há um caso em destaque publicado em MDX para esta capacidade.",
    pendingLabel: "Preparação · Fase D",
    pendingNote:
      "Candidatos do PDF do portfólio. Sem link até verificar o repositório e publicar o caso em MDX.",
    capabilities: [
      {
        id: "ai-agentic",
        name: "AI & Agentic Engineering",
        build:
          "Fluxos com limites explícitos: respostas ancoradas em fichas ou dados publicados, recusa clara quando falta evidência e orquestração quando o problema exige.",
      },
      {
        id: "data",
        name: "Data Engineering & Analytics",
        build:
          "Dados prontos para decidir: catálogos consultáveis, critérios com pesos rastreáveis e separação entre pontuação determinística e texto gerado por modelo.",
      },
      {
        id: "fullstack",
        name: "Full-Stack Engineering",
        build:
          "Produtos web ponta a ponta: interface, APIs, autenticação e deploy documentados nos casos publicados, com o alcance real de cada demo.",
      },
      {
        id: "ml",
        name: "Machine Learning",
        build:
          "Modelos e pipelines preditivos quando o problema pede: forecasting, avaliação e revisão humana quando a evidência não basta.",
      },
    ],
  },
} as const satisfies Record<Locale, CapabilitiesCopy>;

export { capabilitiesCopy, type CapabilitiesCopy, type CapabilityItemCopy };
