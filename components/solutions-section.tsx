"use client"

import { useState, useMemo } from "react"
import { ChevronDown, Briefcase, Globe2 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export function SolutionsSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal()

  const solutions = t("solutions.items") as Array<{
    title: string
    description: string
    pill: string
    features?: string[]
  }>
  const list = Array.isArray(solutions) ? solutions : []
  const [openKey, setOpenKey] = useState<string | null>(list?.[0]?.title ?? null)

  const iconMap = useMemo(() => {
    return list.reduce<Record<string, JSX.Element>>((acc, item) => {
      const key = item.pill?.toLowerCase()
      if (key?.includes("hr")) acc[item.title] = <Briefcase className="h-5 w-5" />
      else acc[item.title] = <Globe2 className="h-5 w-5" />
      return acc
    }, {})
  }, [list])

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
          <div className="mx-auto mb-4 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#7ad8ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
            <span>{t("solutions.title")}</span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-[40px]">{t("solutions.subtitle")}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {list.map((item) => {
            const isOpen = openKey === item.title
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => setOpenKey((prev) => (prev === item.title ? null : item.title))}
                className={`group relative w-full rounded-2xl border p-6 text-right shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)] transition-all ${
                  isOpen
                    ? "border-[#22d3ee] bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.05] hover:border-[#22d3ee]/25 hover:bg-white/[0.08]"
                }`}
              >
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "36px 36px" }} />
                <div className="relative flex flex-col gap-3 text-right">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#7ad8ff]">
                      {iconMap[item.title]}
                      <span>{item.pill}</span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-white/60 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#7ad8ff]" : ""
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white leading-tight">{item.title}</h3>
                  <div
                    className={`overflow-hidden text-sm text-white/70 transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-3 leading-relaxed">
                      <p>{item.description}</p>
                      {item.features?.length ? (
                        <ul className="space-y-2">
                          {item.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2 text-white/80">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
