export interface InfographicPanel {
  title: string;
  bullets: [string, string];
}

export interface InfographicGuideData {
  mainHeading: string;
  subHeading: string;
  centerpieceDescription: string;
  panels: {
    topLeft: InfographicPanel;
    midLeft: InfographicPanel;
    bottomLeft: InfographicPanel;
    topRight: InfographicPanel;
    midRight: InfographicPanel;
    bottomRight: InfographicPanel;
  };
}

export interface Article {
  id: string;
  slug: string;
  keyword: string; // The exact target keyword
  title: string;
  category: 'pc-console' | 'mobile-emulation' | 'esports-tactics' | 'hardware-setup';
  categoryLabel: string;
  excerpt: string;
  readTime: string;
  wordCount: number;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  publishDate: string;
  hardwareTags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Pro';
  infographicType:
    | 'pc-build'
    | 'optimization'
    | 'controller-pc'
    | 'graphics'
    | 'lag-fix'
    | 'android-pc'
    | 'coop-mobile'
    | 'mobile-fps'
    | 'emulator'
    | 'mobile-controller'
    | 'aim-guide'
    | 'competitive'
    | 'mouse-sens'
    | 'esports-comm'
    | 'pro-gamer'
    | 'monitor-guide'
    | 'keyboard-guide'
    | 'headset-guide'
    | 'dual-monitor'
    | 'pc-cooling';
  buyingGuide: InfographicGuideData;
  imageAsset: string;
  imagePrompt?: string;
  content: {
    intro: string;
    quickStats: { label: string; value: string }[];
    deepDiveSections?: { title: string; content: string }[];
    steps: { title: string; detail: string; tip?: string }[];
    proTips: string[];
    benchmarkData?: { benchmark: string; before: string; after: string; gain: string }[];
    troubleshooting?: { problem: string; solution: string }[];
    verdict: string;
  };
}

export function paginateArticles(
  items: Article[],
  page: number,
  pageSizeConfig?: { page1Size: number; page2Size: number }
): { articles: Article[]; totalPages: number; currentPage: number; totalCount: number } {
  const page1Size = pageSizeConfig?.page1Size ?? 12;
  const page2Size = pageSizeConfig?.page2Size ?? 8;
  const totalCount = items.length;

  if (totalCount === 0) {
    return { articles: [], totalPages: 1, currentPage: 1, totalCount: 0 };
  }

  // Exact 2-page flow requested: Page 1 = first 12, Page 2 = remaining 8
  const totalPages = totalCount <= page1Size ? 1 : Math.ceil((totalCount - page1Size) / page2Size) + 1;
  const validPage = Math.max(1, Math.min(page, totalPages));

  let start = 0;
  let end = page1Size;

  if (validPage === 1) {
    start = 0;
    end = Math.min(page1Size, totalCount);
  } else {
    start = page1Size + (validPage - 2) * page2Size;
    end = Math.min(start + page2Size, totalCount);
  }

  const articles = items.slice(start, end);
  return {
    articles,
    totalPages,
    currentPage: validPage,
    totalCount,
  };
}

export function filterArticles(
  articles: Article[],
  query: string,
  category: string
): Article[] {
  const cleanQuery = query.trim().toLowerCase();

  return articles.filter((art) => {
    const matchesCategory =
      !category || category === 'all' || art.category === category;

    if (!matchesCategory) return false;
    if (!cleanQuery) return true;

    const inKeyword = art.keyword.toLowerCase().includes(cleanQuery);
    const inTitle = art.title.toLowerCase().includes(cleanQuery);
    const inExcerpt = art.excerpt.toLowerCase().includes(cleanQuery);
    const inTags = art.hardwareTags.some((t) => t.toLowerCase().includes(cleanQuery));
    const inCategory = art.categoryLabel.toLowerCase().includes(cleanQuery);

    return inKeyword || inTitle || inExcerpt || inTags || inCategory;
  });
}

export function calculateEdpi(dpi: number, inGameSens: number): {
  edpi: number;
  bracket: 'Low Sens (Arm Aim)' | 'Medium Sens (Hybrid)' | 'High Sens (Wrist Aim)';
  recommendation: string;
} {
  const safeDpi = Math.max(100, Math.min(32000, dpi || 800));
  const safeSens = Math.max(0.01, Math.min(50, inGameSens || 1.0));
  const edpi = Math.round(safeDpi * safeSens * 100) / 100;

  if (edpi < 280) {
    return {
      edpi,
      bracket: 'Low Sens (Arm Aim)',
      recommendation: 'Exceptional for CS2 and Valorant tactical shooters. Requires large desk space (450mm+ mousepad).',
    };
  } else if (edpi <= 420) {
    return {
      edpi,
      bracket: 'Medium Sens (Hybrid)',
      recommendation: 'Sweet spot for pro esports players. Balances snappy 180° turns with pinpoint micro-corrections.',
    };
  } else {
    return {
      edpi,
      bracket: 'High Sens (Wrist Aim)',
      recommendation: 'Great for fast tracking shooters (Overwatch 2, Apex Legends). Watch out for wrist fatigue.',
    };
  }
}
