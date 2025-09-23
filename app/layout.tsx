import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Dragon Tap - Shrimp Hunters Games',
  description: 'A thrilling tap-to-earn dragon game with battle pass, tasks, and mini-games',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#0B0B0B',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Dragon Tap'
  },
  openGraph: {
    title: 'Dragon Tap - Shrimp Hunters Games',
    description: 'A thrilling tap-to-earn dragon game with battle pass, tasks, and mini-games',
    type: 'website',
    locale: 'en_US'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  )
}