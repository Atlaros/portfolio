import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { homeCopy } from "../lib/i18n/home";
import { productStageCopy } from "../lib/i18n/product-stage";
import { locales, type Locale } from "../lib/i18n/locales";

describe("home headline", () => {
  it("uses the approved solid headline in es, en, and pt", () => {
    expect(homeCopy.es.line1).toBe("Software, datos e inteligencia artificial");
    expect(homeCopy.es.line2).toBe("convertidos en soluciones reales.");
    expect(homeCopy.en.line1).toBe("Software, data, and artificial intelligence");
    expect(homeCopy.en.line2).toBe("turned into working solutions.");
    expect(homeCopy.pt.line1).toBe("Software, dados e inteligência artificial");
    expect(homeCopy.pt.line2).toBe("convertidos em soluções reais.");
  });
});

describe("productStageCopy", () => {
  it("gives each locale three different scenes", () => {
    for (const locale of Object.values(locales) as Locale[]) {
      const frames = productStageCopy[locale].scenes.map((scene) => scene.frame);
      expect(frames).toEqual(["pipeline", "catalog", "criteria"]);
    }
  });

  it("uses the exploration chrome without live-execution claims", () => {
    expect(productStageCopy.es.eyebrow.toLowerCase()).toContain("explora");
    expect(productStageCopy.es.title).toBe("De la información al resultado.");
    expect(productStageCopy.es.instruction.toLowerCase()).toContain("explora");
    expect(productStageCopy.es.note.toLowerCase()).toContain("no procesan datos en vivo");
    expect(productStageCopy.es.stagePanelLabel.toLowerCase()).toContain("etapa");
    expect(productStageCopy.en.stagePanelLabel.toLowerCase()).toContain("selected");
    expect(productStageCopy.en.eyebrow.toLowerCase()).toContain("explore");
    expect(productStageCopy.pt.eyebrow.toLowerCase()).toContain("explore");
  });

  it("keeps published facts and drops the mockup's invented figures", () => {
    const joined = Object.values(productStageCopy)
      .map((copy) => JSON.stringify(copy))
      .join("\n");

    expect(productStageCopy.es.scenes[0].caption).toContain("Alcaldía");
    expect(productStageCopy.es.scenes[1].caption.toLowerCase()).toContain("no es un agente");
    expect(productStageCopy.es.scenes[1].caption.toLowerCase()).toContain("ec2");
    expect(productStageCopy.es.scenes[1].caption.toLowerCase()).toContain("catálogo local");
    expect(productStageCopy.es.scenes[1].caption.toLowerCase()).not.toContain("corre en local");
    expect(productStageCopy.es.scenes[2].lines.join(" ")).toContain("AHP/TOPSIS");
    expect(joined).not.toContain("1050");
    expect(joined).not.toContain("10-15");
    expect(joined).not.toContain("Requisitos");
    expect(joined).not.toContain("Piloto activo");
  });

  it("models TramitIA as a fork with optional web orientation aside", () => {
    const tramit = productStageCopy.es.scenes[0];
    const ids = tramit.nodes.map((node) => node.id);
    expect(ids).toEqual(["consulta", "rag", "control", "disponible", "insuficiente", "web"]);
    expect(tramit.architecture.join(" ")).toContain("LangGraph");
    expect(tramit.links).toEqual(
      expect.arrayContaining([
        { from: "control", to: "disponible" },
        { from: "control", to: "insuficiente" },
        { from: "insuficiente", to: "web" },
      ]),
    );
    expect(tramit.links).not.toContainEqual({ from: "disponible", to: "insuficiente" });
    expect(tramit.links).not.toContainEqual({ from: "disponible", to: "web" });
  });

  it("splits AcademIA normalization from editorial catalog without auto claims", () => {
    const academ = productStageCopy.es.scenes[1];
    expect(academ.nodes.map((node) => node.id)).toEqual([
      "fuentes",
      "normalizacion",
      "catalogo",
      "exploracion",
      "comparacion",
    ]);
    expect(academ.links).toEqual(
      expect.arrayContaining([
        { from: "fuentes", to: "normalizacion" },
        { from: "normalizacion", to: "catalogo" },
        { from: "catalogo", to: "exploracion" },
        { from: "exploracion", to: "comparacion" },
      ]),
    );
    const blob = JSON.stringify(academ).toLowerCase();
    expect(blob).not.toContain("demo pública confirmada");
    expect(blob).toContain("no es un agente");
    expect(blob).toContain("revisión editorial");
    expect(blob).not.toContain("totalmente automático");
    const catalogo = academ.nodes.find((node) => node.id === "catalogo");
    const fuentes = academ.nodes.find((node) => node.id === "fuentes");
    expect(catalogo !== undefined && "tech" in catalogo && catalogo.tech).toBe("PostgreSQL");
    expect(fuentes !== undefined && "tech" in fuentes).toBe(false);
  });

  it("connects Partner scoring and leaves the language model outside the rank", () => {
    const partner = productStageCopy.es.scenes[2];
    expect(partner.nodes.some((node) => node.id === "modelo")).toBe(true);
    expect(partner.nodes.some((node) => node.id === "priorizacion")).toBe(true);
    expect(JSON.stringify(partner.links)).not.toContain("modelo");
    expect(partner.nodes.find((node) => node.id === "modelo")?.happens.toLowerCase()).toContain(
      "no determina los puntajes",
    );
    expect(partner.nodes.find((node) => node.id === "ahp")?.happens.toLowerCase()).toContain("encaje");
    expect(partner.nodes.find((node) => node.id === "ahp")?.happens.toLowerCase()).toContain("oportunidad");
    expect(partner.architecture.join(" ").toLowerCase()).toContain("invitación");
  });

  it("states an engineering decision on every scene without inventing metrics", () => {
    expect(productStageCopy.es.decisionLabel.toLowerCase()).toContain("decisión");
    expect(productStageCopy.en.decisionLabel.toLowerCase()).toContain("decision");
    expect(productStageCopy.pt.decisionLabel.toLowerCase()).toContain("decisão");

    for (const locale of Object.values(locales) as Locale[]) {
      for (const scene of productStageCopy[locale].scenes) {
        expect(scene.decision.length).toBeGreaterThan(40);
        expect(scene.decision.length).toBeLessThan(220);
      }
    }

    expect(productStageCopy.es.scenes[0].decision.toLowerCase()).toContain("ficha");
    expect(productStageCopy.es.scenes[1].decision.toLowerCase()).toContain("no es un agente");
    expect(productStageCopy.es.scenes[2].decision.toLowerCase()).toContain("ahp/topsis");
    expect(JSON.stringify(productStageCopy).toLowerCase()).not.toContain("1050");
  });

  it("exposes a documented architecture strip on every scene", () => {
    expect(productStageCopy.es.architectureLabel.toLowerCase()).toContain("arquitectura");
    for (const locale of Object.values(locales) as Locale[]) {
      for (const scene of productStageCopy[locale].scenes) {
        expect(scene.architecture.length).toBeGreaterThanOrEqual(3);
      }
    }
    expect(productStageCopy.es.scenes[1].architecture.join(" ")).toContain("Supabase Auth");
    expect(productStageCopy.es.scenes[0].architecture.join(" ")).toContain("pgvector");
  });

  it("gives every node compact happens/why copy and stage-specific tech only when set", () => {
    for (const locale of Object.values(locales) as Locale[]) {
      for (const scene of productStageCopy[locale].scenes) {
        for (const node of scene.nodes) {
          expect(node.happens.length).toBeGreaterThan(20);
          expect(node.why.length).toBeGreaterThan(20);
          expect(node.happens.length).toBeLessThan(180);
          expect(node.why.length).toBeLessThan(180);
        }
      }
    }

    const academ = JSON.stringify(productStageCopy.es.scenes[1]).toLowerCase();
    expect(academ).not.toMatch(/\brag\b/);
    expect(academ).toContain("no es un agente");

    const tramitRag = productStageCopy.es.scenes[0].nodes.find((node) => node.id === "rag");
    expect(tramitRag !== undefined && "tech" in tramitRag && String(tramitRag.tech).toLowerCase()).toContain(
      "pgvector",
    );
    const insuficiente = productStageCopy.es.scenes[0].nodes.find((node) => node.id === "insuficiente");
    expect(insuficiente !== undefined && "tech" in insuficiente).toBe(false);
  });
});

describe("home composition", () => {
  it("puts the product stage in the hero and the projects before capabilities", () => {
    const hero = readFileSync("components/hero/Hero.tsx", "utf8");
    const page = readFileSync("app/[locale]/page.tsx", "utf8");
    const heroAt = page.indexOf("<Hero");
    const projectsAt = page.indexOf("<FeaturedProjects");
    const capabilitiesAt = page.indexOf("<Capabilities");

    const stage = readFileSync("components/hero/ProductStage.tsx", "utf8");

    expect(hero).toContain("ProductStage");
    expect(hero).toContain("xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]");
    expect(hero).not.toContain("xl:mt-auto");
    expect(hero).not.toContain("min-[1280px]:items-center");
    expect(hero).not.toContain("sm:text-5xl");
    expect(hero).not.toContain("lg:flex-row");
    expect(hero).not.toContain("min-[1180px]:flex-row");
    expect(hero).not.toContain("lg:text-6xl");
    expect(stage).toContain("<line");
    expect(stage).toContain("aria-pressed");
    expect(stage).toContain("useEntranceEnabled");
    expect(stage).toContain("OUTCOME_NODES");
    expect(stage).toContain("activePath");
    expect(stage).toContain("forkBranchKeys");
    expect(stage).toContain("ArchitectureStrip");
    expect(stage).toContain("stagePanelLabel");
    expect(stage).toContain("lg:grid-cols-[minmax(0,1.05fr)_minmax(13.5rem,0.95fr)]");
    expect(stage).not.toContain("NodeMotif");
    expect(stage).not.toContain("max-w-[34rem]");
    expect(stage).not.toContain("h-80");
    expect(hero).not.toContain("HeroFlow");
    expect(heroAt).toBeGreaterThan(-1);
    expect(projectsAt).toBeGreaterThan(heroAt);
    expect(capabilitiesAt).toBeGreaterThan(projectsAt);
  });
});
