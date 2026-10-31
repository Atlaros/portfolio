import { type ProjectMaturity } from "@/domain/project";
import type { Locale } from "./locales";

interface CopilotCopy {
  label: string;
  note: string;
  placeholder: string;
  ask: string;
  empty: string;
  tooLong: string;
  refusal: string;
  maturity: Record<ProjectMaturity, string>;
  suggestions: readonly [string, string, string];
}

const copilotCopy = {
  es: {
    label: "Preguntá sobre los proyectos",
    note: "Sin modelo conectado. La respuesta sale del texto publicado. Si no está, lo dice.",
    placeholder: "Escribí una pregunta",
    ask: "Preguntar",
    empty: "Escribí una pregunta.",
    tooLong: "La pregunta es demasiado larga.",
    refusal: "No tengo eso en los proyectos publicados.",
    maturity: {
      prototype: "Prototipo",
      demo: "Demo",
      production: "Producción",
    },
    suggestions: [
      "Contame sobre TramitIA",
      "¿Qué proyectos usan IA?",
      "¿Qué proyectos puedo probar?",
    ],
  },
  en: {
    label: "Ask about the projects",
    note: "No model is connected. The answer comes from published text. If it is not there, it says so.",
    placeholder: "Type a question",
    ask: "Ask",
    empty: "Type a question.",
    tooLong: "The question is too long.",
    refusal: "That is not in the published projects.",
    maturity: {
      prototype: "Prototype",
      demo: "Demo",
      production: "Production",
    },
    suggestions: [
      "Tell me about TramitIA",
      "Which projects use AI?",
      "Which projects can I try?",
    ],
  },
  pt: {
    label: "Pergunte sobre os projetos",
    note: "Nenhum modelo está conectado. A resposta sai do texto publicado. Se não estiver, ela diz isso.",
    placeholder: "Escreva uma pergunta",
    ask: "Perguntar",
    empty: "Escreva uma pergunta.",
    tooLong: "A pergunta é longa demais.",
    refusal: "Isso não está nos projetos publicados.",
    maturity: {
      prototype: "Protótipo",
      demo: "Demo",
      production: "Produção",
    },
    suggestions: [
      "Fale sobre o TramitIA",
      "Quais projetos usam IA?",
      "Quais projetos posso testar?",
    ],
  },
} as const satisfies Record<Locale, CopilotCopy>;

export { copilotCopy };
export type { CopilotCopy };
