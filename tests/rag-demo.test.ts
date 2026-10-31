import { describe, expect, it } from "vitest";
import type { Locale } from "@/lib/i18n/locales";
import { runSimulation } from "@/lib/rag/simulation";

interface LocaleExpectation {
  tramit: string;
  academ: string;
  partner: string;
  absentFromMissing: readonly string[];
  absentFromRank: readonly string[];
}

const expectations = {
  es: {
    tramit:
      "Si el trámite no está en el catálogo, TramitIA lo dice y busca en internet. No es un sitio de la Alcaldía.",
    academ: "AcademIA corre en la máquina local. No tiene demo pública.",
    partner:
      "En Partner Intelligence el ranking numérico sale de AHP/TOPSIS. La salida del modelo de lenguaje no lo crea.",
    absentFromMissing: ["AHP", "máquina local"],
    absentFromRank: ["Alcaldía"],
  },
  en: {
    tramit:
      "If the procedure is not in the catalog, TramitIA says so and searches the web. It is not a city-hall site.",
    academ: "AcademIA runs on the local machine. It has no public demo.",
    partner:
      "In Partner Intelligence the numerical ranking comes from AHP/TOPSIS. Language-model output does not create it.",
    absentFromMissing: ["AHP", "local machine"],
    absentFromRank: ["city-hall"],
  },
  pt: {
    tramit:
      "Se o trâmite não está no catálogo, o TramitIA diz isso e busca na internet. Não é um site da prefeitura.",
    academ: "O AcademIA roda na máquina local. Não tem demo pública.",
    partner:
      "No Partner Intelligence o ranking numérico sai de AHP/TOPSIS. A saída do modelo de linguagem não o cria.",
    absentFromMissing: ["AHP", "máquina local"],
    absentFromRank: ["prefeitura"],
  },
} as const satisfies Record<Locale, LocaleExpectation>;

const localesUnderTest = ["es", "en", "pt"] as const satisfies readonly Locale[];

describe("runSimulation", () => {
  it.each(localesUnderTest)("cites only the tramit fragment for missing in %s", (locale) => {
    const expected = expectations[locale];
    const result = runSimulation(locale, "missing");

    expect(result.answer).toBe(expected.tramit);
    expect(result.selected).toHaveLength(1);
    expect(result.retrieved).toHaveLength(3);
    expect(result.retrieved.filter((fragment) => fragment.matched)).toHaveLength(1);

    for (const phrase of expected.absentFromMissing) {
      expect(result.answer).not.toContain(phrase);
    }
  });

  it.each(localesUnderTest)("cites only the academ fragment for local in %s", (locale) => {
    const expected = expectations[locale];
    const result = runSimulation(locale, "local");
    const selected = result.selected[0];

    expect(result.answer).toBe(expected.academ);
    expect(selected?.id).toBe("academ");
    expect(result.retrieved).toHaveLength(3);
  });

  it.each(localesUnderTest)("cites only the partner fragment for rank in %s", (locale) => {
    const expected = expectations[locale];
    const result = runSimulation(locale, "rank");

    expect(result.answer).toBe(expected.partner);
    expect(result.retrieved).toHaveLength(3);

    for (const phrase of expected.absentFromRank) {
      expect(result.answer).not.toContain(phrase);
    }
  });
});
