"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Headphones, BarChart3, Shield, ArrowLeft, ArrowRight } from "lucide-react"
import { useLanguage } from "./language-provider"

const stats = [
  { value: 15, suffix: "+", label: "سنة خبرة" },
  { value: 200, suffix: "+", label: "عميل" },
  { value: 500, suffix: "+", label: "موظف" },
  { value: 24, suffix: "/7", label: "دعم متواصل" },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return
    let current = 0
    const step = Math.max(1, Math.floor(target / 40))
    const interval = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(current)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [started, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function HeroSection() {
  const { t, locale } = useLanguage()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const stats = [
    { value: 15, suffix: "+", label: locale === 'ar' ? "سنة خبرة" : "Years Experience" },
    { value: 200, suffix: "+", label: locale === 'ar' ? "عميل" : "Clients" },
    { value: 500, suffix: "+", label: locale === 'ar' ? "موظف" : "Employees" },
    { value: 24, suffix: "/7", label: locale === 'ar' ? "دعم متواصل" : "Support" },
  ]

  return (
    <section
      id="hero"
      className="noise relative overflow-hidden bg-gradient-to-b from-[#0b182f] via-[#0d223e] to-[#0b182f]"
    >
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-15">
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b182f]/92 via-[#0d223e]/88 to-[#0b182f]" />
      </div>

      <div className="absolute -top-24 -left-10 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-[#0ea5e9]/12 blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "36px 36px" }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 sm:px-6 lg:px-8 pt-28 pb-24 sm:pt-32 lg:pt-36">
        <div
          className={`mb-8 transition-all duration-700 ${loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22d3ee] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22d3ee]" />
            </span>
            <span className="text-white/80">شركة انتشار لحلول تعهيد وإسناد الأعمال</span>
          </div>
        </div>

        <h1
          className={`mb-6 max-w-4xl text-center text-4xl font-bold leading-[1.2] tracking-tight text-white text-balance transition-all delay-150 duration-900 sm:text-5xl lg:text-6xl ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {t("hero.title")}
        </h1>

        <p
          className={`mb-10 max-w-2xl text-center text-base leading-relaxed text-white/70 transition-all delay-250 duration-900 sm:text-lg ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className={`mb-14 flex w-full max-w-xl flex-col items-stretch gap-3 transition-all delay-350 duration-900 sm:flex-row sm:items-center sm:justify-center ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(34,211,238,0.9)] transition hover:shadow-[0_20px_46px_-22px_rgba(34,211,238,1)]"
          >
            {t("hero.ctaPrimary")}
            {locale === "ar" ? (
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
          <Link
            href="#services"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:border-[#22d3ee] hover:text-white"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>

        <div
          className={`mb-14 flex w-full flex-wrap items-center justify-center gap-3 transition-all delay-450 duration-900 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {[
            { icon: Headphones, text: t("hero.features.channels") },
            { icon: Shield, text: t("hero.features.partner") },
            { icon: BarChart3, text: t("hero.features.reports") },
          ].map((item) => (
            <div
              key={item.text}
              className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 transition hover:border-[#22d3ee]/60 hover:text-white"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#22d3ee]/12 text-[#7ad8ff]">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div
          className={`grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 transition-all delay-550 duration-900 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center shadow-[0_14px_36px_-26px_rgba(0,0,0,0.8)]"
            >
              <div className="text-3xl font-bold text-white sm:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Magazine page separator */}
      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-l from-transparent via-[#0891b2]/30 to-transparent" />
    </section>
  )
}
