import type { Locale } from "./locales";

interface ExperienceItemCopy {
  id: "own-products" | "collaborative" | "internship";
  title: string;
  body: string;
}

interface ProfileCopy {
  aboutEyebrow: string;
  aboutTitle: string;
  aboutLead: string;
  aboutBody: string;
  experienceEyebrow: string;
  experienceTitle: string;
  experienceLead: string;
  experience: readonly [ExperienceItemCopy, ExperienceItemCopy, ExperienceItemCopy];
  contactEyebrow: string;
  contactTitle: string;
  contactLead: string;
  contactCta: string;
  emailLabel: string;
  githubLabel: string;
  linkedinLabel: string;
  cvLabel: string;
  navAbout: string;
  navContact: string;
}

const profileCopy = {
  es: {
    aboutEyebrow: "Sobre mí",
    aboutTitle: "Ingeniería de software, datos e IA aplicada",
    aboutLead:
      "Diseño y construyo sistemas que conectan producto full-stack, datos fiables e inteligencia artificial con problemas reales de negocio y servicio público.",
    aboutBody:
      "Trabajo de punta a punta: entender el problema, delimitar el alcance, implementar servicios e interfaces, y validar lo que el sistema puede afirmar. El foco está en soluciones operables, no en demos decorativas.",
    experienceEyebrow: "Experiencia",
    experienceTitle: "Cómo trabajo",
    experienceLead:
      "La trayectoria se organiza por tipo de participación verificable en este portafolio, no por un historial laboral inventado.",
    experience: [
      {
        id: "own-products",
        title: "Productos propios",
        body: "Sistemas desarrollados de forma independiente, desde el problema hasta la entrega: asistentes, catálogos de datos, forecasting y scoring. La evidencia está en los casos publicados del sitio.",
      },
      {
        id: "collaborative",
        title: "Colaboraciones",
        body: "Contribuciones en equipos de No Country y hackathons. Participé en arquitectura, agentes, datos o producto sin atribuirme el trabajo completo del equipo.",
      },
      {
        id: "internship",
        title: "Pasantía · No Country",
        body: "En Partner Intelligence aporté criterios de evaluación, evidencia de fuente, pesos y la lógica analítica de la decisión (AHP/TOPSIS), con acceso por invitación.",
      },
    ],
    contactEyebrow: "Contacto",
    contactTitle: "Hablemos de oportunidades y proyectos",
    contactLead:
      "Disponible para conversar sobre roles de ingeniería full-stack, IA y datos, y sobre proyectos de software con alcance real.",
    contactCta: "Enviar correo",
    emailLabel: "Correo",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    cvLabel: "PDF del portafolio",
    navAbout: "Sobre mí",
    navContact: "Contacto",
  },
  en: {
    aboutEyebrow: "About",
    aboutTitle: "Software, data, and applied AI engineering",
    aboutLead:
      "I design and build systems that connect full-stack products, reliable data, and artificial intelligence to real business and public-service problems.",
    aboutBody:
      "I work end to end: understand the problem, bound the scope, ship services and interfaces, and validate what the system can claim. The focus is operable solutions, not decorative demos.",
    experienceEyebrow: "Experience",
    experienceTitle: "How I work",
    experienceLead:
      "This trajectory is organized by verifiable participation on this portfolio, not by an invented employment history.",
    experience: [
      {
        id: "own-products",
        title: "Own products",
        body: "Independently developed systems from problem to delivery: assistants, data catalogs, forecasting, and scoring. Evidence lives in the published cases on this site.",
      },
      {
        id: "collaborative",
        title: "Collaborations",
        body: "Team contributions in No Country and hackathons. I took part in architecture, agents, data, or product work without claiming the whole team’s delivery.",
      },
      {
        id: "internship",
        title: "Internship · No Country",
        body: "On Partner Intelligence I contributed evaluation criteria, source evidence, weights, and the analytical decision logic (AHP/TOPSIS), with invitation-only access.",
      },
    ],
    contactEyebrow: "Contact",
    contactTitle: "Let’s talk about roles and software projects",
    contactLead:
      "Open to conversations about full-stack, AI, and data engineering roles, and about software projects with real scope.",
    contactCta: "Email me",
    emailLabel: "Email",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    cvLabel: "Portfolio PDF",
    navAbout: "About",
    navContact: "Contact",
  },
  pt: {
    aboutEyebrow: "Sobre mim",
    aboutTitle: "Engenharia de software, dados e IA aplicada",
    aboutLead:
      "Desenho e construo sistemas que ligam produto full-stack, dados confiáveis e inteligência artificial a problemas reais de negócio e serviço público.",
    aboutBody:
      "Trabalho de ponta a ponta: entender o problema, delimitar o escopo, entregar serviços e interfaces, e validar o que o sistema pode afirmar. O foco é em soluções operáveis, não em demos decorativas.",
    experienceEyebrow: "Experiência",
    experienceTitle: "Como trabalho",
    experienceLead:
      "A trajetória se organiza pelo tipo de participação verificável neste portfólio, não por um histórico laboral inventado.",
    experience: [
      {
        id: "own-products",
        title: "Produtos próprios",
        body: "Sistemas desenvolvidos de forma independente, do problema à entrega: assistentes, catálogos de dados, forecasting e scoring. A evidência está nos casos publicados do site.",
      },
      {
        id: "collaborative",
        title: "Colaborações",
        body: "Contribuições em equipes da No Country e hackathons. Participei de arquitetura, agentes, dados ou produto sem atribuir a mim o trabalho completo da equipe.",
      },
      {
        id: "internship",
        title: "Estágio · No Country",
        body: "Em Partner Intelligence contribui com critérios de avaliação, evidência de fonte, pesos e a lógica analítica da decisão (AHP/TOPSIS), com acesso por convite.",
      },
    ],
    contactEyebrow: "Contato",
    contactTitle: "Vamos falar de oportunidades e projetos",
    contactLead:
      "Disponível para conversar sobre papéis de engenharia full-stack, IA e dados, e sobre projetos de software com alcance real.",
    contactCta: "Enviar e-mail",
    emailLabel: "E-mail",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    cvLabel: "PDF do portfólio",
    navAbout: "Sobre mim",
    navContact: "Contato",
  },
} as const satisfies Record<Locale, ProfileCopy>;

export { profileCopy };
export type { ExperienceItemCopy, ProfileCopy };
