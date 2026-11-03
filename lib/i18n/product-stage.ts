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
    label: "Arquitectura ilustrativa",
    note: "No es una consulta en vivo.",
    nodesLabel: "Nodos de la arquitectura",
    decisionLabel: "Decisión",
    boundaryLabel: "Fuera del puntaje",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Consulta", "Fichas publicadas", "Si no está, lo dice"],
        nodes: [
          {
            id: "consulta",
            label: "Consulta",
            detail: "La persona pregunta por un trámite del municipio o de una subalcaldía.",
            decision: "La respuesta sale de las fichas publicadas, no de un sitio de la Alcaldía.",
          },
          {
            id: "fichas",
            label: "Fichas publicadas",
            detail: "El sistema recupera la ficha publicada que corresponde a la consulta.",
            decision: "Las fichas publicadas son el dato que se responde.",
          },
          {
            id: "falta",
            label: "Si no está, lo dice",
            detail: "Si el trámite no está en el catálogo, el sistema lo dice y busca en internet.",
            decision: "La comprobación presencial sigue en el trabajo editorial.",
          },
        ],
        links: [
          { from: "consulta", to: "fichas" },
          { from: "fichas", to: "falta" },
        ],
        caption: "Piloto público independiente. No es un sitio de la Alcaldía.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Cursos", "Carreras", "Posgrados"],
        nodes: [
          {
            id: "busqueda",
            label: "Búsqueda",
            detail: "La persona busca si el estudio existe, quién lo ofrece y en qué condiciones.",
            decision: "La app se empaquetó para un host AWS EC2; este portafolio no lista una demo pública.",
          },
          {
            id: "cursos",
            label: "Cursos",
            detail: "Cursos y talleres son una vía del catálogo, junto con requisitos, precio y modalidad.",
            decision: "La publicación pasa por revisión editorial. No es un agente.",
          },
          {
            id: "carreras",
            label: "Carreras",
            detail: "Las carreras se exploran desde la misma búsqueda, no como un producto aparte.",
            decision: "La información está dispersa. La plataforma la reúne para poder compararla.",
          },
          {
            id: "posgrados",
            label: "Posgrados",
            detail: "Los posgrados son otra vía del catálogo; la cura editorial vive sobre todo en Postgres local.",
            decision: "Publicado en el catálogo no implica un sitio público en línea continuo.",
          },
        ],
        links: [
          { from: "busqueda", to: "cursos" },
          { from: "busqueda", to: "carreras" },
          { from: "busqueda", to: "posgrados" },
        ],
        caption: "App para EC2; catálogo local. Sin demo pública listada. No es un agente.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Criterios", "Pesos", "AHP/TOPSIS"],
        nodes: [
          {
            id: "criterios",
            label: "Criterios",
            detail: "Definen qué se evalúa al priorizar una alianza.",
            decision: "El trabajo fue definir y validar criterios, evidencia de fuente y pesos.",
          },
          {
            id: "pesos",
            label: "Pesos",
            detail: "Dan un peso explícito a cada criterio antes de puntuar.",
            decision: "Sin pesos trazables, la decisión mezcla opinión con evidencia.",
          },
          {
            id: "ahp",
            label: "AHP/TOPSIS",
            detail: "Calcula el puntaje. El encaje del socio y la oportunidad del programa se puntúan aparte.",
            decision: "El puntaje es determinista. La salida del modelo de lenguaje no lo escribe.",
          },
          {
            id: "modelo",
            label: "Modelo",
            detail: "El modelo de lenguaje queda fuera de la puntuación numérica.",
            decision: "La salida del modelo no crea el ranking numérico.",
          },
        ],
        links: [
          { from: "criterios", to: "ahp" },
          { from: "pesos", to: "ahp" },
        ],
        caption: "El modelo no crea el ranking numérico. El acceso es por invitación.",
      },
    ],
  },
  en: {
    label: "Illustrative architecture",
    note: "This is not a live query.",
    nodesLabel: "Architecture nodes",
    decisionLabel: "Decision",
    boundaryLabel: "Outside the score",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Question", "Published cards", "If missing, it says so"],
        nodes: [
          {
            id: "consulta",
            label: "Question",
            detail: "The person asks about a municipal procedure or one from a sub-mayoralty.",
            decision: "The answer comes from the published cards, not from a city-hall site.",
          },
          {
            id: "fichas",
            label: "Published cards",
            detail: "The system retrieves the published card that matches the question.",
            decision: "The published cards are the data that gets answered.",
          },
          {
            id: "falta",
            label: "If missing, it says so",
            detail: "If the procedure is not in the catalog, the system says so and searches the web.",
            decision: "In-person verification stays in the editorial work.",
          },
        ],
        links: [
          { from: "consulta", to: "fichas" },
          { from: "fichas", to: "falta" },
        ],
        caption: "Independent public pilot. Not a city-hall site.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Courses", "Degrees", "Graduate programs"],
        nodes: [
          {
            id: "busqueda",
            label: "Search",
            detail: "The person looks for whether a study exists, who offers it, and on what terms.",
            decision: "The app was packaged for a single AWS EC2 host; this portfolio lists no public demo.",
          },
          {
            id: "cursos",
            label: "Courses",
            detail: "Courses and workshops are one catalog path, with requirements, price, and modality.",
            decision: "Publishing goes through editorial review. This is not an agent.",
          },
          {
            id: "carreras",
            label: "Degrees",
            detail: "Degree programs are explored from the same search, not as a separate product.",
            decision: "The information is scattered. The platform gathers it so it can be compared.",
          },
          {
            id: "posgrados",
            label: "Graduate programs",
            detail: "Graduate programs are another catalog path; editorial curation lives mainly in local Postgres.",
            decision: "Published in the catalog does not mean a continuously public website.",
          },
        ],
        links: [
          { from: "busqueda", to: "cursos" },
          { from: "busqueda", to: "carreras" },
          { from: "busqueda", to: "posgrados" },
        ],
        caption: "EC2-ready app; local catalog. No public demo listed. Not an agent.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Criteria", "Weights", "AHP/TOPSIS"],
        nodes: [
          {
            id: "criterios",
            label: "Criteria",
            detail: "They define what is evaluated when an alliance is prioritized.",
            decision: "The work defined and validated criteria, source evidence, and weights.",
          },
          {
            id: "pesos",
            label: "Weights",
            detail: "They give each criterion an explicit weight before scoring.",
            decision: "Without traceable weights, the decision mixes opinion with evidence.",
          },
          {
            id: "ahp",
            label: "AHP/TOPSIS",
            detail: "It computes the score. Partner fit and program opportunity are scored apart.",
            decision: "The score is deterministic. Language-model output does not write it.",
          },
          {
            id: "modelo",
            label: "Model",
            detail: "The language model stays outside the numeric score.",
            decision: "Model output does not create the numeric rank.",
          },
        ],
        links: [
          { from: "criterios", to: "ahp" },
          { from: "pesos", to: "ahp" },
        ],
        caption: "The model does not create the numeric rank. Access is by invitation.",
      },
    ],
  },
  pt: {
    label: "Arquitetura ilustrativa",
    note: "Não é uma consulta ao vivo.",
    nodesLabel: "Nós da arquitetura",
    decisionLabel: "Decisão",
    boundaryLabel: "Fora da pontuação",
    scenes: [
      {
        slug: "tramit-ia",
        name: "TramitIA",
        frame: SCENE_FRAME.pipeline,
        lines: ["Consulta", "Fichas publicadas", "Se não está, diz"],
        nodes: [
          {
            id: "consulta",
            label: "Consulta",
            detail: "A pessoa pergunta por um trâmite do município ou de uma subprefeitura.",
            decision: "A resposta sai das fichas publicadas, não de um site da prefeitura.",
          },
          {
            id: "fichas",
            label: "Fichas publicadas",
            detail: "O sistema recupera a ficha publicada que corresponde à consulta.",
            decision: "As fichas publicadas são o dado que se responde.",
          },
          {
            id: "falta",
            label: "Se não está, diz",
            detail: "Se o trâmite não está no catálogo, o sistema diz isso e busca na internet.",
            decision: "A verificação presencial continua no trabalho editorial.",
          },
        ],
        links: [
          { from: "consulta", to: "fichas" },
          { from: "fichas", to: "falta" },
        ],
        caption: "Piloto público independente. Não é um site da prefeitura.",
      },
      {
        slug: "academ-ia",
        name: "AcademIA",
        frame: SCENE_FRAME.catalog,
        lines: ["Cursos", "Carreiras", "Pós-graduações"],
        nodes: [
          {
            id: "busqueda",
            label: "Busca",
            detail: "A pessoa procura se o estudo existe, quem o oferece e em que condições.",
            decision: "O app foi empacotado para um host AWS EC2; este portfólio não lista uma demo pública.",
          },
          {
            id: "cursos",
            label: "Cursos",
            detail: "Cursos e oficinas são um caminho do catálogo, com requisitos, preço e modalidade.",
            decision: "A publicação passa por revisão editorial. Não é um agente.",
          },
          {
            id: "carreras",
            label: "Carreiras",
            detail: "As carreiras são exploradas na mesma busca, não como um produto à parte.",
            decision: "A informação está dispersa. A plataforma a reúne para comparar.",
          },
          {
            id: "posgrados",
            label: "Pós-graduações",
            detail: "As pós-graduações são outro caminho do catálogo; a cura editorial vive sobretudo em Postgres local.",
            decision: "Publicado no catálogo não implica um site público online contínuo.",
          },
        ],
        links: [
          { from: "busqueda", to: "cursos" },
          { from: "busqueda", to: "carreras" },
          { from: "busqueda", to: "posgrados" },
        ],
        caption: "App para EC2; catálogo local. Sem demo pública listada. Não é um agente.",
      },
      {
        slug: "partner-intelligence",
        name: "Partner Intelligence",
        frame: SCENE_FRAME.criteria,
        lines: ["Critérios", "Pesos", "AHP/TOPSIS"],
        nodes: [
          {
            id: "criterios",
            label: "Critérios",
            detail: "Definem o que se avalia ao priorizar uma aliança.",
            decision: "O trabalho definiu e validou critérios, evidência de fonte e pesos.",
          },
          {
            id: "pesos",
            label: "Pesos",
            detail: "Dão um peso explícito a cada critério antes de pontuar.",
            decision: "Sem pesos rastreáveis, a decisão mistura opinião com evidência.",
          },
          {
            id: "ahp",
            label: "AHP/TOPSIS",
            detail: "Calcula a pontuação. O encaixe do parceiro e a oportunidade do programa pontuam à parte.",
            decision: "A pontuação é determinística. A saída do modelo de linguagem não a escreve.",
          },
          {
            id: "modelo",
            label: "Modelo",
            detail: "O modelo de linguagem fica fora da pontuação numérica.",
            decision: "A saída do modelo não cria o ranking numérico.",
          },
        ],
        links: [
          { from: "criterios", to: "ahp" },
          { from: "pesos", to: "ahp" },
        ],
        caption: "O modelo não cria o ranking numérico. O acesso é por convite.",
      },
    ],
  },
} as const satisfies Record<Locale, ProductStageCopy>;

const nodeRoles = {
  es: {
    consulta: "Entrada",
    fichas: "Recuperación",
    falta: "Límite",
    busqueda: "Exploración",
    cursos: "Catálogo",
    carreras: "Catálogo",
    posgrados: "Catálogo",
    criterios: "Evaluación",
    pesos: "Ponderación",
    ahp: "Puntaje",
    modelo: "Fuera del ranking",
  },
  en: {
    consulta: "Input",
    fichas: "Retrieval",
    falta: "Limit",
    busqueda: "Exploration",
    cursos: "Catalog",
    carreras: "Catalog",
    posgrados: "Catalog",
    criterios: "Evaluation",
    pesos: "Weighting",
    ahp: "Score",
    modelo: "Outside the rank",
  },
  pt: {
    consulta: "Entrada",
    fichas: "Recuperação",
    falta: "Limite",
    busqueda: "Exploração",
    cursos: "Catálogo",
    carreras: "Catálogo",
    posgrados: "Catálogo",
    criterios: "Avaliação",
    pesos: "Ponderação",
    ahp: "Pontuação",
    modelo: "Fora do ranking",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export { nodeRoles, productStageCopy, SCENE_FRAME };
export type { SceneCopy, SceneFrame };
