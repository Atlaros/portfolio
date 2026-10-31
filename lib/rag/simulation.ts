import type { Locale } from "@/lib/i18n/locales";

const questionIds = {
  missing: "missing",
  local: "local",
  rank: "rank",
} as const;

type QuestionId = (typeof questionIds)[keyof typeof questionIds];

const fragmentIds = {
  tramit: "tramit",
  academ: "academ",
  partner: "partner",
} as const;

type FragmentId = (typeof fragmentIds)[keyof typeof fragmentIds];

interface RagStageCopy {
  representation: string;
  retrieval: string;
  selection: string;
  cited: string;
}

interface RagQuestionCopy {
  id: QuestionId;
  prompt: string;
  terms: readonly string[];
  matched: readonly FragmentId[];
}

interface RagFragmentCopy {
  id: FragmentId;
  source: string;
  text: string;
}

interface RagDemoLocaleCopy {
  label: string;
  note: string;
  stages: RagStageCopy;
  termsCaption: string;
  match: string;
  miss: string;
  questions: readonly [RagQuestionCopy, RagQuestionCopy, RagQuestionCopy];
  fragments: readonly [RagFragmentCopy, RagFragmentCopy, RagFragmentCopy];
}

interface RetrievedFragment {
  id: FragmentId;
  text: string;
  source: string;
  matched: boolean;
}

interface SimulationResult {
  questionId: QuestionId;
  terms: readonly string[];
  retrieved: readonly RetrievedFragment[];
  selected: readonly RetrievedFragment[];
  answer: string;
}

const ragDemoCopy = {
  es: {
    label: "Simulación interactiva",
    note: "No es una consulta en vivo. El material son tres fichas fijas.",
    stages: {
      representation: "Representación conceptual",
      retrieval: "Recuperación simulada",
      selection: "Selección",
      cited: "Respuesta citada",
    },
    termsCaption: "Palabras de la pregunta, no un vector calculado.",
    match: "Coincide",
    miss: "No coincide",
    questions: [
      {
        id: questionIds.missing,
        prompt: "¿Qué pasa si el trámite no está publicado?",
        terms: ["trámite", "catálogo"],
        matched: [fragmentIds.tramit],
      },
      {
        id: questionIds.local,
        prompt: "¿AcademIA tiene una demo pública?",
        terms: ["AcademIA", "demo"],
        matched: [fragmentIds.academ],
      },
      {
        id: questionIds.rank,
        prompt: "¿El modelo arma el ranking?",
        terms: ["ranking", "modelo"],
        matched: [fragmentIds.partner],
      },
    ],
    fragments: [
      {
        id: fragmentIds.tramit,
        source: "TramitIA",
        text: "Si el trámite no está en el catálogo, TramitIA lo dice y busca en internet. No es un sitio de la Alcaldía.",
      },
      {
        id: fragmentIds.academ,
        source: "AcademIA",
        text: "AcademIA corre en la máquina local. No tiene demo pública.",
      },
      {
        id: fragmentIds.partner,
        source: "Partner Intelligence",
        text: "En Partner Intelligence el ranking numérico sale de AHP/TOPSIS. La salida del modelo de lenguaje no lo crea.",
      },
    ],
  },
  en: {
    label: "Interactive simulation",
    note: "This is not a live query. The material is three fixed cards.",
    stages: {
      representation: "Conceptual representation",
      retrieval: "Simulated retrieval",
      selection: "Selection",
      cited: "Cited answer",
    },
    termsCaption: "Words from the question, not a calculated vector.",
    match: "Matches",
    miss: "Does not match",
    questions: [
      {
        id: questionIds.missing,
        prompt: "What happens if the procedure is not published?",
        terms: ["procedure", "catalog"],
        matched: [fragmentIds.tramit],
      },
      {
        id: questionIds.local,
        prompt: "Does AcademIA have a public demo?",
        terms: ["AcademIA", "demo"],
        matched: [fragmentIds.academ],
      },
      {
        id: questionIds.rank,
        prompt: "Does the model build the ranking?",
        terms: ["ranking", "model"],
        matched: [fragmentIds.partner],
      },
    ],
    fragments: [
      {
        id: fragmentIds.tramit,
        source: "TramitIA",
        text: "If the procedure is not in the catalog, TramitIA says so and searches the web. It is not a city-hall site.",
      },
      {
        id: fragmentIds.academ,
        source: "AcademIA",
        text: "AcademIA runs on the local machine. It has no public demo.",
      },
      {
        id: fragmentIds.partner,
        source: "Partner Intelligence",
        text: "In Partner Intelligence the numerical ranking comes from AHP/TOPSIS. Language-model output does not create it.",
      },
    ],
  },
  pt: {
    label: "Simulação interativa",
    note: "Isto não é uma consulta ao vivo. O material são três fichas fixas.",
    stages: {
      representation: "Representação conceitual",
      retrieval: "Recuperação simulada",
      selection: "Seleção",
      cited: "Resposta citada",
    },
    termsCaption: "Palavras da pergunta, não um vetor calculado.",
    match: "Coincide",
    miss: "Não coincide",
    questions: [
      {
        id: questionIds.missing,
        prompt: "O que acontece se o trâmite não está publicado?",
        terms: ["trâmite", "catálogo"],
        matched: [fragmentIds.tramit],
      },
      {
        id: questionIds.local,
        prompt: "O AcademIA tem uma demo pública?",
        terms: ["AcademIA", "demo"],
        matched: [fragmentIds.academ],
      },
      {
        id: questionIds.rank,
        prompt: "O modelo monta o ranking?",
        terms: ["ranking", "modelo"],
        matched: [fragmentIds.partner],
      },
    ],
    fragments: [
      {
        id: fragmentIds.tramit,
        source: "TramitIA",
        text: "Se o trâmite não está no catálogo, o TramitIA diz isso e busca na internet. Não é um site da prefeitura.",
      },
      {
        id: fragmentIds.academ,
        source: "AcademIA",
        text: "O AcademIA roda na máquina local. Não tem demo pública.",
      },
      {
        id: fragmentIds.partner,
        source: "Partner Intelligence",
        text: "No Partner Intelligence o ranking numérico sai de AHP/TOPSIS. A saída do modelo de linguagem não o cria.",
      },
    ],
  },
} as const satisfies Record<Locale, RagDemoLocaleCopy>;

function runSimulation(locale: Locale, questionId: QuestionId): SimulationResult {
  const copy = ragDemoCopy[locale];
  const question = copy.questions.find((item) => item.id === questionId);

  if (!question) {
    throw new Error(`Unknown RAG question: ${questionId}`);
  }

  const matchedIds = new Set<FragmentId>(question.matched);
  const retrieved = copy.fragments.map((fragment) => ({
    id: fragment.id,
    text: fragment.text,
    source: fragment.source,
    matched: matchedIds.has(fragment.id),
  }));
  const selected = retrieved.filter((fragment) => matchedIds.has(fragment.id));
  const cited = selected[0];

  if (!cited || selected.length !== 1) {
    throw new Error(`RAG question ${questionId} must match exactly one fragment.`);
  }

  return {
    questionId,
    terms: question.terms,
    retrieved,
    selected,
    answer: cited.text,
  };
}

export { fragmentIds, questionIds, ragDemoCopy, runSimulation, type QuestionId, type SimulationResult };
