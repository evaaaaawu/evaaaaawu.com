export const locales = ["en", "zh-tw"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const prefixDefaultLocale = false;
