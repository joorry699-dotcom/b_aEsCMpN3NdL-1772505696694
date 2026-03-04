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
    <section id="hero" className="noise relative min-h-screen overflow-hidden bg-[#0c1e3c]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-20"
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1e3c]/80 via-[#0c1e3c]/60 to-[#0c1e3c]" />
        </div>

        {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#0891b2]/8 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#06b6d4]/6 blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-36 pb-24 lg:px-8">
        {/* Badge */}
        <div
          className={`mb-10 transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="glass inline-flex items-center gap-3 rounded-full px-5 py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06b6d4] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06b6d4]" />
            </span>
            <span className="text-sm font-medium text-white/70">
              شركة انتشار لحلول تعهيد وإسناد الأعمال
            </span>
          </div>
        </div>

        {/* Main Heading - Editorial large */}
        <h1
          className={`mb-8 max-w-5xl text-center text-5xl font-bold leading-[1.15] tracking-tight text-white text-balance transition-all delay-200 duration-1000 sm:text-6xl lg:text-7xl xl:text-8xl ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p
          className={`mb-12 max-w-2xl text-center text-lg leading-relaxed text-white/50 text-pretty transition-all delay-400 duration-1000 sm:text-xl ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA */}
        <div
          className={`mb-20 flex flex-col items-center gap-4 transition-all delay-500 duration-1000 sm:flex-row ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link
            href="#contact"
            className="group flex items-center gap-3 rounded-full bg-[#0891b2] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#06b6d4] hover:shadow-2xl hover:shadow-[#0891b2]/30"
          >
            {t("hero.ctaPrimary")}
            {locale === 'ar' ? <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" /> : <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
          </Link>
          <Link
            href="#services"
            className="group rounded-full border border-white/10 px-8 py-4 text-base font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>

        {/* Feature pills */}
        <div
          className={`mb-20 flex flex-wrap items-center justify-center gap-4 transition-all delay-600 duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { icon: Headphones, text: t("hero.features.channels") },
            { icon: Shield, text: t("hero.features.partner") },
            { icon: BarChart3, text: t("hero.features.reports") },
          ].map((item) => (
            <div
              key={item.text}
              className="glass group flex items-center gap-3 rounded-2xl px-6 py-4 transition-all duration-500 hover:border-[#06b6d4]/20 hover:bg-white/[0.08]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0891b2]/15">
                <item.icon className="h-5 w-5 text-[#06b6d4]" />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-white/90">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Stats - editorial style */}
        <div
          className={`grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4 transition-all delay-700 duration-1000 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium tracking-wide text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Magazine page separator */}
      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-l from-transparent via-[#0891b2]/30 to-transparent" />
    </section>
  )
}
