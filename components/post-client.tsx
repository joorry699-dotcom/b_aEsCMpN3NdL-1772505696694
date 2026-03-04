"use client"

import Image from "next/image"
import { BlogPost } from "@/lib/blog"
import { useLanguage } from "./language-provider"

interface PostClientProps {
  post: BlogPost
}

export default function PostClient({ post }: PostClientProps) {
  const { locale } = useLanguage()
  const title = locale === "ar" ? post.title_ar : post.title_en
  const content = locale === "ar" ? post.content_ar : post.content_en

  return (
    <article className="mx-auto min-h-screen bg-black px-6 py-20 text-white">
      <div className="mb-12 flex flex-col items-center">
        <time className="mb-4 font-medium text-teal-400">{post.date}</time>
        <h1 className="mb-6 text-center text-5xl font-extrabold leading-tight tracking-tight">{title}</h1>
      </div>

      {post.image && (
        <div className="relative mb-12 h-[450px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div
        className="prose prose-lg prose-invert max-w-none px-4 leading-loose text-gray-300 md:px-12
          prose-headings:text-white prose-a:text-teal-400 prose-strong:text-white prose-p:mb-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="mt-16 flex items-center justify-center border-t border-white/10 pt-12">
        <button
          onClick={() => window.history.back()}
          className="rounded-full bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:text-teal-400"
        >
          {locale === "ar" ? "← العودة للمدونة" : "← Back to Blog"}
        </button>
      </div>
    </article>
  )}
