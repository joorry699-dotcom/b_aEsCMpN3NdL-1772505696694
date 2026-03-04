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

const benefits = [
  {
    icon: TrendingDown,
    title: "تقليل التكاليف",
    description: "توفير حلول متكاملة تقلل من الأعباء المالية والزمنية لإدارة فريق دعم داخلي",
    number: "01",
  },
  {
    icon: Heart,
    title: "تعزيز تجربة العميل",
    description: "استجابة سريعة، دعم متعدد اللغات، وتوفير الدعم خارج ساعات العمل",
    number: "02",
  },
  {
    icon: Target,
    title: "التركيز على الأساس",
    description: "بينما نتعهد بالتواصل مع عملائك، يمكنك التركيز على تطوير منتجاتك وخدماتك",
    number: "03",
  },
]

const values = [
  { icon: CheckCircle2, text: "تحقيق المعايير الأساسية لخدمة العملاء" },
  { icon: Users, text: "التعامل مع شكاوي العملاء" },
  { icon: UserCheck, text: "توفير كادر مختص في خدمة العملاء" },
  { icon: ShieldCheck, text: "تأمين مسؤول إشراف للتعامل مع المتطلبات" },
  { icon: Languages, text: "التوسع باللغات التي تدعم متطلبات الأعمال" },
  { icon: MessageSquareText, text: "الرد على استفسارات العملاء" },
  { icon: Building2, text: "توفير مساحات العمل" },
  { icon: BarChart3, text: "توفير تقارير تحليلية شاملة" },
  { icon: Wallet, text: "توفير تكاليف الكادر البشري" },
  { icon: Monitor, text: "توفير تكاليف الأنظمة والأجهزة" },
]

export default function BenefitsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal()
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollReveal()

  return (
    <section id="benefits" className="magazine-section relative bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial header */}
        <div
          ref={headerRef}
          className={`mb-20 transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px flex-1 max-w-16 bg-[#0891b2]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#0891b2] uppercase">لماذا انتشار؟</span>
          </div>
          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-[#0c1e3c] sm:text-5xl lg:text-6xl">
            فوائد تعهيد وإسناد
            <br />
            <span className="text-gradient">مركز الاتصال</span>
          </h2>
        </div>

        {/* Benefits - magazine horizontal cards */}
        <div
          ref={cardsRef}
          className={`stagger-children mb-24 grid grid-cols-1 gap-6 md:grid-cols-3 ${cardsVisible ? "visible" : ""}`}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="card-magazine group relative overflow-hidden rounded-3xl border border-[#e8ecf0] bg-[#fafbfc] p-8 lg:p-10"
            >
              {/* Large number watermark */}
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

              {/* Bottom accent */}
              <div className="absolute bottom-0 right-0 left-0 h-1 w-0 bg-gradient-to-l from-[#06b6d4] to-[#0891b2] transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Values - dark magazine spread */}
        <div
          ref={valuesRef}
          className={`noise relative overflow-hidden rounded-[2rem] bg-[#0c1e3c] p-10 sm:p-14 lg:p-20 transition-all duration-1000 ${
            valuesVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#0891b2]/8 blur-[120px]" />

          <div className="relative z-10">
            <div className="mb-12 max-w-xl">
              <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                القيم والمقاييس المتبعة لدينا
              </h3>
              <p className="text-base text-white/40">نلتزم بأعلى المعايير لضمان جودة الخدمة</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {values.map((value) => (
                <div
                  key={value.text}
                  className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all duration-500 hover:border-[#06b6d4]/20 hover:bg-white/[0.08]"
                >
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
