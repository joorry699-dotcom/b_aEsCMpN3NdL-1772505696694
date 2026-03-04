"use client"

import Image from "next/image"
import { posts } from "../../lib/blog"
import { useLanguage } from "../../components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BlogPage() {
  const { locale } = useLanguage()

  const categoryMap: Record<string, string> = {
    "digital-marketing-trends-2026": locale === "ar" ? "التسويق الرقمي" : "Digital Marketing",
    "call-center-efficiency": locale === "ar" ? "مراكز الاتصال" : "Call Centers",
    "hr-recruitment-strategies": locale === "ar" ? "الموارد البشرية" : "Human Resources",
    "hr-solutions-saudi": locale === "ar" ? "حلول الموارد البشرية" : "HR Solutions",
    "saudi-market-expansion": locale === "ar" ? "تطوير الأعمال" : "Business Expansion",
  }

  const sortedPosts = [...posts].sort((a, b) => (a.date > b.date ? -1 : 1))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] text-white pt-32 pb-20">
        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="absolute -top-16 right-20 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
          <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

          <div className="relative mb-14">
            <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
              {locale === "ar" ? "المدونات" : "Blogs"}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-4">
              {locale === "ar" ? "المدونات" : "Blogs"}
            </h1>
            <p className="max-w-3xl text-base text-white/70 leading-relaxed">
              {locale === "ar"
                ? "تعمق في عالم التعهيد وحلول مراكز الاتصال وإدارة الموارد البشرية بألوان انتشار الموحدة."
                : "Explore outsourcing, call centers, and HR insights with the unified Entshaar palette."}
            </p>
          </div>

          <div className="relative flex flex-col gap-10">
            {sortedPosts.map((post) => {
              const title = locale === "ar" ? post.title_ar : post.title_en
              const excerpt = locale === "ar" ? post.excerpt_ar : post.excerpt_en
              const tag = categoryMap[post.slug] ?? (locale === "ar" ? "مقال" : "Article")

              return (
                <div key={post.slug} className="card-magazine group grid gap-6 rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-7 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)] transition-all hover:border-[#22d3ee]/25 hover:bg-white/[0.08] md:grid-cols-[1fr_2fr] items-center">
                  <div className="relative h-60 md:h-full min-h-[220px] w-full overflow-hidden rounded-xl">
                    <Image
                      src={post.image ?? "/images/partners/Elmam_inf_saudi_man_presenting_white_board_leading_a_meeting_Th_3fa926c9-bd44-4c4d-865b-916ff67c687c.jpg"}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7ad8ff]">{tag}</div>
                    <h2 className="mb-3 text-2xl md:text-3xl font-semibold leading-tight text-white">
                      {title}
                    </h2>
                    <p className="mb-6 text-sm text-white/70 leading-relaxed md:line-clamp-4 line-clamp-3">
                      {excerpt}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
