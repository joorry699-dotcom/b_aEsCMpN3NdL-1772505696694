"use client"

import { createContext, useContext, useState, useEffect } from "react"
import translations from "../data/translations.json"

export type Locale = "ar" | "en"

interface LanguageContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => any
  dir: "rtl" | "ltr"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ar")

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale
    if (saved && (saved === "ar" || saved === "en")) {
      setLocale(saved)
    }
  }, [])

  const t = (key: string) => {
    const keys = key.split(".")
    let val: any = (translations as any)[locale]
    for (const k of keys) {
      if (val[k] === undefined) return key
      val = val[k]
    }
    return val
  }

  const handleSetLocale = (l: Locale) => {
    setLocale(l)
    localStorage.setItem("locale", l)
    document.documentElement.lang = l
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr"
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t, dir: locale === "ar" ? "rtl" : "ltr" }}>
      <div dir={locale === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
