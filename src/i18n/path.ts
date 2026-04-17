import type { Locale } from "./config";
import { defaultLocale, locales } from "./config";

function stripLocalePrefix(path: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const prefix = `/${locale}/`;
    if (path === prefix || path.startsWith(prefix)) {
      return `/${path.slice(prefix.length)}`;
    }
  }
  return path;
}

export function getLocaleFromPath(path: string): Locale {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (path === `/${locale}/` || path.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return defaultLocale;
}

export function getLocalizedPath(path: string, targetLocale: Locale): string {
  const stripped = stripLocalePrefix(path);

  if (targetLocale === defaultLocale) {
    return stripped;
  }

  return `/${targetLocale}${stripped}`;
}

export interface SwitcherResult {
  path: string;
  needsToast: boolean;
}

export function getSwitcherTarget(
  currentPath: string,
  targetLocale: Locale,
  existingPaths: Set<string>
): SwitcherResult {
  const targetPath = getLocalizedPath(currentPath, targetLocale);

  if (existingPaths.has(targetPath)) {
    return { path: targetPath, needsToast: false };
  }

  const targetHome = targetLocale === defaultLocale ? "/" : `/${targetLocale}/`;
  return { path: targetHome, needsToast: true };
}
