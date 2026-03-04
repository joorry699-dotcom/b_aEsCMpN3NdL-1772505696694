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
    const step = 240
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
    <section
      id="clients"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-30 text-white"
    >
      <div className="absolute -top-10 right-12 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-12 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`mb-12 text-center transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("nav.clients")}
          </div>
          <h2 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-[40px]">
            {t("nav.clients")}
          </h2>
          <p className="text-base text-white/70">
            {locale === "ar" ? "معا نحقق الريادة والتميز" : "Together we achieve leadership and excellence."}
          </p>
        </div>

        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-28 bg-gradient-to-l from-[#0b182f] to-transparent" />
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-28 bg-gradient-to-r from-[#0b182f] to-transparent" />

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy("left")}
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 shadow-sm transition hover:border-[#22d3ee]/40 hover:text-white lg:flex"
              aria-label="السابق"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              ref={trackRef}
              className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pt-2 [&::-webkit-scrollbar]:hidden"
            >
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.src}-${index}`}
                  className="flex h-24 w-48 shrink-0 snap-start items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 transition-all duration-500 hover:border-[#22d3ee]/25 hover:bg-white/[0.05] hover:shadow-[0_18px_40px_-28px_rgba(34,211,238,0.5)]"
                >
                  <div className="relative h-14 w-28">
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
              className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 shadow-sm transition hover:border-[#22d3ee]/40 hover:text-white lg:flex"
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
