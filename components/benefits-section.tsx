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

const benefits = {
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

const values = {
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
    <section id="benefits" className="magazine-section relative bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className={\mb-20 transition-all duration-1000 \\}>
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px flex-1 max-w-16 bg-[#0891b2]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#0891b2] uppercase">
              {locale === "ar" ? "لماذا انتشار؟" : "Why Entshaar?"}
            </span>
          </div>
          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-[#0c1e3c] sm:text-5xl lg:text-6xl">
            {locale === "ar" ? "فوائد تعهيد وإسناد" : "Benefits of Outsourcing"}
            <br />
            <span className="text-gradient">
              {locale === "ar" ? "مركز الاتصال" : "Call Centers"}
            </span>
          </h2>
        </div>

        <div ref={cardsRef} className={\stagger-children mb-24 grid grid-cols-1 gap-6 md:grid-cols-3 \\}>
          {benefits[locale].map((benefit) => (
            <div key={benefit.title} className="card-magazine group relative overflow-hidden rounded-3xl border border-[#e8ecf0] bg-[#fafbfc] p-8 lg:p-10">
              <span className="absolute -top-4 -left-2 text-[120px] font-black leading-none text-[#0891b2]/[0.04] select-none">
                {benefit.number}
              </span>
              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0fdfa] transition-colors duration-500 group-hover:bg-[#0891b2]">
                  <benefit.icon className="h-7 w-7 text-[#0891b2] transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#0c1e3c]">{benefit.title}</h3>
                <p className="text-base leading-relaxed text-[#64748b]">{benefit.description}</p>
              </div>
              <div className="absolute bottom-0 right-0 left-0 h-1 w-0 bg-gradient-to-l from-[#06b6d4] to-[#0891b2] transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

        <div ref={valuesRef} className={\
oise relative overflow-hidden rounded-[2rem] bg-[#0c1e3c] p-10 sm:p-14 lg:p-20 transition-all duration-1000 \\}>
          <div className="absolute top-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#0891b2]/8 blur-[120px]" />
          <div className="relative z-10">
            <div className="mb-12 max-w-xl">
              <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                {locale === "ar" ? "القيم والمقاييس المتبعة لدينا" : "Our Adopted Values & Standards"}
              </h3>
              <p className="text-base text-white/40">
                {locale === "ar" ? "نلتزم بأعلى المعايير لضمان جودة الخدمة" : "We are committed to the highest standards to ensure service quality"}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {values[locale].map((value) => (
                <div key={value.text} className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all duration-500 hover:border-[#06b6d4]/20 hover:bg-white/[0.08]">
                  <value.icon className="h-5 w-5 shrink-0 text-[#06b6d4] transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium text-white/70 group-hover:text-white/90">{value.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
