import type { Locale } from "./locales";

const SCENE_FRAME = {
  pipeline: "pipeline",
  catalog: "catalog",
  criteria: "criteria",
} as const;

type SceneFrame = (typeof SCENE_FRAME)[keyof typeof SCENE_FRAME];

interface StageNode {
  id: string;
  label: string;
  detail: string;
  decision: string;
}

interface StageLink {
  from: string;
  to: string;
}

interface SceneCopy {
  slug: string;
  name: string;
  frame: SceneFrame;
  lines: readonly string[];
  nodes: readonly StageNode[];
  links: readonly StageLink[];
  caption: string;
}

interface ProductStageCopy {
  label: string;
  note: string;
  nodesLabel: string;
  decisionLabel: string;
  boundaryLabel: string;
  scenes: readonly [SceneCopy, SceneCopy, SceneCopy];
}

const productStageCopy = {
  es: {
    label: "Cómo funciona el sistema",
    note: "Representación simplificada del funcionamiento; no es una ejecución en vivo.",
    nodesLabel: "Nodos de la arquitectura",
    decisionLabel: "Decisión",
    boundaryLabel: "Fuera del puntaje",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Consulta", "RAG", "Control", "Salidas"],
        nodes: [
          {
            id: "consulta",
            label: "Consulta ciudadana",
            detail: "La persona describe el trámite que necesita.",
            decision: "La respuesta sale de fichas municipales publicadas, no de un sitio de la Alcaldía.",
          },
          {
            id: "rag",
            label: "Recuperación RAG",
            detail: "El sistema busca información relevante en fichas municipales publicadas.",
            decision: "Las fichas publicadas son la fuente que se responde.",
          },
          {
            id: "control",
            label: "Control de relevancia y fuentes",
            detail: "Comprueba si la información recuperada permite orientar la respuesta.",
            decision: "Sin evidencia suficiente en el catálogo, el sistema no inventa el trámite.",
          },
          {
            id: "disponible",
            label: "Información disponible",
            detail: "Orientación respaldada por la ficha recuperada.",
            decision: "Salida alternativa cuando el catálogo cubre la consulta.",
          },
          {
            id: "insuficiente",
            label: "Información insuficiente",
            detail:
              "Se indica qué información falta. Una búsqueda web opcional no sustituye la fuente municipal.",
            decision: "Salida alternativa; no es el paso siguiente de la otra salida.",
          },
        ],
        links: [
          { from: "consulta", to: "rag" },
          { from: "rag", to: "control" },
          { from: "control", to: "disponible" },
          { from: "control", to: "insuficiente" },
        ],
        caption: "Piloto público independiente. No es un sitio de la Alcaldía.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Fuentes", "Catálogo", "Exploración", "Comparación"],
        nodes: [
          {
            id: "fuentes",
            label: "Fuentes académicas",
            detail: "Información de programas obtenida de diferentes fuentes.",
            decision: "La recolección no se presenta como un proceso totalmente automático.",
          },
          {
            id: "normalizacion",
            label: "Normalización y catálogo",
            detail: "Los datos se organizan y revisan para facilitar su consulta.",
            decision: "La publicación editorial vive sobre todo en Postgres local; sin demo pública listada.",
          },
          {
            id: "exploracion",
            label: "Búsqueda y exploración",
            detail: "La persona encuentra programas y universidades.",
            decision: "La cobertura sigue siendo parcial; no es un agente.",
          },
          {
            id: "comparacion",
            label: "Comparación",
            detail: "Contrasta opciones académicas lado a lado.",
            decision: "Salida conceptual: atributos comparables, sin inventar universidades ni cifras.",
          },
        ],
        links: [
          { from: "fuentes", to: "normalizacion" },
          { from: "normalizacion", to: "exploracion" },
          { from: "exploracion", to: "comparacion" },
        ],
        caption: "App para EC2; catálogo local. Sin demo pública listada. No es un agente.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Evidencia", "Criterios", "AHP/TOPSIS", "Priorización"],
        nodes: [
          {
            id: "evidencia",
            label: "Fuentes y evidencia",
            detail: "Información para evaluar posibles alianzas.",
            decision: "La evidencia de fuente se valida antes de puntuar.",
          },
          {
            id: "criterios",
            label: "Criterios y pesos",
            detail: "Variables de evaluación y su importancia relativa.",
            decision: "Sin pesos trazables, la decisión mezcla opinión con evidencia.",
          },
          {
            id: "ahp",
            label: "Evaluación AHP/TOPSIS",
            detail:
              "Cálculo determinista que evalúa encaje del socio y oportunidad del programa por separado.",
            decision: "El puntaje es determinista; no lo escribe el modelo de lenguaje.",
          },
          {
            id: "priorizacion",
            label: "Priorización",
            detail: "Resultados explicables mediante criterios y fuentes trazables.",
            decision: "Salida del flujo de evaluación; acceso a la plataforma por invitación.",
          },
          {
            id: "modelo",
            label: "Modelo de lenguaje",
            detail: "El modelo de lenguaje no determina los puntajes ni genera el ranking numérico.",
            decision: "Queda fuera del cálculo numérico, como apoyo aparte del ranking.",
          },
        ],
        links: [
          { from: "evidencia", to: "criterios" },
          { from: "criterios", to: "ahp" },
          { from: "ahp", to: "priorizacion" },
        ],
        caption: "El modelo no crea el ranking numérico. El acceso es por invitación.",
      },
    ],
  },
  en: {
    label: "How the system works",
    note: "Simplified view of how it works; not a live run.",
    nodesLabel: "Architecture nodes",
    decisionLabel: "Decision",
    boundaryLabel: "Outside the score",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Question", "RAG", "Control", "Outcomes"],
        nodes: [
          {
            id: "consulta",
            label: "Citizen question",
            detail: "The person describes the procedure they need.",
            decision: "The answer comes from published municipal cards, not from a city-hall site.",
          },
          {
            id: "rag",
            label: "RAG retrieval",
            detail: "The system searches for relevant information in published municipal cards.",
            decision: "Published cards are the source that gets answered.",
          },
          {
            id: "control",
            label: "Relevance and source control",
            detail: "It checks whether the retrieved information can support orientation.",
            decision: "Without enough catalog evidence, the system does not invent the procedure.",
          },
          {
            id: "disponible",
            label: "Information available",
            detail: "Orientation backed by the retrieved card.",
            decision: "Alternative outcome when the catalog covers the question.",
          },
          {
            id: "insuficiente",
            label: "Information insufficient",
            detail:
              "It states what is missing. An optional web search does not replace the municipal source.",
            decision: "Alternative outcome; not the next step after the other outcome.",
          },
        ],
        links: [
          { from: "consulta", to: "rag" },
          { from: "rag", to: "control" },
          { from: "control", to: "disponible" },
          { from: "control", to: "insuficiente" },
        ],
        caption: "Independent public pilot. Not a city-hall site.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Sources", "Catalog", "Explore", "Compare"],
        nodes: [
          {
            id: "fuentes",
            label: "Academic sources",
            detail: "Program information gathered from different sources.",
            decision: "Collection is not presented as a fully automatic process.",
          },
          {
            id: "normalizacion",
            label: "Normalization and catalog",
            detail: "Data is organized and reviewed so it can be queried.",
            decision: "Editorial publishing lives mainly in local Postgres; no public demo listed.",
          },
          {
            id: "exploracion",
            label: "Search and exploration",
            detail: "The person finds programs and universities.",
            decision: "Coverage remains partial; this is not an agent.",
          },
          {
            id: "comparacion",
            label: "Comparison",
            detail: "Side-by-side contrast of academic options.",
            decision: "Conceptual output: comparable attributes, no invented universities or figures.",
          },
        ],
        links: [
          { from: "fuentes", to: "normalizacion" },
          { from: "normalizacion", to: "exploracion" },
          { from: "exploracion", to: "comparacion" },
        ],
        caption: "EC2-ready app; local catalog. No public demo listed. Not an agent.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Evidence", "Criteria", "AHP/TOPSIS", "Prioritization"],
        nodes: [
          {
            id: "evidencia",
            label: "Sources and evidence",
            detail: "Information used to evaluate possible alliances.",
            decision: "Source evidence is validated before scoring.",
          },
          {
            id: "criterios",
            label: "Criteria and weights",
            detail: "Evaluation variables and their relative importance.",
            decision: "Without traceable weights, the decision mixes opinion with evidence.",
          },
          {
            id: "ahp",
            label: "AHP/TOPSIS evaluation",
            detail:
              "Deterministic calculation that scores partner fit and program opportunity separately.",
            decision: "The score is deterministic; the language model does not write it.",
          },
          {
            id: "priorizacion",
            label: "Prioritization",
            detail: "Explainable results grounded in criteria and traceable sources.",
            decision: "Outcome of the evaluation flow; platform access is by invitation.",
          },
          {
            id: "modelo",
            label: "Language model",
            detail: "The language model does not set the scores or create the numeric ranking.",
            decision: "It stays outside the numeric calculation, separate from the rank.",
          },
        ],
        links: [
          { from: "evidencia", to: "criterios" },
          { from: "criterios", to: "ahp" },
          { from: "ahp", to: "priorizacion" },
        ],
        caption: "The model does not create the numeric rank. Access is by invitation.",
      },
    ],
  },
  pt: {
    label: "Como o sistema funciona",
    note: "Representação simplificada do funcionamento; não é uma execução ao vivo.",
    nodesLabel: "Nós da arquitetura",
    decisionLabel: "Decisão",
    boundaryLabel: "Fora da pontuação",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Consulta", "RAG", "Controle", "Saídas"],
        nodes: [
          {
            id: "consulta",
            label: "Consulta cidadã",
            detail: "A pessoa descreve o trâmite de que precisa.",
            decision: "A resposta sai de fichas municipais publicadas, não de um site da prefeitura.",
          },
          {
            id: "rag",
            label: "Recuperação RAG",
            detail: "O sistema busca informação relevante em fichas municipais publicadas.",
            decision: "As fichas publicadas são a fonte que se responde.",
          },
          {
            id: "control",
            label: "Controle de relevância e fontes",
            detail: "Verifica se a informação recuperada permite orientar a resposta.",
            decision: "Sem evidência suficiente no catálogo, o sistema não inventa o trâmite.",
          },
          {
            id: "disponible",
            label: "Informação disponível",
            detail: "Orientação respaldada pela ficha recuperada.",
            decision: "Saída alternativa quando o catálogo cobre a consulta.",
          },
          {
            id: "insuficiente",
            label: "Informação insuficiente",
            detail:
              "Indica que informação falta. Uma busca web opcional não substitui a fonte municipal.",
            decision: "Saída alternativa; não é o passo seguinte da outra saída.",
          },
        ],
        links: [
          { from: "consulta", to: "rag" },
          { from: "rag", to: "control" },
          { from: "control", to: "disponible" },
          { from: "control", to: "insuficiente" },
        ],
        caption: "Piloto público independente. Não é um site da prefeitura.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Fontes", "Catálogo", "Exploração", "Comparação"],
        nodes: [
          {
            id: "fuentes",
            label: "Fontes acadêmicas",
            detail: "Informação de programas obtida de diferentes fontes.",
            decision: "A coleta não é apresentada como um processo totalmente automático.",
          },
          {
            id: "normalizacion",
            label: "Normalização e catálogo",
            detail: "Os dados são organizados e revisados para facilitar a consulta.",
            decision: "A publicação editorial vive sobretudo em Postgres local; sem demo pública listada.",
          },
          {
            id: "exploracion",
            label: "Busca e exploração",
            detail: "A pessoa encontra programas e universidades.",
            decision: "A cobertura continua parcial; não é um agente.",
          },
          {
            id: "comparacion",
            label: "Comparação",
            detail: "Contrasta opções acadêmicas lado a lado.",
            decision: "Saída conceitual: atributos comparáveis, sem inventar universidades nem cifras.",
          },
        ],
        links: [
          { from: "fuentes", to: "normalizacion" },
          { from: "normalizacion", to: "exploracion" },
          { from: "exploracion", to: "comparacion" },
        ],
        caption: "App para EC2; catálogo local. Sem demo pública listada. Não é um agente.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Evidência", "Critérios", "AHP/TOPSIS", "Priorização"],
        nodes: [
          {
            id: "evidencia",
            label: "Fontes e evidência",
            detail: "Informação para avaliar possíveis alianças.",
            decision: "A evidência de fonte é validada antes de pontuar.",
          },
          {
            id: "criterios",
            label: "Critérios e pesos",
            detail: "Variáveis de avaliação e sua importância relativa.",
            decision: "Sem pesos rastreáveis, a decisão mistura opinião com evidência.",
          },
          {
            id: "ahp",
            label: "Avaliação AHP/TOPSIS",
            detail:
              "Cálculo determinístico que avalia encaixe do parceiro e oportunidade do programa em separado.",
            decision: "A pontuação é determinística; o modelo de linguagem não a escreve.",
          },
          {
            id: "priorizacion",
            label: "Priorização",
            detail: "Resultados explicáveis por critérios e fontes rastreáveis.",
            decision: "Saída do fluxo de avaliação; acesso à plataforma por convite.",
          },
          {
            id: "modelo",
            label: "Modelo de linguagem",
            detail: "O modelo de linguagem não determina as pontuações nem gera o ranking numérico.",
            decision: "Fica fora do cálculo numérico, separado do ranking.",
          },
        ],
        links: [
          { from: "evidencia", to: "criterios" },
          { from: "criterios", to: "ahp" },
          { from: "ahp", to: "priorizacion" },
        ],
        caption: "O modelo não cria o ranking numérico. O acesso é por convite.",
      },
    ],
  },
} as const satisfies Record<Locale, ProductStageCopy>;

const nodeRoles = {
  es: {
    consulta: "Entrada",
    rag: "Proceso",
    control: "Proceso",
    disponible: "Salida",
    insuficiente: "Límite",
    fuentes: "Entrada",
    normalizacion: "Proceso",
    exploracion: "Proceso",
    comparacion: "Salida",
    evidencia: "Entrada",
    criterios: "Proceso",
    ahp: "Proceso",
    priorizacion: "Salida",
    modelo: "Fuera del puntaje",
  },
  en: {
    consulta: "Input",
    rag: "Process",
    control: "Process",
    disponible: "Output",
    insuficiente: "Limit",
    fuentes: "Input",
    normalizacion: "Process",
    exploracion: "Process",
    comparacion: "Output",
    evidencia: "Input",
    criterios: "Process",
    ahp: "Process",
    priorizacion: "Output",
    modelo: "Outside the score",
  },
  pt: {
    consulta: "Entrada",
    rag: "Processo",
    control: "Processo",
    disponible: "Saída",
    insuficiente: "Limite",
    fuentes: "Entrada",
    normalizacion: "Processo",
    exploracion: "Processo",
    comparacion: "Saída",
    evidencia: "Entrada",
    criterios: "Processo",
    ahp: "Processo",
    priorizacion: "Saída",
    modelo: "Fora da pontuação",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export { nodeRoles, productStageCopy, SCENE_FRAME };
export type { SceneCopy, SceneFrame };
