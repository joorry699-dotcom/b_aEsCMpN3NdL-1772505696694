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
    <section
      id="solutions"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-30 text-white"
    >
      <div className="absolute -top-10 right-16 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-12 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`mb-14 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mx-auto mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("solutions.title")}
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-[40px]">{t("solutions.subtitle")}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {solutions?.map((item) => (
            <div
              key={item.title}
              className="card-magazine group relative rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-1 hover:border-[#22d3ee]/25 hover:bg-white/[0.08]"
            >
              <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7ad8ff]">
                {item.pill}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white leading-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
