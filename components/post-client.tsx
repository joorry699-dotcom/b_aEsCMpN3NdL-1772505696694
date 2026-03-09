"use client"

import Image from "next/image"
import { BlogPost } from "@/lib/blog"
import { useLanguage } from "./language-provider"
import Navbar from "./navbar"
import Footer from "./footer"
import VideoSection from "./video-section"

interface PostClientProps {
  post: BlogPost
}

export default function PostClient({ post }: PostClientProps) {
  const { locale } = useLanguage()
  const title = locale === "ar" ? post.title_ar : post.title_en
  const content = locale === "ar" ? post.content_ar : post.content_en
  const isHrPost = post.slug.startsWith("hr-")
  const showVideo = false

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] text-white pt-32 pb-20">
        <article className="relative mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <div className="absolute -top-16 right-20 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
          <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

          <div className="relative mb-12 flex flex-col items-center text-center">
            <time className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7ad8ff]">{post.date}</time>
            <h1 className="mb-4 text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight tracking-tight text-white">
              {title}
            </h1>
          </div>

          {post.image && (
            <div className="relative mb-12 h-[280px] md:h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)]">
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
            className="relative rounded-2xl border border-white/10 bg-white/[0.04] px-4 md:px-10 py-8 prose prose-lg prose-invert max-w-none leading-loose text-white/85 prose-headings:text-white prose-a:text-[#7ad8ff] prose-strong:text-white prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="relative mt-16 flex items-center justify-center border-t border-white/10 pt-10">
            <button
              onClick={() => window.history.back()}
              className="rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-8 py-3 text-sm font-semibold text-[#0b182f] transition-all hover:shadow-[0_18px_40px_-28px_rgba(34,211,238,0.8)] hover:-translate-y-0.5"
            >
              {locale === "ar" ? "العودة للمدونات" : "Back to Blogs"}
            </button>
          </div>
        </article>

        {showVideo ? null : null}
      </main>
      <Footer />
    </>
  )
}
