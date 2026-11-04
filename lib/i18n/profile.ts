import type { Locale } from "./locales";

interface ExperienceItemCopy {
  id: "own-products" | "collaborative" | "internship";
  title: string;
  role: string;
  body: readonly string[];
}

interface ProfileCopy {
  aboutEyebrow: string;
  aboutTitle: string;
  aboutLead: string;
  aboutBody: string;
  aboutClose: string;
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
    aboutTitle: "Ingeniería de software, datos e inteligencia artificial",
    aboutLead:
      "Soy desarrollador de software enfocado en diseñar y construir soluciones tecnológicas que integran ingeniería de software, arquitectura de datos e inteligencia artificial para resolver problemas reales.",
    aboutBody:
      "Trabajo a lo largo de todo el ciclo de desarrollo: desde comprender el problema y definir la solución, hasta diseñar arquitecturas, implementar sistemas full-stack, integrar servicios inteligentes y validar su funcionamiento.",
    aboutClose:
      "Me interesa construir tecnología útil, confiable y sostenible: sistemas que no solo funcionen, sino que puedan evolucionar, escalar y generar valor en entornos reales.",
    experienceEyebrow: "Experiencia",
    experienceTitle: "Construyendo tecnología en distintos contextos",
    experienceLead:
      "Mi experiencia combina el desarrollo independiente de productos, la colaboración en equipos multidisciplinarios y la aplicación de inteligencia artificial y análisis de datos en proyectos reales.",
    experience: [
      {
        id: "own-products",
        title: "Productos propios",
        role: "Desarrollo independiente · De la idea a producción",
        body: [
          "He diseñado y desarrollado productos tecnológicos de forma independiente, participando en todo su ciclo de vida: definición del problema, arquitectura, desarrollo full-stack, integración de IA, gestión de datos y despliegue.",
          "Algunos ejemplos incluyen asistentes inteligentes, plataformas de información, sistemas de análisis y herramientas de apoyo a la toma de decisiones.",
        ],
      },
      {
        id: "collaborative",
        title: "Colaboraciones",
        role: "Desarrollo de software · Equipos multidisciplinarios",
        body: [
          "He colaborado en proyectos de No Country y hackathons, participando en distintas etapas del desarrollo de soluciones tecnológicas.",
          "Mis contribuciones han abarcado arquitectura de software, integración de agentes de IA, procesamiento de datos y definición de funcionalidades de producto, respetando siempre el trabajo colectivo y las responsabilidades de cada integrante.",
        ],
      },
      {
        id: "internship",
        title: "Pasantía · No Country",
        role: "Partner Intelligence · Análisis y sistemas de decisión",
        body: [
          "Participé en el desarrollo de Partner Intelligence, una plataforma de inteligencia para evaluar y comparar oportunidades de colaboración.",
          "Mi contribución se centró en los criterios de evaluación, la trazabilidad de las fuentes, la definición de ponderaciones y la lógica multicriterio de decisión mediante AHP y TOPSIS.",
          "El sistema se encuentra desplegado y cuenta con acceso restringido por invitación.",
        ],
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
    aboutTitle: "Software engineering, data, and artificial intelligence",
    aboutLead:
      "I am a software developer focused on designing and building technology solutions that integrate software engineering, data architecture, and artificial intelligence to solve real problems.",
    aboutBody:
      "I work across the full development cycle: from understanding the problem and defining the solution to designing architectures, implementing full-stack systems, integrating intelligent services, and validating how they work.",
    aboutClose:
      "I care about building useful, reliable, and sustainable technology: systems that not only work, but can evolve, scale, and create value in real environments.",
    experienceEyebrow: "Experience",
    experienceTitle: "Building technology across different contexts",
    experienceLead:
      "My experience combines independent product development, collaboration in multidisciplinary teams, and the application of artificial intelligence and data analysis in real projects.",
    experience: [
      {
        id: "own-products",
        title: "Own products",
        role: "Independent development · From idea to production",
        body: [
          "I have designed and developed technology products independently, taking part across their full life cycle: problem definition, architecture, full-stack development, AI integration, data management, and deployment.",
          "Examples include intelligent assistants, information platforms, analysis systems, and decision-support tools.",
        ],
      },
      {
        id: "collaborative",
        title: "Collaborations",
        role: "Software development · Multidisciplinary teams",
        body: [
          "I have collaborated on No Country projects and hackathons, taking part in different stages of building technology solutions.",
          "My contributions have covered software architecture, AI agent integration, data processing, and product feature definition, always respecting collective work and each member’s responsibilities.",
        ],
      },
      {
        id: "internship",
        title: "Internship · No Country",
        role: "Partner Intelligence · Analysis and decision systems",
        body: [
          "I took part in building Partner Intelligence, an intelligence platform for evaluating and comparing collaboration opportunities.",
          "My contribution focused on evaluation criteria, source traceability, weight definition, and multicriteria decision logic with AHP and TOPSIS.",
          "The system is deployed with invitation-only access.",
        ],
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
    aboutTitle: "Engenharia de software, dados e inteligência artificial",
    aboutLead:
      "Sou desenvolvedor de software focado em projetar e construir soluções tecnológicas que integram engenharia de software, arquitetura de dados e inteligência artificial para resolver problemas reais.",
    aboutBody:
      "Trabalho ao longo de todo o ciclo de desenvolvimento: desde compreender o problema e definir a solução até projetar arquiteturas, implementar sistemas full-stack, integrar serviços inteligentes e validar seu funcionamento.",
    aboutClose:
      "Tenho interesse em construir tecnologia útil, confiável e sustentável: sistemas que não apenas funcionem, mas que possam evoluir, escalar e gerar valor em ambientes reais.",
    experienceEyebrow: "Experiência",
    experienceTitle: "Construindo tecnologia em diferentes contextos",
    experienceLead:
      "Minha experiência combina o desenvolvimento independente de produtos, a colaboração em equipes multidisciplinares e a aplicação de inteligência artificial e análise de dados em projetos reais.",
    experience: [
      {
        id: "own-products",
        title: "Produtos próprios",
        role: "Desenvolvimento independente · Da ideia à produção",
        body: [
          "Projetei e desenvolvi produtos tecnológicos de forma independente, participando de todo o ciclo de vida: definição do problema, arquitetura, desenvolvimento full-stack, integração de IA, gestão de dados e implantação.",
          "Alguns exemplos incluem assistentes inteligentes, plataformas de informação, sistemas de análise e ferramentas de apoio à tomada de decisão.",
        ],
      },
      {
        id: "collaborative",
        title: "Colaborações",
        role: "Desenvolvimento de software · Equipes multidisciplinares",
        body: [
          "Colaborei em projetos da No Country e hackathons, participando de diferentes etapas do desenvolvimento de soluções tecnológicas.",
          "Minhas contribuições abrangeram arquitetura de software, integração de agentes de IA, processamento de dados e definição de funcionalidades de produto, sempre respeitando o trabalho coletivo e as responsabilidades de cada integrante.",
        ],
      },
      {
        id: "internship",
        title: "Estágio · No Country",
        role: "Partner Intelligence · Análise e sistemas de decisão",
        body: [
          "Participei do desenvolvimento do Partner Intelligence, uma plataforma de inteligência para avaliar e comparar oportunidades de colaboração.",
          "Minha contribuição se concentrou nos critérios de avaliação, na rastreabilidade das fontes, na definição de ponderações e na lógica multicritério de decisão com AHP e TOPSIS.",
          "O sistema está implantado e tem acesso restrito por convite.",
        ],
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
