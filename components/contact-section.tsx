"use client"

import { useMemo, useState } from "react"
import { Send, Phone, Mail, MapPin, ArrowLeft, CheckCircle2, CalendarClock } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function ContactSection() {
  const { t, dir } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    details: "",
    slotDate: "",
    slotTime: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [detailsError, setDetailsError] = useState("")
  const { ref: sectionRef, isVisible } = useScrollReveal()
  const serviceOptionsDict = t("contact.form.serviceOptions") as Record<string, string>
  const serviceOptions = Object.entries(serviceOptionsDict || {})
    .filter(([key]) => key !== "placeholder")
    .map(([value, label]) => ({ value, label }))
  const servicePlaceholder = serviceOptionsDict?.placeholder || ""

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], [])
  const timeSlots = ["10:00", "12:00", "14:30", "16:00", "18:30", "20:00"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.details.length < 25) {
      setDetailsError(t("contact.form.detailsError"))
      return
    }
    if (!formData.slotDate || !formData.slotTime) {
      setDetailsError(t("contact.form.slotError"))
      return
    }
    setDetailsError("")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: "", phone: "", email: "", company: "", service: "", details: "", slotDate: "", slotTime: "" })
  }

  const inputClass =
    "w-full rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-[#06b6d4]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#06b6d4]/20"

  return (
    <section id="contact" className="noise relative overflow-hidden bg-[#0c1e3c] py-28 lg:py-36">
      {/* Ambient */}
      <div className="absolute top-1/4 left-0 h-[400px] w-[400px] rounded-full bg-[#0891b2]/5 blur-[120px]" />
      <div className="absolute right-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#06b6d4]/5 blur-[100px]" />

      <div
        ref={sectionRef}
        className={`relative z-10 mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="mb-6 flex justify-start">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("contact.back")}
          </button>
        </div>
        {/* Editorial header */}
        <div className="mb-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#06b6d4]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#06b6d4] uppercase">{t("contact.label")}</span>
            <span className="h-px w-12 bg-[#06b6d4]" />
          </div>
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance">
            {t("contact.title")}
          </h2>
          <p className="mx-auto max-w-lg text-base text-white/60">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="glass rounded-3xl p-8">
              <h3 className="mb-8 text-xl font-bold text-white">{t("contact.label")}</h3>
              <div className="flex flex-col gap-8">
                {[
                  { icon: Phone, label: t("contact.info.phone.label"), value: t("contact.info.phone.value"), dir: "ltr", href: "tel:920026002" },
                  { icon: Mail, label: t("contact.info.email.label"), value: t("contact.info.email.value"), dir: "ltr", href: "mailto:info@entshaar.com" },
                  {
                    icon: MapPin,
                    label: t("contact.info.location.label"),
                    value: t("contact.info.location.value"),
                    dir,
                    href: "https://www.google.com/maps/place/Al+Urubah+Branch+Rd,+Al+Raed,+Riyadh+12352",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-center gap-4 transition-colors duration-300 hover:text-[#06b6d4]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0891b2]/10 transition-colors duration-300 group-hover:bg-[#0891b2]/20">
                      <item.icon className="h-5 w-5 text-[#06b6d4]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/40">{item.label}</p>
                      <p className="text-base font-semibold text-white" dir={item.dir}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h4 className="mb-5 text-lg font-bold text-white">{t("contact.servicesTitle")}</h4>
              <ul className="flex flex-col gap-4">
                {(t("contact.services") as string[]).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 lg:p-10">
              <h3 className="mb-8 text-xl font-bold text-white">
                {t("contact.form.heading")}
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {t("contact.form.fields.name")} <span className="text-[#06b6d4]">*</span>
                  </label>
                  <input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder={t("contact.form.placeholders.name") as string} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {t("contact.form.fields.phone")} <span className="text-[#06b6d4]">*</span>
                  </label>
                  <input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder={t("contact.form.placeholders.phone") as string} dir="ltr" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {t("contact.form.fields.email")} <span className="text-[#06b6d4]">*</span>
                  </label>
                  <input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder={t("contact.form.placeholders.email") as string} dir="ltr" />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {t("contact.form.fields.company")} <span className="text-[#06b6d4]">*</span>
                  </label>
                  <input id="company" type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClass} placeholder={t("contact.form.placeholders.company") as string} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className="mb-2 block text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {t("contact.form.fields.service")} <span className="text-[#06b6d4]">*</span>
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" className="bg-[#0c1e3c] text-white">
                      {servicePlaceholder}
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#0c1e3c] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="details" className="mb-2 block text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {t("contact.form.fields.details")} <span className="text-[#06b6d4]">*</span>
                  </label>
                  <textarea
                    id="details"
                    rows={4}
                    required
                    minLength={25}
                    value={formData.details}
                    onChange={(e) => {
                      setFormData({ ...formData, details: e.target.value })
                      if (e.target.value.length >= 25) setDetailsError("")
                    }}
                    className={`${inputClass} resize-none ${detailsError ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""}`}
                    placeholder={t("contact.form.placeholders.details") as string}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    {detailsError ? (
                      <p className="text-xs text-red-400">{detailsError}</p>
                    ) : (
                      <span />
                    )}
                    <span className={`text-xs ${formData.details.length >= 25 ? "text-[#06b6d4]" : "text-white/30"}`}>
                      {formData.details.length} / 25
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {t("contact.form.slotsLabel")} <span className="text-[#06b6d4]">*</span>
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <CalendarClock className="h-5 w-5 text-[#06b6d4]" />
                      <input
                        type="date"
                        min={minDate}
                        value={formData.slotDate}
                        onChange={(e) => setFormData({ ...formData, slotDate: e.target.value })}
                        className="w-full bg-transparent text-sm text-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
                      {timeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setFormData({ ...formData, slotTime: time })}
                          className={`rounded-xl border px-2 py-2 text-sm transition-all ${
                            formData.slotTime === time
                              ? "border-[#06b6d4] bg-[#06b6d4]/10 text-white"
                              : "border-white/10 bg-white/[0.04] text-white/70 hover:border-[#06b6d4]/40 hover:bg-white/[0.08]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0891b2] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#06b6d4] hover:shadow-2xl hover:shadow-[#0891b2]/20 disabled:opacity-70 sm:w-auto"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    {t("contact.form.submitted")}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t("contact.form.submit")}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
