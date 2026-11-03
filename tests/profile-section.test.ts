import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { profileCopy } from "@/lib/i18n/profile";
import { PROFILE_LINKS } from "@/lib/profile/links";

describe("profile and contact", () => {
  it("exposes verified contact channels without a form", () => {
    expect(PROFILE_LINKS.email).toBe("salces.borges.atlaros@gmail.com");
    expect(PROFILE_LINKS.emailHref).toBe("mailto:salces.borges.atlaros@gmail.com");
    expect(PROFILE_LINKS.github).toBe("https://github.com/Atlaros");
    expect(PROFILE_LINKS.linkedin).toBe(
      "https://www.linkedin.com/in/diego-silvestre-borges-salces",
    );
    expect(PROFILE_LINKS.cv).toBe("/diego-borges-portfolio.pdf");
  });

  it("names about, experience, and contact in es, en, and pt", () => {
    expect(profileCopy.es.navAbout).toBe("Sobre mí");
    expect(profileCopy.en.navAbout).toBe("About");
    expect(profileCopy.pt.navAbout).toBe("Sobre mim");
    expect(profileCopy.es.navContact).toBe("Contacto");
    expect(profileCopy.en.navContact).toBe("Contact");
    expect(profileCopy.pt.navContact).toBe("Contato");
    expect(profileCopy.es.experience.map((item) => item.id)).toEqual([
      "own-products",
      "collaborative",
      "internship",
    ]);
  });

  it("keeps experience honest about collaboration and internship scope", () => {
    const joined = JSON.stringify(profileCopy);
    expect(joined).toMatch(/Partner Intelligence/);
    expect(joined).toMatch(/No Country/);
    expect(joined.toLowerCase()).toMatch(/contrib|particip/);
    expect(joined).not.toMatch(/CEO|Founder at|años en Google|Google Staff/i);
  });

  it("wires profile after capabilities and header anchors without editing Hero", () => {
    const page = readFileSync("app/[locale]/page.tsx", "utf8");
    const header = readFileSync("components/layout/SiteHeader.tsx", "utf8");
    const section = readFileSync("components/profile/ProfileSection.tsx", "utf8");

    expect(page.indexOf("<Capabilities")).toBeGreaterThan(-1);
    expect(page.indexOf("<CopilotPanel")).toBeGreaterThan(page.indexOf("<Capabilities"));
    expect(page.indexOf("<ProfileSection")).toBeGreaterThan(page.indexOf("<CopilotPanel"));
    expect(header).toContain("#about");
    expect(header).toContain("#contact");
    expect(section).toContain('id="about"');
    expect(section).toContain('id="experience"');
    expect(section).toContain('id="contact"');
    expect(section).not.toContain("<form");
    expect(section).toContain("PROFILE_LINKS");
    expect(profileCopy.es.cvLabel).toBe("PDF del portafolio");
    expect(profileCopy.en.cvLabel).toBe("Portfolio PDF");
    expect(profileCopy.pt.cvLabel).toBe("PDF do portfólio");
  });

  it("keeps profile and experience MDX as draft placeholders", () => {
    const profile = readFileSync("content/profile.mdx", "utf8");
    const experience = readFileSync("content/experience.mdx", "utf8");
    expect(profile).toMatch(/status:\s*"draft"/);
    expect(experience).toMatch(/status:\s*"draft"/);
    expect(profile).not.toMatch(/status:\s*"published"/);
    expect(experience).not.toMatch(/status:\s*"published"/);
  });
});

