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
    <section id="latest-news" className="bg-[#f6f8fb] py-20">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold text-[#0c1e3c] md:text-4xl">
            {locale === "ar" ? "آخر الأخبار والمقالات" : "Latest News & Articles"}
          </h2>
          <div className="mx-auto h-1 w-20 bg-cyan-600"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-[#dbeafe] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10"
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
                <div className="text-xs font-semibold text-[#0891b2]">{post.date}</div>
                <h3 className="text-lg font-bold text-[#0c1e3c] leading-tight">
                  {locale === "ar" ? post.title_ar : post.title_en}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
                  {locale === "ar" ? post.excerpt_ar : post.excerpt_en}
                </p>
                {openSlug === post.slug && (
                  <div className="prose prose-sm max-w-none text-[#334155] prose-headings:text-[#0c1e3c]">
                    <div dangerouslySetInnerHTML={{
                      __html: locale === "ar" ? post.content_ar : post.content_en,
                    }} />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setOpenSlug(openSlug === post.slug ? null : post.slug)}
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#0891b2] hover:text-[#0c1e3c]"
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
