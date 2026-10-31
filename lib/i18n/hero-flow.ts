import type { Locale } from "./locales";

const TRAMITIA_PILOT_HREF = "https://tramitia-bolivia.mywire.org";

interface HeroFlowStepCopy {
  title: string;
  body: string;
  evidence: string;
}

interface HeroFlowProductStepCopy extends HeroFlowStepCopy {
  linkLabel: string;
  linkHref: string;
}

interface HeroFlowCopy {
  label: string;
  note: string;
  steps: readonly [
    HeroFlowStepCopy,
    HeroFlowStepCopy,
    HeroFlowStepCopy,
    HeroFlowProductStepCopy,
  ];
}

const heroFlowCopy = {
  es: {
    label: "Arquitectura ilustrativa",
    note: "No es una consulta en vivo.",
    steps: [
      {
        title: "Entrada",
        body: "La persona describe su situación con sus propias palabras.",
        evidence:
          "En TramitIA escribe el trámite, adjunta una foto o elige una guía. En AcademIA busca un estudio entre programas dispersos.",
      },
      {
        title: "Registros",
        body: "La respuesta sale de registros, no de una suposición.",
        evidence:
          "TramitIA responde con fichas publicadas. Si el trámite no está, lo dice y busca en internet. No es un sitio de la Alcaldía. AcademIA normaliza programas de varias instituciones y corre en local.",
      },
      {
        title: "Agente",
        body: "Un grafo decide el siguiente paso y qué no se afirma.",
        evidence:
          "TramitIA usa LangGraph sobre FastAPI. AcademIA no es un agente: es un catálogo con filtros.",
      },
      {
        title: "Producto",
        body: "El sistema queda en el estado que realmente tiene.",
        evidence: "TramitIA tiene un piloto público. AcademIA no tiene demo pública.",
        linkLabel: "Abrir el piloto de TramitIA",
        linkHref: TRAMITIA_PILOT_HREF,
      },
    ],
  },
  en: {
    label: "Illustrative architecture",
    note: "This is not a live query.",
    steps: [
      {
        title: "Input",
        body: "A person describes their situation in their own words.",
        evidence:
          "In TramitIA they type the procedure, attach a photo, or pick a guide. In AcademIA they look for a program across scattered offerings.",
      },
      {
        title: "Records",
        body: "The answer comes from records, not from a guess.",
        evidence:
          "TramitIA answers with published procedure cards. If a procedure is missing, it says so and searches the web. It is not a city-hall site. AcademIA normalizes programs from several institutions and runs locally.",
      },
      {
        title: "Agent",
        body: "A graph decides the next step and what stays unsaid.",
        evidence:
          "TramitIA uses LangGraph on FastAPI. AcademIA is not an agent: it is a catalog with filters.",
      },
      {
        title: "Product",
        body: "The system ships in the state it actually has.",
        evidence: "TramitIA has a public pilot. AcademIA has no public demo.",
        linkLabel: "Open the TramitIA pilot",
        linkHref: TRAMITIA_PILOT_HREF,
      },
    ],
  },
  pt: {
    label: "Arquitetura ilustrativa",
    note: "Isto não é uma consulta ao vivo.",
    steps: [
      {
        title: "Entrada",
        body: "A pessoa descreve a situação com as próprias palavras.",
        evidence:
          "No TramitIA escreve o trâmite, anexa uma foto ou escolhe um guia. No AcademIA procura um curso entre programas dispersos.",
      },
      {
        title: "Registros",
        body: "A resposta sai de registros, não de um palpite.",
        evidence:
          "O TramitIA responde com fichas publicadas. Se o trâmite não está, diz isso e busca na internet. Não é um site da prefeitura. O AcademIA normaliza programas de várias instituições e roda localmente.",
      },
      {
        title: "Agente",
        body: "Um grafo decide o próximo passo e o que não se afirma.",
        evidence:
          "O TramitIA usa LangGraph sobre FastAPI. O AcademIA não é um agente: é um catálogo com filtros.",
      },
      {
        title: "Produto",
        body: "O sistema fica no estado que realmente tem.",
        evidence: "O TramitIA tem um piloto público. O AcademIA não tem demo pública.",
        linkLabel: "Abrir o piloto do TramitIA",
        linkHref: TRAMITIA_PILOT_HREF,
      },
    ],
  },
} as const satisfies Record<Locale, HeroFlowCopy>;

export { heroFlowCopy };
