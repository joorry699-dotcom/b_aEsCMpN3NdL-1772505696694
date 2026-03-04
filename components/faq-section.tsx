"use client"

import { useLanguage } from "./language-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const { t } = useLanguage()
  const faqs = t("faq.questions")

  return (
    <section
      id="faq"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-30 text-white"
    >
      <div className="absolute -top-10 right-20 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-24 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ad8ff]">
            {t("faq.title")}
          </div>
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-[40px]">{t("faq.subtitle")}</h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70">
            {t("faq.description") || ""}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq: any, index: number) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="card-magazine overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4"
              >
                <AccordionTrigger className="text-start text-base sm:text-lg text-white hover:text-[#7ad8ff] hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-start text-sm sm:text-base text-white/70 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
