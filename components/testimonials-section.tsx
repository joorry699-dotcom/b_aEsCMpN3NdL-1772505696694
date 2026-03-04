"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "أحمد عبدالله",
    role: "المدير التنفيذي لشركة تقنية",
    content: "خدمات انتشار في إدارة مركز الاتصال أحدثت نقلة نوعية في مستوى رضا عملائنا. احترافية عالية واستجابة سريعة تجعلهم الشريك المثالي لأي منشأة.",
    rating: 5,
  },
  {
    name: "سارة خالد",
    role: "مديرة عمليات التجارة الإلكترونية",
    content: "منذ تعاقدنا مع انتشار لتعهيد مركز الاتصال، شهدنا انخفاضاً ملحوظاً في أوقات الانتظار وتحسناً في جودة الردود. فريق مدرب ومهني يستحق الثقة.",
    rating: 5,
  },
  {
    name: "محمد العمر",
    role: "مؤسس تطبيق خدمات",
    content: "الدقة في التقارير والتحليلات التي يقدمونها ساعدتنا على فهم احتياجات عملائنا بشكل أفضل. هم ليسوا مجرد مزود خدمة بل شركاء نجاح.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-[#0a1526] py-24 sm:py-32 overflow-hidden noise">
      {/* Background elements */}
      <div className="absolute top-0 right-0 h-px w-1/2 bg-gradient-to-l from-[#0891b2]/30 to-transparent" />
      <div className="absolute top-1/2 right-1/4 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#0891b2]/5 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-[#06b6d4]/5 blur-[100px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold leading-7 tracking-wide text-[#06b6d4]">آراء شركاء النجاح</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            ماذا يقول عملاؤنا عن خدمات <span className="text-gradient">انتشار</span>
          </p>
          <p className="mt-6 text-lg leading-8 text-white/50 text-pretty">
            نعتز بثقة عملائنا ونعتبر نجاحهم هو المقياس الحقيقي لجودة خدماتنا في مراكز الاتصال.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name} 
              className="glass group relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-500 hover:border-[#0891b2]/30 hover:bg-white/[0.04]"
            >
              <div>
                <Quote className="h-8 w-8 text-[#0891b2]/40 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#0891b2]" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#06b6d4] text-[#06b6d4]" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-white/80">
                  {testimonial.content}
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0891b2]/20 text-lg font-bold text-[#06b6d4]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/30 to-transparent" />
    </section>
  )
}
