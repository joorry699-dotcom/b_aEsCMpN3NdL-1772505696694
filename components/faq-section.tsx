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
    <section id="faq" className="py-24 bg-[#0a1528]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-white/60">
            {t("faq.subtitle")}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq: any, index: number) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 rounded-2xl px-6 bg-[#0c1e3c]/50 backdrop-blur-sm overflow-hidden"
              >
                <AccordionTrigger className="text-start text-lg text-white hover:text-[#06b6d4] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-start text-white/60 text-base pb-6 leading-relaxed">
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
