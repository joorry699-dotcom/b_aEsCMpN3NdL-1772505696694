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
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0c1e3c]/90 text-white shadow-2xl backdrop-blur-xl transition-all duration-500 hover:bg-[#0891b2] ${
          showTop ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-75 opacity-0 pointer-events-none"
        }`}
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* WhatsApp */}
      <a
        href="https://wa.me/966920026002"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl shadow-[#25d366]/30 transition-all duration-300 hover:scale-110 hover:shadow-[#25d366]/50"
        aria-label="تواصل عبر واتساب"
      >
        <MessageCircle className="h-6 w-6" />
        {/* Ping */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d366] opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#25d366] border-2 border-white" />
        </span>
      </a>
    </div>
  )
}
