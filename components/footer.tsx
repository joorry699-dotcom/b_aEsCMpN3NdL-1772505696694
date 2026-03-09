"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "./language-provider"

export default function Footer() {
  const { t } = useLanguage()
  
  const footerLinks = {
    support: [
      { label: t("nav.contact"), href: "/#contact" },
      { label: t("nav.careers"), href: "/#careers" },
    ],
    entshaar: [
      { label: t("nav.about"), href: "/#about" },
      { label: t("nav.home"), href: "/#hero" },
      { label: t("nav.clients"), href: "/#clients" },
      { label: t("nav.services"), href: "/#services" },
      { label: t("nav.blog"), href: "/#latest-news" },
    ],
  }
  return (
    <footer className="noise relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] pt-18 pb-10 text-white">
      <div className="absolute -top-6 right-1/4 h-[220px] w-[420px] rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-12 h-[240px] w-[260px] rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:flex-row lg:items-center lg:p-10 shadow-[0_18px_40px_-30px_rgba(34,211,238,0.4)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
              <Image
                src="/images/entshaar-logo.jpg"
                alt="شركة انتشار"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">انتشار</h3>
              <span className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase">ENTSHAAR BPO</span>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/65">
            شركة انتشار لحلول تعهيد وإسناد الأعمال. نخدمك بمعايير موحدة ولغة بصرية واضحة تعكس ألوان انتشار.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">الدعم</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/55 transition-colors duration-300 hover:text-[#7ad8ff]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">انتشار</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.entshaar.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/55 transition-colors duration-300 hover:text-[#7ad8ff]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">تواصل معنا</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#7ad8ff]" />
                <a
                  href="tel:920026002"
                  className="text-sm text-white/65 transition-colors duration-300 hover:text-[#7ad8ff]"
                  dir="ltr"
                >
                  920026002
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#7ad8ff]" />
                <a
                  href="mailto:info@entshaar.com"
                  className="text-sm text-white/65 transition-colors duration-300 hover:text-[#7ad8ff]"
                  dir="ltr"
                >
                  info@entshaar.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#7ad8ff]" />
                <a
                  href="https://www.google.com/maps/place/Al+Urubah+Branch+Rd,+Al+Raed,+Riyadh+12352"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/65 transition-colors duration-300 hover:text-[#7ad8ff]"
                >
                  المملكة العربية السعودية
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">تابعنا</h4>
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Twitter",
                  href: "https://twitter.com/entshaar_sa",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/entshaar_sa/",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/entshaarsa/",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-300 hover:border-[#22d3ee]/30 hover:bg-[#22d3ee]/12 hover:text-white"
                  aria-label={social.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="hr-magazine mb-6" />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[11px] text-white/45">
            {"جميع الحقوق محفوظة لشركة انتشار الجودة"} &copy; {new Date().getFullYear()}
          </p>
          <div className="text-[11px] text-white/45">
            {"رقم التواصل"} · 920026002
          </div>
        </div>
      </div>
    </footer>
  )
}
