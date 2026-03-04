"use client"

import { useLanguage } from "@/components/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { posts, type BlogPost } from "@/lib/blog"
import Image from "next/image"
import Link from "next/link"

export function BlogList() {
  const { locale } = useLanguage()
  const { ref, isVisible } = useScrollReveal()
  const blogs: BlogPost[] = posts.slice(0, 3)

  if (blogs.length === 0) return null

  return (
    <section id="latest-news" className="bg-slate-50 py-24">
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <Link
              href={`/blog/${post.slug}/`}
              key={post.slug}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image ?? "/images/partners/Elmam_inf_saudi_man_presenting_white_board_leading_a_meeting_Th_3fa926c9-bd44-4c4d-865b-916ff67c687c.jpg"}
                  alt={locale === "ar" ? post.title_ar : post.title_en}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="mb-2 text-sm text-cyan-600">{post.date}</p>
                <h3 className="mb-3 text-xl font-bold text-[#0c1e3c]">
                  {locale === "ar" ? post.title_ar : post.title_en}
                </h3>
                <p className="line-clamp-2 text-slate-600">
                  {locale === "ar" ? post.excerpt_ar : post.excerpt_en}
                </p>
                <div className="mt-4 flex items-center font-semibold text-cyan-600">
                  {locale === "ar" ? "إقرأ المزيد" : "Read More"}
                  <span className={locale === "ar" ? "mr-2" : "ml-2"}>
                    {locale === "ar" ? "←" : "→"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog/"
            className="inline-flex items-center rounded-full bg-[#0c1e3c] px-8 py-3 font-semibold text-white transition-all hover:bg-cyan-700"
          >
            {locale === "ar" ? "مشاهدة كافة المقالات" : "View All Articles"}
          </Link>
        </div>
      </div>
    </section>
  )
}
