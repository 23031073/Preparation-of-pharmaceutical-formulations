import type React from "react"
import type { Metadata } from "next"
import { Cairo, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "الموسوعة الصيدلانية | دليل التركيبات والمستحضرات",
  description: "موسوعة شاملة للتركيبات الصيدلانية وطرق التحضير مع دليل تفاعلي للمستحضرات الطبية",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} ${jetbrainsMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
