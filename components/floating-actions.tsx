"use client"

import { useEffect, useState } from "react"
import { ArrowUp, MessageCircle } from "lucide-react"

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-3 sm:bottom-6 sm:left-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-[0_18px_42px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 hover:border-[#22d3ee]/60 hover:bg-[#22d3ee]/15 ${
          showTop ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-90 opacity-0 pointer-events-none"
        }`}
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <a
        href="https://wa.me/966920026002"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_16px_36px_-18px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 hover:shadow-[0_18px_40px_-16px_rgba(37,211,102,0.9)]"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d366] opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#25d366] border-2 border-white" />
        </span>
      </a>
    </div>
  )
}
