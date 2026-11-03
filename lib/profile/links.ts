/**
 * Single source of truth for public professional contact channels.
 * Verified from the author's published portfolio PDF and prior GitHub Pages site.
 */
const PROFILE_LINKS = {
  email: "salces.borges.atlaros@gmail.com",
  emailHref: "mailto:salces.borges.atlaros@gmail.com",
  github: "https://github.com/Atlaros",
  linkedin: "https://www.linkedin.com/in/diego-silvestre-borges-salces",
  cv: "/diego-borges-portfolio.pdf",
  location: {
    es: "Santa Cruz de la Sierra, Bolivia",
    en: "Santa Cruz de la Sierra, Bolivia",
    pt: "Santa Cruz de la Sierra, Bolívia",
  },
} as const;

export { PROFILE_LINKS };
