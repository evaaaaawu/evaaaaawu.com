const translations = {
  "en": {
    site: {
      title: "Eva Wu's Tech Blog",
      description: "This is my personal tech blog, primarily dedicated to programming study notes and software/digital-related content. In the long term, I will also write other broader software/digital content and share my personal life.",
      info1: "Continue scrolling down to see my recommended articles.",
      info2: "If you want to choose articles by topic, click the \"Tags\" page.",
      info3: "If you want to browse all of my articles, click the \"Articles\" page.",
      info4: "If you want to learn more about me, click the \"About\" page."
    },
    nav: {
      home: "Home",
      tags: "Tags",
      articles: "Articles",
      about: "About"
    },
    common: {
      readMore: "Read Full Article",
      featured: "Featured articles",
      skipToContent: "Skip to content",
      menu: "Menu"
    },
    articles: {
      all: "All articles",
      tagged: "All articles tagged with"
    },
    footer: {
      copyright: "© 2025 Eva Wu's Tech Blog"
    }
  },
  "zh-tw": {
    site: {
      title: "Eva Wu 的技術部落格",
      description: "歡迎來到我的個人部落格，目前這裡主要會分享我的程式/技術學習筆記。長期規劃上，我也會撰寫其他更廣泛的軟體/數位相關內容和分享我的個人生活。",
      info1: "繼續往下滑可以看到我推薦的精選文章。",
      info2: "如果想要依主題選擇文章，可以點擊「主題文章」頁面。",
      info3: "如果想要瀏覽我的所有文章，可以點擊「所有文章」頁面。",
      info4: "如果想要了解關於我的資訊，歡迎點擊「關於我」頁面。"
    },
    nav: {
      home: "首頁",
      tags: "主題文章",
      articles: "所有文章",
      about: "關於我"
    },
    common: {
      readMore: "閱讀全文",
      featured: "精選文章",
      skipToContent: "跳至內容",
      menu: "選單"
    },
    articles: {
      all: "所有文章",
      tagged: "的所有主題文章"
    },
    footer: {
      copyright: "© 2025 Eva Wu 的技術部落格"
    }
  }
};

export function useTranslations(locale) {
  const t = (key) => {
    const keys = key.split('.');
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
