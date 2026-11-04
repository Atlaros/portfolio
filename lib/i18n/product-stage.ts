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
  /** What happens at this stage — compact, not a case-study dump. */
  happens: string;
  /** Why the stage exists — engineering rationale from published facts. */
  why: string;
  /** Stage-specific tech/mechanism only when the case documents it for this step. */
  tech?: string;
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
  /** Documented system pieces shown as a compact architecture strip. */
  architecture: readonly string[];
  /** Cut label before aside nodes (web fallback / LLM outside score). */
  asideLabel?: string;
  nodes: readonly StageNode[];
  links: readonly StageLink[];
  caption: string;
}

interface ProductStageCopy {
  eyebrow: string;
  title: string;
  description: string;
  instruction: string;
  note: string;
  nodesLabel: string;
  architectureLabel: string;
  happensLabel: string;
  whyLabel: string;
  techLabel: string;
  boundaryLabel: string;
  scenes: readonly [SceneCopy, SceneCopy, SceneCopy];
}

const productStageCopy = {
  es: {
    eyebrow: "Explora la ingeniería",
    title: "De la información al resultado.",
    description:
      "Descubre cómo funcionan mis proyectos por dentro. Sigue el recorrido de los datos, explora las decisiones técnicas y observa cómo cada sistema transforma información en una solución útil.",
    instruction: "Selecciona un proyecto y explora sus etapas.",
    note: "Diagramas interactivos basados en la arquitectura documentada. No procesan datos en vivo.",
    nodesLabel: "Etapas del recorrido",
    architectureLabel: "Arquitectura documentada",
    happensLabel: "Qué sucede",
    whyLabel: "Por qué existe",
    techLabel: "En esta etapa",
    boundaryLabel: "Fuera del puntaje",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Consulta", "RAG", "Control", "Salidas"],
        architecture: ["Next.js", "FastAPI · LangGraph", "PostgreSQL · pgvector"],
        asideLabel: "Orientación auxiliar",
        nodes: [
          {
            id: "consulta",
            label: "Consulta ciudadana",
            happens: "La persona describe el trámite que necesita en la interfaz del piloto.",
            why: "Sin una entrada clara, el asistente no puede orientar con fichas publicadas.",
            tech: "Next.js",
          },
          {
            id: "rag",
            label: "Recuperación RAG",
            happens: "El backend busca en fichas municipales publicadas indexadas.",
            why: "Las respuestas se anclan al catálogo publicado, no a requisitos inventados.",
            tech: "FastAPI · LangGraph · pgvector",
          },
          {
            id: "control",
            label: "Control de relevancia y fuentes",
            happens: "Comprueba si lo recuperado alcanza para orientar con fundamento.",
            why: "Los controles condicionan qué se presenta como grounded en el catálogo.",
          },
          {
            id: "disponible",
            label: "Información disponible",
            happens: "Orientación respaldada por la ficha recuperada.",
            why: "Salida alternativa cuando el catálogo cubre la consulta.",
          },
          {
            id: "insuficiente",
            label: "Información insuficiente",
            happens: "Indica qué falta en el catálogo; no inventa el trámite.",
            why: "Salida alternativa; no es el paso siguiente de la rama disponible.",
          },
          {
            id: "web",
            label: "Búsqueda web opcional",
            happens: "Puede orientar con internet solo como apoyo, no como fuente municipal.",
            why: "El fallback web no sustituye la ficha publicada ni al canal de la Alcaldía.",
          },
        ],
        links: [
          { from: "consulta", to: "rag" },
          { from: "rag", to: "control" },
          { from: "control", to: "disponible" },
          { from: "control", to: "insuficiente" },
          { from: "insuficiente", to: "web" },
        ],
        caption: "Piloto público independiente. No es un sitio de la Alcaldía.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Fuentes", "Normalización", "Catálogo", "Exploración", "Comparación"],
        architecture: ["Next.js", "PostgreSQL", "Supabase Auth", "Docker · EC2 · Caddy"],
        nodes: [
          {
            id: "fuentes",
            label: "Fuentes académicas",
            happens: "Información de programas obtenida de fuentes distintas y dispersas.",
            why: "La oferta está repartida; el punto de partida es reunir material heterogéneo.",
          },
          {
            id: "normalizacion",
            label: "Normalización",
            happens: "Los datos se organizan en una forma comparable; se distinguen campos no confirmados.",
            why: "Sin normalizar, búsqueda y comparación no son fiables entre fuentes.",
          },
          {
            id: "catalogo",
            label: "Catálogo editorial",
            happens: "El material se revisa y se publica en el catálogo del producto (sobre todo local).",
            why: "La revisión editorial no se presenta como automatización ni verificación total.",
            tech: "PostgreSQL",
          },
          {
            id: "exploracion",
            label: "Búsqueda y exploración",
            happens: "La persona encuentra programas y universidades con cuenta y filtros.",
            why: "El descubrimiento usa el catálogo curado; la cobertura sigue siendo parcial.",
            tech: "Next.js · Supabase Auth",
          },
          {
            id: "comparacion",
            label: "Comparación",
            happens: "Contrasta opciones académicas lado a lado.",
            why: "Resultado del recorrido: atributos comparables, sin inventar cifras ni universidades.",
          },
        ],
        links: [
          { from: "fuentes", to: "normalizacion" },
          { from: "normalizacion", to: "catalogo" },
          { from: "catalogo", to: "exploracion" },
          { from: "exploracion", to: "comparacion" },
        ],
        caption: "App para EC2; catálogo local. Sin demo pública listada. No es un agente.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Evidencia", "Criterios", "AHP/TOPSIS", "Priorización"],
        architecture: ["Criterios y pesos", "AHP/TOPSIS", "Revisión por evidencia", "Acceso por invitación"],
        asideLabel: "Fuera del puntaje",
        nodes: [
          {
            id: "evidencia",
            label: "Fuentes y evidencia",
            happens: "Se reúne evidencia de fuente; si está incompleta, dispara revisión explícita.",
            why: "Sin evidencia trazable, la priorización no se puede justificar.",
          },
          {
            id: "criterios",
            label: "Criterios y pesos",
            happens: "Se definen variables de evaluación y su importancia relativa.",
            why: "Sin pesos trazables, la decisión mezcla opinión con evidencia.",
          },
          {
            id: "ahp",
            label: "Evaluación AHP/TOPSIS",
            happens: "Puntúa por separado el encaje del socio y la oportunidad del programa.",
            why: "El ranking numérico sale de métodos multicriterio, no de un modelo de lenguaje.",
            tech: "AHP/TOPSIS",
          },
          {
            id: "priorizacion",
            label: "Priorización",
            happens: "Resultados explicables mediante criterios y fuentes trazables.",
            why: "La salida del flujo debe poder justificarse; el acceso es por invitación.",
          },
          {
            id: "modelo",
            label: "Modelo de lenguaje",
            happens: "No determina los puntajes ni genera el ranking numérico.",
            why: "Queda fuera del cálculo; el puntaje determinista no lo escribe el modelo.",
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
    eyebrow: "Explore the engineering",
    title: "From information to outcome.",
    description:
      "See how my projects work inside. Follow the data path, explore the technical decisions, and watch each system turn information into a useful solution.",
    instruction: "Select a project and explore its stages.",
    note: "Interactive diagrams based on the documented architecture. They do not process live data.",
    nodesLabel: "Journey stages",
    architectureLabel: "Documented architecture",
    happensLabel: "What happens",
    whyLabel: "Why it exists",
    techLabel: "At this stage",
    boundaryLabel: "Outside the score",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Question", "RAG", "Control", "Outcomes"],
        architecture: ["Next.js", "FastAPI · LangGraph", "PostgreSQL · pgvector"],
        asideLabel: "Auxiliary orientation",
        nodes: [
          {
            id: "consulta",
            label: "Citizen question",
            happens: "The person describes the procedure they need in the pilot UI.",
            why: "Without a clear input, the assistant cannot orient from published cards.",
            tech: "Next.js",
          },
          {
            id: "rag",
            label: "RAG retrieval",
            happens: "The backend searches indexed published municipal cards.",
            why: "Answers stay anchored to the published catalog, not invented requirements.",
            tech: "FastAPI · LangGraph · pgvector",
          },
          {
            id: "control",
            label: "Relevance and source control",
            happens: "Checks whether what was retrieved can support a grounded orientation.",
            why: "Controls decide what is presented as grounded in the catalog.",
          },
          {
            id: "disponible",
            label: "Information available",
            happens: "Orientation backed by the retrieved card.",
            why: "Alternative outcome when the catalog covers the question.",
          },
          {
            id: "insuficiente",
            label: "Information insufficient",
            happens: "States what is missing in the catalog; it does not invent the procedure.",
            why: "Alternative outcome; not the next step after the available branch.",
          },
          {
            id: "web",
            label: "Optional web search",
            happens: "May orient with the web only as support, not as a municipal source.",
            why: "Web fallback does not replace the published card or a city-hall channel.",
          },
        ],
        links: [
          { from: "consulta", to: "rag" },
          { from: "rag", to: "control" },
          { from: "control", to: "disponible" },
          { from: "control", to: "insuficiente" },
          { from: "insuficiente", to: "web" },
        ],
        caption: "Independent public pilot. Not a city-hall site.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Sources", "Normalization", "Catalog", "Explore", "Compare"],
        architecture: ["Next.js", "PostgreSQL", "Supabase Auth", "Docker · EC2 · Caddy"],
        nodes: [
          {
            id: "fuentes",
            label: "Academic sources",
            happens: "Program information gathered from different, scattered sources.",
            why: "Offerings are fragmented; the start is gathering heterogeneous material.",
          },
          {
            id: "normalizacion",
            label: "Normalization",
            happens: "Data is shaped into a comparable form; unconfirmed fields stay distinct.",
            why: "Without normalization, search and comparison across sources are unreliable.",
          },
          {
            id: "catalogo",
            label: "Editorial catalog",
            happens: "Material is reviewed and published into the product catalog (mainly local).",
            why: "Editorial review is not presented as full automation or total verification.",
            tech: "PostgreSQL",
          },
          {
            id: "exploracion",
            label: "Search and exploration",
            happens: "The person finds programs and universities with account and filters.",
            why: "Discovery uses the curated catalog; coverage remains partial.",
            tech: "Next.js · Supabase Auth",
          },
          {
            id: "comparacion",
            label: "Comparison",
            happens: "Side-by-side contrast of academic options.",
            why: "Journey outcome: comparable attributes, no invented figures or universities.",
          },
        ],
        links: [
          { from: "fuentes", to: "normalizacion" },
          { from: "normalizacion", to: "catalogo" },
          { from: "catalogo", to: "exploracion" },
          { from: "exploracion", to: "comparacion" },
        ],
        caption: "EC2-ready app; local catalog. No public demo listed. Not an agent.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Evidence", "Criteria", "AHP/TOPSIS", "Prioritization"],
        architecture: ["Criteria and weights", "AHP/TOPSIS", "Evidence review", "Invite-only access"],
        asideLabel: "Outside the score",
        nodes: [
          {
            id: "evidencia",
            label: "Sources and evidence",
            happens: "Source evidence is gathered; incomplete evidence triggers explicit review.",
            why: "Without traceable evidence, prioritization cannot be justified.",
          },
          {
            id: "criterios",
            label: "Criteria and weights",
            happens: "Evaluation variables and their relative importance are defined.",
            why: "Without traceable weights, the decision mixes opinion with evidence.",
          },
          {
            id: "ahp",
            label: "AHP/TOPSIS evaluation",
            happens: "Scores partner fit and program opportunity as separate dimensions.",
            why: "The numeric rank comes from multicriteria methods, not a language model.",
            tech: "AHP/TOPSIS",
          },
          {
            id: "priorizacion",
            label: "Prioritization",
            happens: "Explainable results grounded in criteria and traceable sources.",
            why: "The flow outcome must be justifiable; platform access is by invitation.",
          },
          {
            id: "modelo",
            label: "Language model",
            happens: "Does not set the scores or create the numeric ranking.",
            why: "It stays outside the calculation; the deterministic score is not written by the model.",
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
    eyebrow: "Explore a engenharia",
    title: "Da informação ao resultado.",
    description:
      "Veja como meus projetos funcionam por dentro. Siga o percurso dos dados, explore as decisões técnicas e observe como cada sistema transforma informação em uma solução útil.",
    instruction: "Selecione um projeto e explore suas etapas.",
    note: "Diagramas interativos baseados na arquitetura documentada. Não processam dados ao vivo.",
    nodesLabel: "Etapas do percurso",
    architectureLabel: "Arquitetura documentada",
    happensLabel: "O que acontece",
    whyLabel: "Por que existe",
    techLabel: "Nesta etapa",
    boundaryLabel: "Fora da pontuação",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Consulta", "RAG", "Controle", "Saídas"],
        architecture: ["Next.js", "FastAPI · LangGraph", "PostgreSQL · pgvector"],
        asideLabel: "Orientação auxiliar",
        nodes: [
          {
            id: "consulta",
            label: "Consulta cidadã",
            happens: "A pessoa descreve o trâmite de que precisa na interface do piloto.",
            why: "Sem uma entrada clara, o assistente não orienta com fichas publicadas.",
            tech: "Next.js",
          },
          {
            id: "rag",
            label: "Recuperação RAG",
            happens: "O backend busca em fichas municipais publicadas indexadas.",
            why: "As respostas se ancoram no catálogo publicado, não em requisitos inventados.",
            tech: "FastAPI · LangGraph · pgvector",
          },
          {
            id: "control",
            label: "Controle de relevância e fontes",
            happens: "Verifica se o recuperado basta para orientar com fundamento.",
            why: "Os controles condicionam o que se apresenta como grounded no catálogo.",
          },
          {
            id: "disponible",
            label: "Informação disponível",
            happens: "Orientação respaldada pela ficha recuperada.",
            why: "Saída alternativa quando o catálogo cobre a consulta.",
          },
          {
            id: "insuficiente",
            label: "Informação insuficiente",
            happens: "Indica o que falta no catálogo; não inventa o trâmite.",
            why: "Saída alternativa; não é o passo seguinte da ramificação disponível.",
          },
          {
            id: "web",
            label: "Busca web opcional",
            happens: "Pode orientar com a internet só como apoio, não como fonte municipal.",
            why: "O fallback web não substitui a ficha publicada nem o canal da prefeitura.",
          },
        ],
        links: [
          { from: "consulta", to: "rag" },
          { from: "rag", to: "control" },
          { from: "control", to: "disponible" },
          { from: "control", to: "insuficiente" },
          { from: "insuficiente", to: "web" },
        ],
        caption: "Piloto público independente. Não é um site da prefeitura.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Fontes", "Normalização", "Catálogo", "Exploração", "Comparação"],
        architecture: ["Next.js", "PostgreSQL", "Supabase Auth", "Docker · EC2 · Caddy"],
        nodes: [
          {
            id: "fuentes",
            label: "Fontes acadêmicas",
            happens: "Informação de programas obtida de fontes distintas e dispersas.",
            why: "A oferta está fragmentada; o ponto de partida é reunir material heterogêneo.",
          },
          {
            id: "normalizacion",
            label: "Normalização",
            happens: "Os dados são organizados em forma comparável; campos não confirmados ficam distintos.",
            why: "Sem normalizar, busca e comparação entre fontes não são confiáveis.",
          },
          {
            id: "catalogo",
            label: "Catálogo editorial",
            happens: "O material é revisado e publicado no catálogo do produto (sobretudo local).",
            why: "A revisão editorial não se apresenta como automação nem verificação total.",
            tech: "PostgreSQL",
          },
          {
            id: "exploracion",
            label: "Busca e exploração",
            happens: "A pessoa encontra programas e universidades com conta e filtros.",
            why: "A descoberta usa o catálogo curado; a cobertura continua parcial.",
            tech: "Next.js · Supabase Auth",
          },
          {
            id: "comparacion",
            label: "Comparação",
            happens: "Contrasta opções acadêmicas lado a lado.",
            why: "Resultado do percurso: atributos comparáveis, sem inventar cifras nem universidades.",
          },
        ],
        links: [
          { from: "fuentes", to: "normalizacion" },
          { from: "normalizacion", to: "catalogo" },
          { from: "catalogo", to: "exploracion" },
          { from: "exploracion", to: "comparacion" },
        ],
        caption: "App para EC2; catálogo local. Sem demo pública listada. Não é um agente.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Evidência", "Critérios", "AHP/TOPSIS", "Priorização"],
        architecture: ["Critérios e pesos", "AHP/TOPSIS", "Revisão por evidência", "Acesso por convite"],
        asideLabel: "Fora da pontuação",
        nodes: [
          {
            id: "evidencia",
            label: "Fontes e evidência",
            happens: "Reúne-se evidência de fonte; se incompleta, dispara revisão explícita.",
            why: "Sem evidência rastreável, a priorização não se justifica.",
          },
          {
            id: "criterios",
            label: "Critérios e pesos",
            happens: "Definem-se variáveis de avaliação e sua importância relativa.",
            why: "Sem pesos rastreáveis, a decisão mistura opinião com evidência.",
          },
          {
            id: "ahp",
            label: "Avaliação AHP/TOPSIS",
            happens: "Pontua em separado o encaixe do parceiro e a oportunidade do programa.",
            why: "O ranking numérico vem de métodos multicritério, não de um modelo de linguagem.",
            tech: "AHP/TOPSIS",
          },
          {
            id: "priorizacion",
            label: "Priorização",
            happens: "Resultados explicáveis por critérios e fontes rastreáveis.",
            why: "A saída do fluxo deve ser justificável; o acesso é por convite.",
          },
          {
            id: "modelo",
            label: "Modelo de linguagem",
            happens: "Não determina as pontuações nem gera o ranking numérico.",
            why: "Fica fora do cálculo; a pontuação determinística não é escrita pelo modelo.",
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
    web: "Auxiliar",
    fuentes: "Entrada",
    normalizacion: "Proceso",
    catalogo: "Proceso",
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
    web: "Auxiliary",
    fuentes: "Input",
    normalizacion: "Process",
    catalogo: "Process",
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
    web: "Auxiliar",
    fuentes: "Entrada",
    normalizacion: "Processo",
    catalogo: "Processo",
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
