"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Briefcase, MapPin, Clock3, ChevronLeft, FileText, Phone, Mail, Send } from "lucide-react"

const jobs = [
  {
    id: 1,
    title: { ar: "مدير حسابات عملاء BPO", en: "BPO Account Manager" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "الرياض", en: "Riyadh" },
    salary: { ar: "راتب + عمولات", en: "Base + Commission" },
    responsibilities: {
      ar: [
        "قيادة علاقات العملاء الرئيسيين ومتابعة الأهداف الشهرية.",
        "بناء عروض التعهيد وتنسيق التسعير مع الفرق التشغيلية.",
        "إدارة مراجعات الأداء الربع سنوية ورفع تقارير المخاطر.",
      ],
      en: [
        "Own key client relationships and monthly targets.",
        "Shape outsourcing proposals and align pricing with ops teams.",
        "Run quarterly reviews and surface risks early.",
      ],
    },
  },
  {
    id: 2,
    title: { ar: "وكيل مركز اتصال (عربي/إنجليزي)", en: "Contact Center Agent (AR/EN)" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "الرياض / عمل هجين", en: "Riyadh / Hybrid" },
    salary: { ar: "رواتب تنافسية + حوافز", en: "Competitive + Incentives" },
    responsibilities: {
      ar: [
        "التعامل مع المكالمات والرسائل وفق معايير الجودة ووقت الاستجابة.",
        "توثيق التذاكر في الـ CRM وتحديث حالة العميل بدقة.",
        "اقتراح تحسينات على الاسكربتات ومسارات الحل." ,
      ],
      en: [
        "Handle calls/messages within SLA and quality bars.",
        "Log tickets in CRM and keep customer state accurate.",
        "Suggest script and journey improvements from live feedback.",
      ],
    },
  },
  {
    id: 3,
    title: { ar: "أخصائي موارد بشرية", en: "HR Specialist" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "الرياض", en: "Riyadh" },
    salary: { ar: "بناءً على الخبرة", en: "Based on Experience" },
    responsibilities: {
      ar: [
        "إدارة عمليات التوظيف من طلب الاحتياج حتى توقيع العقد.",
        "تشغيل سياسات الحضور والإجازات والرواتب بالتوافق مع اللوائح.",
        "إعداد تقارير دورية عن مؤشرات الاستبقاء والرضا." ,
      ],
      en: [
        "Run hiring cycles end-to-end until contract signature.",
        "Operate attendance, leave, and payroll in line with policy.",
        "Publish recurring reports on retention and engagement KPIs.",
      ],
    },
  },
  {
    id: 4,
    title: { ar: "تنفيذي مبيعات حلول تعهيد", en: "Outsourcing Sales Executive" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "الرياض", en: "Riyadh" },
    salary: { ar: "راتب + عمولات", en: "Base + Commission" },
    responsibilities: {
      ar: [
        "توليد فرص جديدة وقيادة العروض حتى الإغلاق.",
        "تصميم حلول BPO مع الفريق الفني وتحديد مؤشرات الأداء.",
        "متابعة ما بعد الإغلاق لضمان تشغيل سلس وبناء ولاء." ,
      ],
      en: [
        "Generate new opportunities and steer deals to close.",
        "Co-design BPO solutions with delivery and define KPIs.",
        "Follow through post-close to ensure smooth onboarding and loyalty.",
      ],
    },
  },
  {
    id: 5,
    title: { ar: "محلل ضمان جودة مركز الاتصال", en: "Contact Center QA Analyst" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "الرياض", en: "Riyadh" },
    salary: { ar: "رواتب تنافسية", en: "Competitive Salary" },
    responsibilities: {
      ar: [
        "مراجعة العينات اليومية وتسجيل الملاحظات القابلة للتنفيذ.",
        "إعداد نماذج تقييم موحدة وتحليل الاتجاهات أسبوعياً.",
        "تنسيق جلسات كوتشنغ قصيرة لتحسين الأداء بسرعة." ,
      ],
      en: [
        "Audit daily samples and log actionable notes.",
        "Maintain scorecards and analyze trends weekly.",
        "Coordinate micro-coaching to lift performance fast.",
      ],
    },
  },
  {
    id: 6,
    title: { ar: "أخصائي تخطيط قوى عاملة", en: "Workforce Planning Specialist" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "الرياض", en: "Riyadh" },
    salary: { ar: "بناءً على الخبرة", en: "Based on Experience" },
    responsibilities: {
        ar: [
        "توقّع الأحمال وتوزيع الجداول لتقليل زمن الانتظار.",
        "متابعة التزام الشفتات وإدارة الحضور والغياب فورياً.",
        "إصدار تقارير تغطية وسعة أسبوعية للإدارة." ,
      ],
      en: [
        "Forecast demand and schedule to reduce queues.",
        "Track adherence and manage attendance in real time.",
        "Publish weekly capacity and coverage reports.",
      ],
    },
  },
  {
    id: 7,
    title: { ar: "مدرب خدمة عملاء", en: "Customer Service Trainer" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "الرياض", en: "Riyadh" },
    salary: { ar: "رواتب تنافسية", en: "Competitive Salary" },
    responsibilities: {
      ar: [
        "تصميم مناهج تدريبية للمكالمات والصوت والرسائل.",
        "إطلاق معسكرات تأهيل سريعة للمستجدين وتقييمهم.",
        "متابعة الأداء بعد التدريب وخطط تحسين فردية." ,
      ],
      en: [
        "Design curricula for voice and digital care.",
        "Run bootcamps for new hires with assessments.",
        "Track post-training performance with personal plans.",
      ],
    },
  },
  {
    id: 8,
    title: { ar: "أخصائي خدمة عملاء عبر السوشيال", en: "Social Care Specialist" },
    type: { ar: "دوام كامل", en: "Full-time" },
    location: { ar: "عن بعد", en: "Remote" },
    salary: { ar: "بناءً على الخبرة", en: "Based on Experience" },
    responsibilities: {
      ar: [
        "إدارة الردود في السوشيال ضمن SLA بلهجة العلامة.",
        "تصعيد الحالات الحرجة بسرعة للفريق المختص.",
        "تلخيص نبض العملاء وتوصيات تحسين أسبوعية." ,
      ],
      en: [
        "Handle social care within SLA using the brand tone.",
        "Escalate critical cases quickly to specialists.",
        "Summarize customer pulse with weekly recommendations.",
      ],
    },
  },
]

export function CareersSection() {
  const { t, locale } = useLanguage()
  const [open, setOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[number] | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    cover: "",
    cv: "",
  })

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all focus:border-[#22d3ee]/60 focus:ring-1 focus:ring-[#22d3ee]/25"

  const openApply = (job: (typeof jobs)[number]) => {
    setSelectedJob(job)
    setOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({ name: "", email: "", phone: "", experience: "", cover: "", cv: "" })
  }

  return (
    <section
      id="careers"
      className="magazine-section relative overflow-hidden bg-gradient-to-b from-[#0d223e] via-[#0b182f] to-[#0d223e] py-24 lg:py-30 text-white"
    >
      <div className="absolute -top-10 right-10 h-72 w-72 rounded-full bg-[#22d3ee]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-12 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)", backgroundSize: "34px 34px" }} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <Badge className="bg-white/5 text-[#7ad8ff] hover:bg-white/10 mb-3 border border-white/10 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase">
              {t("nav.careers")}
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white mb-3 leading-tight tracking-tight">
              {t("careers.title")}
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              {t("careers.subtitle")}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="card-magazine group relative flex flex-col md:flex-row md:items-center justify-between p-7 rounded-[22px] border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-[#22d3ee]/30 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_-36px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center gap-6 flex-1 md:self-stretch md:items-center">
                <div className="p-4 rounded-2xl bg-[#22d3ee]/15 text-[#7ad8ff]">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div className="flex-1 space-y-2 text-center" style={{ textAlign: locale === "ar" ? "right" : "left" }}>
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#7ad8ff] transition-colors leading-tight">
                    {job.title[locale]}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-white/65">
                    <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <Clock3 className="w-4 h-4" />
                      {job.type[locale]}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <MapPin className="w-4 h-4" />
                      {job.location[locale]}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">
                    {locale === 'ar' ? "المزايا" : "Compensation"}
                  </p>
                  <p className="text-white/80 font-medium">
                    {job.salary[locale]}
                  </p>
                </div>
                <Button
                  onClick={() => openApply(job)}
                  className="rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] text-[#0b182f] px-7 py-3 text-sm font-semibold shadow-[0_18px_40px_-28px_rgba(34,211,238,0.8)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex gap-2"
                >
                  {t("careers.apply")}
                  <ChevronLeft className={`w-4 h-4 ${locale === 'ar' ? '' : 'rotate-180'}`} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl border border-white/10 bg-[#0f2748]/95 text-white max-h-[90vh] overflow-y-auto p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between sticky top-0 z-10 bg-[#0f2748]/95">
            <button
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 md:w-auto"
            >
              <ChevronLeft className={`h-4 w-4 ${locale === 'ar' ? '' : 'rotate-180'}`} />
              {locale === "ar" ? "رجوع للوظائف" : "Back to jobs"}
            </button>
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedJob ? selectedJob.title[locale] : t("careers.apply")}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              {locale === "ar"
                ? "أكمل بياناتك وأرفق سيرتك الذاتية. سنعاود الاتصال بك خلال 48 ساعة."
                : "Share your details and CV. We will respond within 48 hours."}
            </DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap gap-3 text-sm text-white/70">
                  <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> {selectedJob.type[locale]}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {selectedJob.location[locale]}</span>
                  <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {selectedJob.salary[locale]}</span>
                </div>
                <ul className="mt-4 list-disc space-y-2 ps-5 text-sm text-white/80">
                  {selectedJob.responsibilities[locale].map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4" encType="multipart/form-data">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-white/60">{locale === "ar" ? "الاسم الكامل" : "Full name"}</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder={locale === "ar" ? "اسمك" : "Your name"} />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-white/60">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="name@email.com" dir="ltr" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-white/60">{locale === "ar" ? "رقم الجوال" : "Phone"}</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder={locale === "ar" ? "05xxxxxxxx" : "+9665xxxx"} dir="ltr" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-white/60">{locale === "ar" ? "الخبرة (سنوات + أبرز مجالاتك)" : "Experience (years + focus)"}</label>
                    <input required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={inputClass} placeholder={locale === "ar" ? "مثال: 4 سنوات مراكز اتصال" : "e.g. 4 yrs contact centers"} />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase text-white/60">{locale === "ar" ? "رسالة مختصرة" : "Short cover note"}</label>
                  <textarea
                    required
                    rows={3}
                    value={form.cover}
                    onChange={(e) => setForm({ ...form, cover: e.target.value })}
                    className={`${inputClass} resize-none`}
                    placeholder={locale === "ar" ? "عرّف بنفسك باختصار" : "Briefly introduce yourself"}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase text-white/60">{locale === "ar" ? "أرفق السيرة الذاتية" : "Attach CV"}</label>
                  <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#7ad8ff]" />
                      <span className="text-sm text-white/70">{form.cv || (locale === "ar" ? "PDF أو DOC" : "PDF or DOC")}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <label htmlFor="cv-upload" className="cursor-pointer rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-4 py-2 text-xs font-semibold text-[#0b182f] shadow-[0_18px_40px_-28px_rgba(34,211,238,0.8)] transition hover:scale-[1.02]">
                        {locale === "ar" ? "اختيار ملف" : "Choose file"}
                      </label>
                      <input
                        id="cv-upload"
                        required
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setForm({ ...form, cv: e.target.files?.[0]?.name || "" })}
                        className="sr-only"
                      />
                      {form.cv && <span className="text-xs text-white/60">{form.cv}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    type="submit"
                    disabled={submitted}
                    className="rounded-full bg-gradient-to-l from-[#22d3ee] to-[#0891b2] px-6 py-3 text-[#0b182f] font-semibold shadow-[0_18px_40px_-28px_rgba(34,211,238,0.8)] transition-all hover:scale-[1.01]"
                  >
                    <Send className="h-4 w-4" />
                    {submitted ? (locale === "ar" ? "تم الإرسال" : "Submitted") : t("careers.apply")}
                  </Button>
                  <div className="text-xs text-white/50 flex items-center gap-2">
                    <Phone className="h-4 w-4" /> 920026002
                    <Mail className="h-4 w-4" /> info@entshaar.com
                  </div>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
