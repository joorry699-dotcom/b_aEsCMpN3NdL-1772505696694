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
    <section id="services" className="relative overflow-hidden bg-[#f6f8fb] py-24 lg:py-28">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0ea5e9 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px flex-1 max-w-16 bg-[#0ea5e9]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#0ea5e9] uppercase">{t("nav.services")}</span>
          </div>
          <h2 className="mb-3 max-w-2xl text-4xl font-bold leading-tight text-[#0c1e3c] sm:text-5xl">
            {t("services.title")}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-[#475569]">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className={`stagger-children grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${gridVisible ? "visible" : ""}`}
        >
          {services.map((service, i) => (
            <div
              key={service.key}
              className={`group relative overflow-hidden rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm transition-all duration-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0ea5e9]/10 ${
                i === 0 ? "sm:col-span-2 sm:row-span-2 sm:p-8" : ""
              }`}
            >
              <div className="relative z-10">
                <div className={`mb-4 flex items-center justify-center rounded-xl bg-[#e0f2fe] text-[#0e7490] transition-colors duration-400 group-hover:bg-[#0ea5e9]/15 ${i === 0 ? "h-14 w-14" : "h-12 w-12"}`}>
                  <service.icon className={`${i === 0 ? "h-7 w-7" : "h-6 w-6"}`} />
                </div>
                <h3 className={`mb-2 font-semibold text-[#0c1e3c] ${i === 0 ? "text-xl" : "text-base"}`}>
                  {service.title}
                </h3>
                <p className={`leading-relaxed text-[#475569] ${i === 0 ? "text-sm" : "text-sm"}`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          id="elm-services"
          ref={elmRef}
          className={`mt-16 grid gap-8 lg:grid-cols-5 transition-all duration-1000 ${
            elmVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="lg:col-span-2 space-y-5">
            <div className="inline-flex rounded-full bg-[#e0f2fe] px-3 py-1 text-[11px] font-semibold text-[#0369a1]">
              {t("elm.heading")}
            </div>
            <h3 className="text-2xl font-bold text-[#0c1e3c] lg:text-3xl">
              {selectedData?.title}
            </h3>
            <p className="text-base text-[#475569] leading-relaxed">
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

            <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm">
              <h4 className="mb-3 text-base font-semibold text-[#0c1e3c]">{t("elm.subheading")}</h4>
              <ul className="space-y-2.5 text-sm text-[#475569]">
                {selectedData?.features?.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[#0ea5e9]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3" id="elm-form">
            <form onSubmit={handleElmSubmit} className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm lg:p-7">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0ea5e9]">{elmServices?.[selectedElm]?.title}</p>
                <h4 className="mt-1 text-xl font-bold text-[#0c1e3c]">{elmForm?.title}</h4>
                <p className="mt-1 text-sm text-[#475569]">{elmForm?.subtitle}</p>
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
