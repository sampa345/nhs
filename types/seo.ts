export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  subsections?: {
    id: string;
    heading: string;
    paragraphs: string[];
  }[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedDate: string;
  lastUpdated: string;
  readTime: string;
  categoryLabel: string;
  authorNote: string;
  featuredImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  intro: string;
  sections: ArticleSection[];
  exampleBox: {
    title: string;
    summary: string;
    steps: string[];
  };
  relatedCalculators: string[];
  relatedCategory: string;
  relatedArticles: string[];
  officialSources: {
    title: string;
    publisher: string;
    url: string;
  }[];
}
