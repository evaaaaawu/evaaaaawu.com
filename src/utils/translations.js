const translations = {
  en: {
    site: {
      title: "Eva Wu's Personal Website",
      description: "",
    },
    nav: {
      home: "Home",
      writing: "Writing",
      stream: "Stream",
    },
    common: {
      featured: "Featured",
      outdated: "Outdated",
      allTopics: "All",
      sortBy: "Sort by",
      sortByUpdated: "Updated date",
      sortByPublished: "Published date",
      newestFirst: "Newest first",
      oldestFirst: "Oldest first",
      published: "PUBLISHED",
      updated: "UPDATED",
      skipToContent: "Skip to content",
      menu: "Menu",
    },
    stream: {
      comingSoon:
        "This page is under construction. Stay tuned!",
    },
    footer: {
      copyright: "© 2026 Eva Wu's Personal Website",
    },
  },
  "zh-tw": {
    site: {
      title: "Eva Wu 的個人網站",
      description: "",
    },
    nav: {
      home: "首頁",
      writing: "我的文章",
      stream: "短分享",
    },
    common: {
      featured: "Featured",
      outdated: "Outdated",
      allTopics: "All",
      sortBy: "Sort by",
      sortByUpdated: "Updated date",
      sortByPublished: "Published date",
      newestFirst: "Newest first",
      oldestFirst: "Oldest first",
      published: "PUBLISHED",
      updated: "UPDATED",
      skipToContent: "跳至內容",
      menu: "選單",
    },
    stream: {
      comingSoon: "頁面製作中，敬請期待！",
    },
    footer: {
      copyright: "© 2026 Eva Wu 的個人網站",
    },
  },
};

export function useTranslations(locale) {
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[locale];

    for (const k of keys) {
      if (value && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if translation is missing
      }
    }

    return value;
  };

  return { t };
}
