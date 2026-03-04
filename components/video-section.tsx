"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useLanguage } from "./language-provider"

// Use local asset to avoid remote playback issues/CORS in production
const videoSrc = "/videos/hr-showreel.mp4"
const posterSrc = "/images/partners/Elmam_inf_saudi_man_presenting_white_board_leading_a_meeting_Th_3fa926c9-bd44-4c4d-865b-916ff67c687c.jpg"

export default function VideoSection() {
  const { locale } = useLanguage()
  const [open, setOpen] = useState(false)

  const title = locale === "ar" ? "شاهد كيف نُدير التجربة الكاملة" : "See How We Run the Full Experience"
  const subtitle =
    locale === "ar"
      ? "مقطع تعريفي سريع يوضح أسلوب انتشار في تشغيل مراكز الاتصال وإدارة تجربة العميل عبر كل القنوات."
      : "A quick explainer showing Entishar’s modern way of running contact centers and CX across every channel."
  const cta = locale === "ar" ? "شاهد الفيديو" : "Watch the video"

  return (
    <section id="about-video" className="relative overflow-hidden bg-[#0c1e3c] py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1e3c] via-[#0b1a33] to-[#0c1e3c]" />
      <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#06b6d4]/10 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-[#0891b2]/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex-1 space-y-6 text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#06b6d4]">
            {locale === "ar" ? "فيديو تعريفي" : "Showreel"}
          </p>
          <h2 className="text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">{title}</h2>
          <p className="text-base text-white/70 md:text-lg">{subtitle}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-3 rounded-full bg-[#06b6d4] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#06b6d4]/20 transition-all hover:bg-[#0891b2] hover:shadow-[#0891b2]/30"
          >
            <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
            {cta}
          </button>
        </div>

        <div className="relative flex-1">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-[#06b6d4]/10">
            <div className="relative aspect-video w-full">
              <Image src={posterSrc} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="absolute inset-0 flex items-center justify-center text-white transition-all duration-300"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/30 transition-all duration-300 group-hover:scale-105">
                  <Play className="h-6 w-6" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl border-white/10 bg-[#0c1e3c]/95 p-0 shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm font-semibold">{locale === "ar" ? "المقطع التعريفي" : "Explainer"}</span>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 text-white/70 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative aspect-video w-full overflow-hidden">
            <video
              src={videoSrc}
              controls
              poster={posterSrc}
              className="h-full w-full object-cover"
              playsInline
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
