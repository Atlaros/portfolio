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
    lead: "Especialidades que aplico al diseñar sistemas. Cuando hay un caso publicado, enlazo la evidencia.",
    evidenceLabel: "Casos",
    capabilities: [
      {
        id: "ai-agentic",
        name: "AI & Agentic Engineering",
        build:
          "Asistentes y flujos con agentes apoyados en fuentes publicadas, con límites claros cuando el dato no está.",
      },
      {
        id: "data",
        name: "Data Engineering & Analytics",
        build:
          "Catálogos consultables, normalización de fuentes y criterios trazables para comparar y decidir.",
      },
      {
        id: "fullstack",
        name: "Full-Stack Engineering",
        build:
          "Interfaces, APIs y despliegue en el mismo producto, con el alcance real de cada demo.",
      },
      {
        id: "ml",
        name: "Machine Learning",
        build:
          "Modelos predictivos, evaluación de resultados y revisión humana cuando hace falta contrastarlos.",
      },
    ],
  },
  en: {
    navLabel: "Capabilities",
    eyebrow: "Capabilities",
    title: "Engineering capabilities",
    lead: "Specialties I use when designing systems. When a published case exists, I link the evidence.",
    evidenceLabel: "Cases",
    capabilities: [
      {
        id: "ai-agentic",
        name: "AI & Agentic Engineering",
        build:
          "Assistants and agentic flows grounded in published sources, with clear limits when the data is missing.",
      },
      {
        id: "data",
        name: "Data Engineering & Analytics",
        build:
          "Queryable catalogs, source normalization, and traceable criteria for comparison and decisions.",
      },
      {
        id: "fullstack",
        name: "Full-Stack Engineering",
        build:
          "Interfaces, APIs, and deployment in one product, with each demo’s real scope.",
      },
      {
        id: "ml",
        name: "Machine Learning",
        build:
          "Predictive models, result evaluation, and human review when the output needs a second look.",
      },
    ],
  },
  pt: {
    navLabel: "Capacidades",
    eyebrow: "Capacidades",
    title: "Capacidades de engenharia",
    lead: "Especialidades que aplico ao desenhar sistemas. Quando há um caso publicado, vínculo a evidência.",
    evidenceLabel: "Casos",
    capabilities: [
      {
        id: "ai-agentic",
        name: "AI & Agentic Engineering",
        build:
          "Assistentes e fluxos com agentes apoiados em fontes publicadas, com limites claros quando o dado não está.",
      },
      {
        id: "data",
        name: "Data Engineering & Analytics",
        build:
          "Catálogos consultáveis, normalização de fontes e critérios rastreáveis para comparar e decidir.",
      },
      {
        id: "fullstack",
        name: "Full-Stack Engineering",
        build:
          "Interfaces, APIs e deploy no mesmo produto, com o alcance real de cada demo.",
      },
      {
        id: "ml",
        name: "Machine Learning",
        build:
          "Modelos preditivos, avaliação de resultados e revisão humana quando é preciso contrastá-los.",
      },
    ],
  },
} as const satisfies Record<Locale, CapabilitiesCopy>;

export { capabilitiesCopy, type CapabilitiesCopy, type CapabilityItemCopy };
