"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export function SolutionsSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal()

  const solutions = t("solutions.items") as Array<{
    title: string
    description: string
    pill: string
  }>

  return (
    <section id="solutions" className="bg-[#f6f8fb] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={ref}
          className={`mb-14 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mx-auto mb-4 inline-flex rounded-full bg-[#e0f2fe] px-4 py-1 text-[11px] font-semibold text-[#0369a1]">
            {t("solutions.title")}
          </div>
          <h2 className="text-3xl font-bold text-[#0c1e3c] sm:text-4xl">{t("solutions.subtitle")}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {solutions?.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10"
            >
              <div className="mb-3 inline-flex rounded-full bg-[#e0f2fe] px-3 py-1 text-[11px] font-semibold text-[#0369a1]">
                {item.pill}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[#0c1e3c] leading-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#475569]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
