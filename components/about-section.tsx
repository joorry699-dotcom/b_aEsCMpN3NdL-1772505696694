"use client"

import { CheckCircle2 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function AboutSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal()

  const about = t("hero.about") as { title?: string; subtitle?: string; points?: string[] }
  const points = Array.isArray(about?.points) ? about.points : []
  const stats = t("achievements.stats") as Record<string, { value: string; label: string }>

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-20 sm:py-24 text-white"
    >
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />
      <div className="absolute -top-16 right-12 h-60 w-60 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-[#0ea5e9]/12 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.7)] transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6 text-right sm:text-right">
            <div className="inline-flex items-center gap-2 self-start rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#7ad8ff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
              <span>{about?.title || t("hero.about.title")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-white">{about?.subtitle || t("hero.about.subtitle")}</h2>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {points?.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/75"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#7ad8ff]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(stats ?? {}).map(([key, stat]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-right shadow-[0_14px_36px_-28px_rgba(0,0,0,0.6)]"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/65 leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
