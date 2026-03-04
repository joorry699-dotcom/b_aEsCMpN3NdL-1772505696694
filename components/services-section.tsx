"use client"

import { useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Cloud,
  Megaphone,
  Briefcase,
  Building2,
  ShieldCheck,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function ServicesSection() {
  const { t } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()
  const { ref: elmRef, isVisible: elmVisible } = useScrollReveal()
  const [selectedElm, setSelectedElm] = useState<"muqeem" | "masarat">("muqeem")
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
    | Record<string, { title: string; description: string }>
    | string

  const elmServices = t("elm.services") as Record<
    "muqeem" | "masarat",
    { title: string; description: string; features: string[] }
  >
  const elmForm = t("elm.form") as Record<string, string>

  const iconMap: Record<string, LucideIcon> = {
    bpo: Briefcase,
    cloud: Cloud,
    marketing: Megaphone,
    construction: Building2,
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
      }))

    return ordered
  })()

  const selectedData = useMemo(() => elmServices?.[selectedElm], [elmServices, selectedElm])

  const handleSelectElm = (key: "muqeem" | "masarat") => {
    setSelectedElm(key)
    const formEl = document.getElementById("elm-form")
    if (formEl) formEl.scrollIntoView({ behavior: "smooth", block: "start" })
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
    <section id="services" className="magazine-section relative overflow-hidden bg-[#fafbfc] py-28 lg:py-36">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0891b2 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial header */}
        <div
          ref={headerRef}
          className={`mb-20 transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px flex-1 max-w-16 bg-[#0891b2]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#0891b2] uppercase">{t("nav.services")}</span>
          </div>
          <h2 className="mb-6 max-w-2xl text-4xl font-bold leading-tight text-[#0c1e3c] sm:text-5xl lg:text-6xl">
            {t("services.title")}
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-[#64748b]">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className={`stagger-children grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${gridVisible ? "visible" : ""}`}
        >
          {services.map((service, i) => (
            <div
              key={service.key}
              className={`card-magazine group relative overflow-hidden rounded-3xl border border-[#e8ecf0] bg-white p-7 ${
                i === 0 ? "sm:col-span-2 sm:row-span-2 sm:p-10" : ""
              }`}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0891b2]/0 to-[#06b6d4]/0 transition-all duration-500 group-hover:from-[#0891b2]/[0.03] group-hover:to-[#06b6d4]/[0.06]" />

              <div className="relative z-10">
                <div className={`mb-5 flex items-center justify-center rounded-2xl bg-[#f0fdfa] transition-colors duration-500 group-hover:bg-[#0891b2] ${i === 0 ? "h-16 w-16" : "h-12 w-12"}`}>
                  <service.icon className={`text-[#0891b2] transition-colors duration-500 group-hover:text-white ${i === 0 ? "h-8 w-8" : "h-6 w-6"}`} />
                </div>
                <h3 className={`mb-3 font-bold text-[#0c1e3c] ${i === 0 ? "text-2xl" : "text-lg"}`}>
                  {service.title}
                </h3>
                <p className={`leading-relaxed text-[#64748b] ${i === 0 ? "text-base" : "text-sm"}`}>
                  {service.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-l from-[#06b6d4] to-[#0891b2] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Elm Services & Intake */}
        <div
          id="elm-services"
          ref={elmRef}
          className={`mt-24 grid gap-10 lg:grid-cols-5 transition-all duration-1000 ${
            elmVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="inline-flex rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-semibold text-[#0369a1]">
              {t("elm.heading")}
            </div>
            <h3 className="text-3xl font-bold text-[#0c1e3c] lg:text-4xl">
              {selectedData?.title}
            </h3>
            <p className="text-lg text-[#475569] leading-relaxed">
              {selectedData?.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {(["muqeem", "masarat"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectElm(key)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    selectedElm === key
                      ? "border-[#0891b2] bg-[#0891b2]/10 text-[#0c1e3c]"
                      : "border-[#e2e8f0] text-[#475569] hover:border-[#0891b2]/60"
                  }`}
                >
                  {elmServices?.[key]?.title}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-lg font-semibold text-[#0c1e3c]">{t("elm.subheading")}</h4>
              <ul className="space-y-3 text-sm text-[#475569]">
                {selectedData?.features?.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#0891b2]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3" id="elm-form">
            <form onSubmit={handleElmSubmit} className="rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0891b2]">{elmServices?.[selectedElm]?.title}</p>
                <h4 className="text-2xl font-bold text-[#0c1e3c]">{elmForm?.title}</h4>
                <p className="mt-2 text-sm text-[#475569]">{elmForm?.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm text-[#0f172a]">
                  <span className="font-semibold">{elmForm?.name}</span>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#0891b2]"
                    placeholder={elmForm?.name}
                  />
                </label>
                <label className="space-y-1 text-sm text-[#0f172a]">
                  <span className="font-semibold">{elmForm?.phone}</span>
                  <input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#0891b2]"
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                  />
                </label>
                <label className="space-y-1 text-sm text-[#0f172a]">
                  <span className="font-semibold">{elmForm?.email}</span>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#0891b2]"
                    placeholder="email@example.com"
                    dir="ltr"
                  />
                </label>
                <label className="space-y-1 text-sm text-[#0f172a]">
                  <span className="font-semibold">{elmForm?.company}</span>
                  <input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#0891b2]"
                    placeholder={elmForm?.company}
                  />
                </label>
                <label className="space-y-1 text-sm text-[#0f172a] md:col-span-2">
                  <span className="font-semibold">{elmForm?.account}</span>
                  <input
                    required
                    value={formData.account}
                    onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#0891b2]"
                    placeholder={elmForm?.account}
                  />
                </label>
                <label className="space-y-1 text-sm text-[#0f172a] md:col-span-2">
                  <span className="font-semibold">{elmForm?.notes}</span>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#0891b2] min-h-[120px]"
                    placeholder={elmForm?.notes}
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submitted}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0891b2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0ea5e9] disabled:opacity-70"
                >
                  {submitted ? "✓" : "→"} {elmForm?.submit}
                </button>
                {submitted && <span className="text-sm font-semibold text-[#16a34a]">{elmForm?.success}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
