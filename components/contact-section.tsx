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
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [detailsError, setDetailsError] = useState("")
  const { ref: sectionRef, isVisible } = useScrollReveal()
  const serviceOptionsDict = t("contact.form.serviceOptions") as Record<string, string>
  const serviceOptions = Object.entries(serviceOptionsDict || {})
    .filter(([key]) => key !== "placeholder")
    .map(([value, label]) => ({ value, label }))
  const servicePlaceholder = serviceOptionsDict?.placeholder || ""

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], [])
  const timeSlots = ["10:00", "12:00", "14:30", "16:00", "18:30", "20:00"]

  const handleSubmit = async (e: React.FormEvent) => {
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
    setSubmitError("")
    setSending(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      })

      if (!res.ok) {
        throw new Error("Request failed")
      }

      setSubmitted(true)
      setFormData({ name: "", phone: "", email: "", company: "", service: "", details: "", slotDate: "", slotTime: "" })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      console.error(err)
      setSubmitError((t("contact.form.submitError") as string) || "تعذر إرسال الطلب، حاول لاحقا")
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-[#06b6d4]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#06b6d4]/20"

  return (
    <section
      id="contact"
      className="noise relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-32 text-white"
    >
      <div className="absolute -top-6 right-12 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-8 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div
        ref={sectionRef}
        className={`relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("contact.label")}
          </div>
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-[40px] text-balance">
            {t("contact.title")}
          </h2>
          <p className="mx-auto max-w-xl text-base text-white/70">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="glass rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)]">
              <h3 className="mb-6 text-lg font-semibold text-white">{t("contact.label")}</h3>
              <div className="flex flex-col gap-6">
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
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#22d3ee]/12 text-[#7ad8ff] transition-colors duration-300 group-hover:bg-[#22d3ee]/18">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">{item.label}</p>
                      <p className="text-sm font-semibold text-white" dir={item.dir}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)]">
              <h4 className="mb-4 text-base font-semibold text-white">{t("contact.servicesTitle")}</h4>
              <ul className="flex flex-col gap-3">
                {(t("contact.services") as string[]).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                    <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-[#22d3ee]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/10 bg-white/[0.05] p-8 lg:p-9 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)]">
              <h3 className="mb-6 text-lg font-semibold text-white">
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
                              ? "border-[#22d3ee] bg-[#22d3ee]/12 text-white"
                              : "border-white/10 bg-white/[0.04] text-white/70 hover:border-[#22d3ee]/35 hover:bg-white/[0.08]"
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
                disabled={sending}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-8 py-4 text-base font-semibold text-[#0b182f] transition-all duration-300 hover:shadow-[0_18px_40px_-28px_rgba(34,211,238,0.8)] disabled:opacity-70 sm:w-auto"
              >
                {sending ? (
                  <>
                    <Send className="h-5 w-5 animate-pulse" />
                    {t("contact.form.submit")}
                  </>
                ) : submitted ? (
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
              {submitError ? (
                <p className="mt-3 text-sm text-red-400">{submitError}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
