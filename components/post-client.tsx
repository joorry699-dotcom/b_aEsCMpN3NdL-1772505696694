"use client"

import Image from "next/image"
import { BlogPost } from "@/lib/blog"
import { useLanguage } from "./language-provider"
import Navbar from "./navbar"
import Footer from "./footer"

interface PostClientProps {
  post: BlogPost
}

export default function PostClient({ post }: PostClientProps) {
  const { locale } = useLanguage()
  const title = locale === "ar" ? post.title_ar : post.title_en
  const content = locale === "ar" ? post.content_ar : post.content_en

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8fafc] text-slate-800 pt-32 pb-20">
        <article className="mx-auto max-w-4xl px-6">
          <div className="mb-12 flex flex-col items-center">
            <time className="mb-4 font-medium text-cyan-600">{post.date}</time>
            <h1 className="mb-6 text-center text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-[#0c1e3c]">
              {title}
            </h1>
          </div>

          {post.image && (
            <div className="relative mb-16 h-[300px] md:h-[450px] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
              <Image
                src={post.image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none px-4 md:px-12 leading-loose text-slate-700
              prose-headings:text-[#0c1e3c] prose-a:text-cyan-600 prose-strong:text-[#0c1e3c] prose-p:mb-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-20 flex items-center justify-center border-t border-slate-200 pt-12">
            <button
              onClick={() => window.history.back()}
              className="rounded-full bg-[#0c1e3c] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-cyan-700 hover:-translate-y-1"
            >
              {locale === "ar" ? "← العودة لجميع المدونات" : "← Back to all Blogs"}
            </button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
