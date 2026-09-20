export const insightArticles = [
  {
    slug: 'how-much-does-a-website-cost-in-india',
    title: 'How Much Does a Website Cost in India?',
    description: 'A practical breakdown of website pricing in India, the choices that affect cost, and how to compare agency proposals with confidence.',
    category: 'Website planning',
    readingTime: '8 min read',
  },
  {
    slug: 'how-long-does-it-take-to-build-a-business-website',
    title: 'How Long Does It Take to Build a Business Website?',
    description: 'Understand realistic website timelines, what tends to delay a project, and how good preparation helps a team launch sooner.',
    category: 'Project delivery',
    readingTime: '7 min read',
  },
  {
    slug: 'website-vs-custom-software',
    title: 'Website vs Custom Software: What Does Your Business Actually Need?',
    description: 'A clear way to decide whether your next digital investment should explain and sell, automate a workflow, or do both.',
    category: 'Digital strategy',
    readingTime: '8 min read',
  },
] as const;

export type InsightArticle = (typeof insightArticles)[number];
