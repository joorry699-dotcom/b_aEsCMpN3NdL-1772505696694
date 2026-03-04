"use client"

import { useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Cloud,
  Megaphone,
  Briefcase,
  Building2,
  ShieldCheck,
  ChevronDown,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function ServicesSection() {
  const { t } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()
  const { ref: elmRef, isVisible: elmVisible } = useScrollReveal()
  const [selectedElm, setSelectedElm] = useState<"muqeem" | "masarat">("muqeem")
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
    | Record<string, { title: string; description: string }>
    | string

  const elmServices = t("elm.services") as Record<
    "muqeem" | "masarat",
    { title: string; description: string; features: string[] }
  >
  const elmForm = t("elm.form") as Record<string, string>
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/40"

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
  const elmCards = useMemo(() => (
    (["muqeem", "masarat"] as const).map((key) => ({
      key,
      title: elmServices?.[key]?.title ?? "",
      description: elmServices?.[key]?.description ?? "",
      features: elmServices?.[key]?.features ?? [],
    }))
  ), [elmServices])

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
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 lg:p-8 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)] backdrop-blur-xl space-y-8">
            <div className="flex flex-col gap-3 text-center sm:text-right">
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
                {t("elm.heading")}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-white">{selectedData?.title}</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">{selectedData?.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {elmCards.map((card) => {
                const active = selectedElm === card.key
                return (
                  <button
                    key={card.key}
                    type="button"
                    onClick={() => handleSelectElm(card.key)}
                    className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-right transition-all duration-500 ${
                      active
                        ? "border-[#22d3ee] bg-white/[0.08] shadow-[0_20px_60px_-32px_rgba(34,211,238,0.7)]"
                        : "border-white/10 bg-white/[0.05] hover:border-[#22d3ee]/40 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/8 via-transparent to-transparent opacity-80" />
                    <div className="relative flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#22d3ee]/15 text-[#7ad8ff] ring-1 ring-white/10">
                          <span className="text-sm font-bold uppercase">{card.key === "muqeem" ? "M" : "T"}</span>
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">{elmServices?.[selectedElm]?.title}</p>
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
      </div>
    </section>
  )
}
