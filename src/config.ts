export type NavKey =
  | "home"
  | "stream"
  | "articles"
  | "projects"
  | "bookshelf"
  | "about";

export interface NavItem {
  key: NavKey;
  href: string;
  labelEn: string;
  labelZh: string;
  enabled: boolean;
}

export const siteConfig = {
  siteName: "evaaaaawu.com",
  defaultLocale: "en" as const,
  locales: ["en", "zh-tw"] as const,
  nav: [
    { key: "home", href: "/", labelEn: "Home", labelZh: "首頁", enabled: true },
    {
      key: "stream",
      href: "/stream/",
      labelEn: "Stream",
      labelZh: "短分享",
      enabled: false,
    },
    {
      key: "articles",
      href: "/articles/",
      labelEn: "Articles",
      labelZh: "文章",
      enabled: false,
    },
    {
      key: "projects",
      href: "/projects/",
      labelEn: "Projects",
      labelZh: "專案",
      enabled: false,
    },
    {
      key: "bookshelf",
      href: "/bookshelf/",
      labelEn: "Bookshelf",
      labelZh: "書架",
      enabled: false,
    },
    {
      key: "about",
      href: "/about/",
      labelEn: "About",
      labelZh: "關於我",
      enabled: false,
    },
  ] satisfies NavItem[],
} as const;
