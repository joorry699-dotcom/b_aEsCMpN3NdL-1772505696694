"use client"

import { useLanguage } from "@/components/language-provider"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { posts, type BlogPost } from "@/lib/blog"

export function BlogList() {
  const { locale } = useLanguage()
  const { ref, isVisible } = useScrollReveal()
  const blogs: BlogPost[] = posts

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
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm text-cyan-600">
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0c1e3c]">
                  {locale === "ar" ? post.title_ar : post.title_en}
                </h3>
                <div
                  className="prose max-w-none text-slate-700 prose-headings:text-[#0c1e3c] prose-a:text-cyan-700"
                  dangerouslySetInnerHTML={{
                    __html: locale === "ar" ? post.content_ar : post.content_en,
                  }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
