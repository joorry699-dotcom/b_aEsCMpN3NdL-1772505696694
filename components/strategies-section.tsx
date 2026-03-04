"use client"

import { Lightbulb, BookOpen, UserCog, BarChart3 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function StrategiesSection() {
  const { t } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal()

  const iconMap = [Lightbulb, BookOpen, UserCog, BarChart3]
  const strategies = (t("strategies.items") as Array<{ number: string; title: string; description: string }>) || []

  return (
    <section
      id="strategies"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-30 text-white"
    >
      <div className="absolute -top-10 right-1/4 h-80 w-80 rounded-full bg-[#22d3ee]/12 blur-[130px]" />
      <div className="absolute bottom-0 left-16 h-72 w-72 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-14 text-center transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("strategies.label")}
          </div>
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-[40px]">
            {t("strategies.title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70">
            {t("strategies.subtitle")}
          </p>
        </div>

        <div
          ref={stepsRef}
          className={`relative transition-all duration-1000 ${
            stepsVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="absolute top-0 bottom-0 right-[calc(50%-1px)] hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block" />

          <div className="flex flex-col gap-12 lg:gap-0">
            {strategies.map((strategy, i) => {
              const isEven = i % 2 === 0
              const Icon = iconMap[i]
              return (
                <div
                  key={strategy.number}
                  className={`relative flex flex-col items-center gap-8 lg:flex-row ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={`flex-1 ${isEven ? "lg:text-left" : "lg:text-right"}`}>
                    <div
                      className={`card-magazine max-w-md rounded-2xl border border-white/10 bg-white/[0.05] p-7 lg:p-8 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)] ${
                        isEven ? "lg:mr-auto" : "lg:ml-auto"
                      }`}
                    >
                      <span className="mb-3 inline-block text-5xl font-black text-white/10">{strategy.number}</span>
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#22d3ee]/15 text-[#7ad8ff]">
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">{strategy.title}</h3>
                      <p className="text-sm leading-relaxed text-white/70">{strategy.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#0d223e] bg-[#22d3ee] shadow-[0_12px_30px_-20px_rgba(34,211,238,0.9)]">
                    <span className="text-xs font-bold text-[#0b182f]">{strategy.number}</span>
                  </div>

                  <div className="hidden flex-1 lg:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
