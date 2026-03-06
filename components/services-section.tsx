"use client"

import { useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Cloud,
  Megaphone,
  ShieldCheck,
  ChevronDown,
  IdCard,
  Route,
  FileSearch,
  MessageCircle,
  PhoneCall,
  Calculator,
  Users,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function ServicesSection() {
  const { t, locale } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()
  const { ref: elmRef, isVisible: elmVisible } = useScrollReveal()
  const [openService, setOpenService] = useState<string | null>("contact")
  const [elmOpen, setElmOpen] = useState(true)
  const [openElmCard, setOpenElmCard] = useState<string | null>(null)
  const [showElmForm, setShowElmForm] = useState(false)
  const [formService, setFormService] = useState<"muqeem" | "masarat" | "tamm" | "nabaa">("muqeem")
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    account: "",
    company: "",
    notes: "",
  })

  const servicesItems = t("services.items") as
    | Record<string, { title: string; description: string; features?: string[] }>
    | string

  const elmServices = t("elm.services") as Record<
    "muqeem" | "masarat" | "tamm" | "nabaa",
    { title: string; description: string; features: string[] }
  >
  const elmForm = t("elm.form") as Record<string, string>
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/40"

  const iconMap: Record<string, LucideIcon> = {
    contact: PhoneCall,
    hr: Users,
    marketing: Megaphone,
    accounting: Calculator,
  }

  const elmIconMap: Record<"muqeem" | "masarat" | "tamm" | "nabaa", LucideIcon> = {
    muqeem: IdCard,
    masarat: Route,
    tamm: FileSearch,
    nabaa: MessageCircle,
  }

  const services = (() => {
    if (!servicesItems || typeof servicesItems !== "object") return []

    const orderedKeys = ["contact", "hr", "marketing", "accounting"]
    const ordered = orderedKeys
      .filter((key) => servicesItems[key])
      .map((key) => ({
        key,
        icon: iconMap[key],
        title: servicesItems[key].title,
        description: servicesItems[key].description,
        features: servicesItems[key].features ?? [],
      }))

    return ordered
  })()

  const elmCards = useMemo(
    () =>
      (["muqeem", "masarat", "tamm", "nabaa"] as const).map((key) => ({
        key,
        title: elmServices?.[key]?.title ?? "",
        description: elmServices?.[key]?.description ?? "",
        features: elmServices?.[key]?.features ?? [],
        icon: elmIconMap[key],
      })),
    [elmServices],
  )

  const handleElmSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowElmForm(false)
      setFormData({ name: "", phone: "", email: "", account: "", company: "", notes: "" })
    }, 1500)
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#0b182f] py-24 lg:py-28 text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e]" />
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#0ea5e9]/18 blur-[140px]" />
      <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[#22d3ee]/14 blur-[130px]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-14 sm:mb-16 transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#7ad8ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
            <span>{t("nav.services")}</span>
          </div>
          <h2 className="mt-4 mb-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[36px]">
            {t("services.title")}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("services.subtitle")}
          </p>
        </div>

        {servicesItems && typeof servicesItems === "object" && (servicesItems as any).sme ? (
          <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#0ea5e9]/20 via-[#22d3ee]/10 to-[#0b182f]/30 p-6 sm:p-7 shadow-[0_24px_70px_-32px_rgba(34,211,238,0.6)] backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7ad8ff]">{t("services.items.sme.title")}</p>
                <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">{t("services.items.sme.description")}</h3>
                {Array.isArray((servicesItems as any).sme?.features) ? (
                  <div className="flex flex-wrap gap-2 text-[12px] text-white/75">
                    {(servicesItems as any).sme.features.map((feat: string) => (
                      <span key={feat} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {feat}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0b182f] px-5 py-2.5 text-sm font-semibold shadow-[0_18px_40px_-24px_rgba(255,255,255,0.6)] transition hover:shadow-[0_20px_46px_-22px_rgba(255,255,255,0.7)]"
              >
                {t("nav.contact")}
                <span className="text-base leading-none">→</span>
              </a>
            </div>
          </div>
        ) : null}

        <div
          ref={gridRef}
          className={`stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${gridVisible ? "visible" : ""}`}
        >
          {services.map((service) => (
            <button
              type="button"
              key={service.key}
              onClick={() => setOpenService((prev) => (prev === service.key ? null : service.key))}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-left shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#22d3ee]/50 hover:bg-white/[0.08]"
              aria-expanded={openService === service.key}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.12), transparent 40%)" }} />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#22d3ee]/15 text-[#7ad8ff]">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-white/60 transition-transform duration-300 ${openService === service.key ? "rotate-180 text-[#7ad8ff]" : ""}`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <div
                  className={`overflow-hidden text-sm text-white/70 transition-all duration-400 ${
                    openService === service.key ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-3 leading-relaxed">
                    <p>{service.description}</p>
                    {service.features?.length ? (
                      <ul className="space-y-2">
                        {service.features.map((feat) => {
                          const clean = feat.trim()
                          const isBenefit = clean.startsWith("الفائدة") || clean.toLowerCase().startsWith("benefit")
                          return isBenefit ? (
                            <li key={feat} className="text-white/80 font-semibold">
                              {clean}
                            </li>
                          ) : (
                            <li key={feat} className="flex items-start gap-2 text-white/80">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                              <span>{clean}</span>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                    {['contact', 'hr', 'marketing', 'accounting'].includes(service.key) ? (
                      <div className="pt-2 text-left">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-4 py-2 text-xs font-semibold text-[#0b182f] shadow-[0_12px_30px_-20px_rgba(34,211,238,0.9)] transition hover:shadow-[0_14px_34px_-20px_rgba(34,211,238,1)]"
                        >
                          {t("nav.contact")}
                          <span className="text-base leading-none">→</span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div
          id="elm-services"
          ref={elmRef}
          className={`mt-16 transition-all duration-1000 ${
            elmVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 lg:p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.65)] space-y-5">
            <button
              type="button"
              onClick={() => setElmOpen((prev) => !prev)}
              className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-right transition hover:border-[#22d3ee]/40 hover:bg-white/[0.12]"
            >
              <div className="flex flex-col gap-2 text-right">
                <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#7ad8ff] w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  <span>{t("elm.heading")}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-white">{t("elm.heading")}</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {t("elm.subheading") as string}
                </p>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-white/70 transition-transform duration-300 group-hover:text-[#7ad8ff] ${elmOpen ? "rotate-180 text-[#7ad8ff]" : ""}`}
              />
            </button>

            <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 transition-all duration-500 ${elmOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
              {elmCards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.key}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-right shadow-[0_20px_60px_-32px_rgba(34,211,238,0.7)] transition-all duration-500 hover:-translate-y-1 hover:border-[#22d3ee]/40 hover:bg-white/[0.08]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/8 via-transparent to-transparent" />
                    <div className="relative space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#22d3ee]/15 text-[#7ad8ff] ring-1 ring-white/10">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">Elm</span>
                          <span className="text-xs text-white/60">{card.key === "muqeem" ? "Muqeem" : card.key === "masarat" ? "Masarat" : card.key === "tamm" ? "Tamm" : "Nabaa"}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => setOpenElmCard((prev) => (prev === card.key ? null : card.key))}
                          className="group/elm flex w-full items-center justify-between text-left"
                        >
                          <div className="text-lg font-semibold text-white">{card.title}</div>
                          <ChevronDown
                            className={`h-5 w-5 text-white/60 transition-transform duration-300 ${openElmCard === card.key ? "rotate-180 text-[#7ad8ff]" : ""}`}
                          />
                        </button>
                        <p className="text-sm text-white/75 leading-relaxed">{card.description}</p>
                      </div>
                      {card.features?.length ? (
                        <ul
                          className={`space-y-2 text-sm text-white/75 leading-relaxed transition-all duration-300 ${
                            openElmCard === card.key ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {card.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                              <span>{feat.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                          <span>{t("elm.subheading")}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormService(card.key)
                            setShowElmForm(true)
                          }}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-4 py-2 text-xs font-semibold text-[#0b182f] shadow-[0_12px_30px_-20px_rgba(34,211,238,0.9)] transition hover:shadow-[0_14px_34px_-20px_rgba(34,211,238,1)]"
                        >
                          {t("hero.ctaPrimary")}
                          <span className="text-base leading-none">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {showElmForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowElmForm(false)} />
            <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0c1b32] p-6 sm:p-7 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.85)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#7ad8ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                  <span>{elmServices?.[formService]?.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowElmForm(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white hover:border-[#22d3ee]/40 hover:text-[#7ad8ff]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleElmSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">{elmForm?.title}</h4>
                  <p className="text-sm text-white/70">{elmForm?.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="space-y-1 text-sm text-white/80">
                    <span className="font-semibold text-white">{elmForm?.name}</span>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder={elmForm?.name}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-white/80">
                    <span className="font-semibold text-white">{elmForm?.phone}</span>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                      placeholder="05xxxxxxxx"
                      dir="ltr"
                    />
                  </label>
                  <label className="space-y-1 text-sm text-white/80">
                    <span className="font-semibold text-white">{elmForm?.email}</span>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="email@example.com"
                      dir="ltr"
                    />
                  </label>
                  <label className="space-y-1 text-sm text-white/80">
                    <span className="font-semibold text-white">{elmForm?.company}</span>
                    <input
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClass}
                      placeholder={elmForm?.company}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-white/80 md:col-span-2">
                    <span className="font-semibold text-white">{elmForm?.account}</span>
                    <input
                      required
                      value={formData.account}
                      onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                      className={inputClass}
                      placeholder={elmForm?.account}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-white/80 md:col-span-2">
                    <span className="font-semibold text-white">{elmForm?.notes}</span>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className={`${inputClass} min-h-[120px] resize-none`}
                      placeholder={elmForm?.notes}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-6 py-3 text-sm font-semibold text-[#0b182f] transition hover:shadow-[0_18px_40px_-28px_rgba(34,211,238,0.8)] disabled:opacity-70"
                  >
                    {submitted ? "✓" : "→"} {elmForm?.submit}
                  </button>
                  {submitted && (
                    <span className="text-sm font-semibold text-[#6ee7b7]">{elmForm?.success}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
