"use client"
import Link from "next/link"
import { ChevronRight, Megaphone, PhoneCall, Calculator, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const iconMap: Record<string, LucideIcon> = {
  contact: PhoneCall,
  hr: Users,
  marketing: Megaphone,
  accounting: Calculator,
}

type ServiceKeys = "contact" | "hr" | "marketing" | "accounting"

export default function ServiceDetailsPage({ params }: { params: { slug: string } }) {
  const { t, lang } = useLanguage()
  const key = (params.slug ?? "").toLowerCase() as ServiceKeys

  const servicesItems = t("services.items") as
    | Record<string, { title: string; description: string; features?: string[] }>
    | string

  const service = servicesItems && typeof servicesItems === "object" ? (servicesItems as any)[key] : null
  const Icon = iconMap[key]

  if (!service || !Icon) {
    return (
      <main className="min-h-screen bg-[#0b182f] text-white">
        <div className="flex min-h-screen items-center justify-center px-5 text-center text-white/70">
          {t("nav.services")} · {t("hero.ctaSecondary") ?? "Details"}
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#0b182f] text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e]" />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#0ea5e9]/18 blur-[140px]" />
      <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[#22d3ee]/14 blur-[130px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between gap-3">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            <span className={lang === "ar" ? "rotate-180" : ""}>←</span>
            {t("nav.services")}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            {t("nav.home") ?? t("nav.services")}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22d3ee]/15 text-[#7ad8ff]">
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">{t("nav.services")}</p>
                <h1 className="text-2xl font-bold sm:text-3xl">{service.title}</h1>
                <p className="mt-2 text-white/70 leading-relaxed">{service.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-5 py-2.5 text-sm font-semibold text-[#0b182f] shadow-[0_12px_30px_-20px_rgba(34,211,238,0.9)] transition hover:shadow-[0_14px_34px_-20px_rgba(34,211,238,1)]"
              >
                {t("nav.contact")}
                <span className="text-base leading-none">→</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#22d3ee]/50 hover:text-[#7ad8ff]"
              >
                {t("nav.home") ?? t("hero.ctaSecondary")}
                <span className="text-base leading-none">→</span>
              </Link>
            </div>
          </div>

          {service.features?.length ? (
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.features.map((feat: string) => (
                <div key={feat} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  <p className="leading-relaxed">{feat.trim()}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
