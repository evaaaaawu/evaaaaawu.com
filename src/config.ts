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
  enabled: boolean;
}

export const siteConfig = {
  siteName: "evaaaaawu.com",
  nav: [
    { key: "home", href: "/", enabled: true },
    { key: "stream", href: "/stream/", enabled: false },
    { key: "articles", href: "/articles/", enabled: false },
    { key: "projects", href: "/projects/", enabled: false },
    { key: "bookshelf", href: "/bookshelf/", enabled: false },
    { key: "about", href: "/about/", enabled: false },
  ] satisfies NavItem[],
} as const;
