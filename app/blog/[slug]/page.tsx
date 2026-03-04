import { notFound } from "next/navigation"
import PostClient from "@/components/post-client"
import { getAllSlugs, getPostBySlug } from "@/lib/blog"

export const dynamic = "force-static"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <PostClient post={post} />
}
