"use client"

import { Lightbulb, BookOpen, UserCog, BarChart3 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const strategies = [
  {
    number: "01",
    icon: Lightbulb,
    title: "فهم الاحتياجات",
    description: "نفهم احتياجات العميل وطبيعة العمل وترتيب أولوياته ثم التغلب على المخاوف والصعوبات",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "بنك المعرفة",
    description: "ننشئ مكتبة أعمال وبنك معرفة للتدريب وكلائنا على التعامل مع شركاء الشركة",
  },
  {
    number: "03",
    icon: UserCog,
    title: "قيادة الفريق",
    description: "تعيين قائد لفريق العمل لضمان جودة تسليم المهام مع ضمان استمرارية تدريب وتطوير الموظفين",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "التقارير والتحليلات",
    description: "نوظف مختص لمتابعة التقارير والتحليلات التي تساعد في التعامل مع عملائهم",
  },
]

export default function StrategiesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal()

  return (
    <section id="strategies" className="magazine-section relative bg-[#fafbfc] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial header */}
        <div
          ref={headerRef}
          className={`mb-20 text-center transition-all duration-1000 ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#0891b2]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#0891b2] uppercase">منهجيتنا</span>
            <span className="h-px w-12 bg-[#0891b2]" />
          </div>
          <h2 className="mb-6 text-4xl font-bold text-[#0c1e3c] sm:text-5xl lg:text-6xl">
            نتبع <span className="text-gradient">4 استراتيجيات</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#64748b]">
            منهجية عمل مدروسة تضمن تحقيق أفضل النتائج لمنشأتك
          </p>
        </div>

        {/* Timeline steps - editorial */}
        <div
          ref={stepsRef}
          className={`relative transition-all duration-1000 ${
            stepsVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 right-[calc(50%-1px)] hidden w-px bg-gradient-to-b from-transparent via-[#0891b2]/20 to-transparent lg:block" />

          <div className="flex flex-col gap-16 lg:gap-0">
            {strategies.map((strategy, i) => {
              const isEven = i % 2 === 0
              return (
                <div
                  key={strategy.number}
                  className={`relative flex flex-col items-center gap-8 lg:flex-row ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Content side */}
                  <div className={`flex-1 ${isEven ? "lg:text-left" : "lg:text-right"}`}>
                    <div className={`card-magazine max-w-md rounded-3xl border border-[#e8ecf0] bg-white p-8 lg:p-10 ${isEven ? "lg:mr-auto" : "lg:ml-auto"}`}>
                      {/* Number */}
                      <span className="mb-4 inline-block text-6xl font-black text-[#0891b2]/10">
                        {strategy.number}
                      </span>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0fdfa]">
                        <strategy.icon className="h-6 w-6 text-[#0891b2]" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-[#0c1e3c]">{strategy.title}</h3>
                      <p className="text-base leading-relaxed text-[#64748b]">{strategy.description}</p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#fafbfc] bg-[#0891b2] shadow-lg shadow-[#0891b2]/20">
                    <span className="text-sm font-bold text-white">{strategy.number}</span>
                  </div>

                  {/* Empty side */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
