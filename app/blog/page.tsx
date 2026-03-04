"use client"

import Link from "next/link"
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
      <main className="min-h-screen bg-[#f8fafc] text-slate-800 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold text-[#0c1e3c] md:text-5xl mb-6">
              {locale === "ar" ? "المدونات" : "Blogs"}
            </h1>
            <p className="max-w-3xl text-lg text-slate-600 leading-relaxed">
              {locale === "ar"
                ? "تعمق في عالم التعهيد وحلول مراكز الاتصال وإدارة الموارد البشرية. ابق على اطلاع بأحدث الاتجاهات والرؤى والاستراتيجيات المبتكرة لتعزيز كفاءة أعمالك."
                : "Dive deep into the world of business outsourcing, call center services, and HR solutions. Stay updated with the latest trends, insights, and innovative strategies to boost your business efficiency."}
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {sortedPosts.map((post) => {
              const title = locale === "ar" ? post.title_ar : post.title_en
              const excerpt = locale === "ar" ? post.excerpt_ar : post.excerpt_en
              const tag = categoryMap[post.slug] ?? (locale === "ar" ? "مقال" : "Article")

              return (
                <div key={post.slug} className="group grid gap-8 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm transition-shadow hover:shadow-md md:grid-cols-[1fr_2fr] items-center">
                  <Link href={`/blog/${post.slug}/`} className="relative h-64 md:h-full min-h-[240px] w-full overflow-hidden rounded-xl">
                    <Image
                      src={post.image ?? "/images/partners/Elmam_inf_saudi_man_presenting_white_board_leading_a_meeting_Th_3fa926c9-bd44-4c4d-865b-916ff67c687c.jpg"}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </Link>

                  <div className="flex flex-col justify-center">
                    <h2 className="mb-4 text-2xl md:text-3xl font-bold leading-tight text-[#0c1e3c]">
                      <Link href={`/blog/${post.slug}/`} className="hover:text-cyan-600 transition-colors">
                        {title}
                      </Link>
                    </h2>
                    <p className="mb-8 text-base text-slate-600 leading-relaxed md:line-clamp-4 line-clamp-3">
                      {excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link 
                        href={`/blog/${post.slug}/`}
                        className="inline-flex items-center text-sm font-bold text-[#0c1e3c] tracking-wide hover:text-cyan-600 transition-colors uppercase"
                      >
                        {locale === "ar" ? "اقرأ المزيد <<" : "Read More >>"}
                      </Link>
                    </div>
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
