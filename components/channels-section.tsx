"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, MessageCircle, Share2, Bot, ArrowLeft } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const channels = [
  {
    icon: Phone,
    title: "المكالمات الهاتفية",
    description: "استقبال وإجراء المكالمات باحترافية عالية على مدار الساعة",
    accent: "#0891b2",
  },
  {
    icon: MessageCircle,
    title: "واتساب الأعمال",
    description: "التواصل مع العملاء عبر واتساب الأعمال بسرعة وكفاءة",
    accent: "#059669",
  },
  {
    icon: Share2,
    title: "التواصل الاجتماعي",
    description: "إدارة جميع حسابات التواصل الاجتماعي والرد على الاستفسارات",
    accent: "#2563eb",
  },
  {
    icon: Bot,
    title: "الرد الآلي",
    description: "أنظمة رد آلي ذكية للاستجابة السريعة خارج أوقات العمل",
    accent: "#7c3aed",
  },
]

export default function ChannelsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal()

  return (
    <section id="channels" className="noise relative overflow-hidden bg-[#0c1e3c] py-28 lg:py-36">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/channels-unified.jpg"
          alt="منصة الاتصال الموحدة"
          fill
          className="object-cover opacity-8"
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 right-1/3 h-[500px] w-[500px] rounded-full bg-[#0891b2]/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Split header - magazine editorial */}
        <div
          ref={headerRef}
          className={`mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-[#06b6d4]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#06b6d4] uppercase">قنوات التواصل</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl text-balance">
              جميع قنوات الاتصال
              <br />
              <span className="text-gradient">في مكان واحد</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-white/40 lg:text-left">
            أزل تعقيد التعامل مع عملائك ووفر جهدك ومواردك وانطلق مع منصة واحدة تلبي احتياجات عملك
          </p>
        </div>

        {/* Channel Cards - staggered magazine layout */}
        <div
          ref={cardsRef}
          className={`stagger-children mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ${cardsVisible ? "visible" : ""}`}
        >
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="card-magazine glass group relative overflow-hidden rounded-3xl p-8"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 right-0 left-0 h-1 transition-all duration-500 group-hover:h-1.5"
                style={{ backgroundColor: channel.accent }}
              />

              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${channel.accent}20` }}
              >
                <channel.icon className="h-7 w-7" style={{ color: channel.accent }} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-white">{channel.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">{channel.description}</p>

              {/* Hover glow */}
              <div
                className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-20"
                style={{ backgroundColor: channel.accent }}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-[#0891b2]/30 bg-[#0891b2]/10 px-8 py-4 text-base font-semibold text-[#06b6d4] backdrop-blur-sm transition-all duration-300 hover:border-[#06b6d4] hover:bg-[#0891b2] hover:text-white"
          >
            ابدأ الآن
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-l from-transparent via-[#0891b2]/20 to-transparent" />
    </section>
  )
}
