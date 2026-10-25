import test from 'node:test';
import assert from 'node:assert/strict';
import { paginateArticles, filterArticles, calculateEdpi, Article } from './blogUtils';

const mockArticle = (id: string, keyword: string, category: Article['category']): Article => ({
  id,
  slug: `slug-${id}`,
  keyword,
  title: `Title for ${keyword}`,
  category,
  categoryLabel: category === 'pc-console' ? 'PC & Console' : 'Esports & Tactics',
  excerpt: `Deep guide for ${keyword}`,
  readTime: '6 min read',
  wordCount: 1400,
  author: { name: 'Sagheer Tech', role: 'Hardware Lead', avatarInitials: 'ST' },
  publishDate: 'Oct 2026',
  hardwareTags: ['RTX 4070', '144Hz'],
  difficulty: 'Intermediate',
  infographicType: 'pc-build',
  imageAsset: '/assets/aistudio/best_gaming_pc_build_for_beginners_6fa1d005.jpg',
  buyingGuide: {
    mainHeading: 'TEST BUYING GUIDE 2026',
    subHeading: 'DESIGN, PERFORMANCE, AND KEY FEATURES IN 2026',
    centerpieceDescription: '3D model',
    panels: {
      topLeft: { title: 'TL', bullets: ['B1', 'B2'] },
      midLeft: { title: 'ML', bullets: ['B1', 'B2'] },
      bottomLeft: { title: 'BL', bullets: ['B1', 'B2'] },
      topRight: { title: 'TR', bullets: ['B1', 'B2'] },
      midRight: { title: 'MR', bullets: ['B1', 'B2'] },
      bottomRight: { title: 'BR', bullets: ['B1', 'B2'] },
    },
  },
  content: {
    intro: 'Intro text',
    quickStats: [{ label: 'Performance', value: '+30%' }],
    steps: [{ title: 'Step 1', detail: 'Do something' }],
    proTips: ['Tip 1'],
    verdict: 'Final verdict',
  },
});

test('paginateArticles correctly enforces 12 items on page 1 and 8 on page 2 for 20 items', () => {
  const articles: Article[] = Array.from({ length: 20 }, (_, i) =>
    mockArticle(`art-${i + 1}`, `keyword-${i + 1}`, 'pc-console')
  );

  const page1 = paginateArticles(articles, 1);
  assert.equal(page1.totalPages, 2);
  assert.equal(page1.currentPage, 1);
  assert.equal(page1.articles.length, 12);
  assert.equal(page1.articles[0].id, 'art-1');
  assert.equal(page1.articles[11].id, 'art-12');

  const page2 = paginateArticles(articles, 2);
  assert.equal(page2.totalPages, 2);
  assert.equal(page2.currentPage, 2);
  assert.equal(page2.articles.length, 8);
  assert.equal(page2.articles[0].id, 'art-13');
  assert.equal(page2.articles[7].id, 'art-20');
});

test('paginateArticles handles bounds and empty arrays safely', () => {
  const empty = paginateArticles([], 1);
  assert.equal(empty.articles.length, 0);
  assert.equal(empty.totalPages, 1);

  const single = paginateArticles([mockArticle('1', 'pc', 'pc-console')], 5);
  assert.equal(single.currentPage, 1);
  assert.equal(single.articles.length, 1);
});

test('filterArticles matches keyword, category and tags correctly', () => {
  const articles: Article[] = [
    mockArticle('1', 'how to optimize pc for gaming', 'pc-console'),
    mockArticle('2', 'how to improve aim in fps games', 'esports-tactics'),
    mockArticle('3', 'how to fix game lag on pc', 'pc-console'),
  ];

  const searchLag = filterArticles(articles, 'lag', 'all');
  assert.equal(searchLag.length, 1);
  assert.equal(searchLag[0].id, '3');

  const esportsCategory = filterArticles(articles, '', 'esports-tactics');
  assert.equal(esportsCategory.length, 1);
  assert.equal(esportsCategory[0].id, '2');

  const categoryAndSearch = filterArticles(articles, 'aim', 'pc-console');
  assert.equal(categoryAndSearch.length, 0);
});

test('calculateEdpi gives accurate calculations and bracket ratings', () => {
  const low = calculateEdpi(800, 0.3); // 240
  assert.equal(low.edpi, 240);
  assert.equal(low.bracket, 'Low Sens (Arm Aim)');

  const med = calculateEdpi(800, 0.4); // 320
  assert.equal(med.edpi, 320);
  assert.equal(med.bracket, 'Medium Sens (Hybrid)');

  const high = calculateEdpi(1600, 0.5); // 800
  assert.equal(high.edpi, 800);
  assert.equal(high.bracket, 'High Sens (Wrist Aim)');
});

test('ARTICLES_DATA contains exactly 20 articles with 5 per category and page 1 has 12, page 2 has 8', async () => {
  const { ARTICLES_DATA } = await import('./blogData');
  assert.equal(ARTICLES_DATA.length, 20);

  const pcConsole = ARTICLES_DATA.filter((a) => a.category === 'pc-console');
  const mobile = ARTICLES_DATA.filter((a) => a.category === 'mobile-emulation');
  const esports = ARTICLES_DATA.filter((a) => a.category === 'esports-tactics');
  const hardware = ARTICLES_DATA.filter((a) => a.category === 'hardware-setup');

  assert.equal(pcConsole.length, 5);
  assert.equal(mobile.length, 5);
  assert.equal(esports.length, 5);
  assert.equal(hardware.length, 5);

  const p1 = paginateArticles(ARTICLES_DATA, 1);
  assert.equal(p1.articles.length, 12);
  const p2 = paginateArticles(ARTICLES_DATA, 2);
  assert.equal(p2.articles.length, 8);
});

