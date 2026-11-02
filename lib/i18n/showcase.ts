import type { Locale } from "./locales";

interface ShowcaseCopy {
  liveNote: string;
  explanatory: string;
  internship: string;
  outsideScore: string;
  modelNote: string;
  states: Record<"tramit-ia" | "academ-ia", readonly string[]>;
  flow: readonly string[];
}

const showcaseCopy = {
  es: {
    liveNote: "No es una consulta en vivo.",
    explanatory: "Explicación. No es una pantalla del producto.",
    internship: "Pasantía · No Country",
    outsideScore: "Fuera del puntaje",
    modelNote: "El modelo no crea el ranking numérico.",
    states: {
      "tramit-ia": ["Inicio", "Consulta", "Ficha recuperada"],
      "academ-ia": ["Buscar", "Explorar", "Comparar"],
    },
    flow: ["Fuentes y evidencia", "Criterios", "Pesos", "AHP/TOPSIS", "Priorización"],
  },
  en: {
    liveNote: "This is not a live query.",
    explanatory: "Explanation. This is not a product screen.",
    internship: "Internship · No Country",
    outsideScore: "Outside the score",
    modelNote: "The model does not create the numerical rank.",
    states: {
      "tramit-ia": ["Start", "Query", "Recovered card"],
      "academ-ia": ["Search", "Explore", "Compare"],
    },
    flow: ["Sources and evidence", "Criteria", "Weights", "AHP/TOPSIS", "Prioritization"],
  },
  pt: {
    liveNote: "Não é uma consulta ao vivo.",
    explanatory: "Explicação. Não é uma tela do produto.",
    internship: "Estágio · No Country",
    outsideScore: "Fora da pontuação",
    modelNote: "O modelo não cria o ranking numérico.",
    states: {
      "tramit-ia": ["Início", "Consulta", "Ficha recuperada"],
      "academ-ia": ["Buscar", "Explorar", "Comparar"],
    },
    flow: ["Fontes e evidência", "Critérios", "Pesos", "AHP/TOPSIS", "Priorização"],
  },
} as const satisfies Record<Locale, ShowcaseCopy>;

const CAPTURE_SIZE: Record<string, { width: number; height: number }> = {
  "/projects/tramitia/welcome.webp": { width: 1024, height: 490 },
  "/projects/tramitia/queries.webp": { width: 1024, height: 490 },
  "/projects/tramitia/recovered-card.webp": { width: 734, height: 635 },
  "/projects/academia/search.webp": { width: 1024, height: 490 },
  "/projects/academia/universities.webp": { width: 1024, height: 483 },
  "/projects/academia/compare.webp": { width: 1024, height: 487 },
  "/projects/partner-intelligence/programs.webp": { width: 1024, height: 480 },
  "/projects/partner-intelligence/organizations.webp": { width: 1024, height: 479 },
};

export { CAPTURE_SIZE, showcaseCopy };
