"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, MessageCircle, Share2, Bot, ArrowLeft } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function ChannelsSection() {
  const { t } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal()

  const items = t("channels.items") as Record<string, { title: string; description: string }>
  const order: Array<keyof typeof items> = ["phone", "whatsapp", "social", "bot"]
  const accent: Record<string, string> = {
    phone: "#0891b2",
    whatsapp: "#059669",
    social: "#2563eb",
    bot: "#7c3aed",
  }
  const iconMap = {
    phone: Phone,
    whatsapp: MessageCircle,
    social: Share2,
    bot: Bot,
  }

  return (
    <section
      id="channels"
      className="noise relative overflow-hidden bg-gradient-to-b from-[#0b182f] via-[#0d223e] to-[#0b182f] py-24 lg:py-32 text-white"
    >
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />
      <div className="absolute -top-10 right-10 h-80 w-80 rounded-full bg-[#0ea5e9]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-12 h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-14 flex flex-col items-center text-center transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("channels.label")}
          </div>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[40px] text-balance">
            {t("channels.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
            {t("channels.subtitle")}
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`stagger-children mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${cardsVisible ? "visible" : ""}`}
        >
          {order.map((key) => {
            const channel = items?.[key as keyof typeof items]
            if (!channel) return null
            const Icon = iconMap[key as keyof typeof iconMap]
            return (
              <div
                key={key as string}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#22d3ee]/60 hover:bg-white/[0.06]"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.12), transparent 40%)" }} />
                <div className="relative z-10 space-y-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${accent[key]}25`, color: accent[key] }}
                  >
                    {Icon ? <Icon className="h-6 w-6" /> : null}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{channel.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{channel.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-22px_rgba(34,211,238,0.95)] transition hover:shadow-[0_18px_46px_-20px_rgba(34,211,238,1)]"
          >
            {t("channels.cta")}
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-l from-transparent via-[#0891b2]/25 to-transparent" />
    </section>
  )
}
