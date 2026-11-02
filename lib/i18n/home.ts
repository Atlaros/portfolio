import type { Locale } from "./locales";

interface HomeCopy {
  eyebrow: string;
  line1: string;
  line2: string;
  support: string;
  primaryCta: string;
  secondaryCta: string;
}

const homeCopy = {
  es: {
    eyebrow: "AI & Agentic Systems Engineer",
    line1: "Software, datos e inteligencia artificial",
    line2: "convertidos en soluciones reales.",
    support:
      "Diseño y desarrollo sistemas de software, datos e IA para resolver problemas concretos.",
    primaryCta: "Ver proyectos",
    secondaryCta: "Ver capacidades",
  },
  en: {
    eyebrow: "AI & Agentic Systems Engineer",
    line1: "Software, data, and artificial intelligence",
    line2: "turned into working solutions.",
    support:
      "I design and build software, data, and AI systems that solve concrete problems.",
    primaryCta: "See projects",
    secondaryCta: "See capabilities",
  },
  pt: {
    eyebrow: "AI & Agentic Systems Engineer",
    line1: "Software, dados e inteligência artificial",
    line2: "convertidos em soluções reais.",
    support:
      "Desenho e desenvolvo sistemas de software, dados e IA para resolver problemas concretos.",
    primaryCta: "Ver projetos",
    secondaryCta: "Ver capacidades",
  },
} as const satisfies Record<Locale, HomeCopy>;

export { homeCopy };
