"use client"

import {
  Headphones,
  Cloud,
  MessageSquare,
  Settings,
  PhoneCall,
  Globe,
  Server,
  Car,
  Map,
  Briefcase,
  MoreHorizontal,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

export default function ServicesSection() {
  const { t } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal()

  const services = [
    {
      icon: Headphones,
      title: t("services.items.outsourcing.title"),
      description: t("services.items.outsourcing.description"),
    },
    {
      icon: Cloud,
      title: t("services.items.cloud.title"),
      description: t("services.items.cloud.description"),
    },
    {
      icon: MessageSquare,
      title: t("services.items.chat.title"),
      description: t("services.items.chat.description"),
    },
    {
      icon: Settings,
      title: t("services.items.crm.title"),
      description: t("services.items.crm.description"),
    },
    {
      icon: PhoneCall,
      title: t("services.items.telemarketing.title"),
      description: t("services.items.telemarketing.description"),
    },
    {
      icon: Globe,
      title: t("services.items.iptelephony.title"),
      description: t("services.items.iptelephony.description"),
    },
    {
      icon: Server,
      title: t("services.items.unified.title"),
      description: t("services.items.unified.description"),
    },
    {
      icon: Car,
      title: t("services.items.tamm.title"),
      description: t("services.items.tamm.description"),
    },
    {
      icon: Map,
      title: t("services.items.masarat.title"),
      description: t("services.items.masarat.description"),
    },
    {
      icon: Briefcase,
      title: t("services.items.muqeem.title"),
      description: t("services.items.muqeem.description"),
    },
    {
      icon: MoreHorizontal,
      title: t("services.items.other.title"),
      description: t("services.items.other.description"),
    },
  ]

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
            نقدم مجموعة شاملة من حلول مراكز الاتصال المصممة خصيصا لتلبية احتياجات منشأتك
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className={`stagger-children grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${gridVisible ? "visible" : ""}`}
        >
          {services.map((service, i) => (
            <div
              key={service.title}
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
      </div>
    </section>
  )
}
