import { describe, expect, it } from "vitest";
import { defaultLocale, isLocale, locales } from "../lib/i18n/locales";

describe("locales", () => {
  it("exposes es, en, and pt", () => {
    expect(Object.values(locales)).toEqual(["es", "en", "pt"]);
  });

  it("defaults to es", () => {
    expect(defaultLocale).toBe("es");
  });

  it("accepts es, en, and pt and rejects fr", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});
