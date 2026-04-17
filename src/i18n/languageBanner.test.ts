import { describe, expect, it } from "vitest";
import { shouldShowBanner } from "./languageBanner";

describe("shouldShowBanner", () => {
  it("shows banner when browser is Chinese, not dismissed, and on English site", () => {
    expect(
      shouldShowBanner({
        navigatorLanguage: "zh-TW",
        dismissed: false,
        currentLocale: "en",
      })
    ).toBe(true);
  });

  it("hides banner when user has dismissed it", () => {
    expect(
      shouldShowBanner({
        navigatorLanguage: "zh-TW",
        dismissed: true,
        currentLocale: "en",
      })
    ).toBe(false);
  });

  it("hides banner when user is already on the Chinese site", () => {
    expect(
      shouldShowBanner({
        navigatorLanguage: "zh-TW",
        dismissed: false,
        currentLocale: "zh-tw",
      })
    ).toBe(false);
  });

  it("hides banner when browser language is not Chinese", () => {
    expect(
      shouldShowBanner({
        navigatorLanguage: "en-US",
        dismissed: false,
        currentLocale: "en",
      })
    ).toBe(false);

    expect(
      shouldShowBanner({
        navigatorLanguage: "ja-JP",
        dismissed: false,
        currentLocale: "en",
      })
    ).toBe(false);
  });

  it.each([
    ["zh"],
    ["zh-CN"],
    ["zh-HK"],
    ["ZH-TW"],
    ["Zh-Hant"],
  ])("recognises %s as Chinese", (lang) => {
    expect(
      shouldShowBanner({
        navigatorLanguage: lang,
        dismissed: false,
        currentLocale: "en",
      })
    ).toBe(true);
  });
});
