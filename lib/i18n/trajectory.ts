import type { ProjectParticipation } from "@/domain/project";
import type { Locale } from "./locales";

interface TrajectoryCopy {
  title: string;
  lead: string;
  participation: Record<ProjectParticipation, string>;
  githubProfileLabel: string;
  githubProfileUrl: string;
}

const trajectoryCopy = {
  es: {
    title: "Trayectoria técnica",
    lead: "Repos públicos que marcan el camino técnico sin un caso completo en el sitio.",
    participation: {
      personal: "Personal",
      collaborative: "Colaborativo",
      internship: "Pasantía",
    },
    githubProfileLabel: "Perfil de GitHub",
    githubProfileUrl: "https://github.com/Atlaros",
  },
  en: {
    title: "Technical trajectory",
    lead: "Public repositories that mark the technical path without a full case on the site.",
    participation: {
      personal: "Personal",
      collaborative: "Collaborative",
      internship: "Internship",
    },
    githubProfileLabel: "GitHub profile",
    githubProfileUrl: "https://github.com/Atlaros",
  },
  pt: {
    title: "Trajetória técnica",
    lead: "Repositórios públicos que marcam o caminho técnico sem um caso completo no site.",
    participation: {
      personal: "Pessoal",
      collaborative: "Colaborativo",
      internship: "Estágio",
    },
    githubProfileLabel: "Perfil no GitHub",
    githubProfileUrl: "https://github.com/Atlaros",
  },
} as const satisfies Record<Locale, TrajectoryCopy>;

export { trajectoryCopy };
export type { TrajectoryCopy };
