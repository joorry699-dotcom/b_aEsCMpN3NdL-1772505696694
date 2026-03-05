import type { Metadata, Viewport } from 'next'
import { Tajawal } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LanguageProvider } from '@/components/language-provider'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'انتشار | خدمات وحلول مراكز الاتصال للمنشآت',
  description: 'شركة انتشار لحلول تعهيد وإسناد الأعمال - نقدم حلول مركز الاتصال لإدارة تواصلك مع العملاء من مختلف القنوات بخبرة تزيد عن 15 عاما',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/logo-icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/logo-icon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/images/logo-icon.png',
        rel: 'shortcut icon',
      },
    ],
    apple: '/images/logo-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0c1e3c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
