import blogData from "../data/blog.json"

export interface BlogPost {
  slug: string
  title_ar: string
  title_en: string
  date: string
  excerpt_ar: string
  excerpt_en: string
  image: string
  content_ar: string
  content_en: string
}

// JSON is typed as any by default, cast safely
export const posts: BlogPost[] = blogData as BlogPost[]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug)
}
