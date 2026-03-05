"use client"

import { useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Cloud, Megaphone, Briefcase, ShieldCheck, ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function ServicesSection() {
  const { t } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()
  const { ref: elmRef, isVisible: elmVisible } = useScrollReveal()
  const [openElm, setOpenElm] = useState<"muqeem" | "masarat" | "tamm" | "nabaa" | null>("muqeem")
  const [openService, setOpenService] = useState<string | null>(null)
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
    bpo: Briefcase,
    cloud: Cloud,
    marketing: Megaphone,
    smart: ShieldCheck,
  }

  const services = (() => {
    if (!servicesItems || typeof servicesItems !== "object") return []

    const orderedKeys = Object.keys(iconMap)
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

  const displayElm = openElm ?? "muqeem"
  const selectedData = useMemo(() => elmServices?.[displayElm], [displayElm, elmServices])
  const elmCards = useMemo(() => (
    (["muqeem", "masarat", "tamm", "nabaa"] as const).map((key) => ({
      key,
      title: elmServices?.[key]?.title ?? "",
      description: elmServices?.[key]?.description ?? "",
      features: elmServices?.[key]?.features ?? [],
    }))
  ), [elmServices])

  const handleSelectElm = (key: "muqeem" | "masarat" | "tamm" | "nabaa") => {
    setOpenElm((prev) => (prev === key ? null : key))
  }

  const handleElmSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", phone: "", email: "", account: "", company: "", notes: "" })
    }, 3000)
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
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7ad8ff]">
            {t("nav.services")}
          </div>
          <h2 className="mt-4 mb-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[36px]">
            {t("services.title")}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("services.subtitle")}
          </p>
        </div>

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
                  className={`overflow-hidden text-sm text-white/70 transition-all duration-300 ${
                    openService === service.key ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="space-y-3 leading-relaxed">
                    <p>{service.description}</p>
                    {service.features?.length ? (
                      <ul className="space-y-2">
                        {service.features.map((feat) => (
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
          ))}
        </div>

        <div
          id="elm-services"
          ref={elmRef}
          className={`mt-16 transition-all duration-1000 ${
            elmVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 lg:p-8 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl space-y-8">
            <div className="flex flex-col gap-3 text-center sm:text-right">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
                {t("elm.heading")}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-white">{t("services.items.construction.title")}</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">{t("services.items.construction.description")}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5 space-y-3">
              {elmCards.map((card) => {
                const active = openElm === card.key
                return (
                  <button
                    key={card.key}
                    type="button"
                    onClick={() => handleSelectElm(card.key)}
                    className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-right transition-all duration-500 ${
                      active
                        ? "border-[#22d3ee] bg-white/[0.08] shadow-[0_20px_60px_-32px_rgba(34,211,238,0.7)]"
                        : "border-white/10 bg-white/[0.03] hover:border-[#22d3ee]/30 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/8 via-transparent to-transparent opacity-80" />
                    <div className="relative flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22d3ee]/15 text-[#7ad8ff] ring-1 ring-white/10">
                          <span className="text-xs font-bold uppercase">
                            {card.key === "muqeem"
                              ? "MQ"
                              : card.key === "masarat"
                                ? "MS"
                                : card.key === "tamm"
                                  ? "TM"
                                  : "NB"}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-white/60 transition-transform duration-300 ${active ? "rotate-180 text-[#7ad8ff]" : ""}`}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                        <p className="mt-1 text-sm text-white/70 leading-relaxed line-clamp-2">{card.description}</p>
                      </div>
                      <div
                        className={`overflow-hidden text-sm text-white/75 transition-all duration-300 ${
                          active ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="space-y-2 pt-2">
                          {card.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-3">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#22d3ee]" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#7ad8ff]">
                        {active ? (t("elm.subheading") as string) : (elmForm?.title as string)}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 lg:p-6" id="elm-form">
              <form onSubmit={handleElmSubmit} className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">{elmServices?.[displayElm]?.title}</p>
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
        </div>
      </div>
    </section>
  )
}
