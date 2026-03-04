"use client"

import Link from "next/link"
import Image from "next/image"
import { posts } from "../../lib/blog"
import { useLanguage } from "../../components/language-provider"

export default function BlogPage() {
  const { locale } = useLanguage()

  const categoryMap: Record<string, string> = {
    "digital-marketing-trends-2026": "التسويق الرقمي",
    "call-center-efficiency": "مراكز الاتصال",
    "hr-recruitment-strategies": "الموارد البشرية",
    "hr-solutions-saudi": "حلول الموارد البشرية",
    "saudi-market-expansion": "تطوير الأعمال",
  }

  const sortedPosts = [...posts].sort((a, b) => (a.date > b.date ? -1 : 1))

  return (
    <main className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-teal-300/80">{locale === "ar" ? "المدونات والمقالات" : "Blogs & Articles"}</p>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            {locale === "ar" ? "اكتشف أحدث الرؤى والاستراتيجيات" : "Discover fresh insights and strategies"}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {locale === "ar" ? "محتوى مختصر وواضح من خبراء انتشار في التسويق، الموارد البشرية، ومراكز الاتصال." : "Bite-sized guidance from Entishar experts across marketing, HR, and contact centers."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post) => {
            const title = locale === "ar" ? post.title_ar : post.title_en
            const excerpt = locale === "ar" ? post.excerpt_ar : post.excerpt_en
            const tag = categoryMap[post.slug] ?? (locale === "ar" ? "مقال" : "Article")

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-all hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-2xl hover:shadow-teal-500/10"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={post.image || "/images/placeholder.png"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs font-semibold text-white">
                    <span className="rounded-full bg-teal-500/90 px-3 py-1 text-[11px]">{tag}</span>
                    <span className="rounded-full bg-white/15 px-3 py-1">{post.date}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="mb-2 text-xl font-bold leading-7 text-white group-hover:text-teal-200">{title}</h2>
                  <p className="line-clamp-3 text-sm text-slate-300 leading-6">{excerpt}</p>
                  <div className="mt-auto pt-5 text-sm font-semibold text-teal-300 group-hover:text-white">
                    {locale === "ar" ? "اقرأ المزيد" : "Read more"}
                    <span className="mr-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                      {locale === "ar" ? "←" : "→"}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
