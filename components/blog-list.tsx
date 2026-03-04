"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { posts, type BlogPost } from "@/lib/blog"

export function BlogList() {
  const { locale } = useLanguage()
  const { ref, isVisible } = useScrollReveal()
  const blogs: BlogPost[] = posts
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  if (blogs.length === 0) return null

  return (
    <section
      id="latest-news"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-30 text-white"
    >
      <div className="absolute -top-10 right-14 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {locale === "ar" ? "آخر الأخبار" : "Latest news"}
          </div>
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-[40px]">
            {locale === "ar" ? "آخر الأخبار والمقالات" : "Latest News & Articles"}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70">
            {locale === "ar" ? "قراءة خفيفة بترتيب واضح وألوان انتشار الموحدة." : "Light reading with clear structure and the unified Entshaar palette."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="card-magazine overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-1 hover:border-[#22d3ee]/25 hover:bg-white/[0.08]"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={post.image || "/images/partners/Elmam_inf_saudi_man_presenting_white_board_leading_a_meeting_Th_3fa926c9-bd44-4c4d-865b-916ff67c687c.jpg"}
                  alt={locale === "ar" ? post.title_ar : post.title_en}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7ad8ff]">{post.date}</div>
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {locale === "ar" ? post.title_ar : post.title_en}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                  {locale === "ar" ? post.excerpt_ar : post.excerpt_en}
                </p>
                {openSlug === post.slug && (
                  <div className="prose prose-sm prose-invert max-w-none text-white/80">
                    <div dangerouslySetInnerHTML={{
                      __html: locale === "ar" ? post.content_ar : post.content_en,
                    }} />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setOpenSlug(openSlug === post.slug ? null : post.slug)}
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#7ad8ff] hover:text-white"
                >
                  {openSlug === post.slug
                    ? locale === "ar" ? "إخفاء" : "Hide"
                    : locale === "ar" ? "عرض المزيد" : "Show more"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
