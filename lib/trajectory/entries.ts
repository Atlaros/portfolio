import { z } from "zod";
import { PROJECT_PARTICIPATION } from "@/domain/project";

const localizedTextSchema = z.object({
  es: z.string().trim().min(1),
  en: z.string().trim().min(1),
  pt: z.string().trim().min(1),
});

const trajectoryEntrySchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  repositoryUrl: z.string().url(),
  participation: z.enum(PROJECT_PARTICIPATION),
  specialty: localizedTextSchema,
  context: localizedTextSchema,
});

const trajectoryEntriesSchema = z.array(trajectoryEntrySchema).min(1);

type TrajectoryEntry = z.infer<typeof trajectoryEntrySchema>;

const trajectoryEntries = trajectoryEntriesSchema.parse([
  {
    id: "auditoria",
    name: "AuditorIA",
    repositoryUrl: "https://github.com/Atlaros/AuditorIA",
    participation: PROJECT_PARTICIPATION.collaborative,
    specialty: {
      es: "RAG para auditoría y fiscalidad",
      en: "Tax and audit RAG",
      pt: "RAG para auditoria e fiscalidade",
    },
    context: {
      es: "Equipo de hackathon Build With AI / GDG.",
      en: "Build With AI / GDG hackathon team.",
      pt: "Equipe de hackathon Build With AI / GDG.",
    },
  },
  {
    id: "talentify",
    name: "Talentify",
    repositoryUrl: "https://github.com/Atlaros/Talentify",
    participation: PROJECT_PARTICIPATION.personal,
    specialty: {
      es: "Inteligencia del mercado laboral con scraping y RAG",
      en: "Labor-market intelligence with scraping and RAG",
      pt: "Inteligência do mercado de trabalho com scraping e RAG",
    },
    context: {
      es: "Producto aplicado de IA personal en Atlaros.",
      en: "Personal applied AI product on Atlaros.",
      pt: "Produto aplicado de IA pessoal na Atlaros.",
    },
  },
  {
    id: "quipu-ai",
    name: "Quipu AI",
    repositoryUrl: "https://github.com/Atlaros/Quipu-AI",
    participation: PROJECT_PARTICIPATION.collaborative,
    specialty: {
      es: "Agente multicanal de mensajería / gestor virtual",
      en: "Messaging virtual manager / multi-channel agent",
      pt: "Agente multicanal de mensagens / gestor virtual",
    },
    context: {
      es: "Contribución en equipo No Country; no el producto completo.",
      en: "Team contribution at No Country; not the whole product.",
      pt: "Contribuição em equipe na No Country; não o produto completo.",
    },
  },
  {
    id: "feedback-classifier",
    name: "Feedback Classifier",
    repositoryUrl: "https://github.com/No-Country-simulation/S06-26-NC-Equipo-89",
    participation: PROJECT_PARTICIPATION.collaborative,
    specialty: {
      es: "Pipeline de clasificación de feedback",
      en: "Feedback classification pipeline",
      pt: "Pipeline de classificação de feedback",
    },
    context: {
      es: "Contribución en el repo de equipo No Country.",
      en: "Contribution on the No Country team repository.",
      pt: "Contribuição no repositório de equipe da No Country.",
    },
  },
]);

export { trajectoryEntries, trajectoryEntrySchema, trajectoryEntriesSchema };
export type { TrajectoryEntry };
