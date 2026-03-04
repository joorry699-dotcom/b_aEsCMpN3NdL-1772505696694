"use client"

import { Star, Quote } from "lucide-react"
import { useLanguage } from "./language-provider"

export default function TestimonialsSection() {
  const { t } = useLanguage()
  const testimonials = (t("testimonials.items") as Array<{ name: string; role: string; content: string; rating: number }>) || []

  return (
    <section
      id="testimonials"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 sm:py-32 text-white noise"
    >
      <div className="absolute -top-12 right-16 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-12 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />
      
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("testimonials.label")}
          </div>
          <p className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {t("testimonials.title")}
          </p>
          <p className="mt-3 text-base leading-relaxed text-white/70 text-pretty">
            {t("testimonials.subtitle")}
          </p>
        </div>
        
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name} 
              className="card-magazine group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#22d3ee]/30 hover:bg-white/[0.07]"
            >
              <div>
                <Quote className="mb-5 h-8 w-8 text-white/25 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#22d3ee]" />
                <div className="mb-3 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#22d3ee] text-[#22d3ee]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/80">
                  {testimonial.content}
                </p>
              </div>
              
              <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#22d3ee]/15 text-sm font-bold text-[#0b182f]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-xs text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/25 to-transparent" />
    </section>
  )
}
