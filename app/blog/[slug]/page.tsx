import { notFound } from "next/navigation"
import PostClient from "@/components/post-client"
import { getAllSlugs, getPostBySlug } from "@/lib/blog"

export const dynamic = "force-dynamic"
export const revalidate = 0

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const rawSlug = params.slug || ""
  const normalizedSlug = decodeURIComponent(rawSlug.trim().replace(/\/+/g, "/")).replace(/\/+$/, "")
  const post = getPostBySlug(normalizedSlug)

  if (!post) {
    notFound()
  }

  return <PostClient post={post} />
}
