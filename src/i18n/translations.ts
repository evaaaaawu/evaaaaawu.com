import type { Locale } from "./config";
import { defaultLocale } from "./config";

const ui = {
  en: {
    nav: {
      home: "Home",
      stream: "Stream",
      articles: "Articles",
      projects: "Projects",
      bookshelf: "Bookshelf",
      about: "About",
    },
    toast: {
      noTranslation: "This article is not available in {lang}",
    },
    meta: {
      siteDescription: "Personal site of Eva Wu",
    },
    languageSwitcher: {
      label: "中文",
    },
    languageBanner: {
      message: "這個網站有繁體中文版，要切換嗎？",
      switchAction: "切換到中文",
      dismissLabel: "關閉語言提示",
    },
  },
  "zh-tw": {
    nav: {
      home: "首頁",
      stream: "短分享",
      articles: "文章",
      projects: "專案",
      bookshelf: "書架",
      about: "關於我",
    },
    toast: {
      noTranslation: "這篇文章目前沒有{lang}版",
    },
    languageSwitcher: {
      label: "English",
    },
    languageBanner: {
      message: "這個網站有繁體中文版，要切換嗎？",
      switchAction: "切換到中文",
      dismissLabel: "關閉語言提示",
    },
  },
} as const;

type DeepStringRecord = { readonly [key: string]: string | DeepStringRecord };

function getByDotPath(obj: DeepStringRecord, path: string): string | undefined {
  const keys = path.split(".");
  let current: string | DeepStringRecord = obj;

  for (const key of keys) {
    if (typeof current !== "object" || current === null) return undefined;
    const next: string | DeepStringRecord | undefined = (
      current as DeepStringRecord
    )[key];
    if (next === undefined) return undefined;
    current = next;
  }

  return typeof current === "string" ? current : undefined;
}

export function useTranslations(locale: Locale): (key: string) => string {
  return (key: string): string => {
    const value = getByDotPath(ui[locale] as DeepStringRecord, key);
    if (value !== undefined) return value;

    if (locale !== defaultLocale) {
      const fallback = getByDotPath(ui[defaultLocale] as DeepStringRecord, key);
      if (fallback !== undefined) return fallback;
    }

    return key;
  };
}
