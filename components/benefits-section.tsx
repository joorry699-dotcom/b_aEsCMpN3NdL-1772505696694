"use client"

import {
  TrendingDown,
  Heart,
  Target,
  CheckCircle2,
  Users,
  UserCheck,
  ShieldCheck,
  Languages,
  MessageSquareText,
  Building2,
  BarChart3,
  Wallet,
  Monitor,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"

const benefits: Record<"ar" | "en", any> = {
  ar: [
    { icon: TrendingDown, title: "تقليل التكاليف", description: "توفير حلول متكاملة تقلل من الأعباء المالية والزمنية لإدارة فريق دعم داخلي", number: "01" },
    { icon: Heart, title: "تعزيز تجربة العميل", description: "استجابة سريعة، دعم متعدد اللغات، وتوفير الدعم خارج ساعات العمل", number: "02" },
    { icon: Target, title: "التركيز على الأساس", description: "بينما نتعهد بالتواصل مع عملائك، يمكنك التركيز على تطوير منتجاتك وخدماتك", number: "03" }
  ],
  en: [
    { icon: TrendingDown, title: "Cost Reduction", description: "Providing integrated solutions that reduce financial and time burdens of managing an internal team", number: "01" },
    { icon: Heart, title: "Enhance Customer Experience", description: "Rapid response, multilingual support, and outside business hours availability", number: "02" },
    { icon: Target, title: "Focus on Core Business", description: "While we handle your customer communication, you can focus on developing your products and services", number: "03" }
  ]
}

const values: Record<"ar" | "en", any> = {
  ar: [
    { icon: CheckCircle2, text: "تحقيق المعايير الأساسية لخدمة العملاء" },
    { icon: Users, text: "التعامل مع شكاوي العملاء" },
    { icon: UserCheck, text: "توفير كادر مختص في خدمة العملاء" },
    { icon: ShieldCheck, text: "تأمين مسؤول إشراف للتعامل مع المتطلبات" },
    { icon: Languages, text: "التوسع باللغات التي تدعم متطلبات الأعمال" },
    { icon: MessageSquareText, text: "الرد على استفسارات العملاء" },
    { icon: Building2, text: "توفير مساحات العمل" },
    { icon: BarChart3, text: "توفير تقارير تحليلية شاملة" },
    { icon: Wallet, text: "توفير تكاليف الكادر البشري" },
    { icon: Monitor, text: "توفير تكاليف الأنظمة والأجهزة" }
  ],
  en: [
    { icon: CheckCircle2, text: "Achieving essential customer service standards" },
    { icon: Users, text: "Handling customer complaints" },
    { icon: UserCheck, text: "Providing specialized customer service staff" },
    { icon: ShieldCheck, text: "Securing a supervisor to handle requirements" },
    { icon: Languages, text: "Expanding in languages supporting business needs" },
    { icon: MessageSquareText, text: "Responding to customer inquiries" },
    { icon: Building2, text: "Providing workspaces" },
    { icon: BarChart3, text: "Providing comprehensive analytical reports" },
    { icon: Wallet, text: "Saving human resource costs" },
    { icon: Monitor, text: "Saving systems and equipment costs" }
  ]
}

export default function BenefitsSection() {
  const { locale } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal()
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal()

  return (
    <section
      id="benefits"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-32 text-white"
    >
      <div className="absolute -top-10 right-10 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-12 text-center transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {locale === "ar" ? "لماذا انتشار؟" : "Why Entshaar?"}
          </div>
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-[40px]">
            {locale === "ar" ? "فوائد تعهيد وإسناد" : "Benefits of Outsourcing"}
            <span className="text-gradient block text-transparent">
              {locale === "ar" ? "مركز الاتصال" : "Call Centers"}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/65">
            {locale === "ar"
              ? "نقدم خلاصة القيمة دون إغراق في التفاصيل، بلغة واضحة وخيارات جاهزة."
              : "We surface the core value without clutter—clear wording and ready actions."}
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`stagger-children mb-16 grid grid-cols-1 gap-6 md:grid-cols-3 ${cardsVisible ? "visible" : ""}`}
        >
          {benefits[locale].map((benefit: any) => (
            <div
              key={benefit.title}
              className="card-magazine group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)]"
            >
              <span className="absolute -top-6 -left-2 text-7xl font-black leading-none text-white/7 select-none">
                {benefit.number}
              </span>
              <div className="relative z-10">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#22d3ee]/15 text-[#7ad8ff] transition-transform duration-500 group-hover:scale-105">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{benefit.description}</p>
              </div>
              <div className="absolute bottom-0 right-0 left-0 h-0.5 w-0 bg-gradient-to-l from-[#22d3ee] to-[#0891b2] transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

        <div
          ref={valuesRef}
          className={`noise relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-9 sm:p-12 lg:p-14 transition-all duration-1000 ${
            valuesVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="absolute top-0 left-1/3 h-[260px] w-[260px] rounded-full bg-[#0891b2]/10 blur-[110px]" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="max-w-xl">
              <h3 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
                {locale === "ar" ? "القيم والمقاييس" : "Values and Standards"}
              </h3>
              <p className="text-sm text-white/65">
                {locale === "ar" ? "معايير واضحة تسهّل اتخاذ القرار دون قراءة طويلة." : "Clear standards so you decide fast without long reading."}
              </p>
            </div>
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {values[locale].map((value: any) => (
                <div
                  key={value.text}
                  className="glass group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-400 hover:border-[#22d3ee]/25 hover:bg-white/[0.07]"
                >
                  <value.icon className="h-5 w-5 shrink-0 text-[#22d3ee] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium text-white/75 group-hover:text-white">{value.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
