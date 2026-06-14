import type { Locale } from "./config";

export const BANNER_DISMISSED_KEY = "lang-banner-dismissed";

interface ShouldShowBannerInput {
  readonly navigatorLanguage: string;
  readonly dismissed: boolean;
  readonly currentLocale: Locale;
}

export function shouldShowBanner(input: ShouldShowBannerInput): boolean {
  if (input.dismissed) return false;
  if (input.currentLocale === "zh-tw") return false;
  if (!input.navigatorLanguage.toLowerCase().startsWith("zh")) return false;
  return true;
}
