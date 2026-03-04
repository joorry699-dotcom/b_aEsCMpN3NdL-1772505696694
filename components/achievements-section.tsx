"use client"

import { useEffect, useMemo, useState } from "react"
import { CheckCircle2, Users, Briefcase, Handshake } from "lucide-react"
import { useLanguage } from "./language-provider"

const iconMap = {
  operations: CheckCircle2,
  employees: Users,
  services: Briefcase,
  clients: Handshake,
}

type StatKey = keyof typeof iconMap

type Stat = {
  value: string
  label: string
}

type Stats = Record<StatKey, Stat>

type ParsedStat = {
  target: number
  hasPlus: boolean
  magnitude: "M" | "K" | null
  raw: string
}

function parseStatValue(raw: string): ParsedStat {
  const hasPlus = raw.includes("+")
  const magnitude = raw.toLowerCase().includes("m") ? "M" : raw.toLowerCase().includes("k") ? "K" : null
  const numericPart = Number(raw.replace(/[^0-9.]/g, "")) || 0

  const target = magnitude === "M"
    ? numericPart * 1_000_000
    : magnitude === "K"
      ? numericPart * 1_000
      : numericPart

  return { target, hasPlus, magnitude, raw }
}

function formatDisplay(value: number, parsed: ParsedStat): string {
  if (parsed.magnitude === "M") {
    const millions = value / 1_000_000
    const rounded = Number(millions.toFixed(millions < 10 ? 1 : 0))
    return `${rounded}M${parsed.hasPlus ? "+" : ""}`
  }
  if (parsed.magnitude === "K") {
    const thousands = value / 1_000
    const rounded = Number(thousands.toFixed(thousands < 10 ? 1 : 0))
    return `${rounded}K${parsed.hasPlus ? "+" : ""}`
  }
  const formatted = value.toLocaleString()
  return `${formatted}${parsed.hasPlus ? "+" : ""}`
}

export function AchievementsSection() {
  const { t } = useLanguage()
  const stats = (t("achievements.stats") as Stats) || {} as Stats

  const parsedStats = useMemo(() => {
    return Object.entries(stats).reduce<Record<string, ParsedStat>>((acc, [key, stat]) => {
      acc[key] = parseStatValue(stat?.value ?? "0")
      return acc
    }, {})
  }, [stats])

  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    Object.keys(stats).forEach((key) => { initial[key] = 0 })
    return initial
  })

  useEffect(() => {
    const animations: number[] = []

    Object.entries(parsedStats).forEach(([key, parsed]) => {
      const duration = 1100
      const start = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        setAnimatedValues((prev) => ({ ...prev, [key]: parsed.target * eased }))
        if (progress < 1) {
          animations.push(requestAnimationFrame(tick))
        }
      }

      animations.push(requestAnimationFrame(tick))
    })

    return () => {
      animations.forEach((id) => cancelAnimationFrame(id))
    }
  }, [parsedStats])

  return (
    <section
      id="achievements"
      className="magazine-section relative overflow-hidden bg-gradient-to-br from-[#0b182f] via-[#0d223e] to-[#0b182f] py-20 sm:py-28 text-white noise"
    >
      <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-[#22d3ee]/15 blur-[110px]" />
      <div className="absolute -left-12 bottom-0 h-64 w-64 rounded-full bg-[#0ea5e9]/12 blur-[130px]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "36px 36px" }} />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="w-full max-w-xl space-y-4 text-center sm:text-right lg:max-w-lg">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("achievements.label")}
          </div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {t("achievements.title")}
          </h2>
          <p className="text-base leading-relaxed text-white/70">
            {t("achievements.subtitle")}
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 hidden sm:block" style={{ backgroundImage: "linear-gradient(to right, transparent 0, transparent 22%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.08) 78%, transparent 78%), linear-gradient(to bottom, transparent 0, transparent 48%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.08) 52%, transparent 52%)" }} />
            <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
              {Object.entries(stats).map(([key, stat]) => {
                const Icon = iconMap[key as StatKey]
                const parsed = parsedStats[key] ?? { target: 0, hasPlus: false, magnitude: null, raw: stat.value }
                const animated = animatedValues[key] ?? 0
                const displayValue = parsed.target > 0 ? formatDisplay(Math.round(animated), parsed) : stat.value

                return (
                  <div
                    key={key}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-7 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:-translate-y-1 hover:border-[#22d3ee]/35 hover:bg-white/[0.07] sm:p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/6 via-transparent to-transparent" />
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22d3ee]/15 text-[#7ad8ff] ring-1 ring-white/10">
                        {Icon ? <Icon className="h-6 w-6" /> : null}
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{displayValue}</div>
                        <div className="mt-1 text-sm text-white/65">{stat.label}</div>
                      </div>
                    </div>
                    <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/25 to-transparent" />
    </section>
  )
}
