"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, ChevronLeft, Globe } from "lucide-react"
import { useLanguage } from "./language-provider"

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const navLinks = [
    { label: t("nav.home"), id: "hero" },
    { label: t("nav.services"), id: "services" },
    { label: t("nav.channels"), id: "channels" },
    { label: t("nav.benefits"), id: "benefits" },
    { label: t("nav.strategies"), id: "strategies" },
    { label: t("nav.clients"), id: "clients" },
    { label: t("nav.blog"), id: "latest-news" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.id)
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 border-b border-white/5 transition-all duration-500 ${
          scrolled
            ? "bg-gradient-to-r from-[#0b182f]/95 via-[#0d223e]/90 to-[#0b182f]/95 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "bg-gradient-to-r from-[#0b182f]/85 via-[#0d223e]/80 to-[#0b182f]/85"
        }`}
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-18">
            <Link href="/#hero" className="group flex items-center gap-3">
              <div className="relative flex h-10 w-28 sm:w-32 items-center justify-start overflow-hidden">
                <Image
                  src="/images/logo-white.png"
                  alt="شركة انتشار"
                  width={150}
                  height={44}
                  priority
                  className="object-contain object-right sm:object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                const href = `/#${link.id}`
                return (
                  <Link
                    key={link.id}
                    href={href}
                    className={`relative px-3 py-2 text-[13px] font-medium transition-all duration-300 ${
                      isActive ? "text-[#7ad8ff]" : "text-white/65 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 right-0 left-0 mx-auto h-0.5 w-6 rounded-full bg-[#22d3ee]" />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/80 transition hover:border-[#22d3ee]/50 hover:text-white"
              >
                <Globe className="h-3.5 w-3.5" />
                {locale === "ar" ? "English" : "عربي"}
              </button>
              <Link
                href="/#contact"
                className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_36px_-22px_rgba(34,211,238,0.9)] transition hover:shadow-[0_16px_40px_-20px_rgba(34,211,238,1)] sm:flex"
              >
                <Phone className="h-4 w-4" />
                <span>{t("nav.contact")}</span>
                <ChevronLeft className={`h-3 w-3 transition-transform duration-300 ${locale === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'}`} />
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-all hover:border-[#22d3ee]/50 hover:text-white lg:hidden"
                aria-label="القائمة"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-80 flex-col bg-gradient-to-b from-[#0b182f] via-[#0d223e] to-[#0b182f] shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <Link href="/#hero" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/logo-white.png"
              alt="Entshaar"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <span className="text-sm font-semibold text-white/70">{t("nav.home")}</span>
          <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white" aria-label="إغلاق">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-4 py-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.id}
              href={`/#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base font-medium text-white/70 transition-all hover:bg-white/5 hover:text-[#06b6d4]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-white/5 p-4">
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0ea5e9] to-[#22d3ee] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_-18px_rgba(34,211,238,0.9)] transition hover:shadow-[0_14px_36px_-16px_rgba(34,211,238,1)]"
          >
            <Phone className="h-4 w-4" />
            {t("nav.contact")}
          </Link>
        </div>
      </div>
    </>
  )
}
