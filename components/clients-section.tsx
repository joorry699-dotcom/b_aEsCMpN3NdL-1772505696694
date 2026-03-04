"use client"

import { useRef, useEffect } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useLanguage } from "./language-provider"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const clients = [
  { src: "/images/clients/photo_5852539295183342911_m.jpg", name: "Client Photo 01" },
  { src: "/images/clients/photo_5852539295183342912_m.jpg", name: "Client Photo 02" },
  { src: "/images/clients/photo_5852539295183342913_x.jpg", name: "Client Photo 03" },
  { src: "/images/clients/photo_5852539295183342914_x.jpg", name: "Client Photo 04" },
  { src: "/images/clients/photo_5852539295183342915_m.jpg", name: "Client Photo 05" },
  { src: "/images/clients/photo_5852539295183342917_x.jpg", name: "Client Photo 06" },
]

export default function ClientsSection() {
  const { t, locale } = useLanguage()
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const step = 240 // px to move per tick
    const interval = setInterval(() => {
      track.scrollBy({ left: step, behavior: "smooth" })
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - step) {
        track.scrollTo({ left: 0, behavior: "smooth" })
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const scrollBy = (dir: "left" | "right") => {
    const track = trackRef.current
    if (!track) return
    const step = dir === "left" ? -240 : 240
    track.scrollBy({ left: step, behavior: "smooth" })
  }

  return (
    <section id="clients" className="magazine-section relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#0891b2]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#0891b2] uppercase">{t("nav.clients")}</span>
            <span className="h-px w-12 bg-[#0891b2]" />
          </div>
          <h2 className="mb-4 text-4xl font-bold text-[#0c1e3c] sm:text-5xl lg:text-6xl">
            {t("nav.clients")}
          </h2>
          <p className="text-lg text-[#64748b]">
            {locale === "ar" ? "معا نحقق الريادة والتميز" : "Together we achieve leadership and excellence."}
          </p>
        </div>

        {/* Marquee - magazine style */}
        <div className="relative overflow-hidden py-4">
          {/* Fade edges */}
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy("left")}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#e8ecf0] bg-white text-[#0c1e3c] shadow-sm transition hover:border-[#0891b2]/50 hover:text-[#0891b2] lg:flex"
              aria-label="السابق"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={trackRef}
              className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pt-2 [&::-webkit-scrollbar]:hidden"
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.src}-${index}`}
                  className="flex h-28 w-52 shrink-0 snap-start items-center justify-center rounded-2xl border border-[#e8ecf0] bg-white px-8 transition-all duration-500 hover:border-[#0891b2]/30 hover:shadow-xl hover:shadow-[#0891b2]/5"
                >
                  <div className="relative h-16 w-32">
                    <Image
                      src={client.src}
                      alt={`${client.name} logo`}
                      fill
                      className="object-contain transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollBy("right")}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#e8ecf0] bg-white text-[#0c1e3c] shadow-sm transition hover:border-[#0891b2]/50 hover:text-[#0891b2] lg:flex"
              aria-label="التالي"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
