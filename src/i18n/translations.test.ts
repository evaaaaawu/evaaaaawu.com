import { describe, it, expect } from "vitest";
import { useTranslations } from "./translations";

describe("useTranslations", () => {
  it("returns the correct translation for the given locale", () => {
    const t = useTranslations("zh-tw");

    expect(t("nav.home")).toBe("首頁");
  });

  it("resolves dot-notation keys to nested values", () => {
    const tEn = useTranslations("en");
    const tZh = useTranslations("zh-tw");

    expect(tEn("nav.articles")).toBe("Articles");
    expect(tZh("nav.articles")).toBe("文章");
    expect(tEn("nav.about")).toBe("About");
    expect(tZh("nav.about")).toBe("關於我");
  });

  it("falls back to defaultLocale when key is missing in target locale", () => {
    const t = useTranslations("zh-tw");

    // languageSwitcher.label exists in both, but nav keys are shared;
    // test fallback with a key that only exists in EN
    expect(t("meta.siteDescription")).toBe("Personal site of Eva Wu");
  });

  it("returns the key itself when missing in both locales", () => {
    const t = useTranslations("zh-tw");

    expect(t("nonexistent.deep.key")).toBe("nonexistent.deep.key");
  });
});
