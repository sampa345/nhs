import { notFound } from 'next/navigation';
import { BLOG_ARTICLES, getBlogArticleBySlug } from '@/data/articles';
import { BlogArticleTemplate } from '@/components/blog/BlogArticleTemplate';
import { buildPageMetadata } from '@/lib/seo/config';

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/blog/${article.slug}/`,
    type: 'article',
    image: {
      url: article.featuredImage.src,
      alt: article.featuredImage.alt,
      width: article.featuredImage.width,
      height: article.featuredImage.height,
    },
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) notFound();
  return <BlogArticleTemplate article={article} />;
}
