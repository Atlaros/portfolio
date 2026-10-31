import type { Locale } from "./locales";

interface HomeCopy {
  eyebrow: string;
  line1: string;
  line2: string;
  support: string;
}

const homeCopy = {
  es: {
    eyebrow: "AI & Agentic Systems Engineer",
    line1: "Ingeniería de soluciones",
    line2: "desde los datos.",
    support:
      "Construyo sistemas prácticos que conectan IA generativa, pipelines de datos confiables e ingeniería de software con problemas reales.",
  },
  en: {
    eyebrow: "AI & Agentic Systems Engineer",
    line1: "Engineering solutions",
    line2: "from data.",
    support:
      "I build practical systems that connect generative AI, reliable data pipelines, and software engineering to real problems.",
  },
  pt: {
    eyebrow: "AI & Agentic Systems Engineer",
    line1: "Engenharia de soluções",
    line2: "a partir dos dados.",
    support:
      "Construo sistemas práticos que ligam IA generativa, pipelines de dados confiáveis e engenharia de software a problemas reais.",
  },
} as const satisfies Record<Locale, HomeCopy>;

export { homeCopy };
