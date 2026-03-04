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
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.channels"), href: "#channels" },
    { label: t("nav.benefits"), href: "#benefits" },
    { label: t("nav.strategies"), href: "#strategies" },
    { label: t("nav.clients"), href: "#clients" },
    { label: t("nav.blog"), href: "/blog/" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.href.replace("#", ""))
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
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0c1e3c]/95 shadow-2xl shadow-black/10 backdrop-blur-xl"
            : "bg-[#0c1e3c]/95 lg:bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="#hero" className="group flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo-icon.png"
                  alt="شركة انتشار"
                  width={40}
                  height={40}
                  priority
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">انتشار</span>
                <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase">ENTSHAAR</span>
              </div>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const section = link.href.replace("#", "")
                const isActive = activeSection === section
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#06b6d4]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 right-0 left-0 mx-auto h-0.5 w-4 rounded-full bg-[#06b6d4]" />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/5"
              >
                <Globe className="h-3.5 w-3.5" />
                {locale === "ar" ? "English" : "عربي"}
              </button>
              <Link
                href="#contact"
                className="group hidden items-center gap-2 rounded-full border border-[#0891b2]/40 bg-[#0891b2]/10 px-5 py-2.5 text-sm font-semibold text-[#06b6d4] backdrop-blur-sm transition-all duration-300 hover:border-[#06b6d4] hover:bg-[#0891b2] hover:text-white sm:flex"
              >
                <Phone className="h-4 w-4" />
                <span>{t("nav.contact")}</span>
                <ChevronLeft className={`h-3 w-3 transition-transform duration-300 ${locale === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1 rotate-180'}`} />
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/80 transition-all hover:border-white/20 hover:text-white lg:hidden"
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
        className={`fixed top-0 right-0 z-50 flex h-full w-80 flex-col bg-[#0c1e3c] shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <span className="text-lg font-bold text-white">القائمة</span>
          <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white" aria-label="إغلاق">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-4 py-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
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
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0891b2] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#06b6d4]"
          >
            <Phone className="h-4 w-4" />
            تواصل معنا
          </Link>
        </div>
      </div>
    </>
  )
}
